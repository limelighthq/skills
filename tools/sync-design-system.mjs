#!/usr/bin/env node
/**
 * Rebuilds a design system skill's generated copy from a design system downloaded from claude.ai.
 *
 *   npm run sync:design-system -- --source <download dir> --skill <skill dir> \
 *     --artifact <url> --version <id> [--title <name>] [--root-class <class>]
 *
 * .claude/skills/sync-design-system/SKILL.md explains how to download the source.
 */
import { relative, resolve } from 'node:path';
import { parseArgs } from 'node:util';

import { syncDesignSystem } from './lib/sync-design-system.mjs';

const USAGE = 'usage: npm run sync:design-system -- --source <dir> --skill <dir> --artifact <url> --version <id> [--title <name>] [--root-class <class>]';

let options;
try {
  ({ values: options } = parseArgs({
    options: {
      source: { type: 'string' },
      skill: { type: 'string' },
      artifact: { type: 'string' },
      version: { type: 'string' },
      title: { type: 'string' },
      'root-class': { type: 'string' },
    },
  }));
} catch (cause) {
  console.error(`${cause.message}\n${USAGE}`);
  process.exit(2);
}

const missing = ['source', 'skill', 'artifact', 'version'].filter((key) => !options[key]);
if (missing.length > 0) {
  console.error(`missing --${missing.join(', --')}\n${USAGE}`);
  process.exit(2);
}

try {
  const skill = resolve(options.skill);
  const summary = syncDesignSystem({
    source: resolve(options.source),
    skill,
    artifact: options.artifact,
    version: options.version,
    title: options.title,
    rootClass: options['root-class'],
  });
  console.log(`synced ${relative(resolve('.'), skill) || '.'}: ${summary.components} components, ${summary.images} images, ${summary.files} files`);
} catch (cause) {
  console.error(cause.message);
  process.exit(1);
}
