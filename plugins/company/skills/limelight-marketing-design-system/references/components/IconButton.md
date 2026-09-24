# IconButton

A 40px square button with one icon, used for carousel arrows (« ») next to section headings.

- The consumer provides `icon` (use the `icon-caret-double-left` / `-right` assets), `label` (the accessible name, e.g. "Previous") and `onClick`.
- It has a `surface-100` face, a 0.5px `surface-400` border and `radius-md`. On hover the face goes to `surface-150`. Set `disabled` at the ends of a carousel.
- Put the pair at the right end of the section heading row, `space-2` apart.
