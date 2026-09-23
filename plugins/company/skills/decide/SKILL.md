---
name: decide
description: "Walks through open decisions one at a time with three options and a recommendation. Use when asked to use decide, go through decisions, compare options for open questions, or resolve several choices that need the user's judgment."
metadata:
  origin: "https://github.com/glisom/skills/tree/8cb1fa1aef87aa2769a38b4bef1ac698f3e20130/plugins/decide/skills/decide"
---

# Decide

Help the person make the choices that belong to them, without a wall of questions. This skill works in a plain conversation; a structured question tool is optional.

## Collect the decisions

1. Gather open decisions from the conversation, the plan or design, and anything flagged as needing input.
2. Keep only decisions that need the user's judgment. Make routine choices with clear defaults yourself and mention those defaults in the final summary. Do not turn existing authorization into a new approval question.
3. Put blocking decisions first, before choices that depend on them. Merge choices that always move together. Do not invent decisions to fill the list. If there are none, say so and continue the authorized task.

## Ask one at a time

Ask exactly one decision at a time. Give only a short count of the remaining decisions, not a preview of all their questions.

Use the host's available question tool when it supports the needed interaction and its usage rules allow it. Follow its actual schema. Give three meaningful options, with the recommended option first and `(Recommended)` at the end of its label. Each option gets a short description of its benefit and tradeoff. If the tool includes free-text input, do not add an "other" option.

If no suitable question tool is available, ask in plain text: one short line of context, three numbered options with the recommendation marked, and a note that the user can answer in their own words. Do not invoke a tool merely because another agent uses that name.

Wait for the answer before choosing an option, taking dependent action, or asking the next decision. An asynchronous question tool returning is not an answer. Independent work can continue while the question is pending.

Take a free-text answer as final. Clarify only if it is genuinely ambiguous. Update later decisions if the answer removes them or changes their options. Keep tradeoffs in the option descriptions, not a long preamble.

## Finish

After the last answer, give a compact summary of the decisions and answers, plus the defaults chosen without asking.

If these decisions were blocking an already authorized task, continue it. If the user invoked decide to plan or review before work, stop after the summary. If the next action's scope is unclear, ask one focused question about that action.
