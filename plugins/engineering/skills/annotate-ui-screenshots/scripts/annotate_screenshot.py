from __future__ import annotations

import argparse
import json
import os
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Any

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError as error:
    raise SystemExit(f"Pillow is required by {sys.executable}: {error}") from error

DEFAULT_ACCENT = "#2563EB"
CAPTION_COLOR = "#111827"
WHITE = (255, 255, 255)
TEXT = (17, 24, 39)


@dataclass(frozen=True)
class Annotation:
    label: str
    text: str
    rect: tuple[int, int, int, int]


@dataclass(frozen=True)
class RenderSpec:
    input_path: Path
    output_path: Path
    style: str
    accent: tuple[int, int, int]
    title: str | None
    summary: str
    annotations: tuple[Annotation, ...]


@dataclass(frozen=True)
class RenderResult:
    output_path: Path
    width: int
    height: int
    header_height: int


class SpecError(ValueError):
    pass


def _parse_color(value: str) -> tuple[int, int, int]:
    if not isinstance(value, str) or len(value) != 7 or not value.startswith("#"):
        raise SpecError("accent must be a #RRGGBB color")
    try:
        return (
            int(value[1:3], 16),
            int(value[3:5], 16),
            int(value[5:7], 16),
        )
    except ValueError as error:
        raise SpecError("accent must be a #RRGGBB color") from error


def _load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    del bold
    for path in (
        "/System/Library/Fonts/SFNS.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ):
        try:
            return ImageFont.truetype(path, size=size)
        except OSError:
            continue
    return ImageFont.load_default()


def _wrap_text(draw: ImageDraw.ImageDraw, text: str, font, max_width: int) -> list[str]:
    if max_width <= 0:
        raise SpecError("image is too narrow for text")
    words = text.split()
    if not words:
        return [""]
    lines: list[str] = []
    current = ""
    for word in words:
        candidate = word if not current else f"{current} {word}"
        if current and draw.textbbox((0, 0), candidate, font=font)[2] > max_width:
            lines.append(current)
            current = word
        else:
            current = candidate
    if current:
        lines.append(current)
    return lines


def _text_height(draw: ImageDraw.ImageDraw, text: str, font) -> int:
    bbox = draw.textbbox((0, 0), text or "Ag", font=font)
    return bbox[3] - bbox[1]


def _draw_box(draw: ImageDraw.ImageDraw, annotation: Annotation, accent, y_offset: int) -> None:
    x, y, width, height = annotation.rect
    top = y + y_offset
    draw.rounded_rectangle(
        (x, top, x + width, top + height), radius=8, outline=accent, width=4
    )
    badge_radius = 14
    badge_center = (x, top)
    draw.ellipse(
        (
            badge_center[0] - badge_radius,
            badge_center[1] - badge_radius,
            badge_center[0] + badge_radius,
            badge_center[1] + badge_radius,
        ),
        fill=accent,
    )
    font = _load_font(14, bold=True)
    label_box = draw.textbbox((0, 0), annotation.label, font=font)
    draw.text(
        (
            badge_center[0] - (label_box[2] - label_box[0]) / 2,
            badge_center[1] - (label_box[3] - label_box[1]) / 2 - label_box[1],
        ),
        annotation.label,
        fill=WHITE,
        font=font,
    )


def _draw_overlay(source: Image.Image, spec: RenderSpec) -> tuple[Image.Image, int]:
    rendered = source.copy()
    draw = ImageDraw.Draw(rendered)
    font = _load_font(16)
    caption_max_width = source.width - 48
    padding = 12
    lines = _wrap_text(draw, spec.summary, font, caption_max_width - padding * 2)
    line_height = _text_height(draw, "Ag", font)
    text_width = max(draw.textbbox((0, 0), line, font=font)[2] for line in lines)
    caption_width = min(text_width + padding * 2, caption_max_width)
    caption_height = line_height * len(lines) + padding * 2
    draw.rounded_rectangle(
        (24, 24, 24 + caption_width, 24 + caption_height),
        radius=8,
        fill=CAPTION_COLOR,
    )
    for index, line in enumerate(lines):
        draw.text((36, 24 + padding + index * line_height), line, fill=WHITE, font=font)
    for annotation in spec.annotations:
        _draw_box(draw, annotation, spec.accent, 0)
    return rendered, 0


def _draw_framed(source: Image.Image, spec: RenderSpec) -> tuple[Image.Image, int]:
    title_font = _load_font(20, bold=True)
    body_font = _load_font(16)
    legend_font = _load_font(14)
    measuring = ImageDraw.Draw(Image.new("RGBA", (source.width, 1), WHITE + (255,)))
    text_width = source.width - 48
    title_lines = _wrap_text(measuring, spec.title or "", title_font, text_width)
    summary_lines = _wrap_text(measuring, spec.summary, body_font, text_width)
    legend_lines = [
        line
        for annotation in spec.annotations
        for line in _wrap_text(measuring, f"{annotation.label}. {annotation.text}", legend_font, text_width)
    ]
    sections = [
        (title_lines, title_font),
        (summary_lines, body_font),
        (legend_lines, legend_font),
    ]
    content_height = sum(
        sum(_text_height(measuring, line, font) for line in lines)
        for lines, font in sections
        if any(lines)
    )
    nonempty_sections = sum(1 for lines, _ in sections if any(lines))
    header_height = content_height + 20 * 2 + max(nonempty_sections - 1, 0) * 8
    rendered = Image.new("RGBA", (source.width, source.height + header_height), WHITE + (255,))
    draw = ImageDraw.Draw(rendered)
    y = 20
    for section_index, (lines, font) in enumerate(sections):
        for line in lines:
            draw.text((24, y), line, fill=TEXT, font=font)
            y += _text_height(draw, line, font)
        if lines and section_index < len(sections) - 1:
            y += 8
    rendered.alpha_composite(source, (0, header_height))
    draw = ImageDraw.Draw(rendered)
    for annotation in spec.annotations:
        _draw_box(draw, annotation, spec.accent, header_height)
    return rendered, header_height


def _path_from_value(value: Any, field: str, manifest_dir: Path) -> Path:
    if not isinstance(value, str) or not value:
        raise SpecError(f"{field} must be a non-empty path string")
    if not value.endswith(".png"):
        raise SpecError(f"{field} must be a .png path")
    candidate = Path(value)
    return candidate.resolve() if candidate.is_absolute() else (manifest_dir / candidate).resolve()


def load_spec(spec_path: Path) -> RenderSpec:
    path = Path(spec_path).resolve()
    if not path.is_file():
        raise SpecError(f"manifest does not exist: {path}")
    try:
        payload = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        raise SpecError(f"unable to read manifest: {path}") from error
    if not isinstance(payload, dict):
        raise SpecError("manifest must be a JSON object")

    manifest_dir = path.parent
    input_path = _path_from_value(payload.get("input"), "input", manifest_dir)
    output_path = _path_from_value(payload.get("output"), "output", manifest_dir)
    if not input_path.exists():
        raise SpecError(f"input does not exist: {input_path}")
    if input_path == output_path:
        raise SpecError("input and output paths must be different")

    style = payload.get("style")
    if style not in {"overlay", "framed"}:
        raise SpecError("style must be overlay or framed")
    accent = _parse_color(payload.get("accent", DEFAULT_ACCENT))

    summary = payload.get("summary")
    if not isinstance(summary, str) or not summary.strip():
        raise SpecError("summary must be a non-empty string")

    title = payload.get("title")
    if style == "framed" and (not isinstance(title, str) or not title.strip()):
        raise SpecError("title must be a non-empty string for framed style")
    if title is not None and not isinstance(title, str):
        raise SpecError("title must be a string when provided")

    annotations_data = payload.get("annotations")
    if not isinstance(annotations_data, list) or not 1 <= len(annotations_data) <= 3:
        raise SpecError("annotations must contain between 1 and 3 items")

    annotation_values: list[tuple[int, str, str, Any]] = []
    labels: set[str] = set()
    for index, item in enumerate(annotations_data):
        if not isinstance(item, dict):
            raise SpecError(f"annotations[{index}] must be an object")
        label, text, rect = item.get("label"), item.get("text"), item.get("rect")
        if not isinstance(label, str) or not label.strip():
            raise SpecError(f"annotations[{index}].label must be a non-empty string")
        if label in labels:
            raise SpecError(f"annotations[{index}].label must be unique")
        labels.add(label)
        if not isinstance(text, str):
            raise SpecError(f"annotations[{index}].text must be a string")
        if style == "framed" and not text.strip():
            raise SpecError(f"annotations[{index}].text must be non-empty for framed style")
        annotation_values.append((index, label, text, rect))

    try:
        with Image.open(input_path) as source:
            source_width, source_height = source.size
    except (OSError, ValueError) as error:
        raise SpecError(f"unable to load input image: {input_path}") from error

    annotations: list[Annotation] = []
    for index, label, text, rect in annotation_values:
        if (
            not isinstance(rect, list)
            or len(rect) != 4
            or any(not isinstance(value, int) or isinstance(value, bool) for value in rect)
        ):
            raise SpecError(f"annotations[{index}].rect must contain four integers")
        x, y, width, height = rect
        if width <= 0 or height <= 0:
            raise SpecError(f"annotations[{index}].rect width and height must be positive")
        if x < 0 or y < 0 or x + width > source_width or y + height > source_height:
            raise SpecError(
                f"annotations[{index}].rect must stay within the "
                f"{source_width}x{source_height} source image"
            )
        annotations.append(Annotation(label=label, text=text, rect=tuple(rect)))

    return RenderSpec(
        input_path=input_path,
        output_path=output_path,
        style=style,
        accent=accent,
        title=title,
        summary=summary,
        annotations=tuple(annotations),
    )


def render_manifest(spec_path: Path) -> RenderResult:
    spec = load_spec(spec_path)
    try:
        with Image.open(spec.input_path) as input_image:
            source = input_image.convert("RGBA")
    except (OSError, ValueError) as error:
        raise SpecError(f"unable to load input image: {spec.input_path}") from error
    try:
        rendered, header_height = (
            _draw_overlay(source, spec)
            if spec.style == "overlay"
            else _draw_framed(source, spec)
        )
    finally:
        source.close()

    spec.output_path.parent.mkdir(parents=True, exist_ok=True)
    temporary = spec.output_path.with_name(f".{spec.output_path.name}.{os.getpid()}.tmp")
    try:
        rendered.save(temporary, format="PNG", optimize=False, compress_level=9)
        os.replace(temporary, spec.output_path)
    finally:
        width, height = rendered.width, rendered.height
        rendered.close()
        if temporary.exists():
            temporary.unlink()
    return RenderResult(
        output_path=spec.output_path,
        width=width,
        height=height,
        header_height=header_height,
    )


def main() -> None:
    parser = argparse.ArgumentParser(description="Render an annotated screenshot manifest")
    parser.add_argument("--spec", required=True, type=Path)
    args = parser.parse_args()
    result = render_manifest(args.spec)
    style = load_spec(args.spec).style
    print(f"Rendered {result.output_path} ({result.width}x{result.height}, style={style})")


if __name__ == "__main__":
    main()
