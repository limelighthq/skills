# KanbanCard

KanbanCard is one creator on the Creators pipeline board: initials, name, platforms and followers, a role or rate line and the relevancy score.

## Consumer provides

- `name`, `shortName`, `initials` (derived when omitted).
- `platforms` and `meta` ("48.2K followers"). They join as "in 𝕏 · 48.2K followers".
- `detail`: the role ("B2B Growth Strategist · ex-Loom") or the agreed rate ("$1,800").
- `score` and `onOpen` (opens the creator review drawer).

## Anatomy

- Card: shadcn card, radius 12px (`radius-xl`), 1px `line-card`, `surface`, `shadow-sm`, padding 24px. 210px wide in the board.
- The whole content is one button with no fill.
- Person row: 32px initials (`avatar-card`), 10px gap, name 13px / 19.5px weight 700 `ink-strong`, wraps.
- Meta line: 11px / 16.5px weight 450 `muted`, 16px above and below.
- Foot: role or rate 11.2px / 16.8px `ink-strong` on the left, `ScoreChip` on the right, 16px gap.

## States

- Hover: none in D. The cursor turns to a pointer.
- Focus: global `focus-ring` around the button.
- No selected state and no drag. D's board is read-only.

## Keyboard and accessibility

- The button is named "Review {shortName} in pipeline", like D.
- Cards sit in a list inside their column.

## D exceptions

- Platform marks are 16px (see PlatformIcons).

## Do / Don't

- Do open the review drawer on click.
- Don't add drag handles. Ivy moves creators between stages.
