---
name: research
description: "Delegates an investigation to a background agent that reads primary sources - official docs, library source code, specs, first-party changelogs - and captures the findings as a cited markdown file under docs/research/, so hard-won answers stop evaporating into session memory."
when_to_use: "Use when a question needs real source-reading rather than recall - a vendor API's actual behavior, a library migration, an auth flow's contract, a spec detail - especially when the answer will inform a ticket or PR. Trigger phrases include \"research this\", \"dig into the docs\", \"find out how X actually works\", \"what does the spec say\", \"조사해줘\", \"문서 찾아봐\"."
metadata:
  version: "1.0.0"
---

# research

Announce at start: "Using research - dispatching a background investigation."

## The job

Spin up ONE background subagent so the main session keeps working while it reads. Its brief:

1. **Primary sources are the ground truth.** Official documentation, the library's source code, specs and RFCs, first-party changelogs. A blog post or forum answer may point the way, but every claim that matters is followed back to the source that owns it - and cited from there.
2. **Answer the question asked**, then stop - findings, not a survey.
3. **Write one markdown file** to `docs/research/YYYY-MM-DD-<slug>.md` and report its path.

## The document contract

```markdown
# <Question, as asked>

**Date**: <date> · **Asked in**: <ticket / PR / session context, linked> · **Confidence**: <high | medium | low, and why>

## Answer
The direct answer, first.

## Findings
Each finding with its citation - source name, exact URL, and the version or date of the source consulted.

## Sources
Every source consulted, including dead ends, so the next reader doesn't re-walk them.

## Expires
What would make this stale - version bumps, beta flags, dated limits - so a future reader knows when to re-verify.
```

## Hard rules

- **Verified vs inferred stays labeled.** A claim read in the owning source is stated plainly; a claim assembled by inference says so.
- **Cite versions and dates, not just URLs** - documentation moves under its links.
- **Never trust recall for the load-bearing fact.** When the investigation merely confirms what was already believed, the citation is still the point.
- When the research informed a ticket or PR, link the file from it - the note earns its keep by being findable.

## What this skill is NOT

- Not a scratchpad summary - the file is committed, structured, and cited.
- Not scope-to-tickets - this answers a question; it does not plan work.
