# Design System Skills Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship two `company` skills that carry generated copies of the Limelight Product and Limelight Marketing design systems, plus the tested sync tool and the Claude Code maintenance skill that refresh them.

**Architecture:** A Node tool turns a downloaded claude.ai design system (`project/` files plus `blobs/` images) into a skill's `references/` and `assets/kit/` folders. It prepares every file in memory, then replaces both folders. Each skill's hand-written `SKILL.md` routes an agent to those files for four request types. A Claude Code maintenance skill does the download, because only a Claude host can read the artifacts.

**Tech Stack:** Node.js 20+ ES modules, `node:test`, the existing validator in `tools/lib/`, React 18.3.1 UMD from jsDelivr (prototype pages only), Codex CLI 0.147.0 and Claude Code for the behavior and discovery checks.

**Spec:** `docs/superpowers/specs/2026-09-24 — Design system skills.md`

## Global Constraints

- Skill folders: `plugins/company/skills/limelight-product-design-system/` and `plugins/company/skills/limelight-marketing-design-system/`.
- Sources: Limelight Product is `https://claude.ai/artifact/1z8r8nfNgeVQZ7miW2Lhzi`. Limelight Marketing Design System is `https://claude.ai/artifact/6bxpAybE1yBvnSpVB2CBTM`.
- Frontmatter uses Agent Skills fields only. `metadata` values are strings. `description` is one line in double quotes.
- `SKILL.md` bodies name capabilities, never host tool names, and stay under 150 lines.
- Every file in a skill is at most 1,048,576 bytes. An image over that becomes WebP at quality 90 with the same pixel size.
- The kit page loads React and ReactDOM 18.3.1 from `cdn.jsdelivr.net`, with Subresource Integrity hashes and `crossorigin="anonymous"`.
- The sync tool owns `references/` and `assets/kit/`. `SKILL.md` is the only file a person edits in a design system skill.
- The sync tool never reads `artifact-type/`, the root `index.html`, or the root `SKILL.md` of an artifact.
- The same download always gives byte-identical output.
- Nothing personal enters the repo: no home-directory paths, secrets, or run artifacts. Evaluation output stays in `$SCRATCH`.
- `$SCRATCH` is a scratch folder outside the repo. Each shell block sets it first: `SCRATCH="${SCRATCH:-${TMPDIR:-/tmp}/design-system-skills}"; mkdir -p "$SCRATCH"`. In a Claude Code session with a scratchpad, export the scratchpad path as `SCRATCH` instead.
- Steps that read claude.ai need the Artifact tool. Run them in the main Claude Code session if a subagent lacks it.
- Prose in repo files: plain language, one idea per sentence, no semicolons, no em dashes.
- Each task ends with `npm run validate` (no new warnings) and `npm test` passing, then one commit on the current branch. Never push.

## Review Focus

1. A run that fails partway (for example, after a partial download) must leave the previous copy untouched. Test: Task 3, "leaves the previous copy in place when a run fails".
2. `--skill` pointed at the wrong folder, such as the repo root, must delete nothing. Test: Task 3, "refuses a --skill folder that is not a skill and deletes nothing".
3. A download without `blobs/`, when the maintainer skipped the asset step, must stop with the fix instead of shipping a kit with broken images. Test: Task 3, "stops when the assets were not downloaded".
4. A WebP that is still over 1 MB must stop the run instead of shipping an oversized file. Test: Task 3, "stops when the WebP is still over 1 MB".
5. A `##` line inside a code fence in a README must not start a new file. Test: Task 1, "splitReadme does not split at a ## line inside a code fence".

---

### Task 1: Markdown helpers

**Files:**
- Create: `tools/lib/design-system-markdown.mjs`
- Test: `tests/design-system-markdown.test.mjs`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `slugify(heading: string): string`
  - `splitReadme(markdown: string): Array<{ file: string, text: string }>`. The first item is always `overview.md`.
  - `addContents(markdown: string): string`
  - `rewriteLinks(markdown: string, { from: string, to: string, paths: Map<string, string> }): string`. `from` is a published path, `to` a skill-relative path, and `paths` maps published paths and `/_blob/<id>` URLs to skill-relative paths.

- [ ] **Step 1: Commit the spec and this plan**

```bash
git add docs/superpowers
git commit -m "Add the design system skills spec and plan"
```

- [ ] **Step 2: Write the failing tests**

Create `tests/design-system-markdown.test.mjs`:

````js
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
````

- [ ] **Step 3: Run the tests to verify they fail**

Run: `node --test tests/design-system-markdown.test.mjs`
Expected: FAIL with `Cannot find module '.../tools/lib/design-system-markdown.mjs'`.

- [ ] **Step 4: Write the implementation**

Create `tools/lib/design-system-markdown.mjs`:

```js
import { posix } from 'node:path';

const CONTENTS_MIN_LINES = 100; // the validator's reference-missing-contents threshold
const GENERATED = new Set(['overview', 'source']);
const SECTION = /^## (.+?)\s*#*\s*$/;
const LINK = /(!?\[[^\]]*\]\(\s*<?)([^)\s>]+)(>?(?:\s+"[^"]*")?\s*\))/g;

/** Turns a heading into a file name stem: "Contrast (WCAG 2.2 AA)" becomes "contrast-wcag-2-2-aa". */
export function slugify(heading) {
  return heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

/**
 * Splits a design system README at each "## " heading outside code fences.
 * overview.md holds the text before the first section. Each section gets its own
 * file, with every heading moved up one level so the section title is the "# ".
 */
export function splitReadme(markdown) {
  const parts = [{ file: 'overview.md', title: 'Overview', lines: [] }];
  let fence = null;
  for (const line of markdown.replace(/\r\n?/g, '\n').split('\n')) {
    const inside = fence !== null;
    fence = nextFence(fence, line);
    const heading = !inside && fence === null ? SECTION.exec(line) : null;
    if (!heading) {
      parts.at(-1).lines.push(line);
      continue;
    }
    const title = heading[1];
    const slug = slugify(title);
    if (!slug) throw new Error(`README section "${title}" has no letters or digits to name its file`);
    if (GENERATED.has(slug)) throw new Error(`README section "${title}" would replace the generated ${slug}.md; rename the section in the design system`);
    if (parts.some((part) => part.file === `${slug}.md`)) throw new Error(`two README sections map to ${slug}.md; rename one of them in the design system`);
    parts.push({ file: `${slug}.md`, title, lines: [] });
  }
  return parts.map(({ file, title, lines }) => {
    const body = promoteHeadings(trimBlankLines(lines));
    return { file, text: body.length > 0 ? `# ${title}\n\n${body.join('\n')}\n` : `# ${title}\n` };
  });
}

/** Adds a "## Contents" list under the title of a Markdown file longer than 100 lines. */
export function addContents(markdown) {
  const lines = markdown.split('\n');
  if (lines.length <= CONTENTS_MIN_LINES) return markdown;
  const [title, ...rest] = lines;
  const headings = [];
  let fence = null;
  for (const line of rest) {
    const inside = fence !== null;
    fence = nextFence(fence, line);
    const match = !inside && fence === null ? SECTION.exec(line) : null;
    if (match) headings.push(`- ${match[1]}`);
  }
  const list = headings.length > 0 ? headings.join('\n') : 'This file has no subsections.';
  return [title, '', '## Contents', '', list, '', ...trimLeadingBlankLines(rest)].join('\n');
}

/**
 * Points the relative links of a copied Markdown file at the skill's copies.
 * `from` is the file's published path ("project/components/Badge/README.md"), `to` its
 * path in the skill ("references/components/Badge.md"), and `paths` maps published paths
 * and "/_blob/<id>" URLs to skill paths. A relative link to anything else throws,
 * because the skill would ship it broken.
 */
export function rewriteLinks(markdown, { from, to, paths }) {
  return mapProse(markdown, (prose) => prose.replace(LINK, (whole, open, target, close) => {
    if (target.startsWith('#') || /^[a-z][a-z0-9+.-]*:/i.test(target)) return whole;
    const cut = target.search(/[?#]/);
    const path = cut === -1 ? target : target.slice(0, cut);
    const suffix = cut === -1 ? '' : target.slice(cut);
    const published = path.startsWith('/') ? path : posix.normalize(posix.join(posix.dirname(from), decodeURIComponent(path)));
    const copy = paths.get(published);
    if (!copy) throw new Error(`${from} links to ${published}, which the skill does not carry; remove the link in the design system or teach the sync tool to copy that file`);
    return `${open}${posix.relative(posix.dirname(to), copy)}${suffix}${close}`;
  }));
}

// Applies `transform` to text outside fenced code blocks and inline code spans.
function mapProse(markdown, transform) {
  const out = [];
  let prose = [];
  let fence = null;
  const flush = () => {
    if (prose.length === 0) return;
    const parts = prose.join('\n').split(/(`[^`\n]*`)/);
    out.push(parts.map((part, index) => (index % 2 === 1 ? part : transform(part))).join(''));
    prose = [];
  };
  for (const line of markdown.split('\n')) {
    const inside = fence !== null;
    fence = nextFence(fence, line);
    if (inside || fence !== null) {
      flush();
      out.push(line);
    } else {
      prose.push(line);
    }
  }
  flush();
  return out.join('\n');
}

// Tracks an open code fence: returns its marker while open, or null when closed.
function nextFence(open, line) {
  const marker = /^(`{3,}|~{3,})/.exec(line)?.[1];
  if (!marker) return open;
  if (open === null) return marker;
  return marker[0] === open[0] && marker.length >= open.length ? null : open;
}

function promoteHeadings(lines) {
  let fence = null;
  return lines.map((line) => {
    const inside = fence !== null;
    fence = nextFence(fence, line);
    return !inside && fence === null ? line.replace(/^#(#{1,5}\s)/, '$1') : line;
  });
}

function trimBlankLines(lines) {
  let start = 0;
  let end = lines.length;
  while (start < end && lines[start].trim() === '') start += 1;
  while (end > start && lines[end - 1].trim() === '') end -= 1;
  return lines.slice(start, end);
}

function trimLeadingBlankLines(lines) {
  const start = lines.findIndex((line) => line.trim() !== '');
  return start === -1 ? [] : lines.slice(start);
}
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `node --test tests/design-system-markdown.test.mjs`
Expected: PASS, 11 tests.

- [ ] **Step 6: Run the repo checks and commit**

```bash
npm run validate && npm test
git add tools/lib/design-system-markdown.mjs tests/design-system-markdown.test.mjs
git commit -m "Add Markdown helpers for the design system sync tool"
```

Expected: `3 plugins, 10 skills: 0 errors, 0 warnings`, and every test passes.

---

### Task 2: tokens.css compiler

**Files:**
- Create: `tools/lib/design-system-tokens.mjs`
- Test: `tests/design-system-tokens.test.mjs`

**Interfaces:**
- Consumes: nothing.
- Produces: `compileTokensCss(tokens: object): string`. `tokens` is a parsed `tokens.json` from the Design System page type.

- [ ] **Step 1: Write the failing tests**

Create `tests/design-system-tokens.test.mjs`:

```js
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { compileTokensCss } from '../tools/lib/design-system-tokens.mjs';

const TOKENS = {
  name: 'Fixture',
  version: 1,
  meta: { source: 'test' },
  color: {
    themes: [{ id: 'light', name: 'Light' }, { id: 'dark', name: 'Dark' }],
    tokens: [
      { name: 'surface', value: { light: '#ffffff', dark: '#111111' }, usage: 'Page.' },
      { name: 'ink', value: '#1d1d20', usage: 'Text.' },
      { name: 'line', value: '{ink}', usage: 'Alias.' },
    ],
  },
  shadow: { tokens: [{ name: 'shadow-xs', value: '0 1px 2px #0000000d' }] },
  spacing: { tokens: [{ name: 'space-1.5', value: '6px' }] },
  radius: { tokens: [{ name: 'radius-md', value: '8px' }] },
  zIndex: { tokens: [{ name: 'z-modal', value: '50' }] },
  type: {
    fonts: [{ family: 'Geist', file: 'fonts/Geist.woff2', weight: '100 900', style: 'normal' }],
    families: { sans: '"Geist", Arial, sans-serif' },
    groups: [{
      name: 'Body',
      family: 'sans',
      styles: [
        { name: 'body', fontSize: '14px', lineHeight: '21px', fontWeight: 400, letterSpacing: '-0.012em' },
        { name: '2xl', fontSize: 40, lineHeight: 1.1, fontWeight: 500 },
      ],
    }],
  },
};

test('puts colors and shadows in the first theme block, with aliases as var()', () => {
  assert.match(
    compileTokensCss(TOKENS),
    /:root, \[data-theme="light"\] \{\n {2}--surface: #ffffff;\n {2}--ink: #1d1d20;\n {2}--line: var\(--ink\);\n {2}--shadow-xs: 0 1px 2px #0000000d;\n\}/,
  );
});

test('gives each further theme its overrides and re-declares aliases', () => {
  assert.match(compileTokensCss(TOKENS), /\[data-theme="dark"\] \{\n {2}--surface: #111111;\n {2}--line: var\(--ink\);\n\}/);
});

test('puts spacing, radius, other families, and font stacks in :root, with dots escaped', () => {
  assert.match(
    compileTokensCss(TOKENS),
    /\n:root \{\n {2}--space-1\\\.5: 6px;\n {2}--radius-md: 8px;\n {2}--z-modal: 50;\n {2}--font-sans: "Geist", Arial, sans-serif;\n\}/,
  );
});

test('writes one class per type style and escapes a leading digit', () => {
  const css = compileTokensCss(TOKENS);
  assert.match(css, /\.body \{ font-family: var\(--font-sans\); font-size: 14px; line-height: 21px; font-weight: 400; letter-spacing: -0\.012em; \}/);
  assert.match(css, /\.\\32 xl \{ font-family: var\(--font-sans\); font-size: 40px; line-height: 1\.1; font-weight: 500; \}/);
});

test('writes an @font-face rule that points at the kit fonts folder', () => {
  assert.match(
    compileTokensCss(TOKENS),
    /@font-face \{ font-family: "Geist"; src: url\("fonts\/Geist\.woff2"\) format\("woff2"\); font-weight: 100 900; font-style: normal; \}/,
  );
});

test('refuses a token outside color and shadow whose value varies by theme', () => {
  const bad = { ...TOKENS, zIndex: { tokens: [{ name: 'z-bad', value: { light: '1' } }] } };
  assert.throws(() => compileTokensCss(bad), /z-bad/);
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node --test tests/design-system-tokens.test.mjs`
Expected: FAIL with `Cannot find module '.../tools/lib/design-system-tokens.mjs'`.

- [ ] **Step 3: Write the implementation**

Create `tools/lib/design-system-tokens.mjs`:

```js
import { extname, posix } from 'node:path';

const THEMED = ['color', 'shadow'];
const FIRST = ['spacing', 'radius'];
const NOT_TOKENS = new Set(['name', 'version', 'meta', 'type']);
const ALIAS = /^\{([^{}]+)\}$/;
const FONT_FORMATS = { '.woff2': 'woff2', '.woff': 'woff', '.ttf': 'truetype', '.otf': 'opentype' };

/**
 * Compiles a design system's tokens.json into the tokens.css its component bundle reads.
 * It follows the Design System page type: colors and shadows per theme, every other family
 * and the font stacks in :root, one class per type style, and one @font-face per font file.
 */
export function compileTokensCss(tokens) {
  const themes = tokens.color?.themes?.length ? tokens.color.themes : [{ id: 'light' }];
  const first = themes[0].id;
  const themed = THEMED.flatMap((family) => tokens[family]?.tokens ?? []);
  const sections = ['/* Generated from tokens.json by tools/sync-design-system.mjs. Do not edit. */'];

  const fonts = tokens.type?.fonts ?? [];
  if (fonts.length > 0) sections.push(fonts.map(fontFace).join('\n'));

  sections.push(block(`:root, [data-theme="${first}"]`, themed.flatMap((token) => declare(token, valueFor(token, first, first) ?? borrowed(token)))));
  for (const theme of themes.slice(1)) {
    const overrides = themed.filter((token) => hasOwnValue(token, theme.id) || isAlias(token));
    sections.push(block(`[data-theme="${theme.id}"]`, overrides.flatMap((token) => declare(token, valueFor(token, theme.id, first) ?? valueFor(token, first, first) ?? borrowed(token)))));
  }

  const plain = orderedFamilies(tokens).flatMap((family) => tokens[family].tokens.flatMap((token) => declare(token, plainValue(token))));
  const families = tokens.type?.families ?? {};
  const stacks = Object.entries(families).map(([key, stack]) => `--font-${escapeName(key)}: ${stack}`);
  sections.push(block(':root', [...plain, ...stacks]));

  for (const group of tokens.type?.groups ?? []) {
    for (const style of group.styles ?? []) sections.push(styleRule(style, group, families));
  }
  return `${sections.join('\n\n')}\n`;
}

function block(selector, declarations) {
  return `${selector} {\n${declarations.map((declaration) => `  ${declaration};`).join('\n')}\n}`;
}

function declare(token, value) {
  return value === undefined ? [] : [`--${escapeName(token.name)}: ${cssValue(value)}`];
}

function cssValue(value) {
  const alias = ALIAS.exec(String(value).trim());
  return alias ? `var(--${escapeName(alias[1])})` : String(value);
}

// A plain string or number belongs to the first theme only.
function valueFor(token, themeId, firstId) {
  if (token.value !== null && typeof token.value === 'object') return token.value[themeId];
  return themeId === firstId ? token.value : undefined;
}

// A value given only for a later theme is borrowed for the first, as the page type does.
function borrowed(token) {
  return token.value !== null && typeof token.value === 'object' ? Object.values(token.value)[0] : undefined;
}

function hasOwnValue(token, themeId) {
  return token.value !== null && typeof token.value === 'object' && token.value[themeId] !== undefined;
}

function isAlias(token) {
  const values = token.value !== null && typeof token.value === 'object' ? Object.values(token.value) : [token.value];
  return values.some((value) => typeof value === 'string' && ALIAS.test(value.trim()));
}

function plainValue(token) {
  if (typeof token.value === 'string' || typeof token.value === 'number') return token.value;
  throw new Error(`token "${token.name}" has a value that varies by theme; only color and shadow tokens may`);
}

function orderedFamilies(tokens) {
  const families = Object.keys(tokens).filter((key) => !NOT_TOKENS.has(key) && !THEMED.includes(key) && Array.isArray(tokens[key]?.tokens));
  return [...FIRST.filter((key) => families.includes(key)), ...families.filter((key) => !FIRST.includes(key))];
}

function styleRule(style, group, families) {
  const family = style.family ?? group.family;
  const declarations = [];
  if (family) declarations.push(`font-family: ${families[family] !== undefined ? `var(--font-${escapeName(family)})` : family}`);
  if (style.fontSize !== undefined) declarations.push(`font-size: ${length(style.fontSize)}`);
  if (style.lineHeight !== undefined) declarations.push(`line-height: ${lineHeight(style.lineHeight)}`);
  if (style.fontWeight !== undefined) declarations.push(`font-weight: ${style.fontWeight}`);
  if (style.letterSpacing !== undefined) declarations.push(`letter-spacing: ${length(style.letterSpacing)}`);
  if (style.fontStyle !== undefined) declarations.push(`font-style: ${style.fontStyle}`);
  if (style.opticalSize !== undefined) declarations.push(`font-variation-settings: 'opsz' ${style.opticalSize}`);
  const selector = `.${escapeName(style.name).replace(/^(\d)/, '\\3$1 ')}`;
  return declarations.length > 0 ? `${selector} { ${declarations.join('; ')}; }` : `${selector} { }`;
}

function length(value) {
  if (typeof value !== 'number') return value;
  return value === 0 ? '0' : `${value}px`;
}

function lineHeight(value) {
  return typeof value === 'number' && value < 10 ? String(value) : length(value);
}

function fontFace(font) {
  const file = posix.basename(font.file);
  const format = FONT_FORMATS[extname(file).toLowerCase()] ?? 'woff2';
  return `@font-face { font-family: "${font.family}"; src: url("fonts/${file}") format("${format}"); font-weight: ${font.weight ?? '400'}; font-style: ${font.style ?? 'normal'}; }`;
}

// Token and style names may hold dots ("space-1.5"). CSS needs them escaped.
function escapeName(name) {
  return String(name).replace(/^(--|\.)/, '').replace(/\./g, '\\.');
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `node --test tests/design-system-tokens.test.mjs`
Expected: PASS, 6 tests.

- [ ] **Step 5: Run the repo checks and commit**

```bash
npm run validate && npm test
git add tools/lib/design-system-tokens.mjs tests/design-system-tokens.test.mjs
git commit -m "Add the tokens.css compiler for the design system sync tool"
```

---

### Task 3: Sync tool

**Files:**
- Create: `tools/lib/sync-design-system.mjs`
- Create: `tools/sync-design-system.mjs`
- Modify: `package.json` (add one script)
- Test: `tests/sync-design-system.test.mjs`

**Interfaces:**
- Consumes: `splitReadme`, `addContents`, `rewriteLinks` (Task 1) and `compileTokensCss` (Task 2).
- Produces:
  - `MAX_FILE_BYTES: number` (1,048,576)
  - `syncDesignSystem({ source: string, skill: string, artifact: string, version: string, title?: string, rootClass?: string }): { files: number, images: number, components: number }`
  - CLI: `npm run sync:design-system -- --source <dir> --skill <dir> --artifact <url> --version <id> [--title <name>] [--root-class <class>]`. Exit 2 on bad usage, exit 1 on a sync error.

- [ ] **Step 1: Write the failing tests**

Create `tests/sync-design-system.test.mjs`:

```js
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

import { checkSkill } from '../tools/lib/check-skill.mjs';
import { MAX_FILE_BYTES, syncDesignSystem } from '../tools/lib/sync-design-system.mjs';
import { tempDir, writeFiles } from './helpers.mjs';

const LOGO = '0123456789abcdef0123456789abcdef';
const PHOTO = 'fedcba9876543210fedcba9876543210';
const CLI = fileURLToPath(new URL('../tools/sync-design-system.mjs', import.meta.url));

// A downloaded design system as the maintenance skill leaves it: project/ plus blobs/.
function fixture(files = {}) {
  const source = tempDir();
  const index = {
    v: 3,
    title: 'Fixture',
    namespace: 'FixtureApp',
    lastChange: { by: 'Grant Isom', at: '2026-09-24T02:09:03Z', via: 'Claude Code', note: 'Rebuilt.' },
    assetGroups: {
      Logos: { files: { 'logo.svg': { name: 'logo.svg', blob: LOGO, size: 6, type: 'image/svg+xml' } } },
      'Agent-references': { files: { 'photo.png': { name: 'photo.png', blob: PHOTO, size: 9, type: 'image/png' } } },
    },
  };
  const tokens = {
    color: { themes: [{ id: 'light', name: 'Light' }], tokens: [{ name: 'ink', value: '#111111', usage: 'Text.' }] },
    type: { fonts: [{ family: 'Geist', file: 'fonts/Geist.woff2', weight: '400' }], families: { sans: '"Geist", Arial' }, groups: [] },
  };
  writeFiles(source, {
    'project/design-system.json': JSON.stringify(index),
    'project/tokens.json': JSON.stringify(tokens),
    'project/README.md': 'Intro.\n\n## Content fundamentals\n\nUse [Button](components/Button/README.md).\n',
    'project/fonts/Geist.woff2': 'font-bytes',
    'project/components/bundle.js': `window.FixtureApp={};var photo="/_blob/${PHOTO}";`,
    'project/components/bundle.css': `.x{background:url("/_blob/${PHOTO}")}`,
    'project/components/index.d.ts': 'export {};\n',
    'project/components/Button/README.md': '# Button\n\nSee [Badge](../Badge/README.md).\n',
    'project/components/Button/preview.html': `<img src="/_blob/${LOGO}">`,
    'project/components/Badge/README.md': '# Badge\n',
    'project/assets/Logos/README.md': 'Logo notes.\n',
    [`blobs/${LOGO}.svg`]: '<svg/>',
    [`blobs/${PHOTO}.png`]: 'png-bytes',
    ...files,
  });
  return source;
}

function run(source, { skill = join(tempDir(), 'fixture-design-system'), ...options } = {}) {
  const summary = syncDesignSystem({ source, skill, artifact: 'https://claude.ai/artifact/abc', version: '1-a', ...options });
  return { skill, summary };
}

const read = (root, path) => readFileSync(join(root, path), 'utf8');

function listFiles(root) {
  return readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const path = join(root, entry.name);
    return entry.isDirectory() ? listFiles(path) : [path];
  });
}

const relativeFiles = (root) => listFiles(root).map((file) => relative(root, file).split(sep).join('/')).sort();

test('writes the README sections, guides, previews, image notes, kit, and source note', () => {
  const { skill, summary } = run(fixture());
  assert.deepEqual(relativeFiles(skill), [
    'assets/kit/bundle.css',
    'assets/kit/bundle.js',
    'assets/kit/fonts/Geist.woff2',
    'assets/kit/images/Agent-references/photo.png',
    'assets/kit/images/Logos/logo.svg',
    'assets/kit/index.html',
    'assets/kit/tokens.css',
    'references/components/Badge.md',
    'references/components/Button.md',
    'references/content-fundamentals.md',
    'references/images/Logos.md',
    'references/index.d.ts',
    'references/overview.md',
    'references/previews/Button.html',
    'references/source.md',
    'references/tokens.json',
  ]);
  assert.deepEqual(summary, { files: 16, images: 2, components: 2 });
});

test('rewrites links so they point at the copies', () => {
  const { skill } = run(fixture());
  assert.match(read(skill, 'references/content-fundamentals.md'), /\[Button\]\(components\/Button\.md\)/);
  assert.match(read(skill, 'references/components/Button.md'), /\[Badge\]\(Badge\.md\)/);
  assert.equal(read(skill, 'references/images/Logos.md'), '# Logos\n\nLogo notes.\n');
});

test('rewrites every blob URL to an image inside the kit', () => {
  const { skill } = run(fixture());
  assert.equal(read(skill, 'assets/kit/bundle.js'), 'window.FixtureApp={};var photo="images/Agent-references/photo.png";');
  assert.equal(read(skill, 'assets/kit/bundle.css'), '.x{background:url("images/Agent-references/photo.png")}');
  assert.equal(read(skill, 'references/previews/Button.html'), '<img src="images/Logos/logo.svg">');
  assert.equal(read(skill, 'assets/kit/images/Logos/logo.svg'), '<svg/>');
});

test('builds the kit page, tokens.css, and fonts', () => {
  const { skill } = run(fixture(), { rootClass: 'lla' });
  const page = read(skill, 'assets/kit/index.html');
  assert.match(page, /<html lang="en" data-theme="light">/);
  assert.ok(page.includes('react@18.3.1/umd/react.production.min.js" integrity="sha384-DGyLxAyjq0f9SPpVevD6IgztCFlnMF6oW/XQGmfe+IsZ8TqEiDrcHkMLKI6fiB/Z" crossorigin="anonymous"'));
  assert.ok(page.includes('react-dom@18.3.1/umd/react-dom.production.min.js" integrity="sha384-gTGxhz21lVGYNMcdJOyq01Edg0jhn/c22nsx0kyqP0TxaV5WVdsSH1fSDUf5YJj1" crossorigin="anonymous"'));
  assert.match(page, /<div id="root" class="lla"><\/div>/);
  assert.match(page, /window\.FixtureApp/);
  assert.match(read(skill, 'assets/kit/tokens.css'), /--ink: #111111;/);
  assert.equal(read(skill, 'assets/kit/fonts/Geist.woff2'), 'font-bytes');
});

test('writes the artifact, version, and last change to source.md', () => {
  const text = read(run(fixture()).skill, 'references/source.md');
  assert.match(text, /- Artifact: https:\/\/claude\.ai\/artifact\/abc/);
  assert.match(text, /- Version: 1-a/);
  assert.match(text, /- Last change: 2026-09-24T02:09:03Z, by Grant Isom, via Claude Code/);
  assert.match(text, /- Note: Rebuilt\./);
});

test('the generated copy passes the skill validator', () => {
  const skill = join(tempDir(), 'fixture-design-system');
  writeFiles(skill, {
    'SKILL.md': '---\nname: fixture-design-system\ndescription: "Fixture design system. Use when testing the sync tool."\n---\n\n# Fixture\n\nRead [the source](references/source.md).\n',
  });
  run(fixture(), { skill });
  assert.deepEqual(checkSkill(skill).errors, []);
});

test('stops on a blob URL that no asset record names', () => {
  const source = fixture({ 'project/components/bundle.js': 'var u="/_blob/99999999999999999999999999999999";' });
  assert.throws(() => run(source), /project\/components\/bundle\.js refers to \/_blob\/9{32}/);
});

test('stops on an image over 1 MB until a WebP stands in for it', () => {
  const source = fixture();
  writeFileSync(join(source, 'blobs', `${PHOTO}.png`), Buffer.alloc(MAX_FILE_BYTES + 1));
  assert.throws(() => run(source), /Agent-references\/photo\.png is 1\.0 MB, over the 1 MB limit; re-encode it: cwebp/);
  writeFileSync(join(source, 'blobs', `${PHOTO}.webp`), 'webp-bytes');
  const { skill } = run(source);
  assert.equal(read(skill, 'assets/kit/images/Agent-references/photo.webp'), 'webp-bytes');
  assert.match(read(skill, 'assets/kit/bundle.js'), /images\/Agent-references\/photo\.webp/);
});

test('stops when the WebP is still over 1 MB', () => {
  const source = fixture();
  writeFileSync(join(source, 'blobs', `${PHOTO}.png`), Buffer.alloc(MAX_FILE_BYTES + 1));
  writeFileSync(join(source, 'blobs', `${PHOTO}.webp`), Buffer.alloc(MAX_FILE_BYTES + 1));
  assert.throws(() => run(source), /WebP for Agent-references\/photo\.png is 1\.0 MB/);
});

test('stops when the assets were not downloaded', () => {
  const source = fixture();
  rmSync(join(source, 'blobs'), { recursive: true });
  assert.throws(() => run(source), /asset Agent-references\/photo\.png .*read it by its blob id/);
});

test('removes stale generated files and leaves SKILL.md and other files alone', () => {
  const skill = join(tempDir(), 'fixture-design-system');
  writeFiles(skill, {
    'SKILL.md': 'hand-written',
    'references/old.md': 'stale',
    'assets/kit/old.js': 'stale',
    'assets/notes.txt': 'kept',
  });
  run(fixture(), { skill });
  assert.equal(read(skill, 'SKILL.md'), 'hand-written');
  assert.equal(existsSync(join(skill, 'references/old.md')), false);
  assert.equal(existsSync(join(skill, 'assets/kit/old.js')), false);
  assert.equal(read(skill, 'assets/notes.txt'), 'kept');
});

test('leaves the previous copy in place when a run fails', () => {
  const source = fixture();
  const { skill } = run(source);
  const before = read(skill, 'references/overview.md');
  writeFileSync(join(source, 'project/components/bundle.js'), 'var u="/_blob/99999999999999999999999999999999";');
  assert.throws(() => run(source, { skill }), /no asset record/);
  assert.equal(read(skill, 'references/overview.md'), before);
  assert.equal(read(skill, 'assets/kit/bundle.js'), 'window.FixtureApp={};var photo="images/Agent-references/photo.png";');
});

test('refuses a --skill folder that is not a skill and deletes nothing', () => {
  const parent = tempDir();
  const repo = join(parent, 'my-repo');
  writeFiles(repo, { '.git/HEAD': 'ref', 'references/keep.md': 'keep' });
  assert.throws(() => run(fixture(), { skill: repo }), /project root/);
  assert.equal(read(repo, 'references/keep.md'), 'keep');
  assert.throws(() => run(fixture(), { skill: join(parent, 'Not A Skill') }), /kebab-case/);
});

test('refuses README sections the tool does not copy', () => {
  assert.throws(() => run(fixture({ 'project/guidelines/imagery.md': '# Imagery\n' })), /project\/guidelines\/imagery\.md/);
});

test('refuses output that still points at a claude.ai-only blob URL', () => {
  assert.throws(() => run(fixture({ 'project/components/bundle.js': 'var u="/_blob/"+id;' })), /still contains "\/_blob\/"/);
});

test('refuses asset names that are unsafe in a URL', () => {
  const source = fixture();
  const index = JSON.parse(read(source, 'project/design-system.json'));
  index.assetGroups.Logos.files['logo.svg'].name = 'my logo.svg';
  writeFileSync(join(source, 'project/design-system.json'), JSON.stringify(index));
  assert.throws(() => run(source), /Logos\/my logo\.svg/);
});

test('gives byte-identical output when run twice on the same download', () => {
  const source = fixture();
  const first = run(source).skill;
  const second = run(source).skill;
  assert.deepEqual(relativeFiles(second), relativeFiles(first));
  for (const path of relativeFiles(first)) assert.ok(readFileSync(join(first, path)).equals(readFileSync(join(second, path))), path);
});

test('the command line explains a missing option', () => {
  const result = spawnSync(process.execPath, [CLI, '--source', 'x'], { encoding: 'utf8' });
  assert.equal(result.status, 2);
  assert.match(result.stderr, /missing --skill, --artifact, --version/);
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node --test tests/sync-design-system.test.mjs`
Expected: FAIL with `Cannot find module '.../tools/lib/sync-design-system.mjs'`.

- [ ] **Step 3: Write the library**

Create `tools/lib/sync-design-system.mjs`:

```js
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { basename, dirname, extname, join, posix, relative, resolve, sep } from 'node:path';

import { addContents, rewriteLinks, splitReadme } from './design-system-markdown.mjs';
import { compileTokensCss } from './design-system-tokens.mjs';

export const MAX_FILE_BYTES = 1024 * 1024; // the validator's file-too-large limit

const REACT_VERSION = '18.3.1';
// Subresource Integrity hashes of the pinned UMD builds. jsDelivr and unpkg served identical bytes on 2026-09-24.
const REACT_SRI = 'sha384-DGyLxAyjq0f9SPpVevD6IgztCFlnMF6oW/XQGmfe+IsZ8TqEiDrcHkMLKI6fiB/Z';
const REACT_DOM_SRI = 'sha384-gTGxhz21lVGYNMcdJOyq01Edg0jhn/c22nsx0kyqP0TxaV5WVdsSH1fSDUf5YJj1';
const SKILL_NAME = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const SAFE_SEGMENT = /^[A-Za-z0-9._-]+$/;
const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
const BLOB = /\/_blob\/([0-9a-f]{32})/g;

/**
 * Rebuilds a design system skill's generated copy from a design system downloaded from claude.ai.
 * `source` holds project/ (the published files) and blobs/ (each asset, read by its blob id).
 * The skill's references/ and assets/kit/ are deleted and rewritten. Nothing else in it changes.
 * Every file is prepared in memory first, so a run that fails leaves the previous copy in place.
 */
export function syncDesignSystem({ source, skill, artifact, version, title, rootClass }) {
  checkSkillFolder(skill);
  if (rootClass !== undefined && !/^[A-Za-z0-9_-]+$/.test(rootClass)) throw new Error(`--root-class "${rootClass}" is not a CSS class name`);

  const project = join(source, 'project');
  const index = readJson(join(project, 'design-system.json'));
  const tokens = readJson(join(project, 'tokens.json'));
  if (!IDENTIFIER.test(index.namespace ?? '')) {
    throw new Error(`design-system.json has no usable "namespace" for the component bundle (found ${JSON.stringify(index.namespace)})`);
  }
  rejectExtraSections(project);

  const images = collectImages(index, join(source, 'blobs'));
  const components = componentNames(project);
  const paths = linkTargets(index, images, components);
  const imagePaths = new Map(images.map((image) => [image.id, image.path]));
  const name = title ?? index.title ?? basename(skill);
  const files = new Map();

  const copyMarkdown = (text, from, to) => {
    const prefix = `${posix.relative(posix.dirname(to), 'assets/kit')}/`;
    files.set(to, addContents(rewriteBlobs(rewriteLinks(text, { from, to, paths }), imagePaths, prefix, from)));
  };

  files.set('references/source.md', sourceNote({ name, artifact, version, lastChange: index.lastChange ?? {} }));
  for (const { file, text } of splitReadme(readText(join(project, 'README.md')))) {
    copyMarkdown(text, 'project/README.md', `references/${file}`);
  }
  for (const component of components) {
    const guide = join(project, 'components', component, 'README.md');
    if (existsSync(guide)) copyMarkdown(readText(guide), `project/components/${component}/README.md`, `references/components/${component}.md`);
    const preview = join(project, 'components', component, 'preview.html');
    if (existsSync(preview)) {
      files.set(`references/previews/${component}.html`, rewriteBlobs(readText(preview), imagePaths, '', `project/components/${component}/preview.html`));
    }
  }
  for (const group of Object.keys(index.assetGroups ?? {}).sort()) {
    const notes = join(project, 'assets', group, 'README.md');
    if (existsSync(notes)) copyMarkdown(`# ${group}\n\n${readText(notes)}`, `project/assets/${group}/README.md`, `references/images/${group}.md`);
  }
  files.set('references/index.d.ts', readRequired(join(project, 'components', 'index.d.ts')));
  files.set('references/tokens.json', readRequired(join(project, 'tokens.json')));

  const theme = tokens.color?.themes?.[0]?.id ?? 'light';
  files.set('assets/kit/index.html', starterPage({ name, namespace: index.namespace, theme, rootClass }));
  files.set('assets/kit/tokens.css', compileTokensCss(tokens));
  for (const file of ['bundle.js', 'bundle.css']) {
    files.set(`assets/kit/${file}`, rewriteBlobs(readText(join(project, 'components', file)), imagePaths, '', `project/components/${file}`));
  }
  for (const image of images) files.set(`assets/kit/${image.path}`, readFileSync(image.from));
  for (const font of tokens.type?.fonts ?? []) {
    const from = join(project, font.file.includes('/') ? font.file : join('fonts', font.file));
    checkSize(from, `font ${font.file}`);
    files.set(`assets/kit/fonts/${basename(from)}`, readFileSync(from));
  }

  for (const [path, content] of files) {
    if (typeof content === 'string' && content.includes('/_blob/')) {
      throw new Error(`${path} still contains "/_blob/" after the rewrite, so it would point at a claude.ai-only URL; fix the design system or extend the sync tool`);
    }
  }

  rmSync(join(skill, 'references'), { recursive: true, force: true });
  rmSync(join(skill, 'assets', 'kit'), { recursive: true, force: true });
  for (const path of [...files.keys()].sort()) {
    const target = join(skill, ...path.split('/'));
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, files.get(path));
  }
  return { files: files.size, images: images.length, components: components.length };
}

function checkSkillFolder(skill) {
  const name = basename(resolve(skill));
  if (!SKILL_NAME.test(name)) throw new Error(`--skill must be a skill folder named in kebab-case, not "${name}"`);
  if (existsSync(join(skill, '.git')) || existsSync(join(skill, 'package.json'))) {
    throw new Error(`--skill points at a project root (${skill}), not a skill folder`);
  }
}

function collectImages(index, blobs) {
  const available = existsSync(blobs) ? readdirSync(blobs).sort() : [];
  const images = [];
  for (const group of Object.keys(index.assetGroups ?? {}).sort()) {
    const records = Object.values(index.assetGroups[group].files ?? {}).sort((a, b) => a.name.localeCompare(b.name));
    for (const record of records) {
      if (![group, ...record.name.split('/')].every((segment) => SAFE_SEGMENT.test(segment))) {
        throw new Error(`asset ${group}/${record.name} has a name that is unsafe in a URL; use letters, digits, dots, hyphens, and underscores`);
      }
      const keepsWebp = extname(record.name).toLowerCase() === '.webp';
      const original = available.find((file) => file.startsWith(`${record.blob}.`) && (keepsWebp || extname(file) !== '.webp'));
      if (!original) throw new Error(`asset ${group}/${record.name} (blob ${record.blob}) is missing from ${blobs}; read it by its blob id into that folder`);
      let from = join(blobs, original);
      let file = record.name;
      if (statSync(from).size > MAX_FILE_BYTES) {
        const webp = join(blobs, `${record.blob}.webp`);
        if (!existsSync(webp)) {
          throw new Error(`asset ${group}/${record.name} is ${megabytes(from)} MB, over the 1 MB limit; re-encode it: cwebp -q 90 "${from}" -o "${webp}"`);
        }
        checkSize(webp, `the WebP for ${group}/${record.name}`);
        from = webp;
        const extension = extname(file);
        file = `${extension ? file.slice(0, -extension.length) : file}.webp`;
      }
      images.push({ id: record.blob, group, recordName: record.name, from, path: `images/${group}/${file}` });
    }
  }
  return images;
}

function componentNames(project) {
  const folder = join(project, 'components');
  if (!existsSync(folder)) return [];
  return readdirSync(folder, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !['lib', 'src'].includes(entry.name))
    .map((entry) => {
      if (!SAFE_SEGMENT.test(entry.name)) throw new Error(`component folder "${entry.name}" has a name that is unsafe as a file name`);
      return entry.name;
    })
    .sort();
}

// Published paths that copied Markdown may link to, and where each copy lives in the skill.
function linkTargets(index, images, components) {
  const paths = new Map([
    ['project/tokens.json', 'references/tokens.json'],
    ['project/components/index.d.ts', 'references/index.d.ts'],
  ]);
  for (const component of components) {
    paths.set(`project/components/${component}/README.md`, `references/components/${component}.md`);
    paths.set(`project/components/${component}/preview.html`, `references/previews/${component}.html`);
  }
  for (const group of Object.keys(index.assetGroups ?? {})) paths.set(`project/assets/${group}/README.md`, `references/images/${group}.md`);
  for (const image of images) {
    paths.set(`/_blob/${image.id}`, `assets/kit/${image.path}`);
    paths.set(`project/assets/${image.group}/${image.recordName}`, `assets/kit/${image.path}`);
  }
  return paths;
}

function rewriteBlobs(text, imagePaths, prefix, label) {
  return text.replace(BLOB, (whole, id) => {
    const path = imagePaths.get(id);
    if (!path) throw new Error(`${label} refers to /_blob/${id}, which no asset record in design-system.json names`);
    return `${prefix}${path}`;
  });
}

// The page type treats every other Markdown file outside components/ as a README section.
function rejectExtraSections(project) {
  for (const file of walk(project)) {
    const path = relative(project, file).split(sep).join('/');
    if (!/\.mdx?$/i.test(path) || path === 'README.md' || path.startsWith('components/') || path.startsWith('assets/')) continue;
    throw new Error(`project/${path} is an extra README section; the sync tool copies only project/README.md, so extend tools/lib/sync-design-system.mjs to carry it`);
  }
}

function walk(folder) {
  if (!existsSync(folder)) return [];
  return readdirSync(folder, { withFileTypes: true }).flatMap((entry) => (entry.isDirectory() ? walk(join(folder, entry.name)) : [join(folder, entry.name)]));
}

function sourceNote({ name, artifact, version, lastChange }) {
  const lines = [
    '# Source',
    '',
    `This skill carries a generated copy of the ${name} design system. The sync tool rebuilds \`references/\` and \`assets/kit/\` from claude.ai. Do not edit them by hand.`,
    '',
    `- Artifact: ${artifact}`,
    `- Version: ${version}`,
  ];
  if (lastChange.at) {
    lines.push(`- Last change: ${lastChange.at}${lastChange.by ? `, by ${lastChange.by}` : ''}${lastChange.via ? `, via ${lastChange.via}` : ''}`);
  }
  if (lastChange.note) lines.push(`- Note: ${lastChange.note}`);
  return `${lines.join('\n')}\n`;
}

function starterPage({ name, namespace, theme, rootClass }) {
  const root = rootClass ? `<div id="root" class="${rootClass}"></div>` : '<div id="root"></div>';
  return `<!doctype html>
<html lang="en" data-theme="${escapeHtml(theme)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(name)} prototype</title>
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="bundle.css">
<script src="https://cdn.jsdelivr.net/npm/react@${REACT_VERSION}/umd/react.production.min.js" integrity="${REACT_SRI}" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/react-dom@${REACT_VERSION}/umd/react-dom.production.min.js" integrity="${REACT_DOM_SRI}" crossorigin="anonymous"></script>
<script src="bundle.js"></script>
</head>
<body style="margin:0">
${root}
<script>
// The components are on window.${namespace}. Replace the element below with the screen you build.
var L = window.${namespace}, h = React.createElement;
ReactDOM.createRoot(document.getElementById('root')).render(h('main', null));
</script>
</body>
</html>
`;
}

function checkSize(file, label) {
  if (!existsSync(file)) throw new Error(`${label} is missing: ${file}`);
  if (statSync(file).size > MAX_FILE_BYTES) throw new Error(`${label} is ${megabytes(file)} MB, over the 1 MB limit`);
}

function megabytes(file) {
  return (statSync(file).size / 1024 / 1024).toFixed(1);
}

function readJson(file) {
  const text = readText(file);
  try {
    return JSON.parse(text);
  } catch (cause) {
    throw new Error(`${file} is not valid JSON: ${cause.message}`);
  }
}

function readText(file) {
  return readRequired(file).toString('utf8');
}

function readRequired(file) {
  if (!existsSync(file)) throw new Error(`${file} is missing; download every file under project/ first`);
  return readFileSync(file);
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[character]);
}
```

- [ ] **Step 4: Write the command line**

Create `tools/sync-design-system.mjs`:

```js
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
```

Then make it executable, like the other tools:

```bash
chmod +x tools/sync-design-system.mjs
```

- [ ] **Step 5: Add the npm script**

In `package.json`, add this line to `scripts`, after `"new:skill"`:

```json
    "new:skill": "node tools/new-skill.mjs",
    "sync:design-system": "node tools/sync-design-system.mjs"
```

- [ ] **Step 6: Run the tests to verify they pass**

Run: `node --test tests/sync-design-system.test.mjs`
Expected: PASS, 18 tests.

- [ ] **Step 7: Run the repo checks and commit**

```bash
npm run validate && npm test
git add tools/lib/sync-design-system.mjs tools/sync-design-system.mjs tests/sync-design-system.test.mjs package.json
git commit -m "Add the design system sync tool"
```

---

### Task 4: Maintenance skill and a trial sync

**Files:**
- Create: `.claude/skills/sync-design-system/SKILL.md`

**Interfaces:**
- Consumes: the `sync:design-system` script (Task 3).
- Produces: a download of the product system at `$SCRATCH/design-system-sync/product/`, with its version string in `VERSION`. Task 5 reuses it.

- [ ] **Step 1: Write the maintenance skill**

Create `.claude/skills/sync-design-system/SKILL.md`:

```markdown
---
name: sync-design-system
description: "Refreshes the generated copy that a Limelight design system skill carries, from the design system's claude.ai artifact. Use when the product or marketing design system changed in claude.ai, when someone asks to sync, refresh, or update a design system skill, or when a skill's references/source.md shows an old version."
compatibility: Claude Code with the Artifact tool and the claude.ai login that can read the artifacts. Node.js 20+. cwebp or Python Pillow for images over 1 MB.
metadata:
  owner: design
---

# Sync a design system

Each design system skill in `plugins/company/skills/` carries a generated copy of a claude.ai artifact. This skill downloads the artifact and rebuilds that copy with `tools/sync-design-system.mjs`. Only a Claude host with a claude.ai login that can read the artifact can do the download.

| System | Artifact | Skill folder | Title | Root class |
| --- | --- | --- | --- | --- |
| Product | https://claude.ai/artifact/1z8r8nfNgeVQZ7miW2Lhzi | `plugins/company/skills/limelight-product-design-system` | Limelight Product | `lla` |
| Marketing | https://claude.ai/artifact/6bxpAybE1yBvnSpVB2CBTM | `plugins/company/skills/limelight-marketing-design-system` | Limelight Marketing Design System | none |

## Steps

1. Pick the row. If the request does not name a system, ask which one.
2. List the artifact's published files with the Artifact tool (`action: "list"`, `scope: "files"`). Note the version string it prints.
3. Make a new, empty download folder outside the repo, such as `<scratchpad>/design-system-sync/<system>/`. Write the version string to `VERSION` in it. Never reuse an older download: a file removed from the artifact would survive in it.
4. Read every published path under `project/` into the download folder (`action: "read"`, `paths`, `out_dir` set to the download folder). A call takes up to 256 paths. Skip `artifact-type/`, the root `index.html`, and the root `SKILL.md`.
5. Open `project/design-system.json` in the download. Read every asset listed under `assetGroups.<Group>.files` by its `blob` id, with `out_dir` set to `<download folder>/blobs`. If a `paths` call refuses asset ids, read them one at a time.
6. For each file in `blobs/` over 1,048,576 bytes, write a WebP next to it named `<blob id>.webp`: `cwebp -q 90 <file> -o <download folder>/blobs/<blob id>.webp`. Without cwebp, use Pillow: `python3 -c "from PIL import Image; Image.open('<file>').save('<download folder>/blobs/<blob id>.webp', quality=90)"`. If neither is available, stop and say so.
7. From the repo root, run the sync. Add `--root-class <class>` only when the row names one:

       npm run sync:design-system -- --source <download folder> --skill <skill folder> --artifact <artifact> --version "$(cat <download folder>/VERSION)" --title "<title>"

8. Run `npm run validate` and `npm test`. A `link-broken` error in the skill's `SKILL.md` means a README section was renamed. Point the link at the new file in `references/`.
9. Show `git diff --stat -- <skill folder>` and the note in the skill's `references/source.md`. Stop. A person reviews the diff before anything is committed.

## When a step fails

- The sync tool names the file and the fix in its error. Fix the download and run it again. A failed run leaves the previous copy in place.
- An error about an extra README section or a new kind of file means the design system grew. Extend `tools/lib/sync-design-system.mjs` with a test first, as `AGENTS.md` asks.
```

- [ ] **Step 2: Follow the maintenance skill for the product system**

Run steps 1 to 6 of the new skill for the Product row, with the download folder at `$SCRATCH/design-system-sync/product/`. Expected: about 211 files under `project/`, 14 files under `blobs/`, and one WebP for `elliot-reference.png` (1,316,381 bytes).

- [ ] **Step 3: Run a trial sync outside the repo**

```bash
SCRATCH="${SCRATCH:-${TMPDIR:-/tmp}/design-system-skills}"; mkdir -p "$SCRATCH"
DL="$SCRATCH/design-system-sync/product"
rm -rf "$SCRATCH/trial" && mkdir -p "$SCRATCH/trial"
npm run sync:design-system -- --source "$DL" --skill "$SCRATCH/trial/limelight-product-design-system" \
  --artifact https://claude.ai/artifact/1z8r8nfNgeVQZ7miW2Lhzi --version "$(cat "$DL/VERSION")" --title "Limelight Product" --root-class lla
ls "$SCRATCH/trial/limelight-product-design-system/references"
du -sh "$SCRATCH/trial/limelight-product-design-system"
```

Expected: `synced ...: 100 components, 14 images, ...`. `references/` lists `overview.md`, `content-fundamentals.md`, `visual-foundations.md`, `shell-and-behaviour.md`, `iconography.md`, `logo-portraits-and-images.md`, `components.md`, `d-exceptions.md`, `contrast-wcag-2-2-aa.md`, `source.md`, `index.d.ts`, `tokens.json`, and the `components/`, `previews/`, and `images/` folders. Size is about 4 MB. If the tool stops, fix the cause it names. When the cause is in the tool, add a failing test to `tests/sync-design-system.test.mjs` first.

- [ ] **Step 4: Run the repo checks and commit**

```bash
npm run validate && npm test
git add .claude/skills/sync-design-system/SKILL.md
git commit -m "Add the sync-design-system maintenance skill"
```

---

### Task 5: Product design system skill

**Files:**
- Create: `plugins/company/skills/limelight-product-design-system/SKILL.md`
- Create (generated): `plugins/company/skills/limelight-product-design-system/references/` and `assets/kit/`
- Modify: `plugins/company/README.md`, `README.md`, `plugins/company/plugin.json`, `plugins/company/.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `docs/portability.md`, `evals/discovery.json`, `evals/README.md`

**Interfaces:**
- Consumes: the product download from Task 4 (`$SCRATCH/design-system-sync/product/`). If it is missing, repeat Task 4 steps 2 and 3 first.
- Produces: the finished product skill. Task 7 runs its discovery check.

- [ ] **Step 1: Generate the copy into the plugin**

```bash
SCRATCH="${SCRATCH:-${TMPDIR:-/tmp}/design-system-skills}"
DL="$SCRATCH/design-system-sync/product"
npm run sync:design-system -- --source "$DL" --skill plugins/company/skills/limelight-product-design-system \
  --artifact https://claude.ai/artifact/1z8r8nfNgeVQZ7miW2Lhzi --version "$(cat "$DL/VERSION")" --title "Limelight Product" --root-class lla
```

Expected: `synced plugins/company/skills/limelight-product-design-system: 100 components, 14 images, ...`. Do not commit yet. The skill has no `SKILL.md`, so `npm run validate` fails until Step 8.

- [ ] **Step 2: Check that the kit renders**

Build a page from the kit and the AppShell preview:

```bash
SCRATCH="${SCRATCH:-${TMPDIR:-/tmp}/design-system-skills}"
SKILL=plugins/company/skills/limelight-product-design-system
rm -rf "$SCRATCH/render/product" && mkdir -p "$SCRATCH/render" && cp -R "$SKILL/assets/kit" "$SCRATCH/render/product"
node -e '
const fs = require("fs");
const [kit, preview] = process.argv.slice(1);
const page = fs.readFileSync(kit + "/index.html", "utf8");
const source = fs.readFileSync(preview, "utf8");
const body = source.slice(source.indexOf("<body"), source.indexOf("</body>") + 7);
fs.writeFileSync(kit + "/render.html", page.replace(/<body[\s\S]*<\/body>/, body));
' "$SCRATCH/render/product" "$SKILL/references/previews/AppShell.html"
echo "file://$SCRATCH/render/product/render.html"
```

Open the printed URL in the built-in browser. If it refuses file URLs, serve the folder instead: add a temporary `.claude/launch.json` entry that runs `python3 -m http.server 4173 --directory <the folder>`, start it with `preview_start`, and delete the entry afterwards. Expected:
- The console shows no errors.
- No request for a file under `images/` fails.
- A screenshot shows the rail with round agent faces, the nav column, three campaign cards, and the agent panel over its image.

If anything fails, compare the page with the AppShell card on the claude.ai artifact. Fix the cause in the sync tool with a failing test first.

- [ ] **Step 3: Build the RED workspaces**

```bash
SCRATCH="${SCRATCH:-${TMPDIR:-/tmp}/design-system-skills}"
SKILL=plugins/company/skills/limelight-product-design-system
EVALS="$SCRATCH/evals/product"
rm -rf "$EVALS" && mkdir -p "$EVALS"
for id in lookup build review implement; do
  W="$EVALS/red/$id"
  mkdir -p "$W/design-system"
  cp -R "$SKILL/references" "$SKILL/assets" "$W/design-system/"
done
mkdir -p "$EVALS/red/review/review"
cat > "$EVALS/red/review/review/screen.html" <<'HTML'
<!-- Approvals page header and one row, built outside the design system -->
<header style="height:64px;border-bottom:1px solid #e9eaed;display:flex;align-items:center;justify-content:space-between">
  <h1 style="font:500 26px 'Helvetica Neue'">Approvals</h1>
  <button style="background:linear-gradient(90deg,#7c9ecb,#9b8dcb);color:#fff;border:0;border-radius:8px;outline:none">🚀 Run discovery now</button>
</header>
<div class="row" style="display:flex;gap:8px;align-items:center">
  <span style="font-size:9px;color:#9499a0">Added 14 Sept</span>
  <button aria-label="Approve" style="width:18px;height:18px;padding:0"><svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6l3 3 5-6" stroke="currentColor" fill="none"/></svg></button>
</div>
HTML
mkdir -p "$EVALS/red/implement/agent-platform/packages/ui/src"
cat > "$EVALS/red/implement/agent-platform/AGENTS.md" <<'MD'
# agent-platform

- Put UI components in packages/ui/src, one React function component per file, in TypeScript.
- Style with CSS modules. Use the CSS variables in packages/ui/src/tokens.css. Never hard-code a color.
- Every card in the app lifts on hover: translateY(-2px) and a larger shadow.
MD
cat > "$EVALS/red/implement/agent-platform/packages/ui/src/tokens.css" <<'CSS'
:root {
  --surface: #ffffff;
  --line-card: #e6e7eb;
  --radius-card: 12px;
  --ink: #1d1d20;
  --ink-strong: #09090b;
  --muted: #686b73;
}
CSS
```

Before running, confirm that each required finding of the review scenario is stated in the file named for it in Step 5. Use `grep -n` on the generated references. Drop any finding the copy does not state, and note the drop in `$EVALS/results.md`.

- [ ] **Step 4: Run RED with Claude subagents**

Dispatch four subagents in parallel: `subagent_type: general-purpose`, `model: sonnet`. `$W` is the absolute path of `$EVALS/red/<id>`. Use this prompt, with `<request>` from the table below:

```text
You are helping test a set of files. Work only inside the folder $W. Treat it as your working directory and resolve every ./ path against it. Do not read, create, or change anything outside it. Do not use the network.

Request: <request> The Limelight Product design system files are in ./design-system/.

When you finish, give your full answer to the request. Then list every file you read and every file you wrote.
```

| id | request |
| --- | --- |
| lookup | What token do I use for a warning badge in the Limelight app? |
| build | Build a prototype of the Approvals page in the Limelight app with two pending approvals. Put everything in ./out/. |
| review | Review ./review/screen.html against the Limelight product design system and list what breaks it. |
| implement | Implement the CampaignCard component in ./agent-platform, following that repo's instructions. |

Save each answer to `$EVALS/red/<id>.answer.md`. Score it against Step 5. Record each failed check, with the agent's own words, in `$EVALS/results.md`. Then run `git status --short` in the repo and confirm that no subagent wrote into it.

- [ ] **Step 5: Use these checks for every run**

| id | Checks |
| --- | --- |
| lookup | (a) Names `warning-fill` and `warning-text`. (b) Cites the file that states them. (c) Invents no other token. |
| build | (a) `./out/` holds a copy of the kit: `index.html`, `tokens.css`, `bundle.js`, `bundle.css`, `images/`. (b) `index.html` renders `AppShell` and two `ApprovalRow` components with status Pending. (c) Other styling uses `var(--...)` tokens and no raw colors. (d) The answer says nobody viewed the page in a browser. |
| review | Finds each of these and cites its file: (a) a gradient on a button, from `visual-foundations.md`. (b) An emoji as an icon, from `iconography.md`. (c) "Run discovery now" should be Title Case, "Run Discovery Now", from `content-fundamentals.md`. (d) `outline:none` removes the focus ring, from `d-exceptions.md`. (e) A 12px glyph in an 18px button breaks the 16px glyph in a 24px box rule, from `d-exceptions.md` or `iconography.md`. (f) Invents no rule the system does not state. |
| implement | (a) Writes `packages/ui/src/CampaignCard.tsx` and a CSS module. (b) Uses the `var(--...)` names from the repo's `tokens.css`. (c) Only the title is a button, and there are three stats. (d) Copies nothing from the kit into agent-platform. (e) Reports three conflicts: the repo's hover lift against the system's "no hover lift", `--radius-card` 12px against the system's 10px, and the tokens the repo lacks (`gradient-selected`, `selected-border`, `shadow-selected`). |

- [ ] **Step 6: Write SKILL.md**

Create `plugins/company/skills/limelight-product-design-system/SKILL.md` from this draft. Change the wording so it fixes every RED failure recorded in `$EVALS/results.md`. Pick the form the writing-skills skill gives for each failure type. Keep the body under 150 lines.

```markdown
---
name: limelight-product-design-system
description: "Limelight Product design system for screens inside the Limelight app (the V2 UI from Proposal D): tokens, 100 React components, copy rules and accessibility fixes. Use when building a mock or prototype of an app screen, implementing product UI in agent-platform, reviewing app screens or a PR against the product design, or looking up a product token, component or copy rule. Not for the marketing website."
compatibility: Needs file access to read the bundled copy. Prototypes also need a browser, and network access to load React 18 from cdn.jsdelivr.net. Implementing and reviewing need read access to the code or screens in question.
metadata:
  owner: design
  source: https://claude.ai/artifact/1z8r8nfNgeVQZ7miW2Lhzi
---

# Limelight Product design system

This skill carries a generated copy of the Limelight Product design system. The system describes the Limelight app as the live Proposal D prototype ("D") renders it. [references/source.md](references/source.md) names the version. The files under `references/` and `assets/kit/` are regenerated from claude.ai. Never edit them. Report a wrong value instead.

Resolve every path below from the folder that holds this file.

## Which rule wins

1. The target repository's own instructions and existing components.
2. The D exceptions in [references/d-exceptions.md](references/d-exceptions.md).
3. The rest of this system.

Report every conflict you settle with this order: the rule you followed, the rule you set aside, and both values.

## Find things

| Question | File |
| --- | --- |
| What the system covers | [overview](references/overview.md) |
| Copy, case, counts, dates | [content fundamentals](references/content-fundamentals.md) |
| Type, color, layout, corners, motion, states, stacking | [visual foundations](references/visual-foundations.md) |
| Landing, agent panel, resize, checklist | [shell and behaviour](references/shell-and-behaviour.md) |
| Icons | [iconography](references/iconography.md) |
| Logo, agent portraits, images | [logo, portraits and images](references/logo-portraits-and-images.md) and `references/images/<Group>.md` |
| Which component fits | [component index](references/components.md) |
| One component's rules | `references/components/<Name>.md` |
| A component's props | `references/index.d.ts` |
| A working call of a component | `references/previews/<Name>.html` |
| A token's value and usage | `references/tokens.json`, searched for `"name": "<token>"` |
| Where the system departs from D | [D exceptions](references/d-exceptions.md) |
| Contrast pairs | [contrast](references/contrast-wcag-2-2-aa.md) |

## Look something up

1. Read the file the table names.
2. Answer with the exact token or component name, its value, and the file that states it.
3. If no file states it, say so. Never guess a value.

## Build a screen or prototype

1. Copy the whole `assets/kit/` folder to the output location.
2. Write the screen into the copy's `index.html`. The components are on `window.LimelightApp`. Start from the previews of the components you need. The AppShell preview is a complete screen.
3. Use a bundle component wherever one exists. Never rebuild one by hand.
4. Style any other markup with the token variables from `tokens.css`, such as `var(--surface)`. Never write a raw color, size, or shadow.
5. Write every string by the content fundamentals.
6. The prototype is done when the copy's `index.html` renders in a browser. If you could not open it in a browser, say that nobody viewed it.

## Implement in product code

1. Read the target repository's instructions and its existing components before you write code.
2. For each part, read its component guide, its props, and the D exceptions.
3. Use the system's token names and values through the repository's own token layer.
4. Never copy `bundle.js`, `bundle.css`, or `tokens.css` into product code. They exist only for prototypes.
5. When the repository lacks a token that a part needs, say so and propose it with the system's value. Do not hard-code the value.

## Review

1. Read the work under review. If you cannot read it, ask for it. Never report a clean review of work you did not read.
2. Check it against the content fundamentals, the visual foundations, the iconography, the guide of each component it uses, and the D exceptions.
3. Report each finding as: where it is, the rule it breaks, the file that states the rule, and the fix.
4. Report only rules that this system states.

## Stop and ask

- The screen needs a component the bundle does not have.
- The code or screen to change or review is not available.
- The order in "Which rule wins" does not settle a conflict.
```

- [ ] **Step 7: Validate the skill**

Run: `npm run validate`
Expected: `3 plugins, 11 skills: 0 errors, 0 warnings`. Fix any error in `SKILL.md`. An error inside generated files means the sync tool needs a fix: add a failing test first, fix the tool, then repeat Step 1.

- [ ] **Step 8: Build the GREEN workspaces**

```bash
SCRATCH="${SCRATCH:-${TMPDIR:-/tmp}/design-system-skills}"
SKILL=plugins/company/skills/limelight-product-design-system
EVALS="$SCRATCH/evals/product"
for host in claude codex; do
  dir=$([ "$host" = claude ] && echo .claude/skills || echo .agents/skills)
  for id in lookup build review implement; do
    W="$EVALS/green-$host/$id"
    rm -rf "$W" && mkdir -p "$W/$dir"
    cp -R "$SKILL" "$W/$dir/"
    [ -d "$EVALS/red/$id/review" ] && cp -R "$EVALS/red/$id/review" "$W/"
    [ -d "$EVALS/red/$id/agent-platform" ] && cp -R "$EVALS/red/$id/agent-platform" "$W/"
  done
done
```

- [ ] **Step 9: Run GREEN in Claude**

Dispatch four subagents in parallel, as in Step 4, with `$W` set to `$EVALS/green-claude/<id>`. Replace the RED sentence about `./design-system/` with: `Use the limelight-product-design-system skill in ./.claude/skills/limelight-product-design-system/.` Save each answer to `$EVALS/green-claude/<id>.answer.md` and score it with Step 5.

- [ ] **Step 10: Run GREEN in Codex**

```bash
SCRATCH="${SCRATCH:-${TMPDIR:-/tmp}/design-system-skills}"
EVALS="$SCRATCH/evals/product"
ask() {
  local id="$1" request="$2" W="$EVALS/green-codex/$1"
  codex exec --skip-git-repo-check --ephemeral -s workspace-write -C "$W" -o "$EVALS/green-codex/$id.answer.md" \
    "$request Use the limelight-product-design-system skill in ./.agents/skills/limelight-product-design-system/. When you finish, list every file you read and every file you wrote." \
    > "$EVALS/green-codex/$id.log" 2>&1 &
}
ask lookup "What token do I use for a warning badge in the Limelight app?"
ask build "Build a prototype of the Approvals page in the Limelight app with two pending approvals. Put everything in ./out/."
ask review "Review ./review/screen.html against the Limelight product design system and list what breaks it."
ask implement "Implement the CampaignCard component in ./agent-platform, following that repo's instructions."
wait
```

Run it with a 20-minute timeout. Score each answer with Step 5 and record the results.

- [ ] **Step 11: Close the gaps**

For each GREEN failure in either host, change the `SKILL.md` wording that failed. Then rerun that scenario in both hosts. Stop after three rounds and report any remaining failure to Grant with the evidence.

- [ ] **Step 12: Add the evaluation fixtures**

In `evals/discovery.json`, add this entry after the `design-change-log` entry:

```json
  {
    "skill": "limelight-product-design-system",
    "positive": [
      "Mock up the creator review table in our app's style.",
      "Implement the V2 campaign card in agent-platform to match the product design system.",
      "Check the screens in this PR against the Limelight app design system."
    ],
    "negative": "Build a pricing section for the limelighthq.com homepage."
  },
```

In `evals/README.md`, add these rows to the end of the behavior table:

```markdown
| `limelight-product-design-system` | Warning badge token lookup | Names `warning-fill` and `warning-text` and the file that states them. Invents no token. |
| `limelight-product-design-system` | Approvals page prototype; no browser | Copies the kit, builds with `AppShell` and `ApprovalRow`, styles with token variables, and says nobody viewed it. |
| `limelight-product-design-system` | Screen markup with a gradient button, an emoji icon, a sentence-case primary action, no focus ring, and a 12px glyph | Finds each break, cites its rule file, and invents no rule. |
| `limelight-product-design-system` | CampaignCard in a repo whose rules and tokens conflict with the system | Follows the repo, uses its token layer, copies nothing from the kit, and reports each conflict with both values. |
```

- [ ] **Step 13: Update the catalog and docs**

1. In `docs/portability.md`, add this row to the end of the capability table:

```markdown
| `limelight-product-design-system` | File access to the copy. A browser and network access for prototypes. Read access to the target code for implement and review. | Without a browser, deliver the page and say nobody viewed it. Without network, say React could not load. Without code access, ask for it. Never report a clean review of unread code. |
```

2. In `plugins/company/README.md`, add this row after the `limelight-work` row:

```markdown
| [`limelight-product-design-system`](skills/limelight-product-design-system/SKILL.md) | Build, implement, review, or look up screens inside the Limelight app with the Proposal D design system. Prototypes need a browser and network access. |
```

3. In the root `README.md` table, change the `company` row's skills to: `` `decide`, `limelight-product-design-system`, `limelight-work`, `md-render` ``.
4. In `plugins/company/plugin.json`, `plugins/company/.claude-plugin/plugin.json`, and the `company` entry of `.claude-plugin/marketplace.json`, set the description to: `Skills for everyone at Limelight: where work goes, everyday document tasks, and the product and marketing design systems.`

- [ ] **Step 14: Run the repo checks and commit**

```bash
npm run validate && npm test
git add plugins/company .claude-plugin/marketplace.json README.md docs/portability.md evals
git commit -m "Add the limelight-product-design-system skill"
```

Expected: `3 plugins, 11 skills: 0 errors, 0 warnings`, and every test passes.

---

### Task 6: Marketing design system skill

**Files:**
- Create: `plugins/company/skills/limelight-marketing-design-system/SKILL.md`
- Create (generated): `plugins/company/skills/limelight-marketing-design-system/references/` and `assets/kit/`
- Modify: `plugins/company/README.md`, `README.md`, `docs/portability.md`, `evals/discovery.json`, `evals/README.md`

**Interfaces:**
- Consumes: the maintenance skill (Task 4) and the sync tool (Task 3).
- Produces: the finished marketing skill. Task 7 runs its discovery check.

- [ ] **Step 1: Download and generate the copy**

Follow the maintenance skill for the Marketing row, with the download folder at `$SCRATCH/design-system-sync/marketing/`. Expected: about 71 files under `project/` and 36 files under `blobs/`. No image is over 1 MB, so step 6 writes no WebP. Then:

```bash
SCRATCH="${SCRATCH:-${TMPDIR:-/tmp}/design-system-skills}"
DL="$SCRATCH/design-system-sync/marketing"
npm run sync:design-system -- --source "$DL" --skill plugins/company/skills/limelight-marketing-design-system \
  --artifact https://claude.ai/artifact/6bxpAybE1yBvnSpVB2CBTM --version "$(cat "$DL/VERSION")" --title "Limelight Marketing Design System"
ls plugins/company/skills/limelight-marketing-design-system/references
```

Expected: `synced ...: 33 components, 36 images, ...`. `references/` lists `overview.md`, `content-fundamentals.md`, `visual-foundations.md`, `logo.md`, `agent-marks-decorative-elements.md`, `iconography.md`, `source.md`, `index.d.ts`, `tokens.json`, and the `components/`, `previews/`, and `images/` folders. `assets/kit/fonts/` holds the Geist and Host Grotesk files.

- [ ] **Step 2: Check that the kit renders**

Build a page from the kit and the PricingCard preview:

```bash
SCRATCH="${SCRATCH:-${TMPDIR:-/tmp}/design-system-skills}"
SKILL=plugins/company/skills/limelight-marketing-design-system
rm -rf "$SCRATCH/render/marketing" && mkdir -p "$SCRATCH/render" && cp -R "$SKILL/assets/kit" "$SCRATCH/render/marketing"
node -e '
const fs = require("fs");
const [kit, preview] = process.argv.slice(1);
const page = fs.readFileSync(kit + "/index.html", "utf8");
const source = fs.readFileSync(preview, "utf8");
const body = source.slice(source.indexOf("<body"), source.indexOf("</body>") + 7);
fs.writeFileSync(kit + "/render.html", page.replace(/<body[\s\S]*<\/body>/, body));
' "$SCRATCH/render/marketing" "$SKILL/references/previews/PricingCard.html"
echo "file://$SCRATCH/render/marketing/render.html"
```

Open the printed URL in the built-in browser. If it refuses file URLs, serve the folder instead: add a temporary `.claude/launch.json` entry that runs `python3 -m http.server 4173 --directory <the folder>`, start it with `preview_start`, and delete the entry afterwards. Expected:
- The console shows no errors.
- No request for a file under `fonts/` or `images/` fails.
- A screenshot shows pricing cards set in Host Grotesk and Geist.

If anything fails, compare the page with the PricingCard card on the claude.ai artifact. Fix the cause in the sync tool with a failing test first.

- [ ] **Step 3: Build the RED workspaces**

```bash
SCRATCH="${SCRATCH:-${TMPDIR:-/tmp}/design-system-skills}"
SKILL=plugins/company/skills/limelight-marketing-design-system
EVALS="$SCRATCH/evals/marketing"
rm -rf "$EVALS" && mkdir -p "$EVALS"
for id in lookup build review-page review-graphic; do
  W="$EVALS/red/$id"
  mkdir -p "$W/design-system"
  cp -R "$SKILL/references" "$SKILL/assets" "$W/design-system/"
done
mkdir -p "$EVALS/red/review-page/review" "$EVALS/red/review-graphic/review"
cat > "$EVALS/red/review-page/review/page.html" <<'HTML'
<section style="padding:80px">
  <span class="tag">{ Ivy }</span>
  <h2 style="font-family:'Host Grotesk';font-weight:700">Meet Your New AI Employees</h2>
  <p>Our agent { Ivy } finds creators while you sleep 🚀</p>
  <p style="background:linear-gradient(180deg,#fff 10%,#d8ebfa 50%);-webkit-background-clip:text;color:transparent">Calm futurism</p>
  <a class="button primary" href="/demo">Book a demo →</a>
</section>
HTML
cat > "$EVALS/red/review-graphic/review/linkedin-banner.md" <<'MD'
# LinkedIn banner, 1584 x 396

- Background: gradient-ivy.
- Center: the full Limelight logo in white, on the gradient.
- Right: Elliot's portrait in a glass orb.
- Headline: "Meet Our AI Employees!" in Host Grotesk Medium 500.
- Left: a stock photo of a robot hand typing.
- A small accent-blue chip with white text: "New".
MD
```

Before running, confirm that each required finding in Step 5 is stated in the file named for it. Use `grep -n` on the generated references. Drop any finding the copy does not state, and note the drop in `$EVALS/results.md`.

- [ ] **Step 4: Run RED with Claude subagents**

Dispatch four subagents in parallel: `subagent_type: general-purpose`, `model: sonnet`. `$W` is the absolute path of `$EVALS/red/<id>`. Use this prompt, with `<request>` from the table below:

```text
You are helping test a set of files. Work only inside the folder $W. Treat it as your working directory and resolve every ./ path against it. Do not read, create, or change anything outside it. Do not use the network.

Request: <request> The Limelight marketing design system files are in ./design-system/.

When you finish, give your full answer to the request. Then list every file you read and every file you wrote.
```

| id | request |
| --- | --- |
| lookup | Which type style do hero headings use on limelighthq.com? |
| build | Build a mock of a pricing section with a monthly and yearly billing toggle for limelighthq.com. Put everything in ./out/. |
| review-page | Review ./review/page.html against the Limelight brand and list what breaks it. |
| review-graphic | Review the LinkedIn banner described in ./review/linkedin-banner.md against the Limelight brand and list what breaks it. |

Save each answer to `$EVALS/red/<id>.answer.md`. Score it against Step 5. Record each failed check, with the agent's own words, in `$EVALS/results.md`. Then run `git status --short` in the repo and confirm that no subagent wrote into it.

- [ ] **Step 5: Use these checks for every run**

| id | Checks |
| --- | --- |
| lookup | (a) Names `heading-display` and Host Grotesk. (b) Cites the file that states them. (c) Invents nothing. |
| build | (a) `./out/` holds a copy of the kit, fonts included. (b) `index.html` uses `PricingCard` and `BillingToggle`. (c) Buttons are sentence case, such as "Book a demo". (d) Other styling uses `var(--...)` tokens. (e) The answer says nobody viewed the page in a browser. |
| review-page | Finds each and cites its file: (a) `{ Ivy }` in running text, from `content-fundamentals.md`. (b) A bold heading, from `visual-foundations.md`. (c) A Title Case heading, from `content-fundamentals.md`. (d) An emoji, from `content-fundamentals.md` or `iconography.md`. (e) A gradient on text, from `visual-foundations.md`. (f) A trailing arrow on a button, from `content-fundamentals.md`. (g) Invents no rule. |
| review-graphic | Finds each and cites its file: (a) The logo on an agent gradient, from `logo.md`. (b) The white logo on a ground other than `limelight-black`, from `logo.md`. (c) Ivy's gradient with Elliot's portrait, from `visual-foundations.md`. (d) Title Case and an exclamation mark, from `content-fundamentals.md`. (e) Stock robot imagery, from `visual-foundations.md`. (f) White text on `accent-blue`, from `visual-foundations.md`. (g) Does not flag the Medium 500 headline, which the system allows for big display moments. |

- [ ] **Step 6: Write SKILL.md**

Create `plugins/company/skills/limelight-marketing-design-system/SKILL.md` from this draft. Change the wording so it fixes every RED failure recorded in `$EVALS/results.md`. Pick the form the writing-skills skill gives for each failure type. Keep the body under 150 lines.

```markdown
---
name: limelight-marketing-design-system
description: "Limelight marketing design system for limelighthq.com and other brand materials: tokens, fonts, page components, logos, agent portraits, agent marks and icons. Use when building a mock of a website page or section, reviewing a page or brand asset against the Limelight brand, or looking up a brand color, gradient, type style, component or asset. Not for screens inside the Limelight app."
compatibility: Needs file access to read the bundled copy. Mocks also need a browser, and network access to load React 18 from cdn.jsdelivr.net and Geist Mono from fonts.googleapis.com. Reviews need the page or asset under review.
metadata:
  owner: design
  source: https://claude.ai/artifact/6bxpAybE1yBvnSpVB2CBTM
---

# Limelight marketing design system

This skill carries a generated copy of the Limelight marketing design system: the brand's voice, color, type, layout, logo, agent marks, icons, and website components. [references/source.md](references/source.md) names the version. The files under `references/` and `assets/kit/` are regenerated from claude.ai. Never edit them. Report a wrong value instead.

For screens inside the Limelight app, use the limelight-product-design-system skill instead.

Resolve every path below from the folder that holds this file. This system's rules decide. When the work and a rule disagree, report it.

## Find things

| Question | File |
| --- | --- |
| The brand idea and values | [overview](references/overview.md) |
| Voice, case, agent names | [content fundamentals](references/content-fundamentals.md) |
| Color, gradients, type, layout, page anatomy, content pages, motion, surfaces, corners, imagery, states, contrast | [visual foundations](references/visual-foundations.md) |
| Logo | [logo](references/logo.md) |
| Agent marks | [agent marks](references/agent-marks-decorative-elements.md) |
| Icons | [iconography](references/iconography.md) |
| Notes on an image group | `references/images/<Group>.md` |
| One component's rules | `references/components/<Name>.md`, one file per component |
| A component's props | `references/index.d.ts` |
| A working call of a component | `references/previews/<Name>.html` |
| A token's value and usage | `references/tokens.json`, searched for `"name": "<token>"` |

## Look something up

1. Read the file the table names.
2. Answer with the exact token, style, component, or asset name, its value, and the file that states it.
3. If no file states it, say so. Never guess a value.

## Build a mock

1. Copy the whole `assets/kit/` folder to the output location.
2. Write the page into the copy's `index.html`. The components are on `window.Limelight`. Start from the previews of the components you need. For a full page, follow the page anatomy in the visual foundations.
3. Use a bundle component wherever one exists. Never rebuild one by hand.
4. Style any other markup with the token variables from `tokens.css`. Never write a raw color, size, or shadow.
5. Use the images in the copy's `images/` folder as they are: logos, icons, agent portraits, and marks. Never recolor, crop, or redraw them.
6. Write every string by the content fundamentals.
7. The mock is done when the copy's `index.html` renders in a browser. If you could not open it in a browser, say that nobody viewed it.

## Review

1. Read or view the page or asset under review. If you cannot, ask for it. Never report a clean review of work you did not see.
2. Check it against the content fundamentals, the visual foundations, the logo rules, the agent marks, the iconography, and the guide of each component it uses.
3. Report each finding as: where it is, the rule it breaks, the file that states the rule, and the fix.
4. Report only rules that this system states.

## Stop and ask

- The page needs a component the bundle does not have.
- The page or asset to review is not available.
```

- [ ] **Step 7: Validate the skill**

Run: `npm run validate`
Expected: `3 plugins, 12 skills: 0 errors, 0 warnings`. Fix any error in `SKILL.md`. An error inside generated files means the sync tool needs a fix: add a failing test first, fix the tool, then repeat Step 1.

- [ ] **Step 7a: Build the GREEN workspaces**

```bash
SCRATCH="${SCRATCH:-${TMPDIR:-/tmp}/design-system-skills}"
SKILL=plugins/company/skills/limelight-marketing-design-system
EVALS="$SCRATCH/evals/marketing"
for host in claude codex; do
  dir=$([ "$host" = claude ] && echo .claude/skills || echo .agents/skills)
  for id in lookup build review-page review-graphic; do
    W="$EVALS/green-$host/$id"
    rm -rf "$W" && mkdir -p "$W/$dir"
    cp -R "$SKILL" "$W/$dir/"
    [ -d "$EVALS/red/$id/review" ] && cp -R "$EVALS/red/$id/review" "$W/"
  done
done
```

- [ ] **Step 7b: Run GREEN in Claude**

Dispatch four subagents in parallel, as in Step 4, with `$W` set to `$EVALS/green-claude/<id>`. Replace the RED sentence about `./design-system/` with: `Use the limelight-marketing-design-system skill in ./.claude/skills/limelight-marketing-design-system/.` Save each answer to `$EVALS/green-claude/<id>.answer.md` and score it with Step 5.

- [ ] **Step 7c: Run GREEN in Codex**

```bash
SCRATCH="${SCRATCH:-${TMPDIR:-/tmp}/design-system-skills}"
EVALS="$SCRATCH/evals/marketing"
ask() {
  local id="$1" request="$2" W="$EVALS/green-codex/$1"
  codex exec --skip-git-repo-check --ephemeral -s workspace-write -C "$W" -o "$EVALS/green-codex/$id.answer.md" \
    "$request Use the limelight-marketing-design-system skill in ./.agents/skills/limelight-marketing-design-system/. When you finish, list every file you read and every file you wrote." \
    > "$EVALS/green-codex/$id.log" 2>&1 &
}
ask lookup "Which type style do hero headings use on limelighthq.com?"
ask build "Build a mock of a pricing section with a monthly and yearly billing toggle for limelighthq.com. Put everything in ./out/."
ask review-page "Review ./review/page.html against the Limelight brand and list what breaks it."
ask review-graphic "Review the LinkedIn banner described in ./review/linkedin-banner.md against the Limelight brand and list what breaks it."
wait
```

Run it with a 20-minute timeout. Score each answer with Step 5 and record the results.

- [ ] **Step 7d: Close the gaps**

For each GREEN failure in either host, change the `SKILL.md` wording that failed. Then rerun that scenario in both hosts. Stop after three rounds and report any remaining failure to Grant with the evidence.

- [ ] **Step 8: Add the evaluation fixtures and docs**

In `evals/discovery.json`, add this entry after the product entry:

```json
  {
    "skill": "limelight-marketing-design-system",
    "positive": [
      "Mock up a new hero section for limelighthq.com.",
      "Review this LinkedIn banner against the Limelight brand.",
      "Which gradient goes with Cooper on the website?"
    ],
    "negative": "Mock up the Approvals screen in the Limelight app."
  },
```

In `evals/README.md`, add these rows to the end of the behavior table:

```markdown
| `limelight-marketing-design-system` | Hero heading type style lookup | Names `heading-display` and Host Grotesk and the file that states them. |
| `limelight-marketing-design-system` | Pricing section mock; no browser | Copies the kit with its fonts, builds with `PricingCard` and `BillingToggle`, writes sentence-case buttons, and says nobody viewed it. |
| `limelight-marketing-design-system` | Page with braces in running text, a bold Title Case heading, an emoji, gradient text, and an arrow on a button | Finds each break, cites its rule file, and invents no rule. |
| `limelight-marketing-design-system` | Described LinkedIn banner that breaks logo, agent, copy, imagery, and accent rules | Finds each break, cites its rule file, and does not flag the allowed Medium 500 headline. |
```

In `docs/portability.md`, add this row to the end of the capability table:

```markdown
| `limelight-marketing-design-system` | File access to the copy. A browser, network access, and Google Fonts for mocks. The page or asset under review. | Without a browser, deliver the page and say nobody viewed it. Without Google Fonts, Geist Mono text falls back to a system monospace font. Without the item under review, ask for it. |
```

In `plugins/company/README.md`, add this row after the `limelight-work` row:

```markdown
| [`limelight-marketing-design-system`](skills/limelight-marketing-design-system/SKILL.md) | Build mocks of website pages, review pages and brand assets, or look up the Limelight brand. Mocks need a browser and network access. |
```

In the root `README.md` table, change the `company` row's skills to: `` `decide`, `limelight-marketing-design-system`, `limelight-product-design-system`, `limelight-work`, `md-render` ``.

- [ ] **Step 9: Run the repo checks and commit**

```bash
npm run validate && npm test
git add plugins/company README.md docs/portability.md evals
git commit -m "Add the limelight-marketing-design-system skill"
```

Expected: `3 plugins, 12 skills: 0 errors, 0 warnings`, and every test passes.

---

### Task 7: Discovery and install checks

**Files:**
- Modify only if a check fails: the `description` of either design system skill, or `evals/discovery.json`.

**Interfaces:**
- Consumes: both skills and their discovery entries (Tasks 5 and 6).
- Produces: recorded results for all 48 discovery decisions in both hosts, and a passing install check.

- [ ] **Step 1: Build the discovery prompt**

```bash
SCRATCH="${SCRATCH:-${TMPDIR:-/tmp}/design-system-skills}"; mkdir -p "$SCRATCH/discovery"
node --input-type=module -e '
import { readFileSync, readdirSync } from "node:fs";
import { parseSkillFile } from "./tools/lib/frontmatter.mjs";
const skills = readdirSync("plugins").flatMap((plugin) => readdirSync(`plugins/${plugin}/skills`)
  .map((name) => parseSkillFile(readFileSync(`plugins/${plugin}/skills/${name}/SKILL.md`, "utf8")).data));
const requests = JSON.parse(readFileSync("evals/discovery.json", "utf8")).flatMap((entry) => [...entry.positive, entry.negative]);
console.log("These agent skills are installed:\n");
for (const skill of skills) console.log(`- ${skill.name}: ${skill.description}`);
console.log("\nFor each request below, list every skill an agent should load for it, or an empty list. Reply with JSON only: an array of {\"request\": string, \"skills\": string[]}, in request order.\n");
requests.forEach((request, index) => console.log(`${index + 1}. ${request}`));
' > "$SCRATCH/discovery/prompt.txt"
grep -c '^[0-9]*\. ' "$SCRATCH/discovery/prompt.txt"
```

Expected: `48`.

- [ ] **Step 2: Ask fresh sessions in both hosts**

```bash
SCRATCH="${SCRATCH:-${TMPDIR:-/tmp}/design-system-skills}"
claude -p --model sonnet "$(cat "$SCRATCH/discovery/prompt.txt")" > "$SCRATCH/discovery/claude.json"
codex exec --skip-git-repo-check --ephemeral -s read-only -C "$SCRATCH/discovery" -o "$SCRATCH/discovery/codex.json" "$(cat "$SCRATCH/discovery/prompt.txt")" > "$SCRATCH/discovery/codex.log" 2>&1
```

- [ ] **Step 3: Score the answers**

```bash
SCRATCH="${SCRATCH:-${TMPDIR:-/tmp}/design-system-skills}"
for host in claude codex; do
node --input-type=module -e '
import { readFileSync } from "node:fs";
const [file, host] = process.argv.slice(1);
const text = readFileSync(file, "utf8");
const answers = JSON.parse(text.slice(text.indexOf("["), text.lastIndexOf("]") + 1));
const cases = JSON.parse(readFileSync("evals/discovery.json", "utf8")).flatMap((entry) => [
  ...entry.positive.map((request) => ({ request, skill: entry.skill, expect: true })),
  { request: entry.negative, skill: entry.skill, expect: false },
]);
const misses = cases.filter((item, index) => (answers[index]?.skills ?? []).includes(item.skill) !== item.expect);
console.log(`${host}: ${cases.length - misses.length}/${cases.length} decisions match`);
for (const miss of misses) console.log(`  ${miss.expect ? "missed" : "wrongly loaded"} ${miss.skill}: ${miss.request}`);
' "$SCRATCH/discovery/$host.json" "$host"
done
```

Expected: `claude: 48/48 decisions match` and `codex: 48/48 decisions match`. A miss on a design system skill means its description needs different words. Change the description, rerun Steps 1 to 3, and rerun that skill's GREEN scenarios, because a reworded description is a behavior change. A miss on an older skill that the new descriptions did not cause is out of scope: record it and tell Grant.

- [ ] **Step 4: Run the install check**

Run: `npm run test:install`
Expected: `Installed 12 complete skill bundles for codex, claude-code, cursor, opencode; no maintenance skills.`

- [ ] **Step 5: Run the repo checks and commit any change**

```bash
npm run validate && npm test
git status --short
```

If Step 3 changed a description or fixture, commit it:

```bash
git add plugins/company evals
git commit -m "Tune the design system skill descriptions after discovery checks"
```

Report the discovery scores, the GREEN results from Tasks 5 and 6, and the install check to Grant. Name any check that was skipped or failed.
