// Update only the existing catalog tables in trusted checkout READMEs.
import { lstatSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const safeName = value => typeof value === 'string' && value.length <= 64 && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
const compare = (a, b) => a < b ? -1 : a > b ? 1 : 0;

function readTable(root, path, header, delimiter) {
  if (!lstatSync(join(root, path)).isFile()) throw new Error(`${path} must be a regular file, without a symbolic link.`);
  const lines = readFileSync(join(root, path), 'utf8').split('\n');
  const indexes = lines.flatMap((line, index) => line === header ? [index] : []);
  const index = indexes[0];
  if (indexes.length !== 1 || lines[index + 1] !== delimiter) throw new Error(`${path} has an unsupported README table; restore its standard header.`);
  let end = index + 2;
  while (lines[end]?.startsWith('|')) end++;
  if (end === index + 2) throw new Error(`${path} has an empty README table; restore the existing catalog rows.`);
  return { path, lines, start: index + 2, end, rows: lines.slice(index + 2, end) };
}

function entry(table, rows) {
  const lines = [...table.lines.slice(0, table.start), ...rows, ...table.lines.slice(table.end)];
  return { path: table.path, mode: '100644', type: 'blob', data: Buffer.from(lines.join('\n')).toString('base64') };
}

// Encode Markdown punctuation so descriptions stay readable inside one table cell.
function descriptionText(description) {
  if (typeof description !== 'string' || !description.trim()) throw new Error('An enrollment README entry needs a description.');
  return description.replace(/\s+/g, ' ').trim().replace(/[&<>|\\`\[\]*_~]/g, char => `&#${char.charCodeAt(0)};`);
}

export function enrollmentReadmeEntries(root, candidates) {
  const skills = candidates.filter(({ receipt }) => receipt?.format === 2 && receipt.kind === 'enrollment').map(({ skill }) => skill);
  if (!skills.length) return [];
  const groups = new Map(), names = new Set();
  for (const skill of skills) {
    if (!safeName(skill.name) || !safeName(skill.plugin) || skill.sourcePath !== `plugins/${skill.plugin}/skills/${skill.name}`) throw new Error('Enrollment README scope must match its canonical skill path.');
    if (names.has(skill.name)) throw new Error('Duplicate enrollment README skill name.');
    names.add(skill.name);
    if (!groups.has(skill.plugin)) groups.set(skill.plugin, []);
    groups.get(skill.plugin).push(skill);
  }
  const rootTable = readTable(root, 'README.md', '| Plugin | For | Skills |', '| --- | --- | --- |');
  const listedPlugins = new Set();
  const rootRows = rootTable.rows.map(row => {
    const match = /^\| \[`([a-z0-9]+(?:-[a-z0-9]+)*)`\]\(plugins\/\1\) \| ([^|]+) \| ([^|]+) \|$/.exec(row);
    if (!match || listedPlugins.has(match[1]) || !/^`[a-z0-9]+(?:-[a-z0-9]+)*`(?:, `[a-z0-9]+(?:-[a-z0-9]+)*`)*$/.test(match[3])) throw new Error('README.md has an unsupported or duplicate plugin table row.');
    const [, plugin, audience, list] = match;
    listedPlugins.add(plugin);
    const existing = list.split(', ').map(value => value.slice(1, -1));
    if (existing.some(name => names.has(name))) throw new Error('An enrollment skill is already listed in README.md.');
    const additions = groups.get(plugin);
    if (!additions) return row;
    const combined = [...existing, ...additions.map(skill => skill.name)].sort(compare);
    return `| [\`${plugin}\`](plugins/${plugin}) | ${audience} | ${combined.map(name => `\`${name}\``).join(', ')} |`;
  });
  const entries = [entry(rootTable, rootRows)];
  for (const [plugin, additions] of [...groups].sort(([a], [b]) => compare(a, b))) {
    if (!listedPlugins.has(plugin)) throw new Error(`Plugin ${plugin} is missing from the trusted README catalog.`);
    const table = readTable(root, `plugins/${plugin}/README.md`, '| Skill | Use it to |', '| --- | --- |');
    const existing = new Set();
    for (const row of table.rows) {
      const match = /^\| \[`([a-z0-9]+(?:-[a-z0-9]+)*)`\]\(skills\/\1\/SKILL\.md\) \| .+ \|$/.exec(row);
      if (!match || existing.has(match[1])) throw new Error(`${table.path} has an unsupported or duplicate README table row.`);
      if (names.has(match[1])) throw new Error(`An enrollment skill is already listed in ${table.path}.`);
      existing.add(match[1]);
    }
    const newRows = additions.sort((a, b) => compare(a.name, b.name)).map(skill => `| [\`${skill.name}\`](skills/${skill.name}/SKILL.md) | ${descriptionText(skill.description)} |`);
    entries.push(entry(table, [...table.rows, ...newRows]));
  }
  return entries;
}
