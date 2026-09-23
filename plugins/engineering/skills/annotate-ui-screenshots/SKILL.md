---
name: annotate-ui-screenshots
description: "Use when implementing, reviewing, or handing off any user-visible UI change, or when screenshot evidence, annotated proof, visual comparisons, responsive-state proof, approval artifacts, Linear evidence, or PR evidence are needed."
compatibility: Requires Python 3.10 or newer with Pillow and access to image files. New captures also need a browser or screenshot tool; inspection needs image viewing.
metadata:
  version: "1.0.0"
---

# Annotated UI screenshots

## Overview

Treat the raw PNG as the source of truth. Use deterministic overlays only to make visible proof easier to review; do not alter, recreate, or generatively edit the UI.

Use evidence only: never manufacture UI state by mutating production data. If capture tooling is unavailable, report the evidence gap rather than substitute or generate an image. Stop before destructive or out-of-scope actions and explain what cannot be captured safely.

| Choose | Use for |
| --- | --- |
| `overlay` | One visible claim or 1–3 tightly related regions; retain original dimensions. |
| `framed` | A multi-step flow or several regions that need a numbered legend. |

For a single-screen status, filter, or empty-state proof, set `"style": "overlay"` even when two tightly related callouts establish the claim. Reserve `framed` for evidence that must communicate an ordered multi-step flow or a legend that is essential to interpreting several separate regions.

## Workflow

Resolve `SKILL_ROOT` to the directory containing the loaded `SKILL.md`. It is a path you determine from the skill's location, not an environment variable supplied by the host. Resolve the manifest argument to an absolute path in the working project. Inside that manifest, relative `input` and `output` paths resolve from the manifest's own directory. Quote paths, including paths with spaces. Use the available Python interpreter (`python3`, `python`, or `py -3`) after checking its version and that it can import `PIL`. If dependencies are missing, install [requirements.txt](requirements.txt) into a task-local virtual environment when allowed, or report the missing dependency.

1. Verify the exact route, fixture/data state, interaction, and material viewport before capture. Capture each materially different responsive layout only when it proves a distinct claim.
2. Save a lossless raw PNG as `<scope>-<state>-raw.png`; preserve enough surrounding UI to identify the route and state. Check it for secrets, private messages, contact details, and unrelated sensitive data.
3. Choose `overlay` or `framed`; use the smallest evidence set and at most three callouts. Keep labels away from targets and key state.
4. Write `<scope>-<state>-spec.json` and render `<scope>-<state>-annotated.png`:

   ```bash
   python3 "<resolved-skill-root>/scripts/annotate_screenshot.py" \
     --spec "<absolute-project-path>/<scope>-<state>-spec.json"
   ```

5. Visually inspect the rendered PNG: labels must be readable, targets unobscured, dimensions unstretched, state/route understandable, and sensitive data absent. Adjust the manifest and rerender; never patch pixels by hand.
6. Handoff: include an alt label, route/state, material viewport, one-sentence visible result, and any static-image coverage limits.

## Capture adapter

Use the host's available browser, computer-use, or screenshot tool for capture. A supplied raw screenshot can be annotated without capture tooling. If image viewing is unavailable, report that visual inspection is incomplete; do not claim verified evidence. If filesystem or Python execution is unavailable, return the proposed manifest and explain which steps still need an execution-capable host. Store task-local raw/spec/annotated files in a scoped, git-ignored artifact directory in the working repo, never inside the installed skill; do not commit run artifacts by default. Read [the annotation manifest reference](references/annotation-spec.md) before writing a manifest.

## Common mistakes

Do not annotate before verification, overwrite the raw capture, add too many callouts, use generative editing, crop away necessary context, or commit per-run evidence by default.
