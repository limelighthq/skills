#!/usr/bin/env python3
"""
Convert Markdown to PDF via HTML and weasyprint
"""

import argparse
import tempfile
import subprocess
import sys
from pathlib import Path
from md_to_html import convert_md_to_html, get_theme_css

def convert_md_to_pdf(input_file, output_file=None, theme='professional'):
    """Convert markdown file to PDF"""
    
    input_path = Path(input_file)
    if not input_path.exists():
        print(f"Error: Input file '{input_file}' not found")
        return False
    
    # Set output file if not provided
    if output_file is None:
        output_file = input_path.with_suffix('.pdf')
    
    output_path = Path(output_file)
    
    # Create temporary HTML file
    with tempfile.NamedTemporaryFile(mode='w', suffix='.html', delete=False) as temp_html:
        temp_html_path = temp_html.name
    
    # Convert HTML to PDF using weasyprint
    try:
        if not convert_md_to_html(input_file, temp_html_path, theme):
            return False
        result = subprocess.run([
            sys.executable, '-m', 'weasyprint',
            '--base-url', str(input_path.resolve().parent),
            temp_html_path, 
            str(output_path)
        ], capture_output=True, text=True, check=True)
        
        print(f"✅ PDF generated: {output_path}")
        return True
        
    except subprocess.CalledProcessError as e:
        print(f"Error generating PDF: {e.stderr}")
        print("\nCheck that WeasyPrint and its native libraries are installed for this Python interpreter.")
        return False
    except FileNotFoundError:
        print(f"Error: could not launch the selected Python interpreter: {sys.executable}")
        return False
    finally:
        # Clean up temporary file
        Path(temp_html_path).unlink(missing_ok=True)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Convert Markdown to PDF")
    parser.add_argument("input", help="Input markdown file")
    parser.add_argument("output", nargs='?', help="Output PDF file (optional)")
    parser.add_argument("--theme", choices=['github', 'professional', 'minimal', 'academic'], 
                       default='professional', help="CSS theme to apply")
    
    args = parser.parse_args()
    
    success = convert_md_to_pdf(args.input, args.output, args.theme)
    sys.exit(0 if success else 1)
