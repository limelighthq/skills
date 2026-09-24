import test from 'node:test';
import assert from 'node:assert/strict';
import * as bridge from '../tools/notion/github.mjs';

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
