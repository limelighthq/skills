---
name: recap
description: "Produces a terse, chronological, step-by-step recap of the work done so far in the current session - one short sentence per step, oldest first, ending with where things stand now."
when_to_use: "Use whenever the user asks to summarize progress, recap what's been done, catch someone up mid-session, or get a step-by-step rundown - even when they only imply it. Trigger phrases include \"recap\", \"recap what we've done\", \"summarize our progress\", \"step by step summary\", \"what have we done so far\", \"where are we\", \"remind me what we did\", \"단계별로 요약\", \"지금까지 한 거 요약\", \"한 단계씩 요약\", \"우리 뭐 했지\"."
metadata:
  version: "1.0.0"
---

# recap

Summarize the work done so far in this session as a tight, scannable, step-by-step
list. The goal: a teammate (or your future self) reads it in about ten seconds and
knows exactly what happened and where things stand — no re-reading the whole
transcript.

**Write the recap in English.**

## When to use

Reach for this when the user wants to see the arc of the session at a glance — after
a long debugging chase, before a handoff, when they've lost the thread, or just to
confirm you're both aligned on what's been done. The user often signals it with a
short request like "recap" or "summarize what we did step by step", but also use it
when they clearly want a rundown without naming it.

## How to write it

Reconstruct the session from the actual conversation — what was tried, what was
found, what the user decided — and compress it into one ordered list, **oldest step
first**. Each item is ONE short sentence: a single clause, concrete, past tense.

Think in terms of _what moved the work forward_, not _what tools you called_. Three
greps, two file reads, and a diagnosis that they served collapse into a single step:
the diagnosis. The reader cares about the story, not the mechanics.

## Format rules

- **One line per step, one short sentence.** No clauses stacked with "and then". If a
  step needs two sentences, it's probably two steps — or one that's overstuffed.
- **Oldest first, numbered.** The order _is_ the information; it shows how the work
  unfolded.
- **Outcomes over mechanics.** "Found the Rock key was missing → 503" beats "ran
  gcloud secrets list and grepped the logs". Fold the mechanics into the outcome.
- **Mark who drove what.** Give the user's decisions and inputs their own line,
  visibly attributed — wrap them in parentheses, e.g. `(user added the keys to GCP)`.
  This keeps "what I did" separate from "what the user chose".
- **End with a bold current-position line.** The last line is `**Current position:**`
  — where things stand right now and the immediate next step. This is the part the
  user most often actually wants.
- **No preamble, no paragraphs, no sub-bullets.** Open with the list. Don't introduce
  it with "Here's a summary of...". The list speaks for itself.

## Example

```
- 1. Investigated the Lana signals docs and signal-processing status.
- 2. Found the pipeline complete but its run entry point missing.
- 3. Built the missing tick runner and wired a pnpm script.
- 4. Ran it → the upstream returned 503, zero signals.
- 5. Root-caused it to a missing vendor key.
- 6. (user supplied the key)
- 7. Fetched it, restarted the service → next error surfaced.
- 8. Reproduced and fixed a date-mapping bug in the store layer.
- 9. Re-ran → jobs now persist but stall, unprocessed.
- 10. Traced the stall to a worker with no entry point anywhere.
- **Current position:** about to build a local driver for that worker; awaiting a go-ahead on scope.
```

Keep each line shorter than the explanation of why it mattered — terseness is the
whole point. If the reader wants depth on any step, they'll ask.
