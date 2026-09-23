"""Exercise the shipped renderers from a workspace unrelated to their install path.

Run with a Python environment containing md-render's requirements and PDF/preview extras.
"""
import os
import importlib.util
from pathlib import Path
import socket
import subprocess
import sys
import tempfile
import time
import unittest
from urllib.error import URLError
from urllib.request import urlopen

SCRIPTS = Path(__file__).resolve().parents[1] / 'plugins/company/skills/md-render/scripts'


class RenderScriptsTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix='render test ')
        self.addCleanup(self.temp.cleanup)
        self.cwd = Path(self.temp.name)
        self.source = self.cwd / 'source notes.md'
        self.source.write_text('# Original title\n\nA useful paragraph.\n', encoding='utf-8')

    def run_script(self, script, *args, env=None):
        return subprocess.run([sys.executable, str(SCRIPTS / script), *map(str, args)],
                              cwd=self.cwd, env=env, capture_output=True, text=True, timeout=30)

    def test_html_renders_with_space_paths_and_custom_css_from_another_directory(self):
        css = self.cwd / 'custom theme.css'
        css.write_text('h1 { color: rgb(1, 2, 3); }', encoding='utf-8')
        output = self.cwd / 'rendered notes.html'
        result = self.run_script('md_to_html.py', self.source, output, '--css', css)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        html = output.read_text(encoding='utf-8')
        self.assertIn('Original title</h1>', html)
        self.assertIn('color: rgb(1, 2, 3)', html)

    @unittest.skipUnless(importlib.util.find_spec('weasyprint'), 'PDF extra not installed')
    def test_pdf_uses_the_selected_python_environment_without_a_cli_on_path(self):
        output = self.cwd / 'rendered notes.pdf'
        result = self.run_script('md_to_pdf.py', self.source, output,
                                 env={**os.environ, 'PATH': str(self.cwd)})
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertTrue(output.read_bytes().startswith(b'%PDF-'))

    def test_preview_updates_relative_input_without_opening_a_browser(self):
        with socket.socket() as reservation:
            reservation.bind(('127.0.0.1', 0))
            port = reservation.getsockname()[1]
        log = (self.cwd / 'preview.log').open('w+', encoding='utf-8')
        self.addCleanup(log.close)
        process = subprocess.Popen(
            [sys.executable, str(SCRIPTS / 'preview_server.py'), self.source.name,
             '--port', str(port), '--no-browser'], cwd=self.cwd,
            stdout=log, stderr=subprocess.STDOUT,
        )
        def cleanup():
            if process.poll() is None:
                process.terminate()
            process.wait(timeout=10)
        self.addCleanup(cleanup)
        url = f'http://127.0.0.1:{port}/source%20notes.html'

        def wait_for(text):
            deadline = time.monotonic() + 10
            while time.monotonic() < deadline:
                if process.poll() is not None:
                    log.flush()
                    log.seek(0)
                    self.fail(log.read())
                try:
                    with urlopen(url, timeout=1) as response:
                        if text in response.read().decode('utf-8'):
                            return
                except (URLError, TimeoutError):
                    pass
                time.sleep(0.1)
            self.fail(f'Preview never served {text!r}')

        wait_for('Original title</h1>')
        self.source.write_text('# Updated title\n', encoding='utf-8')
        wait_for('Updated title</h1>')


if __name__ == '__main__':
    unittest.main()
