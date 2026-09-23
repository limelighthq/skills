# Advanced Markdown rendering

## Batch conversion

Resolve the installed skill directory and all document paths first, as described in the skill. Invoke `scripts/md_to_html.py` once per file using the selected Python interpreter. Give each document an explicit output path and preserve the directory structure when documents link to one another. The converter does not rewrite links or generate navigation.

Use the host's shell loop, a small task-local Python loop, or repeated tool calls. Shell syntax differs between POSIX shells and PowerShell; the underlying script arguments are the same.

## Table of contents

Place `[TOC]` on its own line in the input Markdown. The Markdown `toc` extension replaces that marker with links to headings. A table of contents is not inserted automatically when the marker is absent.

## Styling

Use `--theme` with `github`, `professional`, `minimal`, or `academic`. HTML rendering also accepts `--css` with an absolute path to a CSS file. Custom CSS is appended after the theme.

For custom PDF styling, first render HTML with `scripts/md_to_html.py --css`, then invoke the selected Python interpreter with `-m weasyprint --base-url "<source-directory>" "<styled.html>" "<output.pdf>"`. The direct `scripts/md_to_pdf.py` command supports the bundled themes, not a `--css` flag.

CSS cannot load JavaScript. MathJax and Mermaid require a separate HTML integration and are not rendered by the bundled scripts. Prefer the host's diagram or math rendering capability when the request needs them.

## Images and links

HTML keeps the input's image and link URLs. Keep output beside the source assets, use explicit URLs, or copy the assets into the delivered bundle. The PDF wrapper resolves relative resources from the input Markdown directory. A preview serves only generated HTML; use explicit resource URLs or export a standalone bundle when local images are required.
