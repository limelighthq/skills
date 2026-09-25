# CalendarEvent

CalendarEvent is one item on a calendar day: a stage-coloured booking chip in the Ivy campaign calendar, or a post card with a status mark in the Elliot content calendar.

## Consumer provides

- `variant`: `booking` (default) or `post`.
- Booking: `name` ("Alex Rivera"), `stage` (`contracting`, `brief`, `progress`, `revisions`, `scheduled`, `live`), optional `count` (bookings across campaigns, shown as "×2") and `campaign` for the tooltip.
- Post: `status` (`published`, `scheduled`, `pending`, `draft`, `rejected`), `time` ("9:00 AM" or "Draft"), `title`, `label` ("Tips"), `owner` ("David Walsh") and optional `steps`. `block` gives the List view size.
- `onClick` opens the Booking drawer or the post detail drawer. MonthGrid wires it from `onOpen`.

## Anatomy

Booking chip (D `.brand .event button`):
- 29px tall, full cell width, 8px 6px padding, radius 4, no frame, a 2px left stage mark.
- Name 11px/15.71px weight 450, one line with an ellipsis. The count is a neutral Badge "×2" after an 8px gap.
- Stage colours (fill / name / mark): Live `cal-live-*`, In revisions `cal-revisions-*`, In progress `cal-progress-*`, Brief sent `cal-brief-*`, Contracting `cal-contracting-*`, Scheduled `cal-scheduled-*`.

Post (D `.ed-event`):
- Column with a 7px gap, 9px padding, radius 6, white ground, 1px `ed-event-line` frame and a 3px left status mark.
- Time and owner lines at 0.8em (9.6px in a day, 11.2px in the list), title 12px/18px weight 700 on two lines at most, then the label as a neutral Badge.
- Marks: published `ed-status-published`, scheduled and rejected `ed-status-scheduled` (D's default accent), pending `ed-status-pending`, draft `ed-status-draft`.
- In a day the text uses `ed-cal-ink`. With `block` (List view) it is 14px context in `ink-strong`.

## States

- Hover keeps D's look (no change). Focus shows the global focus ring.
- The stage or status is the only visual state. The name of the stage is always in the accessible name.

## Keyboard and accessibility

- Every event is a button. Tab reaches it, Enter or Space opens it.
- Booking chips are named "Alex Rivera · Live" as in D, plus "· booked 2 times" when the count shows.
- Post events start with a hidden status word ("Published.") so the colour of the mark is never the only carrier of the status.

## D exceptions

- Stage marks: D's 2px marks are 1.94:1 to 2.3:1 against their fill (Live `#80B09A` is 2.24:1). Each `cal-*-mark` is darkened to 3:1 on its fill and on white. Rule: state marks 3:1.
- Stage names: In revisions `#906F29` (4.37:1), Brief sent `#517298` (4.48:1), Contracting `#856A7B` (4.3:1) and Scheduled `#7D6D9E` (4.05:1) are darkened to 4.5:1 on their fill. Rule: text 4.5:1.
- Post marks: published `#32A77F` (2.81:1 on an outside day), pending `#BF951C` (2.79:1) and draft `#999999` (2.85:1) are darkened to 3:1. Scheduled `#8887BD` already passes. Rule: state marks 3:1.
- Post text in a day: D `#79808B` → `ed-cal-ink` (see MonthGrid).
- The post label Badge wraps inside a narrow day, as D's does.

## Do / Don't

- Do pass the stage word in D's case through `stageLabel` when it differs from the default ("Brief sent").
- Don't add a second colour cue. The mark and fill already say the stage, and the name says it for assistive tech.
- Don't put more than a name and a count in a booking chip. Details belong in the Booking drawer.
