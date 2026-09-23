# Troubleshooting

## Missing Python packages

Check imports with the exact Python interpreter that will run the renderer. A package installed by another `pip` or another Python version may not be visible. Install the relevant bundled requirements file into a task-local virtual environment with that environment's Python and `-m pip install -r`.

Use the interpreter to run scripts; executable bits can be lost during installation. Quote absolute script, input, CSS, and output paths. Create the output directory before rendering.

## PDF native libraries

Installing the WeasyPrint Python package alone may not provide its native libraries, including Pango and font libraries. Follow the official [WeasyPrint installation guide](https://doc.courtbouillon.org/weasyprint/stable/first_steps.html#installation) for the current operating system. Surface the actual error if installation is unavailable. HTML output remains available without PDF dependencies.

Use installed fonts or package permitted font assets with the output. A font substitution can change pagination, so visually inspect important PDFs.

## Images or styles missing

HTML image paths are relative to the output HTML location. The PDF wrapper supplies the source document directory as the resource base. Confirm the files and CSS exist and can be read. The local preview does not serve arbitrary source directories; use explicit URLs for resources or render a standalone bundle beside its assets.

## Preview unavailable

Use `--no-browser` on a headless host and open the printed URL with the host's browser or preview tool. If a port is occupied, choose another port instead of killing an unrelated process. The server binds to loopback; remote access needs the host's supported port-forwarding mechanism.

The watcher regenerates the HTML, but the browser needs a refresh. If filesystem events are unavailable, rerun the HTML converter after edits. A host without local servers should use the standalone HTML artifact.

## Unsupported output

See [FORMATS.md](FORMATS.md). Check the shipped script's `--help`; do not assume conversion flags or helper scripts from another tool are present.
