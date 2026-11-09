---
name: design-system-check
description: "Provides the approved Limelight design-system context and audit every component on a specified platform screen, route, or section for actual component reuse, tokens, icons, and interaction consistency. Use when asked for a design system check, design-system compliance, or when implementing changes to a named Limelight screen. Applies to Limelight UI, not unrelated products. Report findings by default; fix only within the user's requested scope."
---

# Design system check
## Context to establish every time
The approved Limelight reference is [Proposal D Studio](https://limelight-proposal-d-studio.agustinarevenga.chatgpt.site/?screen=Find+creators&agent=ivy&campaign=0&tab=Creators&discovery=ai).
Verified from its local source on 2026-10-20:
- **shadcn/ui, New York style**, zinc base with CSS variables (`components.json`).
- **Radix UI primitives** supply interaction and accessibility behavior. The reference Select wraps `@radix-ui/react-select`.
- **Lucide** supplies interface icons (`lucide-react`). Do not replace them with Unicode symbols, emoji, or unrelated icon sets for standard navigation/actions.
- Limelight styling comes from the reference's component wrappers, semantic tokens, and screen styles. Custom components should compose these approved components; visual similarity alone does not establish compliance.
Begin the audit with a short statement of this baseline and the exact screen being checked. Verify the current reference source before asserting a newer baseline. Dependencies alone do not prove which components a screen uses: the reference repository also contains experiments with other libraries.
### Source locations and provenance
Resolve source from the target project's checkout or its authenticated hosted source; never assume a teammate has another person's local folders.
- Reference files: `components.json`, `src/components/ui/`, `src/lib/utils.ts`, `src/styles.css`, and the target screen's component/style files.
- For the hosted Proposal D reference, use its Sites project metadata and source workflow when available. The URL alone does not establish that an arbitrary local checkout is current.
- Creator Studio URL: [https://limelight-creator-studio.agustinarevenga.chatgpt.site/](https://limelight-creator-studio.agustinarevenga.chatgpt.site/)
- Creator Studio's calendar filter integration uses `ui/select.tsx`, `ui/bridge.tsx`, `ui/utils.ts`, and generated `ds-ui.js`. Build with `npm run build:ui` after installing locked dependencies when those files and that script exist in the selected checkout.
Creator Studio was originally custom HTML/CSS/JavaScript. Its calendar Status/Platform filters and sidebar icons were migrated on 2026-10-20; **the rest of the application was not certified or migrated**. Never carry forward a whole-screen or whole-platform pass from this fact.
If the reference source is missing, search the relevant workspace for `components.json`, source imports, and the matching Site manifest. If source cannot be inspected, perform a visual/interaction audit but mark component provenance **unverified**. Never infer shadcn usage from appearance or class names alone.
## Audit the specified screen
1. Resolve the requested URL, route, agent, campaign, tab, and screen state. Treat a supplied screenshot as a scoped reference. If the user points to a known screen, inspect it directly; ask only when the target cannot be determined.
2. Read applicable project instructions. Use supported browser tools for UI inspection and ordinary file tools for source. Establish whether the source corresponds to the deployed version; note local/live divergence.
3. Inventory **every component family on that screen**, including the shared header/sidebar, primary content, and overlays opened by that screen. Repeated instances may share one row only when they use the same implementation and variants. Include buttons/icon buttons, selects/comboboxes/menus, text/date/file inputs, checkboxes/switches, tabs, cards, tables, badges, avatars, dialogs/drawers/popovers, tooltips, notifications, pagination, and empty/loading/error states where present. Record absent or unreachable states explicitly rather than claiming they passed.
4. Trace each family from rendered UI to its source component/import and token styles. Look for raw HTML controls bypassing available wrappers, hand-built equivalents, competing UI libraries, hard-coded styling outside approved tokens, and glyph icons. Layout containers and semantic HTML are not violations by themselves; inspect whether an available design-system component is being bypassed.
5. Exercise relevant interactions: open dropdowns and dialogs, change tabs, check focus/keyboard selection and Escape dismissal, selected/disabled states, text wrapping, and responsive behavior. Use safe preview data; do not submit messages, publish content, change permissions, or mutate live business records for an audit. For mobile coverage use supported viewport tools; disclose if not tested.
6. Classify each family:
	- **Pass:** source confirms approved component reuse and observed styling/behavior matches the baseline.
	- **Derived custom:** built from approved primitives/tokens, with a documented purpose and no unnecessary replacement of an available component. Explain its basis.
	- **Mismatch:** confirmed bypass or inconsistency; cite file/identifier and observed evidence.
	- **Unverified:** missing source, state, deployment correspondence, or testing evidence.
7. Check all inventory rows before concluding. A clean screenshot is not evidence that all interactive states or source dependencies comply.
## Report
Lead with the baseline, target, and verdict: **Compliant**, **Partially compliant**, or **Unverified**. Use “Compliant” only when all in-scope families have verified passes or justified derived-custom classifications and no relevant coverage gaps remain.
Provide a compact table:
<table header-row="true">
<tr>
<td>Component / location</td>
<td>Classification</td>
<td>Evidence</td>
<td>Required change</td>
</tr>
</table>
Include all audited families, not only failures. Link source files/identifiers and the tested screen; distinguish screenshots from source evidence. State coverage (families examined, mismatches, unverified states), then prioritize concrete fixes and give remaining limitations. Do not invent numerical compliance scores from an incomplete inventory.
## If implementation is also requested
Reuse the approved component first. Compose custom behavior from its primitives and semantic tokens only when necessary; record the reason. Preserve explicit user constraints such as an unchanged header. Recheck modified components and affected interactions after the fix. For a Site edit, use the available Sites skill for source synchronization and publication; an audit request alone does not authorize edits or deployment.
This skill provides reusable context and an audit workflow. It is not an always-running monitor or a build gate, and does not guarantee invocation in every chat. Do not claim automatic enforcement without actual repository checks. Keep the approved baseline in project instructions when the user requests persistent project enforcement, and distinguish instructions from automated validation.
## Relationship to the product design-system skill
Use the separately installed limelight-product-design-system skill for its component and token reference when available. This skill checks actual reuse and interaction consistency against inspected source. Target-repository instructions and verified current tokens take precedence; report conflicts rather than silently replacing an existing system.
