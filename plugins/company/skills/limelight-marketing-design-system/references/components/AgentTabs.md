# AgentTabs

A row of agent-name tabs over one content panel ("Ivy · Cooper · Elliot · Lana" on the home page). The selected tab shows the agent's mark and a 1px black progress line across its top.

- The consumer provides `tabs`: each has a `label`, an `icon` (the agent's mark, shown only when the tab is selected) and `content`. Optional: `defaultIndex`, and `autoAdvance` (milliseconds per tab, which also runs the progress line).
- Tabs: Host Grotesk 20px, 12/16/12/24 padding, with `#0000000d` rules between them. The selected tab is `text-600` on `#00000005`.
- Panel: 24px padding inside a `surface-400` 1px frame. A typical panel has an `AgentTag` (role), a `heading-s` title, a `body-l` line and the agent's `AgentButton`.
- Keyboard: the arrow keys move between tabs (roving tabindex, ARIA tabs pattern).
- FLAG: the site sets unselected tabs in `surface-500` (#bebebe, 1.8:1). That is the site's own pair, kept exact. The selected tab, the mark and the progress line make the state clear, but the unselected names are hard to read.
