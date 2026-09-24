# PartyFilterTile

PartyFilterTile is a filter button in the WAITING ON card that shows one party ("The creator", "Finance", "Procurement"), how many deliverables it holds and why, and filters the calendar to them when pressed.

## Consumer provides

- `label`, `count` and `reasons` (for example `["awaiting impressions", "in revisions"]`, joined with " · "). With no reasons the tile says "nothing waiting".
- `pressed` and `onClick`. Only one party filter is on at a time. Pressing the pressed tile turns the filter off.
- `disabled` when `count` is 0.
- Wrap the tiles in `PartyFilterTile.Group`, which draws D's ruled row. Give the group a `label` ("Waiting on").
- The page also shows the chip "× Waiting on the creator" beside the Stage select while a filter is on. That chip is a Chip with `onRemove`, not part of this component.

## Anatomy

- Group: equal columns, 1px `line` frame and dividers, radius 8, white ground. In D it sits 20px under the card text and 16px above the progress bar.
- Tile: 16px padding, 8px gap, left aligned.
- Label 14px/20px weight 450 `ink-strong`. Count 24px/34.29px weight 500 `party-count`. Reasons 11px/15.71px weight 450 `party-reason`.
- Tile height at 1440: 118px.

## States

- Hover: `surface-hover` ground, `ink-hover` label.
- Pressed (filter on): `party-pressed-fill` ground and a 2px inset bottom bar in `party-pressed-mark`. The label keeps `ink-strong`, as in D. Hovering a pressed tile turns it `ink-hover`.
- Disabled (count 0): label and count in `party-disabled`, no hover. The reason "nothing waiting" stays in opaque `party-reason` text and describes the button.
- Focus: the global focus ring, drawn above the neighbouring tile.

## Keyboard and accessibility

- Each tile is a toggle button with `aria-pressed`. Tab moves between tiles, Enter or Space toggles.
- The reasons line is tied to the button with `aria-describedby`, so "Procurement, 0, nothing waiting" is announced even while the tile is disabled (ENG-3773).

## D exceptions

- Pressed bar: D `#8FAECF` (2.02:1) → `party-pressed-mark` `#638EBC` (3.01:1 on white, 3.43:1 on the pressed fill). Rule: state marks 3:1.
- Reasons: D `#767780` (3.9:1 on the pressed fill) → `party-reason` `#6C6D75` (4.51:1). Rule: text 4.5:1.
- The count keeps D's `#B45736`: at 24px it is large text and clears 3:1 on every ground (4.23:1 when pressed).
- D clips the tiles with `overflow: hidden`. The DS rounds the end tiles instead, so the focus ring is not cut off.

## Do / Don't

- Do show all three parties, even when a party holds nothing. The disabled tile tells the user that nobody is waiting on it.
- Do update the calendar count ("May 2026 · 4 deliverables") when a filter is on.
- Don't use the tiles as a static stat row. They are filters (D: "Each party filters the calendar to what it is holding.").
