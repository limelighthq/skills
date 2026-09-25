# Drawer

A full-height panel that slides over the right side of the page for detail and review work.

## Consumer provides

- `open`, `onClose`, `title`, `children`.
- `variant`: `review` for D's 600px creator review, `default` for D's 640px side dialogs (booking, approvals, post detail, configure workflow). It is inferred from `eyebrow` or `width={600}` when omitted.
- Default variant: `subtitle` (defaults to "Limelight · Local prototype") and `footer` (an action row at the end).
- Review variant: `eyebrow` ("CREATOR REVIEW", pass D's case), `initials` or `media` for the 44px avatar, `subtitle` (the role line), `header` (status row and metrics), `notice` (a Notice `variant="drawer"`), and `footer` as an array of two groups: decisions and pager.

## Anatomy

- Frame: right edge, full height (100dvh), `surface`, 1px `line-overlay`, `shadow-lg`, over the `scrim`. Width `min(600px, 100vw)` for review, `min(640px, 94vw)` for default.
- Default: 24px padding, 16px gap, `dialog-title` and `dialog-subtitle` as in Dialog. The whole panel scrolls.
- Review (Arial, `drawer-*` palette):
  - Header: 22px 28px 0 padding, 1px `drawer-line` bottom rule. Eyebrow `drawer-eyebrow` (10px/15px, 600, 0.1em, `drawer-muted`), 20px below it the identity row: 44px avatar (`drawer-avatar-fill` / `drawer-avatar-ink`), 13px gap, `drawer-title` (21px/27.3px, 600, -0.5px, `drawer-ink`) and `drawer-sub` (12px, `drawer-muted`, 4px above).
  - Body: scrolls on its own (22px 28px 28px padding, overscroll contained). Header and footer stay put.
  - Footer: 15px 22px padding, 1px `drawer-foot-line` top rule, `shadow-drawer-foot`. The notice sits 12px above the actions. Groups spread to both ends, 7px between buttons. Buttons use `drawer-button` (Arial 11px, 500). The primary fill is `drawer-primary`. Pager buttons have 10px side padding. An icon-only pager button ("Previous creator") is 36x36.
  - Helper classes: `lla-drawer-saved` (add `rejected`) for the saved status text ("Rejected" in `drawer-rejected`), `lla-drawer-note` for a short opaque note in the footer (11px `drawer-muted`).
- Close: the Dialog X, 16px glyph in a 24px box, 16px from the top and right inner edges.

## Drawer palette for content owners

Text in the review drawer uses these tokens: `drawer-ink` (names, figures, headings), `drawer-body` (post text), `drawer-muted` (eyebrow, role, metric labels, white ground only), `drawer-note` (section notes, fit-detail terms), `drawer-take` ("IVY'S TAKE"), `drawer-campaign` ("For Q2 SaaS Growth"), `drawer-meta` ("Sample insights", "Sample content", "/100", post meta and stats).

## States

- Open and closed. No slide animation (D 15:40).
- Focus starts on the first focusable element (D: "View fit details").
- First creator: D disables "Previous creator" (50% opacity). The DS keeps that and adds the opaque note "This is the first creator." (`lla-drawer-note`), linked with `aria-describedby` (ENG-3773). The last creator disables "Next" the same way.

## Keyboard and accessibility

- `role="dialog"`, `aria-modal`, named by the title. Tab stays inside.
- Escape, the scrim and the X close it. Focus returns to the opener.

## D exceptions

- Text contrast (4.5:1): "Sample insights" #96909E (2.86:1) and the other tertiary tags → `drawer-meta` #756E7E. Section notes #807987 → `drawer-note` #756E7B. "IVY'S TAKE" #777087 → `drawer-take`. "For Q2 SaaS Growth" #81798E → `drawer-campaign`.
- Footer outline button borders: #E4E4E7 → `control-border-overlay`.
- "Previous creator" disabled reason: added opaque text (ENG-3773).
- Close hit area and focus return (non-visual) as in Dialog.

## Do / Don't

- Do keep D's header layout and put the status chip, social links and metrics in `header`.
- Do keep the footer to one decision group and one pager group.
- Don't put a second scroll area inside the review body.
- Don't use the review palette in the default drawer. Default drawers are plain shadcn.
