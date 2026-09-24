# PendingActionCard

A card for a ritual action that waits out a one-minute review window before it runs, with a "Cancel action" button to veto it.

It appears above the Activity list when a ritual on "Delayed with veto" runs.

## Consumer provides

- `title`: the ritual name ("Collect campaign results").
- `onCancel`: vetoes the action. The card disappears and Activity records "Delayed action cancelled" / "The action did not run."
- `badge` (default "Awaiting execution"), `description` (default "Runs after a one-minute review window. Cancel to veto.") and `cancelLabel` (default "Cancel action") only to override D’s copy.

## Anatomy

- Card: `surface`, 1px `line-card`, `radius-xl`, `shadow-sm`, 24px padding. At 1440 it is 850 x 149px.
- A neutral `Badge` on a 21px line.
- Title: h3, 14px/21px, 500, `ink-strong`.
- Description: 14px/21px `ink-strong`.
- A secondary 36px "Cancel action" button, directly under the text.
- Cards stack with a 16px gap.

## States

- Waiting: the card shows. The ritual’s "Run now" is disabled meanwhile.
- Cancelled: the page removes the card.
- Elapsed: after 60 seconds the page removes the card and records "Delay elapsed. Simulated completion, no external action sent."
- Hover on Cancel action: `surface-hover`.
- The Activity agent filter also filters these cards.

## Keyboard and accessibility

- The card is a `section` named by its title. "Cancel action" is described by it too.
- D shows no countdown. Don’t add a live timer that announces every second.

## Do / Don't

- Do keep the card above the Activity list, newest first.
- Do cancel waiting actions when the ritual is paused. D does.
- Don't name the agent on the card. D shows none. The title already names the ritual.
