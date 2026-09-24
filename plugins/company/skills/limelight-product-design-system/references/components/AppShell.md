# AppShell

The four-column app frame: the agent rail, the nav column, the main column with its sticky page header, and the agent panel.

## Consumer provides

- `rail`: an `AgentRail`.
- `sidebar`: a `Sidebar`. Set `navHidden` to drop the column.
- `header`: a `PageHeader`. It sticks to the top of the main column.
- `panel`: an `AgentPanel`. Set `panelHidden` to drop the column.
- `chatWidth`: the live panel width in px (default 300). The panel's resize handle reports it.
- `children`: the page content.
- Give the shell the viewport height. It defaults to `100vh`. Only the main column and the nav column scroll.

## Anatomy

- Grid: `rail-width` 56 | `nav-width` 186 | `minmax(main-min-width 620px, 1fr)` | `var(--chat-width, 300px)`.
- At 1440x900 the columns measure 56 / 186 / 898 / 300, as in D.
- Nav hidden: 56 | main | panel (main 1084 at 1440).
- Panel hidden: 56 | 186 | main (main 1198 at 1440).
- Both hidden: 56 | main (main 1384 at 1440).
- Main content padding is 24px at 1440. Above 1500px it is 28px 30px (D).
- The shell has `overflow: hidden`. Below its min-width the page scrolls sideways. The shell never reflows and never auto-hides a column (decision 7).
- DOM order is rail, nav, panel, main (D). Main and panel are placed by grid column.

## States

- Default: all four columns.
- `navHidden`: the rail's "Hide navigation" button sets it. D does not persist it across a reload.
- `panelHidden`: "Hide assistant" in the panel toolbar sets it. The page header then shows the "Chat with {agent}" pill (`ReopenAssistant`), the only way back. The hide is session-only (decision 5). An agent switch or a reload shows the panel again.
- The panel keeps its width across hide and show.

## Keyboard and accessibility

- Tab order follows D's DOM: rail, nav, panel, then the page header and page content.
- When the panel hides, focus moves to the "Chat with {agent}" pill.
- When the pill shows the panel, focus moves into the panel: to the element marked `data-lla-panel-focus`, else the composer input, else the panel's first control (never the resize separator).
- The shell moves focus only when focus was lost with the control that disappeared. A rail agent switch that re-shows the panel leaves focus on the portrait. Set `manageFocus={false}` to handle focus yourself.

## D exceptions

| D | DS | Rule | Why |
|---|---|---|---|
| Shell min-width 1122px (936px with the nav hidden) while the grid needs 1162px (976px) | min-width = 56 + 186 + 620 + the live chat width | D defect | Below 1162px D clips the panel's right 40px, so "Hide assistant" and "Send" cannot be reached. The DS page scrolls sideways instead. |
| Hide and reopen drop focus to BODY | Focus moves to the pill, then into the panel | Decision 5 | Grant's decision: focus follows the control the user pressed. |

## Do / Don't

- Do pass the panel's live width as `chatWidth`, so the min-width stays right after a resize.
- Do reset `panelHidden` to false on an agent switch and on reload.
- Don't auto-hide the panel or the nav at any width.
- Don't put a second nav column or a second panel in the frame.
