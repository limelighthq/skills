# ThreadHeader

The header above an Inbox conversation: the creator’s initials and name with a "View creator" link, their role, the campaign in green, and the 32px "Thread actions" menu at the top right.

## Consumer provides

- `initials`, `name`, `role` ("Engineering leader · ex-Datadog"), `campaign` ("Q2 SaaS Growth").
- `onViewCreator`: opens the 600px creator review drawer with the inbox context.
- `menuItems` for group D’s `KebabMenu`: "Hide thread" (`eye-off`) or "Unhide thread", a separator, then "Delete thread" (`trash-2`, `danger`). Delete opens the AlertDialog "Delete thread from Limelight?".

## Anatomy

- Column: flex, 8px gap, 38px right padding for the menu, 20px below. 12px/18px text.
- Link row (a button): `Avatar` (32px) and the name in `thread-name` (13px/700), then "View creator" with a 16px `arrow-up-right` in `inbox-link`, 12px apart.
- Role: 12px/18px `muted`.
- Campaign: 13px/19.5px, 600, `inbox-campaign`.
- Menu: `KebabMenu`, 32 x 32, absolute at the top right.
- Focus on the link: D's own ring, 2px `focus-ring-inbox` at a 5px offset with `radius-sm` corners (4.28:1 on the white conversation).
- At 1440 the header is 550 x 85.5px.

## States

- Hover on the link: the name underlines.
- Hidden thread: the first menu item reads "Unhide thread".
- After Hide: the notice "Conversation hidden. Find it using the Hidden filter." After Delete: "Thread deleted from Limelight only. Emails are unchanged." with "Undo delete".

## Keyboard and accessibility

- The link is a button named "View creator context for Alex Rivera", as in D. It has `aria-haspopup="dialog"`.
- The menu trigger is named "Thread actions". Arrow keys, Home, End, Enter and Escape work inside the menu.
- Tab order: the link, then the menu.

## D exceptions

| D | DS | Rule | Why |
|---|---|---|---|
| "↗" text glyph after "View creator" | lucide `arrow-up-right`, 16px glyph in the 24px box | Icons are lucide, 16px floor | D’s 12px arrow is a text character below the icon floor. |

## Do / Don't

- Do keep the campaign in green under the role. It is the only campaign cue in the conversation.
- Do keep Delete last and in `danger-ink`, after a separator.
- Don't add Hide or Delete buttons next to the name. The 15:40 build moved them into the menu.
