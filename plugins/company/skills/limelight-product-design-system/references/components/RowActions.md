# RowActions

RowActions is the last cell of a creator row: Accept and Reject for a new creator, Message after acceptance, and a status badge otherwise.

## Consumer provides

- `name`: the short creator name used in every button name.
- `state`: `pending` / `new`, `accepted`, `contacted`, `rejected`, `proposal`, `added`.
- `onAccept`, `onReject`, `onMessage`.

## Anatomy

- Flex row, 4px gap, wraps.
- New: two 27px outlined icon buttons (`IconButton size="sm" variant="outline"`), `check` with tone `accept` and `x` with tone `reject`. Glyph 16px in the 24px box, `icon-row` ink, 6px radius, 1px `row-action-border` at rest.
- Accepted or Contacted: one outlined icon button, `message-circle`, "Message {name}". It hovers in the reject tones, as in D (see States).
- Rejected: `neutral` Badge "Rejected".
- Discovery rows: `neutral` Badge "Review with Ivy" (proposal) or "Added".

## States

- Hover Accept: `accept-hover-fill` ground, `accept-hover-ink` glyph, `accept-hover-border`.
- Hover Reject: `reject-hover-fill`, `reject-hover-ink`, `reject-hover-border`.
- Hover Message: the reject tones too. D styles `.inline button:first-child:hover` green and `:last-child:hover` red. A lone Message button matches both and the later red rule wins. The DS reproduces it.
- Focus: global `focus-ring`.
- After Accept the row shows Message. After Reject it shows the "Rejected" badge. D offers Undo in the "Creator review saved." notice above the table and "Undo rejection" in the review drawer, not in the row.

## Keyboard and accessibility

- Each button is named with the action and the creator: "Accept Eli Garrison", "Reject Eli Garrison", "Message Eli Garrison". D shows no tooltips.
- Do not confirm a reject. The undo lives in the notice.

## D exceptions

| D | DS | Rule | Why |
|---|---|---|---|
| Border #E6E8EB | `row-action-border` #8891A0 | Control borders 3:1 | D's border is 1.23:1. Same hue, 3.18:1 on white and 3.02:1 on a hovered row. |
| Hover borders #C9E2D6 / #EDCEC8 | `accept-hover-border` #559F7C / `reject-hover-border` #CE7A6A | Control borders 3:1 | Base exception tokens. They pass on the hovered row too. |
| "Rejected" badge #77777E | base `neutral-text` #6E6E75 | Text 4.5:1 | Base Badge exception (3.97:1 in D). |

## Do / Don't

- Do move the row in place and announce it with the notice.
- Don't show Accept and Reject on a row that is already decided.
- Don't add text labels to the icon buttons. The accessible names carry them.
