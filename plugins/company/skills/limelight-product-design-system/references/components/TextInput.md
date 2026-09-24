# TextInput

A labelled single-line text field with an optional hint, error and disabled reason.

## Consumer provides

- `label` (visible, above the field). Use `hideLabel` only in a toolbar or where D shows no label.
- Native input props: `value` / `defaultValue`, `onChange`, `placeholder`, `type`, `name`, `disabled`.
- Optional `hint`, `error` and `disabledReason`. Each is tied to the input with `aria-describedby`.
- `variant`: the D form the field sits in (see Anatomy).

## Anatomy

D draws text fields differently in each form. Pick the variant of the form you are building.

| Variant | D form | Label | Field |
|---|---|---|---|
| `default` | Invite teammate "Email", Edit Ivy, page fields such as Inbox "Search conversations…" | 12px/18, weight 400, 8px above | 36px, padding 4px 12px, 14px/20, `shadow-sm`, radius 6 |
| `toolbar` | Filter bar | usually hidden | as default, 12px/17.14 text |
| `settings` | Team settings "ORGANIZATION NAME" | 10px/15 UPPERCASE, 0.07em, `ink-strong`, 8px above | as default, 13px/18.57 `ink-strong` text |
| `plain` | Edit ritual "Schedule", Add a source "Link" (unstyled dialog labels) | 16px/24, `ink-overlay`, no gap | as default. Hint 12.8px in a 24px line, error 16px/24 |
| `targeting` | Internal campaign targeting "Window" | 14px/21.7, weight 500, `flow-ink`, 8px above | 36px, padding 10px 12px, `radius-flow` 7, `shadow-sm`, value weight 500 |
| `flow` | Record external payment "External reference" | 14px/21.7, weight 500, `flow-ink`, 6px above | 43.7px, padding 10px 12px, `radius-flow` 7, no shadow, value weight 500 |
| `portal` | Creator portal pricing form "Your name" | Arial 14px/22.4, weight 500, 6px above | 44.4px, padding 10px 12px, `radius-flow` 7, no shadow, value weight 500 |

- Borders: `control-border` in the page, `control-border-overlay` inside dialogs (group D), `control-border-flow` for targeting, flow and portal.
- Placeholders: `muted` #686B73 (5.3:1) in the page. In dialogs D's `muted-overlay` #71717A (4.8:1). In flow and portal fields `placeholder-flow` #737574 (4.6:1).
- Hint: 12px/18 `muted` (plain: 12.8px `ink-overlay`, flow: 14px/21.7 `flow-muted`, portal: 14px/22.4 `flow-ink`). Example: "YouTube, Substack, or any public page."
- Error: D prints errors as plain text in the text colour, not in red, and the DS keeps that (`role="alert"`). Reuse D's strings: "Enter a complete link starting with https:// or http://."
- Portal fields stack 14px apart in D (label margin 14px 0). Set that spacing in the form.

## States

- Rest, placeholder, filled, error (`aria-invalid="true"`).
- Focus: the global focus ring (2px `focus-ring`, 3px offset).
- Disabled: the field drops to `opacity-disabled` (0.5). The `disabledReason` line stays opaque in `muted` and is tied to the field.

## Keyboard and accessibility

- The `<label>` is bound with `htmlFor`. Clicking it focuses the field.
- Hint, disabled reason and error join `aria-describedby`, and an error sets `aria-invalid`. D does not link them (listed in exceptions.json as a non-visual fix).

## D exceptions

- Borders: D #DDDFE4 (page), #E4E4E7 (dialogs) and #CED8D1 (flow and portal) are 1.3 to 1.5:1. Each moves to the lightest 3:1 shade of its own hue: `control-border`, `control-border-overlay`, `control-border-flow`.
- Flow and portal placeholders: D renders 50% of the text colour (#929493, 3.05:1). The DS uses `placeholder-flow`, the same hue at 4.6:1.
- Focus: D shows a 1px #9FBFE9 ring, or a 1px #18181B ring in dialogs. The DS uses the global focus ring.

## Do / Don't

- Do put the unit in the label: "Budget ($)", "Relevancy floor (%)".
- Do keep the field enabled and show the error when a value is wrong.
- Don't use the placeholder as the only label.
- Don't colour the error red. D does not.
