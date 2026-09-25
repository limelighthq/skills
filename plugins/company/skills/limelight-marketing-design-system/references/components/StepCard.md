# StepCard

One step of an agent's workflow on an agent page: a numbered orbit badge, a title and one sentence on the left, and a product visual on the right ("1 Discover", "2 Vet", "3 Outreach"…).

- The consumer provides `number`, `title`, the body (children) and `visual` (a product screenshot or a small UI mock).
- Card: `surface-100`, 1px `surface-400` border, 24px padding, a 12-column grid (text in 4 columns, visual in 8). The visual sits in a 12px-radius `surface-150` well.
- Number badge: 52px, drawn from the site's orbit SVG (a hairline circle with two small ellipses, `surface-500`), with the number in Host Grotesk 20px `text-500`.
- Title: `heading-xs`. Body: `body-l` `text-500`. Stack the cards 32px apart. The site makes them sticky as they scroll.
- On phones the visual goes under the text.
