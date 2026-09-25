# FilterTabs

The category filter above the blog and podcast grids: "All · Content Strategy · Market Research · …".

- The consumer provides `items` (put "All" first), `value` or `defaultValue`, and `onChange`. Each option is a toggle button with `aria-pressed`.
- Style: Geist 16px with 8/16 padding and 16px gaps. Unselected options are `text-400`, and turn `text-600` on hover. The selected option is a `surface-900` block with `radius-xs` and white text at weight 500.
- Put it on a white panel (`surface-100`), 40px above the `ContentCard` grid. `text-400` passes there (4.54:1).
