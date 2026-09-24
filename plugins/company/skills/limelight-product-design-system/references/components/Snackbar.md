# Snackbar

A dark bar at the bottom of the screen that confirms a completed action and offers the next steps.

## Consumer provides

- `open`, `title` (bold first line), `message`.
- `actions`: `[{label, onClick, ariaLabel?}]` ("View payments", "View approvals").
- `onClose` adds a "Dismiss" button. `closeLabel` gives it a fuller name ("Dismiss payment confirmation"). `dismissLabel={false}` hides it.
- `variant="toast"` for the sequence builder toast. `duration` sets auto-dismiss in ms (toast default 4200, snackbar default none).

## Anatomy

- Snackbar (D `.inbox-snackbar`): fixed, 24px above the bottom edge, centered, 540px (at most the viewport minus 32px), `snackbar-fill`, `radius-card` (10), 14px 18px padding, `shadow-snackbar`, `z-snackbar`.
  - `snackbar-title` (14px/21.7px, 700, `on-dark`) over `snackbar-body` (400).
  - Actions 10px below, 8px apart: outlined 36px buttons with a `surface` fill, D's `snackbar-action-border` (#DDDFE4, 12.1:1 on the bar) and `ink` labels.
- Toast (D `.seq-toast`): `z-seq-toast` (180), 28px above the bottom edge, up to 520px wide, `seq-toast-fill`, `shadow-toast`, Inter. Title `seq-toast-title` (14px/21px, 700), second line `seq-confirm-body` in `seq-toast-muted`. It slides up 20px and fades in over 0.2s (off with reduced motion).

## States

- Shown until dismissed (snackbar) or for 4.2 seconds (toast).
- Button hover: `surface-hover` with `ink-hover` labels.

## Keyboard and accessibility

- `role="status"`: screen readers announce the text politely. Focus does not move.
- Every action is a real button in the tab order.

## D exceptions

- D DEFECT: the snackbar buttons inherit the bar's white text on their white fill, so "View payments", "View approvals" and "Dismiss" are invisible → DS keeps the white fill and D's #DDDFE4 border and gives the labels `ink` (16.8:1).

## Do / Don't

- Do state the result and the amount ("Payment complete · $2,800 to Alex Rivera").
- Do keep it to one bar at a time.
- Don't use it for errors that block work. Use a Notice or inline text.
