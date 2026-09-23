---
name: research
description: "Investigates primary sources and produces a cited research note. Use when asked to research a question, dig into docs, check an API or specification, compare migration behavior, or 조사해줘 / 문서 찾아봐, especially to inform a ticket or PR."
compatibility: Needs access to primary sources through supplied documents, files, browsing, or a connector. Background agents and filesystem writes are optional.
metadata:
  version: "1.0.0"
---

# research

Announce the question being investigated and whether the work will run here or in an available background agent.

## The job

If the host supports delegation and parallel work would help, use one background agent with the brief below. Otherwise do the investigation in the current session. The research contract is the same in either case:

1. **Primary sources are the ground truth.** Official documentation, the library's source code, specs and RFCs, first-party changelogs. A blog post or forum answer may point the way, but every claim that matters is followed back to the source that owns it - and cited from there.
2. **Answer the question asked**, then stop - findings, not a survey.
3. **Deliver one research note.** In a writable project, save `docs/research/YYYY-MM-DD-<slug>.md` relative to that project and report the path. If no project or writable filesystem is available, return the same Markdown in the conversation for the user to save. State whether it was saved; do not claim a commit that did not happen.

Read supplied sources when browsing is unavailable. Label supplied excerpts as such and distinguish them from documents independently fetched. If no source supports the requested answer, state the evidence gap and request the missing document or access. Do not replace verification with memory.

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

- Not a scratchpad summary - the note is structured and cited; commit it when the task's repository workflow calls for that.
- Not scope-to-tickets - this answers a question; it does not plan work.
