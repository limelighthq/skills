import { isMap, isScalar, parseDocument } from 'yaml';

const FENCE = /^---[ \t]*\r?$/;

/**
 * Splits a SKILL.md into its YAML frontmatter and Markdown body.
 * Harnesses only recognize frontmatter when `---` is the very first line.
 *
 * Returns { ok: false, reason } or
 * { ok: true, data, document, source, body, bodyStartLine }.
 */
export function parseSkillFile(text) {
  const lines = text.split('\n');
  if (!FENCE.test(lines[0] ?? '')) return { ok: false, reason: 'missing' };

  const closing = lines.findIndex((line, index) => index > 0 && FENCE.test(line));
  if (closing === -1) return { ok: false, reason: 'missing' };

  const source = lines.slice(1, closing).join('\n');
  const document = parseDocument(source, { prettyErrors: true });
  if (document.errors.length > 0) {
    return { ok: false, reason: 'invalid-yaml', detail: document.errors[0].message.split('\n')[0] };
  }
  if (!isMap(document.contents)) {
    return { ok: false, reason: 'invalid-yaml', detail: 'frontmatter must be a YAML mapping of fields' };
  }

  return {
    ok: true,
    data: document.toJS(),
    document,
    source,
    body: lines.slice(closing + 1).join('\n'),
    bodyStartLine: closing + 2,
  };
}

/**
 * Describes how a scalar field was written, because the writing style decides
 * whether every harness reads the same value:
 *  - block scalars (`>` / `|`) and multi-line values render as an EMPTY
 *    description in Claude Code's skill listing;
 *  - an unquoted value containing ` #` is cut off there as a YAML comment.
 */
export function scalarStyle(parsed, key) {
  const node = parsed.document.get(key, true);
  if (!isScalar(node) || !node.range) return null;

  const written = parsed.source.slice(node.range[0], node.range[1]);
  const isBlock = node.type === 'BLOCK_FOLDED' || node.type === 'BLOCK_LITERAL';
  const lineEnd = parsed.source.indexOf('\n', node.range[0]);
  const restOfLine = parsed.source.slice(node.range[0], lineEnd === -1 ? undefined : lineEnd);

  return {
    singleLine: !isBlock && !written.includes('\n'),
    truncatedByComment: node.type === 'PLAIN' && / #/.test(restOfLine),
  };
}
