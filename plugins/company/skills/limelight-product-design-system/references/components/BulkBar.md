# BulkBar

The bar between the filters and the creator table: the need-review toggle, the selection count and the sort select.

## Consumer provides

- `reviewCount`, `onReview`, `reviewActive` (the need-review filter is on).
- `selectedCount`.
- `sortOptions`, `sort` / `defaultSort`, `onSortChange`, `sortLabel` (default "Sort creators"). D's options: Relevancy, Newest added, Oldest added.
- Extra bulk actions as children. They go before the sort select.

## Anatomy

- Flex row, wraps, 12px gap, 16px top and bottom padding, 12px text.
- "20 need review": `Button` size `sm` (30px), `secondary` at rest and `primary` while active.
- "0 selected for outreach": 12px/18 `muted`.
- Sort: `Select` size `sm`, 150px (`select-width-sort`), pushed to the right.

## States

- Review off (outlined) and on (filled). The count reads "1 selected for outreach" after a selection.

## Keyboard and accessibility

- The review button has `aria-pressed`, and the selection count is `role="status"`. D has neither (both listed in exceptions.json as non-visual fixes).

## D exceptions

- None beyond Button and Select.

## Do / Don't

- Do keep the sort select last.
- Don't show bulk actions that need a selection while the count is 0.
