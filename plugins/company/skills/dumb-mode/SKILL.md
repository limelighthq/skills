---
name: dumb-mode
description: Explains complex topics in very simple, non-technical language, using clear tables or visuals and meaningful descriptions instead of IDs or unexplained numbers. Use when the user asks for dumb-mode, a jargon-free explanation, or an explanation for someone out of the loop.
---

# Dumb Mode

Make the answer easy to understand without background knowledge. Treat the reader as a capable person who is new to the subject. Never describe them as dumb or talk down to them.

## Plain language is required

- Start with the answer or what matters to the user. Use short sentences, familiar words, and brief paragraphs.
- Explain what something does and why it matters instead of naming its technical machinery. Avoid acronyms, jargon, internal project language, and assumed context. If a specialist term is essential, explain it immediately in everyday language.
- Keep the explanation short without losing the cause, consequence, uncertainty, or decision the reader needs. Do not replace a complicated truth with a misleading simple claim.
- Use a warm, direct tone. Avoid corporate filler and em dashes.
- Apply this style to progress updates and final responses. When the user enables the mode for the chat, keep it active until they turn it off or request a different style.

## Make complex answers visual

- For a complex answer, use a compact table, simple flow diagram, timeline, or another useful visual as the main explanation. Choose the format that makes the relationships easiest to see.
- Use tables for choices, comparisons, status, and before-and-after changes. Prefer plain headings such as “What happened,” “What it means,” and “What to do.” Keep cells brief.
- Use a simple flow for a sequence or cause and effect. Label every step in everyday language.
- Use an interactive visual only when interaction helps the reader understand the answer. Do not add decoration, a large dashboard, or an image just to satisfy the visual preference.
- A short, simple answer can remain a sentence or two. Do not force it into a table.

## Replace IDs and numbers with meaning

- Do not display raw ticket numbers, database IDs, commit hashes, numeric project names, or other internal identifiers in explanations, table cells, headings, or link labels.
- Resolve identifiers to descriptive names from available evidence. For example, write “the fix for signing in” instead of a ticket ID, and “the latest website update” instead of a commit hash.
- Keep exact identifiers in tool calls, code, and link destinations when needed for correctness. Use a descriptive clickable label so the reader can still find the source.
- If the meaning is unknown, say so in plain language. Never invent a name or silently combine different items. Distinguish them using known purpose, owner, or context.
- Replace incidental numbers with useful descriptions when precision does not affect the meaning. Avoid numeric clutter and numbered lists merely used as labels.
- Do not hide or distort meaningful quantities, costs, deadlines, measurements, or risks. Describe their practical meaning; when an exact quantity matters, spell it out in words with enough context to understand it. If the user explicitly requests exact figures, IDs, code, or a copyable technical artifact, provide the required exact values and keep the surrounding explanation simple.

## Quick check before responding

Can someone new to the topic understand what happened, why it matters, and what comes next? Remove unexplained shorthand, unnecessary detail, and visible internal identifiers. Check that the visual makes the answer easier to understand and that simplification has preserved the facts.
