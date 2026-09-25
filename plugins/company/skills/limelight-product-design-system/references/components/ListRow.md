# ListRow

ListRow is one line inside a settings card: a title with a muted description and optional actions, or a label and value pair.

## Consumer provides

- `title` ("Slack"), `description` ("Connect to receive a Slack ping when agents finish work."), `actions` (Buttons), `meta` (a Badge such as "Owner"), `leading` (an Avatar or portrait).
- For a pair: `label` ("Current plan") and `value` ("Full access · complimentary"). Add `onValueClick` to render the value as an underlined link-button ("29 attributes").
- `density`: `default` or `compact`.
- `descriptionId`: lets a disabled action point at the description with `aria-describedby`.

## Anatomy

- Flex row, centered, 12px gap, 12px / 18px text.
- Default density: 14px top and bottom padding, 1px `settings-divider` under each row except the last.
- Compact density: 5px padding and no divider (the facts inside an agent card).
- Title: `ink-strong`, weight 400 (D sets settings titles at 400). Description: `muted`, 4px above.
- Pair: label `muted`, value `ink-strong` weight 400. Link value: `settings-link`, underlined, weight 450, inline-block with D's 12px top margin, so a link row is 40px tall and the link sits 6px below its label (plain compact rows are 28px).
- A member row with a 32px avatar is 72px tall. An integration row with a 36px button is 73px.

## States

- Disabled action: the Button dims (`opacity-disabled`). The reason is the row's description, in opaque `muted` text, tied with `aria-describedby` (ENG-3773). D: "Not available yet. Ask your workspace owner to turn it on."
- Focus: global `focus-ring` on the actions and the link value.

## Keyboard and accessibility

- The row is not focusable. Only its controls are.
- Link values are buttons because they open dialogs, not pages.

## Do / Don't

- Do put rows inside a `SettingsSection` card.
- Do explain every disabled action in the description.
- Don't bold row titles. D keeps them at weight 400.
