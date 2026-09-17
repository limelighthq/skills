#!/usr/bin/env node
/**
 * Validates the marketplace, every plugin, and every skill.
 *
 *   node tools/validate.mjs [repo-root]
 *
 * Errors exit 1. Warnings are advice and never fail the run.
 * docs/conventions.md explains each rule.
 */
import { relative, resolve } from 'node:path';

import { checkRepo } from './lib/check-repo.mjs';

const root = resolve(process.argv[2] ?? '.');
const { errors, warnings, stats } = checkRepo(root);

function print(label, findings) {
  for (const { rule, message, file } of findings) {
    console.log(`${label}  ${relative(root, file ?? root) || '.'}\n       ${rule}: ${message}`);
  }
}

print('error', errors);
print('warn ', warnings);

const plural = (count, noun) => `${count} ${noun}${count === 1 ? '' : 's'}`;
console.log(
  `\n${plural(stats.plugins, 'plugin')}, ${plural(stats.skills, 'skill')}: ${plural(errors.length, 'error')}, ${plural(warnings.length, 'warning')}`,
);
process.exit(errors.length > 0 ? 1 : 0);
