// Reconcile changes to managed Notion skills with the released Git catalog.
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { parseSkillFile } from '../lib/frontmatter.mjs';
import { skillHash } from './catalog.mjs';
import { stateOf, propertyText, pluginOf, remoteSnapshot, revisionGuard, receiptBaseMatches, receiptContextMatches, enrollmentReceiptMatches } from './sync.mjs';

export function unpackSkill(bytes) {
  return JSON.parse(execFileSync(process.env.PYTHON ?? 'python3', [fileURLToPath(new URL('./unpack.py', import.meta.url))], {
    input: bytes, maxBuffer: 30 * 1024 * 1024, stdio: ['pipe', 'pipe', 'pipe'],
  }).toString('utf8'));
}

function incomingBody(markdown, config, skill, state) {
  const url = `https://github.com/${config.repository}/blob/${state.revision}/${skill.sourcePath}/SKILL.md`;
  const marker = `Published from [the original skill in Git](${url}). `;
  const index = markdown.lastIndexOf(marker);
  const suffix = index < 0 ? '' : markdown.slice(index + marker.length).trim();
  if (!['Propose changes in the repository.', 'Edits here sync back through a validated GitHub change.'].includes(suffix)) {
    throw new Error('Restore the publisher provenance footer before importing.');
  }
  const before = markdown.slice(0, index).trimEnd();
  if (!before.endsWith('\n---')) throw new Error('Restore the publisher footer separator before importing.');
  return before.slice(0, -4).trim();
}

async function newSkillCandidate(api, config, row, name, plugin) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name) || name.length > 64) throw new Error('Skill name must be 1–64 lowercase letters, numbers, and single hyphens.');
  if (row.parent?.data_source_id?.replaceAll('-', '') !== config.dataSourceId.replaceAll('-', '')) throw new Error('Page moved outside the configured database.');
  const sourcePath = `plugins/${plugin}/skills/${name}`;
  const origin = config.repository;
  if ((config.origins?.[name] && config.origins[name] !== origin) || config.adopt?.[name]) throw new Error('This name has existing provenance or adoption settings; resolve them in Git first.');
  for (const [property, expected] of [['Origin', origin], ['Source path', sourcePath]]) {
    const value = propertyText(row.properties[property]);
    if (value && value !== expected) throw new Error(`${property} belongs to another source; resolve ownership before enrollment.`);
  }
  const description = propertyText(row.properties.Description);
  if (!description.trim() || description.length > 1024 || /[\r\n]/.test(description)) throw new Error('Description must be one nonempty line of at most 1,024 characters.');
  const content = await api.request('GET', `/pages/${row.id}/markdown`);
  const remote = remoteSnapshot(row, content);
  const body = content.markdown.trim();
  if (!body) throw new Error('Add skill instructions before choosing a Plugin.');
  const attachments = row.properties.Files?.files ?? [];
  let files = [];
  let source = `name: ${name}\ndescription: ${JSON.stringify(description)}`;
  if (attachments.length) {
    if (attachments.length !== 1 || attachments[0].name !== `${name}.zip`) throw new Error(`Files must be empty or contain one complete ${name}.zip bundle.`);
    try { files = unpackSkill(await api.downloadFile(attachments[0])); }
    catch { throw new Error('Cannot read the complete ZIP bundle. Check its paths, size, and regular files.'); }
    const bundled = files.find(file => file.path === 'SKILL.md');
    const parsed = bundled && parseSkillFile(Buffer.from(bundled.data, 'base64').toString('utf8'));
    if (!parsed?.ok) throw new Error('The complete ZIP must contain a valid SKILL.md at its root.');
    if (parsed.data.name !== name) throw new Error('The ZIP skill name must match Skill name in Notion.');
    parsed.document.set('description', description);
    source = parsed.document.toString({ lineWidth: 0 }).trimEnd();
  }
  files = [
    { path: 'SKILL.md', mode: 0o644, data: Buffer.from(`---\n${source}\n---\n\n${body}\n`).toString('base64') },
    ...files.filter(file => file.path !== 'SKILL.md').map(file => ({ ...file, mode: file.mode ?? 0o644 })),
  ].sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
  const skill = { name, description, body, plugin, sourcePath, origin, files };
  skill.hash = skillHash(skill);
  const guard = revisionGuard(row);
  const fresh = await api.request('GET', `/pages/${row.id}`);
  if (revisionGuard(fresh) !== guard || remoteSnapshot(fresh, await api.request('GET', `/pages/${row.id}/markdown`)) !== remote) throw new Error('Notion changed during enrollment; retry with the latest version.');
  return { skill, receipt: { format: 2, kind: 'enrollment', repository: config.repository, plugin, sourcePath, pageId: row.id, baseline: null, guard, source: skill.hash, remote } };
}

export async function planImports(api, config, skills, receipts = {}) {
  const rows = await api.listRows(config.dataSourceId);
  const indexed = rows.map(row => ({ row, state: stateOf(row), name: propertyText(row.properties['Skill name']) }));
  const candidates = [], conflicts = [];
  const names = new Set(skills.map(skill => skill.name));
  for (const { state } of indexed) if (state?.repo === config.repository && !names.has(state.key)) conflicts.push(`Removed or renamed ${state.key}: resolve its Notion ownership explicitly.`);
  for (const skill of skills) {
    try {
      const owned = indexed.filter(({ state }) => state?.repo === config.repository && state.key === skill.name);
      if (!owned.length) continue; // New Notion skills are handled below only after explicit enrollment.
      if (owned.length !== 1 || indexed.some(item => item.name === skill.name && item !== owned[0])) throw new Error('Duplicate skill name or ownership.');
      const { row, state } = owned[0];
      if (state.phase !== 'complete') throw new Error('Incomplete publish; inspect and repair it first.');
      if (row.parent?.data_source_id && row.parent.data_source_id.replaceAll('-', '') !== config.dataSourceId.replaceAll('-', '')) throw new Error('Page moved outside the configured database.');
      const content = await api.request('GET', `/pages/${row.id}/markdown`);
      const remote = remoteSnapshot(row, content);
      const previous = receipts[skill.name];
      const effectiveRemote = receiptContextMatches(previous, row) ? previous.remote : state.remote;
      if (remote === effectiveRemote) continue;
      for (const [property, expected] of [['Skill name', skill.name], ['Origin', skill.origin], ['Source path', skill.sourcePath]]) {
        if (propertyText(row.properties[property]) !== expected) throw new Error(`Changed ${property}; resolve identity or ownership explicitly.`);
      }
      const acknowledged = receiptBaseMatches(previous, row, skill);
      if (acknowledged && previous.remote === remote) continue;
      if (state.source !== skill.hash && !acknowledged) throw new Error('Both Git and Notion changed; preserve both versions and resolve the conflict.');
      const body = incomingBody(content.markdown, config, skill, state);
      const description = propertyText(row.properties.Description);
      const attachments = row.properties.Files?.files ?? [];
      if (attachments.length !== 1 || attachments[0].name !== `${skill.name}.zip`) throw new Error(`Files must contain one complete ${skill.name}.zip bundle.`);
      let files;
      try { files = unpackSkill(await api.downloadFile(attachments[0])); }
      catch { throw new Error('Cannot read the complete ZIP bundle. Check its paths, size, and regular files.'); }
      const bundled = files.find(file => file.path === 'SKILL.md');
      if (!bundled || !parseSkillFile(Buffer.from(bundled.data, 'base64').toString('utf8')).ok) throw new Error('The complete ZIP must contain its original SKILL.md.');
      const original = skill.files.find(file => file.path === 'SKILL.md');
      const parsed = parseSkillFile(Buffer.from(original.data, 'base64').toString('utf8'));
      if (!parsed.ok) throw new Error('Invalid Git frontmatter.');
      let source = parsed.source;
      if (description !== parsed.data.description) {
        parsed.document.set('description', description);
        source = parsed.document.toString({ lineWidth: 0 }).trimEnd();
      }
      const markdown = `---\n${source}\n---\n${body === skill.body ? parsed.body : `\n${body}\n`}`;
      files = files.map(file => file.path === 'SKILL.md' ? { ...original, data: Buffer.from(markdown).toString('base64') }
        : { ...file, mode: file.mode ?? skill.files.find(old => old.path === file.path)?.mode ?? 0o644 })
        .sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
      const incoming = { ...skill, description, body, files };
      incoming.hash = skillHash(incoming);
      const fresh = await api.request('GET', `/pages/${row.id}`);
      if (revisionGuard(fresh) !== revisionGuard(row) || remoteSnapshot(fresh, await api.request('GET', `/pages/${row.id}/markdown`)) !== remote) throw new Error('Notion changed during import; retry with the latest version.');
      candidates.push({ skill: incoming, receipt: { format: 1, pageId: row.id, baseline: state, guard: revisionGuard(row), source: incoming.hash, remote } });
    } catch (error) { conflicts.push(`${skill.name}: ${error.message}`); }
  }
  const pendingPages = new Set();
  for (const skill of skills) {
    const receipt = receipts[skill.name];
    if (receipt?.format !== 2 || receipt.kind !== 'enrollment' || indexed.some(item => item.state?.repo === config.repository && item.state.key === skill.name)) continue;
    pendingPages.add(receipt.pageId);
    try {
      const row = indexed.find(item => item.row.id === receipt.pageId)?.row;
      if (!row || !enrollmentReceiptMatches(receipt, row, skill, config) || receipt.remote !== remoteSnapshot(row, await api.request('GET', `/pages/${row.id}/markdown`))) {
        throw new Error('Pending enrollment changed or its page is missing; preserve both versions before publishing.');
      }
    } catch (error) { conflicts.push(`${skill.name}: ${error.message}`); }
  }
  const plugins = new Set(skills.map(skill => skill.sourcePath.split('/')[1]));
  for (const { row, state, name } of indexed) {
    const plugin = pluginOf(row);
    if (state || !plugin || pendingPages.has(row.id)) continue;
    try {
      if (!plugins.has(plugin)) throw new Error(`Choose an existing Plugin: ${[...plugins].sort().join(', ')}.`);
      if (indexed.filter(item => item.name === name).length !== 1) throw new Error('Duplicate skill name; resolve the other Notion row before enrollment.');
      if (names.has(name)) throw new Error('This name already exists in Git; resolve ownership before enrollment.');
      candidates.push(await newSkillCandidate(api, config, row, name, plugin));
    } catch (error) { conflicts.push(`${name || '(untitled)'}: ${error.message}`); }
  }
  return { candidates, conflicts };
}
