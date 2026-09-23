---
name: one-percent-better
description: "Use only when explicitly invoked by name, when an autonomous or daily improvement-discovery pass is requested, or when asked to find and open one worthwhile improvement PR without a predefined ticket. Do not use for an ordinary scoped request that already names the desired change."
compatibility: Requires repository read/write access, git, a test runtime, and authenticated PR access through a CLI, API, or connector. Recurring runs additionally need a scheduler and durable state storage.
metadata:
  version: "1.0.0"
---

# One percent better

## Contract

Find and ship one coherent, evidence-backed improvement or make no change. “One
percent” means the smallest worthwhile change, not a literal metric or a quota.
Any repository layer may change, but autonomous authority ends at the pull
request: never merge, deploy, mutate production, apply production migrations,
change external services, create tickets, or send unrelated notifications.

This is an autonomous pass: make routine choices from repository guidance. If a required decision or capability is missing, report the blocker and stop before dependent edits. Do not wait on interactive questions in an unattended run. Use the host's actual git, file, execution, and PR tools; a skill does not grant permissions the host or user has withheld.

Invoke as:

```text
Use one-percent-better [target]
```

A supplied target is a hard scope boundary. Supporting edits outside it must be
required for integration or verification and explained in the PR.

## Run

### 1. Start clean and enforce the cap

Read repository instructions, pitfalls, and testing conventions. Determine the
repository's upstream and default branch from its git configuration or hosting
service, then successfully fetch that branch before editing. Fetch or authentication
failure means make no edits and report the exact blocker. Then use a clean
isolated worktree (reuse the host's existing isolated checkout if clean) and a unique
`one-percent-better-YYYYMMDD-<slug>` branch with the repository or host's required prefix.
If neither specifies one, use `improvement/`. Never disturb a dirty or
user-owned worktree.

Inspect open PR bodies before discovery. One open PR carrying the marker below
is the default WIP cap. Both modes stop: scheduled runs exit with no output;
interactive runs report the existing PR. Only a current explicit instruction
may override the cap.

### 2. Discover three to five candidates

Resolve the optional target to concrete paths. Inspect recent changes, churn,
tests and checks, reproducible UX/accessibility friction, validation and error
handling, performance/cost, boundaries and duplication, observability, and
coverage. Treat historical mocks and stale comments as evidence only when
current canonical code confirms the problem.

For an unscoped run, feature one lens by UTC calendar-day ordinal modulo five:
correctness/reliability/security; UX/accessibility; performance/cost;
architecture/maintainability; tests/observability/developer experience. Stronger
evidence from another lens may win.

### 3. Gate and rank

A candidate qualifies only with concrete evidence, one-PR independent value, a
credible verification plan, no semantic duplicate or conflict in open or
last-90-day PRs, and expected benefit above regression risk.

Rank qualifying candidates by impact, evidence, confidence, breadth, effort,
reversibility, and blast radius. Prefer the smallest candidate preserving the
benefit. Record a concise finalist comparison, not hidden reasoning. If none
qualifies, make no edits; scheduled runs produce no output.

### 4. Classify sensitive ownership

Before implementation, classify whether the primary paths touch authentication
or authorization, billing or payments, secrets or production environment
configuration, deployment infrastructure, database schemas or migrations,
production-data paths, or external integrations. This is a review-routing
boundary, not a denylist: any layer remains eligible.

For a sensitive candidate, read `CODEOWNERS` and applicable ownership docs,
narrow the change to a reversible branch-only diff, never use live secret or
production values, and never apply a migration. Record the matched owner or
`unowned — human triage required`. Always open the result as a draft even when
checks pass. Prefix its title with `[sensitive]` when an owner is known or
`[needs-owner]` otherwise, and request matched code owners when the repository
supports reviewer requests. An explicit target does not waive this gate.

### 5. Fingerprint and implement

Canonicalize contract version, target or `repo`, lens, primary paths, and the
deficiency statement. SHA-256 hash it; use the first 16 lowercase hex
characters as `opb-v1:<fingerprint>`. Also inspect PRs semantically—the hash is
an aid, not the sole duplicate check. Treat a closed-without-merge match as
ineligible unless evidence materially changed or the current targeted request
explicitly asks to reconsider it.

For behavior changes, write the smallest appropriate test, observe the expected
failure, implement the minimum passing change, then refactor while green. Use
the strongest deterministic validation for configuration or documentation.
Never edit locked golden tests. Abandon a candidate that grows beyond one
independently valuable PR.

### 6. Verify and publish

Run targeted tests, then every relevant repository-required check. Inspect the
final diff for scope, secrets, generated noise, debug output, and accidental
behavior changes.

A ready PR requires all relevant checks to pass and a non-sensitive
classification. A draft is allowed only when targeted verification passes and
either the remaining blocker is demonstrably environmental or unrelated, or
the sensitive-ownership gate requires human approval. The title and body must
clearly identify the blocker or sensitive surface, and publishing the draft
preserves useful, reviewable work. Candidate-caused failures, incomplete
behavior, and unresolved correctness questions get no PR.

Reconcile uncertain push/PR state by branch, commit, and fingerprint before
retrying. If a remote branch exists but PR creation fails, report its branch and
commit, then pause a scheduled run rather than accumulating orphan branches.
Include this body marker:

```text
<!-- one-percent-better
fingerprint: opb-v1:<16-hex>
scope: <normalized-target-or-repo>
lens: <selected-lens>
-->
```

The PR body states evidence and benefit, why this candidate beat the finalists,
scope, risks, checks, rollback, sensitivity (`yes` or `no`), the ownership
route, and any draft blocker. After the PR opens, print its link and stop. Never
merge or start another candidate.

## Scheduled mode

Only when explicitly asked, use the host's supported scheduler to create or update
a daily run. Check existing schedules for the same repository and target first.
If no scheduler or durable state storage is available, return the proposed prompt
and explain what is missing; do not claim a schedule exists or start an unrequested
one-off improvement. Follow the scheduler's actual timezone and cadence settings.
Persist state under a stable key for the repository and target in the scheduler's
storage or a persistent user-selected file outside disposable worktrees.

The saved prompt says:

```text
Use one-percent-better <exact target if any> once in <repository location>. Daily cadence. Open at most
one PR, never merge, stop after opening it, stay silent when the WIP cap is
occupied or no candidate qualifies, and pause after the same blocker occurs on
three consecutive runs. Read and update <durable state location/key> each run.
```

Fill the placeholders before scheduling. Store the schedule identifier, last
outcome, normalized blocker key, and consecutive blocker count in that durable
state; reset the streak after any different outcome. Never rely on conversation
memory surviving the next run. On the third consecutive match, report once and
pause that schedule with the host's scheduler tool. If pausing fails, report the
failure without claiming it stopped. Successful PRs do not end the daily schedule;
the WIP cap keeps later runs silent until review clears it. Confirm the scheduler
returned a saved schedule identifier before reporting that scheduling succeeded.

## Red flags

- A quota, deadline, easy diff, or stale comment is the only evidence.
- One PR contains multiple improvements.
- A target becomes permission for unrelated cleanup.
- An open marked PR is ignored.
- Tests were written after implementation or a golden test was weakened.
- A candidate-caused failure is called environmental.
- Publishing, merging, deploying, ticketing, or starting candidate two occurs
  after the PR opens.

Any red flag means stop, narrow, or abandon the run.
