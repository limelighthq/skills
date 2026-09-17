from __future__ import annotations

import hashlib
import importlib.util
import json
import os
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path
from unittest import mock

from PIL import Image

SKILL_DIR = Path(__file__).resolve().parent
RENDERER_PATH = SKILL_DIR / "scripts" / "annotate_screenshot.py"


def load_renderer():
    spec = importlib.util.spec_from_file_location("annotate_screenshot", RENDERER_PATH)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Unable to load {RENDERER_PATH}")
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    return module


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


class AnnotateScreenshotTests(unittest.TestCase):
    def setUp(self) -> None:
        self.tempdir = tempfile.TemporaryDirectory()
        self.root = Path(self.tempdir.name)
        self.input = self.root / "source.png"
        image = Image.new("RGBA", (320, 220), "#F5F7FA")
        for x in range(40, 281):
            for y in range(70, 171):
                image.putpixel((x, y), (214, 222, 232, 255))
        image.save(self.input)
        self.input_digest = digest(self.input)

    def tearDown(self) -> None:
        self.tempdir.cleanup()

    def write_spec(self, name: str, data: dict) -> Path:
        path = self.root / name
        path.write_text(json.dumps(data), encoding="utf-8")
        return path

    def valid_manifest(self) -> dict:
        return {
            "input": self.input.name,
            "output": "result.png",
            "style": "overlay",
            "summary": "Visible proof",
            "annotations": [{"label": "1", "text": "", "rect": [70, 105, 170, 42]}],
        }

    def test_overlay_preserves_dimensions_source_and_uncovered_pixels(self) -> None:
        renderer = load_renderer()
        output = self.root / "overlay.png"
        spec = self.write_spec(
            "overlay.json",
            {
                "input": self.input.name,
                "output": output.name,
                "style": "overlay",
                "accent": "#2563EB",
                "summary": "One canonical Discovered status",
                "annotations": [
                    {"label": "1", "text": "", "rect": [70, 105, 170, 42]}
                ],
            },
        )

        result = renderer.render_manifest(spec)

        self.assertEqual((result.width, result.height, result.header_height), (320, 220, 0))
        with Image.open(output) as rendered:
            self.assertEqual(rendered.size, (320, 220))
            self.assertEqual(rendered.getpixel((310, 210)), (245, 247, 250, 255))
        self.assertEqual(digest(self.input), self.input_digest)

    def test_framed_adds_header_and_uses_source_coordinates(self) -> None:
        renderer = load_renderer()
        output = self.root / "framed.png"
        spec = self.write_spec(
            "framed.json",
            {
                "input": self.input.name,
                "output": output.name,
                "style": "framed",
                "accent": "#0B8F65",
                "title": "ENG-3371 · Singleton campaign flow",
                "summary": "Direct Ivy brief — no picker.",
                "annotations": [
                    {"label": "1", "text": "Ivy's first response", "rect": [40, 70, 90, 40]},
                ],
            },
        )

        result = renderer.render_manifest(spec)
        self.assertEqual(result.width, 320)
        self.assertGreater(result.header_height, 0)
        self.assertEqual(result.height, 220 + result.header_height)
        with Image.open(output) as rendered:
            self.assertEqual(
                rendered.getpixel((310, result.header_height + 210)),
                (245, 247, 250, 255),
            )
        self.assertEqual(digest(self.input), self.input_digest)

    def test_identical_manifest_renders_deterministic_png_bytes(self) -> None:
        renderer = load_renderer()
        first = self.root / "first.png"
        second = self.root / "second.png"
        manifest = {
            "input": self.input.name,
            "style": "overlay",
            "accent": "#2563EB",
            "summary": "Stable proof",
            "annotations": [{"label": "1", "text": "", "rect": [70, 105, 170, 42]}],
        }
        first_spec = self.write_spec("first.json", {**manifest, "output": first.name})
        second_spec = self.write_spec("second.json", {**manifest, "output": second.name})

        renderer.render_manifest(first_spec)
        renderer.render_manifest(second_spec)

        self.assertEqual(digest(first), digest(second))

    def test_default_and_custom_accents_draw_the_expected_outline_pixels(self) -> None:
        renderer = load_renderer()
        rect = [100, 120, 100, 40]
        for name, accent, expected in (
            ("default", None, (37, 99, 235, 255)),
            ("custom", "#0B8F65", (11, 143, 101, 255)),
        ):
            with self.subTest(name=name):
                output = self.root / f"{name}.png"
                manifest = self.valid_manifest() | {
                    "output": output.name,
                    "annotations": [{"label": "1", "text": "", "rect": rect}],
                }
                if accent is not None:
                    manifest["accent"] = accent
                renderer.render_manifest(self.write_spec(f"{name}.json", manifest))
                with Image.open(output) as rendered:
                    self.assertEqual(rendered.getpixel((150, 120)), expected)

    def test_unicode_punctuation_in_annotation_label_renders(self) -> None:
        renderer = load_renderer()
        output = self.root / "unicode-label.png"
        manifest = self.valid_manifest() | {
            "output": output.name,
            "annotations": [{"label": "1·", "text": "", "rect": [100, 120, 100, 40]}],
        }

        renderer.render_manifest(self.write_spec("unicode-label.json", manifest))

        self.assertTrue(output.is_file())

    def test_missing_input_file_reports_a_field_specific_error(self) -> None:
        renderer = load_renderer()
        manifest = self.valid_manifest() | {"input": "missing.png"}

        with self.assertRaisesRegex(renderer.SpecError, "input does not exist"):
            renderer.render_manifest(self.write_spec("missing-input.json", manifest))

    def test_framed_outline_is_offset_by_the_actual_header_height(self) -> None:
        renderer = load_renderer()
        output = self.root / "framed-offset.png"
        rect = [100, 120, 100, 40]
        manifest = self.valid_manifest() | {
            "output": output.name,
            "style": "framed",
            "accent": "#0B8F65",
            "title": "Proof title",
            "annotations": [{"label": "1", "text": "Visible proof", "rect": rect}],
        }

        result = renderer.render_manifest(self.write_spec("framed-offset.json", manifest))

        with Image.open(output) as rendered:
            self.assertEqual(
                rendered.getpixel((150, result.header_height + 120)),
                (11, 143, 101, 255),
            )

    def test_cli_reports_python_and_original_error_when_pillow_is_unavailable(self) -> None:
        result = subprocess.run(
            [sys.executable, "-S", str(RENDERER_PATH), "--help"],
            capture_output=True,
            text=True,
            check=False,
        )

        self.assertNotEqual(result.returncode, 0)
        self.assertIn(sys.executable, result.stderr)
        self.assertIn("No module named 'PIL'", result.stderr)

    def test_rejects_invalid_manifest_fields(self) -> None:
        renderer = load_renderer()
        cases = {
            "unsupported style": ({"style": "poster"}, "style"),
            "invalid accent": ({"accent": "blue"}, "accent"),
            "non-png input": ({"input": "source.jpg"}, "input"),
            "non-png output": ({"output": "result.jpg"}, "output"),
            "empty summary": ({"summary": ""}, "summary"),
            "no annotations": ({"annotations": []}, "annotations"),
            "too many annotations": (
                {
                    "annotations": [
                        {"label": str(index), "text": "", "rect": [10 * index, 10, 8, 8]}
                        for index in range(1, 5)
                    ]
                },
                "annotations",
            ),
            "duplicate labels": (
                {
                    "annotations": [
                        {"label": "1", "text": "", "rect": [10, 10, 20, 20]},
                        {"label": "1", "text": "", "rect": [50, 10, 20, 20]},
                    ]
                },
                "label",
            ),
            "zero-sized rectangle": (
                {"annotations": [{"label": "1", "text": "", "rect": [10, 10, 0, 20]}]},
                "rect",
            ),
            "out-of-bounds rectangle": (
                {"annotations": [{"label": "1", "text": "", "rect": [300, 200, 40, 40]}]},
                "rect",
            ),
        }
        for name, (changes, field) in cases.items():
            with self.subTest(name=name):
                spec = self.write_spec(f"{name}.json", self.valid_manifest() | changes)
                with self.assertRaisesRegex(renderer.SpecError, field):
                    renderer.render_manifest(spec)

    def test_framed_requires_title_and_annotation_text(self) -> None:
        renderer = load_renderer()
        data = self.valid_manifest() | {"style": "framed", "title": ""}
        spec = self.write_spec("missing-title.json", data)
        with self.assertRaisesRegex(renderer.SpecError, "title"):
            renderer.render_manifest(spec)

        data = self.valid_manifest() | {
            "style": "framed",
            "title": "A title",
            "annotations": [{"label": "1", "text": "", "rect": [70, 105, 170, 42]}],
        }
        spec = self.write_spec("missing-annotation-text.json", data)
        with self.assertRaisesRegex(renderer.SpecError, r"annotations\[0\]\.text"):
            renderer.render_manifest(spec)

    def test_input_and_output_must_differ(self) -> None:
        renderer = load_renderer()
        data = self.valid_manifest() | {"output": self.input.name}
        spec = self.write_spec("collision.json", data)
        with self.assertRaisesRegex(renderer.SpecError, "different"):
            renderer.render_manifest(spec)
        self.assertEqual(digest(self.input), self.input_digest)

    def test_validation_failure_preserves_existing_output(self) -> None:
        renderer = load_renderer()
        output = self.root / "result.png"
        output.write_bytes(b"existing")
        data = self.valid_manifest() | {"style": "invalid"}
        spec = self.write_spec("invalid.json", data)
        with self.assertRaises(renderer.SpecError):
            renderer.render_manifest(spec)
        self.assertEqual(output.read_bytes(), b"existing")

    def test_failed_replace_preserves_existing_output_and_cleans_temporary_file(self) -> None:
        renderer = load_renderer()
        output = self.root / "result.png"
        output.write_bytes(b"existing")
        temporary = output.with_name(f".{output.name}.{os.getpid()}.tmp")
        spec = self.write_spec("replace-failure.json", self.valid_manifest())

        with mock.patch("os.replace", side_effect=OSError("replace failed")):
            with self.assertRaisesRegex(OSError, "replace failed"):
                renderer.render_manifest(spec)

        self.assertEqual(output.read_bytes(), b"existing")
        self.assertFalse(temporary.exists())


if __name__ == "__main__":
    unittest.main()
