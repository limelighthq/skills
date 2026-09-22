---
name: ship-to-production
description: "Drives a change through the limelighthq/code monorepo from open pull request to production: labels the PR so the third required check posts, lets the reviewer squash-merge it to main for staging, then cuts a dated release PR into production. Use when shipping or releasing a change in that repo, when a PR shows every check green but will not merge, or when someone asks to deploy to staging or production."
when_to_use: "Use for any limelighthq/code PR that must reach production, and whenever a PR sits at mergeStateStatus BLOCKED with no failing check. Trigger phrases include \"ship this\", \"deploy to production\", \"cut a release\", \"release PR\", \"why won't this PR merge\", \"the PR is stuck\", \"Review score gate is missing\", \"hermes-review\"."
compatibility: "Specific to the limelighthq/code monorepo. Requires git and the gh CLI authenticated with push access to limelighthq/code."
metadata:
  version: "1.0.0"
---

# ship-to-production

Two merges ship a change. They are separate and only the second one reaches production.

| Stage | Merge | Deploys |
| --- | --- | --- |
| 1 | feature PR → `main` | staging only |
| 2 | release PR → `production` | production |

Merging to `main` deploys nothing to production. A release is a second, manual step.

Announce at start: "Using ship-to-production - stage 1 is the PR into main."

## Stage 1 - merge the PR into `main`

### 1. Add the `hermes-review` label first

`main` requires three status checks: `Build Gate`, `GraphQL Split Gate`, and `Review score gate`. The first two run automatically on every PR. **`Review score gate` is only ever posted for a PR that carries the `hermes-review` label.**

Without the label the PR is never reviewed, the third check never appears, and the PR sits at `mergeStateStatus: BLOCKED` while every visible check is green. It reads exactly like a hang. This is the most common reason a `code` PR will not merge.

```bash
gh pr edit <n> --add-label hermes-review
```

Adding the label authorizes an automatic merge. Do not add it until the PR is ready to merge.

The rule lives in `is_eligible()` in `.github/scripts/hermes_pr_review.py`. That function also rejects a PR that is a draft, comes from a fork, targets a branch other than `main`, or carries an Eva ownership label (`ready-for-evaluator`, `evaluator:running`, `evaluator:passed`, `evaluator:failed`, `auto-merge-by-eva`, `eva:auto`). Check those before you blame the label.

### 2. Wait about a minute for the reviewer to pick it up

A local Hermes cron ticks about once per minute. It is a dispatcher on Youngjae's Mac, not a GitHub runner.

```bash
gh pr view <n> --json labels,statusCheckRollup,mergeStateStatus
```

A `review:running` label appears first. Then `Review score gate` resolves, and the score sits in the check's own description text, such as `Hermes local review score 8.5/10 meets 8/10`.

### 3. Let the automation merge it

A score of 8/10 or higher makes the automation squash-merge the PR once the other required checks pass. **Do not merge by hand.** Watch for the merge instead:

```bash
gh pr view <n> --json state,mergedAt,mergeStateStatus
```

A score below 8 needs the fixer. Add the second label; both are required before the fixer will touch branch content.

```bash
gh pr edit <n> --add-label hermes-autofix
```

The fixer applies fixes, pushes, and the reviewer re-scores the new SHA. A score is bound to the SHA it was given, so a green gate never carries over onto later commits.

### 4. Watch the staging deploy

The merge to `main` triggers path-filtered staging deploys. Nothing goes to production.

```bash
gh run list --branch main --limit 10
```

| Target | URL | Typical time |
| --- | --- | --- |
| webapp | `https://app.llt-dev.com` | about 5 min |
| admin | `https://adm.llt-dev.com` | about 5 min |
| Strapi | - | 12 to 16 min |

Strapi is slow by design: it deploys with no traffic, runs a health check, then migrates traffic.

### When the gate never appears

| Symptom | Cause | Do this |
| --- | --- | --- |
| No `Review score gate`, no `review:running`, PR `BLOCKED` | No `hermes-review` label | Add the label. |
| Label present, nothing for about 15 to 20 minutes | Dispatcher host is offline | Ask Youngjae to check the host. Do not re-label. |
| Label present, PR is a draft or from a fork | Ineligible by rule | Mark ready for review. A fork PR cannot use this lane. |
| Gate red with no score | Review infrastructure outage | Reviews are not optional. An admin bypass is the release valve; escalate rather than self-merging. |

## Stage 2 - cut the release into `production`

### Approval point: a release ships everything on `main`

A release promotes every commit on `main`, not only the PR that prompted it. Print the range and get an explicit human yes on it before you create the branch:

```bash
git fetch origin && git log --oneline origin/production..origin/main
```

Treat "ship my fix" and "deploy everything currently on main" as different requests. If the range contains commits the requester did not name, show them the list and stop until they approve it. This is the one hard approval in this skill: merging to `production` deploys and is not reversible by closing a PR.

### 1. Create the branch from `main`

```bash
git fetch origin && git checkout -b release-$(date +%Y-%m-%d_%H%M) origin/main
```

### 2. Add the empty commit

```bash
git commit --allow-empty -m "release: snapshot"
```

This is required. Without it the branch shares `main`'s SHA, and GitHub wrongly attaches the staging deploy checks to the release PR.

### 3. Verify the tree is identical to `main`

```bash
git rev-parse HEAD^{tree} origin/main^{tree}
```

Both lines must match. Identical trees with different commit SHAs is the exact condition `.github/scripts/graphql-split-comparison-base.js` needs to compare the phase gates against `main` instead of `production`. Without it the gates re-present every already-merged commit as a new phase and fail. If the trees differ, delete the branch and re-cut it from current `origin/main`.

### 4. Push and open the PR

```bash
git push -u origin HEAD
```

```bash
gh pr create --base production --title "release: $(date +%Y-%m-%d)" --body "..."
```

Only one release PR may be open at a time. Close any older one first.

To auto-close the Linear release ticket on merge, put its marker on its own line in the body: `<!-- LINEAR_TICKET: KIT-NNN -->`.

### 5. Merge, then watch the production deploy

`production` has **no required checks**. A release PR can be merged with every check red. The guardrails that protect `main` are absent here, so the judgment call is yours and the human's.

Merging runs `deploy-production.yml` in order: Strapi first, then agent, leadgen, API, and MCP in parallel, then webapp, admin, and docs in parallel. The full E2E suite runs after the deploy.

```bash
gh run list --branch production --limit 10
```

## Known flake: heap OOM in the split gates

`Parity, Determinism and Guards` intermittently fails during the step `Build webapp (STG + PROD equivalent, no deploy)`:

```
FATAL ERROR: Ineffective mark-compacts near heap limit
JavaScript heap out of memory
```

Exit code 134. That job builds the webapp twice on one runner. This is a CI resource failure, not a code failure. Re-run it:

```bash
gh run rerun <run-id> --failed
```

Treat it as real only after roughly three consecutive failures on the same SHA.

Do not confuse it with genuine drift. Drift fails a different pair of gates - `Cutover Approval Gate` or `Absent-Monolith Build` - and re-running does not help. The fix for drift is to re-cut the release branch from current `origin/main` and repeat the tree check in stage 2, step 3.

## Stop and ask a person when

- The `origin/production..origin/main` range holds commits nobody approved.
- A release PR is already open.
- The tree check in stage 2, step 3 does not match after one re-cut.
- The Hermes gate is red with no score, or nothing happens 20 minutes after labeling.
- Anything suggests merging to `production` against red checks.

## Source of truth

`docs/ci-cd-workflows.md` in the `code` repo is current. `docs/deploy/README.md` in that repo is stale: its PR Automation section describes deleted workflows and its release process points at a script that no longer exists. Do not follow it.
