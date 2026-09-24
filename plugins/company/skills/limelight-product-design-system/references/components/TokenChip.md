# TokenChip

TokenChip is a small button in the sequence editor that inserts a merge token ("Creator First Name") at the cursor, or turns the "AI Command" helper on and off.

## Consumer provides

- Token (default): the token name as `children` and `onClick` to insert "{{Creator First Name}}". D's row: Spintax Greeting, Creator First Name, Handle, Platform, Niche, Recent Post, Follower Count, Brand Name, Campaign, Sender First Name, More….
- Command: `variant="command"`, `pressed` and `onClick`. It shows the sparkles icon.
- Snippets: `variant="snippets"`, D's neutral command chip next to AI Command.
- Lay chips out in a wrapping row with a 5px gap (8px for AI Command and Snippets).

## Anatomy

- 11px/16.5px Inter weight 500, 5px 8px padding, radius 6, 1px `seq-chip-line`, `seq-chip-fill` ground, `seq-ink-2` label. 28.5px tall.
- Command: `seq-ivy-fill` ground and `seq-ivy-ink` label. Pressed adds a `seq-ivy` border.
- Snippets: `seq-subtle` ground, 1px `seq-snippets-line`, `seq-ink-2` label that stays put on hover.

## States

- Hover: label turns `seq-ivy-ink`.
- Command pressed: `seq-ivy` border and `aria-pressed="true"`.
- Focus: the global focus ring.

## Keyboard and accessibility

- Every chip is a button. Tab reaches it, Enter or Space inserts the token or toggles the command.
- The command chip is a toggle button (`aria-pressed`).

## D exceptions

- Chip border: D `#E8E9ED` (1.21:1) → `seq-chip-line` `#888DA2` (3.29:1). Rule: control borders 3:1.
- Snippets border: D `#E4E6EB` (1.15:1 on its fill) → `seq-snippets-line` `#858EA5` (3.03:1). Rule: control borders 3:1.
- "✦" becomes lucide `sparkles`. Rule: icons are lucide.

## Do / Don't

- Do insert the token where the cursor is and return focus to the field.
- Don't show rendered values on the chips. The EmailPreview shows the values for one creator.
