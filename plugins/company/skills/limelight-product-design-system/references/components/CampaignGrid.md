# CampaignGrid

CampaignGrid is the row of campaign cards at the top of Campaigns, with the "+ New campaign" button under it.

## Consumer provides

- `children`: `CampaignCard` elements.
- `onNew`: shows the ghost "New campaign" button. It opens the "New campaign" dialog.
- `label` (default "Campaigns") names the region.

## Anatomy

- Grid of 3 equal columns, gap 12px (rows) 14px (columns).
- 20px bottom padding, 1px `line` bottom border, 28px bottom margin.
- "+ New campaign": `Button variant="ghost" size="toolbar" icon="plus"`, 12px `muted`, 26px tall, on its own row at the start.

## States

- The grid itself is static. Card and button states live in those components.

## Keyboard and accessibility

- The grid is a `section` named "Campaigns". Tab order runs through the card titles, then "New campaign".

## Do / Don't

- Do keep the grid above the campaign detail on every tab, as D does.
- Don't use a dashed "new" card. D's companion layout shows a plain ghost button.
