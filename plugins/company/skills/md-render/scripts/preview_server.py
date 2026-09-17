#!/usr/bin/env python3
"""
Live preview server for Markdown files with hot reload
"""

import argparse
import http.server
import socketserver
import webbrowser
import time
import threading
from pathlib import Path
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from md_to_html import convert_md_to_html
import tempfile
import os

class MarkdownHandler(FileSystemEventHandler):
    def __init__(self, md_file, html_file, theme):
        self.md_file = md_file
        self.html_file = html_file
        self.theme = theme
        self.last_modified = 0
        
    def on_modified(self, event):
        if event.is_directory:
            return
        
        if Path(event.src_path).name == self.md_file.name:
            # Debounce rapid file changes
            current_time = time.time()
            if current_time - self.last_modified < 0.5:
                return
            self.last_modified = current_time
            
            print(f"🔄 Detected change in {self.md_file.name}, regenerating...")
            convert_md_to_html(str(self.md_file), str(self.html_file), self.theme)

class PreviewServer:
    def __init__(self, md_file, port, theme):
        self.md_file = Path(md_file)
        self.port = port
        self.theme = theme
        self.temp_dir = Path(tempfile.mkdtemp())
        self.html_file = self.temp_dir / f"{self.md_file.stem}.html"
        
    def start(self):
        # Initial conversion
        print(f"🚀 Starting preview server for {self.md_file.name}")
        convert_md_to_html(str(self.md_file), str(self.html_file), self.theme)
        
        # Set up file watcher
        event_handler = MarkdownHandler(self.md_file, self.html_file, self.theme)
        observer = Observer()
        observer.schedule(event_handler, str(self.md_file.parent), recursive=False)
        observer.start()
        
        # Start HTTP server
        os.chdir(self.temp_dir)
        
        class QuietHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
            def log_message(self, format, *args):
                pass  # Suppress request logs
                
        with socketserver.TCPServer(("", self.port), QuietHTTPRequestHandler) as httpd:
            url = f"http://localhost:{self.port}/{self.html_file.name}"
            print(f"📖 Preview available at: {url}")
            print(f"👁  Watching {self.md_file.name} for changes...")
            print("🛑 Press Ctrl+C to stop")
            
            # Auto-open browser
            webbrowser.open(url)
            
            try:
                httpd.serve_forever()
            except KeyboardInterrupt:
                print("\n🛑 Stopping preview server...")
                observer.stop()
                observer.join()
                
                # Cleanup
                self.html_file.unlink(missing_ok=True)
                self.temp_dir.rmdir()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Live preview server for Markdown")
    parser.add_argument("input", help="Input markdown file")
    parser.add_argument("--port", type=int, default=8000, help="Server port (default: 8000)")
    parser.add_argument("--theme", choices=['github', 'professional', 'minimal', 'academic'], 
                       default='github', help="CSS theme to apply")
    
    args = parser.parse_args()
    
    if not Path(args.input).exists():
        print(f"Error: Input file '{args.input}' not found")
        sys.exit(1)
    
    try:
        server = PreviewServer(args.input, args.port, args.theme)
        server.start()
    except ImportError as e:
        if "watchdog" in str(e):
            print("Error: watchdog not installed. Install with:")
            print("pip install watchdog")
            sys.exit(1)
        else:
            raise