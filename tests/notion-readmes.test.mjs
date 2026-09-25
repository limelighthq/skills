import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { enrollmentReadmeEntries } from '../tools/notion/readmes.mjs';

const rootReadme = '# Skills\n\n| Plugin | For | Skills |\n| --- | --- | --- |\n| [`company`](plugins/company) | Everyone | `hello` |\n| [`engineering`](plugins/engineering) | Engineers | `research` |\n\n## Install\n\nKeep this section.\n';
const pluginReadme = '# Company\n\n| Skill | Use it to |\n| --- | --- |\n| [`hello`](skills/hello/SKILL.md) | Existing description. |\n\nKeep this paragraph.\n';
const incoming = (name = 'new-skill', description = 'Builds a skill. Use when testing.') => ({
  skill: { name, plugin: 'company', sourcePath: `plugins/company/skills/${name}`, description }, receipt: { format: 2, kind: 'enrollment' },
});
function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'notion-readmes-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(join(root, 'plugins/company'), { recursive: true });
  writeFileSync(join(root, 'README.md'), rootReadme);
  writeFileSync(join(root, 'plugins/company/README.md'), pluginReadme);
  return root;
}
const content = entry => Buffer.from(entry.data, 'base64').toString();

test('enrollment updates both existing README tables in deterministic order without changing the checkout', t => {
  const root = fixture(t);
  const candidates = [incoming('zebra'), incoming('alpha')];
  const entries = enrollmentReadmeEntries(root, candidates);
  assert.deepEqual(entries.map(entry => entry.path), ['README.md', 'plugins/company/README.md']);
  assert.match(content(entries[0]), /`alpha`, `hello`, `zebra`/);
  assert.match(content(entries[0]), /`research`/);
  assert.match(content(entries[1]), /\| \[`alpha`\]\(skills\/alpha\/SKILL.md\) \| Builds a skill\. Use when testing\. \|/);
  assert.ok(content(entries[1]).indexOf('skills/alpha/') < content(entries[1]).indexOf('skills/zebra/'));
  assert.ok(content(entries[1]).endsWith('\nKeep this paragraph.\n'));
  assert.deepEqual(enrollmentReadmeEntries(root, candidates.toReversed()), entries);
  assert.equal(readFileSync(join(root, 'README.md'), 'utf8'), rootReadme);
  assert.equal(readFileSync(join(root, 'plugins/company/README.md'), 'utf8'), pluginReadme);
  assert.deepEqual(enrollmentReadmeEntries(root, [{ ...incoming(), receipt: { format: 1 } }]), []);
});

test('Notion descriptions cannot inject Markdown tables, links, or HTML into README entries', t => {
  const root = fixture(t);
  const description = 'A | B\n[link](https://bad.example) <script>x</script> `code` &amp;';
  const entries = enrollmentReadmeEntries(root, [incoming('new-skill', description)]);
  const row = content(entries[1]).split('\n').find(line => line.includes('skills/new-skill/'));
  assert.equal(row.split('|').length, 4);
  assert.match(row, /&#124;/);
  assert.match(row, /&#91;link&#93;/);
  assert.match(row, /&#60;script&#62;/);
  assert.match(row, /&#96;code&#96;/);
  assert.match(row, /&#38;amp;/);
  assert.match(row, /https:\/\/bad\.example/);
});

test('enrollment refuses unsupported README tables and existing skill entries', t => {
  const root = fixture(t);
  assert.throws(() => enrollmentReadmeEntries(root, [incoming('hello')]), /already|duplicate/i);
  assert.throws(() => enrollmentReadmeEntries(root, [incoming(), incoming()]), /duplicate/i);
  writeFileSync(join(root, 'README.md'), '# Custom table\n');
  assert.throws(() => enrollmentReadmeEntries(root, [incoming()]), /README.*table/i);
  writeFileSync(join(root, 'README.md'), rootReadme);
  writeFileSync(join(root, 'plugins/company/README.md'), '# Different layout\n');
  assert.throws(() => enrollmentReadmeEntries(root, [incoming()]), /README.*table/i);
});

test('README edits accept only canonical paths in plugins already listed by the trusted README', t => {
  const root = fixture(t);
  for (const skill of [
    { ...incoming().skill, plugin: '../outside' },
    { ...incoming().skill, name: '../outside' },
    { ...incoming().skill, sourcePath: 'plugins/company/skills/different' },
    { ...incoming().skill, plugin: 'unknown', sourcePath: 'plugins/unknown/skills/new-skill' },
  ]) assert.throws(() => enrollmentReadmeEntries(root, [{ ...incoming(), skill }]), /scope|path|plugin/i);
  rmSync(join(root, 'plugins/company/README.md'));
  symlinkSync(join(root, 'README.md'), join(root, 'plugins/company/README.md'));
  assert.throws(() => enrollmentReadmeEntries(root, [incoming()]), /regular|symbolic/i);
});
