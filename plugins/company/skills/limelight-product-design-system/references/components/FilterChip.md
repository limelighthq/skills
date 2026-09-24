# FilterChip

A toggle chip with a count pill that filters a list, as in the Inbox "Campaign conversations" card.

## Consumer provides

- `label` ("Q2 SaaS Growth"), `count` (show 0 too: "Customer story 0").
- `selected`, `onClick`.
- `unit`: singular noun for D's accessible name. `unit="conversation"` gives "Q2 SaaS Growth, 4 conversations". Or pass `ariaLabel`.
- Wrap the chips in a `role="group"` with a name ("Filter conversations by campaign"), flex-wrap, 8px gap.

## Anatomy

- 43px tall: padding 10px 14px, 12px gap, 1px `filterchip-border`, `radius-lg` (8px), white.
- Label: 14px/21 weight 450 `filterchip-ink`.
- Count pill: min 24px wide, padding 1px 7px, `radius-chip` (5px), `filterchip-count-fill`, 12px/18 tabular.
- Selected: `filterchip-selected-fill`, 1px `filterchip-selected-border` plus a 1px inset ring of the same colour, label and count weight 600 `filterchip-selected-ink`, count on `filterchip-selected-count-fill`.
- D's copy: "All campaigns 5", "Q2 SaaS Growth 4", "DevTools LinkedIn 1", "Customer story 0".

## States

- Rest, selected, focus (global ring). D has no hover change and no disabled chip.

## Keyboard and accessibility

- A `button` with `aria-pressed`. Enter or Space toggles it.
- With `unit` or `ariaLabel`, the count pill is `aria-hidden` so the count is read once.

## D exceptions

- Rest border: D #DEDFE2 (1.33:1). The DS uses `filterchip-border` #91949E, the same hue at 3:1. Rule: control borders 3:1.

## Do / Don't

- Do keep exactly one chip selected when the chips are exclusive ("All campaigns" is the reset).
- Do update counts from the other filters. D notes "Campaign counts reflect the message filter and search."
- Don't hide chips with a 0 count.
