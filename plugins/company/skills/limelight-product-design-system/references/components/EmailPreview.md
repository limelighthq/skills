# EmailPreview

EmailPreview renders one sequence step the way a chosen creator will receive it, with the merge tokens filled in and highlighted, and lets you send yourself a test.

## Consumer provides

- `from` ("Ivy (David Walsh) <david@limelighthq.com>").
- `recipients` as `{value, label}`, where D labels each creator with name and handle (Maya Chen @mayacreates, Leo Park @leobuilds, Priya Nair @priyacodes). Pass `recipient` and `onRecipientChange` too.
- `subject` and `body` with "{{Token}}" placeholders, and `values` for the chosen creator (`{"Creator First Name": "Maya", "Brand Name": "Acme"}`). Reply steps omit `subject` and show "(thread subject)".
- `testEmail`, `onTestEmailChange` and `onSendTest` for "Send test". `onClose` for the close button.
- EmailPreview is the card only. D shows it in its own layer above the Sequence builder Sheet: scrim `rgba(18,18,28,.34)` (`seq-scrim`), card 40px from the top, and Escape closes the preview before the Sheet. The DS does not build that layer yet.

## Anatomy

- Card: 760px (`seq-preview-width`), white, radius 18 (`seq-radius-dialog`), `shadow-toast`. Inter.
- Head: 68.5px. "Email preview" 17px/25.5px weight 600 and the close icon (`seq-ink-3`) share a 31.5px row, 18px 22px padding, 1px `seq-line` rule.
- Meta: 8px 22px padding. Rows From, To and Subject: 64px key in weight 600 `seq-ink-2`, 14px gap, 10px vertical padding, `seq-line` rule. To is a native select (230x32, radius 6, `seq-control-border`).
- Body: 14px 22px margin, 1px `seq-line`, radius 10, 18px padding, 230px minimum, 14px/22.4px, line breaks kept.
- Filled tokens: `seq-ivy-fill` ground, `seq-ivy-ink` weight 600, radius 4, 0 3px padding.
- Footer: `seq-subtle` ground, top rule, 16px 22px padding. The 42px label block: "Send yourself a test" bold over the 12px `seq-ink-3` hint in a 21px line. Then the address field (230x41, radius 9, placeholder `seq-placeholder`) and the `seq-cta` button "Send test" with the send icon.

## States

- Changing To re-renders the subject and body for that creator.
- An empty token value renders nothing, as in D.

## Keyboard and accessibility

- The card is a section named by its title. To has a visible label. The address field is named "Test email address" and described by the hint.
- The close button is named "Close preview".

## D exceptions

- D's address field has only a placeholder. The DS names it. Rule: never rely on the placeholder alone.
- Field borders: D `#D4D9E1` → `seq-control-border`. Hint: D `#777B85` → `seq-ink-3`. Placeholder: D draws the field text at 50% (`#929195`, 3.13:1) → `seq-placeholder` `#77767B` (4.5:1). Rules: control borders 3:1, text 4.5:1.
- "✕" becomes lucide `x` and "➤" becomes lucide `send-horizontal`. Rule: icons are lucide.

## Do / Don't

- Do preview with a real creator from the campaign so every token has a value.
- Don't let "Send test" send to creators. It goes to the address in the footer only.
