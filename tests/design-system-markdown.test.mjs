import assert from 'node:assert/strict';
import { test } from 'node:test';

import { addContents, rewriteLinks, slugify, splitReadme } from '../tools/lib/design-system-markdown.mjs';

test('slugify turns a heading into a lowercase, hyphenated file name', () => {
  assert.equal(slugify('Contrast (WCAG 2.2 AA)'), 'contrast-wcag-2-2-aa');
  assert.equal(slugify('Logo, portraits and images'), 'logo-portraits-and-images');
});

test('splitReadme puts the intro in overview.md and each ## section in its own file', () => {
  const parts = splitReadme('Intro line.\n\n## Content fundamentals\n\n- Rule\n\n## Visual foundations\n\n### Type\n\nText\n');
  assert.deepEqual(parts.map((part) => part.file), ['overview.md', 'content-fundamentals.md', 'visual-foundations.md']);
  assert.equal(parts[0].text, '# Overview\n\nIntro line.\n');
  assert.equal(parts[1].text, '# Content fundamentals\n\n- Rule\n');
  assert.equal(parts[2].text, '# Visual foundations\n\n## Type\n\nText\n');
});

test('splitReadme does not split at a ## line inside a code fence', () => {
  const parts = splitReadme('Intro\n\n## Real\n\n```md\n## Not a section\n```\n');
  assert.deepEqual(parts.map((part) => part.file), ['overview.md', 'real.md']);
  assert.equal(parts[1].text, '# Real\n\n```md\n## Not a section\n```\n');
});

test('splitReadme refuses two sections that map to one file name', () => {
  assert.throws(() => splitReadme('## Colour\n\nA\n\n## colour!\n\nB\n'), /colour\.md/);
});

test('splitReadme refuses a section that would replace a generated file', () => {
  assert.throws(() => splitReadme('## Source\n\nA\n'), /source\.md/);
});

test('addContents lists the subsections of a file over 100 lines', () => {
  const lines = ['# Exceptions', '', '## Text', ...Array(60).fill('row'), '## Focus', ...Array(60).fill('row')];
  const result = addContents(`${lines.join('\n')}\n`);
  assert.ok(result.startsWith('# Exceptions\n\n## Contents\n\n- Text\n- Focus\n\n## Text\nrow'));
});

test('addContents says so when a long file has no subsections', () => {
  const result = addContents(`# Contrast\n\n${Array(120).fill('| a | b |').join('\n')}\n`);
  assert.ok(result.startsWith('# Contrast\n\n## Contents\n\nThis file has no subsections.\n\n| a | b |'));
});

test('addContents leaves a file of 100 lines or fewer unchanged', () => {
  const text = `# Short\n\n${Array(50).fill('line').join('\n')}\n`;
  assert.equal(addContents(text), text);
});

const PATHS = new Map([
  ['project/components/Button/README.md', 'references/components/Button.md'],
  ['/_blob/0123456789abcdef0123456789abcdef', 'assets/kit/images/Logos/logo.svg'],
]);

test('rewriteLinks points links at the copies inside the skill', () => {
  const text = 'See [Button](../Button/README.md#states) and ![logo](/_blob/0123456789abcdef0123456789abcdef).';
  const result = rewriteLinks(text, { from: 'project/components/Badge/README.md', to: 'references/components/Badge.md', paths: PATHS });
  assert.equal(result, 'See [Button](Button.md#states) and ![logo](../../assets/kit/images/Logos/logo.svg).');
});

test('rewriteLinks leaves URLs, anchors, and code alone', () => {
  const text = '[site](https://limelighthq.com) [top](#top) `[x](../Nope/README.md)`\n\n```\n[y](../Nope/README.md)\n```';
  assert.equal(rewriteLinks(text, { from: 'project/README.md', to: 'references/overview.md', paths: PATHS }), text);
});

test('rewriteLinks refuses a relative link to a file the skill does not carry', () => {
  assert.throws(
    () => rewriteLinks('[guide](../../guidelines/imagery.md)', { from: 'project/components/Badge/README.md', to: 'references/components/Badge.md', paths: PATHS }),
    /project\/guidelines\/imagery\.md/,
  );
});
