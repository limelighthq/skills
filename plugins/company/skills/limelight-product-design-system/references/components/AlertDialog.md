# AlertDialog

A confirmation dialog for an action that needs a clear yes or no, such as D's "Delete thread from Limelight?".

## Consumer provides

- `open`, `title`, `description` (one paragraph or an array of paragraphs), `confirmLabel`, `onConfirm`, `onCancel`.
- `cancelLabel` defaults to "Cancel". `danger` marks a destructive confirm.
- `children` for extra content under the description. `subtitle` works as in Dialog.

## Anatomy

- The Dialog frame: 512px, scrim, title, subtitle "Limelight · Local prototype", X.
- Description: D's `.ivy-flow` paragraphs, `alert-body` (14px/21.7px, `flow-muted`), 8px above and 14px below each. `strong` names stay bold ("Leo Park").
- Actions: outline "Cancel" (`flow-ink` label) then the primary confirm (`primary-overlay`, 500), 8px apart, start-aligned.

## States

- Focus starts on Cancel, the least destructive choice (D does the same).
- Escape, the scrim and the X call `onCancel`.

## Keyboard and accessibility

- `role="alertdialog"`, `aria-modal`, named by the title and described by the warning paragraphs, so screen readers announce the consequence.
- Tab stays inside. Focus returns to the opener on close.

## D exceptions

- Role and description (non-visual, WCAG 4.1.2 and 1.3.1): D uses a plain `dialog` described by the subtitle → DS uses `alertdialog` described by the warning text.
- Cancel border: #E4E4E7 → `control-border-overlay` (3:1).
- Focus return and close hit area as in Dialog.
- `danger` does not turn the confirm red. D keeps its dark primary for "Delete from Limelight", so the DS does too.

## Do / Don't

- Do say what happens and what does not ("This does not delete emails… No message is sent.").
- Do name the object in the confirm label ("Delete from Limelight", not "OK").
- Don't use it for information only. Use Dialog.
