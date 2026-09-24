import test from 'node:test';
import assert from 'node:assert/strict';
import { planSync, applyPlan, schemaChanges, remoteSnapshot } from '../tools/notion/sync.mjs';

const config = { repository: 'example/skills', databaseId: 'db', dataSourceId: 'ds', adopt: {} };
const skill = { name: 'hello', description: 'A useful skill', origin: 'example/skills', sourcePath: 'plugins/company/skills/hello',
  hash: 'a'.repeat(64), body: '# Hello\n\nDo the work.', files: [{ path: 'SKILL.md', data: Buffer.from('test').toString('base64'), mode: 0o644 }] };
const rich = value => ({ type: 'rich_text', rich_text: [{ plain_text: value, text: { content: value } }] });
const title = value => ({ type: 'title', title: [{ plain_text: value, text: { content: value } }] });
function row(id = 'row', state) {
  return { id, last_edited_time: '2026-09-23T12:00:00Z', properties: {
    'Skill name': title('hello'), Description: rich(skill.description), Origin: rich(skill.origin), 'Source path': rich(skill.sourcePath),
    Files: { type: 'files', files: [] }, 'Sync state': rich(state ? JSON.stringify(state) : ''),
  } };
}
function remote(rows = []) {
  const writes = [];
  const pages = new Map(rows.map(r => [r.id, structuredClone(r)]));
  const bodies = new Map(rows.map(r => [r.id, skill.body]));
  const uploads = new Map();
  let failBody = false;
  return {
    writes, pages, bodies,
    set failBody(value) { failBody = value; },
    listRows: async () => [...pages.values()].map(r => structuredClone(r)),
    upload: async (name, bytes) => { writes.push('upload'); uploads.set('upload', bytes); return { name, type: 'file_upload', file_upload: { id: 'upload' } }; },
    verifyFile: async (file, bytes) => assert.deepEqual(uploads.get(file.file_upload.id), bytes),
    request: async (method, path, data) => {
      const id = path.split('/')[2];
      if (method === 'GET' && path.endsWith('/markdown')) return { markdown: bodies.get(id), truncated: false, unknown_block_ids: [] };
      if (method === 'GET') return structuredClone(pages.get(id));
      writes.push({ method, path, data });
      if (path === '/pages') {
        const page = { id: 'new', properties: structuredClone(data.properties) };
        pages.set('new', page); bodies.set('new', data.markdown); return structuredClone(page);
      }
      if (path.endsWith('/markdown')) {
        if (failBody) throw new Error('write failed');
        bodies.set(id, data.replace_content.new_str);
        return { object: 'page_markdown', id, markdown: data.replace_content.new_str, truncated: false, unknown_block_ids: [] };
      }
      const page = pages.get(id);
      Object.assign(page.properties, structuredClone(data.properties));
      return structuredClone(page);
    },
  };
}

test('schema setup adds only missing fields and rejects incompatible fields', () => {
  const props = { 'Skill name': { type: 'title' }, Description: { type: 'rich_text' }, Files: { type: 'files' }, Tags: { type: 'multi_select', multi_select: { options: [{ name: 'custom' }] } } };
  const changes = schemaChanges(props);
  assert.deepEqual(Object.keys(changes).sort(), ['Origin', 'Source path', 'Sync state']);
  assert.equal(changes.Tags, undefined);
  assert.throws(() => schemaChanges({ ...props, 'Sync state': { type: 'number' } }), /Sync state/);
});

test('plan makes no writes and does not adopt a matching name without a page mapping', async () => {
  const api = remote([row()]);
  const plan = await planSync(api, config, [skill]);
  assert.equal(plan.conflicts.length, 1);
  assert.deepEqual(api.writes, []);
});

test('explicit adoption is reviewed; unrelated rows remain untouched', async () => {
  const foreign = row('foreign'); foreign.properties['Skill name'] = title('other-repo');
  const api = remote([row(), foreign]);
  const plan = await planSync(api, { ...config, adopt: { hello: 'row' } }, [skill]);
  assert.deepEqual(plan.actions.map(a => a.kind), ['adopt']);
  assert.deepEqual(plan.conflicts, []);
  assert.deepEqual(api.writes, []);
});

test('two rows with the same managed key fail before any writes', async () => {
  const state = { repo: config.repository, key: 'hello', source: skill.hash, phase: 'complete' };
  const api = remote([row('one', state), row('two', state)]);
  const plan = await planSync(api, config, [skill]);
  assert.ok(plan.conflicts.some(c => /duplicate/i.test(c)));
  await assert.rejects(applyPlan(api, config, plan, { revision: 'rev' }), /conflict/i);
  assert.deepEqual(api.writes, []);
});

test('create verifies content, commits its marker last, then becomes a no-op', async () => {
  const api = remote();
  const plan = await planSync(api, config, [skill]);
  await applyPlan(api, config, plan, { revision: 'rev' });
  const state = JSON.parse(api.pages.get('new').properties['Sync state'].rich_text[0].text.content);
  assert.equal(state.phase, 'complete');
  assert.equal(state.source, skill.hash);
  assert.equal(state.revision, 'rev');
  assert.match(state.remote, /^[a-f0-9]{64}$/);
  api.writes.length = 0;
  const next = await planSync(api, config, [skill]);
  assert.deepEqual(next.actions.map(a => a.kind), ['skip']);
  await applyPlan(api, config, next, { revision: 'rev' });
  assert.deepEqual(api.writes, []);
});

test('blank page creation omits the markdown-only async option', async () => {
  const api = remote();
  const request = api.request;
  api.request = async (method, path, data) => {
    if (method === 'POST' && path === '/pages' && Object.hasOwn(data, 'allow_async') && !Object.hasOwn(data, 'markdown')) {
      throw new Error('allow_async is only supported when markdown is provided');
    }
    return request(method, path, data);
  };
  await applyPlan(api, config, await planSync(api, config, [skill]), { revision: 'rev' });
  assert.equal((await planSync(api, config, [skill])).actions[0].kind, 'skip');
});

test('human changes stop the entire plan even when another skill is new', async () => {
  const api = remote();
  await applyPlan(api, config, await planSync(api, config, [skill]), { revision: 'rev' });
  api.bodies.set('new', '# A human edit'); api.writes.length = 0;
  const plan = await planSync(api, config, [skill, { ...skill, name: 'second' }]);
  assert.ok(plan.conflicts.some(c => /edited/i.test(c)));
  await assert.rejects(applyPlan(api, config, plan, { revision: 'rev' }), /conflict/i);
  assert.deepEqual(api.writes, []);
});

test('a failed update keeps an incomplete marker and needs explicit repair', async () => {
  const api = remote();
  await applyPlan(api, config, await planSync(api, config, [skill]), { revision: 'rev' });
  const changed = { ...skill, hash: 'b'.repeat(64), body: '# Updated' };
  api.failBody = true;
  await assert.rejects(applyPlan(api, config, await planSync(api, config, [changed]), { revision: 'next' }), /write failed/);
  assert.ok((await planSync(api, config, [changed])).conflicts.some(c => /incomplete/i.test(c)));
  api.failBody = false;
  const repaired = await planSync(api, config, [changed], { repair: ['hello'] });
  assert.deepEqual(repaired.conflicts, []);
  await applyPlan(api, config, repaired, { revision: 'next' });
  assert.equal((await planSync(api, config, [changed])).actions[0].kind, 'skip');
});

test('removed skills and edits after planning do not cause deletes or overwrites', async () => {
  const api = remote();
  await applyPlan(api, config, await planSync(api, config, [skill]), { revision: 'rev' });
  const removed = await planSync(api, config, []);
  assert.ok(removed.conflicts.some(c => /removed/i.test(c)));
  const changed = { ...skill, hash: 'c'.repeat(64) };
  const plan = await planSync(api, config, [changed]);
  api.bodies.set('new', 'Changed after plan'); api.writes.length = 0;
  await assert.rejects(applyPlan(api, config, plan, { revision: 'next' }), /changed since/i);
  assert.deepEqual(api.writes, []);
});

test('truncated content cannot be treated as a verified snapshot', () => {
  assert.throws(() => remoteSnapshot(row(), { markdown: 'partial', truncated: true }), /truncated/i);
  assert.throws(() => remoteSnapshot(row(), { markdown: 'partial', unknown_block_ids: ['missing'] }), /unsupported/i);
});

test('ownership changes after planning cannot be overwritten by repair or publish', async () => {
  const api = remote();
  await applyPlan(api, config, await planSync(api, config, [skill]), { revision: 'rev' });
  const plan = await planSync(api, config, [{ ...skill, hash: 'b'.repeat(64) }]);
  api.pages.get('new').properties['Sync state'] = rich(JSON.stringify({ repo: 'other/repo', key: 'hello' }));
  api.writes.length = 0;
  await assert.rejects(applyPlan(api, config, plan, { revision: 'next' }), /changed since/i);
  assert.deepEqual(api.writes, []);
});

test('a page moved after planning cannot be written outside the target', async () => {
  const api = remote();
  await applyPlan(api, config, await planSync(api, config, [skill]), { revision: 'rev' });
  const plan = await planSync(api, config, [{ ...skill, hash: 'b'.repeat(64) }]);
  api.pages.get('new').parent = { type: 'page_id', page_id: 'elsewhere' };
  api.writes.length = 0;
  await assert.rejects(applyPlan(api, config, plan, { revision: 'next' }), /changed since/i);
  assert.deepEqual(api.writes, []);
});

test('an edit between Markdown write and readback never gets a completion marker', async () => {
  const api = remote();
  const request = api.request;
  api.request = async (method, path, data) => {
    const result = await request(method, path, data);
    if (method === 'PATCH' && path.endsWith('/markdown')) api.bodies.set(path.split('/')[2], '# Concurrent edit');
    return result;
  };
  await assert.rejects(applyPlan(api, config, await planSync(api, config, [skill]), { revision: 'rev' }), /content verification/i);
  const state = JSON.parse(api.pages.get('new').properties['Sync state'].rich_text[0].text.content);
  assert.equal(state.phase, 'pending');
});
