#!/usr/bin/env python3
"""
Convert Markdown to HTML with styling options
"""

import argparse
import markdown
from pathlib import Path
import sys

def convert_md_to_html(input_file, output_file=None, theme='github', custom_css=None):
    """Convert markdown file to HTML with specified theme"""
    
    input_path = Path(input_file)
    if not input_path.exists():
        print(f"Error: Input file '{input_file}' not found")
        return False
    
    # Set output file if not provided
    if output_file is None:
        output_file = input_path.with_suffix('.html')
    
    output_path = Path(output_file)
    
    # Read markdown content
    try:
        with open(input_path, 'r', encoding='utf-8') as f:
            md_content = f.read()
    except Exception as e:
        print(f"Error reading input file: {e}")
        return False
    
    # Configure markdown with extensions
    md = markdown.Markdown(extensions=[
        'codehilite',
        'tables',
        'toc',
        'fenced_code',
        'footnotes',
        'attr_list'
    ])
    
    # Convert to HTML
    html_content = md.convert(md_content)
    
    # Get CSS for theme
    css = get_theme_css(theme)
    
    # Include custom CSS if provided
    if custom_css and Path(custom_css).exists():
        with open(custom_css, 'r', encoding='utf-8') as f:
            css += f"\n{f.read()}"
    
    # Create complete HTML document
    full_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{input_path.stem}</title>
    <style>
{css}
    </style>
</head>
<body>
    <div class="markdown-body">
{html_content}
    </div>
</body>
</html>"""
    
    # Write output
    try:
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(full_html)
        print(f"✅ HTML generated: {output_path}")
        return True
    except Exception as e:
        print(f"Error writing output file: {e}")
        return False

def get_theme_css(theme):
    """Return CSS for specified theme"""
    themes = {
        'github': """
body { font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif; }
.markdown-body { max-width: 980px; margin: 0 auto; padding: 45px; }
h1, h2 { border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; }
code { background: #f6f8fa; padding: 0.2em 0.4em; border-radius: 3px; }
pre { background: #f6f8fa; padding: 16px; border-radius: 6px; overflow: auto; }
blockquote { border-left: 0.25em solid #dfe2e5; padding-left: 1em; margin-left: 0; color: #6a737d; }
table { border-collapse: collapse; } th, td { border: 1px solid #dfe2e5; padding: 6px 13px; }
th { background: #f6f8fa; font-weight: 600; }
        """,
        'professional': """
body { font-family: 'Times New Roman', serif; line-height: 1.6; color: #333; }
.markdown-body { max-width: 800px; margin: 0 auto; padding: 40px; }
h1 { color: #2c3e50; font-size: 2.5em; margin-bottom: 0.5em; }
h2 { color: #34495e; font-size: 2em; margin-top: 2em; }
h3 { color: #5d6d7e; font-size: 1.5em; }
code { background: #ecf0f1; padding: 2px 4px; font-family: 'Courier New', monospace; }
pre { background: #f8f9fa; border-left: 4px solid #3498db; padding: 15px; margin: 20px 0; }
blockquote { border-left: 4px solid #bdc3c7; padding-left: 20px; font-style: italic; }
        """,
        'minimal': """
body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.7; color: #444; }
.markdown-body { max-width: 700px; margin: 0 auto; padding: 30px; }
h1, h2, h3 { color: #222; font-weight: 300; }
h1 { font-size: 2.2em; } h2 { font-size: 1.8em; } h3 { font-size: 1.4em; }
code { background: #f5f5f5; padding: 1px 3px; font-size: 0.9em; }
pre { background: #f9f9f9; padding: 12px; border-radius: 4px; }
        """,
        'academic': """
body { font-family: 'Computer Modern', 'Times New Roman', serif; line-height: 1.8; }
.markdown-body { max-width: 750px; margin: 0 auto; padding: 50px; text-align: justify; }
h1 { text-align: center; font-size: 2.2em; margin-bottom: 0.8em; }
h2 { font-size: 1.6em; margin-top: 2.5em; }
p { margin-bottom: 1.2em; text-indent: 1.5em; }
code { font-family: 'Courier New', monospace; font-size: 0.85em; }
pre { border: 1px solid #ddd; padding: 15px; margin: 25px 0; font-size: 0.9em; }
        """
    }
    
    return themes.get(theme, themes['github'])

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Convert Markdown to HTML")
    parser.add_argument("input", help="Input markdown file")
    parser.add_argument("output", nargs='?', help="Output HTML file (optional)")
    parser.add_argument("--theme", choices=['github', 'professional', 'minimal', 'academic'], 
                       default='github', help="CSS theme to apply")
    parser.add_argument("--css", help="Custom CSS file to include")
    
    args = parser.parse_args()
    
    success = convert_md_to_html(args.input, args.output, args.theme, args.css)
    sys.exit(0 if success else 1)