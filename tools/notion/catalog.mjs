import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { lstatSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseSkillFile } from '../lib/frontmatter.mjs';
import { checkRepo } from '../lib/check-repo.mjs';

export const digest = value => createHash('sha256').update(value).digest('hex');
export const skillHash = ({ sourcePath, origin, files }) => digest(JSON.stringify({ format: 1, sourcePath, origin, files }));

export function buildCatalog(root, config) {
  const validation = checkRepo(root);
  if (validation.errors.length) throw new Error(`Fix repository validation before publishing: ${validation.errors[0].rule}`);
  const entries = execFileSync('git', ['ls-files', '--stage', '-z', '--', 'plugins/'], { cwd: root, encoding: 'utf8' })
    .split('\0').filter(Boolean).map(line => {
      const match = /^(\d+) [a-f0-9]+ (\d)\t(.+)$/.exec(line);
      if (!match || match[2] !== '0') throw new Error('Resolve Git conflicts before publishing.');
      return { mode: match[1], path: match[3] };
    });
  const skills = entries.filter(entry => /^plugins\/[^/]+\/skills\/[^/]+\/SKILL\.md$/.test(entry.path));
  if (!skills.length) throw new Error('No tracked skills found. Stage or commit the skills first.');
  return skills.map(entry => {
    const sourcePath = entry.path.slice(0, -'/SKILL.md'.length);
    const files = entries.filter(file => file.path.startsWith(`${sourcePath}/`)).map(file => {
      if (!['100644', '100755'].includes(file.mode) || !lstatSync(join(root, file.path)).isFile()) {
        throw new Error(`Only regular files can be published: ${file.path}`);
      }
      return { path: file.path.slice(sourcePath.length + 1), mode: file.mode === '100755' ? 0o755 : 0o644,
        data: readFileSync(join(root, file.path)).toString('base64') };
    }).sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
    const parsed = parseSkillFile(Buffer.from(files.find(file => file.path === 'SKILL.md').data, 'base64').toString('utf8'));
    if (!parsed.ok) throw new Error(`Invalid skill: ${sourcePath}`);
    const { name, description } = parsed.data;
    const origin = config.origins?.[name] ?? config.repository;
    const hash = skillHash({ sourcePath, origin, files });
    return { name, description, body: parsed.body.trim(), plugin: sourcePath.split('/')[1], sourcePath, origin, hash, files };
  });
}

export function packSkill(skill) {
  const zip = execFileSync(process.env.PYTHON ?? 'python3', [fileURLToPath(new URL('./pack.py', import.meta.url))], {
    input: JSON.stringify(skill.files), maxBuffer: 24 * 1024 * 1024,
  });
  if (zip.length > 20 * 1024 * 1024) throw new Error(`Skill ${skill.name} exceeds the 20 MiB upload limit.`);
  return zip;
}
