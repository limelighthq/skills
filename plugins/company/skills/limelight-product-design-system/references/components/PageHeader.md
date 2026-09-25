# PageHeader

The 64px bar at the top of the main column: the destination on the left, the "Approvals [n]" button and, while the panel is hidden, the "Chat with {agent}" pill on the right.

## Consumer provides

- `title`: the destination id. "/" renders as " · ", so "Inbox/Sequences" reads "Inbox · Sequences" and "David Walsh/Posts" reads "David Walsh · Posts".
- `approvals`: the live pending count. It renders the outlined "Approvals [n]" button. `onApprovals` goes to Approvals for the current agent.
- `panelHidden`, `agent` (or `agentName`) and `onShowAssistant`: show the `ReopenAssistant` pill after the Approvals button.
- `actions`: extra controls. They sit before "Approvals".

## Anatomy

- Height `header-height` 64, `surface-header` ground (#FCFDFF).
- 2px `line-header-accent` top line, 1px `line` bottom line.
- Padding 0 24px, 12px gap, sticky at the top of the main column (`z-header`).
- Title: an h3 in `crumb` (15px/22.5, 400, `muted`).
- "Approvals [n]": `Button` secondary, size sm (30px, 12px label), with a `CountBadge`. It sits at the right edge.
- The pill follows it 24px later (12px gap plus 12px margin), at the far right.

## States

- Panel shown: title and "Approvals [n]".
- Panel hidden: title, "Approvals [n]", then "Chat with Ivy" or "Chat with Elliot".
- The title never changes for in-page tabs. D keeps "Inbox" after an Inbox tab click and shows "Inbox · Sequences" only for a deep link.

## Keyboard and accessibility

- The header is a `header` element. The title is an h3 (D). Use `titleAs` for another level.
- "Approvals 6" is one button. Its name includes the count.
- Tab order: "Approvals", then the pill.

## Do / Don't

- Do pass the live count. Don't hard-code "6".
- Do keep the primary action of a view in the page, not in this header.
- Don't add a rail or edge tab to reopen the panel. The pill is the only way back (D).
