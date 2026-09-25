# Notice

A one-sentence confirmation that appears in the page after an action, often with an Undo, such as "Creator review saved.".

## Consumer provides

- The sentence as `children`.
- `action`: a Button ("Undo", "Undo delete", "Dismiss"), or `{label, onClick}`. In the drawer variant the object form renders D's underlined text link.
- `variant`: `banner` (default), `inline` or `drawer`.
- `tone` for the banner fill. D only shows `success` (the default). `info`, `warning` and `danger` reuse D's `surface-note`, `warning-fill` and `reject-hover-fill` grounds for API compatibility.
- `icon` shows a 16px tone glyph before the text. D shows none, so it is off by default.

## Anatomy

- Banner (D `.ws-notice`, Campaigns and Approvals): `notice-fill`, `radius-lg` (8), 10px 16px padding, `notice-banner` text (13px/19.5px, `ink`), action pushed to the right. With the 36px button it is 56px tall.
- Inline (D `.inbox-notice`, Inbox): no fill, 14px/21px `ink`, the action right after the text with a 12px gap.
- Drawer (D `.cr-undo`, creator review footer): `drawer-undo-fill`, `radius-md` (6), 9px 11px padding, `drawer-notice` (Arial 11px/16.5px, `drawer-undo-ink`), underlined "Undo" at the right.

## States

- Shown after the action. D keeps it until the next related action (a chip or thread click in the Inbox, the next review in Campaigns) or until "Dismiss".
- Undo is single-level in D: it reverts only the last change.

## Keyboard and accessibility

- A live region: `role="status"` (tone `danger`: `role="alert"`). Screen readers read the sentence when it appears.
- The action is a real button in the tab order.

## D exceptions

- None of its own. The banner's "Undo" border is the base `control-border` (#858D9E), which clears 3:1 on `notice-fill` as well as on white.

## Do / Don't

- Do write one sentence that names the result ("Thread deleted from Limelight only. Emails are unchanged.").
- Do offer Undo when the action can be reversed.
- Don't stack several notices. Replace the old one.
- Don't use a Notice for a background event. Use the Snackbar.
