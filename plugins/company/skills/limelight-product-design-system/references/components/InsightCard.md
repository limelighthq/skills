# InsightCard

The destination's card in the assistant panel on an empty thread: an optional eyebrow and badge, the finding, a short reason, stats, tags and up to three actions.

## Consumer provides

- `title`: one sentence that states the finding ("25 of the 42 on Q2 SaaS Growth have never been contacted.").
- `body`: the reason.
- `eyebrow` and `badge`: D's per-destination header.
  - With a badge, the eyebrow is `ink-strong` and the badge sits on the right ("IVY’S READ ON THE WALLET" + "Payment review", "ELLIOT’S READ ON THE PIPELINE" + "2 need your nod").
  - Without a badge, the eyebrow is `muted` ("IVY · INBOX", "IVY · SETTINGS").
  - Knowledge and Getting started have neither.
- `stats` (renders a `StatGrid`), `tags` (neutral full-width badges), `actions` (`[{label, onClick, variant?}]`).
- `actionLayout`:
  - `"row"` (default): 36px outlined buttons that wrap with an 8px gap, 14px below the stats. Payments, Analytics and every Elliot card ("Drafts", "Inspiration", "Open the week").
  - `"stack"`: tags and 32px full-width buttons in a 10px-gap column; the first is primary. The Ivy Campaigns / Creators card ("Q2 SaaS Growth", "DevTools LinkedIn").
- `children`: extra content after the stats, such as the inline `Badge` "Review required" on Payments.

## Anatomy

- Card: `surface`, 1px `line`, `radius-card` (10px), `shadow-card`, padding 16px. 266px wide in a 300px panel.
- Eyebrow row: flex, space-between, gap 16px. Eyebrow 11.2px/16.8px. The badge wraps beside a long eyebrow, as in D.
- Title: `insight-title` (16px/23.2px, 500, -0.4px), `ink-strong`.
- Body: `insight-body` (12px/19.8px), `muted-panel`, margin 10px 0 18px.
- Stats: `StatGrid`, margin 18px 0 14px (collapses with the body's 18px).
- Tags: `Badge block`, 10px, 17.5px tall.
- Buttons: `Button size="panel"` (32px) in the stack; `Button` md (36px) in the row. Outlined labels inherit the card's `ink-strong`.
- The Creators card measures 266x508 in D.

## States

- Shows only while the thread has no messages. New conversation brings it back.
- Buttons use Button's states.

## Keyboard and accessibility

- `section` with an `h3` title (`as` changes the level). Pass `label` to name the region when the title alone is unclear.
- Buttons are ordinary buttons in reading order.

## D exceptions

| D value | DS value | Rule | Why |
|---|---|---|---|
| Button border #DDDFE4 | `control-border` #858D9E | Control borders 3:1 | Base exception. |
| Tag label #77777E | `neutral-text` | Text 4.5:1 | Base exception. |

## Do / Don't

- Do write the title as the finding, not as a label.
- Do keep D's button copy: "Q2 SaaS Growth", not "Open Q2 SaaS Growth".
- Don't use more than three actions.
- Don't mix `stack` and `row` in one card.
