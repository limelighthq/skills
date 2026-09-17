---
name: handoff
description: "Packages the current session into a forward-looking handoff document a fresh session, another machine, or a colleague can resume from - destination, state, decisions with their why, artifact pointers, gotchas, and resume steps - written outside the repo so no branch or worktree recycling can eat it."
when_to_use: "Use at a phase boundary when the work must travel - a fresh session, a new worktree or repo, another harness, a colleague, or a mid-phase fork - or when the context window is degrading and continuing would flatten decisions. Trigger phrases include \"hand this off\", \"handoff\", \"handoff doc\", \"prep a fresh session\", \"package this up for a new session\", \"새 세션으로 넘겨줘\", \"인수인계\"."
metadata:
  version: "1.0.0"
---

# handoff

Announce at start: "Using handoff - packaging this session for its successor."

## First, confirm handoff is the right move

Work the phase-boundary options top to bottom; the first yes wins. Only option 3 is this skill - if an earlier option wins, say so and stop.

1. **Continue** in this session - the next phase needs this conversation as a primary source, or plenty of sharp context remains. Costs nothing; rule it out first.
2. **Start clean** - everything here is disposable exploration; a fresh session with no baggage beats any summary.
3. **Handoff (this skill)** - something must TRAVEL: a new session or worktree, another harness or machine, a colleague, or a side task forked mid-phase without derailing this one.
4. **Subagent** - the remaining task is scoped tightly enough to run away-from-keyboard; dispatch it and keep this session.
5. **Compact** - relevant context, same place, and the human stays in the loop; summarize in place as the deliberate last resort. A fresh session that is confidently wrong about a decision the summary flattened is the failure mode to respect.

Every option except Continue trades the full-but-noisy primary source for a lossy-but-roomy summary; pay that only when staying costs more.

## Write the document

Path: `~/.claude/handoffs/YYYY-MM-DD-<slug>.md` - user-global on purpose: scratchpads, worktrees, and session state all get recycled; this directory survives them. Create it if missing, and print the absolute path when done.

Structure - every section present, one honest line if empty:

```markdown
# Handoff - <task title>

**Written**: <date> · **From**: <repo / branch / worktree> · **For**: <what the successor will do>

## Destination
What finished looks like, in one or two lines.

## State
Done / in flight / not started - as facts, with PR numbers and branch names.

## Decisions and why
Each decision the successor must not re-litigate, with the reason it was made.

## Artifacts
PRs, branches, files, tickets, reports - referenced by path or URL, never duplicated into this document.

## Gotchas hit
The scars: what bit this session and how it was resolved or worked around.

## Suggested skills
Which skills the successor should invoke, and for what.

## Resume by
The first three concrete actions the successor takes, in order.
```

## Hard rules

- **Reference, never duplicate.** Anything already captured in a PR, ticket, commit, report, or doc is linked by path or URL, never duplicated - the artifact is the source of truth and a copy would drift.
- **Redact secrets.** No credentials, API keys, or token values ever enter the document - name where a secret lives (env var, secret manager), never what it is.
- **Decisions carry their why.** A bare decision invites re-litigation; the reason is what makes it durable.
- **Write for a cold reader.** The successor has none of this conversation; codenames and shorthand invented mid-session are spelled out or dropped.

## What this skill is NOT

- Not recap - recap is the backward-looking step list for a reader in THIS session; handoff is the forward brief for the NEXT one.
- Not memory - durable cross-session facts belong in memory or repo docs; a handoff document is consumed once by its successor.
