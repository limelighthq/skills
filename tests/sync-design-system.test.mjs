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

test('writes a blob URL in guide text as the kit path a page uses', () => {
  const source = fixture({ 'project/components/Badge/README.md': `# Badge\n\nPass \`src="/_blob/${LOGO}"\` for the logo.\n` });
  const { skill } = run(source);
  assert.equal(read(skill, 'references/components/Badge.md'), '# Badge\n\nPass `src="images/Logos/logo.svg"` for the logo.\n');
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

test('removes stale generated files when removals are allowed, and leaves SKILL.md and other files alone', () => {
  const skill = join(tempDir(), 'fixture-design-system');
  writeFiles(skill, {
    'SKILL.md': 'hand-written',
    'references/source.md': '# Source\n\n- Artifact: https://claude.ai/artifact/abc\n',
    'references/old.md': 'stale',
    'assets/kit/old.js': 'stale',
    'assets/notes.txt': 'kept',
  });
  run(fixture(), { skill, allowRemovals: true });
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

test('refuses an asset name that climbs out of its folder', () => {
  const source = fixture();
  const index = JSON.parse(read(source, 'project/design-system.json'));
  index.assetGroups.Logos.files['logo.svg'].name = '../../../escaped.svg';
  writeFileSync(join(source, 'project/design-system.json'), JSON.stringify(index));
  assert.throws(() => run(source), /Logos\/\.\.\/\.\.\/\.\.\/escaped\.svg/);
});

test('refuses a font path outside the downloaded project folder', () => {
  const source = fixture();
  const tokens = JSON.parse(read(source, 'project/tokens.json'));
  tokens.type.fonts[0].file = '../outside.woff2';
  writeFiles(source, { 'outside.woff2': 'not-a-font', 'project/tokens.json': JSON.stringify(tokens) });
  assert.throws(() => run(source), /font \.\.\/outside\.woff2 points outside/);
});

test('refuses to replace a copy that another artifact generated, and changes nothing', () => {
  const skill = join(tempDir(), 'fixture-design-system');
  run(fixture(), { skill, artifact: 'https://claude.ai/artifact/other' });
  const before = read(skill, 'references/overview.md');
  assert.throws(() => run(fixture(), { skill }), /generated from https:\/\/claude\.ai\/artifact\/other/);
  assert.equal(read(skill, 'references/overview.md'), before);
});

test('refuses a skill folder whose references are not a generated copy, and changes nothing', () => {
  const skill = join(tempDir(), 'fixture-design-system');
  writeFiles(skill, { 'SKILL.md': 'hand-written', 'references/guide.md': 'hand-written' });
  assert.throws(() => run(fixture(), { skill }), /no references\/source\.md/);
  assert.equal(read(skill, 'references/guide.md'), 'hand-written');
});

test('refuses a skill whose SKILL.md names a different source artifact', () => {
  const skill = join(tempDir(), 'fixture-design-system');
  writeFiles(skill, {
    'SKILL.md': '---\nname: fixture-design-system\ndescription: "Fixture. Use when testing."\nmetadata:\n  source: https://claude.ai/artifact/other\n---\n\n# Fixture\n',
  });
  assert.throws(() => run(fixture(), { skill }), /metadata\.source/);
});

test('stops before removing files the previous copy had, unless removals are allowed', () => {
  const skill = join(tempDir(), 'fixture-design-system');
  run(fixture(), { skill });
  const source = fixture();
  rmSync(join(source, 'project/assets/Logos/README.md'));
  assert.throws(() => run(source, { skill }), /references\/images\/Logos\.md.*--allow-removals/s);
  assert.equal(read(skill, 'references/images/Logos.md'), '# Logos\n\nLogo notes.\n');
  run(source, { skill, allowRemovals: true });
  assert.equal(existsSync(join(skill, 'references/images/Logos.md')), false);
});

test('stops on two paths that differ only in letter case, before touching the previous copy', () => {
  const skill = join(tempDir(), 'fixture-design-system');
  run(fixture(), { skill });
  const other = '00112233445566778899aabbccddeeff';
  const source = fixture({ [`blobs/${other}.svg`]: '<svg id="other"/>' });
  const index = JSON.parse(read(source, 'project/design-system.json'));
  index.assetGroups.Logos.files['Logo.svg'] = { name: 'Logo.svg', blob: other, size: 17, type: 'image/svg+xml' };
  writeFileSync(join(source, 'project/design-system.json'), JSON.stringify(index));
  assert.throws(() => run(source, { skill }), /images\/Logos\/Logo\.svg and assets\/kit\/images\/Logos\/logo\.svg differ only in letter case/);
  assert.equal(read(skill, 'assets/kit/images/Logos/logo.svg'), '<svg/>');
});

test('leaves no staging folder in the skill after a run', () => {
  const { skill } = run(fixture());
  assert.deepEqual(readdirSync(skill).filter((name) => name.startsWith('.')), []);
});

test('gives byte-identical output when run twice on the same download', () => {
  const source = fixture();
  const first = run(source).skill;
  const second = run(source).skill;
  assert.deepEqual(relativeFiles(second), relativeFiles(first));
  for (const path of relativeFiles(first)) assert.ok(readFileSync(join(first, path)).equals(readFileSync(join(second, path))), path);
});

test('the command line removes files only with --allow-removals', () => {
  const skill = join(tempDir(), 'fixture-design-system');
  run(fixture(), { skill });
  const source = fixture();
  rmSync(join(source, 'project/assets/Logos/README.md'));
  const args = [CLI, '--source', source, '--skill', skill, '--artifact', 'https://claude.ai/artifact/abc', '--version', '1-a'];
  const refused = spawnSync(process.execPath, args, { encoding: 'utf8' });
  assert.equal(refused.status, 1);
  assert.match(refused.stderr, /--allow-removals/);
  const allowed = spawnSync(process.execPath, [...args, '--allow-removals'], { encoding: 'utf8' });
  assert.equal(allowed.status, 0, allowed.stderr);
  assert.equal(existsSync(join(skill, 'references/images/Logos.md')), false);
});

test('the command line explains a missing option', () => {
  const result = spawnSync(process.execPath, [CLI, '--source', 'x'], { encoding: 'utf8' });
  assert.equal(result.status, 2);
  assert.match(result.stderr, /missing --skill, --artifact, --version/);
});
