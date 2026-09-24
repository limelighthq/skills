// Reconcile changes to managed Notion skills with the released Git catalog.
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { parseSkillFile } from '../lib/frontmatter.mjs';
import { skillHash } from './catalog.mjs';
import { stateOf, propertyText, remoteSnapshot, revisionGuard, receiptBaseMatches } from './sync.mjs';

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

export async function planImports(api, config, skills, receipts = {}) {
  const rows = await api.listRows(config.dataSourceId);
  const indexed = rows.map(row => ({ row, state: stateOf(row), name: propertyText(row.properties['Skill name']) }));
  const candidates = [], conflicts = [];
  const names = new Set(skills.map(skill => skill.name));
  for (const { state } of indexed) if (state?.repo === config.repository && !names.has(state.key)) conflicts.push(`Removed or renamed ${state.key}: resolve its Notion ownership explicitly.`);
  for (const skill of skills) {
    try {
      const owned = indexed.filter(({ state }) => state?.repo === config.repository && state.key === skill.name);
      if (!owned.length) continue; // New Git skills are published; unrelated Notion rows are never enrolled here.
      if (owned.length !== 1 || indexed.some(item => item.name === skill.name && item !== owned[0])) throw new Error('Duplicate skill name or ownership.');
      const { row, state } = owned[0];
      if (state.phase !== 'complete') throw new Error('Incomplete publish; inspect and repair it first.');
      if (row.parent?.data_source_id && row.parent.data_source_id.replaceAll('-', '') !== config.dataSourceId.replaceAll('-', '')) throw new Error('Page moved outside the configured database.');
      const content = await api.request('GET', `/pages/${row.id}/markdown`);
      const remote = remoteSnapshot(row, content);
      if (remote === state.remote) continue;
      for (const [property, expected] of [['Skill name', skill.name], ['Origin', skill.origin], ['Source path', skill.sourcePath]]) {
        if (propertyText(row.properties[property]) !== expected) throw new Error(`Changed ${property}; resolve identity or ownership explicitly.`);
      }
      const previous = receipts[skill.name];
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
      files = files.map(file => file.path === 'SKILL.md' ? { ...original, data: Buffer.from(markdown).toString('base64') } : file)
        .sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
      const incoming = { ...skill, description, body, files };
      incoming.hash = skillHash(incoming);
      const fresh = await api.request('GET', `/pages/${row.id}`);
      if (revisionGuard(fresh) !== revisionGuard(row) || remoteSnapshot(fresh, await api.request('GET', `/pages/${row.id}/markdown`)) !== remote) throw new Error('Notion changed during import; retry with the latest version.');
      candidates.push({ skill: incoming, receipt: { format: 1, pageId: row.id, baseline: state, guard: revisionGuard(row), source: incoming.hash, remote } });
    } catch (error) { conflicts.push(`${skill.name}: ${error.message}`); }
  }
  return { candidates, conflicts };
}
