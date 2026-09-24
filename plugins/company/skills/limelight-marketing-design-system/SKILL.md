---
name: limelight-marketing-design-system
description: "Limelight marketing design system for limelighthq.com and other brand materials: tokens, fonts, page components, logos, agent portraits, agent marks and icons. Use when building a mock of a website page or section, reviewing a page or brand asset against the Limelight brand, or looking up a brand color, gradient, type style, component or asset. Not for screens inside the Limelight app."
compatibility: Needs file access to read the bundled copy. Mocks also need a browser, and network access to load React 18 from cdn.jsdelivr.net and Geist Mono from fonts.googleapis.com. Reviews need the page or asset under review.
metadata:
  owner: design
  source: https://claude.ai/artifact/6bxpAybE1yBvnSpVB2CBTM
---

# Limelight marketing design system

This skill carries a generated copy of the Limelight marketing design system: the brand's voice, color, type, layout, logo, agent marks, icons, and website components. [references/source.md](references/source.md) names the version. The files under `references/` and `assets/kit/` are regenerated from claude.ai. Never edit them. Report a wrong value instead.

For screens inside the Limelight app, use the limelight-product-design-system skill instead.

Resolve every path below from the folder that holds this file. Start every task at the table under "Find things". It names the file each kind of question needs. Open another file only when the named file points to it. This system's rules decide. When the work and a rule disagree, report it.

## Find things

| Question | File |
| --- | --- |
| The brand idea and values | [overview](references/overview.md) |
| Voice, case, agent names | [content fundamentals](references/content-fundamentals.md) |
| Color, gradients, type, layout, page anatomy, content pages, motion, surfaces, corners, imagery, states, contrast | [visual foundations](references/visual-foundations.md) |
| Logo | [logo](references/logo.md) |
| Agent marks | [agent marks](references/agent-marks-decorative-elements.md) |
| Icons | [iconography](references/iconography.md) |
| Notes on an image group, such as the approved social covers | `references/images/<Group>.md` |
| One component's rules | `references/components/<Name>.md`, one file per component |
| A component's props | `references/index.d.ts` |
| A working call of a component | `references/previews/<Name>.html` |
| A token's value and usage | `references/tokens.json`, searched for `"name": "<token>"` |

## Look something up

1. Read the file the table names.
2. Answer in this form, one line per item: `<token, style, component, or asset>`: `<value>`, from `<file>`. Name the file even when the value seems obvious.
3. If no file states it, say so. Never guess a value.

## Build a mock

1. Copy the whole `assets/kit/` folder to the output location. Keep every file in it: `index.html`, `tokens.css`, `bundle.js`, `bundle.css`, `fonts/`, and `images/`.
2. Write the page into the copy's `index.html`. The components are on `window.Limelight`. Start from the previews of the components you need. For a full page, follow the page anatomy in the visual foundations.
3. Build with the bundle's components. Never replace one with hand-written markup, even when you cannot run or view the page.
4. Style any other markup with the token variables from `tokens.css`. Never write a raw color, size, or shadow.
5. Use the images in the copy's `images/` folder as they are: logos, icons, agent portraits, and marks. Never recolor, crop, or redraw them.
6. Write every string by the content fundamentals.
7. Keep the page's script tags and the font import in `bundle.css` as they are. React and Geist Mono load when a browser opens the page. Building the page needs no network.
8. The mock is done when the copy's `index.html` renders in a browser. If you could not open it in a browser, say that nobody viewed it.

## Review

1. Read or view the page or asset under review. If you cannot, ask for it. Never report a clean review of work you did not see.
2. Check it against the content fundamentals, the visual foundations, the logo rules, the agent marks, the iconography, and the guide of each component it uses. Open only those files.
3. Report each finding as: where it is, the rule it breaks, the file that states the rule, and the fix.
4. Every finding needs a rule that one of those files states. Leave out taste and general advice, even when you think it would help.
5. When the system's wording leaves a case open, say that the rule is unclear instead of calling it a break. A rule that gives examples, such as "big display moments (guide covers)", does not settle work outside those examples. List that work as unclear.

## Stop and ask

- The page needs a component the bundle does not have.
- The page or asset to review is not available.
