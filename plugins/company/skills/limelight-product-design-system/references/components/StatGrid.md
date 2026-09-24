# StatGrid

A two-column grid of labelled numbers inside a panel card: Shortlisted 67, Contacted 27, Signed 4, Never approached 40.

## Consumer provides

- `items`: `[{label, value}]`. D shows 3 or 4. With an odd count, the last row holds one cell (Payments: Accepted, Providers, Mode).

## Anatomy

- Grid: `grid-template-columns: 1fr 1fr`, 1px `line` border, `radius-md` (6px), `surface`, margin 18px 0 14px, overflow hidden.
- Cell: padding 10px, 1px `line` right and bottom borders (D draws them on every cell, so the outer edge doubles).
- Label: 11px/16.5px (`caption`), `muted`, inline in a 21px line.
- Value: `stat-l` (20px/30px, 500), `ink-strong`, margin-top 6px.
- A cell measures 115x78 in a 232px card column.

## States

- Static.

## Keyboard and accessibility

- Plain text in reading order: label, then value.

## Do / Don't

- Do keep labels short enough for one line at 115px.
- Don't put units in the label when the value carries them ("62%", "2 of 5", "11 weeks").
