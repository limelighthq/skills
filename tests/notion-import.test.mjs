import test from 'node:test';
import assert from 'node:assert/strict';
import { planSync, applyPlan } from '../tools/notion/sync.mjs';
import * as importer from '../tools/notion/import.mjs';
import { digest, packSkill } from '../tools/notion/catalog.mjs';
import { parseSkillFile } from '../tools/lib/frontmatter.mjs';
import { NotionClient } from '../tools/notion/client.mjs';
import { execFileSync } from 'node:child_process';

const config = { repository: 'example/skills', dataSourceId: 'ds' };
const file = (path, text, mode = 0o644) => ({ path, mode, data: Buffer.from(text).toString('base64') });
const text = file => Buffer.from(file.data, 'base64').toString('utf8');
function skill(body = '# Hello\n\nDo the work.') {
  const files = [file('SKILL.md', `---\nname: hello\ndescription: "Use when someone needs help."\n# Keep this comment\ncompatibility: Python 3.10+\nmetadata:\n  team: company\n---\n\n${body}\n`), file('scripts/run.py', '#!/usr/bin/env python3\nprint("hello")\n', 0o755)];
  const value = { name: 'hello', description: 'Use when someone needs help.', origin: config.repository, sourcePath: 'plugins/company/skills/hello', body, files };
  value.hash = digest(JSON.stringify({ format: 1, sourcePath: value.sourcePath, origin: value.origin, files }));
  return value;
}
function remote() {
  const pages = new Map(), bodies = new Map(), archives = new Map();
  let count = 0;
  return { pages, bodies, archives,
    listRows: async () => structuredClone([...pages.values()]),
    upload: async (name, bytes) => {
      const id = `file-${++count}`; archives.set(id, bytes);
      return { name, type: 'file', file: { url: `https://storage.notion.so/${id}` } };
    },
    downloadFile: async f => archives.get(new URL(f.file.url).pathname.slice(1)),
    verifyFile: async (f, bytes) => assert.deepEqual(archives.get(new URL(f.file.url).pathname.slice(1)), bytes),
    request: async (method, path, data) => {
      const id = path.split('/')[2];
      if (method === 'GET') return path.endsWith('/markdown') ? { markdown: bodies.get(id), truncated: false, unknown_block_ids: [] } : structuredClone(pages.get(id));
      if (path === '/pages') { pages.set('page', { id: 'page', parent: { data_source_id: 'ds' }, properties: structuredClone(data.properties) }); return { id: 'page' }; }
      if (path.endsWith('/markdown')) { bodies.set(id, data.replace_content.new_str); return { object: 'page_markdown', markdown: bodies.get(id) }; }
      Object.assign(pages.get(id).properties, structuredClone(data.properties));
      return structuredClone(pages.get(id));
    },
  };
}
async function published() {
  const api = remote(), original = skill();
  await applyPlan(api, config, await planSync(api, config, [original]), { revision: 'a'.repeat(40) });
  return { api, original };
}
const rich = value => ({ rich_text: [{ text: { content: value } }] });

test('Notion body import preserves YAML and executable files, acknowledges only the exact edit, and converges', async () => {
  assert.equal(typeof importer.planImports, 'function');
  const { api, original } = await published();
  assert.equal((await importer.planImports(api, config, [original])).candidates.length, 0);
  api.bodies.set('page', api.bodies.get('page').replace('Do the work.', 'Use the updated instructions.'));
  const { candidates, conflicts } = await importer.planImports(api, config, [original]);
  assert.deepEqual(conflicts, []);
  assert.equal(candidates.length, 1);
  const { skill: incoming, receipt } = candidates[0];
  assert.equal(parseSkillFile(text(incoming.files[0])).data.compatibility, 'Python 3.10+');
  assert.match(text(incoming.files[0]), /# Keep this comment/);
  assert.match(incoming.body, /Use the updated instructions\./);
  assert.doesNotMatch(incoming.body, /Published from|Synced with/);
  assert.deepEqual(incoming.files[1], original.files[1]);
  const receipts = { hello: receipt };
  const plan = await planSync(api, config, [incoming], { receipts });
  assert.deepEqual(plan.conflicts, []);
  await applyPlan(api, config, plan, { revision: 'b'.repeat(40) });
  assert.equal((await importer.planImports(api, config, [incoming], receipts)).candidates.length, 0);
  assert.equal((await planSync(api, config, [incoming], { receipts })).actions[0].kind, 'skip');
});

test('a Description edit changes only that YAML field and preserves the original body formatting', async () => {
  const { api, original } = await published();
  api.pages.get('page').properties.Description = rich('Use when a teammate asks for a recap.');
  const { candidates } = await importer.planImports(api, config, [original]);
  const parsed = parseSkillFile(text(candidates[0].skill.files[0]));
  assert.equal(parsed.data.description, 'Use when a teammate asks for a recap.');
  assert.equal(parsed.data.metadata.team, 'company');
  assert.match(parsed.source, /# Keep this comment/);
  assert.equal(parsed.body.trim(), original.body);
});

test('edits on both sides and incomplete states are conflicts without writes', async () => {
  const { api, original } = await published();
  api.bodies.set('page', api.bodies.get('page').replace('Do the work.', 'Notion edit.'));
  const both = await importer.planImports(api, config, [skill('# Independent Git edit')]);
  assert.equal(both.candidates.length, 0);
  assert.match(both.conflicts.join(), /both|Git/i);
  const state = JSON.parse(api.pages.get('page').properties['Sync state'].rich_text[0].text.content);
  api.pages.get('page').properties['Sync state'] = rich(JSON.stringify({ ...state, phase: 'pending' }));
  assert.match((await importer.planImports(api, config, [original])).conflicts.join(), /incomplete/i);
});

test('receipt cannot acknowledge a subsequent Notion edit or another page, baseline, or source', async () => {
  const { api, original } = await published();
  api.bodies.set('page', api.bodies.get('page').replace('Do the work.', 'First edit.'));
  const [{ skill: incoming, receipt }] = (await importer.planImports(api, config, [original])).candidates;
  for (const wrong of [{ ...receipt, pageId: 'different' }, { ...receipt, source: 'x' }, { ...receipt, baseline: {} }]) {
    assert.ok((await planSync(api, config, [incoming], { receipts: { hello: wrong } })).conflicts.length);
  }
  api.bodies.set('page', api.bodies.get('page').replace('First edit.', 'Second edit.'));
  assert.ok((await planSync(api, config, [incoming], { receipts: { hello: receipt } })).conflicts.length);
  const next = await importer.planImports(api, config, [incoming], { hello: receipt });
  assert.deepEqual(next.conflicts, []);
  assert.match(next.candidates[0].skill.body, /Second edit/);
});

test('altered provenance, identity, and unrelated rows cannot become imports', async () => {
  const { api, original } = await published();
  api.bodies.set('page', '# Removed the provenance footer');
  assert.match((await importer.planImports(api, config, [original])).conflicts.join(), /footer|provenance/i);
  api.pages.get('page').properties['Sync state'] = rich('');
  const plan = await importer.planImports(api, config, [original]);
  assert.equal(plan.candidates.length, 0);
});

test('changed complete supporting ZIP imports bytes and modes and ignores its stale SKILL body', async () => {
  const { api, original } = await published();
  const changed = { ...original, files: [original.files[0], file('scripts/run.py', '#!/usr/bin/env python3\nprint("new")\n', 0o755), file('references/info.md', '# Reference\n')] };
  const attached = await api.upload('hello.zip', packSkill(changed));
  api.pages.get('page').properties.Files.files = [attached];
  const { candidates, conflicts } = await importer.planImports(api, config, [original]);
  assert.deepEqual(conflicts, []);
  assert.equal(candidates[0].skill.files.find(f => f.path === 'scripts/run.py').mode, 0o755);
  assert.match(text(candidates[0].skill.files.find(f => f.path === 'scripts/run.py')), /print\("new"\)/);
  assert.equal(candidates[0].skill.body, original.body);
});

test('a Notion edit during download invalidates the candidate', async () => {
  const { api, original } = await published();
  api.bodies.set('page', api.bodies.get('page').replace('Do the work.', 'Incoming edit.'));
  const download = api.downloadFile;
  api.downloadFile = async f => { const bytes = await download(f); api.bodies.set('page', '# Raced'); return bytes; };
  const result = await importer.planImports(api, config, [original]);
  assert.equal(result.candidates.length, 0);
  assert.match(result.conflicts.join(), /changed/i);
});

test('downloads are bounded and never forward the Notion token to storage', async () => {
  let headers;
  const api = new NotionClient({ token: 'private-value', fetch: async (_url, options) => { headers = options.headers; return new Response('zip'); } });
  assert.equal(typeof api.downloadFile, 'function');
  assert.equal((await api.downloadFile({ file: { url: 'https://storage.notion.so/file' } })).toString(), 'zip');
  assert.equal(headers, undefined);
  await assert.rejects(api.downloadFile({ file: { url: 'https://untrusted.example/file' } }), /storage/i);
  await assert.rejects(api.downloadFile({ file: { url: 'https://storage.notion.so/file' } }, 2), /download|limit/i);
});

test('ZIP extraction rejects traversal, duplicate paths, links and excessive expansion', () => {
  for (const [name, mode, size, duplicate] of [['../outside', 0o100644, 1, false], ['safe', 0o120777, 1, false], ['safe', 0o100644, 1024 * 1024 + 1, false], ['safe', 0o100644, 1, true]]) {
    const zip = execFileSync(process.env.PYTHON ?? 'python3', ['-c', 'import io,zipfile,sys\nb=io.BytesIO()\nz=zipfile.ZipFile(b,"w",compression=zipfile.ZIP_DEFLATED)\ne=zipfile.ZipInfo(sys.argv[1]);e.create_system=3;e.external_attr=int(sys.argv[2])<<16\nz.writestr(e,b"x"*int(sys.argv[3]))\nif sys.argv[4]=="true": z.writestr(e,b"x")\nz.close();sys.stdout.buffer.write(b.getvalue())', name, String(mode), String(size), String(duplicate)], { stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 2 * 1024 * 1024 });
    assert.throws(() => importer.unpackSkill(zip));
  }
});

test('normalization-only Notion edits are acknowledged once instead of generating an import loop', async () => {
  const { api, original } = await published();
  api.bodies.set('page', `\n${api.bodies.get('page')}`);
  const [{ skill: incoming, receipt }] = (await importer.planImports(api, config, [original])).candidates;
  assert.equal(incoming.hash, original.hash);
  const plan = await planSync(api, config, [incoming], { receipts: { hello: receipt } });
  assert.equal(plan.actions[0].kind, 'update');
  await applyPlan(api, config, plan, { revision: 'b'.repeat(40) });
  assert.equal((await importer.planImports(api, config, [incoming], { hello: receipt })).candidates.length, 0);
});

test('an explicit Notion undo after import merge is imported instead of overwritten by the old receipt', async () => {
  const { api, original } = await published();
  const before = api.bodies.get('page');
  api.bodies.set('page', before.replace('Do the work.', 'First edit.'));
  const [{ skill: incoming, receipt }] = (await importer.planImports(api, config, [original])).candidates;
  api.bodies.set('page', before);
  const receipts = { hello: receipt };
  assert.ok((await planSync(api, config, [incoming], { receipts })).conflicts.length);
  const undone = await importer.planImports(api, config, [incoming], receipts);
  assert.deepEqual(undone.conflicts, []);
  assert.equal(undone.candidates[0].skill.body, original.body);
});

test('Windows ZIP replacement retains executable modes on existing scripts', async () => {
  const { api, original } = await published();
  const archive = execFileSync(process.env.PYTHON ?? 'python3', ['-c', 'import io,zipfile,sys,json,base64\nb=io.BytesIO()\nz=zipfile.ZipFile(b,"w")\nfor f in json.load(sys.stdin):\n e=zipfile.ZipInfo(f["path"]);e.create_system=0;e.external_attr=0;z.writestr(e,base64.b64decode(f["data"]))\nz.close();sys.stdout.buffer.write(b.getvalue())'], { input: JSON.stringify(original.files) });
  api.pages.get('page').properties.Files.files = [await api.upload('hello.zip', archive)];
  const [{ skill: incoming }] = (await importer.planImports(api, config, [original])).candidates;
  assert.deepEqual(incoming.files.find(f => f.path === 'scripts/run.py'), original.files.find(f => f.path === 'scripts/run.py'));
});
