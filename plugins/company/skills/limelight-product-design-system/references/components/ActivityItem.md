# ActivityItem

One record on the Activity timeline: a small dot, a meta line with the agent and time, the title, one line of detail, and a "View record" button.

## Consumer provides

- `agent` ("Ivy", "Elliot"), `time` ("07:18 PM") and optionally `dateTime` for the `<time>` element.
- `example`: true for D’s seeded records. It adds " · Example" to the meta line ("Ivy · Example · 07:18 PM"). Real records omit it ("Ivy · 07:53 PM").
- `title` ("Discovery completed", "Payment completed: Alex Rivera", "Mei Lin: Rejected").
- `detail` ("Q2 SaaS Growth: 12 creators matched the brief. Five shortlisted for review.").
- `onView`: opens the record in `ApprovalReviewDrawer` with `kind: "Activity record"`. Pass `null` to hide the button.

## Anatomy

- Row: flex, 12px gap, 14px top and bottom padding, 1px `line` divider at the bottom. At 1440 a row is 850 x 140px.
- Dot: 8px circle, `ops-activity-dot`, 6px from the top.
- Meta: 11px on a 21px line, `muted-subtle`.
- Title: h3, 15px/22.5px, 500, `ink`, 4px above and below.
- Detail: 13px/19.5px `muted`, 4px above and below.
- Button: secondary, 36px tall, 11px label, 4px 8px padding.

## States

- Newest first by default. "Oldest first" reverses the order. The page owns the sort, the search (title and detail) and the agent filter.
- New records (decisions, ritual runs, payments, creator reviews) are prepended.
- Empty (page level): "No activity yet." / "Review an approval or run a ritual to see its outcome here." with "View rituals". D shows it only when a search or filter excludes everything.
- Waiting ritual actions sit above the list as `PendingActionCard`s.

## Keyboard and accessibility

- Each record is an `article` named by its title.
- The dot is an empty decorative span. Every record gets the same dot, so it carries no status.
- "View record" is described by the title and has `aria-haspopup="dialog"`.

## D exceptions

| D | DS | Rule | Why |
|---|---|---|---|
| Meta #7A8189 | `muted-subtle` #71777F | Text 4.5:1 | D’s meta is 3.94:1 on white. The fix lands exactly on the base tertiary grey. |

The dot keeps D’s #93B7A4 (2.2:1). It is decorative, so the 3:1 mark rule does not apply.

## Do / Don't

- Do write the title as the outcome ("Approved: Reply to Maya Chen", "Delayed action cancelled").
- Do keep " · Example" on seeded rows only.
- Don't colour the dot by status. If a record ever needs a status, add a `Badge` with words.
- Don't make the row itself clickable. "View record" is the only action.
