---
name: publish-skills-to-notion
description: "Publishes this repo's skills to the Limelight Skills database in Notion, creating a row for a new skill and replacing the files of one that changed. Use after merging a skill change, when a skill is missing from Notion, or when someone asks to sync, publish, or re-publish the skills database."
compatibility: Requires bash, python3, and a Notion client with write access to the Limelight workspace. Only for this repo.
metadata:
  version: "1.0.0"
---

# Publish skills to Notion

The repo is authoritative. Notion holds a copy so agents that cannot read this repo can still
load a skill. Publishing is one direction only: repo to Notion, never back.

**Target:** the `Limelight Skills` database, `0368efd473c142a08302c2e183ef7616`, data source
`collection://e1fbcbba-39c7-4e9a-abf0-496952ad0b1a`.

## What a row holds

| Property | Value |
| --- | --- |
| `Skill name` | The skill's `name`, which equals its directory name. |
| `Description` | The skill's `description`, copied verbatim from the frontmatter. |
| `Origin` | The repo the skill **first appeared in**, not this one. See "Origin is provenance". |
| `Source path` | `plugins/<plugin>/skills/<name>`. |
| `Tags` | One origin marker plus one kind. See "Tags". |
| `Files` | Set by the upload. Do not write it by hand. |

## Steps

1. **List what the repo has.** Every directory matching `plugins/*/skills/*/` with a `SKILL.md`.
   Read each one's `name` and `description` from the frontmatter.
2. **List what Notion has.** Query the data source for `Skill name`, `Origin`, `Source path`,
   `Tags`. Compare on `Skill name`.
3. **Decide per skill.**
   - In the repo, not in Notion → create a row, then upload.
   - In both → upload again to refresh the body and files. Fix `Source path` if it drifted.
   - In Notion, not in the repo → **stop and ask.** Never delete a row on your own. A row can
     outlive its skill because the skill moved, not because it died, and the row may be an
     active Notion AI skill that something else depends on.
4. **Create the row** (new skills only) in the data source, setting every property in the table
   above except `Files`.
5. **Pack the skill:** `scripts/pack-skill.sh <skill-dir> <out-dir>`. It prints `content_length`
   and `checksum_crc32`, the two values the next step needs.
6. **Upload, in one unbroken sequence:**
   1. `prepare` with the page id, `content_length`, and `checksum_crc32`. It returns an upload
      URL, headers, and a token.
   2. `PUT` the archive bytes to that URL with **every** header it returned.
   3. `complete` with the page id and the token.
7. **Verify.** Re-query the data source. Confirm the row's `Source path` and that `Files` now
   lists the skill's bundled folders. State what you published.

## Origin is provenance

`Origin` records where a skill was written, not where it lives now. Read it from the "Imported"
table in `docs/migration.md`: `handoff` came from `agent-platform`, `md-render` from
`limelight-site`, `limelight-work` from `ai-workflows`. Only a skill that was born in this repo
gets `limelighthq/skills`.

Getting this wrong erases the upstream record, and the source repos still hold their original
copies, so the record is the only thing saying which one came first.

## Tags

Two tags per row: one origin marker matching `Origin`, and one kind.

- Origin markers: `skills`, `agent-platform`, `limelight-site`, `ai-workflows`, `code`.
- Kind: `strict` when the skill has hard rules and an approval gate. `library` when it is a
  capability the agent draws on at its own discretion.

If a skill's origin has no marker, add the option before publishing rather than leaving the row
bare. Changing the options means replacing the whole list, so snapshot every row's `Tags` first
and re-query afterwards to confirm nothing was cleared.

## Things that will bite you

- **The upload URL expires ten minutes after `prepare`.** Pack, prepare, PUT, and complete in one
  run. If you stop to fix something, start again from `prepare`.
- **Pack with the script, not a bare `tar`.** On macOS a plain `tar` adds extended-attribute
  entries and the import rejects the archive.
- **Do not cache a checksum.** gzip stores a timestamp, so every pack of identical files produces
  different bytes and a different CRC32. Compute it immediately before `prepare`.
- **The archive root is the skill directory**, named exactly as the skill. Not its parent, not
  its contents loose at the root.
- **`complete` replaces the page title, description, body and files.** Anything a person typed
  into the page body is lost. That is intended, and it is why the database description tells
  people not to edit there.
- **Only `name` and `description` cross over from the frontmatter.** `compatibility`,
  `when_to_use` and `metadata` do not appear in Notion. Do not rely on them being visible there.

## Stop conditions

Stop and ask a person when:

- A skill is in Notion but not in the repo.
- A row's `Origin` disagrees with `docs/migration.md`.
- An upload fails twice. Report the error rather than retrying blind.
- You are about to change the `Tags` options, the property descriptions, or the database
  description. Those are shared schema, not per-skill data.
