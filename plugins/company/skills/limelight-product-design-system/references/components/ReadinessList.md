# ReadinessList

ReadinessList shows whether something is ready to go: the Pay modal's three payment checks with the "Payment is blocked" notice, or the brief editor's readiness box before publishing.

## Consumer provides

- Payment (default): `items` as `{label, ok}`. D's checks are "Business verification complete", "Creator payout account ready" and "Funding available for this payment". A blocker swaps the copy, for example "Complete business verification (KYB)".
- `blocked` when a check fails: `{title: "Payment is blocked", body: [reason, "Use Review payment states on the wallet to simulate a resolved blocker."]}`.
- `noticeId`, then point the disabled "Review payment" button at it with `aria-describedby`.
- Brief: `variant="brief"` and `items` as the missing things ("Time zone is missing", "resource must use HTTPS"). An empty list shows "Content complete" with "All required fields and date order checked. Team approval still required."
- The heading "Payment readiness" and the Pay modal itself come from the Dialog.

## Anatomy

Payment (inside the Pay modal, system face):
- Rows: 14px/21.7px `readiness-ink`, 10px vertical padding, 1px `readiness-line` rule under each.
- Each row starts with a check or a warning triangle (16px glyph in the 24px box).
- Blocked notice: 14px below the list, `readiness-warn-fill` ground, 1px `readiness-warn-line` frame, radius 8, 16px padding. Title weight 700, then the body paragraphs in `readiness-muted` with 8px above and 14px below each (178.4px tall for D's two paragraphs).

Brief (the left rail of the brief editor, Helvetica Neue):
- 14px padding, 12px/18.6px `readiness-brief-ink`. Title weight 700, then an unbulleted list indented 14px with 8px between items.

## States

- Payment: all ready, or one blocker with the notice. The Review payment button is disabled while blocked.
- Brief: Content complete, or Needs review with one line per problem.

## Keyboard and accessibility

- Each check has an icon named "Ready" or "Blocker", and the text itself says what is missing.
- The blocked notice has `role="status"` and an id. The disabled "Review payment" button uses it with `aria-describedby`, so the reason exists in opaque text (ENG-3773).
- The brief box has `role="status"`, so a new problem is announced as the user edits.

## D exceptions

- D writes the marks as text ("⚠" and "✓"). The DS uses lucide `triangle-alert` and `check` at 16px. Rule: icons are lucide.

## Do / Don't

- Do keep the three payment checks in D's order, even when only one fails.
- Do disable the next step while anything blocks, and describe it with the notice.
- Don't colour a whole row red. The icon, the copy and the notice carry the state.
