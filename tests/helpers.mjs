import { chmodSync, mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

export function tempDir() {
  return mkdtempSync(join(tmpdir(), 'skills-test-'));
}

export function writeFiles(root, files) {
  for (const [relativePath, content] of Object.entries(files)) {
    const target = join(root, relativePath);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, content);
    if (relativePath.endsWith('.sh') || relativePath.endsWith('.py')) chmodSync(target, 0o755);
  }
}

const VALID_DESCRIPTION =
  'Renders a changelog from merged pull requests. Use when preparing release notes.';

// Builds <parent>/<dirName>/SKILL.md from raw frontmatter text, so a test can
// express any frontmatter shape, including malformed ones.
// `raw` replaces the whole SKILL.md, for cases where the frontmatter fence itself is wrong.
export function makeSkill(parent, dirName, { frontmatter, body = '# Skill\n\nDo the thing.\n', files = {}, raw } = {}) {
  const skillDir = join(parent, dirName);
  const fm = frontmatter ?? `name: ${dirName}\ndescription: ${VALID_DESCRIPTION}`;
  writeFiles(skillDir, { 'SKILL.md': raw ?? `---\n${fm}\n---\n\n${body}`, ...files });
  return skillDir;
}

// A minimal valid marketplace repo with one plugin and one skill.
export function makeRepo(root, { marketplace, plugins = { engineering: ['changelog'] } } = {}) {
  const entries = Object.keys(plugins).map((name) => ({
    name,
    source: `./plugins/${name}`,
    description: `${name} skills`,
  }));
  writeFiles(root, {
    '.claude-plugin/marketplace.json': JSON.stringify(
      marketplace ?? { name: 'limelight', owner: { name: 'Limelight' }, plugins: entries },
      null,
      2,
    ),
  });
  for (const [plugin, skills] of Object.entries(plugins)) {
    writeFiles(join(root, 'plugins', plugin), {
      '.claude-plugin/plugin.json': JSON.stringify({ name: plugin, description: `${plugin} skills` }, null, 2),
      'README.md': `# ${plugin}\n`,
    });
    for (const skill of skills) makeSkill(join(root, 'plugins', plugin, 'skills'), skill);
  }
  return root;
}

export function rules(findings) {
  return findings.map((finding) => finding.rule).sort();
}
