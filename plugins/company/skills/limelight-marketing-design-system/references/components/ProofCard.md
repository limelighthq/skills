# ProofCard

A small floating white card that shows one piece of an agent's work next to its orb: "Ivy recommendation · Justin Gage, Founder & Writer", "Top performing campaign · The GTM Newsletter".

- The consumer provides `title`, and optionally `tag` (the floating label above the card), `image` (an avatar or thumbnail), `badge` (a small mark after the title, such as a network icon or a score), `meta` (a 12px line; wrap numbers in `<b>` to set them in ink) and `aside`.
- Card: `surface-100`, 0.5px `surface-400` border, `radius-md`, 12/20 padding, a 14px/32px 10% shadow. The tag is an `AgentTag` centered on the top edge.
- Use at most two per hero, one on each side of the orb. Use real, anonymized or approved names and figures only. The site hides these cards on tablet.
