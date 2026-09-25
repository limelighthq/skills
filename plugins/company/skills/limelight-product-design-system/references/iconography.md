# Iconography

- **lucide** (ISC), the library D uses, stroke 2 with round caps and joins, in `currentColor`. D's own 38 glyphs are copied byte for byte from D's bundle (lucide-react 0.468.0). The bundle adds a small set of extra lucide glyphs for states D implies (status circles, mail, calendar, upload).
- Every glyph sits in the 24px `icon-box`. Action glyphs (standalone icon buttons 36px and up) are `icon-glyph` 20px. Indicators (chevrons, carets, compact icon buttons, glyphs beside a label) are `icon-glyph-indicator` 16px.
- D's unicode glyphs map to lucide: ⌃ chevron-up, ⌄ chevron-down, ⌕ search, ✎ pencil, ✦ sparkles, ↗ arrow-up-right, › chevron-right. D's platform marks ("in", "𝕏", "▶") stay as bold letter marks at 16px.
- Icon ink: `icon-rail` in the rail, `icon-toolbar` in the panel toolbar, `icon-row` in row actions, `muted` in inputs. Every icon clears 3:1 on its ground.
- Never use emoji as icons.
