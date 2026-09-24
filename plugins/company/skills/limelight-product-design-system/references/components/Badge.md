# Badge

A small status or tag label: "Running", "Draft", "NEW", "Paid", and the neutral tag pills in insight cards.

## Consumer provides

- The text as `children`, in the case the data carries. D prints status words in Title Case ("Running") and new-creator marks in capitals ("NEW").
- `tone`: `neutral` (default), `positive` or `warning`.
- `block` for a full-width tag pill inside an insight card ("Q2 is the backlog").

## Anatomy

- 10px/13.5 weight 450, padding 2px 6px, radius `radius-sm` (4px), about 17.5px tall.
- Neutral: `neutral-fill` / `neutral-text`. Positive: `positive-fill` (#F0F8F3) / `positive-text` (#32795C). Warning: `warning-fill` (#FFF5D2) / `warning-text`; D uses it for "No numbers" and "N blocked".

## D exceptions

- Neutral label D #77777E (3.97:1) → `neutral-text` #6E6E75 (4.5:1). Warning label D #996E18 (4.19:1) → `warning-text` #926917 (4.6:1).

## Do / Don't

- Do pair every colour with its word. The word carries the state.
- Don't invent tones D does not use. "Paid" stays neutral grey, as in D.
