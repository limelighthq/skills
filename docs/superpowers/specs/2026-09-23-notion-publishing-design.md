# Automatic publishing to Notion

The team should add and improve skills without maintaining a second copy or running a publishing skill after every merge. This repository remains authoritative for its skills. Notion holds a searchable copy; skills owned elsewhere are outside this publisher's scope.

## Approach

Use GitHub Actions and Notion's public API, with a dedicated workspace connection. No servers, personal OAuth sessions, coding agents, or new scheduler are needed. Discover every tracked skill under the existing marketplace automatically. Publish after validation on main, reconcile daily, and allow an on-demand plan or publish.

Notion's official starter kit creates rows in a typed Skills database and attaches supporting files as ZIPs through the public API. Follow that pattern: publish the Markdown body and description, and attach a deterministic ZIP containing the complete original skill. The Git repository remains the installation source that preserves every frontmatter field and executable file. ZIP attachments are not native Notion folders; clients using Notion exports must expand the ZIP. Do not describe the public API mirror as a lossless native skill-directory import.

## Ownership and changes

Each managed row has a Sync state property recording the repository, skill name, source hash, revision, and verified remote content hash. The skill name is the stable key across moves between team plugins. A new skill needs no sync configuration. Origins for existing imported skills are recorded explicitly; new skills default to this repository. Existing tags are preserved.

Existing rows are adopted only through a reviewed mapping from skill name to page ID. Duplicate names, ownership conflicts, unknown properties, truncated reads, or edits to managed content stop publication before any row changes. Removed or renamed skills are reported for a human to resolve; the publisher never deletes or archives rows automatically.

The publisher reads the full remote inventory before planning. A plan makes no writes. Apply requires a clean main checkout at the configured repository. It rechecks each existing row immediately before writing, writes the completion marker last, and verifies the resulting content. Partial writes remain incomplete and require an explicit repair of that skill; they never appear as successful publishes.

## Operations

Keep non-secret configuration in notion-sync.json. Store a dedicated Notion connection token in the repository's Actions secrets. The token needs read, insert, and update access to the target database only. Do not read personal credentials or log request bodies, tokens, or temporary download URLs.

Schema setup is a separate, additive command. It checks existing property types, adds only missing publisher properties, and never replaces shared options. Rollout starts with a read-only plan and explicit adoption of existing rows. The workflow is gated by a repository variable until credentials and the first live publish have been verified.

Scheduled runs use the latest main revision, serialize writes, skip unchanged skills, and fail visibly on an actionable error. GitHub's workflow notifications are the operational alert channel; no per-run messages or extra notification service are introduced.

## Verification

Test real Git discovery and ZIP contents, read-only plans, ownership isolation, duplicate and truncated inventory handling, drift protection, incomplete publish recovery, idempotence, safe HTTP retries, and secret-safe failures. Run repository validation, Node tests, installation checks, and the documented bundled-script checks. Live Notion verification requires access to the Limelight workspace; the currently connected MCP workspace is personal and the local CLI has no login.

## References

- https://github.com/makenotion/notion-skills-github-sync/blob/main/setup/skills-db.ts
- https://github.com/makenotion/notion-skills-github-sync/blob/main/src/notion/archive.ts
- https://developers.notion.com/guides/agent-skills/overview
- https://developers.notion.com/reference/create-file
- https://developers.notion.com/reference/update-page-markdown
