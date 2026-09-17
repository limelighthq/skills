import { cpSync, existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const NAME_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/** Copies templates/skill into plugins/<plugin>/skills/<name> and fills in the name. */
export function createSkill({ root, plugin, name }) {
  if (!name || name.length > 64 || !NAME_PATTERN.test(name)) {
    throw new Error(`"${name}" is not a valid skill name: use lowercase letters, digits, and single hyphens (for example "release-notes")`);
  }

  const plugins = directories(join(root, 'plugins'));
  if (!plugins.includes(plugin)) {
    throw new Error(`plugin "${plugin}" does not exist; choose one of: ${plugins.join(', ')}`);
  }

  const owner = plugins.find((candidate) => existsSync(join(root, 'plugins', candidate, 'skills', name)));
  if (owner) throw new Error(`skill "${name}" already exists in plugin "${owner}"; skill names are unique across plugins`);

  const target = join(root, 'plugins', plugin, 'skills', name);
  cpSync(join(root, 'templates', 'skill'), target, { recursive: true });

  const title = name.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');
  const skillFile = join(target, 'SKILL.md');
  writeFileSync(skillFile, readFileSync(skillFile, 'utf8').replaceAll('{{name}}', name).replaceAll('{{title}}', title));
  return target;
}

function directories(parent) {
  if (!existsSync(parent)) return [];
  return readdirSync(parent, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
}
