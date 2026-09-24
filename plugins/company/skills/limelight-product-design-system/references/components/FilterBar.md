# FilterBar

The row of filters above a table or board: search, a status select, a view switch, the result count and one primary action.

## Consumer provides

- Children in D's order: `SearchInput` · `Select` with `inlineLabel` · `SegmentedControl` (size `sm`) · `ResultCount` · primary `Button` (size `toolbar`, icon `play`, "Run Discovery Now").
- `label`: the group name (default "Filters").

## Anatomy

- Flex row, wraps, items centred, 10px gap (`space-10`), 18px bottom padding (`space-18`), 1px `line` under it.
- Search grows from 230px. At 1440 it measures 347px. Above a 1500px viewport it stops at 320px.
- A Select child without a `width` gets 100px (`select-width-filter`).
- At 1440 with the panel open D measures: search 347, STATUS 37 + trigger 100, segmented 115, "20 of 20" 43, button 159.

## States

- The count updates as the filters change ("0 of 20" when nothing matches).

## Keyboard and accessibility

- A `role="group"` with a name ("Filters"). D's bar has no role (listed in exceptions.json as a non-visual fix). Tab moves through the controls in order.

## D exceptions

- None of its own. Each child documents its own.

## Do / Don't

- Do keep one primary action at the end.
- Don't add a second search or a second primary button.
