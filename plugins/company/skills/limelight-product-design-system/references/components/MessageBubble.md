# MessageBubble

One message in an Inbox conversation: a small meta line with the author and time, then the text, in a green-tint bubble when you or Ivy sent it and as plain text when the creator wrote it.

## Consumer provides

- `direction`: "out" (sent by you or by Ivy for you), "in" (the creator) or "internal" (Ivy’s internal payment log).
- `author` ("Ivy", "Alex Rivera", "You") and `meta` ("sent for you · Mon 09:14", "Mon 16:02", "draft, not sent · now · Draft", "Internal payment log · Now"). They join with " · ".
- `children`: the message text. Line breaks are kept.
- `draft` and `onReviewDraft` for an unsent draft. It adds a "Review draft" button.

## Anatomy

- List (wrap bubbles in `<div class="lla lla-msg-list">`): flex column, 20px gap. Above it the page shows "Conversation · 4 messages" (14px/500).
- Every message is at most 90% of the column. Meta: `message-meta` (10.4px) in `muted`. Text: `message-body` (13px/20.8px) in `ink`, 6px above and below.
- Out: aligned right, `inbox-out-fill`, `radius-card` (10px), 12px 16px padding.
- In and internal: aligned left, plain, no fill and no border. The 15:40 build removed the 3px left rule.
- Draft: out, with a 1px dashed `inbox-draft-border` frame on `inbox-draft-fill`, and a secondary "Review draft" button 10px under the text.

## States

- Sent reply: "You · Now". D adds it at the end of the list.
- Draft: "Review draft" loads the text into the reply box.
- After a payment: an internal message "Ivy · Internal payment log · Now" holds the payment sentence and reference.

## Keyboard and accessibility

- The meta line comes first, so a screen reader hears who wrote the message before the text.
- The draft is marked by the words "draft, not sent" and "Draft", not by the dashed frame alone.
- "Review draft" is a normal button in the reading order.

## D exceptions

| D | DS | Rule | Why |
|---|---|---|---|
| Draft frame #7C9B8E (dashed) | `inbox-draft-border` #769689 | State marks 3:1 | D’s frame is 2.82:1 on the draft fill. It is the visible mark that the message is not sent. |

## Do / Don't

- Do keep creator messages plain and left aligned. Only your side gets a bubble.
- Do show drafts in the thread where they will be sent.
- Don't add avatars to messages. D shows none.
- Don't colour the internal payment log like a sent message. It never reached the creator.
