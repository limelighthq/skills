# AgentSignature

The agent's identity at the top of the panel body: the 96px portrait in a thin white ring, the "{ Ivy }" pill and the role line.

## Consumer provides

- `agent`: `"ivy"` or `"elliot"`. The portrait uses D's crop of the agent reference image.
- Optional `name` (defaults from `agent`) and `role`. Defaults: Ivy "Creator partnerships", Elliot "Employee advocacy". D has one role line per agent.
- `src` only for agents without a D crop (Cooper, Lana).

## Anatomy

- Column, centered, gap 8px, padding 10px 0 12px. D measures 266x178 in a 300px panel.
- Portrait: `portrait-signature` (96px), `surface-portrait` ground, `shadow-signature` (7px white halo and a soft drop).
- Ring: a 140px circle, 1px `glass-border`, centered, 5px above the column's top edge. It is decorative.
- Pill: `AgentLabel` "{ Ivy }": 14px/21px, letter-spacing -0.04em, `glass-fill`, 1px `glass-border`, `radius-label`, padding 3px 17px.
- Role: 10px/15px (`meta`), `muted`, centered. 4.69:1 on `surface-panel`.

## States

- Static. The signature scrolls away with the thread.

## Keyboard and accessibility

- The portrait is `role="img"` named after the agent ("Ivy"). It is not interactive.

## Do / Don't

- Do put it first in the panel body on every page.
- Do use D's copy "Creator partnerships" in the panel, even where the nav says "Creator outreach".
- Don't add a second role line or a status next to the pill.
