# ChatMessage

One message in the agent panel's chat thread, with the name of whoever wrote it ("You", "Ivy" or "Elliot") above the text.

## Consumer provides

- `role="user"` for the person's own messages. Omit `agent` for a user message too.
- `agent` for an agent message. The thread is one shared "Your team" conversation, so set the agent per message. An Elliot reply can sit in the Ivy panel and the reverse.
- `text` for a plain reply ("Four people haven't posted in three weeks, Jordan, Sam, Priya and Chris.").
- `children` for rich content: bold names in Elliot's draft steps ("Drafting as **Sarah**."), a `FlowStepCard frame="none"`, or the `StatusBubble` body.
- `author` only to override the label.

## Anatomy

- Card: white `surface`, 1px `line-insight`, `radius-card` (10px), `shadow-card`, 14px padding. D `.hybrid-bubble` in the panel.
- User message: indented 26px from the left. It keeps the white card (the panel override paints both kinds white).
- Author label: `chat-author` type (11.2px / 16.8px, 400), `muted-overlay`, 8px below.
- Plain text: `chat-text` type (12px / 19.8px), `muted-panel`, `pre-wrap`.
- Rich content: 14px / 21px, `ink`, bold at 700.
- Messages stack with a 16px gap. The panel body already has this gap.
- In `FullViewDialog` the same messages take D's portal look: system face, 16px / 24px `ink-overlay` text, no border and no shadow. User messages get the `surface-subtle` ground and a 12.8px label.

## States

- A message has no hover, focus or selected state. Only the controls inside it are interactive.
- An answered in-message step dims its controls. See `FlowStepCard`.

## Keyboard and accessibility

- Put the thread in a container with `aria-live="polite"` so new replies are announced. `FullViewDialog` does this for you.
- The author label is visible text read before the message, so every message says who wrote it.

## D exceptions

- Full view "You" label: D `#71717A` is 4.4:1 on the grey user bubble. DS `chat-full-user-label` `#6F6F78` (Text 4.5:1).

## Do / Don't

- Do set `agent` on every agent message, even in a thread that mixes Ivy and Elliot.
- Do use `text` for plain replies and `children` only for rich content. The two render at different sizes, as in D.
- Don't add portraits or timestamps to messages. D shows only the name.
- Don't restyle the user message grey in the panel. D paints it white there.
