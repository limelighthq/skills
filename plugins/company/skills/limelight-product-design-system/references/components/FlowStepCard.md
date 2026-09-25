# FlowStepCard

One step of a scripted chat flow, such as Ivy's creator discovery, Ivy's campaign brief or Elliot's draft, built from slots so every step uses the same card.

## Consumer provides

Fill only the slots a step needs. They render in this order.

- `eyebrow`: "STEP 1 OF 3", in D's upper case.
- `title` (h3) and `aside` (right of the title, usually `ScoreChip`): "Which campaign?", "Confirm the ICP", "Priya Nair" with 96.
- `lead`: the 14px line of an in-message step ("Drafting as **Sarah**.").
- `picker`: the native author select ("Post author", "Interviewee").
- `description`: one or more muted lines ("RevOps lead · writes Ops Weekly", "$1,400 · In network").
- `fields`: label and value pairs. Ivy ICP: WHO, BUDGET, PLATFORMS. Creator card: AUDIENCE OVERLAP, WHY THIS CAMPAIGN, TRACK RECORD.
- `prompt`, `options` (lettered A, B, C) and `answer` (free text with a send button): Elliot's in-message questions.
- `chips`: auto-width response chips ("Generate now" with `sparkles`, "Different question", "Send to Approvals").
- `note`: "Creator 1 of 5 · 0 selected".
- `choices`: stacked outlined choices with a muted second line ("Q2 SaaS Growth" / "42 creators in pipeline", "Sarah Chen" / "VP Marketing").
- `actions` with `actionsLayout`. `stack` (default) gives full-width buttons 8px apart: "Looks right" / "Change the ICP", "Add Priya" / "Skip". `inline` gives auto-width buttons that wrap: "Open campaign brief" / "Close brief assistant".
- `frame="none"` for a step that lives inside an agent `ChatMessage` (Elliot's draft, angles, interview and source steps). The default `card` is the panel card that sits under the thread.

## Anatomy

- Card: white, 1px `line`, `radius-card` (10px), 16px padding, no shadow. D renders flow cards with this plainer frame, not the `line-insight` bubble frame.
- Eyebrow: 11.2px on a 21px line, `ink-strong`.
- Title: `insight-title` type (16px / 23.2px, 500, -0.025em), `ink-strong`. With `aside`, the row is space-between with a 16px gap.
- Description: `chat-text` type (12px / 19.8px), `muted-panel`, 10px above and 18px below.
- Fields: `dl` with 16px margins. Label: `meta` type (10px / 15px), `muted-overlay`, 10px above. Value: 14px / 21px `ink-strong`, 4px margins.
- Note: 11.2px `muted` on a 21px line. In-message note: 11px `muted-overlay`, 12px above.
- Stack: 14px above, 8px gap. Buttons grow with their text (36px minimum). Primary is 36px (no border), outlined is 38px, as in D. Outlined labels use `ink-strong` like D's card text.
- Choice with a description: two lines 8px apart, the second in `muted`, 66px tall.
- In-message controls (options, chips, select, answer input, send): 1px `chat-flow-border`, `radius-md`, 8px padding, 14px / 21px at weight 450 in `chat-option-ink`. Letters are `muted-overlay`, 14px wide, 10px from the text. The answer placeholder is `chat-flow-placeholder`. Options are 8px apart and start 12px below the prompt. Chips sit 8px below and 4px apart.
- In `FullViewDialog` the card takes D's portal look: `line-overlay` frame, `radius-xl`, `shadow-sm`, 24px padding, and every line at 16px / 24px in the system face.

## States

- Choices and outlined actions hover to `surface-hover` with `ink-hover` text. Primary hovers to 90% fill.
- `disabled` marks an answered in-message step. Its controls dim to `chat-opacity-answered` (D 0.65) and the fieldset disables them. The step also shows an opaque `muted` line, "You answered this step. Continue below." (ENG-3773).
- Loading: D has none for flow steps. Each step appears at once, and the `BusyBar` shows while the flow runs.

## Keyboard and accessibility

- Every control is a native button, select or input, so Tab order and Enter/Space follow the page order.
- The answer input sends on Enter. The send button is named "Send answer".
- The fieldset carries the disabled state, so an answered step's controls leave the Tab order. The fieldset is named by the lead (or the title). Every control in it has `aria-describedby` pointing at the reason line, so a screen reader reading the step hears why the controls are off.
- The title is an h3, so each step is reachable by heading.

## D exceptions

- Control borders: D `#DDDFE4` (card buttons) becomes `control-border` `#858D9E`. D `#DEDEE5` (in-message controls) becomes `chat-flow-border` `#9393AA`, the same hue at 3:1 (control borders 3:1).
- Answer placeholder: D `#27272A` at 50% (renders `#939394`, 3.07:1) becomes `chat-flow-placeholder` `#767677` (Text 4.5:1).
- Glyphs: D's "✎" becomes lucide `pencil`, "↑" becomes `arrow-up`, and "✦" becomes `sparkles`, all at 16px (icon rule). The send button grows from 25px to 34px wide to hold the 24px box.
- Answered step: DS adds the opaque reason line (ENG-3773) and ties it to each control with `aria-describedby` (non-visual, WCAG 1.3.1 and 4.1.2). D shows only the dimmed controls.

## Do / Don't

- Do replace the card with the next step, as D does. Only in-message steps stay in the thread, answered and dimmed.
- Do pass D's copy and case: "STEP 2 OF 3", "Looks right", "Change the ICP".
- Don't put more than one primary action in a stack.
- Don't use `choices` for yes/no answers. Use `actions`.
