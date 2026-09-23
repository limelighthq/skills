# Supported formats

| Output | Bundled entry point | Requirements |
| --- | --- | --- |
| Styled HTML | `scripts/md_to_html.py` | Markdown and Pygments |
| PDF | `scripts/md_to_pdf.py` | HTML requirements, WeasyPrint, native libraries |
| Local HTML preview | `scripts/preview_server.py` | HTML requirements, watchdog, server support |

Resolve these paths from the loaded skill directory and invoke them through the selected Python interpreter. Use `--help` for supported flags.

EPUB, LaTeX, PowerPoint, Reveal.js slides, email-specific HTML, AMP, and a searchable documentation site require other tooling. This skill does not bundle converters for those formats or support a `--format` switch. If the user asks for one, use a suitable installed capability when available or explain what additional tool is needed. Do not invent a bundled script or rename an HTML file as another format.
