# Sheet

A near-full-screen editing surface with a gradient header, as D uses for the sequence builder ("Create sequence").

## Consumer provides

- `open`, `onClose`, `title`, `children`.
- `actions` for header controls before the X (D: a primary Button "Save").
- `dirty` when closing would lose work. Then Escape and the X open the discard confirm first.
- `confirm` to change the confirm copy (defaults are D's), or `false` to skip it. `footer` for an optional bottom bar. `width` to center a narrower sheet.

## Anatomy

- Scrim: `seq-scrim` with a 2px blur at `z-seq-scrim` (140). It ignores clicks, as in D.
- Frame: `z-seq-sheet` (150), 24px from every viewport edge (10px at 850px and below), 1440px at most, `surface`, 1px `seq-sheet-line`, `radius-popover` (14), `shadow-toast`. Face `--font-inter`.
- Header: 70px minimum, 16px 28px padding, `gradient-seq-head`, 1px `seq-line` bottom rule. Title `seq-sheet-title` (18px/27px, 550, -0.45px, `seq-ink`). Actions sit at the right, then the X (34x29, `seq-icon`, turns `seq-ink` on `seq-subtle` when hovered) 4px after them.
- Body: fills the rest and scrolls.
- Buttons inside: D's `.seq-btn`, `seq-button` (12px/18px, 550), 36px, 8px 15px padding, `seq-radius-control` (7). Primary `seq-cta` with a 1px border in its own colour. Outline `seq-control-border`. A primary in the header is at least 84px wide.
- Discard confirm: `seq-scrim-confirm` with a 2px blur over the sheet at `z-seq-confirm` (170). Its backdrop ignores clicks. Card 420px, `radius-xl` (12), 24px padding, `shadow-toast`. Title `seq-confirm-title` (17px/25.5px, 700). Body `seq-confirm-body` (12px/18px, `seq-ink-2`), 20px above the buttons. "Keep editing" (outline) and "Discard changes" (`seq-danger` fill and 1px border, 600, 9px radius, 124px wide) at the right, 8px apart.

## States

- Clean: Escape and the X close the sheet. A scrim click does nothing (D).
- Dirty: the first Escape opens the confirm. A second Escape closes the confirm only, the same as "Keep editing". "Discard changes" closes the sheet. This matches D's Escape layering.
- Save: D shows the Snackbar `variant="toast"` ("Sequence saved.", `z-seq-toast` 180) and closes the sheet 900ms later. The toast stays for 4.2 seconds. The preview does the same.

## Keyboard and accessibility

- `role="dialog"`, `aria-modal`, named by the title. Tab stays inside.
- The confirm is `role="alertdialog"` and starts on "Keep editing". Focus returns to the element that opened it.
- On close, focus returns to the element that opened the sheet.

## D exceptions

- Non-visual (WCAG 4.1.2, 2.4.3): D's sheet has no dialog role, no `aria-modal`, no focus move and no focus trap → DS adds all four and returns focus on close.
- D DEFECT: hovering "Save" turns its fill #F5F6F8 under a white label (the label disappears) → DS keeps the `seq-cta` fill at 85% opacity.
- "Keep editing" border #D4D9E1 (1.42:1) → `seq-control-border` (3:1).
- The X: D's 21px text glyph ✕ → lucide `x` at 16px in the same 34x29 button.

## Do / Don't

- Do set `dirty` as soon as the user changes anything.
- Do keep "Save" in the header, as D does.
- Don't nest a Dialog for the discard question. The Sheet has it built in.
- Don't open a portaled Dialog over the sheet without raising it above `z-seq-sheet`. D's Email preview sits at 160.
