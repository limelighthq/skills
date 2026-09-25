# StepRail

StepRail is the left column of the sequence builder: a recommendation, the Stop on reply switch, the list of steps with the waits between them, and "Add step".

## Consumer provides

- `steps`: `{title, from, thread, when, wait, needs}`. D's Focused outreach template: "Step 1: Email" from david@limelighthq.com, "Start immediately", then three replies ("Reply in same thread", "Jun 10, 9:00 AM (-03)"), each after "wait 2 business days" or "wait 4 business days".
- `active` and `onSelect(index)` to open a step in the editor.
- `stopOnReply` and `onStopOnReplyChange`. `note` (default "We recommend at least 3 steps in your sequence.", `false` hides it). `onAdd` for "Add step".
- The rail sits inside the Sheet, beside the step editor.

## Anatomy

- Column: 280px (`seq-rail-width`), `seq-rail` ground, 1px `seq-line` right edge, 22px 18px padding. Inter.
- Note: `seq-reco-fill`, 1px `seq-reco-line`, radius 10, 13px 14px padding, 12px/19.2px weight 500 `seq-reco-ink`, 14px below.
- Stop on reply: white box, 1px `seq-line`, radius 10, 13px 12px padding, 9px gap, 16px below. The switch, then 11px/17.6px `seq-ink-2` text with "Stop on reply." in bold `seq-ink`.
- Switch: D's builder geometry on group E's Toggle markup. Track 34x20, full radius, `seq-switch-off` when off and `seq-ivy` when on. White 16px knob 2px in, `seq-shadow-knob`, moves 14px when on.
- Step: white button, 1px `seq-line`, radius 10, 15px 12px 15px 30px padding, 6px below. Grip icon top left in `seq-ink-3`. Tag "Step 1: Email" 12px/18px weight 700 on `seq-tag-fill`, radius 6. Two meta lines (mail and clock icons) 12px/18px `seq-ink-2`, 8px apart.
- Active step: `seq-active-line` border, `seq-active-fill` ground, `seq-shadow-active` halo.
- Waits between steps: CadencePill `variant="mini"`.
- Add step: dashed `seq-control-border`, radius 10, 13px padding, 14px weight 600 `seq-ink-2`, plus icon, 10px above.

## States

- Step hover: `seq-hover-line` border. Active: as above, with `aria-current="step"`.
- A step that is missing something shows an amber line with a warning icon (`seq-amber`).
- Add step hover: `seq-ivy` border and `seq-ivy-ink` label.

## Keyboard and accessibility

- The rail is a region named "Sequence steps". Steps are buttons in an ordered list, so Tab and Enter open them.
- The switch is named "Stop on reply".

## D exceptions

- D's steps are divs with a click handler, so the keyboard cannot reach them. The DS makes each step a button.
- D's switch has no name. The DS names it "Stop on reply".
- Active border: D `#94BDA9` (1.96:1) → `seq-active-line` `#609C7F` (3.03:1). Rule: state marks 3:1.
- Add step border: D `#D4D9E1` (1.42:1) → `seq-control-border` `#808FA7`. Rule: control borders 3:1.
- Needs line: D `#A16B13` (4.25:1 on the amber fill) → `seq-amber` `#9C6712` (4.51:1). Rule: text 4.5:1.
- Tertiary text and grip: D `#777B85` (3.92:1 to 4.24:1) → `seq-ink-3` `#6D717A`. Rule: text 4.5:1.
- Emoji and text marks become lucide: "📨" `mail`, "🕒" `clock`, "⠿⠿" `grip-vertical`, "＋" `plus`, "⚠" `triangle-alert`.
- Switch track when off: D `#D4D9E1` (1.42:1) → `seq-switch-off` `#8795AB` (3.0:1 on white). Rule: controls 3:1.

## Do / Don't

- Do keep the wait line above the step it delays.
- Don't reorder steps from the rail without a keyboard path. D shows a grip but has no reorder.
