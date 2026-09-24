# SelectableTile

SelectableTile is one option in a small single-choice set, shown as a bordered tile with a title and a one-line description.

## Consumer provides

- `title` ("Stripe"), `description` ("Connected payment provider"), `value`, `selected`, `onSelect(value)`.
- `variant`: `tile` (default, the pay modal's "Choose how to pay") or `radio`, which renders group E's `RadioCard` (the Invite teammate role: "Member", "Admin"). For a whole role set, use E's `RadioCardGroup` directly.
- `name` for the radio group.
- `disabled` with `disabledReason`.
- Put tiles in a `div.lla-tiles` row (flex, 12px gap, equal widths) with `role="group"` and a name. Put radio tiles in a `role="radiogroup"` or a `fieldset`.

## Anatomy

Tile (D `.flow-options button`):
- Padding 16px, radius 10px, 1px `tile-border`, `surface`. Title 14px / 21.7px weight 700, description 12px / 18.6px, 6px above, both `tile-ink`.
- The font follows the context. In D the tiles sit in a portaled dialog and use `--font-system`.

Radio (D `.settings-choice`): group E's `RadioCard`, 70px tall. In a `RadioCardGroup` (or `.lla-radiogroup-cards`) the cards sit 38px apart, as in D.

## States

- Selected tile: 2px `tile-selected-border`, `tile-selected-fill`. `aria-pressed="true"`.
- Selected radio: the radio is checked. The frame does not change.
- Hover: none in D.
- Disabled: `opacity-disabled`. The reason renders under the tile in opaque `muted` text and is tied with `aria-describedby` (ENG-3773).
- Focus: tiles keep D's own flow ring (`.ivy-flow button:focus-visible`), 2px `focus-ring-portal` (#4A8260) at a 3px offset. This is orchestrator ruling 2 (RULINGS-2.md), not an exception: it clears 3:1 on its grounds (4.51:1 on the dialog surface, 4.17:1 on `tile-selected-fill`). Radios keep the global `focus-ring`, as in D.

## Keyboard and accessibility

- Tiles are toggle buttons (Tab, Enter, Space). Radios use native arrow-key movement inside the group.

## D exceptions

| D | DS | Rule | Why |
|---|---|---|---|
| Tile border #CBD8CF | `tile-border` #7B9C85 | Control borders 3:1 | D is 1.47:1 and is the tile's only boundary. |

## Do / Don't

- Do keep two to four options.
- Don't use tiles for multi-select. Use checkboxes.
