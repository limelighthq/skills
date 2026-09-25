# AgentPanel

The assistant aside on the right of every page: a 64px toolbar, a scrolling body on the shared panel ground, and a composer footer.

## Consumer provides

- `agent`: the RAIL agent. The panel shows that agent on every page, shared pages included (decision 6).
- `children`: the body. On an empty thread: `AgentSignature`, then the destination's card (`InsightCard`, `TaskCard`s, or Elliot's `PanelGreeting` + card), then any `PanelNote`. With messages: the signature, then the thread. One thread spans all pages and both agents. A returning user sees the restored last thread (decision 8).
- `composer`: a `ChatComposer` with both Build-with selectors. Both menus appear on every page.
- Toolbar callbacks: `onNew`, `onHistory`, `onExpand` (Open full view), `onHide`. The "Agent opens views" switch is `opensViews` / `defaultOpensViews` (on) / `onOpensViewsChange`.
- Width: `width` + `onWidthChange` (controlled) or `defaultWidth` (300). Feed the same value to AppShell's `chatWidth` and persist it (D key `limelight-chat-width`).
- `open`: hidden state. It is session-only: a reload or an agent switch shows the panel again (decision 5).

## Anatomy

- Frame: `surface-panel` (#EAF1FC), 1px `line-panel`, radius `radius-panel` on the left corners (16px 0 0 16px), `shadow-panel`. Default width `panel-width` (300px).
- Toolbar: `header-height` (64px), `surface-bar`, 1px `line-bar` bottom, padding 10px 14px, gap 6px.
  - The switch (36x20), then the label "Agent opens views" (11px/16.5px, `ink`, grows to fill).
  - Four `IconButton size="toolbar"` (26x36, `icon-toolbar`, 16px glyphs as in D): New conversation `plus`, History `clock`, Open full view `panel-left`, Hide assistant `chevron-right`.
- Body: padding 20px 16px, gap 16px, scrolls. Ground: `surface-panel` under `gradient-panel-veil` and `var(--lla-panel-image)`, sized `100% 100%, auto 200%`, placed `center, left bottom`, no repeat. Ivy and Elliot share this ground.
- Footer: `surface-bar`, 1px `line-bar` top, padding 14px.
- Resize separator: 10px wide on the left edge (left -5px), full height, `z-resize`. A 3x44 grip in `resize-grip`, `radius-xs`.
- Measured in D at 1440x900: aside 300x900, toolbar 298x64, body 298x727, footer 298x107.

## States

- Resize: 260px to min(440px, viewport − 862px). The maximum follows window resizes.
- Separator hover and focus: the band fills with `resize-hover` and the grip darkens to `resize-grip-hover`.
- Hidden: `open={false}` renders nothing. The page header shows "Chat with {agent}" (AppShell's pill). On reopen, focus moves into the panel (the composer input by default).
- Empty thread: signature, the destination's card, then the composer.

## Keyboard and accessibility

- The aside is a landmark named "{Name} assistant" ("Ivy assistant").
- The separator is `role="separator"`, "Resize assistant", with `aria-orientation="vertical"` and `aria-valuenow` / `aria-valuemin` / `aria-valuemax`.
  - ArrowLeft widens by 20px. ArrowRight narrows by 20px (D).
  - Home jumps to 260px. End jumps to the maximum.
  - Double-click resets to 300px. Pointer drag resizes.
- The switch carries the name "Agent opens views" (D). The visible label is plain text beside it, as in D.
- Decision 5: when `open` goes from false to true, focus moves into the panel: to an element marked `data-lla-panel-focus`, else the composer input, else the aside (tabindex -1). Move focus to the reopen pill on hide.
- Focus rings inside the body use `focus-ring-panel` (core), because they can land on the panel image.

## D exceptions

| D value | DS value | Rule | Why |
|---|---|---|---|
| Grip #C3CEDB | `resize-grip` (base) at rest, `resize-grip-hover` #6581A3 on hover and focus | Control marks 3:1 | D's grip is 1.4:1 at rest and 1.2:1 on the hover band. |
| Separator focus `outline: 0` | Core focus ring | Visible focus | The separator is keyboard operable. Inside the body, core draws the ring in `focus-ring-panel`. |
| Panel clips below 1162px | Consumer grid keeps the panel whole | D defect | The shell owns the fix. |

## Do / Don't

- Do show the rail agent's panel on every page.
- Do persist the width and restore it.
- Don't give Elliot a different ground or a different composer.
- Don't hide the panel automatically. D never auto-hides it.
