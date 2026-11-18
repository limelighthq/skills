---
name: limelight-work
description: "Route Limelight work requests to the right repo/process docs and keep the company workflow index current. Use when someone asks where work should happen, how to turn an idea into execution, what workflow doc to follow, or asks Luna to update the workflow docs when guidance is missing or stale. Triggers on requests like \"use limelight-work\", \"where should this go\", \"how do we handle this\", \"add this to the workflow doc\", or \"ask Luna to update this doc using skill limelight-work\"."
compatibility: Direct execution needs authenticated read access to limelighthq/ai-workflows through a checkout, GitHub CLI, API, or repository connector; publishing also needs write and PR access. Delegating to Luna needs Slack send and reply-read access through Ask Luna instead.
---

# Limelight Work

Single routing skill for Limelight work requests.

If you are a local assistant being asked to ask Luna to do this work, first use
Ask Luna to hand off the request and its authorized scope. Do not start the local
editing workflow as well. The steps below apply when the work is assigned to you
directly, including when you are Luna receiving the handoff.

**Primary index:** `company/workflow/Readme.md`
**Repo:** `limelighthq/ai-workflows`

Paths below are relative to that external repository, not the installed skill or
the current working directory. Resolve an existing checkout of the named repo or
fetch the files through the available authenticated repository tool. If the index
cannot be read, request access or a supplied copy and identify the gap; do not invent
its contents. If read access works but publishing is unavailable, provide the
proposed documentation change and say it has not been published.

## What this skill does

1. Read `company/workflow/Readme.md` first.
2. Route the request to the correct repo or detailed workflow doc.
3. If the existing docs are enough, answer from them and link the exact next doc.
4. If something is missing, unclear, or outdated:
   - update the relevant markdown file in `limelighthq/ai-workflows`
   - keep `company/workflow/Readme.md` high-level and link out to detail pages
   - add a new detailed doc when the process is more than a one-liner
5. When a user explicitly asks to add guidance to the docs, that request authorizes the documentation edit, PR, and merge. Complete that workflow once required checks and reviews pass; do not ask for the same authorization again. Honor any narrower instruction from the user and all repository protections. Report a blocker if the host cannot complete a step.

## Default routing

### Main product work (`limelighthq/code`)
- Start with `company/workflow/engineering-protocol.md` for implementation context.
- Use `company/workflow/engineering-lifecycle.md` for how work moves from idea to production.
- Use `company/workflow/linear-to-production-guide.md` for release and deployment flow.

### Company workflow / automation (`limelighthq/ai-workflows`)
- Use `company/workflow/ticket-creation.md` to turn ideas, requests, and meetings into tickets.
- Use `company/workflow/holistic-overview.md` for the full company + agent operating model.
- Use `company/workflow/linear-webhook.md` for webhook-driven automation.
- Use `company/workflow/post-deploy-verification.md` for post-release checks.

### Social app work (`limelighthq/limelight-social`)
- Start in the repo's blueprint docs and architecture docs.
- Treat blueprints as the entry point before implementation.

### Agent Hub (`limelighthq/agent-hub`)
- Use for internal control-plane operations, dev environments, meetings, and workflow health.

## Updating the docs

When a user says the docs should include something:

1. Find the smallest correct place to add it.
2. Prefer updating an existing detailed doc instead of bloating the index.
3. Keep `company/workflow/Readme.md` to short routing bullets.
4. Add or update links so future requests can be answered directly from docs.
5. In the final report, include:
   - what changed
   - the PR link and actual status, or the proposed patch if publishing was unavailable
   - a GitHub markdown preview link when the updated page is available remotely (`https://github.com/<owner>/<repo>/blob/<branch-or-commit>/<path>.md`), otherwise the local draft artifact or inline proposal
   - any missing pieces or suggestions

## Heuristics

- If a request is operational and recurring, document it.
- If a request is repo-specific, put the detail in that repo or the relevant detailed workflow page, not only in chat.
- If guidance changes often, keep the index stable and update the linked doc.
- If the user asks you to ask Luna to use `limelight-work`, delegate the authorized doc update through Ask Luna; do not also perform it locally. When you are Luna receiving that request, perform the doc workflow below.

## Trigger phrase to honor literally

If someone says:

> ask Luna to update this doc using skill `limelight-work`

then use Ask Luna to send the request and relevant context to the team agent. The explicit update request authorizes that doc workflow, subject to the rules above. If Ask Luna or Slack access is unavailable, return an unsent handoff rather than silently substituting local execution. When you are Luna receiving the delegated request, read the workflow index, update the right markdown file in `limelighthq/ai-workflows`, and ship the doc change through PR and merge under the rules above.
