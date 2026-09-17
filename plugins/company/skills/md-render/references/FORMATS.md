# Format-Specific Rendering

## Contents

- Slide Deck Generation (Reveal.js)
- Documentation Sites
- eBook Formats (EPUB)
- LaTeX Conversion
- Presentation Formats
- Web Formats
- Custom Format Extensions

## Slide Deck Generation (Reveal.js)

Convert markdown to presentation slides:

### Setup
1. Create slides.md with slide separators:
```markdown
# Title Slide

---

## Slide 2
Content here

--

### Sub-slide
Vertical navigation

---

## Slide 3
Final slide
```

2. Convert with reveal.js template:
```bash
# Create reveal.js presentation
python scripts/md_to_slides.py slides.md presentation.html
```

### Slide Features
- Horizontal navigation with `---`
- Vertical navigation with `--`  
- Speaker notes with `Note:`
- Code syntax highlighting
- Math equations with MathJax
- Custom themes and transitions

## Documentation Sites

### Static Site Generation
Create documentation websites:

```bash
# Generate site structure
mkdir docs-site
cd docs-site

# Convert all markdown files
for file in ../docs/*.md; do
    python ../scripts/md_to_html.py "$file" --theme github
done

# Add navigation index
python ../scripts/generate_index.py .
```

### Features
- Automatic navigation generation
- Search functionality  
- Mobile-responsive design
- Dark/light mode toggle
- Version control integration

## eBook Formats (EPUB)

Convert markdown to eBook:

### Requirements
```bash
pip install ebooklib
```

### Conversion
```bash
# Generate EPUB from markdown
python scripts/md_to_epub.py book.md --title "My Book" --author "Author Name"
```

### Chapter Structure
Organize content with headers:
```markdown
# Chapter 1: Introduction

Content here...

# Chapter 2: Main Content

More content...
```

## LaTeX Conversion

### Academic Papers
Convert to LaTeX for academic publishing:

```bash
# Convert to LaTeX
python scripts/md_to_latex.py paper.md --template academic
```

### Features
- Bibliography support with BibTeX
- Mathematical equations
- Figure and table references
- Custom document classes
- Citation formatting

### Templates
Available LaTeX templates:
- `academic` - Research paper format
- `article` - Journal article style  
- `book` - Book/thesis format
- `letter` - Formal letter template

## Presentation Formats

### PowerPoint Generation
Convert to PPTX slides:

```bash
# Requires python-pptx
pip install python-pptx

# Generate PowerPoint
python scripts/md_to_pptx.py slides.md presentation.pptx
```

### Google Slides
Export HTML for Google Slides import:

```bash
# Generate Google Slides compatible HTML
python scripts/md_to_html.py slides.md --theme minimal --format slides
```

## Web Formats

### AMP Pages
Generate AMP-compliant HTML:

```bash
# Create AMP pages for fast loading
python scripts/md_to_html.py article.md --format amp --theme minimal
```

### Email Templates
Convert to email-safe HTML:

```bash
# Generate email-compatible HTML
python scripts/md_to_html.py newsletter.md --format email --inline-css
```

Features:
- Inline CSS for email compatibility
- Image optimization
- Link tracking support
- Mobile-responsive design

## Custom Format Extensions

### Plugin System
Create custom format plugins:

```python
# plugins/my_format.py
def convert_markdown_to_my_format(md_content, options):
    # Custom conversion logic
    return converted_content
```

Register plugin:
```bash
# Use custom format
python scripts/md_render.py input.md --format my_format --plugin plugins/my_format.py
```