# Sidebar

The 186px nav column: the agent's name and role, UPPERCASE section labels, 36px rows with counts, collapsible groups, and a third-level tree for a team member's pages.

## Consumer provides

- `agent`: `{name, role}`. D: "Ivy" / "Creator outreach", "Elliot" / "Employee advocacy".
- `sections`: `[{label, items}]` with D's labels "WORKSPACE", "TEAM OPERATIONS", "SETUP".
- Each item: `{id, label, count?, current?, href?, icon?, avatar?, note?, children?, expanded?, nest?, actions?}`.
  - `count`: Inbox 12, Payments 3, Approvals 6, or a member's fidelity (David Walsh 91).
  - `children` on a top-level item makes a group toggle (Ivy's "Campaigns", Elliot's "Team"). The toggle only toggles.
  - `nest`: `indent` (default at the top level: Q2 SaaS Growth, DevTools LinkedIn, Customer story), `flat` (Team: Limelight and the members), `tree` (default below: Posts, Sources, Inspiration, Tone of Voice, Content Strategy).
  - `actions` on a group: icon buttons on its header row. Team uses `[{icon:'search', label:'Search team'}, {icon:'plus', label:'Add member'}]`.
  - A second-level item with `children` (a member) navigates and toggles its tree.
  - `avatar`: initials for a 32px `Avatar` ("L", "DW").
  - `note: true` renders "Onboarding in progress" as italic muted text.
  - `icon: 'plus'` with "Add profile" renders D's "+ Add profile".
- `onNavigate(item, event)` fires for every row click. `onToggle(item, expanded)` makes `expanded` controlled.

## Anatomy

- `surface-nav` ground (#FAFAFA), 1px `line` right border, padding 24px 12px, 4px gap, scrolls vertically.
- Identity: name in `agent-name` (22px/27.5 500, -0.77px), role line 11px/16.5 `muted`, max 140px.
- Section label: `section-label` (10px/15, 400, 0.12em, uppercase, `muted`), margin 18px 8px 10px.
- Row: 36px, radius 6, padding 7px 10px, `nav` (13px/450) in `ink-nav`, 8px gap. Counts sit right in `muted`. Rows shrink to 34px when the column overflows (D).
- Group toggle: full width, chevron right (16px lucide `chevron-up` / `chevron-down`).
- Indented children: 12px inset, 4px gap, 10px below the group. Rows 12px/450, padding 7px 9px. The last row sits 6px lower (10px gap).
- Team header row: "Team" with an inline chevron, then two 28x36 icon buttons, spaced apart.
- Tree: 18px inset, 1px `line-nav-tree` left rule, 8px padding. Rows 36px, `nav-tree` (11px/450), centred, no gap.

## States

- Current top-level row: `surface-nav-current`, `ink-nav-current-top`, weight 550.
- Current indented child: `surface-nav-current`, `ink-nav-current`, weight 600.
- Current tree row: `surface-nav-tree-current` (#E9EDF1), `ink-nav-tree-current` (#222), weight 450 (D).
- A member row with a current page shows no highlight of its own (D).
- Hover (D exactly): group toggles ("Campaigns", "Team"), the Team row buttons, indented children (the current one too) and resting tree rows take `surface-nav-hover` and `ink-nav-hover`. Top-level rows, member rows, "Limelight" and "Add profile" never change on hover. The current tree row keeps its colours.
- The last indented row ("Customer story") is always `ink-nav-last`, flush left and 6px lower, even when it is not current. This is D's rendering.
- Collapsed group: chevron down, children removed. Ivy's Campaigns group re-expands when the page becomes Campaigns (the consumer passes `expanded`).
- Focus: the global 2px `focus-ring`.

## Keyboard and accessibility

- A `nav` landmark labelled "Main navigation" (D).
- Rows are buttons, or links when `href` is set. The current row has `aria-current="page"`.
- Group toggles and member rows carry `aria-expanded`. The Campaigns toggle's `aria-controls` points to its list (D).
- A row's name includes its count ("Inbox 12"), as in D.
- Search team and Add member are named by `aria-label`.

## D exceptions

| D | DS | Rule | Why |
|---|---|---|---|
| ⌃ ⌄ ⌕ + as 13px text | lucide `chevron-up`, `chevron-down`, `search`, `plus` at 16px | Icon floor | Indicator glyphs render at 16px in the 24px box. |

## Do / Don't

- Do keep labels to one line at 186px.
- Do keep D's three levels at most: group, row, tree.
- Don't put icons on ordinary rows. D uses text rows.
- Don't route "Getting started" to a page. In D it re-shows the checklist.
