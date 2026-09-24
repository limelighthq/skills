---
name: sync-design-system
description: "Refreshes the generated copy that a Limelight design system skill carries, from the design system's claude.ai artifact. Use when the product or marketing design system changed in claude.ai, when someone asks to sync, refresh, or update a design system skill, or when a skill's references/source.md shows an old version."
compatibility: Claude Code with the Artifact tool and the claude.ai login that can read the artifacts. Node.js 20+. cwebp or Python Pillow for images over 1 MB.
metadata:
  owner: design
---

# Sync a design system

Each design system skill in `plugins/company/skills/` carries a generated copy of a claude.ai artifact. This skill downloads the artifact and rebuilds that copy with `tools/sync-design-system.mjs`. Only a Claude host with a claude.ai login that can read the artifact can do the download.

| System | Artifact | Skill folder | Title | Root class |
| --- | --- | --- | --- | --- |
| Product | https://claude.ai/artifact/1z8r8nfNgeVQZ7miW2Lhzi | `plugins/company/skills/limelight-product-design-system` | Limelight Product | `lla` |
| Marketing | https://claude.ai/artifact/6bxpAybE1yBvnSpVB2CBTM | `plugins/company/skills/limelight-marketing-design-system` | Limelight Marketing Design System | none |

## Steps

1. Pick the row. If the request does not name a system, ask which one.
2. List the artifact's published files with the Artifact tool (`action: "list"`, `scope: "files"`). Note the version string it prints.
3. Make a new, empty download folder outside the repo, such as `<scratchpad>/design-system-sync/<system>/`. Write the version string to `VERSION` in it. Never reuse an older download: a file removed from the artifact would survive in it.
4. Read every published path under `project/` into the download folder (`action: "read"`, `paths`, `out_dir` set to the download folder). A call takes up to 256 paths. Skip `artifact-type/`, the root `index.html`, and the root `SKILL.md`.
5. Open `project/design-system.json` in the download. Read every asset listed under `assetGroups.<Group>.files` by its `blob` id, one `read` call per asset with `path` set to the id and `out_dir` set to `<download folder>/blobs`. A `paths` call does not accept asset ids.
6. For each file in `blobs/` over 1,048,576 bytes, write a WebP next to it named `<blob id>.webp`: `cwebp -q 90 <file> -o <download folder>/blobs/<blob id>.webp`. Without cwebp, use Pillow: `python3 -c "from PIL import Image; Image.open('<file>').save('<download folder>/blobs/<blob id>.webp', quality=90)"`. If neither is available, stop and say so.
7. From the repo root, run the sync. Add `--root-class <class>` only when the row names one:

       npm run sync:design-system -- --source <download folder> --skill <skill folder> --artifact <artifact> --version "$(cat <download folder>/VERSION)" --title "<title>"

8. Run `npm run validate` and `npm test`. A `link-broken` error in the skill's `SKILL.md` means a README section was renamed. Point the link at the new file in `references/`.
9. Show `git diff --stat -- <skill folder>` and the note in the skill's `references/source.md`. Stop. A person reviews the diff before anything is committed.

## When a step fails

- The sync tool names the file and the fix in its error. Fix the download and run it again. A failed run leaves the previous copy in place.
- An error about an extra README section or a new kind of file means the design system grew. Extend `tools/lib/sync-design-system.mjs` with a test first, as `AGENTS.md` asks.
