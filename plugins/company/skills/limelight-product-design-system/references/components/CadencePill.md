# CadencePill

CadencePill shows when a sequence step goes out: the "Start immediately" pill for the first step, the editable wait before a later step, or the short wait line between steps in the rail.

## Consumer provides

- `variant`:
  - `start`: "Start **immediately**". `children` replaces the bold word.
  - `wait` (default): `amount` and `onAmountChange`, `unit` and `onUnitChange` (units "days", "business days", "weeks", "months"), `time` ("9:00AM") and `onTimeChange`.
  - `mini`: the rail line. Pass the text as `children` ("wait 2 business days").
- Center the start and wait pills above the step block, 18px above it.

## Anatomy

- Pill: `seq-pill-fill` ground, 1px `seq-line`, radius 7 (`seq-radius-control`), 7px 12px padding, 8px gap, 12px/18px Inter `seq-ink-2`. Bold words in `seq-ink`.
- Wait fields: native input and select, 26px tall, radius 6, 1px `seq-control-border`, white, weight 600 `seq-ink`. Amount 46px, send time 74px, the select sizes to "business days".
- Mini: centred row, 6px gap, 11px/16.5px `seq-ink-3`, `corner-down-right` icon, 4px above and below.

## States

- The wait pill edits in place. There is no separate saved state.

## Keyboard and accessibility

- The wait pill is a group named "Wait before this step". Its fields are named "Wait amount", "Wait unit" and "Send time".

## D exceptions

- D's wait fields have no names. The DS adds them.
- Field borders: D `#D4D9E1` (1.42:1) → `seq-control-border` (3.22:1 on the pill). Rule: control borders 3:1.
- Mini line: D `#777B85` (3.92:1) → `seq-ink-3`, and "↳" becomes lucide `corner-down-right`. Rules: text 4.5:1, icons are lucide.

## Do / Don't

- Do use the start pill only on the first step.
- Don't write the wait as free text. Keep the amount, unit and time as separate fields.
