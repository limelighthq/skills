# ReadCard

Ivy’s recommendation for the open Inbox thread: the "IVY’S READ" eyebrow and thread status, a one-line verdict, the reasoning, evidence pills, four key facts, and the next actions.

## Consumer provides

- `status`: the thread status ("Counter-offer", "Draft ready", "Awaiting reply", "Stalled", "Paid").
- `headline`: the verdict ("Accept. Alex is worth $2,800.", "Send it. She said yes at your number.").
- `children`: the reasoning paragraph.
- `pills`: evidence ("1,240 comparable deals", "25% above market", "ICP 94").
- `facts`: up to four `{label, value}` ("Your offer" $2,500, "His counter" $2,800, "Typical rate" $2,800, "Budget left" $10,200).
- `actions`: `{label, onClick, primary?, haspopup?}`. The first action is primary unless you say otherwise.

Actions per thread in D:

- Counter-offer: "Accept $2,800" (primary, opens `InlinePaymentCard`), "Counter", "Decline". Priya: "Counter at $1,250 + bonus", "Accept $1,400", "Decline".
- Draft ready with a proposal (Maya): "Review & pay", "Edit draft", "Skip". Without a proposal (Leo): "Review & send", "Edit draft", "Skip".
- Awaiting reply: "Send a nudge", "Withdraw offer". Stalled: "Re-open at $2,600", "Withdraw offer".
- Paid: "View payment" replaces "Accept …". The headline becomes "Payment complete. Continue the collaboration.", the pills "Payment recorded" and "Approved", and the facts "Payment: Paid" and "Next step: Confirm delivery dates".

## Anatomy

- Card: `inbox-read-gradient` (125deg, `inbox-read-start` to `inbox-read-end`), 1px `inbox-read-border`, `radius-xl`, `shadow-sm`, 24px padding. At 1440 it is 550 x 319px.
- Top line: the eyebrow in `read-eyebrow` (10px, 0.15em, uppercase, `ink-strong`) and a neutral `Badge`.
- Headline: h2, `read-headline` (17px/25.5px, 500), 12px above and below.
- Reasoning: 14px/22.4px `ink-strong`.
- Pills: neutral badges, 8px apart, 14px above.
- Facts: a `dl` grid of 4 columns, 12px gap, 20px above and below. Label 11.2px `muted` on a 21px line. Value `fact-value` (15px/700), 6px under it. At 1150px and below D shows 2 columns.
- Actions: `Button` md, 8px apart. The first is primary.

## States

- Every thread status above. A thread with 2 facts keeps the 4-column grid.
- Actions that D does not wire show the notice "{action} is not connected in the C3 preview." That is page behaviour.

## Keyboard and accessibility

- The card is a `section` named by the headline.
- The eyebrow is D’s text "IVY’S READ".
- Facts are a description list: "Your offer, $2,500".
- Pass `haspopup: "dialog"` for an action that opens an overlay.

## Do / Don't

- Do lead with the verdict and keep it to one line.
- Do keep the pills to evidence. The status belongs in the top badge.
- Don't colour the facts. D keeps every value `ink-strong`, even the counter.
- Don't show more than one primary action.
