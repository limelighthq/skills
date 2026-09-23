# Publishing skills to Notion

Git is the source of truth for this repository's skills. Notion is the team's searchable copy. Add a skill, open a pull request, and merge after review. Once activated, GitHub Actions publishes new and changed skills and checks for drift daily. New teammates and new skills do not need new infrastructure.

**Rollout status:** the workflow is implemented but gated by `NOTION_SYNC_ENABLED`. It is not live until the steps below have been completed and a real publish has been verified.

## What gets published

The publisher discovers tracked `plugins/*/skills/*/SKILL.md` files and includes every tracked file in each skill directory. It publishes the name, description, Markdown body, origin, source path, and one complete ZIP attachment to the existing Limelight Skills database. The archive preserves original frontmatter, supporting files, and executable modes. Untracked files and repository maintenance skills are excluded.

Use the Git installation instructions in the README for exact copies. Notion renders its own `SKILL.md` on export; optional frontmatter can be lost, and the ZIP remains an attachment rather than native folders. Notion's [official starter kit](https://github.com/makenotion/notion-skills-github-sync/blob/main/src/notion/archive.ts) expands ZIP attachments when exporting to GitHub. Other clients may not. Do not route this mirror back into this repository or promise that `npx skills add <notion-url>` reproduces it exactly.

The target IDs and imported skills' original repositories live in `notion-sync.json`. A skill born here automatically gets `limelighthq/skills` as its origin. Adding an imported skill requires its provenance entry, not new sync infrastructure. Existing Notion tags and other properties are preserved. Set human-facing tags in Notion as needed; this publisher does not change shared tag options.

## One-time activation

1. Create a dedicated internal Notion connection in the **Limelight** workspace. Give it read, insert, and update content capabilities, and share only the Limelight Skills database with it. Prefer a workspace-owned connection over a person's OAuth session or broadly scoped personal token. Keep two maintainers able to manage the connection and the GitHub repository.
2. Store its token as the repository Actions secret `NOTION_API_TOKEN`. Use GitHub's secret UI or pipe it from your secret manager to `gh secret set NOTION_API_TOKEN --repo limelighthq/skills`. Do not put a token in a command argument, a file in the repo, a log, or a chat. For local checks, load it into the process environment from your secret manager.
3. Merge the reviewed infrastructure change. In a clean checkout of the latest `main`, run `npm ci`, then `npm run notion:schema`. Check the database identity and proposed additions. Run `npm run notion:schema -- --apply` to add only missing publisher properties. The command rejects incompatible property types and never rewrites the Tags options.
4. Run `npm run notion:plan`. Existing names are reported as conflicts until explicitly adopted. Check each matching page's name, Origin, body, and files. Preserve valuable Notion edits in Git first. Add reviewed `"skill-name": "page-uuid"` pairs to `adopt` in `notion-sync.json`, then merge that change. Do not adopt rows belonging to another repo. Adoption replaces the old body and Files with the repo version and ZIP, so review native-folder users before doing it.
5. From the new clean `main`, run the plan again and `npm run notion:publish -- --apply`. Confirm all intended rows and ZIPs in Notion. Test at least one plain skill and one skill with scripts/assets with the team's actual Notion agents. Run the plan again: every skill should say `skip` and there should be no conflicts.
6. Set the repository Actions variable `NOTION_SYNC_ENABLED` to `true`. Run **Publish skills to Notion** with mode `plan`, then mode `publish`. Verify the Actions summary and a second unchanged run before treating activation as complete.
7. At least two maintainers should enable GitHub notifications for failed runs of this workflow. Successful runs stay in Actions; the publisher does not post messages or open recurring issues.

The code can be reviewed and tested without a token using `npm run notion:catalog` and `npm test`. The current Codex Notion connector is a separate connection; changing its workspace does not configure the CI secret.

## Day-to-day use

- **Add or edit:** use the normal reviewed PR flow. Publishing detects changes in scripts and assets as well as `SKILL.md`.
- **Move between plugins:** keep the skill name; the existing Notion row is updated with its new source path.
- **Rename or remove:** the sync reports the old managed row. Review its dependencies, retire it explicitly in Notion, remove a stale adoption mapping, and rerun. No remote row is deleted automatically.
- **Edit a Notion copy accidentally:** the next run fails before publishing. Copy the useful changes into a Git PR, merge, then repair that skill explicitly. Comments and unrelated row properties do not count as edits to managed content.
- **Author skills in Notion:** use a separate database and the official Notion-to-GitHub starter kit with a separate marketplace. Do not point its output at this repo. Every skill should have one editing home.

## Commands

| Command | Effect |
| --- | --- |
| `npm run notion:catalog` | Offline inventory and source hashes. |
| `npm run notion:schema` | Read-only schema plan. |
| `npm run notion:schema -- --apply` | Add missing publisher fields on latest clean main. |
| `npm run notion:plan` | Read every remote row and show changes/conflicts without writing. |
| `npm run notion:publish` | Also a read-only plan until `--apply` is supplied. |
| `npm run notion:publish -- --apply` | Publish and verify; only latest clean main is allowed. |
| `npm run notion:plan -- --repair skill-name` | Preview replacing a specific conflicted/incomplete copy. |
| `npm run notion:publish -- --apply --repair skill-name` | After reviewing the plan, overwrite that copy from Git. Other ownership protections still apply. |

Node 20+ and Python 3.10+ are required. Set `PYTHON` to an interpreter path if `python3` is unavailable. The workflow installs both. No packages outside `npm ci` are required for publishing.

## Failure and recovery

The Actions summary lists the plan; the run fails on an actionable problem. The **Sync state** property records the repo, stable name, source hash, revision, publish phase, and a fingerprint of the last verified remote body and managed properties. Treat it as publisher metadata, not an editable field.

Writes are serialized in GitHub Actions. Do not run a local publish while a workflow publish is active. A failed or truncated remote inventory makes no changes. Rate-limited requests are retried with bounded delays. Ambiguous write failures are not blindly retried because the remote write might have succeeded.

If a run fails after changing a row, its pending marker makes the next run fail visibly. Inspect that row and the failed run, then plan and apply `--repair` for that skill. Previously completed skills are skipped. If creation failed ambiguously, rerun the plan before doing anything else; it finds the new row if Notion created it. Never delete a row just to clear an error.

Before each existing row is changed, its content, ownership marker, and parent are checked against the plan. After writing, the publisher compares fresh Markdown with Notion's normalized write response and downloads the ZIP to verify its exact bytes before marking the row complete. Each page includes a link to its original skill at the published Git revision.

Notion does not provide a transaction covering the whole database or an atomic compare-and-swap for this flow, so a person should not edit a managed row while it is publishing. The publisher reports detected races. It does not claim all-or-nothing publication.

For 401 or 403, check the dedicated connection and database sharing. For 404, verify the database and data source IDs and workspace. Do not replace them with a similarly named database. Rotate a token in GitHub Secrets, rerun a plan, and verify a publish. No code change is needed.

To pause publication, set `NOTION_SYNC_ENABLED` to `false`. The Git marketplace keeps working. To roll back skill content, revert its Git change through a PR and let the next publish apply it; do not edit the Notion copy as a rollback.

## Verification

Run `npm run validate`, `npm test`, and the checks in `docs/portability.md`. The tests cover archive contents and executable modes, full pagination, HTTP failures, ownership isolation, explicit adoption, duplicates, remote drift, interrupted writes, repair, and unchanged reruns. Tests simulate the Notion HTTP boundary; they do not replace the first live verification in step 5.
