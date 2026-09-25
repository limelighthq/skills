# Two-way skill synchronization

The team can edit shared skills in Notion or GitHub and receive the same validated skill through either surface. Use the existing repository, Skills database, workspace connection, and GitHub Actions. Teammates need no personal integration or new repository. This supersedes the one-way ownership policy in the 2026-09-23 design.

## Decision

Extend the existing publisher with a coordinated importer. Notion's official sample exports Notion into a GitHub marketplace, but is a one-way exporter. Running it independently beside our publisher would not reconcile simultaneous edits and would replace our plugin layout and metadata. A separate Notion-owned marketplace would split the shared library. One reconciler preserves the existing library and gives both editing surfaces the same release checks.

GitHub main is the released version; both GitHub and Notion are authoring surfaces. Every Notion import becomes a pull request. The default is automatic merge after the repository checks pass and the source is rechecked. A repository setting can require human review. Conflicting or invalid changes never merge automatically. Existing broad authorization to complete the setup autonomously covers implementation and activation; preserve any later user preference about review.

## Flow and scope

Run a single serialized workflow after main changes, every 15 minutes, or manually. Scheduled timing is best effort. First import Notion changes, validate them without write credentials, and merge eligible imports. Publish the resulting main revision to Notion. Explicit dispatch or an in-workflow publish is required after bot merges because the built-in GitHub token does not reliably trigger push workflows.

Existing managed skills participate automatically. Edit the page instructions or Description in Notion. Preserve every other YAML field from Git. Supporting files remain complete ZIP bundles in Files; a changed ZIP must contain the complete supporting file set and is validated before import. Unchanged files retain their bytes and executable modes. Do not execute imported scripts in a job holding Notion or GitHub write credentials.

The existing seven unrelated rows remain outside the sync. New skills created in Git are discovered automatically. New Notion-only skills require an explicit destination plugin and onboarding, which can be added separately; this rollout synchronizes edits to the existing managed library and automatically includes future Git-created skills. Renames, removals, changing ownership, and moving a page to another database require explicit resolution. No automatic page deletion or archiving.

## Change tracking

Use the existing per-skill source and remote hashes as the last synchronized baseline. Only Git changed: publish. Only Notion changed: import. Neither changed: no-op. Both changed: preserve both and report a conflict. This deliberately treats a whole skill as the conflict unit rather than guessing at a semantic merge.

An import commits a small receipt with the page ID, observed remote hash, previous complete Sync state, and exact resulting source hash. The publisher accepts this receipt only when it still matches the current page, prior state, and released skill. This acknowledges a verified Notion edit without weakening the existing drift protection. Subsequent Notion edits invalidate that receipt; repeated imports can build on the preceding receipt while it matches the current Git content. A failed or partial publish retains the explicit repair requirement.

Remove only the recognized publisher footer from incoming Markdown. Reject missing or altered provenance on a managed page instead of stripping arbitrary user text. Notion's normalized Markdown becomes the imported body only after an actual Notion edit; untouched skills keep their original formatting. Description changes update that one YAML value; other fields and comments remain intact. Unsupported content, truncated reads, ambiguous attachments, invalid paths, symlinks, oversized files, and incomplete inventory block the import before publication.

## Operations and verification

The Notion token already has read, insert, and update access. Use the repository-scoped GitHub Actions token for branches and pull requests, with explicit validation jobs and serialization rather than a personal access token or new server. Only trusted main code handles secrets and merges. Recheck the exact candidate commit, current main, and Notion snapshots before merge; keep a stale candidate open for inspection and generate a fresh candidate on retry.

Test unchanged runs, body and description imports, metadata and mode preservation, ZIP replacements, two-sided conflicts, changed pages during import or publishing, repeated imports, failed writes, invalid receipts, unrelated rows, and malicious archive paths. Run repository validation, all Node tests, installation checks, script checks, actionlint, and CI. Before enabling automatic imports, make a reversible live edit in a managed skill, verify Notion to GitHub, then restore it through GitHub and verify GitHub to Notion and a final no-op.

## Sources

- [Notion Skills API](https://developers.notion.com/guides/agent-skills/overview)
- [Official one-way exporter](https://github.com/makenotion/notion-skills-github-sync)
- [Archive expansion behavior](https://github.com/makenotion/notion-skills-github-sync/blob/main/src/notion/archive.ts)
- [GitHub workflow triggering](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow)
