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
