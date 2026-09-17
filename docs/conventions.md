# Conventions

`npm run validate` enforces everything on this page. An **error** blocks the merge. A **warning** is advice and never fails CI.

Three sources set the rules:

1. The [Agent Skills specification](https://agentskills.io/specification), which every harness reads.
2. The [Claude Code skill reference](https://code.claude.com/docs/en/skills) and [marketplace reference](https://code.claude.com/docs/en/plugin-marketplaces).
3. House rules, each marked **house** with the reason it exists.

## Frontmatter contract

```yaml
---
name: release-notes
description: "Builds release notes from merged pull requests. Use when preparing a release or when someone asks what shipped."
when_to_use: "Trigger phrases include \"release notes\", \"what shipped\", \"changelog\"."
compatibility: Requires git and the gh CLI.
metadata:
  version: "1.2.0"
  owner: platform
---
```

| Field | Rule |
| --- | --- |
| `name` | Required. 1 to 64 chars of `a-z`, `0-9`, and single hyphens. No leading or trailing hyphen. Equals the directory name. Unique across all plugins. |
| `description` | Required. 1 to 1,024 chars on one line. Third person. Says what the skill does and when to use it. |
| `when_to_use` | Optional, Claude Code only. Extra trigger phrases on one line. `description` must still work alone, because other agents ignore this field. |
| `license`, `compatibility`, `allowed-tools` | Optional spec fields. `compatibility` is at most 500 chars. Add it when the skill needs a runtime, a CLI, or one specific agent. |
| `metadata` | Optional map of string keys to string values. The home for every custom field. Quote numbers (`"1.0.0"`) and join lists with commas. |
| Claude Code fields | `argument-hint`, `arguments`, `disable-model-invocation`, `user-invocable`, `disallowed-tools`, `model`, `effort`, `context`, `agent`, `background`, `hooks`, `paths`, `shell`. Other agents ignore them. |
| Anything else | Error. Move it under `metadata`. |

## Skill rules

| Rule id | Level | Meaning |
| --- | --- | --- |
| `skill-md-missing` | error | The skill directory has no `SKILL.md`. |
| `frontmatter-missing` | error | `---` is not line 1, or the closing `---` is missing. Agents then see no metadata at all. |
| `frontmatter-invalid-yaml` | error | The frontmatter does not parse as a YAML map. |
| `name-missing`, `name-invalid`, `name-dir-mismatch` | error | See the `name` row above. |
| `description-missing`, `description-too-long` | error | See the `description` row above. |
| `description-placeholder` | error | The description still contains `TODO` from the template. |
| `description-not-single-line` | error | **house.** `description` or `when_to_use` uses a block scalar (`>` or a pipe) or spans lines. Claude Code lists such a value as empty, so the skill never triggers. |
| `description-truncated-by-comment` | error | **house.** An unquoted value contains ` #`. YAML reads the rest of the line as a comment and drops it. Wrap the value in double quotes. |
| `unknown-field` | error | A top-level field that neither the spec nor Claude Code defines. The spec's reference validator rejects such files. |
| `metadata-not-string-map` | error | A `metadata` value is not a string. |
| `compatibility-too-long` | error | `compatibility` is over 500 chars or is not a string. |
| `body-too-long` | error | The body is over 500 lines. Move detail into `references/`. |
| `link-broken` | error | A relative Markdown link points at a file that the skill does not bundle. |
| `link-escapes-skill` | error | **house.** A link leaves the skill directory. Skills install one at a time into other tools, so the target will not exist there. Bundle the file or link to a URL. |
| `absolute-local-path` | error | **house.** A file contains a path into a personal home directory such as `/Users/<name>/`. Placeholders such as `/Users/<you>/` pass. |
| `secret-detected` | error | **house.** A bundled text file contains the shape of a real credential. Remove it and rotate the credential. |
| `file-too-large` | error | **house.** A bundled file is over 1 MB. Large files are usually run artifacts. |
| `nested-skill` | error | A `SKILL.md` sits inside another skill. Give it its own directory. |
| `listing-too-long` | warning | `description` plus `when_to_use` is over 1,536 chars, where Claude Code truncates its skill listing. |
| `description-person` | warning | The description starts in first or second person. |
| `description-no-trigger` | warning | The description has no "Use when" clause and there is no `when_to_use`. |
| `body-tokens-high` | warning | The body is over about 5,000 tokens. The whole body loads when the skill activates. |
| `reference-missing-contents` | warning | A bundled `.md` file over 100 lines has no `## Contents` heading. |
| `script-not-executable` | warning | A file under `scripts/` has a shebang but no executable bit. |

## Marketplace and plugin rules

| Rule id | Level | Meaning |
| --- | --- | --- |
| `marketplace-missing`, `marketplace-invalid-json` | error | `.claude-plugin/marketplace.json` is absent or does not parse. |
| `marketplace-name-invalid` | error | The marketplace name is not kebab-case, or Anthropic reserves it. |
| `marketplace-owner-missing` | error | `owner.name` is required. |
| `plugin-unlisted` | error | A directory under `plugins/` has no marketplace entry, so nobody can install it. |
| `plugin-source-missing` | error | **house.** An entry's `source` is not `./plugins/<name>`, or that directory does not exist. Every plugin lives in this repo. |
| `plugin-duplicate-name` | error | Two entries share a name. |
| `plugin-manifest-missing`, `plugin-manifest-invalid-json` | error | `plugins/<name>/.claude-plugin/plugin.json` is absent or does not parse. |
| `plugin-name-mismatch` | error | The `plugin.json` name differs from the directory name. |
| `plugin-description-missing` | error | **house.** People choose plugins by description. |
| `plugin-version-pinned` | error | **house.** A `version` in `plugin.json` or in a marketplace entry. With a version set, users get an update only when someone remembers to bump it. With no version, Claude Code uses the commit SHA, so each merge ships. |
| `plugin-empty` | error | **house.** A plugin has no skills. Create a plugin together with its first skill. |
| `skill-name-duplicate` | error | **house.** Two plugins hold the same skill name. Claude Code namespaces skills by plugin, but most other agents have one flat namespace. |
| `plugin-readme-missing` | warning | The plugin has no `README.md` to say who it is for. |

## Plugins

One plugin per audience, named for the team: `company` for everyone, then `engineering`, `design`, `marketing`, and so on. A person installs `company` plus their own team's plugin.

A skill belongs in this repo when it works in any repo or for any teammate. A skill that depends on one repo's layout, scripts, or local services stays in that repo's `.claude/skills/`, next to the code it serves.

## Releases

A merge to `main` is the release. Nothing is versioned by hand at the plugin level. A skill may record its own revision in `metadata.version` when its callers need to know which behavior they got.
