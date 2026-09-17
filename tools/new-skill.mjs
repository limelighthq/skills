#!/usr/bin/env node
/**
 * Scaffolds a new skill from templates/skill.
 *
 *   npm run new:skill -- <plugin> <skill-name>
 */
import { relative, resolve } from 'node:path';

import { createSkill } from './lib/create-skill.mjs';

const [plugin, name] = process.argv.slice(2);
if (!plugin || !name) {
  console.error('usage: npm run new:skill -- <plugin> <skill-name>');
  process.exit(2);
}

try {
  const root = resolve('.');
  const created = createSkill({ root, plugin, name });
  console.log(`created ${relative(root, created)}/SKILL.md\nnext: write the description and body, then run \`npm run validate\``);
} catch (cause) {
  console.error(cause.message);
  process.exit(1);
}
