# Checkbox

A 13px checkbox with a label, drawn to match the native checkbox that D renders in Chrome.

## Consumer provides

- `label`, `checked` / `defaultChecked`, `onChange`, `name`, `value`.
- Optional `description` (a muted line under the label), `indeterminate`, `disabled` with `disabledReason`.
- `variant`: `default` (page), `flow` (Ivy flow dialogs, portal consent) or `plain` (unstyled dialogs such as Add a source).

## Anatomy

- Box: 13px (`check-size`), 1px `check-border`, `radius-check` (2px), white.
- Checked or indeterminate: `check-fill` ground and border, `check-mark` tick or dash.
- Hover: border `check-border-hover`. Checked hover: `check-fill-hover`.
- `default` label: 14px/21 in a 22px row, 4px after the box (D's leading space), box 3px down. The text takes the colour of its context (`ink-strong` on the Getting started cards and in Tone of Voice).
- `flow`: 10px gap, 14px/21.7 `flow-ink`, box 5px down. D: "I reviewed the fee and scope.", "I confirm this creator has already been paid externally."
- `plain` (Add a source "Add to the knowledge base"): 16px/24 `ink-overlay`, box 5px down. The description is a plain 16px/24 line 16px below, not indented: "Every agent can draw on it, not just Elliot writing in this voice."
- `default` and `flow` description: 12px/18 `muted`, indented to the label.

## States

- Unchecked, checked, indeterminate, hover, focus (global ring on the box).
- Disabled: box and label at 0.5, reason opaque in `muted` under them.

## Keyboard and accessibility

- A real `<input type="checkbox">` (visually hidden) inside a `<label>`. Space toggles it.
- `indeterminate` sets the DOM property, so assistive tech reads "mixed".
- Description and disabled reason join `aria-describedby`.

## D exceptions

- None in Chrome. D uses the browser's own checkbox with no styling. The DS draws the same box (#767676 border 4.5:1, #0075FF fill 4.2:1) so Safari and Firefox match Chrome.
- The tick is part of the control, not an icon, so the 16px icon floor does not apply.
- The base `checkbox-size` token (16px) is the checklist step circle. D's checkbox is 13px.

## Do / Don't

- Do use it for consent and for choices that wait for a Save or Submit button.
- Do keep the submit button disabled until the consent is ticked, and say so in text.
- Don't use it for a setting that applies at once. Use Toggle.
