# CountHeader

The header of a team operations page: a small kicker, the page title, a muted subtitle, a big right-aligned count of open decisions, and the filter row under them.

D uses it on Approvals ("6 need your decision") and on Activity (no count). Rituals & Skills hides it and shows its own title and tabs instead.

## Consumer provides

- `title`: "Approvals" or "Activity".
- `description`: "The decisions your agents need from you." or "A record of work across your agents."
- `count`: the live pending count. It matches the header "Approvals" button and the nav count. It ignores the filters. Omit it on Activity.
- `countLabel`: defaults to "need your decision".
- `kicker`: defaults to "LIMELIGHT / YOUR TEAM". Pass `null` to hide it.
- `toolbar`: the filter controls, in D's order. On Approvals: a `TextInput` ("Search work…", 160px, label hidden), three `Select`s ("Filter by agent", "Approval type", "Work order") at `size="md" block` in `flex: 1 1 125px` wrappers, then `Tabs variant="pill"` with Pending / Approved / Rejected. On Activity: the search, "Filter by agent" and "Work order".

## Anatomy

- Heading row: flex, `space-between`, centered, 20px gap, 26px below it.
- Kicker: 10px/500, 0.1em tracking, `ops-kicker`. Type style `ops-kicker`.
- Title: h1, `page-title` (26px/32.5px, 500, -0.045em), `ink`, margins 8px above and 6px below.
- Subtitle: 14px/21px `muted`.
- Count: 34px/51px, 500, -0.05em, `ink`, right aligned, tabular figures. Caption under it: 11px/16.5px, `ops-count-label`.
- Toolbar: flex row, 8px gap, wraps, 14px below. An Approvals list starts 22px under the toolbar.
- The page column is at most `ops-content-max` (1060px) and centered. At 1440 it measures 850px.

## States

- Count at 0: D shows "0 need your decision". The list then shows "You’re caught up."
- The count updates live. It does not animate.

## Keyboard and accessibility

- The title is the page h1. Pass `level` if the page already has one.
- The count and its caption read as one sentence: "6 need your decision".
- Every toolbar control has a name ("Search work", "Filter by agent", "Approval type", "Work order", "Decision status"). The search keeps its label for assistive tech only.

## D exceptions

| D | DS | Rule | Why |
|---|---|---|---|
| Kicker #727782 | `ops-kicker` #717681 | Text 4.5:1 | D's kicker is 4.49:1 on white. |
| Caption #777777 | `ops-count-label` #767676 | Text 4.5:1 | D's caption is 4.48:1 on white. |

## Do / Don't

- Do keep the count equal to the header "Approvals" button and the nav count.
- Do keep the count unfiltered. It answers "how many decisions wait for me", not "how many rows show".
- Don't add a count to Activity. D shows none.
- Don't restyle the toolbar controls. Use `TextInput`, `Select` and `Tabs` as they are.
