import { posix } from 'node:path';

const CONTENTS_MIN_LINES = 100; // the validator's reference-missing-contents threshold
const GENERATED = new Set(['overview', 'source']);
const SECTION = /^## (.+?)\s*#*\s*$/;
const LINK = /(!?\[[^\]]*\]\(\s*<?)([^)\s>]+)(>?(?:\s+"[^"]*")?\s*\))/g;

/** Turns a heading into a file name stem: "Contrast (WCAG 2.2 AA)" becomes "contrast-wcag-2-2-aa". */
export function slugify(heading) {
  return heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

/**
 * Splits a design system README at each "## " heading outside code fences.
 * overview.md holds the text before the first section. Each section gets its own
 * file, with every heading moved up one level so the section title is the "# ".
 */
export function splitReadme(markdown) {
  const parts = [{ file: 'overview.md', title: 'Overview', lines: [] }];
  let fence = null;
  for (const line of markdown.replace(/\r\n?/g, '\n').split('\n')) {
    const inside = fence !== null;
    fence = nextFence(fence, line);
    const heading = !inside && fence === null ? SECTION.exec(line) : null;
    if (!heading) {
      parts.at(-1).lines.push(line);
      continue;
    }
    const title = heading[1];
    const slug = slugify(title);
    if (!slug) throw new Error(`README section "${title}" has no letters or digits to name its file`);
    if (GENERATED.has(slug)) throw new Error(`README section "${title}" would replace the generated ${slug}.md; rename the section in the design system`);
    if (parts.some((part) => part.file === `${slug}.md`)) throw new Error(`two README sections map to ${slug}.md; rename one of them in the design system`);
    parts.push({ file: `${slug}.md`, title, lines: [] });
  }
  return parts.map(({ file, title, lines }) => {
    const body = promoteHeadings(trimBlankLines(lines));
    return { file, text: body.length > 0 ? `# ${title}\n\n${body.join('\n')}\n` : `# ${title}\n` };
  });
}

/** Adds a "## Contents" list under the title of a Markdown file longer than 100 lines. */
export function addContents(markdown) {
  const lines = markdown.split('\n');
  if (lines.length <= CONTENTS_MIN_LINES) return markdown;
  const [title, ...rest] = lines;
  const headings = [];
  let fence = null;
  for (const line of rest) {
    const inside = fence !== null;
    fence = nextFence(fence, line);
    const match = !inside && fence === null ? SECTION.exec(line) : null;
    if (match) headings.push(`- ${match[1]}`);
  }
  const list = headings.length > 0 ? headings.join('\n') : 'This file has no subsections.';
  return [title, '', '## Contents', '', list, '', ...trimLeadingBlankLines(rest)].join('\n');
}

/**
 * Points the relative links of a copied Markdown file at the skill's copies.
 * `from` is the file's published path ("project/components/Badge/README.md"), `to` its
 * path in the skill ("references/components/Badge.md"), and `paths` maps published paths
 * and "/_blob/<id>" URLs to skill paths. A relative link to anything else throws,
 * because the skill would ship it broken.
 */
export function rewriteLinks(markdown, { from, to, paths }) {
  return mapProse(markdown, (prose) => prose.replace(LINK, (whole, open, target, close) => {
    if (target.startsWith('#') || /^[a-z][a-z0-9+.-]*:/i.test(target)) return whole;
    const cut = target.search(/[?#]/);
    const path = cut === -1 ? target : target.slice(0, cut);
    const suffix = cut === -1 ? '' : target.slice(cut);
    const published = path.startsWith('/') ? path : posix.normalize(posix.join(posix.dirname(from), decodeURIComponent(path)));
    const copy = paths.get(published);
    if (!copy) throw new Error(`${from} links to ${published}, which the skill does not carry; remove the link in the design system or teach the sync tool to copy that file`);
    return `${open}${posix.relative(posix.dirname(to), copy)}${suffix}${close}`;
  }));
}

// Applies `transform` to text outside fenced code blocks and inline code spans.
function mapProse(markdown, transform) {
  const out = [];
  let prose = [];
  let fence = null;
  const flush = () => {
    if (prose.length === 0) return;
    const parts = prose.join('\n').split(/(`[^`\n]*`)/);
    out.push(parts.map((part, index) => (index % 2 === 1 ? part : transform(part))).join(''));
    prose = [];
  };
  for (const line of markdown.split('\n')) {
    const inside = fence !== null;
    fence = nextFence(fence, line);
    if (inside || fence !== null) {
      flush();
      out.push(line);
    } else {
      prose.push(line);
    }
  }
  flush();
  return out.join('\n');
}

// Tracks an open code fence: returns its marker while open, or null when closed.
function nextFence(open, line) {
  const marker = /^(`{3,}|~{3,})/.exec(line)?.[1];
  if (!marker) return open;
  if (open === null) return marker;
  return marker[0] === open[0] && marker.length >= open.length ? null : open;
}

function promoteHeadings(lines) {
  let fence = null;
  return lines.map((line) => {
    const inside = fence !== null;
    fence = nextFence(fence, line);
    return !inside && fence === null ? line.replace(/^#(#{1,5}\s)/, '$1') : line;
  });
}

function trimBlankLines(lines) {
  let start = 0;
  let end = lines.length;
  while (start < end && lines[start].trim() === '') start += 1;
  while (end > start && lines[end - 1].trim() === '') end -= 1;
  return lines.slice(start, end);
}

function trimLeadingBlankLines(lines) {
  const start = lines.findIndex((line) => line.trim() !== '');
  return start === -1 ? [] : lines.slice(start);
}
