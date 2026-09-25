# Tabs

Tabs that switch the sections of a view, drawn either as the campaign's underlined row or as D's grey pill track.

## Consumer provides

- `tabs`: `[{id, label, content?, count?}]`. With `content`, the active tab renders a `tabpanel`.
- `value` / `defaultValue` / `onChange(id)`.
- `variant`:
  - `underline` (default): campaign detail tabs "Creators", "Brief", "Calendar", "Performance".
  - `pill`: D's page tab lists. Examples: "All messages", "Creator responses", "Reply approvals", "Sequences" (Inbox), "Proposals", "Transactions", "Payment methods" (Payments), "Pending", "Approved", "Rejected" (Approvals), "Overview", "Content sources", "Brand voice", "ICP" (Knowledge).
- `label`: the tablist's name ("Campaign sections").

## Anatomy

- Underline:
  - The list is as wide as its tabs, 38px tall, 26px gap, 1px `line` bottom.
  - Each tab is 14px/20 450, padding 8px 0. Inactive tabs use `ink-tab`.
  - The active tab uses `ink-tab-current` and a 2px underline that sits on the list's line.
- Pill:
  - Track 36px (`segmented-height-md`), `surface-subtle`, radius 8, padding 4.
  - Tabs 28px, 14px/20 450, padding 4px 12px, radius 6, `muted`.
  - The active tab is `surface` with `ink`. It has no shadow (D).
- `count` renders a muted figure after the label.

## States

- Active: as above. Inactive: `ink-tab` (underline) or `muted` (pill).
- Hover: none (D).
- Focus: the global 2px `focus-ring`.

## Keyboard and accessibility

- `tablist` / `tab` / `tabpanel` roles, `aria-selected`, roving tabindex (one Tab stop).
- ← and → move and select at once (automatic activation, as D's Radix tabs). Home and End jump to the ends.
- Name the list with `label`.

## D exceptions

| D | DS | Rule | Why |
|---|---|---|---|
| Inactive underline tab #77767C (4.499:1) | `ink-tab` #76767B | Text 4.5:1 | Base exception. |

## Do / Don't

- Do use `underline` only under a detail heading. Use `pill` for page-level sections.
- Do use 2 to 6 tabs.
- Don't use tabs to switch how the same data is shown. Use `SegmentedControl`.
