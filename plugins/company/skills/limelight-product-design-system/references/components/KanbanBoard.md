# KanbanBoard

KanbanBoard lays records out in stage columns with a title and a count per column, and accepts any card renderer.

## Consumer provides

- `columns`: `{id, title, count?, cards, empty?}`. The count defaults to the number of cards.
- `renderCard(card, column)`: defaults to `KanbanCard`. Elliot's content board passes `PostCard` (group H).
- `variant`: `pipeline` (default, Creators) or `lanes` (Elliot content).
- `summary`: the line above the board ("26 creators · moved by Ivy as each stage clears").
- `label`: region name. `emptyText` (default "Empty").

## Anatomy

Pipeline (D `.pipeline-board`):
- One column per stage, each at least 210px (`kanban-column`), 12px gaps, 18px bottom padding, scrolls sideways.
- Column: flex column, 12px gap. Head: title 13px / 19.5px weight 500 `ink`, count chip (`CountBadge`, `positive-fill` / `score-text`) on the right.
- D's Creators board has 5 stages: Discovered, Vetted, Approved, In negotiation, Active. There is no Rejected column.
- Summary: 14px / 21px `muted`, directly above the board.

Lanes (D `.ed-board`):
- Columns at least 205px (`kanban-lane`), `kanban-lane-fill` ground, radius 12px, padding 12px. Head at least 36px tall with an 8px gap. D's titles are UPPERCASE in the data ("DRAFT", "PENDING APPROVAL").
- Summary: 14px / 22.4px `ink`, 22px above the board.

## States

- Empty column: "Empty" in 14px `muted` under the head. The count shows 0.
- Overflow: with the assistant open, D's 5 columns overflow the 850px main column and the board scrolls.

## Keyboard and accessibility

- The board is a named region and takes focus so keyboard users can scroll it.
- Each column is a `section` labelled by its `h3`. The count is read as "Count 21".
- Cards are list items.

## Do / Don't

- Do keep D's stage order and names.
- Do show "Empty" instead of hiding a column.
- Don't add drag and drop. D has none.
