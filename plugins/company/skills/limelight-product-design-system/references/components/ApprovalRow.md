# ApprovalRow

One decision card in the Approvals list: who asks and what kind of decision it is, the title, its context, a one-line preview of the proposed action, and the buttons to review, approve or reject it.

## Consumer provides

- `agent` ("Ivy", "Elliot") and `kind`. D creates five kinds: "Creator reply", "Rate negotiation", "Payment approval", "Content approval" (an Elliot post) and "Routine review" (a ritual run on Manual approval).
- `status`: "Pending" (default), "Approved" or "Rejected".
- `title` ("Reply to Maya Chen", "Approve Michael’s post", "Payment to Alex Rivera", "Check quiet team members").
- `context`: the campaign, the post’s theme ("Hiring brand") or the ritual schedule ("Every weekday at 10:00").
- `body`: the proposed text. The row clamps it to one line.
- `onReview` (opens `ApprovalReviewDrawer`), `onApprove`, `onReject`.
- `badge` only to override D’s rule below.

## Anatomy

- Card: `surface`, 1px `line-card`, `radius-xl` (12px), `shadow-sm`. Rows stack with an 8px gap.
- Inner grid: `minmax(0, 1fr) auto`, 16px column gap, 2px row gap, 12px 14px padding. At 1440 a row is 850 x 102px.
- Top line: "Ivy" in `ops-agent` (12px/550, `ink-strong`), then "/ Rate negotiation" at weight 400 in `muted`, then a neutral `Badge`, 8px apart.
- Title: h2, 14px/18.9px, 500, -0.025em, `ink-strong`.
- Context: 11px/16.5px `muted`.
- Body: a `blockquote`, 12px/16.8px `ink-strong`, clamped to one line with an ellipsis.
- Actions: the second column spans all rows and centers. A 2-column grid, 5px gap, at most 180px wide. "Review details" spans both columns. "Approve" (primary) and "Reject" (secondary) share the second line. Buttons are 28px tall with an 11px label and 4px 8px padding.

## States

- Badge rule (D): a Rate negotiation always shows "Always review", even after approval. Every other kind shows its status: "Pending", "Approved" or "Rejected".
- Pending: Review details, Approve, Reject.
- Approved or Rejected: Review details only. It opens a read-only drawer.
- Payment approval: D creates it already Approved ("Approved 2800 USD via Stripe. Simulation only. Reference: …"), so it only ever shows Review details.
- Hover: the outlined buttons take `surface-hover`. The primary button drops to 90% opacity.
- At 650px and below the actions drop under the text and wrap.
- Empty list (not part of this row): "You’re caught up." / "Your agents will bring the next decision here." on Pending, or "No approved decisions." / "Decisions appear here after you review them." on the other tabs, each with "View activity".

## Keyboard and accessibility

- The card is an `article` named by its title.
- Every button carries `aria-describedby` to the title, so a screen reader hears "Approve, Reply to Maya Chen".
- "Review details" has `aria-haspopup="dialog"`.
- Tab order: Review details, Approve, Reject, then the next row.

## D exceptions

None in this component. The outlined buttons use the base `control-border` and the badge the base `neutral-text` (see the base exceptions).

## Do / Don't

- Do decide at once on Approve or Reject. D opens no drawer for them. It shows the notice "Approved. Reply to Maya Chen" and records the decision in Activity.
- Do keep "Always review" on every Rate negotiation. Rate and budget changes always need a person.
- Don't show more than one line of the body. The full text lives in the drawer.
- Don't add colour to the badge. D keeps every status neutral.
