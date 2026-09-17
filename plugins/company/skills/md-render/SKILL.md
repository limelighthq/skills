---
name: md-render
description: "Render Markdown files to HTML, PDF, or other formats with styling and formatting options. Use when you need to convert .md files to presentation-ready formats, generate documentation websites, create styled PDFs from markdown, or preview markdown with custom themes and layouts."
compatibility: Requires python3 with the markdown package. PDF output also needs weasyprint. Live preview also needs watchdog.
---

# Markdown Renderer

Convert Markdown files to HTML, PDF, and other formats with professional styling.

## Core Functionality

### HTML Rendering
- Convert `.md` to styled HTML with CSS themes
- Syntax highlighting for code blocks
- Custom CSS injection for branding
- Responsive layouts for mobile/desktop

### PDF Generation  
- Professional PDF output from markdown
- Custom page layouts and margins
- Print-optimized styling
- Table of contents generation

### Live Preview
- Real-time markdown preview server
- Hot reload on file changes
- Multiple theme options

## Quick Start

**Basic HTML render:**
```bash
scripts/md_to_html.py input.md output.html
```

**PDF generation:**
```bash  
scripts/md_to_pdf.py input.md output.pdf --theme professional
```

**Live preview:**
```bash
scripts/preview_server.py input.md --port 3000
```

## Styling Options

**Built-in themes:**
- `github` - GitHub-style rendering
- `professional` - Clean business document style  
- `minimal` - Simple, focused layout
- `academic` - Research paper formatting

**Custom CSS:**
```bash
scripts/md_to_html.py input.md output.html --css custom.css
```

## Advanced Features

**For complex documents**: See [ADVANCED.md](references/ADVANCED.md) for:
- Multi-file projects
- Custom plugins and extensions
- Template customization
- Batch processing workflows

**For specific formats**: See [FORMATS.md](references/FORMATS.md) for:
- Slide deck generation (reveal.js)
- Documentation sites (static site generation)
- eBook formats (EPUB)
- LaTeX conversion

## Troubleshooting

Common issues and solutions in [TROUBLESHOOTING.md](references/TROUBLESHOOTING.md).