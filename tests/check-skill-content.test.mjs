import assert from 'node:assert/strict';
import { chmodSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';

import { checkSkill } from '../tools/lib/check-skill.mjs';
import { makeSkill, rules, tempDir } from './helpers.mjs';

function check(options) {
  return checkSkill(makeSkill(tempDir(), 'changelog', options));
}

test('a body over 500 lines is an error', () => {
  const result = check({ body: `${'line\n'.repeat(501)}` });
  assert.deepEqual(rules(result.errors), ['body-too-long']);
});

test('a body over roughly 5,000 tokens warns', () => {
  const result = check({ body: `${'word '.repeat(4200)}\n` });
  assert.deepEqual(result.errors, []);
  assert.deepEqual(rules(result.warnings), ['body-tokens-high']);
});

test('a relative link to a bundled file passes', () => {
  const result = check({
    body: 'See [the formats guide](references/formats.md) and [section](#usage).\n',
    files: { 'references/formats.md': '# Formats\n' },
  });
  assert.deepEqual(result.errors, []);
});

test('a relative link to a missing file is an error', () => {
  const result = check({ body: 'See [the formats guide](references/formats.md).\n' });
  assert.deepEqual(rules(result.errors), ['link-broken']);
  assert.match(result.errors[0].message, /references\/formats\.md/);
});

test('a link that leaves the skill directory is an error because skills install standalone', () => {
  const result = check({ body: 'Policy lives in [the workflow doc](../../docs/pr-workflow.md).\n' });
  assert.deepEqual(rules(result.errors), ['link-escapes-skill']);
});

test('a repo-rooted link is treated as leaving the skill directory', () => {
  const result = check({ body: 'See [conventions](/docs/conventions.md).\n' });
  assert.deepEqual(rules(result.errors), ['link-escapes-skill']);
});

test('web links, anchors, and links inside code fences are ignored', () => {
  const result = check({
    body: [
      'Read [the spec](https://agentskills.io/specification) or [mail us](mailto:skills@example.com).',
      '',
      '```markdown',
      'Example only: [missing](references/not-real.md)',
      '```',
      '',
    ].join('\n'),
  });
  assert.deepEqual(result.errors, []);
});

test('links inside bundled reference files are checked relative to that file', () => {
  const result = check({
    body: 'See [advanced](references/advanced.md).\n',
    files: { 'references/advanced.md': 'Back to [the skill](../SKILL.md) and [gone](missing.md).\n' },
  });
  assert.deepEqual(rules(result.errors), ['link-broken']);
  assert.match(result.errors[0].file, /references\/advanced\.md$/);
});

test('an absolute path into a home directory is an error', () => {
  const result = check({ body: 'Run `/Users/grant/Developer/tools/run.sh` first.\n' });
  assert.deepEqual(rules(result.errors), ['absolute-local-path']);
});

test('a placeholder home path is allowed', () => {
  const result = check({ body: 'Config lives at `/Users/<you>/.config/tool` or `/home/$USER/.config/tool`.\n' });
  assert.deepEqual(result.errors, []);
});

for (const [label, secret] of [
  ['GitHub token', `ghp_${'a1B2'.repeat(9)}`],
  ['AWS access key', 'AKIAIOSFODNN7EXAMPLE'],
  ['Slack token', 'xoxb-123456789012-abcdefghijkl'],
  ['Anthropic key', `sk-ant-${'a1B2'.repeat(8)}`],
  ['private key', '-----BEGIN OPENSSH PRIVATE KEY-----'],
]) {
  test(`a ${label} in any bundled text file is an error`, () => {
    const result = check({ files: { 'scripts/run.sh': `#!/usr/bin/env bash\nexport TOKEN=${secret}\n` } });
    assert.deepEqual(rules(result.errors), ['secret-detected']);
    assert.doesNotMatch(result.errors[0].message, new RegExp(secret.slice(8)), 'the finding must not echo the secret');
  });
}

test('a bundled file over 1 MB is an error', () => {
  const result = check({ files: { 'assets/capture.bin': Buffer.alloc(1024 * 1024 + 1) } });
  assert.deepEqual(rules(result.errors), ['file-too-large']);
});

test('a SKILL.md nested inside another skill is an error', () => {
  const result = check({ files: { 'extras/helper/SKILL.md': '---\nname: helper\ndescription: Use when helping.\n---\n' } });
  assert.deepEqual(rules(result.errors), ['nested-skill']);
});

test('a reference file over 100 lines without a Contents heading warns', () => {
  const long = `# Reference\n\n${'detail\n'.repeat(120)}`;
  const withToc = `# Reference\n\n## Contents\n\n- a\n\n${'detail\n'.repeat(120)}`;
  assert.deepEqual(rules(check({ files: { 'references/long.md': long } }).warnings), ['reference-missing-contents']);
  assert.deepEqual(check({ files: { 'references/long.md': withToc } }).warnings, []);
});

test('a script with a shebang but no executable bit warns', () => {
  const dir = makeSkill(tempDir(), 'changelog', { files: { 'scripts/run.sh': '#!/usr/bin/env bash\necho ok\n' } });
  assert.deepEqual(checkSkill(dir).warnings, []);
  chmodSync(join(dir, 'scripts/run.sh'), 0o644);
  assert.deepEqual(rules(checkSkill(dir).warnings), ['script-not-executable']);
});
