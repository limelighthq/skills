---
name: deep-module-scan
description: "Read-only architecture scan that finds shallow-module clusters in a target area and ranks module-deepening candidates by coupling and test gap. Reports the cluster members, the evidence that they are coupled, current test coverage, a proposed deepened interface, and the test boundary that interface would make possible. Reports only - never writes code, never edits modules, never files Linear tickets."
when_to_use: "Use when an area of the codebase is hard for agents (or people) to change safely, when tests there are mock-heavy or absent, or before investing in a refactor and you want the highest-leverage boundary first. Trigger phrases include \"deep module scan\", \"scan the architecture\", \"find shallow modules\", \"where should we refactor\", \"why is this area hard to test\", \"module boundaries\", \"아키텍처 스캔\", \"모듈 경계 봐줘\"."
metadata:
  version: "1.0.0"
---

# deep-module-scan

Finds where a target area is built from **shallow modules** — many small units each exposing a wide
surface — and ranks the clusters worth collapsing into **deep modules**: a small interface with
substantial functionality behind it.

**Why this is worth doing:** the quality of an area's feedback loops is the ceiling on how well anyone,
human or agent, can change it. Shallow modules leave only two testing options, and both are bad. Draw
the boundary around one unit and you mock its neighbours, so the test proves the mocks agree with each
other. Draw it around the whole cluster and it passes for reasons nobody can name. A deep module lets
one boundary catch real behavior, which raises the ceiling.

**Invocation shape:**

```
deep-module-scan <target-path>
```

- `<target-path>` (**required**) — a directory to scan, e.g. `deep-module-scan packages/db/src` or
  `deep-module-scan apps/web/src/lib/ivy`.

**Announce at start:** `"Using deep-module-scan on <target> — I'll report ranked deepening candidates. I won't change any code or file tickets."`

## Refuse an unscoped scan

If no `<target-path>` is given, or the target is the repo root / a whole app (`apps/web`, `packages`),
**stop and ask for a narrower target.** Do not scan and truncate.

An unscoped scan produces a ranked list whose top entries are wherever the repo happens to be biggest,
not where the leverage is — and it reads as authoritative because it is ranked. A list that looks like
analysis and is really a size histogram is worse than refusing. Mirrors how `scope-to-tickets` refuses
"scope all of Lana".

## Phases

### SCAN — inventory the target

For every source file under the target, record: the symbols it **exports**, the modules it **imports**
from inside the target, the modules **importing it**, and the test files that reference it.

Two ratios matter more than raw counts:

- **Surface ratio** — exported symbols ÷ file size. Many exports from a small file is the shallow
  signature: the module is a bag of functions, not an abstraction.
- **Fan-in breadth** — how many *distinct* callers reach it. A module with one caller is not shallow;
  it is inlined-but-separate, and merging it is cheap and low-value.

Output: a table of modules with those figures. No judgement yet.

### CLUSTER — group by coupling evidence, and name the evidence

Group modules that change together. **Every cluster carries the evidence that put it there** — a
cluster without stated evidence is a guess wearing a number:

| Evidence | What it looks like |
| --- | --- |
| Shared type | Two modules both import/return the same domain type, and neither owns it |
| Mutual import | A imports B and B imports A, or a cycle through a third |
| Common caller | One caller imports 3+ of them together and always in the same order |
| Shared fixture | Their tests build the same setup, implying one real unit |

Prefer clusters of **3–7 modules**. A pair is usually a rename, not a boundary; a dozen is a package.

### RANK — coupling × test gap

Order by leverage, not size:

- **Coupling weight** — distinct evidence kinds above (1–4), not the member count.
- **Test gap** — 2 for no tests at all, 1 for mock-heavy tests (test file imports `vi.mock` /
  `jest.mock` for a *sibling in the same cluster*, which is the mock-soup signature), 0 for tests that
  cross the whole cluster already.

**A cluster with zero coupling evidence never ranks, whatever its test gap.** Untested code is a
coverage problem; this skill is only about boundaries. Say that plainly in the report rather than
padding the list.

### REPORT — one block per candidate, highest leverage first

Per candidate:

1. **Members** — file paths.
2. **Why coupled** — the evidence kinds, each with a concrete instance (`both return \`CreatorRow\``,
   not "shared types").
3. **Current coverage** — which tests exist, and whether they mock siblings.
4. **Proposed interface** — the few functions a caller would need if this were one module. If you
   cannot name it in under ~5 functions, say so; that is a signal the cluster is really two.
5. **Test boundary it enables** — the single test that becomes possible, and what it would catch that
   today's tests cannot.

Close with what was scanned and what was **excluded and why** — a ranked list that silently dropped
half the target reads as complete. Name the exclusions.

## What this skill does NOT do

- **It never writes or edits code.** No refactors, no moved files, no "while I was here" fixes.
- **It never files Linear tickets** and never creates a project. Hand findings to `scope-to-tickets` if
  the work should be scoped; that skill owns ticket creation.
- **It does not rank clusters it cannot justify.** No coupling evidence, no entry.
- **It does not scan unscoped.** See the refusal rule above.
- **It does not judge code quality generally** — not naming, not style, not performance. Boundaries and
  their testability only.

## Stop conditions (always)

- Target missing or too broad → refuse and ask for a narrower path.
- Target has fewer than ~5 source files → report that it is too small to have a boundary problem, and
  stop. Do not manufacture candidates.
- No cluster has coupling evidence → report "no deepening candidates found" and stop. This is a real,
  useful result; an empty list is a finding, not a failure.
- Report delivered → stop. Acting on it is a separate, explicit step.

## References

- Ticket creation belongs to whatever planning skill or process the repo uses; this skill reports,
  it never files.
- `.claude/PITFALLS.md` #6 (tests that codify the bug, empty test files) — the recurring symptom whose
  structural cause this scan surfaces.
