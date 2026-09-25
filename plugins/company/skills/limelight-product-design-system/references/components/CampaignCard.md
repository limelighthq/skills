# CampaignCard

CampaignCard summarises one campaign above the campaign detail: its name, status, pipeline size and three outreach stats.

## Consumer provides

- `name` ("Q2 SaaS Growth"), `status` ("Running", "Draft"), `subline` ("42 creators in pipeline").
- `stats`: three `{value, label}` items, Contacted, Replied, Signed.
- `selected` and `onSelect`.
- Lay cards out with `CampaignGrid`.

## Anatomy

- 274 x 146.5px at 1440 (a third of the 850px grid). Radius 10px (`radius-card`), 1px `line-card`, `surface`, padding 14px.
- Heading: flex, wraps, 5px gap. Title button 13px / 18.57px, weight 450, -0.025em, `ink`, 24px tall, no fill. Status `Badge`: Running is `positive`, Draft is `neutral`.
- Subline 12px / 18px `muted`, margin 12px 0 16px.
- Stats: flex, 15px gap. Value 18px / 27px weight 500 `ink-strong`. Label 11px / 16.5px `muted`, 3px above.

## States

- Selected: `gradient-selected` fill, 1px `selected-border`, `shadow-selected` halo. The title gets `aria-current="true"`.
- Hover: D shows no hover on the card or the title.
- Focus: global `focus-ring` around the title.

## Keyboard and accessibility

- Only the title is a button, as in D. The card body is not clickable.
- A title click switches the campaign and keeps the current tab.

## D exceptions

| D | DS | Rule | Why |
|---|---|---|---|
| Selected border #B7CDE3 | `selected-border` #6695C4 | State marks 3:1 | D's border is 1.56:1 and is the only mark of the selected card. |

## Do / Don't

- Do keep three stats in D's order.
- Don't make the whole card a button.
- Don't add a hover lift or shadow. D has none.
