# DateInput

A native date field, as in D's Record external payment dialog, sized like a text field.

## Consumer provides

- Every TextInput prop. `value` / `defaultValue` in ISO form (`2026-09-23`).
- `max` / `min`. D: Record external payment sets max and default to today.
- `type="datetime-local"` for a date and time (Edit ritual "Next run").
- Compare the value with `max` yourself. When a date is out of range, disable the submit button and give it a short reason (ENG-3773).

## Anatomy

- A TextInput with `type="date"`, the browser's date segments and calendar button, and tabular figures.
- D's preflight makes the segments one line box tall, so the field matches a text field: 43.7px in `flow`, 36px elsewhere.
- Record external payment: `flow`, label "Payment date", aria-label "External payment date".
- Edit ritual: `plain`, `type="datetime-local"`, label "Next run", value "09/21/2026, 09:00 AM".

## States

- In range and out of range look the same, as in D. The field shows no error of its own.
- A future date keeps "Record payment — no transfer" disabled. The button carries an opaque `muted` reason tied with `aria-describedby`: "Choose today or an earlier payment date to record it."
- Disabled field: 0.5 with its own opaque reason.

## Keyboard and accessibility

- Type into the segments or open the native picker. The picker honours `max`, but typed segments can pass it. The button reason covers that case.

## D exceptions

- D disables "Record payment — no transfer" with no stated reason. The DS adds the reason on the button. Rule: ENG-3773.
- Border as TextInput.

## Do / Don't

- Do default the payment date to today.
- Don't rely on the browser's validation bubble. D never submits the form, so that message never shows.
