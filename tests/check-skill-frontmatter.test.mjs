import assert from 'node:assert/strict';
import { unlinkSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';

import { checkSkill } from '../tools/lib/check-skill.mjs';
import { makeSkill, rules, tempDir } from './helpers.mjs';

function check(dirName, options) {
  return checkSkill(makeSkill(tempDir(), dirName, options));
}

test('a minimal spec-compliant skill has no findings', () => {
  const result = check('changelog');
  assert.deepEqual(result.errors, []);
  assert.deepEqual(result.warnings, []);
});

test('a skill directory without SKILL.md is an error', () => {
  const dir = makeSkill(tempDir(), 'changelog');
  unlinkSync(join(dir, 'SKILL.md'));
  assert.deepEqual(rules(checkSkill(dir).errors), ['skill-md-missing']);
});

test('SKILL.md must open with frontmatter on line 1', () => {
  // A leading blank line: harnesses only recognize frontmatter at the top of the file.
  const result = check('changelog', { raw: '\n---\nname: changelog\ndescription: Use when x.\n---\nbody\n' });
  assert.deepEqual(rules(result.errors), ['frontmatter-missing']);
});

test('unparseable YAML frontmatter is an error', () => {
  const result = check('changelog', { frontmatter: 'name: changelog\ndescription: "unterminated' });
  assert.deepEqual(rules(result.errors), ['frontmatter-invalid-yaml']);
});

test('name is required', () => {
  const result = check('changelog', { frontmatter: 'description: Builds a changelog. Use when releasing.' });
  assert.deepEqual(rules(result.errors), ['name-missing']);
});

for (const bad of ['Changelog', '-changelog', 'changelog-', 'change--log', 'change_log', 'a'.repeat(65)]) {
  test(`name "${bad.slice(0, 20)}" violates the Agent Skills naming rules`, () => {
    const result = check(bad, { frontmatter: `name: ${bad}\ndescription: Builds a changelog. Use when releasing.` });
    assert.deepEqual(rules(result.errors), ['name-invalid']);
  });
}

test('name must equal the directory name', () => {
  const result = check('changelog', { frontmatter: 'name: release-notes\ndescription: Builds notes. Use when releasing.' });
  assert.deepEqual(rules(result.errors), ['name-dir-mismatch']);
});

test('description is required and must be non-empty', () => {
  assert.deepEqual(rules(check('changelog', { frontmatter: 'name: changelog' }).errors), ['description-missing']);
  assert.deepEqual(rules(check('changelog', { frontmatter: 'name: changelog\ndescription: ""' }).errors), ['description-missing']);
});

test('description over 1,024 characters is an error', () => {
  const long = `Use when releasing. ${'x'.repeat(1024)}`;
  const result = check('changelog', { frontmatter: `name: changelog\ndescription: ${long}` });
  assert.deepEqual(rules(result.errors), ['description-too-long']);
});

test('a block-scalar description is an error because Claude Code lists it as empty', () => {
  const result = check('changelog', { frontmatter: 'name: changelog\ndescription: >\n  Builds a changelog.\n  Use when releasing.' });
  assert.deepEqual(rules(result.errors), ['description-not-single-line']);
});

test('an unquoted description containing " #" is an error because YAML truncates it', () => {
  const result = check('changelog', { frontmatter: 'name: changelog\ndescription: Builds notes for issue #12. Use when releasing.' });
  assert.deepEqual(rules(result.errors), ['description-truncated-by-comment']);
});

test('a quoted description may contain " #"', () => {
  const result = check('changelog', { frontmatter: 'name: changelog\ndescription: "Builds notes for issue #12. Use when releasing."' });
  assert.deepEqual(result.errors, []);
});

test('unknown-field: host-specific frontmatter is not portable', () => {
  const result = check('changelog', {
    frontmatter: [
      'name: changelog',
      'description: Builds a changelog.',
      'when_to_use: Use when releasing.',
      'disable-model-invocation: true',
      'allowed-tools: Bash(git log *) Read',
      'argument-hint: "[version]"',
    ].join('\n'),
  });
  assert.deepEqual(rules(result.errors), ['unknown-field', 'unknown-field', 'unknown-field']);
  assert.deepEqual(rules(result.warnings), ['description-no-trigger']);
});

for (const value of ['[Read, Bash]', 'true', '42', '""', 'null']) {
  test(`allowed-tools-invalid: rejects a non-string or empty tool list (${value})`, () => {
    const result = check('changelog', { frontmatter: `name: changelog\ndescription: Builds notes. Use when releasing.\nallowed-tools: ${value}` });
    assert.deepEqual(rules(result.errors), ['allowed-tools-invalid']);
  });
}

test('a spec-format allowed-tools string remains valid', () => {
  const result = check('changelog', { frontmatter: 'name: changelog\ndescription: Builds notes. Use when releasing.\nallowed-tools: Read Bash(git:*)' });
  assert.deepEqual(result.errors, []);
});

test('an unknown top-level field is an error that points at metadata', () => {
  const result = check('changelog', { frontmatter: 'name: changelog\ndescription: Builds notes. Use when releasing.\nversion: 1.0.0' });
  assert.deepEqual(rules(result.errors), ['unknown-field']);
  assert.match(result.errors[0].message, /version/);
  assert.match(result.errors[0].message, /metadata/);
});

test('metadata must map string keys to string values', () => {
  const ok = check('changelog', { frontmatter: 'name: changelog\ndescription: Builds notes. Use when releasing.\nmetadata:\n  version: "1.0.0"\n  owner: platform' });
  assert.deepEqual(ok.errors, []);
  const bad = check('changelog', { frontmatter: 'name: changelog\ndescription: Builds notes. Use when releasing.\nmetadata:\n  version: 1.0\n  requires: [a, b]' });
  assert.deepEqual(rules(bad.errors), ['metadata-not-string-map', 'metadata-not-string-map']);
});

test('compatibility over 500 characters is an error', () => {
  const result = check('changelog', { frontmatter: `name: changelog\ndescription: Builds notes. Use when releasing.\ncompatibility: ${'x'.repeat(501)}` });
  assert.deepEqual(rules(result.errors), ['compatibility-too-long']);
});

test('a first-person or second-person description warns', () => {
  const result = check('changelog', { frontmatter: 'name: changelog\ndescription: I help you build a changelog. Use when releasing.' });
  assert.deepEqual(rules(result.warnings), ['description-person']);
});

test('a description with no trigger clause and no when_to_use warns', () => {
  const result = check('changelog', { frontmatter: 'name: changelog\ndescription: Builds a changelog from merged pull requests.' });
  assert.deepEqual(rules(result.warnings), ['description-no-trigger']);
});
