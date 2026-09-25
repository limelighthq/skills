# ProgressBar

A thin horizontal bar that shows how much of a task is done.

## Consumer provides

- `value` (0 to 100) and `label` (the accessible name, for example "Setup progress").
- `variant`: `checklist` (default) or `primary`. `valueText` for a spoken value such as "1 of 5 complete".

## Anatomy

- Checklist (D `.setup-progress`, the Getting started checklist): 4px tall, `radius-md` (6), `checklist-track`, filled with `gradient-progress`. The fill widens over 0.2s.
- Primary (D's shadcn Progress: the Calendar "Waiting on" card and the Getting started page): 8px tall, `radius-full`, `progress-track-primary` (primary at 20%), square-ended `primary` fill.

## States

- Any value from 0 to 100. At 0 only the track shows.

## Keyboard and accessibility

- `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-valuetext` and the label.
- It is not focusable. Pair it with visible text ("20% completed", "64% of this campaign is clear").

## D exceptions

- Primary only (non-visual, WCAG 4.1.2): D's shadcn Progress exposes no `aria-valuenow` → DS sets `aria-valuenow` and `aria-valuetext`. The checklist bar already has D's role, label and values.
- Gradient stops #7C9ECB and #9B8DCB (2.5:1 on the track) → `progress-start` / `progress-end` (3:1), from the base tokens.

## Do / Don't

- Do show the same figure as text near the bar.
- Don't use it for indeterminate loading. D uses the panel busy bar for that.
