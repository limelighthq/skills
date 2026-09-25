# Select

A single-choice dropdown: a shadcn trigger with an optional inline UPPERCASE label, and a portaled listbox.

## Consumer provides

- `options` (strings or `{value, label, disabled}`), `value` / `defaultValue`, `onChange`.
- `label`: the accessible name ("Sort creators"). Add `showLabel` to show it above the trigger as a field label (Edit Ivy "Autonomy"). Pass `variant="plain"` for Edit ritual "Approval mode" (16px/24 label, no gap).
- `inlineLabel` for the filter bar ("Status" renders STATUS).
- `size`: `toolbar` (36px, 12px text, default), `sm` (30px, 12px, the Sort select) or `md` (36px, 14px, Inbox filter card and dialogs).
- `width` (100 in the filter bar, 150 for Sort) or `block` for full width.
- Optional `hint`, `error`, `disabled` with `disabledReason`, `placeholder`.

## Anatomy

- Trigger in the page (Status, Sort creators, Message filter): 1px `control-border`, `radius-md`, padding 8px 12px, transparent ground, no shadow, text weight 450.
- Trigger in a dialog (Edit ritual, Edit Ivy): 1px `control-border-overlay`, `shadow-sm`, 14px/20 text at weight 400 in the system face.
- Chevron: lucide `chevron-down`, 16px, `ink` at 50% opacity (3.3:1), 13px from the right edge.
- Inline label: 9px/13.5, 0.08em, UPPERCASE, `muted`, 10px before the trigger.
- Listbox (portaled to the body at `z-overlay` like D's Radix listbox, so it uses the system face and opens above a dialog): white, 1px `line-overlay`, `radius-md`, `shadow-md`, padding 4px, 4px below the trigger. Width is the trigger width plus its border, at least 128px (`menu-min-width`).
- Option: 32px (`listbox-option-height`), padding 6px 32px 6px 8px, `radius-sm`, 14px/20 `ink-strong`. Highlighted: `surface-subtle` ground, `ink-hover` text. Selected: 16px `check` 7px from the right.
- D's copy: Status All / New / Accepted / Rejected / Contacted. Sort Relevancy / Newest added / Oldest added. Message filter All messages / Unread / Drafts / Hidden. Approval mode Manual approval / Delayed with veto / Automatic.

## States

- Rest and hover look the same in D. Open: the listbox shows with the selected option highlighted.
- Focus: global ring on the trigger.
- Disabled: trigger at 0.5, opaque `disabledReason` under it ("Review and publish the brief to enable sharing.").

## Keyboard and accessibility

- The trigger is a `combobox` with `aria-haspopup="listbox"`, `aria-expanded` and `aria-activedescendant`. Focus stays on the trigger.
- Its name is the label only ("Status"), as D's `aria-label`. The inline label is linked with `aria-labelledby`.
- Closed: Enter, Space, ArrowDown or ArrowUp open it. A letter selects the first matching option.
- Open: ArrowDown / ArrowUp move, Home / End jump, a letter jumps, Enter or Space picks and closes, Escape closes, Tab closes and moves on.
- Escape and clicks in the listbox are caught before any Dialog sees them, so a Select inside a dialog closes only itself.

## D exceptions

- Trigger border: D #DDDFE4 in the page and #E4E4E7 in dialogs (1.3:1). The DS uses `control-border` and `control-border-overlay`, each the lightest 3:1 shade of D's hue. Rule: control borders 3:1.

## Do / Don't

- Do use it for 3 to 10 options. Use `SegmentedControl` for 2 or 3 views of the same data.
- Do give every Select an accessible name.
- Don't restyle the listbox to the page face. D portals it with shadcn defaults.
