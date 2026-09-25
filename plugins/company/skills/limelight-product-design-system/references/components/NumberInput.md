# NumberInput

A labelled number field with tabular figures and the browser's native stepper, as in D.

## Consumer provides

- Every TextInput prop, plus `min`, `max` and `step`.
- Put the unit in the label: "Budget ($)", "Relevancy floor (%)", "Sponsored post rate".
- Validate the value yourself and pass `error`. Reuse D's string: "Enter a positive post rate or bundled price, using at most two decimal places."

## Anatomy

- A TextInput with `type="number"` and tabular figures. `inputMode` is `decimal` unless `step` is a whole number.
- `targeting`: Internal campaign targeting "Budget ($)" 24000 (min 0) and "Relevancy floor (%)" 80 (min 0, max 100). 36px, padding 10px 12px, radius 7, `shadow-sm`, 8px label gap, value weight 500.
- `portal`: creator portal "Sponsored post rate", "Optional 30-day paid usage rate", "Bundled price (optional)" (step 0.01). Arial, 44.4px, no shadow, value weight 500.
- `default`: Edit Ivy "ICP floor" and "Spend cap". 36px, 14px/20, 12px label.

## States

- Rest, filled, error, focus (global ring), disabled with an opaque `disabledReason`.
- The native stepper shows on hover and focus in Chrome, as in D.

## Keyboard and accessibility

- Arrow Up / Down step the value (native).
- The error line has `role="alert"`, joins `aria-describedby` and sets `aria-invalid`.

## D exceptions

- Border and placeholder as TextInput (`control-border-flow`, `placeholder-flow`, `control-border-overlay`).

## Do / Don't

- Do allow an empty optional field ("Optional 30-day paid usage rate").
- Don't format the figure with separators inside the field. Show "24000", as D does.
