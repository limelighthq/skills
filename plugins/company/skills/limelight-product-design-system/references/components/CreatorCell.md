# CreatorCell

CreatorCell is the first cell of a creator row: initials, the name as a button with its status badge, the role line and the date the creator was added.

## Consumer provides

- `name` (D's long display name, "Eli Garrison Alexandra Santiago Victoria") and `shortName` ("Eli Garrison").
- `status` in D's words: New, Accepted, Rejected, Contacted, Proposal, Added. It renders UPPERCASE ("NEW"). Or pass `badge` as given.
- `role` ("VP Marketing · series-B SaaS"), `added` ("Added 14 Sept").
- `onOpen`: opens the creator review drawer (the group D `Drawer`, 600px).
- `variant` 1-3 outside a table. Inside a `DataTable` the row number sets the tint.

## Anatomy

- Row: flex, 8px gap, top-aligned.
- Avatar: 26px (`avatar-row`), initials 9px.
- Name button: inline-block on D's 20px line box (so a one-line name sits 1px below the avatar and a wrapped one sits flush, as in D), 13px / 19.5px, weight 500, `ink`, no fill, left-aligned, wraps, max 350px (`person-name-max`). The badge sits inside the button after a space, 10px weight 450, `positive` for NEW, ACCEPTED and CONTACTED, `neutral` for the rest (D's rule).
- Role: 10px / 15px `muted`, 5px above.
- Added: 9px / 12.86px `person-date`, 3px above.

## States

- Hover: none on the name in D. The row tint comes from `DataTable`.
- Focus: the global 2px `focus-ring` at 3px offset around the name button.

## Keyboard and accessibility

- The name button's accessible name is "Review {shortName}" like D. The badge is tied to it with `aria-describedby`, so the status is read too.
- The `title` attribute carries the full display name.

## D exceptions

| D | DS | Rule | Why |
|---|---|---|---|
| Added date #9499A0 | `person-date` #6A7078 | Text 4.5:1 | D is 2.87:1 on white. Base `muted-subtle` passes on white but falls to 4.29:1 on the hovered row. #6A7078 keeps D's hue and clears 4.5:1 on white, hover and selected grounds. |

Initials and neutral badges use the base exceptions: `avatar-N-ink` (D #82766D is 3.80:1) and `neutral-text` (D #77777E is 3.97:1).

## Do / Don't

- Do keep D's long display names. The cell wraps them.
- Do pass the status word and let the cell upper-case it.
- Don't put a second button in the cell. The name is the only way into the drawer from the list.
