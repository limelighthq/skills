# DataTable

DataTable is the app's list of records: a header row, one row per record, 1px row dividers and a light hover tint.

## Consumer provides

- `columns`: `{key, header, width?, numeric?, align?, sort?, render?(row, index)}`. Put the person first, figures as `numeric`, actions last.
- `rows` and `rowKey` (default `id`).
- `caption` for screen readers ("Creators in Q2 SaaS Growth").
- `density`: `creator` (default) for the Creators list, `compact` for Payments transactions.
- `empty`: the line under the header when no rows match. D's copy is "No creators match these filters."
- Cells: `CreatorCell`, `PlatformIcons`, `ScoreChip`, `RowActions`. In compact rows use `strong.lla-cell-title` + `p.lla-cell-sub` for two-line names, `Badge` for status and a `secondary` Button ("Receipt").

## Anatomy

Creator density (D `.brand .creator-table`, 850px main column):
- Header 38px (`table-header-height`), `surface-nav`, 1px `line` top, 1px `line-card` bottom. Label 9px / 12.86px, weight 500, 0.02em tracking, UPPERCASE, `muted`. Padding 10px 6px.
- D's column widths: Creator 40%, Platforms 10%, Followers 12%, Eng. 10%, Relevancy 13%, Actions 15%.
- Cells: padding 16px 6px, vertical-align middle. A row with a one-line name is 89px. A row whose badge wraps is 108px.
- Row divider 1px `line-card`. The last row has none.
- Figures: `--font-mono` 12px / 17.14px, -0.04em, tabular.
- Creator initials tint by row: rows 1, 4, 7 use variant 1, rows 2, 5, 8 variant 2, rows 3, 6, 9 variant 3.

Compact density (D Payments > Transactions):
- Header 40px (`table-header-height-compact`), no fill, 14px / 20px weight 500 `muted`, padding 0 8px, Title Case as given ("Name", "Status", "Sent By", "To", "Created At", "Amount", "Links").
- Cells: padding 8px. Rows are 59px. First line 14px / 21px weight 700 `ink`. Second line 14px / 22.4px `muted`.
- Amounts stay in the sans face with tabular figures ("−$3,200.00").

## States

- Hover: the row takes `surface-subtle` at 50% (D shadcn `hover:bg-muted/50`). Nothing else changes.
- Selected (`selected` keys): `surface-subtle` ground and `aria-selected`. D does not use it.
- Empty: the header stays and the `empty` line sits under it, centered, `muted`, 40px padding.
- Sticky header: D's headers scroll away with the rows. `sticky` exists for long tables outside D and is off by default.

## Keyboard and accessibility

- A creator name opens the review drawer (group D `Drawer`, 600px). The preview wires it. Escape closes it and focus returns to the name.
- It is a real `<table>` with `scope="col"` headers and a hidden `caption`.
- Only the controls inside cells take focus. Rows are not focusable.
- Name every row control with the record: "Accept Eli Garrison", "Receipt for Maya Chen".

## D exceptions

- The "Added" date uses `person-date` (#6A7078). It stays at 4.75:1 on the hovered row (see CreatorCell).
- Initials use the base `avatar-1-ink` / `avatar-2-ink` / `avatar-3-ink` exceptions (D #82766D is 3.80:1 on #EFEEEB).
- "Rejected" and other neutral badges use the base `neutral-text` exception (D #77777E is 3.97:1 on #F2F2F3).
- Row actions use `row-action-border` (see RowActions).
- Rows measure 88.9px against D's 89.3px. The 0.4px is how the browser splits the collapsed header border. Wrapped rows match (107.8px).

## Do / Don't

- Do change a row in place after Accept or Reject, then confirm with the "Creator review saved." notice and its Undo.
- Do keep the header labels in D's case: UPPERCASE in the creator density, Title Case in the compact density.
- Don't add checkboxes, pagination or a bulk bar. D has none.
- Don't restyle numbers per column. Use `numeric`.
