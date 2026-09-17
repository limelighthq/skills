# Troubleshooting Guide

## Contents

- Installation Issues
- Rendering Issues
- PDF Generation Issues
- Live Preview Issues
- Content Issues
- Performance Issues
- Platform-Specific Issues
- Getting Help

## Installation Issues

### Missing Dependencies
**Problem:** Import errors or command not found
**Solution:** Install required packages:

```bash
# Core dependencies
pip install markdown pygments

# For PDF generation
pip install weasyprint

# For live preview
pip install watchdog

# For advanced features
pip install python-pptx ebooklib
```

### Permission Errors
**Problem:** Permission denied when running scripts
**Solution:** Make scripts executable:

```bash
chmod +x scripts/*.py
```

## Rendering Issues

### Code Block Highlighting
**Problem:** Code blocks not highlighted
**Solution:** 
1. Check language name is correct
2. Install pygments: `pip install pygments`
3. Use supported language identifiers

### Broken Images
**Problem:** Images not displaying in output
**Solution:**
1. Use relative paths from markdown file location
2. Check image file exists
3. For PDF: use absolute paths or base64 encoding

### CSS Not Applied
**Problem:** Custom CSS not working
**Solution:**
1. Verify CSS file path is correct
2. Check CSS syntax is valid
3. Use `!important` for overriding default styles
4. Clear browser cache if testing HTML

## PDF Generation Issues

### WeasyPrint Errors
**Problem:** PDF generation fails with errors
**Solution:**

```bash
# On macOS
brew install weasyprint

# On Ubuntu/Debian  
sudo apt-get install weasyprint

# Via pip (may require system dependencies)
pip install weasyprint
```

### Font Issues in PDF
**Problem:** Fonts not rendering correctly
**Solution:**
1. Use web-safe fonts or system fonts
2. Include font files in CSS:
```css
@font-face {
    font-family: 'CustomFont';
    src: url('path/to/font.woff2') format('woff2');
}
```

### Large File Processing
**Problem:** Out of memory errors with large files
**Solution:**
1. Split large files into smaller sections
2. Use batch processing
3. Increase system memory allocation

## Live Preview Issues

### Port Already in Use
**Problem:** "Address already in use" error
**Solution:**
```bash
# Use different port
python scripts/preview_server.py input.md --port 8001

# Or find and kill process using port
lsof -ti:8000 | xargs kill -9
```

### File Watching Not Working
**Problem:** Changes not detected automatically
**Solution:**
1. Install watchdog: `pip install watchdog`
2. Check file permissions
3. Try manual refresh if file system events are blocked

### Browser Not Opening
**Problem:** Preview URL doesn't open automatically
**Solution:**
1. Manually navigate to printed URL
2. Check default browser settings
3. Use `--no-browser` flag if needed (feature to add)

## Content Issues

### Special Characters
**Problem:** Unicode or special characters not displaying
**Solution:**
1. Ensure input file is UTF-8 encoded
2. Add charset meta tag (already included in templates)
3. Check terminal/editor encoding settings

### Markdown Syntax Errors
**Problem:** Content not rendering as expected
**Solution:**
1. Validate markdown syntax
2. Check for proper escaping of special characters
3. Use fenced code blocks with language specification
4. Ensure proper heading hierarchy

### Table Formatting
**Problem:** Tables not displaying correctly
**Solution:**
1. Check table syntax (pipes, alignment)
2. Ensure table extension is enabled (included by default)
3. Use HTML tables for complex layouts if needed

## Performance Issues

### Slow Rendering
**Problem:** Large files take long time to process
**Solution:**
1. Profile performance with timing
2. Disable unnecessary markdown extensions
3. Use simpler themes for faster processing
4. Consider chunking large documents

### Memory Usage
**Problem:** High memory consumption
**Solution:**
1. Process files individually instead of batch
2. Clear temporary files regularly
3. Use streaming processing for very large files

## Platform-Specific Issues

### Windows Path Issues
**Problem:** File paths not working on Windows
**Solution:**
1. Use forward slashes or pathlib
2. Check for proper path escaping
3. Use absolute paths if relative paths fail

### macOS Gatekeeper
**Problem:** "Unidentified developer" warnings
**Solution:**
```bash
# Allow execution
xattr -r -d com.apple.quarantine scripts/
```

### Linux Font Rendering
**Problem:** Fonts not available for PDF generation
**Solution:**
```bash
# Install additional fonts
sudo apt-get install fonts-liberation fonts-dejavu-core
```

## Getting Help

If issues persist:
1. Check the markdown and CSS syntax
2. Test with minimal examples
3. Review error messages carefully
4. Check file permissions and paths
5. Verify all dependencies are installed