# ChatComposer

The panel footer: the two Build-with selectors, then the "Ask your team anything…" input and the Send button.

## Consumer provides

- `selectors`: both `AgentSelector`s.
- `onSend(text)`. Enter sends. The input clears after a send. An empty or blank input sends nothing.
- Optional: `value` / `defaultValue` / `onValueChange`, `placeholder`, `label`, `sendLabel`.

## Anatomy

- Selector row: flex, gap 6px, 12px above the form.
- Form: flex, gap 6px, centered.
- Input: 36px (`control-height`), grows to fill, padding 4px 12px, 12px/17.14px (`input`), 1px `control-border`, `radius-md`, `shadow-sm`, transparent over `surface-bar`. Placeholder "Ask your team anything…" in `muted` (D's own #686B73, 5.1:1 on `surface-bar`).
- Send: `IconButton variant="solid"` (36x34, `radius-md`, `primary`), `send` glyph, named "Send message".
- Sits inside AgentPanel's footer (padding 14px), 270px wide at the default panel width.

## States

- Typed: the input shows `ink` text.
- Send is never disabled in D. It ignores an empty input instead.

## Keyboard and accessibility

- The input is named "Ask your team". Enter submits the form. The Send button is named "Send message".

## D exceptions

| D value | DS value | Rule | Why |
|---|---|---|---|
| Input border #DDDFE4 | `control-border` #858D9E | Control borders 3:1 | Base exception. |
| Send glyph 16px | 20px action glyph | Icon floor | A standalone 36x34 icon button. The selector chevrons stay 16px, as in D. |

## Do / Don't

- Do keep one composer on every page, for both agents.
- Don't replace the input with a textarea. D uses a one-line input.
