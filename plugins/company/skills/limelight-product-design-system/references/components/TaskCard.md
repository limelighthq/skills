# TaskCard

A suggested task in the assistant panel: a 20px glyph, the task, one line of why, and a small "{Agent} →" link that starts it.

## Consumer provides

- `icon`, `title`, `description`, `agent` (the link label), `onAction`.
- D's Ivy Campaigns / Performance tab shows four, stacked with a 10px gap:
  - `sparkles` "discovery", "Find creators that match a campaign brief", Ivy.
  - `message-circle` "Monitor negotiations", "Where every open deal stands right now", Ivy.
  - `notebook-pen` "Draft content", "A post in one of your team’s voices", Elliot.
  - `lightbulb` "Browse content inspiration", "High-performing posts worth modelling", Elliot.
- Keep D's lowercase "discovery".

## Anatomy

- Card: `surface`, 1px `line-card`, `radius-xl` (12px), `shadow-sm`, padding 40px (D's 16px card padding plus 24px content padding). 266x187 in D.
- Row: flex, gap 14px, top-aligned. The 20px glyph in `task-icon` sits 6px down.
- Title: 16px/23.2px, 500, -0.4px, `ink-strong`.
- Description: 12px/19.8px, `muted-panel`, margin 4px 0 12px.
- Link: 26px tall, no padding, `radius-md`, 11px/15.71px 450 (`task-link` style) in `task-link`, gap 8px, then a 16px `arrow-right` in `task-arrow`.

## States

- Link hover: the link ground turns `surface-hover` (#F4F7FB). The label and arrow keep their colours.

## Keyboard and accessibility

- `section` with an h3. The link is a button named by its label ("Ivy"). The card heading gives its purpose (WCAG 2.4.4 in context).
- Inside the panel body, core draws its focus ring in `focus-ring-panel`.

## D exceptions

| D value | DS value | Rule | Why |
|---|---|---|---|
| Link label #747780 (4.47:1 on white, 4.16:1 on the hover ground) | `task-link` #6E717A | Text 4.5:1 | Lightest shade that passes on both grounds. |
| Link arrow #7695B4 (2.9:1 on the hover ground) | `task-arrow` #7392B2 | Icons 3:1 | Lightest shade that passes on both grounds. The card glyph keeps D's #7695B4. |

## Do / Don't

- Do use it only for tasks an agent can start from the panel.
- Don't put more than one link on a card.
