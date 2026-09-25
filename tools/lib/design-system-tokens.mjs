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
