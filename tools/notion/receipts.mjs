import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export function loadReceipts(root, skills) {
  return Object.fromEntries(skills.flatMap(skill => {
    const path = join(root, '.notion-sync', `${skill.name}.json`);
    return existsSync(path) ? [[skill.name, JSON.parse(readFileSync(path, 'utf8'))]] : [];
  }));
}
