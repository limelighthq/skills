# Dialog

A modal window over a dimmed page, as D renders its shadcn dialogs: a 512px centered card or the full view.

## Consumer provides

- `open` and `onClose`. Escape, a click on the scrim and the X all call `onClose`.
- `title` ("Add agent", "Conversation history") and `children` for the body.
- `subtitle` is optional. D shows "Limelight · Local prototype" on every dialog, so that is the default. Pass `null` to hide it.
- `footer` for an action row, `size="full"` for the full view, `width` for a wider centered dialog, `label` when there is no visible title, `initialFocus` to pick the first focused element.

## Anatomy

- Scrim: `scrim` (black 80%) over the whole viewport at `z-overlay`.
- Card: 512px (`dialog-width`), `surface`, 1px `line-overlay`, `radius-lg` (8), `shadow-lg`, 24px padding, 16px gap between title, subtitle, body and footer.
- Title: `dialog-title` (system face, 18px/18px, 600, -0.45px, `ink-overlay`).
- Subtitle: `dialog-subtitle` (14px/20px, `muted-overlay`).
- Body: a 16px-gap column. Plain paragraphs are `dialog-body` (16px/24px, `ink-overlay`).
- Close: D's 16px X at `opacity-close` (70%), top right. Hover and keyboard focus raise it to 100%, so the focus ring is drawn at full strength.
- Full view: `min(1100px, 95vw)` wide and 90dvh tall. The body fills the height left under the title.
- The card is portaled to `<body>` and carries the `.lla-overlay` scope (see below).

## The .lla-overlay scope

D portals dialogs and drawers outside its `.brand` scope, so they render with shadcn defaults. Every Dialog, Drawer and AlertDialog root carries `.lla-overlay`, and content inside it takes these values:

- Face `--font-system`, 16px/24px, `ink-overlay` text, normal tracking.
- Buttons: weight 500 with `shadow-sm`. Primary fill `primary-overlay` (#18181B) with `on-primary` labels, 90% opacity on hover. Outline buttons are `surface` with `ink-overlay` labels and turn `surface-subtle` with `ink-hover` labels on hover.
- Control borders are `control-border-overlay` (#8C8C99, D's #E4E4E7 hue at 3:1). Every group reuses this token for D's overlay border.
- Placeholders are `muted-overlay`. Group E styles its fields for this scope.

## States

- Open and closed only. D has no open or close animation (build 15:40), and neither does the DS.
- Focus starts on the first focusable element in the body. With none, it starts on the X.

## Keyboard and accessibility

- `role="dialog"`, `aria-modal`, named by the title and described by the subtitle.
- Tab and Shift+Tab stay inside the dialog.
- Escape closes the top layer only. A menu or select open inside the dialog closes first.
- Focus returns to the element that opened the dialog, also after a scrim click.
- The page behind does not scroll while a dialog is open.

## D exceptions

- Close hit area: D 16x16 → DS 24px box with the same 16px glyph (icon floor). The glyph stays where D draws it. It is drawn at full opacity while focused, so the ring clears 3:1.
- Focus return (non-visual, WCAG 2.4.3): D drops focus to `<body>` on close → DS returns it to the opener.
- Control borders in the scope: #E4E4E7 (1.26:1) → `control-border-overlay` #8C8C99 (3:1 on white, #FAFAFA, #F4F4F5 and #F0F4F9).
- Tall centered dialogs (D defect): D sets no maximum height, so a long dialog runs off the screen → DS caps it at the viewport minus 32px and scrolls it.

## Do / Don't

- Do keep the D copy and the subtitle while the product still shows it.
- Do put actions in `footer` or at the end of the body, start-aligned, 8px apart.
- Don't restyle buttons inside a dialog. The scope already gives them D's overlay look.
- Don't stack a second centered dialog for a confirm. Use AlertDialog, which layers correctly.
