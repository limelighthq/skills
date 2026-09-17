# Annotation manifest reference

Use one JSON object per screenshot. Authors always express rectangles against the raw source PNG.

## Fields

| Field | Required | Rules |
| --- | --- | --- |
| `input` | Yes | Relative or absolute `.png` path for the raw screenshot. |
| `output` | Yes | Relative or absolute `.png` path for the annotated image; must differ from `input`. |
| `style` | Yes | `overlay` or `framed`. |
| `summary` | Yes | Non-empty one-sentence proof statement. |
| `annotations` | Yes | Array of 1–3 annotation objects. |
| `accent` | No | `#RRGGBB`; defaults to `#2563EB`. |
| `title` | `framed` only | Non-empty title required by `framed`; optional for `overlay`. |

Each annotation requires a unique non-empty string `label`, a string `text`, and `rect` as `[x, y, width, height]`. Coordinates are integer source-pixel values. The rectangle must have positive width and height and remain inside the raw image. For `overlay`, annotation text may be empty. For `framed`, each legend text must be non-empty.

`overlay` preserves the source dimensions and adds a caption plus outlines. `framed` adds a white header with title, summary, and a numbered legend; the screenshot pixels remain unchanged below that header. The generated header offset is automatic—do not offset manifest rectangles yourself.

Use stable neighboring filenames:

```text
<scope>-<state>-raw.png
<scope>-<state>-spec.json
<scope>-<state>-annotated.png
```

## Singleton campaign example

```json
{
  "input": "campaign-flow-raw.png",
  "output": "campaign-flow-annotated.png",
  "style": "framed",
  "accent": "#0B8F65",
  "title": "ENG-3371 · Singleton campaign flow",
  "summary": "The sole campaign is resolved inside Ivy's first response.",
  "annotations": [
    {
      "label": "1",
      "text": "Only eligible campaign",
      "rect": [17, 225, 176, 48]
    },
    {
      "label": "2",
      "text": "Single user request",
      "rect": [1015, 167, 177, 56]
    },
    {
      "label": "3",
      "text": "Direct Ivy brief — no picker",
      "rect": [607, 342, 515, 45]
    }
  ]
}
```

## Render

```bash
python3 <runtime-skill-path>/scripts/annotate_screenshot.py --spec <scope>-<state>-spec.json
```

On success the renderer prints a concise line such as:

```text
Rendered /absolute/path/campaign-flow-annotated.png (1440x1032, style=framed)
```

Validation errors identify the invalid field before output changes. Examples: `style must be overlay or framed`; `accent must be a #RRGGBB color`; `annotations must contain between 1 and 3 items`; `annotations[1].label must be unique`; and `annotations[0].rect must stay within the 1440x900 source image`.
