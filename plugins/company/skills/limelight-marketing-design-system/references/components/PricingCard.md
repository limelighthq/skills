# PricingCard

A white plan card. With `agent` it gets that agent's 2px gradient frame (`border-ivy`, `border-cooper`, `border-elliot`). Without it, it gets a faint neutral frame (the "All agents" package).

- The consumer provides `name`, and optionally `avatar` (the portrait), `role` (shown as an `AgentTag`), `price` + `per`, `summary` (one bold line), `action` (a `Button`), `features` (strings, or `{text, icon}`), a `ribbon` label, and children for an add-on block after a divider ("Supercharged by Lana").
- Card: `surface-100`, `radius-xs` (4px), 24px padding, 32px between blocks. Name and price use `heading-s`. The summary and list titles use Geist 14/500 in `text-600`. List items are 14px `text-500`.
- The ribbon ("What each agent does") uses `border-ivy`, as on the site.
- Lana has no card frame on the site: she appears as the add-on inside the other cards.
