# AgentButton

A white button in a 2px radial-gradient ring, with two tiny bracket corners (top left, bottom right) that echo the logo. The site uses it for every soft call to action: "Learn more", "How it works", "Meet Lana".

- The consumer provides `agent`, the label, and `href` or `onClick`. Use `limelight` (blue ring) for company-level actions such as "Learn more" and "Our story". Use `ivy` / `cooper` / `lana` / `elliot` when the button leads to that agent.
- Ring: `ring-<agent>` with a 0.5px `surface-400` outline. The face is `surface-100` at `radius-sm` with the label in `cta-secondary` and `text-500`. Corner colors: limelight #d4eeff, ivy #f4bbe6, cooper #8bd9dc, lana #fde0c4, elliot #c0bcfb.
- Hover: corners sharpen to `radius-xxs`, the same as `Button`.
- Put it beside a primary `Button` (secondary left, primary right, `space-4` apart in heroes, `space-2` in cards).
- Match the ring to the agent named in the label.
