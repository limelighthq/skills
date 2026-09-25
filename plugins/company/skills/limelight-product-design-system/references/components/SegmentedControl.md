# SegmentedControl

A grey track of two to four options that switches how the same data is shown, such as "List" and "Kanban".

## Consumer provides

- `options`: strings or `{value, label}`.
- `value` / `defaultValue` / `onChange(value)`.
- `size`:
  - `sm` (default): the Creators filter bar ("List", "Kanban").
  - `md`: Elliot's "Kanban" / "List", the Calendar's "Month" / "Week" / "List", and Analytics' "This week" / "This month" / "Last 90 days".
- `label`: the group's name ("Creators view").

## Anatomy

- Track: `surface-subtle`, radius 8 (`radius-lg`), padding 4. The items touch.
- sm: a 34px track (`segmented-height`), 25px items, `control` type (12px/17.14, 450), padding 4px 12px, radius 6.
- md: a 36px track (`segmented-height-md`), 28px items, 14px/20 450. It is the same look as `Tabs variant="pill"`.
- Selected item: `surface` ground, `ink` label, no shadow (D). Others: `muted` label on the track.

## States

- Selected and unselected as above.
- Hover: none (D).
- Focus: the global 2px `focus-ring`.

## Keyboard and accessibility

- D's semantics: a `tablist` of `tab`s with `aria-selected` (Radix Tabs). It has no tab panel of its own because the view it switches lives elsewhere. One Tab stop.
- Arrow keys move and select. Home and End jump to the ends.
- Name the tablist with `label`.

## Do / Don't

- Do use it for a view switch of the same data.
- Do use `Tabs` (pill) when each option shows its own section panel. D renders both with the same look and the same roles.
- Don't use more than four options.
