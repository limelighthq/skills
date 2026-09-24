# Icon

One lucide glyph (the icon library D uses) inside the 24px house icon box.

## Consumer provides

- `name`: a lucide name from the bundled set. D's own 38 glyphs are copied byte for byte from D's bundle (lucide-react 0.468.0): arrow-left, arrow-right, chart-no-axes-combined, check, chevron-down, chevron-left, chevron-right, chevron-up, circle-help, clock, credit-card, ellipsis-vertical, external-link, eye-off, grip-horizontal, heart, inbox, key-round, lightbulb, megaphone, menu, message-circle, message-square, minus, notebook-pen, panel-left, pencil, pin, play, plus, search, send, settings, sparkles, target, thumbs-up, trash-2, x. The other glyphs come from lucide 0.460 (ISC).
- `size`: `indicator` (default, 16px glyph) or `action` (20px glyph).
- `label` only when the icon carries meaning with no visible text. Otherwise the icon is hidden from assistive tech.

## Anatomy

- Box: `icon-box` (24px). Glyph: `icon-glyph-indicator` (16px) or `icon-glyph` (20px). Stroke 2, round caps and joins, `currentColor`.
- D's unicode glyphs map to lucide: ⌃ chevron-up, ⌄ chevron-down, ⌕ search, ✎ pencil, ✦ sparkles, ↗ arrow-up-right, › chevron-right, × x, ✓ check.

## Sizes

- Action (20px): standalone icon buttons 36px and larger (rail tools).
- Indicator (16px): chevrons and carets, glyphs in compact icon buttons (panel toolbar, row actions), glyphs beside a text label (buttons, menu items, inputs).

## D exceptions

- D draws its glyphs at 11 to 16px with no box. The house floor puts every glyph in a 24px box, raises rail tools to 20px and raises D's 11 to 15px glyphs to 16px.

## Do / Don't

- Do colour icons through `currentColor` with an ink token that clears 3:1 on its ground.
- Don't use emoji or unicode characters as icons.
