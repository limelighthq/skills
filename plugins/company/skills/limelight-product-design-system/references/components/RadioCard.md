# RadioCard

One bordered radio choice with a bold title and a one-line description, as in D's Invite teammate dialog.

## Consumer provides

- `title` ("Member"), `description` ("Can use agents and run campaigns.").
- Native radio props: `name`, `value`, `checked` / `defaultChecked`, `onChange`, `disabled`.
- Optional `disabledReason`.
- Use it inside `RadioCardGroup`, which supplies the name, the value and the legend.

## Anatomy

- Card: 1px `radiocard-border`, `radius-lg` (8px), padding 12px, white, 10px gap between the dot and the text.
- Dot: 13px circle, 1px `check-border`. Checked: `check-fill` ring and dot with a 2px `check-mark` gap (Chrome's native radio).
- Title: 12px/18, weight 700. Description: 12px/18, 4px above and below. Text is `ink` in the page and `ink-overlay` with the system face in a dialog.

## States

- Unchecked, checked, hover (dot border darkens), focus (global ring on the dot).
- Disabled: dot, title and description at 0.5. The reason stays opaque in `muted` inside the card.
- D does not restyle the card when it is checked. The dot carries the state.
- D has no disabled role card. The disabled state follows ENG-3773.

## Keyboard and accessibility

- A real `<input type="radio">` inside a `<label>`. Arrow keys move between cards that share a `name`.
- The description joins `aria-describedby`.

## D exceptions

- None. The card frame (#E5E5E9, 1.26:1) is decorative. The dot carries the state at 4.5:1.

## Do / Don't

- Do write the description as what the choice lets someone do.
- Don't use it for more than about 4 choices.
- D's Edit ritual "Approval mode" and Edit Ivy "Autonomy" are Selects, not radio cards. Keep them as Selects to match D.
