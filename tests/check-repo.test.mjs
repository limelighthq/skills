import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { rmSync, unlinkSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

import { checkRepo } from '../tools/lib/check-repo.mjs';
import { makeRepo, makeSkill, rules, tempDir, writeFiles } from './helpers.mjs';

const CLI = join(dirname(fileURLToPath(import.meta.url)), '..', 'tools', 'validate.mjs');

function marketplace(root, value) {
  writeFileSync(join(root, '.claude-plugin/marketplace.json'), typeof value === 'string' ? value : JSON.stringify(value));
}

function entry(name, extra = {}) {
  return { name, source: `./plugins/${name}`, description: `${name} skills`, ...extra };
}

test('a valid marketplace repo has no findings and reports its size', () => {
  const result = checkRepo(makeRepo(tempDir(), { plugins: { engineering: ['changelog', 'handoff'], company: ['md-render'] } }));
  assert.deepEqual(result.errors, []);
  assert.deepEqual(result.warnings, []);
  assert.deepEqual(result.stats, { plugins: 2, skills: 3 });
});

test('a repo without .claude-plugin/marketplace.json is an error', () => {
  const root = makeRepo(tempDir());
  unlinkSync(join(root, '.claude-plugin/marketplace.json'));
  assert.deepEqual(rules(checkRepo(root).errors), ['marketplace-missing']);
});

test('marketplace.json must be valid JSON', () => {
  const root = makeRepo(tempDir());
  marketplace(root, '{ "name": ');
  assert.deepEqual(rules(checkRepo(root).errors), ['marketplace-invalid-json']);
});

for (const name of ['Limelight', 'claude-plugins-official', 'anthropic-plugins']) {
  test(`marketplace name "${name}" is rejected`, () => {
    const root = makeRepo(tempDir());
    marketplace(root, { name, owner: { name: 'Limelight' }, plugins: [entry('engineering')] });
    assert.deepEqual(rules(checkRepo(root).errors), ['marketplace-name-invalid']);
  });
}

test('marketplace owner.name is required', () => {
  const root = makeRepo(tempDir());
  marketplace(root, { name: 'limelight', plugins: [entry('engineering')] });
  assert.deepEqual(rules(checkRepo(root).errors), ['marketplace-owner-missing']);
});

test('a plugin directory that the marketplace does not list is an error', () => {
  const root = makeRepo(tempDir(), { plugins: { engineering: ['changelog'], company: ['md-render'] } });
  marketplace(root, { name: 'limelight', owner: { name: 'Limelight' }, plugins: [entry('engineering')] });
  const result = checkRepo(root);
  assert.deepEqual(rules(result.errors), ['plugin-unlisted']);
  assert.match(result.errors[0].message, /company/);
});

test('a marketplace entry whose source directory is missing is an error', () => {
  const root = makeRepo(tempDir());
  marketplace(root, { name: 'limelight', owner: { name: 'Limelight' }, plugins: [entry('engineering'), entry('design')] });
  assert.deepEqual(rules(checkRepo(root).errors), ['plugin-source-missing']);
});

test('two marketplace entries with one name is an error', () => {
  const root = makeRepo(tempDir());
  marketplace(root, { name: 'limelight', owner: { name: 'Limelight' }, plugins: [entry('engineering'), entry('engineering')] });
  assert.deepEqual(rules(checkRepo(root).errors), ['plugin-duplicate-name']);
});

test('a plugin without .claude-plugin/plugin.json is an error', () => {
  const root = makeRepo(tempDir());
  unlinkSync(join(root, 'plugins/engineering/.claude-plugin/plugin.json'));
  assert.deepEqual(rules(checkRepo(root).errors), ['plugin-manifest-missing']);
});

test('portable-manifest-missing: every plugin needs the standard entry point', () => {
  const root = makeRepo(tempDir());
  unlinkSync(join(root, 'plugins/engineering/plugin.json'));
  assert.deepEqual(rules(checkRepo(root).errors), ['portable-manifest-missing']);
});

for (const content of ['null', '{', '{"name":"engineering"}', '{"$schema":"https://wrong.test/schema","name":"engineering"}']) {
  test(`portable-manifest-invalid: rejects an unreadable manifest or unsupported schema (${content})`, () => {
    const root = makeRepo(tempDir());
    writeFiles(root, { 'plugins/engineering/plugin.json': content });
    assert.deepEqual(rules(checkRepo(root).errors), ['portable-manifest-invalid']);
  });
}

test('portable-manifest-drift: both entry points describe the same plugin', () => {
  const root = makeRepo(tempDir());
  writeFiles(root, { 'plugins/engineering/plugin.json': JSON.stringify({
    $schema: 'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json',
    name: 'engineering', description: 'Stale copy',
  }) });
  assert.deepEqual(rules(checkRepo(root).errors), ['portable-manifest-drift']);
});

test('plugin-version-pinned: the portable manifest also follows commit-based releases', () => {
  const root = makeRepo(tempDir());
  writeFiles(root, { 'plugins/engineering/plugin.json': JSON.stringify({
    $schema: 'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json',
    name: 'engineering', description: 'engineering skills', version: '1.0.0',
  }) });
  assert.deepEqual(rules(checkRepo(root).errors), ['plugin-version-pinned']);
});

test('plugin.json name must equal the plugin directory name', () => {
  const root = makeRepo(tempDir());
  writeFiles(root, { 'plugins/engineering/.claude-plugin/plugin.json': JSON.stringify({ name: 'eng', description: 'x' }) });
  assert.deepEqual(rules(checkRepo(root).errors), ['plugin-name-mismatch']);
});

test('plugin.json needs a description so people can choose what to install', () => {
  const root = makeRepo(tempDir());
  writeFiles(root, { 'plugins/engineering/.claude-plugin/plugin.json': JSON.stringify({ name: 'engineering' }) });
  assert.deepEqual(rules(checkRepo(root).errors), ['plugin-description-missing']);
});

test('a pinned version is an error in plugin.json and in the marketplace entry', () => {
  const inManifest = makeRepo(tempDir());
  writeFiles(inManifest, { 'plugins/engineering/.claude-plugin/plugin.json': JSON.stringify({ name: 'engineering', description: 'x', version: '1.0.0' }) });
  assert.deepEqual(rules(checkRepo(inManifest).errors), ['plugin-version-pinned']);

  const inEntry = makeRepo(tempDir());
  marketplace(inEntry, { name: 'limelight', owner: { name: 'Limelight' }, plugins: [entry('engineering', { version: '1.0.0' })] });
  assert.deepEqual(rules(checkRepo(inEntry).errors), ['plugin-version-pinned']);
});

test('a plugin with no skills is an error', () => {
  const root = makeRepo(tempDir());
  rmSync(join(root, 'plugins/engineering/skills'), { recursive: true });
  assert.deepEqual(rules(checkRepo(root).errors), ['plugin-empty']);
});

test('one skill name in two plugins is an error because most harnesses have a flat namespace', () => {
  const root = makeRepo(tempDir(), { plugins: { engineering: ['changelog'], company: ['changelog'] } });
  const result = checkRepo(root);
  assert.deepEqual(rules(result.errors), ['skill-name-duplicate']);
  assert.match(result.errors[0].message, /engineering/);
  assert.match(result.errors[0].message, /company/);
});

test('skill findings surface through the repo check', () => {
  const root = makeRepo(tempDir());
  makeSkill(join(root, 'plugins/engineering/skills'), 'broken', { frontmatter: 'name: broken' });
  assert.deepEqual(rules(checkRepo(root).errors), ['description-missing']);
});

test('a plugin without a README warns', () => {
  const root = makeRepo(tempDir());
  unlinkSync(join(root, 'plugins/engineering/README.md'));
  const result = checkRepo(root);
  assert.deepEqual(result.errors, []);
  assert.deepEqual(rules(result.warnings), ['plugin-readme-missing']);
});

test('the CLI exits 0 on a valid repo and prints a summary', () => {
  const run = spawnSync(process.execPath, [CLI, makeRepo(tempDir())], { encoding: 'utf8' });
  assert.equal(run.status, 0, run.stdout + run.stderr);
  assert.match(run.stdout, /1 plugin, 1 skill/);
});

test('the CLI exits 1 on errors and names the rule and the file', () => {
  const root = makeRepo(tempDir());
  makeSkill(join(root, 'plugins/engineering/skills'), 'broken', { frontmatter: 'name: broken' });
  const run = spawnSync(process.execPath, [CLI, root], { encoding: 'utf8' });
  assert.equal(run.status, 1);
  assert.match(run.stdout, /description-missing/);
  assert.match(run.stdout, /plugins\/engineering\/skills\/broken\/SKILL\.md/);
});

test('the CLI exits 0 when there are only warnings', () => {
  const root = makeRepo(tempDir());
  unlinkSync(join(root, 'plugins/engineering/README.md'));
  const run = spawnSync(process.execPath, [CLI, root], { encoding: 'utf8' });
  assert.equal(run.status, 0, run.stdout + run.stderr);
  assert.match(run.stdout, /plugin-readme-missing/);
});
