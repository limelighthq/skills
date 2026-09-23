---
name: handoff
description: "Packages session state, decisions, artifact pointers, and resume steps into a handoff. Use when asked to hand work off, prepare a fresh session, move work to another agent or colleague, or 새 세션으로 넘겨줘 / 인수인계, especially at a phase or context boundary."
metadata:
  version: "1.0.0"
---

# handoff

Announce at start: "Using handoff - packaging this session for its successor."

## First, confirm handoff is the right move

If the user explicitly requests a handoff, write it. Otherwise, when choosing how to manage a phase or context boundary, work the options below top to bottom; the first yes wins. Only option 3 is this skill. Do not use these alternatives to overrule an explicit handoff request.

1. **Continue** in this session - the next phase needs this conversation as a primary source, or plenty of sharp context remains. Costs nothing; rule it out first.
2. **Start clean** - everything here is disposable exploration; a fresh session with no baggage beats any summary.
3. **Handoff (this skill)** - something must TRAVEL: a new session or worktree, another harness or machine, a colleague, or a side task forked mid-phase without derailing this one.
4. **Subagent** - if the host supports delegation and the remaining task is scoped tightly enough to run independently, dispatch it and keep this session.
5. **Compact** - if the host supports compaction: relevant context, same place, and the human stays in the loop; summarize in place as the deliberate last resort. A fresh session that is confidently wrong about a decision the summary flattened is the failure mode to respect.

Every option except Continue trades the full-but-noisy primary source for a lossy-but-roomy summary; pay that only when staying costs more.

## Write the document

Use the user's chosen destination. Otherwise, on a host with persistent file access, use a `handoffs` directory under the user's Documents folder, outside disposable repositories and worktrees. Resolve the home/Documents location with the host's filesystem tools rather than assuming a Unix path. Name the file `YYYY-MM-DD-<slug>.md`; avoid overwriting an existing handoff. Create the directory if needed and print the actual absolute path.

If the filesystem is temporary, inaccessible, or absent, return the complete Markdown as a downloadable artifact or in the conversation and say it needs to be saved. Do not claim persistence beyond the host's guarantees. For another machine, prefer remote URLs and repo-relative paths with revision IDs; label local-only paths so the successor knows what still needs transferring.

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
