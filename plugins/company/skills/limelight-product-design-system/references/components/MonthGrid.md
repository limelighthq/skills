# MonthGrid

MonthGrid lays out a month of calendar days and places each booking or post on its date, for both the Ivy campaign calendar and the Elliot content calendar.

## Consumer provides

- `variant`: `campaign` (Ivy, Campaign › Calendar tab) or `content` (Elliot › Calendar).
- `year` and a 0-based `month` (May 2026 is `year: 2026, month: 4`).
- `events`: each event has an ISO `date` plus the CalendarEvent props for its variant (`name`, `stage`, `count` for bookings, `status`, `time`, `title`, `label`, `owner` for posts).
- `onOpen(event)` opens the Booking drawer or the post detail drawer.
- Content only: `view` (`month`, `week` or `list`), `weekOf` for the week view, `today` (bold day number), and `onCreate(isoDate)` for each day's create button.
- The toolbar stays with the page. Ivy uses a SegmentedControl "Month / Operations". Elliot uses a SegmentedControl "Month / Week / List", the "Previous month" and "Next month" buttons, "Today", "Filter" and the "Hide campaigns" checkbox.

## Anatomy

Campaign (D `.calendar-grid`, measured at 1440):
- Ruled grid of 7 columns, radius 8 (`radius-lg`), 1px `line` rules, white ground.
- Weekday row "MON" to "SUN": `surface-nav` ground, 10px/15px, weight 600, 0.09em tracking, `muted` text, 10px padding (36px tall).
- Day cell: 120px (`cal-day-min-height`), 10px padding, day number 12px `muted` in a 21px line. Leading days outside the month use `cal-outside` and show no number.
- Chips stack under the number with 8px between them.

Content (D `.ed-calendar`):
- 7 columns (`minmax(100px, 1fr)`) with a 9px gap. Sunday first.
- Weekday row "SUN" to "SAT": 11.2px/16.8px, `ed-cal-weekday`, 8px padding.
- Day card: min 140px (`ed-cal-day-min-height`), 1px `ed-cal-line` frame, radius 8, 9px padding, 12px/18px `ed-cal-ink`. Days outside the month use `ed-cal-outside`. `today` sets the number in weight 700.
- Each day ends with a secondary Button "Create new post" (plus icon, 14px/20px, full width, 8px side padding). The label wraps when the day is narrow.
- `view="week"` draws the 7 days of `weekOf`. `view="list"` draws one card per post in the month (radius 12, `line-card`, `shadow-sm`, 24px padding) with the line "2026-07-06 · published" above a full-width post event. An empty month shows "No posts match this month and these filters."

## States

- Chip and post states belong to CalendarEvent (stage colours, status marks).
- Outside days: `cal-outside` (campaign) or `ed-cal-outside` (content).
- Empty list: the plain paragraph above. The campaign "Nothing in this filter" empty state is an EmptyState on the page, not part of the grid.

## Keyboard and accessibility

- The grid is a group named after the month ("May 2026"). Each in-month day is a group named "Friday 1 May" ("Wednesday 15 July, today" for today). Weekday headers are hidden from assistive tech because every day already names its weekday.
- Tab moves through events and create buttons in date order. Enter or Space opens an event.
- Each create button is named "Create new post on 2026-07-06", which contains its visible label.

## D exceptions

- Day number and post text: D `#79808B` (3.98:1) → `ed-cal-ink` `#6C727D` (4.84:1). Rule: text 4.5:1.
- Weekday row: D `#95999F` (2.86:1) → `ed-cal-weekday` `#6E7279` (4.83:1). Rule: text 4.5:1.
- Create button (D defect): D draws the 14px "+ Create new post" button 146px wide in a 114px day, so the next day clips it ("+ Create new p"). The DS button keeps D's 14px/20px label, fills the day and lets the label wrap.
- Accessibility (non-visual): the name "Create post on …" becomes "Create new post on …" so it contains the visible label (WCAG 2.5.3). Days are groups named by date (WCAG 1.3.1).

## Do / Don't

- Do pass real dates. MonthGrid works out the leading days and the rows (5 for May 2026, 6 for the content month).
- Do keep filters (Stage, party tiles, status, owner, label) outside the grid and pass only the matching events.
- Don't restyle chips per campaign. The stage or the status picks the colour.
- Don't hide the create buttons unless the user cannot create posts. Then pass `onCreate={false}`.
