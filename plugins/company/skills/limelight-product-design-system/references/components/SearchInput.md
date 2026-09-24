# SearchInput

The filter-bar search field, with a 16px search glyph inside its left edge.

## Consumer provides

- `label`: the accessible name ("Search creators"). The field has no visible label.
- `placeholder`: D's copy is "Search by name, role, category".
- `value` / `onChange`. Filter as the user types and show the result in `ResultCount`.

## Anatomy

- 36px field, 1px `control-border`, `radius-md`, `shadow-sm`, padding 4px 12px 4px 34px, 12px/17.14 text.
- Glyph: lucide `search`, 16px, `muted`, 10px from the left edge, centred.
- Inside `FilterBar` it grows (`flex: 1 1 0`) from 230px (`search-min-width`). D caps it at 320px (`search-max-width`) only above a 1500px viewport. At 1440 it measures 347px.
- D's other search fields have no glyph. Inbox "Search conversations…" (235x36, 14px) and Elliot "Search sources…" (220x36, 14px) are TextInputs with `hideLabel`.

## States

- Placeholder in `muted`, filled, focus (global ring).

## Keyboard and accessibility

- The wrapper has `role="search"`. D has no landmark (listed in exceptions.json as a non-visual fix).
- The input is `type="text"`, so Chrome adds no clear button. D has none.

## D exceptions

- Border and focus as TextInput.

## Do / Don't

- Do keep one search per filter bar.
- Don't add a search button. D searches as you type.
