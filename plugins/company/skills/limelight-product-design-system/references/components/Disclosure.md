# Disclosure

Disclosure hides secondary detail behind a one-line summary that opens and closes in place.

## Consumer provides

- `summary` ("Sharing settings", "View fit details") and, for the card variant, `status` ("Available after publishing").
- `children` for free content, `items` (`{label, value}`) for a fact list, `note` for the small closing line.
- `variant`: `card` (default) or `inline`.
- `defaultOpen`, or `open` with `onToggle`.

## Anatomy

Card (D `.brief-sharing`, under the brief editor):
- Frame: 1px `disclosure-border`, radius 10px, `surface`.
- Summary: padding 18px 20px, 14px / 21.7px weight 500 `disclosure-ink`, a 16px `chevron-right` before the text. Status: 12px `disclosure-status`, 12px after the summary.
- Body: padding 0 20px 20px, 14px / 21.7px `disclosure-body`. Note: 11.2px `disclosure-note`, 16px above.

Inline (D `.cr-recommendation details`, creator review drawer, Arial):
- 1px `disclosure-inline-rule` on top, 13px margin, 11px padding.
- Summary: 11px / 16.5px weight 600 `disclosure-inline-ink`, 5px gap, a 16px `chevron-down` after the text.
- Fact list: 9px row gap, 15px above, 11px, terms `disclosure-term` on the left, values `disclosure-value` right-aligned. Note: 10px `disclosure-term`.

## States

- Closed: card chevron points right, inline chevron points down.
- Open: the card chevron turns 90°, the inline chevron turns 180°.
- Focus: global `focus-ring` on the summary.

## Keyboard and accessibility

- Native `details` / `summary`: Enter and Space toggle, and screen readers announce expanded or collapsed.
- The card variant can be named with `label`.

## D exceptions

| D | DS | Rule | Why |
|---|---|---|---|
| Native disclosure triangle (about 8px) | lucide `chevron-right` 16px | Icon floor | The marker is the only visible affordance. |
| Inline chevron 14px | 16px | Icon floor | Indicator glyphs are 16px. |
| Note #777777 | `disclosure-note` #767676 | Text 4.5:1 | D is 4.48:1 on white. |
| Fit terms #807987 | `disclosure-term` #756E7B | Text 4.5:1 | D is 3.88:1 on the drawer card ground #F7F5FC. |

## Do / Don't

- Do say what is inside in the status ("Link enabled · v1").
- Don't hide required actions in a Disclosure.
