# Visual foundations

**Color.** Most of the UI is neutral: `surface-150` page, `surface-100` cards, `text-600` ink. The brand's color comes from gradients, not flat fills:
- `gradient-limelight` is the primary gradient. Use it for company-level moments (hero, logo backdrop, "Meet AI employees").
- Each agent owns one secondary gradient and one button ring: Ivy `gradient-ivy` / `ring-ivy`, Cooper `gradient-cooper` / `ring-cooper`, Lana `gradient-lana` / `ring-lana`, Elliot `gradient-elliot` / `ring-elliot`. Do not mix agents on one surface, and do not give one agent's gradient to another.
- Gradients always start from white at the top (10%) and run down. Keep them large and soft, as grounds and glows. Never use them on text or small chips.
- `accent-blue` is the main flat accent. `accent-purple`, `accent-pink` and `accent-orange` are small highlights that point to Elliot, Ivy and Lana. Put `text-600` on all of them, never white.
- `status-live` is a dot only, always next to a word.

**Type.** Use two faces. The variable font files from the live site ship with this system (`fonts/`). Geist Mono loads from Google Fonts:
- **Host Grotesk** (`display`) is for titles, headings and subheadings. Use weight 400 at -3% tracking (`heading-xxl` to `heading-xs`). The hero uses `heading-display` (52/62 at -4.5%). Big display moments (guide covers) go to Medium 500.
- **Geist** (`sans`) is for body text, captions, labels, buttons and information graphics (`body-l/m/s`, `label-m/s`, `cta-primary`, `cta-secondary`).
- **Geist Mono** (`mono`) is only for `label-mono` agent labels.
- Tracking is tight everywhere (-3% on headings and body, -1% on labels). Do not use bold for headings: hierarchy comes from size and from **two tones**. Titles pair an ink phrase (`text-600`) with a grey phrase (`text-400`) on the next line, for example "Four AI employees, / One connected system." Captions do the same: "**Tools to ship** one campaign."
- At 479px and less, the whole scale steps down (for example `heading-display` 52→32, `heading-xl` 40→28, body 14→12). Each style's note gives its mobile size.

**Layout and spacing.** Desktop is 1440 wide with `space-20` (80px) side margins and a `width-content` (1280) column. Full-bleed bands stop at `width-page`. Standard sections use `space-10` padding. Large ones use `space-20`, with `space-30` above the footer CTA. Cards sit `space-6` apart. On phones the gutter is `space-3`. Leave generous white space: when in doubt, add air, not lines.

**Page anatomy (site).** Every page follows the same order:
1. `Navbar`, floating over the hero. Below 991px it becomes a menu button that opens a full-height sheet.
2. A hero on `gradient-limelight`, or on the page's agent gradient. It has a `SectionTag`, a `HeroHeading`, one `body-l` line in `text-500`, and `AgentButton` + primary `Button`. Below that sit the agent orbs (`AgentAvatar`) or one agent with a `ProofCard` on each side.
3. A `LogoStrip` (home, pricing) or a row of `Stat`s (agent and about pages).
4. Content sections, each opened by a `SectionHeading`. The sections are separated by full-width `surface-300` rules, inside a page frame with thin vertical side rules. Typical blocks: `AgentTabs` (home), a stack of `StepCard`s (agent pages), rows of `FeatureCard`s, and `PricingCard`s with a `BillingToggle` (pricing).
5. `CTASection` ("Deploy your first AI employee now." + primary Button).
6. `Footer`.

**Content pages (blog, podcast, resources).** These use a lighter frame:
- Index pages: a small hero (`SectionTag` + `heading-xl` title, with a newsletter card or a video on the right). Then a white panel with `FilterTabs`, a 3-column grid of `ContentCard`s, and a secondary "Load more" Button.
- Article pages: `ArticleHeader`, then `RichText` in the left column and a sticky `TableOfContents` on the right.
- Resource pages: `ArticleHeader` (tag "Resources"), a `CheckList`, the cover image and one line of text on the left, and a `LeadForm` on the right.
- On these pages the footer CTA sits on a wide blue-to-pink glow band (`gradient-limelight` fading into `ivy-pink`).

**Motion.** The site's motion is quiet: 0.2s corner and color transitions, a slow logo marquee, the tab progress line, and fade-ins as sections scroll into view. Always respect reduced motion.

**Surfaces, borders, shadows.** Cards are `surface-100` on `surface-150` with `border-hairline` and `radius-md`. Section panels use `border-section`. Shadows are faint: `shadow-xs` at rest, `shadow-md` for menus, `shadow-lg` only for product screenshots. There is no heavy elevation.

**Corners.** `radius-md` (8px) is the default for buttons, inputs and cards. `radius-pill` is for agent tags and orbs. `radius-lg`/`radius-xl` are for media.

**Imagery.** Agents appear as portrait photos inside a soft glass orb (`AgentAvatar`) with a pill tag under them. Put the orb on the agent's gradient with faint hairline orbits and dashed arcs from that agent's mark. Blurred color fields and film grain are allowed in backgrounds. Do not use stock tech imagery (circuits, robots, neon).

**States.** On hover, button corners sharpen from `radius-md` to `radius-xxs` over 0.2s. This is the site's signature hover, and it echoes the square brackets of the logo. Text links darken to `text-600`. Nav links and icon buttons get a `surface-150` background. Focus is always `focus-ring` (2px `limelight-black`, 2px offset). Disabled buttons use a `surface-300` fill with a `text-500` label.

**Contrast.** `text-400` passes on `surface-100` (4.54:1) but not on `surface-150`/`surface-200` (4.38:1 / 4.35:1). On those grounds use it only at 24px+; otherwise use `text-500`. This is the source's own pair and it is kept exact. FLAG: the site's footer links (20px `text-400` on `surface-150`) miss 4.5:1 by a small margin.
