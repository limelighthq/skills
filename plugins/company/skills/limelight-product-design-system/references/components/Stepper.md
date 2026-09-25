# Stepper

Stepper shows where a booking stands: a six-stage track from Contracting to Live, or the three handoff tiles that say whether it is contracted, paid and reported.

## Consumer provides

- Stage track (default): `steps`, the stage labels in order ("Contracting", "Brief sent", "In progress", "In revisions", "Scheduled", "Live"), and `current`, the index of the booking's stage. Every stage up to `current` counts as done.
- Handoff tiles: `variant="handoff"` and `steps` as `{label, done, detail}`. D's three are Contracted "Omnia · procurement", Paid "Finance" and Analytics submitted "Creator-reported". A step that is not done reads "Not yet · Finance".
- A `label` for assistive tech ("Leo Park booking stage").
- Both live in the Booking drawer (Drawer, 640px). They use the drawer's system face.

## Anatomy

Stage track (D `.booking-steps`):
- Equal columns, 4px gap, 10px/15px system text. Each stage has 24px above its label.
- Dot: 10px circle at the top left, 2px ring. A 2px connector runs from each dot to the next (the last one stops short).
- Not reached: `stepper-todo-ink` label, `stepper-todo-dot` ring on white, `stepper-todo-line` connector.
- Done: `stepper-done-ink` label, filled `stepper-done-dot`, `stepper-done-line` connector.
- Current: weight 650 in `stepper-current-ink`.

Handoff tiles (D `.booking-handoffs`):
- Three columns in a 1px `handoff-line` frame with dividers, radius 8, 12px padding.
- Row: check or minus icon, then the 12px weight 700 label. Detail line 11px `muted-overlay`.
- Icons: check in `handoff-done`, minus in `handoff-todo`.

## States

- Done, current and not reached (stage track). Done and not yet (tiles). Neither variant is interactive.

## Keyboard and accessibility

- The stage track is an ordered list. The current stage has `aria-current="step"`. Other stages add a hidden ", done" or ", not reached".
- Handoff icons are images named "Paid: Not yet" or "Contracted: Yes", as in D.

## D exceptions

- Stage labels not reached: D `#888888` (3.54:1) → `stepper-todo-ink` `#767676` (4.54:1). Rule: text 4.5:1.
- Dot ring not reached: D `#DEDEE2` (1.34:1) → `stepper-todo-dot` `#9393A0` (3.03:1). Rule: state marks 3:1.
- Minus icon: D `#A3A4AD` (2.48:1) → `handoff-todo` `#93949F` (3.01:1). Rule: icons 3:1.
- Handoff icons: D's 15px glyphs → 16px in the 24px box. Rule: icon floor.

## Do / Don't

- Do keep D's six stages and their order. The calendar chips use the same stage names.
- Don't make the stages clickable. The stage comes from the CRM and is not edited here.
