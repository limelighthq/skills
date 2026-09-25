# Button

The app's text buttons, as D renders them: the dark `primary` fill for the main action of a view, the outlined `secondary`, the muted `ghost` link-button and the `danger` outline.

## Consumer provides

- The label as `children`, in D's case: "Run Discovery Now", "Internal targeting", "Add funds".
- `onClick`, or `href` for a link that looks like a button.
- `variant`: `primary` (default), `secondary`, `ghost` or `danger`.
- `size`: `md` (default, 36px, 14px label), `toolbar` (36px, 12px label, filter bar), `panel` (32px, 12px label, full-width buttons in panel cards) or `sm` (30px, 12px label, page header and bulk bar).
- Optional `icon` / `iconRight` (a lucide name), `count` (renders a `CountBadge`, as in "Approvals 6") and `block` (full width).

## Anatomy

- Padding 8px 16px, radius `radius-md` (6px), gap `space-8`, label weight 450, `-0.012em` tracking, `font-sans` (Helvetica Neue).
- Primary: `primary` (#1E1C22) fill, `on-primary` (#FAFAFA) label.
- Secondary: `surface` fill, 1px `control-border`. The label takes the text colour of its context, as in D: `ink` on pages, `ink-strong` inside cards.
- Ghost: no fill, no padding, `muted` label, min height 26px ("New campaign" under the card grid).
- Danger: the secondary shape with a `danger-ink` (#AE3333) label ("Delete thread").
- Icons: a 16px glyph in the 24px box. The box overlaps the padding by 4px, so the glyph and label sit where D puts them.

## States

- Hover: primary fill drops to 90% (`opacity-primary-hover`). Secondary and danger take the `surface-hover` ground and `ink-hover` label. Ghost does not change (as in D). The transition is 0.15s on background and border colour. Corners do not change.
- Focus: the system focus ring (2px `focus-ring`, 3px offset).
- Disabled: 50% opacity (`opacity-disabled`) and no pointer events. The reason must also exist in opaque `muted` text tied with `aria-describedby` (ENG-3773).

## Keyboard and accessibility

- Enter and Space activate. The label is the accessible name. A count reads as part of the name ("Approvals 6").

## D exceptions

- Control border: D #DDDFE4 (1.28:1 on white) → `control-border` #858D9E (3.41:1 on white, at least 3:1 on every ground a control sits on). Rule: control borders 3:1.
- Focus: D #8FB6E0 ring (2.11:1 on white, 1.86:1 on the panel ground) → `focus-ring` #4D8BCE (at least 3:1 on every app surface), `focus-ring-panel` #2E68A8 inside the agent panel. Rule: visible focus.
- Icon box: D draws a bare 16px glyph → 16px glyph in the 24px house box (negative margin keeps D's spacing).

## Do / Don't

- Do use one primary per toolbar or card.
- Do keep D's Title Case where D uses it ("Run Discovery Now").
- Don't restyle a `<button>` inline. Pick a variant and a size.
