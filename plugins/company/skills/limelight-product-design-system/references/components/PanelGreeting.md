# PanelGreeting

Elliot's header above his card in the panel: a title that asks what to work on today and a line that points to the quick starts.

D's copy: "What should we work on today?" and "Quick starts for Content. Or ask Elliot anything."

## Consumer provides

- `destination`: the first path segment ("Content", "Calendar", "Sarah Chen"). It fills the subline.
- Optional `title`, `subtitle`, `agentName`.
- Show it for Elliot destinations except Analytics, Knowledge and Getting started. Ivy has no greeting.

## Anatomy

- Title: h2, 14px/21px (`greeting-title`), `ink`, on the panel ground.
- Subline: 12px/19.8px, `panel-muted`, over the panel image. 26px below the title and 18px above the card, matching D's flex gap plus paragraph margins.

## States

- Static. It shows only on an empty thread, like the card under it.

## Keyboard and accessibility

- The title is an h2 (`as` changes it). It opens the panel's content section.

## D exceptions

| D value | DS value | Rule | Why |
|---|---|---|---|
| Subline #76767E (3.96:1 on #EAF1FC, lower on the image) | `panel-muted` #6B6B72 | Text 4.5:1 | Lightest shade of D's hue that clears the image's darkest pixel under the text (4.52:1 on #EEEBFD). |

## Do / Don't

- Do keep D's copy word for word.
- Don't add buttons here. Quick starts live in the Build with Elliot menu.
