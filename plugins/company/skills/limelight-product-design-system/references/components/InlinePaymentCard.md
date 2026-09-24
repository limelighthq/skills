# InlinePaymentCard

The payment step inside an Inbox conversation: a "Review & pay" card to confirm a simulated payment, the "Payment record" it turns into, and the dark completion snackbar.

It sits between `ReadCard` and the messages. "Accept $2,800", "Accept $1,400" or "Review & pay" opens it.

## Consumer provides

- `creator`, `campaign`, `amount` ("$2,800", shown "$2,800 USD") and `deliverable` ("One native LinkedIn post", "One sponsored video").
- `providers` (default Stripe and Lumanu), `provider` / `onProviderChange`.
- `approved` / `onApprovedChange` for the checkbox.
- `onCancel` and `onConfirm({provider})`.
- Record mode: `mode="record"`, `status` ("Paid", "Processing", "Recorded externally", "Failed"), `reference`, `onClose`.
- `lastAttempt="Failed"` when the last attempt failed.
- `confirmation`: `{title, detail, actions, onDismiss}` for group D’s `Snackbar`.

## Anatomy

- Card: `surface`, 1px `inbox-pay-border`, `radius-xl`, 22px padding, 20px above and below. Text is 14px in the flow palette: `flow-ink` for the eyebrow, title, amount and labels, `flow-muted` for the other lines.
- Eyebrow "IVY · PAYMENT REVIEW" (11.2px). Title h3 "Review & pay" (17px/500, 8px above and below). "Alex Rivera · Q2 SaaS Growth". "$2,800 USD" in bold.
- Review: the scope line ("One native LinkedIn post · Organic publication only. Confirm delivery dates in the conversation; paid usage and exclusivity need separate agreement."), D’s native `select` "Payment provider" (label 14px/500, 6px above a 41px field with radius 7, 10px 12px padding, 14px/500 `flow-ink`, border `control-border-flow`), the readiness line ("Demo readiness: business verified, creator payout account ready, funds available. Fees: $0 in this simulation."), a `Checkbox` ("I approve the proposal scope and $2,800 payment via Stripe.", the provider updates live), "Interactive simulation. No real money moves.", then "Cancel" and the primary "Confirm simulated payment".
- Record: title "Payment record", "Paid · Stripe" (`role="status"`), "Reference: …", "Recorded in Payments. You can continue this conversation." and "Close payment details".
- Focus on the card's buttons: D's `.ivy-flow` ring, 2px `focus-ring-inbox-pay` at a 3px offset (4.51:1 on the white card).
- Snackbar (group D): fixed at the bottom center, 540px, dark ground. "Payment complete · $2,800 to Alex Rivera" / "Payments and Approvals updated. Simulation only." with "View payments", "View approvals" and "Dismiss" (named "Dismiss payment confirmation").

## States

- Unchecked: "Confirm simulated payment" is disabled. "Tick the approval box to confirm the payment." says why.
- Checked: Confirm is enabled. Confirming sets the thread to Paid, turns the card into the record, updates `ReadCard`, adds an internal log message, and shows the snackbar.
- Record reopened: "View payment" in `ReadCard` shows the record again.
- Processing, Recorded externally: the status line reads "Processing · Stripe" or "Recorded externally · External".
- Failed record: the status line reads "Failed · Stripe" in `danger-ink`, then "The simulated provider declined this payment. No completed payment was recorded. Review funding and retry."
- Retry after a failure: pass `lastAttempt="Failed"`. The review opens with D’s own failure sentence, "The simulated provider declined this payment. No completed payment was recorded. Review funding and retry."

## Keyboard and accessibility

- The card is a region named "Payment review in conversation".
- The disabled reason is tied to Confirm with `aria-describedby`.
- The status line is a live region, so the result is announced.
- The snackbar is a status region. Its buttons are visible and reachable by Tab.

## D exceptions

| D | DS | Rule | Why |
|---|---|---|---|
| Native select border #CED8D1 | Group E’s `control-border-flow` #7E9986 (same hue, 3.09:1). The select keeps D’s geometry. | Control borders 3:1 | D’s border is 1.46:1 on the white card. |
| Confirm turns off with no reason | The reason line above | Disabled explanation (ENG-3773) | The dimmed button must not be the only carrier of why it is off. |
| Snackbar buttons white on white | Group D’s `Snackbar` with visible labels | D defect | D’s labels are invisible. |
| A Paid record overwrites a Failed one, and the retry form claims funds are available | The failure stays visible (`status="Failed"`, `lastAttempt="Failed"`) | D defect | A retry must not hide that the last payment failed. |

## Do / Don't

- Do say "simulation" wherever money is mentioned.
- Do keep the amount formatted ("$2,800 USD"), as the card does.
- Don't write a Paid record over a Failed one. Keep each attempt’s own status.
- Don't auto-dismiss the snackbar. D keeps it until Dismiss or until the user leaves the thread.
