# FullViewDialog

The "Your team · Conversations" dialog that opens the chat at full size, with the conversation history on the left and the thread, "Back to workspace" and a composer on the right.

## Consumer provides

- `open`, `onClose`. It opens from the panel's "Open full view" button or from the history dialog's icon button.
- History: `chats`, `currentId`, `onSelect`, `onTogglePin`, `onNewChat` (see `ConversationHistory`). A pick loads in place and the dialog stays open.
- `children`: the thread (`ChatMessage`, `StatusBubble`).
- `flow`: the active flow card, `RunCard` and `BusyBar`, rendered under the thread.
- `onBack`: "Back to workspace" closes the dialog and keeps the thread in the panel. It defaults to `onClose`.
- `onSend(text)` for the built-in composer, or `composer` to replace it. The full view has no Build with Ivy or Build with Elliot menus.

## Anatomy

- Group D's `Dialog size="full"`: min(1100px, 95vw) by 90dvh (D 1100x810 at 1440x900), title "Your team · Conversations", subtitle "Limelight · Local prototype".
- Body grid: `chat-history-column` (260px) and the rest, 24px gap, no page scroll.
- Left: `ConversationHistory layout="column"`.
- Right: its own scroll with 12px right padding, 14px gap. Both scroll columns keep 5px of inner room (with an equal negative margin, so everything stays at D's positions) so focus rings are never clipped. The thread (12px gap), then flow cards, then the full-width outlined "Back to workspace", then the composer.
- Composer: sticks to the bottom on a white ground with 12px vertical padding. A 36px input ("Ask your team anything…") and the 48x36 primary "Send message" button with `send`, 8px apart.
- Messages and cards take D's portal look here: system face, 16px text, grey user bubbles, borderless agent bubbles, plain shadcn cards.
- With an empty thread, "Back to workspace" and the composer sit at the top.

## States

- Empty and populated threads.
- A run started here behaves as in the panel. With "Agent opens views" on, the app switches agent and destination behind the dialog, which stays open.
- Escape, the close button and the scrim close it (Dialog).

## Keyboard and accessibility

- Dialog traps focus and returns it to the opener.
- The thread has `aria-live="polite"`.
- The input is named "Ask your team". Enter sends. The send button is named "Send message". An empty message does nothing.

## D exceptions

- D's Getting started checklist renders above this dialog and covers the history column. The DS keeps the checklist under every overlay (`z-floating`).
- Input and "Back to workspace" borders: D `#E4E4E7` becomes group D's `control-border-overlay` `#8C8C99` (control borders 3:1).
- The 5px focus room in the scroll columns is a visible-focus fix (WCAG 2.4.7). Positions match D.
- Full view "You" label uses `chat-full-user-label` (see `ChatMessage`).

## Do / Don't

- Do keep the same thread in the panel and the full view. They are one conversation.
- Don't add Build menus to the full view composer. D has none there.
- Don't implement a second dialog frame. Use group D's `Dialog`.
