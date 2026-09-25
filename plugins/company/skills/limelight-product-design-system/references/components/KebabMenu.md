# KebabMenu

A 32px "⋮" button that opens a short list of actions for one object, such as D's "Thread actions" menu in the Inbox.

## Consumer provides

- `items` in DropdownMenu's format: `{id, label, icon?, danger?, disabled?, onSelect?}`, `{separator: true}` or `{section}`. D: "Hide thread" (`eye-off`) or "Unhide thread" (`eye`), a separator, then "Delete thread" (`trash-2`, `danger`).
- `label`: the trigger's accessible name. Default "Thread actions".
- Optional `align` (default `end`), `side` (default `bottom`), `width` (default 190), `open` / `defaultOpen` / `onOpenChange`.

## Anatomy

- Trigger: 32x32, `radius-md`, no fill, `ink` glyph `ellipsis-vertical` at 16px in the 24px box. Hover turns the glyph `ink-hover`.
- Menu (group B's DropdownMenu, restyled): 190px, 6px under the trigger and aligned to its right edge, `surface`, 1px `kebab-line`, `radius-card` (10), `shadow-kebab`, 5px padding, `z-menu`.
- Item: `kebab-item` (system face, 14px/21px, 400, `ink-overlay`), 10px padding, `radius-chip` (5), 10px gap, 16px glyph. Hover or keyboard highlight: `kebab-hover`. Danger item text and glyph: `danger-ink`.
- Separator: 1px `kebab-rule`, 4px margin.

## States

- Closed, open, item highlighted (hover or keyboard). D's thread menu has no disabled item.
- Choosing "Delete thread" should open an AlertDialog. Focus returns to the trigger first, so the dialog returns focus there too.

## Keyboard and accessibility

- The trigger has `aria-haspopup="menu"` and `aria-expanded`.
- Enter, Space or ArrowDown opens the menu on the first item. ArrowUp opens it on the last.
- ArrowUp, ArrowDown, Home and End move between items. Typing a letter jumps to a matching item.
- Enter or Space chooses. Escape closes and returns focus to the trigger. Tab closes.

## D exceptions

- None. D's trigger already meets the 24px target and 16px glyph rules. The frame and separator are decorative.

## Do / Don't

- Do put the destructive action last, after a separator, in `danger`.
- Do name the object in the trigger label when a page has several menus ("Thread actions").
- Don't hide an object's main action in the kebab. D keeps it on the page.
