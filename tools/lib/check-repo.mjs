import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import { checkSkill } from './check-skill.mjs';

const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;

// https://code.claude.com/docs/en/plugin-marketplaces (reserved marketplace names)
const RESERVED_MARKETPLACE_NAMES = new Set([
  'claude-code-marketplace',
  'claude-code-plugins',
  'claude-plugins-official',
  'claude-plugins-community',
  'claude-community',
  'anthropic-marketplace',
  'anthropic-plugins',
  'agent-skills',
  'anthropic-agent-skills',
  'knowledge-work-plugins',
  'life-sciences',
  'claude-for-legal',
  'claude-for-financial-services',
  'financial-services-plugins',
  'first-party-plugins',
  'claude-tag-plugins',
  'healthcare',
]);

/** Validates the whole marketplace: catalog, every plugin, every skill. */
export function checkRepo(root) {
  const errors = [];
  const warnings = [];
  const stats = { plugins: 0, skills: 0 };
  const error = (rule, message, file) => errors.push({ rule, message, file });
  const warn = (rule, message, file) => warnings.push({ rule, message, file });

  const catalogFile = join(root, '.claude-plugin', 'marketplace.json');
  const catalog = readJson(catalogFile);
  if (catalog.missing) {
    error('marketplace-missing', 'the repo needs .claude-plugin/marketplace.json to work as a plugin marketplace', catalogFile);
    return { errors, warnings, stats };
  }
  if (catalog.invalid) {
    error('marketplace-invalid-json', `marketplace.json is not valid JSON: ${catalog.invalid}`, catalogFile);
    return { errors, warnings, stats };
  }

  const { name, owner, plugins = [] } = catalog.value;
  if (typeof name !== 'string' || !KEBAB.test(name) || RESERVED_MARKETPLACE_NAMES.has(name)) {
    error('marketplace-name-invalid', '`name` must be kebab-case and must not be a name that Anthropic reserves', catalogFile);
  }
  if (typeof owner?.name !== 'string' || owner.name.trim() === '') {
    error('marketplace-owner-missing', '`owner.name` is required', catalogFile);
  }

  const listed = new Set();
  for (const plugin of plugins) {
    if (listed.has(plugin.name)) {
      error('plugin-duplicate-name', `plugin "${plugin.name}" is listed more than once`, catalogFile);
      continue;
    }
    listed.add(plugin.name);

    if (plugin.version !== undefined) {
      error('plugin-version-pinned', `marketplace entry "${plugin.name}" sets \`version\`; omit it so every merge to main ships as an update`, catalogFile);
    }
    const expectedSource = `./plugins/${plugin.name}`;
    if (plugin.source !== expectedSource || !existsSync(join(root, 'plugins', String(plugin.name)))) {
      error('plugin-source-missing', `plugin "${plugin.name}" must have source "${expectedSource}" and that directory must exist`, catalogFile);
    }
  }

  const skillOwners = new Map();
  for (const pluginName of directories(join(root, 'plugins'))) {
    stats.plugins += 1;
    const pluginDir = join(root, 'plugins', pluginName);
    if (!listed.has(pluginName)) {
      error('plugin-unlisted', `plugins/${pluginName} exists but marketplace.json does not list it`, catalogFile);
    }
    checkPlugin(pluginDir, pluginName, error, warn);

    const skillNames = directories(join(pluginDir, 'skills'));
    if (skillNames.length === 0) {
      error('plugin-empty', `plugin "${pluginName}" has no skills; add one or remove the plugin`, pluginDir);
    }
    for (const skillName of skillNames) {
      stats.skills += 1;
      skillOwners.set(skillName, [...(skillOwners.get(skillName) ?? []), pluginName]);
      const result = checkSkill(join(pluginDir, 'skills', skillName));
      errors.push(...result.errors);
      warnings.push(...result.warnings);
    }
  }

  for (const [skillName, owners] of skillOwners) {
    if (owners.length > 1) {
      error('skill-name-duplicate', `skill "${skillName}" exists in plugins ${owners.join(' and ')}; most harnesses have one flat skill namespace, so names must be unique`, join(root, 'plugins'));
    }
  }

  return { errors, warnings, stats };
}

function checkPlugin(pluginDir, pluginName, error, warn) {
  const manifestFile = join(pluginDir, '.claude-plugin', 'plugin.json');
  const manifest = readJson(manifestFile);
  if (manifest.missing) {
    error('plugin-manifest-missing', `plugin "${pluginName}" needs .claude-plugin/plugin.json`, manifestFile);
  } else if (manifest.invalid) {
    error('plugin-manifest-invalid-json', `plugin.json is not valid JSON: ${manifest.invalid}`, manifestFile);
  } else {
    if (manifest.value.name !== pluginName) {
      error('plugin-name-mismatch', `plugin.json \`name\` is "${manifest.value.name}" but the directory is "${pluginName}"`, manifestFile);
    }
    if (typeof manifest.value.description !== 'string' || manifest.value.description.trim() === '') {
      error('plugin-description-missing', '`description` is required so people can choose what to install', manifestFile);
    }
    if (manifest.value.version !== undefined) {
      error('plugin-version-pinned', 'plugin.json sets `version`; omit it so every merge to main ships as an update', manifestFile);
    }
  }

  if (!existsSync(join(pluginDir, 'README.md'))) {
    warn('plugin-readme-missing', `plugin "${pluginName}" has no README.md to say who it is for`, pluginDir);
  }
}

function directories(parent) {
  if (!existsSync(parent)) return [];
  return readdirSync(parent, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'))
    .map((entry) => entry.name)
    .sort();
}

function readJson(file) {
  if (!existsSync(file)) return { missing: true };
  try {
    return { value: JSON.parse(readFileSync(file, 'utf8')) };
  } catch (cause) {
    return { invalid: cause.message };
  }
}
