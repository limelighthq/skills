# IconButton

A button that shows only a lucide glyph: the rail tools, the panel toolbar, row actions and the Send button.

## Consumer provides

- `icon` (lucide name) and `label` (the accessible name, naming the object: "Accept Eli Garrison"). D shows no tooltips.
- `size`: `md` (36px, 20px action glyph, rail tools), `toolbar` (26x36, 16px glyph, panel toolbar) or `sm` (27px, 16px glyph, row actions, as D renders them).
- `variant`: none (transparent), `outline` (white fill and `control-border`, row actions) or `solid` (`primary` fill, the 36x34 Send button).
- `tone`: `accept` or `reject` for the row-action hover tints. `pressed` sets `aria-pressed`.

## Anatomy

- Radius `radius-md` (6px). Colours: rail tools `icon-rail` (#74747D), toolbar `icon-toolbar` (#888891), row actions `icon-row` (#72757B), Send `on-primary` on `primary`.

## States

- Hover: none on the rail and toolbar (as in D). Accept: `accept-hover-fill`, `accept-hover-ink`, `accept-hover-border`. Reject: `reject-hover-fill`, `reject-hover-ink`, `reject-hover-border`. Send: 90% fill.
- Focus: the system focus ring. Disabled: 50% opacity plus a visible reason (ENG-3773).

## D exceptions

- Rail tool glyphs 16px → 20px (icon floor). Row-action and hover borders D #E6E8EB, #C9E2D6, #EDCEC8 (1.2 to 1.5:1) → `control-border`, `accept-hover-border`, `reject-hover-border` (3:1 on white and on a hovered row).

## Do / Don't

- Do give every icon button a specific label. "Reject Mei Lin", not "Reject".
- Don't add a tooltip or a hover ground that D does not have.
