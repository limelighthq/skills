# SkillCard

A card for one skill template in the Skills library: the skill name, what it does, and a "Use template" button that opens the "Configure workflow" drawer.

## Consumer provides

- `name` and `description`. D lists eight static skills, the same for every agent: Find lookalike creators, Draft outreach, Negotiate rates, Score against ICP, Summarise a thread, Build a sequence, Reconcile payouts, Write a campaign brief.
- `draft`: a saved draft. The drawer prefills it, otherwise the description.
- `onSaveDraft(text)`. `onUse` fires when the drawer opens.
- `configureOpen` / `onConfigureOpenChange` only to control the drawer.

## Anatomy

- Card: `surface`, 1px `line-card`, `radius-xl`, `shadow-sm`, 24px padding. At 1440 a card is 415 x 150px.
- Name: h3, 13px/19.5px, 500, `ink-strong`.
- Description: 14px/22.4px `muted`, directly under the name.
- "Use template": secondary, 36px, directly under the description.
- Layout (page level): a 2-column grid with a 20px gap. At 1150px and below D drops it to one column.

Configure workflow drawer (group D’s 640px `Drawer`, title "Configure workflow", subtitle "Limelight · Local prototype"): the skill name as h2 (16px/24px, 400), D's field "Instructions" (the label text, then a 6-row textarea, 212px wide, named "Workflow instructions", with a 1px `control-border-overlay` and 13px padding), "Review and customize this starting point. Execution still requires your approval.", a full-width primary "Save workflow draft", and a status line.

## States

- Drawer opened: the instructions hold the saved draft or the description.
- Blank instructions: "Save workflow draft" is disabled. "Write the instructions to save a draft." says why.
- Saved: the status line reads "Workflow draft saved. Nothing has run." Editing again clears it.
- Reopened: the saved text returns and the status line is empty.

## Keyboard and accessibility

- The card is a `section` named by the skill. "Use template" is described by it and has `aria-haspopup="dialog"`.
- The drawer traps focus and returns it to "Use template".
- The saved line is a `role="status"` region, so it is announced.

## D exceptions

| D | DS | Rule | Why |
|---|---|---|---|
| Textarea with no border | 1px `control-border-overlay` #8C8C99 (3.32:1), padding 13px. D's 212px inline layout is kept. | Control borders 3:1 | A borderless field shows no edge on the white drawer. |
| A blank field disables "Save workflow draft" with no reason | An opaque reason line tied with `aria-describedby` | Disabled explanation (ENG-3773) | The dimmed button must not be the only carrier of why it is off. |

## Do / Don't

- Do keep the label "Use template". The drawer title "Configure workflow" names the next step.
- Do say that nothing runs. A saved draft is only a draft.
- Don't add toggles or run buttons to the card. Recurring work lives in Rituals.
