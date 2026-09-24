# Two-way Notion sync implementation plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan in this session. Prior user authorization requests autonomous completion, with human help only where required.

**Goal:** Synchronize managed skill edits in both directions with validation and conflict protection.

**Architecture:** Add a Notion importer that creates GitHub pull requests with verifiable import receipts. Validate the immutable candidate in credential-free jobs, then recheck and merge it before publishing main with the existing verified publisher.

**Tech stack:** Node 24, Python 3.12 standard library ZIP handling, YAML, Git, GitHub Actions and the Notion REST API.

**Spec:** [Two-way sync design](../specs/2026-09-24-notion-two-way-sync-design.md).

## Global constraints

- Preserve full skill bundles, YAML metadata, and executable modes.
- Both-side changes conflict at the skill level; no last-writer-wins behavior.
- Only managed rows participate; no automatic archive or deletion.
- Never execute imported scripts with write credentials or Notion credentials.
- Run `npm run validate`, `npm test`, portability checks, and actionlint before release.

## Review focus

- A second Notion edit after a candidate was prepared must remain unacknowledged.
- A receipt for another page, source, or baseline must never bypass drift protection.
- Archive entries must never escape the skill or exhaust memory.
- Normalization must not cause a write loop or remove user-authored text.
- Bot-created pull requests and merges must run validation and publishing explicitly.

## Task 1: Import reconciliation and receipts

Files: `tools/notion/import.mjs`, `tools/notion/sync.mjs`, `tools/notion/catalog.mjs`, `tests/notion-import.test.mjs`.

Interfaces: `planImports(api, config, skills, receipts)` returns candidates and conflicts; `planSync(..., { receipts })` recognizes only a matching receipt. `skillHash(skill)` computes the existing catalog hash from source path, origin, files.

- [ ] Write behavior tests for a real publish, a Notion body edit, preserving frontmatter, verified re-publication, no-op, double edits, conflicting Git edits, and mismatched receipts.
- [ ] Run `node --test tests/notion-import.test.mjs` and confirm the missing behavior fails.
- [ ] Implement pure reconciliation and receipt matching; preserve the existing fail-before-write behavior.
- [ ] Run `npm test` and commit the passing task.

## Task 2: Supporting bundles

Files: `tools/notion/unpack.py`, `tools/notion/client.mjs`, `tools/notion/import.mjs`, `tests/notion-import.test.mjs`, `tests/notion-client.test.mjs`.

Interfaces: `downloadFile(file)` returns capped bytes without credentials to storage; ZIP reader returns regular, confined relative paths, bytes, and modes.

- [ ] Test a complete changed ZIP, preserved modes, traversal, links, duplicates, excessive expansion, and remote changes during download.
- [ ] Observe failure, implement safe extraction and file download, then rerun tests.
- [ ] Commit only passing behavior.

## Task 3: GitHub coordinator and workflow

Files: `tools/notion-import.mjs`, `tools/notion/github.mjs`, `.github/workflows/sync-notion.yml`, `.github/workflows/validate.yml`, `.github/workflows/publish-notion.yml`, `tools/notion-sync.mjs`.

Interfaces: trusted main CLI `prepare` creates or reuses an immutable candidate branch/PR, emits SHA and PR number; `finish` validates candidate scope, current main, and current Notion snapshots before merging. `notion-sync.mjs` loads committed receipts during publish.

- [ ] Test coordinator guard decisions using mocked external API boundaries and real local Git candidates.
- [ ] Observe failures; implement candidate construction, checks, stale-source rejection and merge.
- [ ] Reuse validation as a callable workflow with an explicit revision and no inherited secrets. Run publication explicitly after the bot merge.
- [ ] Keep the import schedule disabled until manual end-to-end verification passes; share the publishing concurrency group.
- [ ] Run `npm run validate`, `npm test`, `npm run test:install`, Python script checks, and `actionlint`; commit.

## Task 4: Documentation, review and activation

Files: `AGENTS.md`, `README.md`, `docs/notion-publishing.md`, legacy publishing skill, this plan.

- [ ] Explain both authoring surfaces, automatic merge preference, supported ZIP editing, conflict handling, and rollout boundary.
- [ ] Obtain independent whole-branch review and resolve substantive findings with regression tests.
- [ ] Open and attach a pull request, verify CI, then merge under existing setup authorization.
- [ ] Run an unchanged import plan, a reversible Notion-to-GitHub test, GitHub-to-Notion restoration, and final no-op verification.
- [ ] Enable automatic reconciliation only after those checks; record exact results and any remaining human-only action.
