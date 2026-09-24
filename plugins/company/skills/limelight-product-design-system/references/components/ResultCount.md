# ResultCount

The "20 of 20" count in the filter bar, announced politely when it changes.

## Consumer provides

- `shown` and `total`.

## Anatomy

- 12px/18 `muted`, tabular figures, no wrap.

## States

- "20 of 20", "0 of 20" when nothing matches.

## Keyboard and accessibility

- `role="status"`, so screen readers announce the new count after a filter change. D's span has no role (listed in exceptions.json as a non-visual fix).

## D exceptions

- None.

## Do / Don't

- Do place it right before the primary action in `FilterBar`.
- Don't add words such as "results". D shows only the figures.
