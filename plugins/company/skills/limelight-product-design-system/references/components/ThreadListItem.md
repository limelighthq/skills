# ThreadListItem

One conversation in the Inbox thread list: the creator’s initials and name, the campaign and age, a status badge, the last message, and an "Unread" mark.

Rows are flat (the 15:40 build). Only the selected row has a frame.

## Consumer provides

- `initials`, `name`, `campaign` ("Q2 SaaS Growth"), `time` ("2h ago", "1 day").
- `status`: "Counter-offer", "Draft ready", "Awaiting reply", "Stalled" or "Paid".
- `preview`: the last message. Prefix it "Draft: " for an unsent draft and "You: " for your own reply.
- `unread`, `selected`, `onSelect`.
- `avatarVariant`: D uses tint 1 for every thread.

## Anatomy

- Button: full width, flex column, 10px gap, 14px padding, 8px margin above and below, 12px/18px weight 450 `ink`, no fill.
- Unselected: a 1px `inbox-thread-divider` rule at the bottom only.
- Selected: a 1px `inbox-thread-selected` frame on all sides, square corners.
- Person: `Avatar` (card size, 32px) and the name in `thread-name` (13px/19.5px, 700), 10px apart.
- Meta: "Q2 SaaS Growth · 2h ago", 11px/16.5px, 4px above.
- A neutral `Badge` at its own width.
- Preview: 12px/18px, wraps.
- "Unread": `thread-unread` (9.6px/14.4px).

Thread list column (wrap the rows in `<div class="lla lla-thread-list">`): flex column, 8px gap, 12px padding, 1px `inbox-list-border` on the right. It holds the "Search conversations…" field first.

- Viewport above 1150px: `inbox-thread-col` (260px). The conversation takes the rest (`260px minmax(0, 1fr)`).
- 1150px and below: `inbox-thread-col-compact` (205px).
- 750px and below: one column. The list stacks above the conversation, at most `inbox-thread-list-max` (250px) tall, and scrolls inside.

## States

- Selected: framed, `aria-current="true"`.
- Unread: the "Unread" mark. Viewing a thread does not clear it in D.
- Draft: the preview starts "Draft: ".
- Paid: badge "Paid", preview = the internal payment log.
- Hover: no change, as in D. The pointer shows it is clickable.

## Keyboard and accessibility

- Each row is a button. Tab moves through the rows. Enter or Space selects.
- The selected row carries `aria-current="true"`, so the choice is not carried by the frame alone.
- The avatar is hidden from assistive tech. The row’s name is its text: "Alex Rivera Q2 SaaS Growth · 2h ago Counter-offer …".
- "Unread" is text, so the state is spoken.

## Do / Don't

- Do keep rows flat. The 15:40 build removed the fill, radius and green bar.
- Do search on creator name and campaign only, as D does.
- Don't mark unread with colour or weight alone. Keep the word.
- Don't put actions inside the row. Hide and Delete live in the thread header’s `KebabMenu`.
