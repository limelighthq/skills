# PostCard

PostCard is an Elliot post in the Content view: the Kanban card with author, date, text preview and the draft's approval button, or the post cell of the List view.

## Consumer provides

- Card (default): `initials`, `name`, `score` (voice fidelity chip, omit for the "new" badge), `date` ("2026-09-03"), `channel` (default "LinkedIn"), `body`, `image` (placeholder), `onOpen` and, for drafts, `action` (`{label: "Send to Jordan for approval", onClick}`).
- Row: `variant="row"`, `title`, `label` ("Tips") and optional `steps`, or a full `meta` line. Put it in the POST column of the DataTable. The other columns are PARTICIPANTS, DATE ("2026-07-06" over "9:00 AM"), STAGE (neutral Badge "Published") and APPROVALS ("David Walsh · Approved").
- The Kanban columns (DRAFT, PENDING APPROVAL, APPROVED, PUBLISHED, REJECTED) come from KanbanBoard `variant="lanes"`. Pass `renderCard: card => h(PostCard, card)`.

## Anatomy

Card:
- White, 1px `line-card`, radius 12, `shadow-sm`, 24px padding. 181px wide in a 205px column.
- Header: 32px Avatar (variant 1), 10px gap, name 13px/19.5px weight 700 (ellipsis past 110px), then the ScoreChip or the neutral Badge "new".
- Date line "2026-09-03 · in LinkedIn": 11px/16.5px weight 450 `muted`, 16px above and below.
- Body: 13px/19.5px weight 450, three lines at most.
- Image placeholder: 110px, `post-image-fill`, 1px `post-image-line`, radius 8, 14px above and below, image icon in `post-image-glyph`.
- Draft action: primary Button under the text, label centred.

Row: a button with the title (14px/20px weight 700, `ink`) over the meta line (14px/22.4px weight 450 `muted`), centred as D renders it.

## States

- The whole top of the card is one button that opens the post. Hover keeps D's look. Focus shows the global ring.
- Draft cards add the action. Other stages have none.

## Keyboard and accessibility

- Tab reaches the open button, then the action. Enter or Space activates.
- The score chip is announced as "Fidelity 89". The placeholder icon is named "Image placeholder" as in D.

## D exceptions

- Placeholder glyph: D's "▧" `#AAAAAA` (2.15:1) → lucide `image` in `post-image-glyph` `#8E8E8E` (3.03:1). Rules: icons are lucide, icons 3:1.
- Draft action: D keeps the button on one line, so "Send to Jordan for approval" runs out of the 131px card body and is clipped. The DS lets the centred label wrap inside the card.

## Do / Don't

- Do use D's action copy ("Send to Sarah", "Send to Jordan for approval").
- Don't show the approval action on cards that are not drafts.
