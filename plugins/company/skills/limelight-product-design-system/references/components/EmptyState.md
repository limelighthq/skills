# EmptyState

The message a list, table, board column or panel shows when it has nothing to display, in D's own words.

## Consumer provides

- `variant` for the context (below), `title`, the body sentence as `children`, and one optional `action` (a Button).
- `bodyId` to link a disabled control to the body with `aria-describedby` (the gated pattern).
- Optional `as` for the heading element and `icon` (D shows no icons).

## Variants and anatomy

- `center` (default, D `.empty`): tables, calendar, performance. 40px padding, centred, `muted` 14px/21px. Title 500. Example: "Nothing in this filter" / "No deliverables match it in May 2026." / primary "Clear filters". A body alone: "No creators match these filters."
- `card` (D `.ops-empty`): Approvals and Activity. 1px dashed `line-empty`, `radius-card`, 65px 24px padding, centred. Title `empty-title` (19px/25.65px, 500, `ink`, 14px above). Body `muted`, 12px above and 22px below the outline button. Examples: "You’re caught up." / "Your agents will bring the next decision here." / "View activity". Add class `compact` for D's Activity version (13px `ink` body, 4px margins).
- `inline` (D `.inbox-empty`): the Inbox thread list. 16px 4px padding, left-aligned `ink`. "No matching conversations" / "No campaigns match these filters." / "Show all conversations".
- `column`: a Kanban column with no cards. The word "Empty" in `muted` 14px.
- `flow`: gated copy in Ivy flows, 14px/22.4px `flow-muted`. "Publish a reviewed brief in Campaigns → Brief before creating pricing requests."
- `text`: a plain line inside an overlay, inheriting the overlay's 16px/24px ink. "No chats match."
- `drawer` (D `.cr-empty`): in the creator review drawer. 1px dashed `drawer-empty-line`, `drawer-empty-fill`, `radius-card`, 15px padding. Title 12px, 500, `drawer-empty-title`. Body 11px/17.6px `drawer-meta`. "No partnerships in this sample".

## States

- Filtered empty (offer "Clear filters" or "Show all conversations"), caught up (offer the next place to look), gated (explain what unlocks the feature).

## Keyboard and accessibility

- The title is a real heading (h3, h2 for `card`), so screen-reader users find it.
- Gated pattern (ENG-3773): when a control is disabled because of the gate, give the explanation a `bodyId` and point the control's `aria-describedby` at it. The preview shows "Create pricing request" disabled and described by the gate sentence.

## D exceptions

- Drawer body text: D #96909E (3.0:1) → `drawer-meta` (4.75:1 on the drawer fill).
- Gated copy: D shows the disabled button and the reason without a programmatic link → DS links them (ENG-3773).

## Do / Don't

- Do say why the view is empty and offer one next step.
- Do reuse D's strings where D has them.
- Don't add illustrations or agent-named copy that D does not have.
