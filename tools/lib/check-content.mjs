import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, extname, join, relative, resolve, sep } from 'node:path';

const BODY_MAX_LINES = 500;
const BODY_MAX_CHARS = 20_000; // about 5,000 tokens, the Agent Skills guidance for an activated skill
const FILE_MAX_BYTES = 1024 * 1024;
const REFERENCE_TOC_MIN_LINES = 100;

const HOME_PATH = /(?:\/Users\/|\/home\/|[A-Za-z]:\\Users\\)([^\s/\\`"')]+)/g;
const HOME_PLACEHOLDER = /^[<{$[]|^(you|your|name|user|username|me|someone|example)$/i;

// Shapes of real credentials. Findings never echo the match.
const SECRET_PATTERNS = [
  ['GitHub token', /\bgh[pousr]_[A-Za-z0-9]{36,}\b|\bgithub_pat_[A-Za-z0-9_]{22,}\b/],
  ['AWS access key', /\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/],
  ['Slack token', /\bxox[abprs]-[A-Za-z0-9-]{10,}/],
  ['API secret key', /\bsk-(?:ant-|proj-)?[A-Za-z0-9_-]{20,}/],
  ['Stripe live key', /\b[sr]k_live_[A-Za-z0-9]{20,}/],
  ['Notion token', /\b(?:secret_[A-Za-z0-9]{40,}|ntn_[A-Za-z0-9]{40,})\b/],
  ['Linear API key', /\blin_api_[A-Za-z0-9]{30,}\b/],
  ['private key', /-----BEGIN (?:[A-Z]+ )?PRIVATE KEY-----/],
];

/** Checks everything a skill bundles beyond its frontmatter. */
export function checkContent(skillDir, body, error, warn) {
  const skillFile = join(skillDir, 'SKILL.md');

  const bodyLines = body.split('\n').length;
  if (bodyLines > BODY_MAX_LINES) {
    error('body-too-long', `SKILL.md body is ${bodyLines} lines; keep it under ${BODY_MAX_LINES} and move detail into references/`, skillFile);
  } else if (body.length > BODY_MAX_CHARS) {
    warn('body-tokens-high', `SKILL.md body is about ${Math.round(body.length / 4)} tokens; the guidance is under 5,000 because the whole body loads on activation`, skillFile);
  }

  for (const file of walk(skillDir)) {
    const rel = relative(skillDir, file);

    if (rel !== 'SKILL.md' && rel.endsWith(`${sep}SKILL.md`)) {
      error('nested-skill', `${rel} is a skill nested inside another skill; give it its own directory under skills/`, file);
      continue;
    }

    const { size, mode } = statSync(file);
    if (size > FILE_MAX_BYTES) {
      error('file-too-large', `${rel} is ${(size / 1024 / 1024).toFixed(1)} MB; bundled files must stay under 1 MB`, file);
      continue;
    }

    const buffer = readFileSync(file);
    if (buffer.subarray(0, 8192).includes(0)) continue; // binary
    const text = buffer.toString('utf8');

    checkSecretsAndPaths(text, rel, file, error);

    if (extname(file) === '.md') {
      checkLinks(text, file, skillDir, error);
      if (rel !== 'SKILL.md') checkContentsHeading(text, rel, file, warn);
    }

    const inScripts = rel.split(sep)[0] === 'scripts';
    if (inScripts && text.startsWith('#!') && (mode & 0o111) === 0) {
      warn('script-not-executable', `${rel} has a shebang but is not executable; run \`chmod +x\` so agents can invoke it directly`, file);
    }
  }
}

function walk(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const target = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(target));
    else if (entry.isFile()) files.push(target);
  }
  return files.sort();
}

function checkSecretsAndPaths(text, rel, file, error) {
  for (const [label, pattern] of SECRET_PATTERNS) {
    if (pattern.test(text)) error('secret-detected', `${rel} contains what looks like a ${label}; remove it and rotate the credential`, file);
  }
  for (const match of text.matchAll(HOME_PATH)) {
    if (HOME_PLACEHOLDER.test(match[1])) continue;
    error('absolute-local-path', `${rel} contains a path into a personal home directory; use a path relative to the skill root`, file);
    break;
  }
}

function checkLinks(text, file, skillDir, error) {
  const prose = text.replace(/^(```|~~~)[\s\S]*?^\1[^\n]*$/gm, '').replace(/`[^`\n]*`/g, '');
  const root = resolve(skillDir);

  for (const match of prose.matchAll(/!?\[[^\]]*\]\(\s*<?([^)\s>]+)>?(?:\s+"[^"]*")?\s*\)/g)) {
    const target = match[1].split('#')[0].split('?')[0];
    if (target === '' || /^[a-z][a-z0-9+.-]*:/i.test(target)) continue; // anchors and URLs

    const resolved = target.startsWith('/') ? null : resolve(dirname(file), decodeURIComponent(target));
    if (!resolved || (resolved !== root && !resolved.startsWith(root + sep))) {
      error('link-escapes-skill', `link "${target}" points outside the skill directory; skills install standalone, so bundle the file or link to a URL`, file);
    } else if (!existsSync(resolved)) {
      error('link-broken', `link "${target}" does not resolve to a bundled file`, file);
    }
  }
}

function checkContentsHeading(text, rel, file, warn) {
  if (text.split('\n').length <= REFERENCE_TOC_MIN_LINES) return;
  if (/^#{1,3}\s+(table of )?contents\b/im.test(text)) return;
  warn('reference-missing-contents', `${rel} is over ${REFERENCE_TOC_MIN_LINES} lines; add a "## Contents" heading so agents can read it selectively`, file);
}
