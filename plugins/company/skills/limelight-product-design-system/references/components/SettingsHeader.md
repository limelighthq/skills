# SettingsHeader

SettingsHeader is the top of the Team settings page: the "TEAM" eyebrow, the team name with its initial, the permanent team identifier chip and the page buttons.

## Consumer provides

- `eyebrow` ("TEAM"), `title` ("Agus's Studio"), `mark` ("A").
- `code` ("team_demo_limelight") and `codeLabel` ("Permanent team identifier").
- `children`: page buttons ("Reset prototype").

## Anatomy

- Eyebrow: 11px `settings-meta` on a 21px line.
- Title: 26px / 32.5px, weight 500, -0.045em, `ink` (the `page-title` style).
- Mark: 30px square, radius 8px, `settings-mark-fill`, 1px `settings-mark-border`, 14px weight 500, 10px before the name.
- Code chip: `--font-code` 11px / 16.5px with D's inherited -0.168px tracking (144.6px wide for 'team_demo_limelight'), padding 4px 10px, radius 20px, `settings-code-fill`, 1px `settings-code-border`, `ink`. The label follows it after a space (about 3px) at 11px `settings-meta`.
- Buttons: 20px below the chip. 32px under the whole header.

## States

Static. The buttons carry their own states.

## Keyboard and accessibility

- The title is the page `h1`. The mark is hidden from screen readers.

## D exceptions

- `settings-meta` replaces D's #777777 (4.26:1 on the settings ground).

## Do / Don't

- Do show the identifier in the code chip so people can copy it exactly.
- Don't turn the chip into a button. D shows it as static text.
