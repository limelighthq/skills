# AgentRail

The 56px left rail that switches agents, adds an agent, and holds the Hide navigation, Settings and Help tools and the workspace button.

## Consumer provides

- `agents`: `[{id, name, src?}]` in D's order: Ivy, Elliot. Cooper and Lana are silent in D. They follow Elliot and default to their marketing portraits.
- `value` (the selected agent id) and `onChange(id)`.
- `onAdd` for "Add agent" (+). Pass `false` to hide it.
- `navHidden` and `onToggleNav`. The menu button's label reads "Hide navigation" or "Show navigation".
- `onSettings`, `onHelp`, `onWorkspace`. `tools` replaces the three tool buttons.
- `workspaceMenu`: items for the account menu ("YOUR TEAMS", "Account", "Team settings", "Create a team", "Log out", "Prototype index"). The rail renders it with `DropdownMenu`, `side="right"`, `align="end"`: the menu opens to the right of the rail, bottom-aligned with the button (D).
- `logo`: by default the button shows D's CSS mark. A string swaps in an image.

## Anatomy

- 56px wide, `surface` ground, 1px `line` right border, padding 20px 8px.
- Top group, 12px gap:
  - Agent buttons: 40x40, padding 4, radius 50%, with a 34px `AgentFace` portrait centred across (3px each side) and 4px from the top, as in D.
  - "Add agent": 40x36, radius 6, lucide `plus`.
- Bottom group, 14px gap:
  - "Hide navigation" (`menu`), "Settings" (`settings`), "Help" (`circle-help`): 36x36 `IconButton`s, `icon-rail` colour.
  - Workspace button: 36x36, `radius-card`, `primary-workspace` fill. D's mark drawn in CSS: 20x20, two 8x8 corner brackets (top-left, bottom-right) in 3px strokes and a 6px dot at 7,7, in `rail-mark` white.
- The selected agent gets D's 3px ring: a `::before` 5px outside the button, `gradient-agent-ring` at 135deg. There is no side bar.

## States

- Selected agent: ring and `aria-pressed="true"`. Others: `aria-pressed="false"`.
- Hover: none. D shows no hover and no tooltips on the rail.
- Focus: the global 2px `focus-ring`. On portraits it sits at a 6px offset, clear of the selection ring (exception).
- Nav hidden: the menu button's name changes to "Show navigation". The icon stays `menu` (D).
- Settings does not show a selected state, even on the Settings page (D).

## Keyboard and accessibility

- Every button is a native button. Enter and Space activate.
- A portrait's accessible name is the agent name only ("Ivy"), as in D. The portrait inside is `role="img"` named "Ivy" (D). `aria-pressed` carries the selection.
- The rail is an `aside` landmark labelled "Workspace" (D).
- Icon-only controls are named by `aria-label`. D has no `title` tooltips, so none are added.

## D exceptions

| D | DS | Rule | Why |
|---|---|---|---|
| Ring stops #9EDBEA, #A9BFEE, #C7B0E7, #ECC8E7 | `gradient-agent-ring` (ring-1 to ring-4) | State marks 3:1 | The ring is the only mark of the selected agent (base exception). |
| Tool and Add agent glyphs 16px | 20px (`icon-glyph`) | Icon floor | Standalone icon buttons of 36px or more carry the action glyph. |
| No focus ring on the portraits | Global `focus-ring`, at a 6px offset on portraits | Visible focus | At the global 3px offset the ring lands on the 2-5px selection ring (1.18:1). 6px is the smallest offset that keeps them apart. |

## Do / Don't

- Do keep D's order: Ivy, Elliot, then Cooper and Lana.
- Do use the portrait for every agent. Never initials.
- Don't add tooltips or hover tints. D has neither.
- Don't add a selected state to Settings or Help.
