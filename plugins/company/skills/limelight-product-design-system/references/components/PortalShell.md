# PortalShell

PortalShell is the public creator page a campaign brief opens into: a top bar, a demo banner, the brief heading, an at-a-glance box, the brief sections and a sticky response aside.

## Consumer provides

- `brand` (default "limelight"), `context` ("Limelight demo brand / Creator opportunity"), `banner` ("Sample creator experience · works without a published campaign · responses stay in this demo").
- `eyebrow` ("Q2 SaaS Growth · Published v1"), `title` ("Q2 SaaS Growth — share your perspective"), `lead`.
- `glance`: Deliverables, Compensation, Respond by.
- `sections`: Campaign story, Scope & terms, Creative direction, Timeline & resources, each with `fields` (`{label, value, href?}`).
- Aside: `asideTitle` ("Interested in the opportunity?"), `asideIntro` ("No Limelight account needed. A response is not an agreement."), `actions` (one `primary`: "Interested — share pricing", then "Express interest without rates", "Ask a question", "Not this time"), or `aside` for a response form.

## Anatomy

- Page: `--font-arial` 16px / 1.6, `portal-ink` on `surface`, max 1160px (`portal-max-width`), padding 28px 40px 80px.
- Top bar: wordmark 25px / 40px weight 800 -1px `portal-brand`. Context 13px `portal-meta`. 20px bottom padding, 1px `portal-line`.
- Banner: 12px / 19.2px `portal-meta` on `portal-banner`, padding 10px 14px, radius 6px, 20px margins.
- Heading (max 790px, padding 18px 0 28px): eyebrow 12px UPPERCASE 1px tracking `portal-eyebrow`. h1 40px / 46px weight 650 -1.5px, margin 14px 0 20px. Lead 16px / 25.6px.
- Layout: two columns, the article and a 310px aside (`portal-aside-width`), 40px gap.
- At a glance: `portal-glance-fill`, radius 10px, padding 20px, 16px gap, 26px below. Labels 12px `portal-glance-label`, values 14px weight 500.
- Sections: 1px `portal-rule` on top, padding 24px 0. h2 22px / 35.2px weight 400 -0.4px, 18px below. Field labels 13px weight 600 UPPERCASE 0.5px `portal-field-label`, 7px above the value. 20px between fields. Links `portal-link` with an `arrow-up-right` icon.
- Aside order: title, intro, custom `aside` content (form fields, the reason text), then `actions`.
- Aside: sticky 20px from the top, padding 22px, radius 12px, `portal-aside-fill`, 1px `portal-aside-border`, 14px / 22.4px. Title 20px / 32px. Buttons stack with 14px gaps: 14px / 22.4px, padding 10px 14px, radius 7px (`radius-portal`), 1px `portal-control-border`. Primary: `portal-primary` fill, `portal-on-primary` label.

## States

- 850px and narrower (a container query): one column, 20px page padding, the top bar stacks with a 5px gap, the h1 drops to 30px / 34.5px, and the aside moves above the brief and stops sticking.
- Disabled button: `opacity-portal-disabled` (0.45). Pass `describedBy` to the opaque text that says why ("Enter a positive post rate or bundled price, using at most two decimal places.").
- Focus: portal buttons keep D's own ring (`.creator-portal button:focus-visible`), 2px `focus-ring-portal` (#4A8260) at a 3px offset. This is orchestrator ruling 2 (RULINGS-2.md), not an exception: 4.51:1 on `surface`, 4.38:1 on `portal-aside-fill`. Links keep the global `focus-ring`, as in D.

## Keyboard and accessibility

- The page is a `main` labelled by its h1. The aside is a named `aside` ("Your response").
- External links open in a new tab and the arrow icon says so to screen readers.

## D exceptions

| D | DS | Rule | Why |
|---|---|---|---|
| Glance label #6E7B72 | `portal-glance-label` #68746C | Text 4.5:1 | D is 4.10:1 on #F3F7F3 (4.43:1 on white). |
| Button border #CBD6CE | `portal-control-border` #7E9985 | Control borders 3:1 | D is 1.49:1 on white and 1.45:1 on the aside. Portal inputs (D #CED8D1) use group E's `control-border-flow`. |
| Link arrow "↗" | lucide `arrow-up-right` | Icons are lucide | D's unicode arrow maps to lucide. |

## Do / Don't

- Do keep the portal in Arial and the green palette. It is a separate public surface.
- Do keep exactly one primary action in the aside.
- Don't show internal budgets or creator rates in the brief sections.
