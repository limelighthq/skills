# PlatformIcons

PlatformIcons shows which platforms a creator posts on, as D's text marks "in", "𝕏" and "▶".

## Consumer provides

- `platforms`: `linkedin`, `x`, `youtube`, `instagram`, `tiktok`. LinkedIn, X and YouTube render marks. Instagram and TikTok render the words, as D does.
- `tone`: `table` (default) or `inline` for a running text line such as the KanbanCard meta line.

## Anatomy

- Table tone: 16px / 20px, weight 700, `primary` ink (#1E1C22, D `.platform`), marks separated by a space, no wrapping.
- Inline tone: the marks are 16px inside the surrounding text. The words and the rest of the line keep the line's size and colour ("in 𝕏 · 48.2K followers" at 11px `muted`).

## States

Static. No hover or focus.

## Keyboard and accessibility

- The group is one image (`role="img"`) named with the full list: "LinkedIn, X". The marks are hidden from screen readers.
- The same list is the `title` tooltip, like D.

## D exceptions

| D | DS | Rule | Why |
|---|---|---|---|
| Marks at 14px (table) and 11px (Kanban) | 16px | Icon floor | Letter marks are kept as text, raised to the 16px glyph floor. |

## Do / Don't

- Do keep the marks as text. They are D's design, not logos.
- Don't swap in brand logos or lucide icons.
- Don't colour the marks per platform.
