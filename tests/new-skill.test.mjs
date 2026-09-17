import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';

import { checkSkill } from '../tools/lib/check-skill.mjs';
import { createSkill } from '../tools/lib/create-skill.mjs';
import { makeRepo, makeSkill, rules, tempDir, writeFiles } from './helpers.mjs';

const TEMPLATE = '---\nname: {{name}}\ndescription: "TODO: say what this skill does. Use when TODO."\n---\n\n# {{title}}\n';

function repoWithTemplate() {
  const root = makeRepo(tempDir());
  writeFiles(root, { 'templates/skill/SKILL.md': TEMPLATE });
  return root;
}

test('creates the skill from the template with its name and title filled in', () => {
  const root = repoWithTemplate();
  const created = createSkill({ root, plugin: 'engineering', name: 'release-notes' });
  assert.equal(created, join(root, 'plugins/engineering/skills/release-notes'));
  const text = readFileSync(join(created, 'SKILL.md'), 'utf8');
  assert.match(text, /^name: release-notes$/m);
  assert.match(text, /^# Release Notes$/m);
});

test('a freshly scaffolded skill fails validation only on its unwritten description', () => {
  const root = repoWithTemplate();
  const created = createSkill({ root, plugin: 'engineering', name: 'release-notes' });
  assert.deepEqual(rules(checkSkill(created).errors), ['description-placeholder']);
});

test('refuses a name that breaks the naming rules', () => {
  assert.throws(() => createSkill({ root: repoWithTemplate(), plugin: 'engineering', name: 'Release_Notes' }), /lowercase/);
});

test('refuses a plugin that does not exist and lists the ones that do', () => {
  assert.throws(() => createSkill({ root: repoWithTemplate(), plugin: 'marketing', name: 'release-notes' }), /engineering/);
});

test('refuses a skill name that any plugin already uses', () => {
  const root = repoWithTemplate();
  makeSkill(join(root, 'plugins/engineering/skills'), 'release-notes');
  assert.throws(() => createSkill({ root, plugin: 'engineering', name: 'release-notes' }), /already exists/);
});
