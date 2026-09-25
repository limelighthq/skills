# AgentFace

A round agent portrait: 34px in the rail, 18px in Build-with selectors, 23px beside IVY'S TAKE and 96px in the panel signature.

## Consumer provides

- `agent` (`ivy` or `elliot`), `size` in px, and `name` when the portrait stands alone (it becomes the accessible name).
- For Cooper and Lana (not in D), pass `src` with a marketing portrait (`images/Agent-portraits/cooper-portrait.png`, `images/Agent-portraits/lana-portrait.png`).

## Anatomy

- D crops each portrait out of one reference image (Agent-references assets): Ivy background-size 563.333% at 49.64% 82.07%, Elliot 645.5% at 46% 78.14%. The crop scales with the size.
- Ground `surface-portrait` (#F5F6FB), 1px ring `shadow-portrait` (#E5E6ED).

## Do / Don't

- Do pair a portrait with the agent's name, visible or as the accessible name.
- Don't recolour or filter the portraits.
