# StatusBubble

The agent's answer to a status question such as "How are we doing today?": a chat message with a title, four figures in a 2x2 grid, and links to where the work is.

## Consumer provides

- `agent`: `ivy` or `elliot`. It sets the author label.
- `title`: "Q2 SaaS Growth · as of today" (Ivy) or "This week · employee advocacy" (Elliot).
- `stats`: four `{value, label}` pairs. Ivy: 42 In pipeline, 21 Replied, 9 Signed, $11.4K Committed. Elliot: 14 Scheduled, 5 Awaiting approval, 9 Drafts open, 62% Team participation.
- `links`: `{label, onClick}`. Ivy: "4 replies need you" (Inbox) and "3 payments due" (Payments). Elliot: "5 need approval" and "See the week".

## Anatomy

- Frame: a `ChatMessage` (white card, `line-insight`, `shadow-card`, 14px padding).
- Title: 14px / 21px, weight 700, `ink`.
- Stat grid: 2 columns, 1px `line` frame, `radius-md`, 18px above and 14px below. Each cell has 10px padding and a 1px `line` right and bottom edge (D doubles the outer edge, and so does the DS).
- Figure: `stat-l` type (20px / 30px, 500), `ink`, 6px top margin. Label: `caption` size (11px), `ink`.
- Links: full-width outlined `Button`s, 8px apart, left-aligned, 38px tall (auto height, 36px minimum), with a trailing `arrow-right`.
- In `FullViewDialog` the grid loses its frame (D's portal look): 12px gaps, 12px cell padding, 19px bold figures and 16px labels.

## States

- Links hover like every outlined button: `surface-hover` ground, `ink-hover` label.
- No loading state. D answers at once.

## Keyboard and accessibility

- Links are buttons in reading order. Name each by its destination ("4 replies need you").
- The figures are plain text, so a screen reader reads each value and its label in order.

## D exceptions

- D writes the arrow as text ("→"). The DS draws lucide `arrow-right` at 16px in the 24px box (icon rule).
- Link borders use `control-border` instead of D `#DDDFE4` (control borders 3:1).

## Do / Don't

- Do keep exactly four figures. The grid is 2x2 in D.
- Do send each link to the screen it names.
- Don't use it for a plain answer. A reply without figures is a `ChatMessage`.
