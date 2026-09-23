import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { writeFileSync, rmSync, chmodSync } from 'node:fs';
import { join } from 'node:path';
import { tempDir, makeRepo, writeFiles } from './helpers.mjs';
import { buildCatalog, packSkill } from '../tools/notion/catalog.mjs';

function fixture(t) {
  const root = makeRepo(tempDir());
  t.after(() => rmSync(root, { recursive: true, force: true }));
  writeFiles(root, { 'plugins/engineering/skills/changelog/scripts/run.py': '#!/usr/bin/env python3\nprint("hello")\n' });
  execFileSync('git', ['init', '-q', root]);
  execFileSync('git', ['-C', root, 'add', '.']);
  return root;
}

test('catalog ships only tracked complete skill files, with stable executable ZIP entries', t => {
  const root = fixture(t);
  writeFiles(root, { 'plugins/engineering/skills/changelog/secret.txt': 'untracked' });
  const [skill] = buildCatalog(root, { repository: 'example/skills', origins: {} });
  assert.equal(skill.name, 'changelog');
  assert.deepEqual(skill.files.map(f => f.path), ['SKILL.md', 'scripts/run.py']);
  const zip = packSkill(skill);
  assert.deepEqual(zip, packSkill(skill));
  const parsed = JSON.parse(execFileSync(process.env.PYTHON ?? 'python3', ['-c',
    'import sys,io,zipfile,json; z=zipfile.ZipFile(io.BytesIO(sys.stdin.buffer.read())); print(json.dumps({i.filename: {"mode": i.external_attr >> 16, "content": z.read(i).decode()} for i in z.infolist()}))',
  ], { input: zip, encoding: 'utf8' }));
  assert.equal(parsed['scripts/run.py'].mode & 0o777, 0o755);
  assert.match(parsed['SKILL.md'].content, /^---\nname: changelog/);
  assert.equal(parsed['secret.txt'], undefined);
});

test('supporting content and Git executable mode changes invalidate the source hash', t => {
  const root = fixture(t);
  const config = { repository: 'example/skills', origins: {} };
  const first = buildCatalog(root, config)[0].hash;
  writeFileSync(join(root, 'plugins/engineering/skills/changelog/scripts/run.py'), 'changed');
  const second = buildCatalog(root, config)[0].hash;
  assert.notEqual(first, second);
  chmodSync(join(root, 'plugins/engineering/skills/changelog/scripts/run.py'), 0o644);
  execFileSync('git', ['-C', root, 'add', '.']);
  assert.notEqual(second, buildCatalog(root, config)[0].hash);
});

test('catalog rejects tracked symlinks instead of publishing their target', t => {
  const root = fixture(t);
  const blob = execFileSync('git', ['-C', root, 'hash-object', '-w', '--stdin'], { input: '../../outside', encoding: 'utf8' }).trim();
  execFileSync('git', ['-C', root, 'update-index', '--add', '--cacheinfo', `120000,${blob},plugins/engineering/skills/changelog/link`]);
  assert.throws(() => buildCatalog(root, { repository: 'example/skills' }), /regular file/i);
});
