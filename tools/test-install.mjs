#!/usr/bin/env node
// Exercise the real installer in a disposable project, never the user's install.
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const source = join(root, 'plugins');
const project = mkdtempSync(join(tmpdir(), 'skill install test '));
const targets = ['codex', 'claude-code', 'cursor', 'opencode'];
const expected = new Map();
for (const plugin of readdirSync(source)) {
  const skills = join(source, plugin, 'skills');
  for (const name of readdirSync(skills)) {
    assert(!expected.has(name), `duplicate source skill: ${name}`);
    expected.set(name, join(skills, name));
  }
}

function files(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? files(path) : [path];
  });
}

try {
  assert(process.env.npm_execpath, 'Run this check with npm run test:install');
  const install = spawnSync(process.execPath, [process.env.npm_execpath,
    'exec', '--yes', '--package=skills@1.7.0', '--', 'skills', 'add', source,
    '--agent', ...targets, '--skill', '*', '--copy', '--yes'], {
    cwd: project, encoding: 'utf8', timeout: 120_000,
    env: { ...process.env, DISABLE_TELEMETRY: '1' },
  });
  assert.equal(install.status, 0, `${install.error ?? ''}\n${install.stdout}\n${install.stderr}`);

  // skills 1.7.0 uses .agents for Codex, Cursor and OpenCode, .claude for Claude Code.
  for (const hostDirectory of ['.agents', '.claude']) {
    const installed = join(project, hostDirectory, 'skills');
    assert.deepEqual(readdirSync(installed).sort(), [...expected.keys()].sort(),
      `${hostDirectory}: shared catalog differs or maintenance skills leaked`);
    for (const [name, original] of expected) {
      const copy = join(installed, name);
      const originalFiles = files(original).map(path => relative(original, path)).sort();
      assert.deepEqual(files(copy).map(path => relative(copy, path)).sort(), originalFiles,
        `${name}: a bundled file was omitted or added`);
      for (const file of originalFiles) {
        assert(readFileSync(join(original, file)).equals(readFileSync(join(copy, file))),
          `${name}/${file}: installed content differs from source`);
      }
    }
  }
  console.log(`Installed ${expected.size} complete skill bundles for ${targets.join(', ')}; no maintenance skills.`);
} finally {
  rmSync(project, { recursive: true, force: true });
}
