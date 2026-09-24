# Toggle

An on/off switch with an 11px label: D's "Agent opens views" in the panel toolbar.

## Consumer provides

- `label` (or `ariaLabel` when no visible label), `checked` / `defaultChecked`, `onChange(checked)`.
- Optional `disabled` with `disabledReason`.

## Anatomy

- Track 36x20 (`switch-width`, `switch-height`), `radius-full`, 2px transparent border. On: `primary`. Off: `control-border`.
- Thumb 16px (`switch-thumb`), white, `shadow-lg`, moves 16px to the right when on.
- Label: 11px/16.5 `ink`, 6px after the track.

## States

- On, off, focus (global ring on the track).
- Disabled: track and label at 0.5. The reason stays opaque in `muted` under the row and is tied with `aria-describedby`.
- D has no hover change.

## Keyboard and accessibility

- A `button` with `role="switch"` and `aria-checked`. Space or Enter flips it.
- The visible label is a `<label>` bound to the switch, so clicking it flips the switch too. D uses `aria-label` and an unbound span (listed in exceptions.json as a non-visual fix).

## D exceptions

- Off track: D #DDDFE4 (1.3:1) is the only mark of the off state. The DS uses `control-border` #858D9E, the same hue at 3:1. Rule: control borders and state marks 3:1.

## Do / Don't

- Do use it for a setting that applies at once.
- Don't use it inside a form with a Save button. Use Checkbox there.
- D has this one switch. Its other on/off controls (brief access, auto-request) are buttons.
