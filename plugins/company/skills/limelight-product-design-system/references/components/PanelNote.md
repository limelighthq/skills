# PanelNote

The "FROM THE PANEL" card that reports what the panel just did, for example that it opened the Brief tab.

## Consumer provides

- `children`: the note text in D's words ("I opened the Brief tab.", "Campaign creation requires a Limelight connection.").
- Optional `label` (default "FROM THE PANEL"), `inset`, `live`.

## Anatomy

- Card: `surface`, 1px `line`, `radius-card`, padding 16px, no shadow. 266x103 in D.
- Label: 11.2px/16.8px (`insight-eyebrow`), `muted`, in D's capitals.
- Text: 12px/19.8px, `muted-panel`, margin 10px 0 18px, line breaks kept.
- `inset`: D's fallback note ("I opened the Calendar tab." when no note is set). The text sits in a `surface-note` box with 12px padding and `radius-lg`, in `panel-muted`.

## States

- Appears after an action sets a note (tab switch, campaign creation) and stays until the next agent switch.
- Brief and Calendar tabs show only this note in the panel.

## Keyboard and accessibility

- The text is `role="status"`, so screen readers announce a new note. Pass `live={false}` for a static note.

## D exceptions

| D value | DS value | Rule | Why |
|---|---|---|---|
| Inset text #76767E on #F5F8FB (4.23:1) | `panel-muted` #6B6B72 (4.96:1) | Text 4.5:1 | Same hue, darker. |

## Do / Don't

- Do write the note in the first person, as the panel ("I opened the Performance tab.").
- Don't use it for errors that need an action. Use a dialog or a notice.
