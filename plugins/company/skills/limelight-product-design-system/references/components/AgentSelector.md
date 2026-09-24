# AgentSelector

The "Build with Ivy" and "Build with Elliot" buttons in the composer row, each opening that agent's Build menu.

## Consumer provides

- `agent`: `"ivy"` or `"elliot"`. The label reads "Build with {Name}".
- `items`: the Build menu entries (see DropdownMenu). The selector then opens its own menu above it, right-aligned (`side="top" align="end"`, 8px away), with the agent's tone.
  - Build with Ivy: Create campaign brief, Run a new creator discovery, Monitor negotiations.
  - Build with Elliot: Draft content, Browse content inspiration, a rule, "Quick actions", then the destination's four cards.
- `onSelect(item)`. Without `items`, the selector is a bare trigger: pass `onClick` and `open`.

## Anatomy

- 30px tall (`control-height-sm`), grows to fill (flex 1), 1px `control-border`, `radius-md`, `surface`, padding 6px, gap 4px, centered.
- 18px portrait (`portrait-select`) with the 1px portrait ring.
- Label: `selector-label` (10px/14.29px, 450), `ink`.
- `chevron-down`, 16px glyph (as in D).
- Two selectors share a 270px row with a 6px gap: 132px each at the 300px panel width.

## States

- Hover: `surface-hover` ground, `ink-hover` label.
- Open: `aria-expanded="true"`. D shows no other open style.

## Keyboard and accessibility

- A button with `aria-haspopup="menu"` and `aria-expanded`. Enter, Space or ArrowDown opens the menu on the first item. Escape closes it and returns focus here.

## D exceptions

| D value | DS value | Rule | Why |
|---|---|---|---|
| Border #DDDFE4 (1.33:1) | `control-border` #858D9E | Control borders 3:1 | Base exception. |

## Do / Don't

- Do show both selectors on every page, for either rail agent.
- Don't rename them per page.
