---
name: limelight-product-design-system
description: "Limelight Product design system for screens inside the Limelight app (the V2 UI from Proposal D): tokens, 100 React components, copy rules and accessibility fixes. Use when building a mock or prototype of an app screen, implementing product UI in agent-platform, reviewing app screens or a PR against the product design, or looking up a product token, component or copy rule. Not for the marketing website."
compatibility: Needs file access to read the bundled copy. Prototypes also need a browser, and network access to load React 18 from cdn.jsdelivr.net. Implementing and reviewing need read access to the code or screens in question.
metadata:
  owner: design
  source: https://claude.ai/artifact/1z8r8nfNgeVQZ7miW2Lhzi
---

# Limelight Product design system

This skill carries a generated copy of the Limelight Product design system. The system describes the Limelight app as the live Proposal D prototype ("D") renders it. [references/source.md](references/source.md) names the version. The files under `references/` and `assets/kit/` are regenerated from claude.ai. Never edit them. Report a wrong value instead.

Resolve every path below from the folder that holds this file. Start every task at the table under "Find things". It names the file each kind of question needs. The folder holds over 200 files, so open another file only when the named file points to it.

## Which rule wins

1. The target repository's own instructions (its AGENTS.md, CLAUDE.md, or similar), its existing components, and every value its token layer already defines.
2. The D exceptions in [references/d-exceptions.md](references/d-exceptions.md).
3. The rest of this system.

The repository wins even when this system is more specific or more recent. Follow it, then report every conflict: the rule you followed, the rule you set aside, and both values.

## Find things

| Question | File |
| --- | --- |
| What the system covers | [overview](references/overview.md) |
| Copy, case, counts, dates | [content fundamentals](references/content-fundamentals.md) |
| Type, color, layout, corners, motion, states, stacking | [visual foundations](references/visual-foundations.md) |
| Landing, agent panel, resize, checklist | [shell and behaviour](references/shell-and-behaviour.md) |
| Icons | [iconography](references/iconography.md) |
| Logo, agent portraits, images | [logo, portraits and images](references/logo-portraits-and-images.md) and `references/images/<Group>.md` |
| Which component fits | [component index](references/components.md) |
| One component's rules | `references/components/<Name>.md` |
| A component's props | `references/index.d.ts` |
| A working call of a component | `references/previews/<Name>.html` |
| A token's value and usage | `references/tokens.json`, searched for `"name": "<token>"` |
| Where the system departs from D | [D exceptions](references/d-exceptions.md) |
| Contrast pairs | [contrast](references/contrast-wcag-2-2-aa.md) |

## Look something up

1. Read the file the table names.
2. Answer in this form, one line per item: `<token or component>`: `<value>`, from `<file>`. Name the file even when the value seems obvious.
3. If no file states it, say so. Never guess a value.

## Build a screen or prototype

1. Copy the whole `assets/kit/` folder to the output location. Keep every file in it: `index.html`, `tokens.css`, `bundle.js`, `bundle.css`, and `images/`.
2. Write the screen into the copy's `index.html`. The components are on `window.LimelightApp`. Start from the previews of the components you need. The AppShell preview is a complete screen.
3. Build with the bundle's components. Never replace one with hand-written markup, even when you cannot run or view the page.
4. Style any other markup with the token variables from `tokens.css`, such as `var(--surface)`. Never write a raw color, size, or shadow.
5. Write every string by the content fundamentals.
6. Keep the page's script tags as they are. React loads from cdn.jsdelivr.net when a browser opens the page. Building the page needs no network.
7. The prototype is done when the copy's `index.html` renders in a browser. If you could not open it in a browser, say that nobody viewed it.

## Implement in product code

1. Read the target repository's instructions and its existing components before you write code.
2. For each part, read its component guide, its props, and the D exceptions.
3. Style through the repository's own token layer. Never change a value it already defines, even when the system's value differs. A shared token moves every screen that uses it, so report the difference instead.
4. When the repository lacks a token a part needs, add it to the repository's token layer with the system's value. List it in your report as a proposed addition. Never hard-code the value in the component.
5. Never copy `bundle.js`, `bundle.css`, or `tokens.css` into product code. They exist only for prototypes.
6. End with the conflict report from "Which rule wins".

## Review

1. Read the work under review. If you cannot read it, ask for it. Never report a clean review of work you did not read.
2. Check it against the content fundamentals, the visual foundations, the iconography, the D exceptions, and the guide of each component it uses. Open only those files.
3. Report each finding as: where it is, the rule it breaks, the file that states the rule, and the fix.
4. Report only rules that this system states.

## Stop and ask

- The screen needs a component the bundle does not have.
- The code or screen to change or review is not available.
- The order in "Which rule wins" does not settle a conflict.
