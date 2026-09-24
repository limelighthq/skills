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
