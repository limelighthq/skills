# ConversationHistory

The list of past chats: a "New chat" button, a search that matches titles only, and one row per conversation with a pin toggle.

## Consumer provides

- `chats`: `{id, title, pinned}`. D seeds "Find creators that match our ICP" (pinned), "Who hasn't posted lately?" and "Counter-offer from Alex Rivera". A thread's title is its first user message, cut to 60 characters, or "New chat".
- `currentId`: the open thread. Its row is grey with "Current conversation".
- `onSelect(id)`: load that thread. D closes the history dialog after a pick and keeps the full view open.
- `onTogglePin(id, pinned)`, `onNewChat()`.
- `onOpenFull()`: the "Open full view" icon button (dialog layout only).
- `layout`: `dialog` inside `Dialog title="Conversation history"`, or `column` for the full view's left column.
- `query` / `onQueryChange` to control the search, or leave it uncontrolled.

## Anatomy

- Portaled content: group D's overlay scope sets the system face, `ink-overlay` text and the 500-weight outlined buttons with `shadow-sm`. This component styles only its own layout.
- Grid with a 12px gap.
- Top row: "New chat" with a `plus` icon on the left, the 50x36 "Open full view" button with `panel-left` on the right.
- Search: 36px input, 4px 12px padding, `control-border-overlay` (group D), `radius-md`, `shadow-sm`, 14px text, "Search chats…" in `muted-overlay`.
- Row: the title button fills the width (10px padding, 42px for one line) and the 34x36 pin button sits 4px to its right. Pinned rows sort first, and the pin glyph is filled.
- Current row: `chat-history-current` ground, and "Current conversation" 8px below the title in `chat-history-meta` type (10px / 14.29px, 500).
- Empty: "No chats match." at 16px / 24px.
- Column layout: no full-view button, its own scroll, 16px right padding and a 1px `chat-full-divider` edge.

## States

- Rows hover like overlay outlined buttons (group D). The current row keeps its ground on hover.
- Clicking the current row does nothing.
- Search matches titles only. "Jordan" appears only inside a message, so it returns "No chats match."
- "New chat" starts an empty thread and keeps the dialog open, so the new "New chat" row appears as current.

## Keyboard and accessibility

- The current row has `aria-current="page"`.
- Pin buttons are named "Pin {title}" or "Unpin {title}", as in D.
- "No chats match." has `role="status"`, so the result of a search is announced.
- Focus moves into the dialog on open and returns to the History button on close (Dialog).

## D exceptions

- "Current conversation": D `#777777` is 4.05:1 on the row ground. DS `chat-history-meta` `#6F6F6F` (Text 4.5:1).
- Row, pin, search and button borders: D `#E4E4E7` becomes group D's `control-border-overlay` `#8C8C99` (control borders 3:1). The overlay scope paints the buttons, this component paints the search input.
- Glyphs: D's "+" text becomes lucide `plus` at 16px. The pin stays 16px, as in D. The "Open full view" glyph rises from D's 16px to 20px, because the button is a standalone 36px icon button (action tier).
- `role="status"` on "No chats match." is a non-visual addition (WCAG 4.1.3).

## Do / Don't

- Do render it inside group D's `Dialog`, never as a page panel.
- Do keep pinned rows first and the current thread in the list.
- Don't search message bodies. D matches titles only.
