# Chip

A removable value shown as an outlined button, where one click on the whole chip removes it.

## Consumer provides

- `children`: the value ("😂", "→", "Waiting on the creator").
- `onRemove`. Without it the chip renders as static text in the same frame.
- `removeLabel`: the accessible name. Default "Remove {text}", as D names "Remove 😂".
- `iconPosition`: `end` (default, Tone of Voice "😂 ×") or `start` (Campaign calendar "× Waiting on the creator").

## Anatomy

- It is a `Button` (`secondary`, 36px): 1px `control-border`, `radius-md`, padding 8px 16px, 14px/20 weight 450, 8px gap.
- The label takes the text colour of its context, as D's outlined buttons do: `ink-strong` #09090B inside the Tone of Voice card, `ink` on a page.
- The × is lucide `x`, 16px.
- Chips wrap in a row with an 8px gap. D ends the emoji row with a "+ Add" button.

## States

- Rest, hover (`surface-hover` ground, `ink-hover` text), focus (global ring). D has no disabled chip.

## Keyboard and accessibility

- Enter or Space removes the value. Move focus to the next chip, or to "+ Add", after a removal.

## D exceptions

- D draws × as a text glyph of about 9px. The DS uses a 16px `x` icon. Rule: icon floor. The chip grows by about 12px ("😂 ×" is 76px, D 64px).

## Do / Don't

- Do use it for values the user added and can take away (emojis, list symbols, an active filter).
- Don't put a separate small × button inside a chip. D makes the whole chip the remove control.
- Sequence tokens are a different component (`TokenChip`, group H).
