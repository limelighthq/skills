---
name: md-render
description: "Renders Markdown to styled HTML or PDF and serves local previews. Use when asked to convert a Markdown file, export a document, generate a styled PDF, or preview Markdown with a theme or custom CSS."
compatibility: Requires Python 3.10 or newer with Markdown and Pygments. PDF output also needs WeasyPrint and its native libraries. Local preview also needs watchdog and a host that can run a local server.
---

# Markdown Renderer

## Resolve paths and dependencies

1. Find the directory containing this loaded `SKILL.md`. Replace `<skill-root>` below with its actual absolute path; it is not a variable the host sets. Keep input and output in the user's project or chosen output directory, outside the installed skill.
2. Select the available Python interpreter (`python3`, `python`, or `py -3`) and check its version. Use that same interpreter for installation and execution. Quote every path, including paths with spaces.
3. If dependencies are missing and local installation is allowed, create a task-local virtual environment. Install [requirements.txt](requirements.txt) for HTML, [requirements-pdf.txt](requirements-pdf.txt) for PDF, or [requirements-preview.txt](requirements-preview.txt) for preview with the environment's Python and `-m pip install -r "<absolute-requirements-path>"`. Never assume global packages or a CLI on `PATH` belong to the chosen interpreter.
4. If execution, files, or a required package is unavailable, explain the missing capability. Offer HTML source in chat or a host-native renderer when suitable, and label that alternative. Do not claim to have rendered, saved, or inspected an artifact that was not produced.

## Render

Replace `<python>` with the chosen interpreter and the other placeholders with absolute paths.

**HTML:**

```text
<python> "<skill-root>/scripts/md_to_html.py" "<input.md>" "<output.html>" --theme github
```

Themes: `github`, `professional`, `minimal`, `academic`. Add `--css "<custom.css>"` for custom HTML styling. The built-in Markdown extensions cover tables, fenced code, footnotes, attributes, and a table of contents at an explicit `[TOC]` marker.

**PDF:**

```text
<python> "<skill-root>/scripts/md_to_pdf.py" "<input.md>" "<output.pdf>" --theme professional
```

PDF rendering invokes WeasyPrint from the same Python environment. See [TROUBLESHOOTING.md](references/TROUBLESHOOTING.md) if its native libraries are missing.

**Local preview:**

```text
<python> "<skill-root>/scripts/preview_server.py" "<input.md>" --port 3000 --no-browser
```

Open the printed URL with the host's browser tool when available. The file watcher regenerates the HTML after edits; refresh the browser to see them. Stop the server when the preview is no longer needed. If the host cannot expose a local server, render a standalone HTML file instead. Never assume a desktop browser is present.

## Verify and deliver

Confirm the command succeeded and the output exists. Inspect the HTML or PDF with an available browser, document viewer, or image renderer when layout matters. If visual inspection is unavailable, state that limitation. Return a usable file link or attachment and the output format.

[ADVANCED.md](references/ADVANCED.md) covers supported styling and batch use. [FORMATS.md](references/FORMATS.md) explains which formats need separate tooling. Check each script's `--help` before using flags not shown here.
