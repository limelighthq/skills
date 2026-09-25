# RadioCardGroup

A fieldset of RadioCards for one exclusive choice, such as D's Member / Admin role in Invite teammate.

## Consumer provides

- `options`: `[{value, title, description, disabled}]`. `title` falls back to `value`.
- `value` / `defaultValue`, `onChange(value)`.
- `label` for the legend (`hideLabel` keeps it for assistive tech only, as D shows no legend).
- Optional `name`, `disabled` with `disabledReason`.

## Anatomy

- A borderless `<fieldset>` with a 12px/18 legend (`field-label`).
- Cards stack in a 14px grid with 12px block margin each, so they sit 38px apart, as D's settings form spaces them.
- D's copy: "Member" / "Can use agents and run campaigns.", "Admin" / "Can manage members, billing, and agents."

## States

- One card checked at a time. Disabled group: every card at 0.5 and one opaque reason under the group.

## Keyboard and accessibility

- Tab enters the group on the checked card. Arrow keys move and select (native radios).
- The fieldset gets `aria-describedby` for the disabled reason. D has no fieldset or legend (listed in exceptions.json as a non-visual fix).

## D exceptions

- None.

## Do / Don't

- Do keep a default choice checked ("Member").
- Don't mix RadioCards with plain radios in one group.
