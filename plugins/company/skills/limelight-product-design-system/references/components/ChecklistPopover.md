# ChecklistPopover

The floating "Getting started" card that tracks the five setup steps and moves where the user drags it.

## Consumer provides

- `steps`: `[{label, state?, hint?}]`. `state` is `done`, `current` or `todo`. Without a `current`, the first step that is not done is current.
- `onStep(index)`: D marks the step done and navigates.
- `onClose` shows the Dismiss button. `floating` makes it a fixed, draggable card.
- Optional `minimized` / `defaultMinimized` / `onMinimizedChange` (or the older `onMinimize`), `position` / `defaultPosition` / `onPositionChange`, `percent`, `completeText`, `title`, `label`.

## Anatomy

- Card: 280px (`checklist-width`), `surface`, 1px `checklist-border`, `radius-popover` (14), `shadow-popover`, 16px padding, Inter 13px/19.5px `checklist-ink`, -0.168px tracking.
- Header: "20% completed" (`checklist-meta`, 11px, 550), "Getting started" (`checklist-title`, Georgia 18px/24.3px, 600, 3px below), the `grip-horizontal` grip at the top right of the drag area (`checklist-grip`), then Minimise / Expand (`chevron-down` / `chevron-up`) and Dismiss (`x`) in 24px boxes (`checklist-icon`).
- Progress: the checklist ProgressBar, 12px above and below.
- Steps: 36.2px rows, 9px 5px padding, 10px gap, 13px/18.2px weight 450 `checklist-step`.
  - Done: 16px circle filled `checklist-done` with a white 11px check, label struck through.
  - Current: `checklist-current-ring` circle, label 600 `checklist-current`, a `chevron-right`, and the hint below (12px/19.8px `checklist-hint`, indented 31px).
  - To do: `checklist-todo-ring` circle.
- 100%: every step done, then "All set. You can revisit any step." in the hint style.
- Minimised: header and progress bar only (109px tall).

## States

- Expanded (D starts at 20%: "Connect your accounts" is done), minimised, 100%, dismissed (the consumer stops rendering it), dragged.
- Hints D uses: "Run discovery against a campaign brief, then save the ones worth approaching." and "Each person gets a voice profile Elliot writes against.", among others.

## Keyboard and accessibility

- `role="region"` named "Getting started checklist". It is not modal and does not trap focus.
- The drag handle is a button ("Move Getting started panel"). Arrow keys move the card 20px. Shift does the same.
- Pointer drag moves it. The card stays 8px inside the viewport on mount, on window resize and on expand, as in D.
- Minimise has `aria-expanded`. Each step says "(done)", "(current step)" or "(to do)" to screen readers, and the current step has `aria-current="step"`.
- Escape does nothing, as in D. The card is a non-modal region, so there is nothing to close.

## D exceptions

- Stacking: D z 80 puts the card above every modal and scrim → `z-floating` (40), under all overlays.
- Position: D starts at left 12, top = viewport height minus 420, where it covers the rail's Hide navigation, Settings and Help → DS default left = rail width + 12 (68px), same top, clamped inside the viewport (decision: keep it below modals and clear of the rail tools).
- Minimise and Dismiss: D 18x18 with 14px glyphs → 24px boxes with 16px glyphs. The two boxes overlap 2px so the drag area keeps D's 202px width and the glyph centres stay put. The grip and chevron: 13px → 16px.
- Marks: to-do ring #D9DDE4, current ring #789DD0, done fill #68A58A, grip #AFB5C0 and the percent line #717888 darken to the base `checklist-*` tokens (3:1 marks, 4.5:1 text).
- The check inside a done circle stays 11px. It is part of the 16px state mark, not a standalone icon.

## Do / Don't

- Do keep the five D steps and their order.
- Do let the nav "Getting started" item re-show the card expanded, as D does.
- Don't place it over the rail tools or above a dialog.
