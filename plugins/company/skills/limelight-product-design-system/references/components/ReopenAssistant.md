# ReopenAssistant

The mint "Chat with {agent}" pill in the page header that shows the agent panel again after "Hide assistant".

## Consumer provides

- `agent` ("ivy", "elliot") or `agentName`. The label reads "Chat with Ivy" or "Chat with Elliot".
- `onClick`: set the shell's `panelHidden` to false.
- `PageHeader` renders it for you when `panelHidden` is true.

## Anatomy

- 40px tall (`pill-height`): 138x40 for Ivy, 152x40 for Elliot.
- `mint-fill` ground, 1px `mint-border`, radius 22 (`radius-pill`), padding 8px 14px, 8px gap.
- Label: `reopen-label` (14px/20, 600) in `ink`.
- Icon: lucide `panel-right` at 16px. D draws `panel-left` mirrored, which is the same glyph.
- The same mint for both agents.

## States

- Rest: `ink` label.
- Hover: the label moves to `ink-hover`. Ground and border stay (D). Touch devices get no hover.
- Focus: the global 2px `focus-ring`.
- Pressed: the panel returns at its last width and the pill unmounts.

## Keyboard and accessibility

- A native button. Enter and Space activate.
- Accessible name: "Chat with Ivy, show assistant". It starts with the visible text.
- `AppShell` moves focus to the pill when the panel hides, and into the panel when the pill is pressed.

## D exceptions

| D | DS | Rule | Why |
|---|---|---|---|
| `aria-label` "Show assistant" | "Chat with Ivy, show assistant" | Accessibility (non-visual) | WCAG 2.5.3 Label in Name: D's name leaves out the visible text, so "click Chat with Ivy" fails for speech users. |
| Focus drops to BODY on hide and on reopen | Focus moves to the pill, then into the panel | Decision 5 | Grant's decision: focus follows the control the user pressed. |
| Border #96B6A8 (2.16:1) | `mint-border` | Control borders 3:1 | Base exception. |

## Do / Don't

- Do reset the hidden state on an agent switch and on reload (decision 5).
- Don't tint the pill per agent. D uses one mint.
- Don't add a second reopen control anywhere else.
