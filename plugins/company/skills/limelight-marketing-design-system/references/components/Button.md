# Button

The site's plain buttons: black `primary` for the main action ("Get started"), off-white `tertiary` for "Sign in", white `secondary` with a hairline, and `link` for an underlined text link.

- The consumer provides the label (children), an `onClick` or `href`, and the `variant`.
- Primary: `surface-900` fill, `cta-primary` label (Geist 600, 14/24) in `text-100`, 36px tall, `space-4` side padding, `radius-md`.
- Tertiary: `surface-150` fill, 0.5px `surface-300` border, `cta-secondary` label in `text-500`. Use it in the nav for "Sign in", left of the primary button.
- Link: 16px `text-500` text with a `surface-400` underline. On hover the ink goes to `text-600` and the gap before the arrow grows.
- **Hover:** every button's corners sharpen from `radius-md` to `radius-xxs` over 0.2s. This comes from the site and echoes the square brackets of the logo. Do not add color or shadow changes.
- Use one primary per view. Use sentence case ("Get started", "Book a demo"). For "Learn more" or "Meet …", use `AgentButton`.
- (The source sets the secondary label in `text-400` at 80% opacity, which is about 3.4:1. This system uses `text-500` so that it passes 4.5:1.)
