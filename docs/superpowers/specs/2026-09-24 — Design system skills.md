# Design system skills

## Goal

Two skills let any agent build, review, and look up Limelight designs from the company's two design systems. The product skill also covers implementing screens in agent-platform. The skills must work in Claude Code, Codex, and other Agent Skills hosts. The design systems live only in claude.ai, so each skill carries a generated copy. A sync tool rebuilds the copy when a design system changes.

## Decisions

| Decision | Choice | Source |
| --- | --- | --- |
| Plugin | `company`, so every teammate gets both skills without an extra install | Grant, 2026-09-24 |
| Product request types | Build a prototype, implement in agent-platform, review UI, answer lookups | Grant, 2026-09-24 |
| Marketing request types | Build a mock, review, answer lookups. No implement request: the system comes from brand sources, not from code. | Grant, 2026-09-24 |
| Source of truth | claude.ai keeps the originals. The skills hold a copy. | 2026-09-23 |
| Refresh | Claude Code only, because only a Claude host can read the claude.ai artifacts. The sync tool itself runs anywhere. | 2026-09-23 |
| Images over 1 MB | Re-encode as WebP at the same pixel size | This spec |

## Sources

| System | Artifact | Version at writing | Contents |
| --- | --- | --- | --- |
| Limelight Product | https://claude.ai/artifact/1z8r8nfNgeVQZ7miW2Lhzi | `1790215750-ad98` | 100 components, a 775-line README, 488 tokens, 151 type styles, no font files, 4 image groups |
| Limelight Marketing Design System | https://claude.ai/artifact/6bxpAybE1yBvnSpVB2CBTM | `1790186307-1ee8` | 33 components, 2 font files, 5 image groups |

## Files

New:

- `plugins/company/skills/limelight-product-design-system/`
- `plugins/company/skills/limelight-marketing-design-system/`
- `tools/sync-design-system.mjs`, with its logic in `tools/lib/design-system-markdown.mjs`, `tools/lib/design-system-tokens.mjs`, and `tools/lib/sync-design-system.mjs`
- A test file for each of those three modules. The tests build their fixture in a temporary folder, so no large test files enter the repo.
- `.claude/skills/sync-design-system/SKILL.md`

Changed:

- `plugins/company/README.md` and the root `README.md` table: two new rows.
- `plugins/company/plugin.json` and `plugins/company/.claude-plugin/plugin.json`: the description names the design systems. Both files stay identical apart from `$schema`.
- `docs/portability.md`: a capability row for each skill.
- `evals/discovery.json` and `evals/README.md`: discovery requests and behavior scenarios.
- `package.json`: a `sync:design-system` script.

## Skill layout

Both skills use the same layout:

```text
limelight-product-design-system/
  SKILL.md                 written by hand
  references/              generated
    source.md              artifact link, version, last change
    overview.md            README text before the first "##" heading
    <section>.md           one file per "##" section of the README
    components/<Name>.md   one guide per component
    previews/<Name>.html   one usage example per component
    images/<Group>.md      the usage notes of each image group
    index.d.ts             component props
    tokens.json            every token, with its usage note
  assets/kit/              generated
    index.html             starter page
    tokens.css             CSS custom properties built from tokens.json
    bundle.js, bundle.css  the component library
    images/                every image asset
    fonts/                 font files, when the system has any
```

The sync tool owns `references/` and `assets/kit/`. It deletes and rewrites both folders on every run. `SKILL.md` is the only file a person edits.

## SKILL.md

Frontmatter uses spec fields only:

- `name` and `description`.
- `compatibility`: file access to read the copy. Prototypes also need a browser and network access to load React 18 from jsDelivr. The marketing skill also names Google Fonts.
- `metadata`: `owner: design` and `source: <artifact link>`.

Draft descriptions:

- Product: "Limelight Product design system for screens inside the Limelight app (the V2 UI from Proposal D): tokens, 100 React components, copy rules and accessibility fixes. Use when building a mock or prototype of an app screen, implementing product UI in agent-platform, reviewing app screens or a PR against the product design, or looking up a product token, component or copy rule. Not for the marketing website."
- Marketing: "Limelight marketing design system for limelighthq.com and other brand materials: tokens, fonts, page components, logos, agent portraits, agent marks and icons. Use when building a mock of a website page or section, reviewing a page or brand asset against the Limelight brand, or looking up a brand color, gradient, type style, component or asset. Not for screens inside the Limelight app."

The body has these parts, in this order:

1. **What this is.** A generated copy. `references/source.md` gives its version. Never edit generated files.
2. **Which rule wins.** Product: first the target repo's own instructions, then the D exceptions, then the rest of the system. Marketing: the system's own rules. When the work and the system disagree, the agent reports the conflict and does not pick one silently.
3. **Find things.** A table that maps a question to a file.
4. **Lookup.** Read the matching file. Answer with the token or component name and the file that states it. Never guess a value.
5. **Build.** Copy `assets/kit/` to the output folder and edit its `index.html`. Use bundle components and token variables, never lookalikes or raw values. Follow the system's copy rules. Done means one page that opens in a browser. The agent reports what it did not view.
6. **Implement (product only).** Follow the target repo's instructions and existing components. Use the system's token names and values. Never put `bundle.js` in product code. Report conflicts with the codebase.
7. **Review.** Check the work against the system's rules. Each finding gives the location, the rule, the file that states the rule, and a fix. The agent reports no findings for work it could not see.
8. **Stop and ask** when a needed component does not exist, when the work to review or change is not available, or when the order in "Which rule wins" does not settle a conflict.

The body names capabilities, never host tool names. It stays under 150 lines.

| | Product | Marketing |
| --- | --- | --- |
| Name | `limelight-product-design-system` | `limelight-marketing-design-system` |
| Request types | build, implement, review, lookup | build, review, lookup |
| Target code | agent-platform | none: built from brand sources |
| Exception list | `references/d-exceptions.md` | none |
| Kit network needs | React 18 from jsDelivr | React 18 from jsDelivr, Geist Mono from Google Fonts |
| Bundled fonts | none (system faces) | Geist, Host Grotesk |
| Not for | the marketing website | screens inside the app |

## Sync tool

```text
node tools/sync-design-system.mjs --source <download dir> --skill <skill dir> --artifact <url> --version <id>
```

Input: `<download dir>/project/` holds the published files, as the Artifact tool saves them. `<download dir>/blobs/<id>.<ext>` holds each image read by its blob id.

Steps:

1. Read `project/design-system.json`. Map each asset record's blob id to its file name.
2. Copy each image from `blobs/` to `assets/kit/images/<Group>/<name>`. For an image over 1 MB, use `blobs/<id>.webp` and name it `<base>.webp`. If that file is missing, stop with an error that names the image and the fix.
3. Copy `bundle.js` and `bundle.css`. Rewrite each `/_blob/<id>` to `images/<Group>/<name>`. Stop on an id with no asset record.
4. Build `tokens.css` from `tokens.json` (rules below).
5. Copy the font files that `tokens.json` lists to `assets/kit/fonts/`.
6. Write `assets/kit/index.html`. It loads React and ReactDOM 18.3.1 from jsDelivr, then `tokens.css`, `bundle.css`, and `bundle.js`. It sets `data-theme` to the first theme and holds one empty `#root` element. An optional `--root-class` flag puts the system's base class on `#root`. The product passes `lla`, which sets D's base font, ink, and focus ring. The marketing bundle has no base class.
7. Split `project/README.md` at each `##` heading outside code fences. Text before the first heading goes to `overview.md`. Each section goes to `<slug>.md`. Two sections with the same slug stop the run.
8. Copy each component guide to `references/components/<Name>.md`. Rewrite relative links between guides. Stop on any other relative link.
9. Copy each preview to `references/previews/<Name>.html`. Rewrite blob URLs to `images/<Group>/<name>`, so a preview works when pasted into the kit's page.
10. Copy `index.d.ts` and `tokens.json`.
11. Add a `## Contents` heading to each generated Markdown file over 100 lines. It lists the file's `###` headings. A file without them gets one line that says so. The validator warns on long reference files without this heading.
12. Write `source.md`: the artifact link, the version, and the last change's date, author, and note.

The tool never reads `artifact-type/`, the root `index.html`, or the root `SKILL.md`. That `SKILL.md` belongs to the claude.ai page type, and copying it would nest a skill inside a skill. The same input always gives byte-identical output.

`tokens.css` follows the compile rules of the Design System page type:

- The first theme gets a `:root, [data-theme="<id>"]` block with every color and shadow token. Each further theme gets a `[data-theme="<id>"]` block.
- An alias value `{name}` becomes `var(--name)`.
- A second `:root` block holds every other token family and one `--font-<key>` per font family.
- Each type style becomes one class with its font properties.
- Each font file gets one `@font-face` rule that points at `fonts/<file>`.
- A `.` in a name is escaped, as in `--space-1\.5`.

The product bundle uses 446 CSS variables. `tokens.json` and the bundle define 445 of them. The bundle sets the last one, `--lla-kanban-col`, at runtime.

## Maintenance skill

`.claude/skills/sync-design-system/` works only in Claude Code, like `publish-skills-to-notion`. The install check already keeps `.claude/skills/` out of teammate installs.

1. Pick the system from a table of artifact links, skill folders, and root classes.
2. List the artifact's files and note the version.
3. Read every file under `project/` into a scratch folder.
4. Read every asset in `design-system.json` by its blob id into `blobs/`.
5. Re-encode any image over 1 MB as WebP at quality 90, with `cwebp` or Pillow. Stop if neither is available.
6. Run the sync tool.
7. Run `npm run validate` and `npm test`. A renamed README section breaks a link in `SKILL.md`, and the validator reports it. Fix the link.
8. Show the diff summary and the artifact's last change note. Stop for a person to review before any commit.

## Portability

| Check | Claude Code | Codex |
| --- | --- | --- |
| Format | Agent Skills fields only, enforced by `npm run validate` | same files |
| Install | `npm run test:install` | `npm run test:install` |
| Discovery | fresh sessions | fresh `codex exec` sessions |
| Behavior | subagents at the Sonnet tier | `codex exec` |
| Refresh | maintenance skill | not possible: no claude.ai access |

`npm run test:install` installs every shared skill into temporary Codex, Claude Code, Cursor, and OpenCode projects and compares every file. Teammates never need the refresh, so the Claude-only limit does not reach them.

Rows for `docs/portability.md`:

| Skill | What the full workflow needs | When a capability is missing |
| --- | --- | --- |
| `limelight-product-design-system` | File access to the copy. A browser and network access for prototypes. Read access to the target code for implement and review. | Without a browser, deliver the page and say nobody viewed it. Without network, say React could not load. Without code access, ask for it. Never report a clean review of unread code. |
| `limelight-marketing-design-system` | File access to the copy. A browser, network access, and Google Fonts for mocks. The page or asset under review. | Without a browser, deliver the page and say nobody viewed it. Without Google Fonts, Geist Mono text falls back to a system monospace font. Without the item under review, ask for it. |

## Testing

1. **Sync tool, test first.** Tests cover the README split, the `## Contents` headings, blob URL rewriting, an unknown blob id, an oversized image with and without its WebP, `tokens.css` output (themes, aliases, other families, type classes, `@font-face`), stale file removal, `SKILL.md` left untouched, `source.md`, the starter page, component link rewriting, and byte-identical reruns.
2. **RED.** Run the behavior scenarios below with the generated copy but no `SKILL.md`. Record each failure.
3. **Write `SKILL.md`** to fix the recorded failures.
4. **GREEN.** Run the same scenarios with `SKILL.md`, in Claude and in Codex. Each run uses a disposable copy with no publishing tools.
5. **Discovery.** Three requests that should trigger each skill and one that should not, in `evals/discovery.json`. Each skill's non-matching request comes from the other system. Fresh sessions in both hosts.
6. **Repo checks.** `npm run validate` with no new warnings, `npm test`, and `npm run test:install`.

Behavior scenarios:

| Skill | Scenario | Expected behavior |
| --- | --- | --- |
| product | "What token do I use for a warning badge?" | Names `warning-fill` and `warning-text` and the file that states them. |
| product | Build the Approvals page with two pending approvals. No browser. | A page in a kit copy that uses `AppShell`, `ApprovalRow`, and token variables. The agent says nobody viewed it. |
| product | Review a supplied snippet with seeded violations | Finds each seeded violation, cites its rule file, and invents none. |
| product | Implement `CampaignCard` in agent-platform, with the repo's instructions supplied | Follows the repo's instructions, maps values to tokens, keeps `bundle.js` out, and reports conflicts. |
| marketing | "Which type style do hero headings use?" | Names `heading-display` and Host Grotesk. |
| marketing | Build a pricing section with a billing toggle. No browser. | A page in a kit copy that uses `PricingCard` and `BillingToggle`, with sentence-case buttons. The agent says nobody viewed it. |
| marketing | Review a supplied page with seeded violations | Finds each seeded violation, cites its rule file, and invents none. |
| marketing | Review a described LinkedIn graphic with seeded violations, such as the logo on an agent gradient | Finds each seeded violation, cites its rule file, and invents none. |

## Size

| Skill | Text | Fonts | Images | Total |
| --- | --- | --- | --- | --- |
| Product | about 1.2 MB | none | about 3 MB | about 4 MB |
| Marketing | about 0.2 MB | 0.1 MB | about 2.8 MB | about 3 MB |

Each `company` install grows by about 7 MB. That is more than the 5 MB estimate given in chat. The agent portraits are about 3.4 MB of it, because each skill carries its own copy. Two cuts are possible if size matters: leave out the marketing Social covers (0.7 MB), or re-encode every PNG as WebP.

## Out of scope

- Publishing to Notion. Run `publish-skills-to-notion` after the merge.
- Changes to `_design-system.html` in ux-flow-v1 or to `packages/ui` in agent-platform.
- Running the sync in CI. CI cannot read claude.ai.

## Risks

- **The copy falls behind claude.ai.** `source.md` shows the version, and the maintenance skill makes a refresh one request.
- **The two descriptions overlap.** The cross-system discovery requests test the boundary.
- **`bundle.js` is code from the artifact.** It runs only in prototype pages, never in product code. The sync diff shows each change to it.
