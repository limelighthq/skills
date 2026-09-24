# Visual foundations

## Type

- `font-sans` ("Helvetica Neue", Arial) sets the app. Base text is 14px/21, weight 400 (`body`). D sets `-0.012em` once at 14px, so every element, controls included, inherits -0.168px of tracking.
- D uses six weights: 400 (body), 450 (buttons, nav, badges, controls), 500 (titles, names, stats), 550 (current top-level nav item, checklist meta), 600 (current nav child, menu titles, dialog titles), 700 (platform marks, Payments row names).
- Page titles are `page-title` 26px/500 at `-0.045em`. The campaign detail title is `detail-title` 22px. The agent name in the nav column is `agent-name` 22px. The page header crumb is `crumb` 15px muted.
- Small text: `small` 12px, `caption` 11px, `meta` 10px, `badge` 10px/450, and D's 9px `micro`, `filter-label` and `table-head`. Any text this small must still clear 4.5:1 (see exceptions).
- Table figures use `font-mono` (SFMono) 12px at `-0.04em` with tabular numerals (`number`).
- Portaled dialogs, drawers and listboxes render outside D's brand scope in `font-system` (`dialog-title` 18px/600, `dialog-subtitle` 14px, `dialog-body` 16px). The creator review drawer and the creator portal use `font-arial`.
- The Getting started checklist uses `font-inter` with a `font-serif` (Georgia) title. The sequence builder uses `font-inter`.
- Helvetica Neue, Georgia, Arial and SFMono are system faces: there is no font file. D names Inter first in the checklist and sequence-builder stack but never loads it, so D renders those parts in Arial on any machine without Inter installed. This system keeps D's stack and loads nothing, so it renders the same way. Loading Inter from Google Fonts would widen the checklist by about 8% and wrap some labels.

## Colour

- **Surfaces.** `surface` (white) for main, rail, cards and inputs. `surface-header` (#FCFDFF) for the page header. `surface-nav` (#FAFAFA) for the nav column and table headers. `surface-bar` (#F8FAFF) for the panel toolbar and composer. `surface-panel` (#EAF1FC) under the panel image. `surface-subtle` (#F4F4F5) for segmented tracks.
- **Ink.** `ink` (#1D1D20) for primary text. `ink-strong` (#09090B) inside cards. `muted` (#686B73) for secondary text. `ink-nav` for nav items and `ink-tab` for inactive tabs. `muted-subtle` for the smallest tertiary lines.
- **Lines** are decorative: `line` (#E9EAED) between regions, `line-card` (#E6E7EB) round cards and between rows, `line-insight` round chat bubbles in the panel, `line-panel` round the panel. The insight card itself uses `line`, as D renders it. A line never marks a control on its own.
- **Controls** use `control-border` (3:1 on every ground they sit on).
- **Primary** is `primary` (#1E1C22) with `on-primary` text.
- **Status.** `positive-fill` / `positive-text` (Running, NEW), `score-text` for score and count chips, `warning-fill` / `warning-text`, `neutral-fill` / `neutral-text` (Draft, Paid, tags), `good` for positive deltas, `danger-ink` for destructive text. Every status shows its word. Colour is never the only signal.
- **Agent colour** appears only as the Build-with menu icons and the shared rail ring (`gradient-agent-ring`). The panel ground, the reopen pill and the page chrome are the same for both agents.
- **Gradients:** only `gradient-selected` (selected campaign card), `gradient-progress` (checklist bar), `gradient-agent-ring` (selected rail agent) and `gradient-panel-veil` over the panel image. D uses no other gradient.

## Layout and density

- The app frame is a 4-column grid: `rail-width` 56 · `nav-width` 186 · main `minmax(620px, 1fr)` · `panel-width` 300 (resizable 260 to 440). At 1440x900 it measures 56 / 186 / 898 / 300.
- The page header is `header-height` 64. Main content has 24px padding at 1440.
- Controls are `control-height` 36 (inputs, selects, default buttons, nav items), `control-height-panel` 32 (panel buttons) and `control-height-sm` 30 (header Approvals, bulk bar, sort, Build-with selectors).
- D's gaps are not on a 4px grid. Keep them: 10px in the filter bar, 12 x 14px between campaign cards, 26px between tabs, 4px between nav items, 16px between panel cards. Spacing tokens carry the pixel value in their name (`space-10`, `space-14`, `space-26`).

## Corners and shadows

- Radii: `radius-sm` 4 (badges), `radius-chip` 5 (score chips), `radius-md` 6 (buttons, inputs, nav items), `radius-lg` 8 (segmented tracks, dialogs), `radius-card` 10 (cards, menus), `radius-xl` 12 (metric cards), `radius-popover` 14 (checklist), `radius-panel` 16 (panel), `radius-label` 20 (signature pill), `radius-pill` 22 (reopen pill).
- Shadows: `shadow-sm` on inputs, `shadow-card` on panel cards, `shadow-panel` on the panel's left edge, `shadow-menu` on Build-with menus, `shadow-popover` on the checklist, `shadow-lg` on dialogs and drawers, `shadow-selected` round the selected campaign card.

## Motion

- Buttons change background and border colour over 0.15s. Corners never animate.
- Primary buttons drop to 90% fill on hover. Outlined buttons take `surface-hover`.
- Dialogs, drawers and sheets open and close with no animation (D 15:40 rule).
- Honour `prefers-reduced-motion`: the bundle turns transitions off.

## States

| State | Treatment |
|---|---|
| Hover | Primary: 90% fill. Outlined: `surface-hover` + `ink-hover`. Nav rows that D hovers: `surface-nav-hover` + `ink-nav-hover`. Table rows: a light tint. Row actions: green (accept) or red (reject) tints. The rail and the panel toolbar show no hover, as in D. |
| Focus | A visible ring on every interactive element, portraits included: 2px `focus-ring` at a 3px offset on `:focus-visible` (D's #8FB6E0 darkened to 3:1). Where D draws its own green ring and it already clears 3:1, the system keeps it: `focus-ring-portal` (creator portal, selectable tiles, inline payment) and `focus-ring-inbox` ("View creator"). |
| Selected / current | Nav: `surface-nav-current` + `ink-nav-current` + weight 550 (600 for children). Tab: `ink-tab-current` + 2px underline. Segment: white item. Campaign card: `gradient-selected` + `selected-border` + `shadow-selected`. Rail agent: `gradient-agent-ring`. Also set `aria-current`, `aria-selected`, `aria-checked` or `aria-pressed`. |
| Disabled | 50% opacity (`opacity-disabled`), no pointer events. Exempt from contrast. The reason also appears in opaque `muted` text tied with `aria-describedby` (ENG-3773). |
| Loading | D shows a panel busy bar ("Adding creators" with "Start over") and keeps the layout. |

## Stacking

`z-header` 5 (page header) < `z-resize` 20 (panel separator) < `z-floating` 40 (checklist) < `z-overlay` 50 (scrim, dialogs, drawers, sheets) < `z-snackbar` 90 < `z-menu` 100 (Build-with and kebab menus). The scrim is black at 80% (`scrim`).
