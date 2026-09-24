# AgentCard

The name card for an agent in the roster and in the home carousel: "{ Cooper }", a role tag, and one sentence on what the agent does.

- The consumer provides `name`, `role`, the sentence (children), optional `live` and optional `action` (usually the agent's `AgentButton`).
- Card: `surface-100`, 0.5px `surface-400` border, `radius-md`, 16/32 padding, 16px gaps, centered, 368px max width. The name is `heading-s` with the braces in `text-400` and a `surface-300` rule under it. The sentence is `body-l` `text-500`.
- Use it under the matching `AgentAvatar`. For agents that are not live yet, the site uses the name "In training" with a "Training" tag.
