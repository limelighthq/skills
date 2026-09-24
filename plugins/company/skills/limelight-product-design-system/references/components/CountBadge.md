# CountBadge

A count chip inside a button or beside a heading, as in "Approvals 6".

## Consumer provides

- The count as `children`. `tone="neutral"` for a grey count.

## Anatomy

- The ScoreChip shape: 12px/16.2 weight 500, padding 4px 7px, radius 5px, `positive-fill` / `score-text`. Inside a small button it overlaps the button padding so the button stays 30px tall.

## Do / Don't

- Do keep the count live (the header Approvals count reflects pending decisions).
