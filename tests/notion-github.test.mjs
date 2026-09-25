import test from 'node:test';
import assert from 'node:assert/strict';
import * as bridge from '../tools/notion/github.mjs';
import { skillHash } from '../tools/notion/catalog.mjs';

const original = { name: 'hello', sourcePath: 'plugins/company/skills/hello', files: [
  { path: 'SKILL.md', mode: 0o644, data: Buffer.from('old').toString('base64') },
  { path: 'obsolete.txt', mode: 0o644, data: Buffer.from('old').toString('base64') },
] };
const candidate = { skill: { ...original, files: [{ path: 'SKILL.md', mode: 0o644, data: Buffer.from('new').toString('base64') }] }, receipt: { format: 1, pageId: 'page', source: 'hash', remote: 'remote' } };

test('candidate entries include only exact skill changes and a durable receipt', () => {
  assert.equal(typeof bridge.candidateEntries, 'function');
  const entries = bridge.candidateEntries([candidate], [original]);
  assert.deepEqual(entries.map(e => e.path), ['.notion-sync/hello.json', 'plugins/company/skills/hello/SKILL.md', 'plugins/company/skills/hello/obsolete.txt']);
  assert.equal(entries[2].sha, null);
  assert.equal(Buffer.from(entries[1].data, 'base64').toString(), 'new');
  assert.equal(JSON.parse(Buffer.from(entries[0].data, 'base64')).pageId, 'page');
});

test('candidate entries cannot escape a skill or target infrastructure', () => {
  assert.throws(() => bridge.candidateEntries([{ ...candidate, skill: { ...candidate.skill, files: [{ path: '../../../.github/workflows/run.yml', mode: 0o644, data: '' }] } }], [original]), /path|scope/i);
  assert.throws(() => bridge.candidateEntries([{ ...candidate, skill: { ...candidate.skill, sourcePath: '.github/workflows' } }], [original]), /path|scope/i);
});

function enrollment(overrides = {}) {
  const skill = { name: 'new-skill', plugin: 'company', sourcePath: 'plugins/company/skills/new-skill', origin: 'example/skills',
    files: [{ path: 'SKILL.md', mode: 0o644, data: Buffer.from('new instructions').toString('base64') }], ...overrides };
  skill.hash = skillHash(skill);
  return { skill, receipt: { format: 2, kind: 'enrollment', repository: skill.origin, plugin: skill.plugin, sourcePath: skill.sourcePath,
    pageId: 'new-page', baseline: null, guard: 'a'.repeat(64), source: skill.hash, remote: 'b'.repeat(64) } };
}

test('new skills need an enrollment receipt and an existing plugin from the trusted catalog', () => {
  const incoming = enrollment();
  const entries = bridge.candidateEntries([incoming], [original]);
  assert.deepEqual(entries.map(entry => entry.path), ['.notion-sync/new-skill.json', 'plugins/company/skills/new-skill/SKILL.md']);
  assert.equal(JSON.parse(Buffer.from(entries[0].data, 'base64')).kind, 'enrollment');
  for (const receipt of [undefined, candidate.receipt, { ...incoming.receipt, format: 1 }, { ...incoming.receipt, kind: 'edit' },
    { ...incoming.receipt, repository: 'other/skills' }, { ...incoming.receipt, plugin: 'engineering' },
    { ...incoming.receipt, sourcePath: 'plugins/company/skills/other' }, { ...incoming.receipt, baseline: {} },
    { ...incoming.receipt, source: 'c'.repeat(64) }, { ...incoming.receipt, guard: '' }, { ...incoming.receipt, remote: '' },
    { ...incoming.receipt, pageId: '' }]) {
    assert.throws(() => bridge.candidateEntries([{ ...incoming, receipt }], [original]), /enrollment|scope/i);
  }
  assert.throws(() => bridge.candidateEntries([enrollment({ plugin: 'unknown', sourcePath: 'plugins/unknown/skills/new-skill' })], [original]), /plugin|scope/i);
  assert.throws(() => bridge.candidateEntries([incoming], []), /plugin|scope/i);
});

test('enrollment cannot change an existing skill identity or supply mismatched skill bytes', () => {
  assert.throws(() => bridge.candidateEntries([enrollment({ name: 'hello', sourcePath: original.sourcePath })], [original]), /enrollment|existing/i);
  const incoming = enrollment();
  incoming.skill.files[0].data = Buffer.from('changed after hashing').toString('base64');
  assert.throws(() => bridge.candidateEntries([incoming], [original]), /hash|enrollment/i);
  for (const [name, sourcePath] of [['new-skill', 'plugins/company/skills/another'], ['a'.repeat(65), `plugins/company/skills/${'a'.repeat(65)}`],
    ['new--skill', 'plugins/company/skills/new--skill'], ['new-skill', 'plugins/../skills/new-skill']]) {
    assert.throws(() => bridge.candidateEntries([enrollment({ name, sourcePath })], [original]), /scope|name/i);
  }
});

test('candidate paths and names cannot collide or include unsafe modes', () => {
  assert.throws(() => bridge.candidateEntries([candidate, candidate], [original]), /duplicate|collision/i);
  assert.throws(() => bridge.candidateEntries([enrollment(), enrollment()], [original]), /duplicate|collision/i);
  for (const files of [
    [{ path: 'SKILL.md', mode: 0o120000, data: '' }],
    [{ path: 'SKILL.md', mode: 0o644, data: '' }, { path: 'skill.md', mode: 0o644, data: '' }],
    [{ path: 'assets', mode: 0o644, data: '' }, { path: 'assets/image.png', mode: 0o644, data: '' }],
    [{ path: 'a\\b', mode: 0o644, data: '' }],
    [{ path: '../README.md', mode: 0o644, data: '' }],
  ]) assert.throws(() => bridge.candidateEntries([enrollment({ files })], [original]), /path|mode|collision/i);
});

test('a candidate is reusable only with the expected base and tree', () => {
  assert.equal(typeof bridge.verifyCandidateCommit, 'function');
  const commit = { parents: [{ sha: 'base' }], tree: { sha: 'tree' } };
  assert.doesNotThrow(() => bridge.verifyCandidateCommit(commit, 'base', 'tree'));
  assert.throws(() => bridge.verifyCandidateCommit(commit, 'changed', 'tree'), /base|stale/i);
  assert.throws(() => bridge.verifyCandidateCommit(commit, 'base', 'changed'), /tree|modified/i);
});

test('all four validation jobs must finish successfully before merging', () => {
  assert.equal(typeof bridge.requireValidation, 'function');
  const jobs = ['checks / validate', 'checks / scripts (ubuntu-latest)', 'checks / scripts (macos-latest)', 'checks / scripts (windows-latest)'].map(name => ({ name, conclusion: 'success' }));
  assert.doesNotThrow(() => bridge.requireValidation(jobs));
  assert.throws(() => bridge.requireValidation(jobs.slice(1)), /validation/i);
  assert.throws(() => bridge.requireValidation(jobs.map((job, i) => i === 2 ? { ...job, conclusion: 'failure' } : job)), /validation/i);
});
