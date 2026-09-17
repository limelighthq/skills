import { existsSync, readFileSync } from 'node:fs';
import { basename, join } from 'node:path';

import { checkContent } from './check-content.mjs';
import { parseSkillFile, scalarStyle } from './frontmatter.mjs';

// https://agentskills.io/specification
const SPEC_FIELDS = ['name', 'description', 'license', 'compatibility', 'metadata', 'allowed-tools'];

// https://code.claude.com/docs/en/skills (frontmatter reference). Other harnesses ignore these.
const CLAUDE_CODE_FIELDS = [
  'when_to_use',
  'argument-hint',
  'arguments',
  'disable-model-invocation',
  'user-invocable',
  'disallowed-tools',
  'model',
  'effort',
  'context',
  'agent',
  'background',
  'hooks',
  'paths',
  'shell',
];

const ALLOWED_FIELDS = new Set([...SPEC_FIELDS, ...CLAUDE_CODE_FIELDS]);

const NAME_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const NAME_MAX = 64;
const DESCRIPTION_MAX = 1024;
const COMPATIBILITY_MAX = 500;
const LISTING_MAX = 1536; // Claude Code truncates description + when_to_use here.

const FIRST_OR_SECOND_PERSON = /^(i|we|you|my|our|your)\b/i;
const TRIGGER_CLAUSE = /\buse (this |it |only |the skill )*(when|whenever|for|if|after|before|at|every)\b|\bwhen (the user|a user|someone|asked|you)\b|\btriggers? (on|phrases?)\b/i;

export function checkSkill(skillDir) {
  const errors = [];
  const warnings = [];
  const skillFile = join(skillDir, 'SKILL.md');
  const error = (rule, message, file = skillFile) => errors.push({ rule, message, file });
  const warn = (rule, message, file = skillFile) => warnings.push({ rule, message, file });

  if (!existsSync(skillFile)) {
    error('skill-md-missing', 'skill directory has no SKILL.md');
    return { errors, warnings };
  }

  const parsed = parseSkillFile(readFileSync(skillFile, 'utf8'));
  if (parsed.ok) {
    checkFrontmatter(parsed, basename(skillDir), error, warn);
  } else if (parsed.reason === 'missing') {
    error('frontmatter-missing', 'SKILL.md must start with YAML frontmatter: `---` on line 1 and a closing `---`');
  } else {
    error('frontmatter-invalid-yaml', `frontmatter is not valid YAML: ${parsed.detail}`);
  }

  // Bundled files are checked even when the frontmatter is broken, so a leaked secret is never masked.
  checkContent(skillDir, parsed.ok ? parsed.body : '', error, warn);
  return { errors, warnings };
}

function checkFrontmatter(parsed, dirName, error, warn) {
  const { data } = parsed;

  for (const field of Object.keys(data)) {
    if (!ALLOWED_FIELDS.has(field)) {
      error('unknown-field', `"${field}" is not an Agent Skills or Claude Code field; move custom fields under \`metadata\``);
    }
  }

  const { name, description } = data;
  if (name === undefined || name === null || name === '') {
    error('name-missing', '`name` is required');
  } else {
    if (typeof name !== 'string' || name.length > NAME_MAX || !NAME_PATTERN.test(name)) {
      error('name-invalid', `\`name\` must be 1-${NAME_MAX} chars of lowercase letters, digits, and single hyphens, and must not start or end with a hyphen`);
    }
    if (name !== dirName) {
      error('name-dir-mismatch', `\`name\` is "${name}" but the directory is "${dirName}"; they must match`);
    }
  }

  if (typeof description !== 'string' || description.trim() === '') {
    error('description-missing', '`description` is required and must be non-empty');
  } else if (description.length > DESCRIPTION_MAX) {
    error('description-too-long', `\`description\` is ${description.length} chars; the limit is ${DESCRIPTION_MAX}`);
  } else if (/\bTODO\b/.test(description)) {
    error('description-placeholder', '`description` still contains TODO from the template; write what the skill does and when to use it');
  }

  for (const field of ['description', 'when_to_use']) {
    const style = scalarStyle(parsed, field);
    if (!style) continue;
    if (!style.singleLine) {
      error('description-not-single-line', `\`${field}\` must be written on one line; Claude Code lists block or multi-line values as empty`);
    } else if (style.truncatedByComment) {
      error('description-truncated-by-comment', `\`${field}\` is unquoted and contains " #", so YAML cuts it off there; wrap the value in double quotes`);
    }
  }

  checkMetadata(data.metadata, error);

  if (data.compatibility !== undefined && (typeof data.compatibility !== 'string' || data.compatibility.length > COMPATIBILITY_MAX)) {
    error('compatibility-too-long', `\`compatibility\` must be a string of at most ${COMPATIBILITY_MAX} chars`);
  }

  if (typeof description !== 'string') return;
  const whenToUse = typeof data.when_to_use === 'string' ? data.when_to_use : '';

  if (description.length + whenToUse.length > LISTING_MAX) {
    warn('listing-too-long', `\`description\` + \`when_to_use\` is ${description.length + whenToUse.length} chars; Claude Code truncates the listing at ${LISTING_MAX}`);
  }
  if (FIRST_OR_SECOND_PERSON.test(description.trim())) {
    warn('description-person', '`description` should be third person ("Renders...", not "I render..." or "You can...")');
  }
  if (!whenToUse && !TRIGGER_CLAUSE.test(description)) {
    warn('description-no-trigger', '`description` should say when to use the skill ("Use when..."); agents pick skills from this text alone');
  }
}

function checkMetadata(metadata, error) {
  if (metadata === undefined) return;
  if (metadata === null || typeof metadata !== 'object' || Array.isArray(metadata)) {
    error('metadata-not-string-map', '`metadata` must be a map of string keys to string values');
    return;
  }
  for (const [key, value] of Object.entries(metadata)) {
    if (typeof value !== 'string') {
      error('metadata-not-string-map', `\`metadata.${key}\` must be a string; quote it (for example "1.0.0") or join lists with commas`);
    }
  }
}
