# RunCard

The card an agent shows while it runs a job from the chat, such as Elliot's "week" and "quiet" runs, plus the offer button and the ready card that stand in when "Agent opens views" is off.

## Consumer provides

- `kind="run"` (inferred from `steps`):
  - `mirror`: what the agent heard ("You want the week ahead. I'm counting anything scheduled or approved between today and Sunday, across all five profiles.").
  - `steps`: the work ("Reading the content calendar", "Checking approval state on each", "Looking for gaps against your posting plan").
  - `progress` (steps finished) or `animate` to tick one step every 620ms like D. Change `runId` to restart.
  - `question` ("Fill the two empty days from the ideas backlog?") and `onAnswer(true | false)` for "Looks right" / "A few things to fix".
- `kind="offer"`: `dest` ("Calendar" gives "Open Calendar") or `offer.label`, and `onOffer`. Show it after the result message when "Agent opens views" is off. Remove it after the click.
- `kind="ready"`: `text` ("Your draft is ready. Open Content to edit and schedule it."), `actionLabel` ("Open composer") and `onAction`.

## Anatomy

- Card: the `FlowStepCard` frame (white, 1px `line`, `radius-card`, 16px padding).
- Mirror: `chat-text` type, `muted-panel`, 10px above and 18px below.
- Steps: a list 18px above and below, 10px gap, `small` type (12px / 18px). Done steps show `check` in `chat-step-done`. The current step shows `dot` in `chat-step-now`. Later steps show `dot` in `chat-step-pending`. The 24px icon box overlaps the row so each step stays 18px tall.
- Question: 14px / 21px bold `ink-strong`, shown only when every step is done. Then the two answers stack 16px below (D's measured gap), 8px apart.
- Offer: a full-width outlined `Button`, 36px, centred label in `ink`. It sits on the panel image, so its border is `chat-busy-border`.
- Ready: a card with the muted text and an auto-width primary "Open composer".
- In `FullViewDialog` the card takes D's portal look (`line-overlay`, `radius-xl`, `shadow-sm`, 24px padding, 16px text).

## States

- Running: `aria-busy` is set on the card, steps advance, and no answers show.
- Finished: the question and the two answers appear.
- The result that follows is a plain `ChatMessage` ("Six posts are scheduled and two days are empty, Wednesday and Friday."). With "Agent opens views" on, D then navigates and adds "Elliot opened Calendar because that is where the week lives." With it off, D shows the offer instead.

## Keyboard and accessibility

- Each step carries hidden text ("Done:", "Working:", "Next:"), so the state does not rely on colour or the glyph.
- The answers are native buttons that appear after the last step. Focus stays where it was, as in D.

## D exceptions

- Pending step text: D `#A0A1A8` is 2.57:1 on white. DS `chat-step-pending` `#757680` (Text 4.5:1).
- Step glyphs: D's text "✓" and "·" become lucide `check` and `dot` at 16px (icon rule). A wrapped step now hangs under its text instead of under the glyph.
- Outlined answer border: D `#DDDFE4` becomes `control-border` (on the white card). Offer border: D `#DDDFE4` becomes `chat-busy-border` `#5F6678`, because the offer sits on the panel image where `control-border` is 1.7:1. In the full view it uses `control-border-overlay`.
- Hidden step state text, the list name and `aria-busy` are non-visual additions (WCAG 1.4.1 and 1.3.1).

## Do / Don't

- Do keep D's 620ms step pace when you animate. Faster reads as fake.
- Do show the offer only when "Agent opens views" is off.
- Don't show the answers before the last step is done.
