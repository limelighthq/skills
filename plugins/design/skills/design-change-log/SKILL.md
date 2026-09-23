---
name: design-change-log
description: "Ships a merged mock change from limelighthq/ux-flow-v1 to engineering: confirms the mirror PR, sends the Slack brief, and writes one row in the Design Change Log database in Notion. Use after merging a design mock change upstream, or when asked to post a design update, log a mock change, or write a change-log entry engineers can build from."
compatibility: Requires authenticated GitHub access to the limelighthq org, through a CLI, API, or connector. Publishing also needs Notion write access to the Limelight workspace and Slack messaging access.
metadata:
  version: "1.0.0"
  owner: design
---

# Design Change Log

One row per update, never one per item. The row is the only thing engineering reads before
building, so every item names the mock file and the identifier that changed.

The Notion entry is not a copy of the PR description. The PR says what you changed. The entry
says what an implementer must now build, what they must not build on, and what changed name.

## What you need before publication

- The upstream PR in `limelighthq/ux-flow-v1`, merged to `main`.
- The mirror PR in `limelighthq/agent-platform`, merged, with files under
  `apps/web/public/ux-flow-v1/`.
- Write access to the `Design updates` database in Notion
  (data source `collection://c019c231-b4ab-4462-a5da-0a76d273ceca`).

If the mirror PR is not merged, stop publishing. A draft may identify the missing evidence, but a published entry describes shipped mocks.

Use the host's available repository, Notion, and Slack tools and their actual
schemas. Resolve the configured database by its ID; connector-specific URI syntax
may differ. Confirm the Slack recipient from the current request or workspace
configuration before sending. If a required connection is missing, draft from
the evidence that is available and report exactly which verification or publishing
step remains blocked. Do not invent PR state, send a substitute notification, or
claim an entry was published. No skill installation creates these service connections.

## Ship sequence

1. **Confirm the upstream PR merged.** Record its number and its merge date. That date is the
   `Date` property and the date in the `Update` title, not today's date.
2. **Find the mirror PR.** It is in `limelighthq/agent-platform`, titled
   `sync ux-flow-v1 prototypes from upstream`, on a branch named `sync-ux-flow-<YYYYMMDD>-<HHMM>`.
   Nothing opens it automatically. If none exists for your upstream merge, use the downstream repository's documented sync process to prepare and open it with the host's available repository tools. If that process or required access is unavailable, report the blocker instead of guessing the sync commands. Follow the downstream repository's review and merge rules; publication waits until the mirror is merged.
3. **Read the sha off the mirror PR body.** The body carries a line
   `Source: limelighthq/ux-flow-v1@<sha>`. Copy that sha into `Mock revision`. If the line is
   missing, stop publication and request the source line; a draft must label it missing. Do not read the sha from the branch, the merge commit, or your own
   memory of the push: `Mock revision` must match what actually shipped downstream.
4. **Draft the entry and get approval.** Write the properties and the body in full, show them to
   the person running the skill, and wait. This is the approval gate for Slack and Notion
   publication. Steps 5 and 6 are outward-facing and go together.
5. **Send the Slack DM** with the brief, as always. Copy its permalink into `Source`.
6. **Create one page** in the `Design updates` database with the properties and body below.

## Properties

| Property | What goes in it |
| --- | --- |
| `Update` | `<YYYY-MM-DD> <agents>: <one-line gist>`. The date is the upstream merge date. |
| `Date` | The upstream merge date. |
| `Agents` | Multi-select from: Ivy, Elliot, Cooper, Lana, Shared shell, Design system. |
| `Kinds` | Multi-select from: Behavioural, Cosmetic, Vocabulary, Caveat, Process note. Tick one for each body section you actually filled, and no others. |
| `Items` | The number of numbered items under "Changes that affect product behaviour". |
| `Summary` | One paragraph, written for an implementer. See "Writing the summary". |
| `Mock revision` | The sha from the mirror PR's `Source:` line. |
| `Mock files` | The files that matter for this update, each followed by its identifiers in parentheses: `_shared/v2-shell.js (flowCtx, flowCards, campaignCard)`. |
| `Upstream PR` | URL of the `ux-flow-v1` PR. |
| `Mirror PR` | URL of the `agent-platform` PR. |
| `Live mock` | URL on `staging.agents.limelighthq.com`. |
| `Source` | Slack permalink of the brief. |
| `Supersedes` | Earlier rulings this update reverses. Leave empty when it reverses nothing. |
| `Decision needed` | Tick only when the "Open questions" section holds a question that blocks implementation and only Grant can answer. |
| `Open questions` | Fill only alongside `Decision needed`. |
| `Posted by` | Your name. |
| `Status` | `New`. Never anything else. |
| `Linear`, `Notes` | Leave empty. Engineering owns these. |

## Body

Use these headings, in this order, every time. Drop a heading only when it has nothing under it.

```
## Changes that affect product behaviour
1. **<Change>.** <What it does to product behaviour. Mock file and identifier.>

## Vocabulary
- <Canonical terms introduced or changed>

## Caveats (do not build on these)
- <Sample values, placeholder assets, computed counts, unresolved ambiguities>

## Not agent-specific
- <Shared shell and design-system changes>

## Process notes
- <Mock-editing gotchas>

## Open questions
- <Questions for Grant; also tick Decision needed>

## Triage (engineering)
```

Leave `## Triage (engineering)` empty. Engineering fills it.

## Classifying an item

Decide per item, not per update. One update usually produces several kinds.

- **Behavioural** — an implementer would build something different because of it. New card sets,
  changed routing, a gate removed, a different shape of state.
- **Cosmetic** — it changes how a surface looks without changing what it does. Column counts,
  borders, type scale, spacing, which element sits where.
- **Vocabulary** — a canonical term arrives or changes meaning, and that term will appear in code
  or in conversation. Not every new string: only the ones people will have to agree on.
- **Caveat** — something visible in the mock that is **not** a specification. Sample values,
  placeholder assets, counts derived from fixed fractions, a control whose destination is not
  built yet. If an engineer could reasonably mistake it for a requirement, it is a caveat.
- **Process note** — a gotcha about editing the mocks, or a step of the ship sequence that could
  not run and why.

A change to the shared shell or the design system goes under "Not agent-specific" even when you
found it while working on one agent's surface. Say which agents reach it and whether you checked
them.

## Writing the summary

One paragraph. Lead with what was wrong or missing, then what now exists, then the blockers you
had to clear to get there. Name identifiers inline. An implementer should be able to read only
the summary and know whether this update touches their work.

## Rules that do not bend

- One row per update. Never one row per item.
- Every item names its mock file and the identifier that changed. An item without an identifier
  is not finished. Write it or drop it.
- `Mock revision` comes from the mirror PR body, never from anywhere else.
- `Date` is the upstream merge date, never today's date.
- Never write `Status` beyond `New`, and never write `Linear` or `Notes`.
- Keep sending the Slack DM. The permalink is the entry's `Source`.

## Stop conditions

Stop publishing and report the blocker when:

- The mirror PR is missing or unmerged.
- The mirror PR body has no `Source: limelighthq/ux-flow-v1@<sha>` line.
- You cannot name a file and an identifier for an item.
- The update reverses an earlier ruling without an agreed `Supersedes` value. Ask for that decision before posting.
- A step of the ship sequence could not run. Say so in "Process notes" rather than skipping it
  silently. You may still return an explicitly unpublished draft with the missing evidence labeled.

## Worked example

[references/example-entry.md](references/example-entry.md) is a complete posted entry: six items,
properties and body. Read it before writing your first entry. It sets the level of detail this log
expects, which prose here cannot convey.
