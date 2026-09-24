# Publishing skills to Notion

Git is the source of truth for this repository's skills. Notion is the team's searchable copy. Add a skill, open a pull request, and merge after review. GitHub Actions publishes new and changed skills on every merge to `main` and checks for drift daily at 09:23 UTC. New teammates and new skills do not need new sync infrastructure.

**Rollout status:** activated on September 23, 2026, with `NOTION_SYNC_ENABLED=true`. The [first successful publish](https://github.com/limelighthq/skills/actions/runs/35950818191) verified all ten skills and their exact ZIP bytes. The [follow-up plan](https://github.com/limelighthq/skills/actions/runs/35951019523) skipped all ten unchanged skills without conflicts and left seven unrelated rows alone. The dedicated **Limelight Skills Publisher** connection has only read, insert, and update content capabilities, scoped to this Skills database. Workspace owners can always manage the connection, and the GitHub repository has multiple administrators.

The initial migration adopted nine reviewed pages in place and created `decide`. Those pages contained older repo versions, with no unique edits to carry into Git. Eight had no attachments. The `design-change-log` reference folder contained `example-entry.md`, whose preview matched the bundled reference. Publication replaced its Files entry with the complete repo ZIP; the publisher did not delete the old folder.

In the team's [native Notion AI acceptance test](https://app.notion.com/chat?t=3e51109380998035be1600a91a506eff), the agent loaded and used `recap`, extracted the `annotate-ui-screenshots` ZIP, and ran all 13 bundled tests successfully with Python 3.13.14 and Pillow 12.3.0. It also loaded and extracted `md-render`, but could not render HTML because that runtime lacked the Markdown package and could not reach the Python package index. This is a runtime dependency limit: the files arrived, but a skill cannot supply package-network access. Use a host with the documented dependencies for that renderer. ZIP access was verified in this Notion agent, not every possible client.

## What gets published

The publisher discovers tracked `plugins/*/skills/*/SKILL.md` files and includes every tracked file in each skill directory. It publishes the name, description, Markdown body, origin, source path, and one complete ZIP attachment to the existing Limelight Skills database. The archive preserves original frontmatter, supporting files, and executable modes. Untracked files and repository maintenance skills are excluded.

Use the Git installation instructions in the README for exact copies. Notion renders its own `SKILL.md` on export; optional frontmatter can be lost, and the ZIP remains an attachment rather than native folders. Notion's [official starter kit](https://github.com/makenotion/notion-skills-github-sync/blob/main/src/notion/archive.ts) expands ZIP attachments when exporting to GitHub. Other clients may not. Do not route this mirror back into this repository or promise that `npx skills add <notion-url>` reproduces it exactly.

The target IDs and imported skills' original repositories live in `notion-sync.json`. A skill born here automatically gets `limelighthq/skills` as its origin. Adding an imported skill requires its provenance entry, not new sync infrastructure. Existing Notion tags and other properties are preserved. Set human-facing tags in Notion as needed; this publisher does not change shared tag options.

## One-time activation

1. Create a dedicated internal Notion connection named **Limelight Skills Publisher** in the **Limelight** workspace. Give it read, insert, and update content capabilities, and share only the Limelight Skills database with it. Prefer a workspace-owned connection over a person's OAuth session or broadly scoped personal token. If Notion disables the API-token option because you cannot create internal connections, ask a workspace owner to create this connection. Keep two maintainers able to manage the connection and the GitHub repository.
2. Store its token as the repository Actions secret `NOTION_API_TOKEN`. Use GitHub's secret UI or pipe it from your secret manager to `gh secret set NOTION_API_TOKEN --repo limelighthq/skills`. Do not put a token in a command argument, a file in the repo, a log, or a chat. For local checks, load it into the process environment from your secret manager.
3. With the reviewed infrastructure on `main`, run **Publish skills to Notion** manually with mode `schema-plan`. Check the database identity and proposed additions in the run's summary. Run mode `schema-apply` to add only missing publisher properties. The command rejects incompatible property types and never rewrites the Tags options.
4. Run mode `plan`. Existing names are reported as conflicts until explicitly adopted. Check each matching page's name, Origin, body, and files. Preserve valuable Notion edits in Git first. Add reviewed `"skill-name": "page-uuid"` pairs to `adopt` in `notion-sync.json`, then merge that change. Do not adopt rows belonging to another repo. Adoption replaces the old body and Files with the repo version and ZIP, so review native-folder users before doing it.
5. Run mode `plan` again, then mode `publish`. Confirm all intended rows and ZIPs in Notion. Test at least one plain skill and one skill with scripts/assets with the team's actual Notion agents. Run `plan` again: every skill should say `skip` and there should be no conflicts.
6. Set the repository Actions variable `NOTION_SYNC_ENABLED` to `true`. Run **Publish skills to Notion** with mode `plan`, then mode `publish`. Verify the Actions summary and a second unchanged run before treating activation as complete.
7. At least two maintainers should enable GitHub notifications for failed runs of this workflow. Successful runs stay in Actions; the publisher does not post messages or open recurring issues.

Notification preferences are per person and were not verified during activation. Each maintainer should confirm their own failed-run notifications.

The code can be reviewed and tested without a token using `npm run notion:catalog` and `npm test`. The current Codex Notion connector is a separate connection; changing its workspace does not configure the CI secret.

All activation steps can run using the GitHub secret; no local token copy is needed. From an authenticated GitHub CLI, dispatch a mode with `gh workflow run publish-notion.yml --repo limelighthq/skills --ref main -f mode=schema-plan`, substituting the reviewed mode for later steps. Always wait for completion and inspect the summary before the next operation. Manual dispatch is restricted to this repository's `main` and shares the same publishing lock and validation as automatic runs.

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

To repair with the GitHub secret, run mode `plan` with `repair_skill` set to that single reviewed skill name, then mode `publish` with the same input. Schema modes reject repair inputs. Leaving `repair_skill` empty preserves all normal drift protections.

Before each existing row is changed, its content, ownership marker, and parent are checked against the plan. After writing, the publisher compares fresh Markdown with Notion's normalized write response and downloads the ZIP to verify its exact bytes before marking the row complete. Each page includes a link to its original skill at the published Git revision.

Notion does not provide a transaction covering the whole database or an atomic compare-and-swap for this flow, so a person should not edit a managed row while it is publishing. The publisher reports detected races. It does not claim all-or-nothing publication.

For 401 or 403, check the dedicated connection and database sharing. For 404, verify the database and data source IDs and workspace. Do not replace them with a similarly named database. Rotate a token in GitHub Secrets, rerun a plan, and verify a publish. No code change is needed.

To pause automatic publication, set `NOTION_SYNC_ENABLED` to `false`. Manual operations remain available to maintainers for diagnosis, setup, and recovery. Disable the workflow in GitHub Actions if every run must stop. The Git marketplace keeps working. To roll back skill content, revert its Git change through a PR and let the next publish apply it; do not edit the Notion copy as a rollback.

## Verification

Run `npm run validate`, `npm test`, and the checks in `docs/portability.md`. The tests cover archive contents and executable modes, full pagination, HTTP failures, ownership isolation, explicit adoption, duplicates, remote drift, interrupted writes, repair, and unchanged reruns. Tests simulate the Notion HTTP boundary; they do not replace the first live verification in step 5.
