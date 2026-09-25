# ApprovalReviewDrawer

The 640px side drawer that reviews one approval: the full proposed action in an editable field, then "Approve & next" and "Reject", which both move on to the next item.

The same drawer shows a read-only activity record when Activity’s "View record" opens it.

## Consumer provides

- `open`, `onClose`.
- `item`: `{id, agent, kind, title, context, body, status}`. For an activity record pass `kind: "Activity record"`, `status: "Recorded"` and the context "Ivy · 9/23/2026, 7:18:07 PM".
- `onApprove(text, item)` and `onReject(text, item)`. The text is the edited proposed action. After either one, pass the next item in the current filtered and sorted list, wrapping round. Close the drawer after the last pending item.
- `value` / `onChange` only to control the text. Uncontrolled, it starts from `item.body` and resets when `item.id` changes.

## Anatomy

It renders inside group D’s `Drawer` at `width={640}`: right side, full height, title = the item title, subtitle "Limelight · Local prototype", close X. The content is a 16px-gap column in the overlay scope (system face, 16px/24px, `ink-overlay`):

1. A full-width grey badge "Ivy · Rate negotiation": 12px/16px, 600, `surface-subtle` fill, `ink-hover` text, `radius-md`, 2px 10px padding.
2. The context line ("Q2 SaaS Growth").
3. D's field: a `label` holding the text "Proposed action" (or "Recorded outcome") and an 8-row textarea, 212px wide, inline after the text. The text sits beside the textarea's bottom edge, as in D. The textarea is 212 x 220 with `radius-lg` and 16px/24px text. It adds a 1px `control-border-overlay` and takes 1px off D’s 14px padding, so the box and the text wrap stay D’s.
4. Rate negotiation only: "Rate and budget changes always require your approval."
5. `muted-overlay`: "This prototype records the decision. It does not send messages or publish content."
6. Pending only: "Approve & next" (primary) and "Reject", 8px apart.

## States

- Pending: the text is editable. The Approved list later shows the edited text.
- Blank text: "Approve & next" is disabled. The line "Write the proposed action to approve it. Reject stays available." explains why. "Reject" stays enabled.
- Approved or Rejected: the text is read-only and the actions are gone. Only the close X remains.
- Activity record: label "Recorded outcome", read-only, no actions.

## Keyboard and accessibility

- `Drawer` traps focus, closes on Escape and on a scrim click, and returns focus to the "Review details" button that opened it.
- The textarea keeps D's accessible name "Proposed action", also on an activity record.
- The disabled reason is tied to "Approve & next" with `aria-describedby`.

## D exceptions

| D | DS | Rule | Why |
|---|---|---|---|
| Textarea with no border | 1px `control-border-overlay` #8C8C99 (3.32:1), padding 13px. D's 212 x 220 inline layout is kept. | Control borders 3:1 | A borderless field shows no edge at all on the white drawer. |
| A blank text disables "Approve & next" with no reason | The reason line above, tied with `aria-describedby` | Disabled explanation (ENG-3773) | The dimmed button must not be the only carrier of why it is off. |

## Do / Don't

- Do advance on Reject too. D moves to the next item after either decision.
- Do keep the drawer read-only once a decision exists.
- Don't send anything from the drawer. The prototype only records the decision.
- Don't put the actions in a sticky footer. D keeps them in the flow under the text.
