# Conventions

`npm run validate` enforces everything on this page. An **error** blocks the merge. A **warning** is advice and never fails CI.

Three sources set the rules:

1. The [Agent Skills specification](https://agentskills.io/specification) for the shared skill files, and the [Agent Plugins specification](https://agent-plugins.org/specification) for portable packages.
2. The [Claude Code marketplace reference](https://code.claude.com/docs/en/plugin-marketplaces) for the compatibility catalog.
3. House rules, each marked **house** with the reason it exists.

## Frontmatter contract

```yaml
---
name: release-notes
description: "Builds release notes from merged pull requests. Use when preparing a release or when someone asks what shipped."
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
| `license`, `compatibility`, `allowed-tools` | Optional spec fields. `compatibility` is at most 500 chars and describes real capabilities or dependencies. `allowed-tools`, if present, is a non-empty space-separated string; enforcement and tool names depend on the host. Prefer capability instructions in the body. |
| `metadata` | Optional map of string keys to string values. The home for every custom field. Quote numbers (`"1.0.0"`) and join lists with commas. |
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
| `description-not-single-line` | error | **house.** `description` uses a block scalar (`>` or a pipe) or spans lines. Claude Code lists such a value as empty, so the skill never triggers. |
| `description-truncated-by-comment` | error | **house.** An unquoted value contains ` #`. YAML reads the rest of the line as a comment and drops it. Wrap the value in double quotes. |
| `unknown-field` | error | A top-level field outside the Agent Skills spec, including host extensions such as `when_to_use` and `disallowed-tools`. Put essential triggers in `description`, behavior in the body, and custom data under `metadata`. |
| `allowed-tools-invalid` | error | `allowed-tools` is not a non-empty string. YAML lists are not the portable spec format. |
| `host-specific-path` | error | **house.** A bundled text file assumes a host-specific installation variable or user directory. Resolve resources from the loaded skill and choose output locations explicitly. |
| `bundled-script-missing` | error | A Markdown file refers to a concrete local `scripts/` program that is not bundled, including commands inside code fences. External URLs are excluded. |
| `metadata-not-string-map` | error | A `metadata` value is not a string. |
| `compatibility-too-long` | error | `compatibility` is over 500 chars or is not a string. |
| `body-too-long` | error | The body is over 500 lines. Move detail into `references/`. |
| `link-broken` | error | A relative Markdown link points at a file that the skill does not bundle. |
| `link-escapes-skill` | error | **house.** A link leaves the skill directory. Skills install one at a time into other tools, so the target will not exist there. Bundle the file or link to a URL. |
| `absolute-local-path` | error | **house.** A file contains a path into a personal home directory such as `/Users/<name>/`. Placeholders such as `/Users/<you>/` pass. |
| `secret-detected` | error | **house.** A bundled text file contains the shape of a real credential. Remove it and rotate the credential. |
| `file-too-large` | error | **house.** A bundled file is over 1 MB. Large files are usually run artifacts. |
| `nested-skill` | error | A `SKILL.md` sits inside another skill. Give it its own directory. |
| `description-person` | warning | The description starts in first or second person. |
| `description-no-trigger` | warning | The description has no trigger clause. Host-specific metadata cannot substitute for one. |
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
| `portable-manifest-missing` | error | A plugin has no root `plugin.json`, so standard Agent Plugins clients cannot discover it. |
| `portable-manifest-invalid` | error | The portable manifest does not parse as an object with the Agent Plugins 1.0.0 `$schema`. |
| `portable-manifest-drift` | error | **house.** Root `plugin.json` must match `.claude-plugin/plugin.json` plus `$schema`. This repo ships skills-only packages; both entry points load the same `skills/` folder. |
| `plugin-name-mismatch` | error | The `plugin.json` name differs from the directory name. |
| `plugin-description-missing` | error | **house.** People choose plugins by description. |
| `plugin-version-pinned` | error | **house.** A `version` in either plugin manifest or in a marketplace entry. With a version set, users get an update only when someone remembers to bump it. With no version, Claude Code uses the commit SHA, so each merge ships. |
| `plugin-empty` | error | **house.** A plugin has no skills. Create a plugin together with its first skill. |
| `skill-name-duplicate` | error | **house.** Two plugins hold the same skill name. Claude Code namespaces skills by plugin, but most other agents have one flat namespace. |
| `plugin-readme-missing` | warning | The plugin has no `README.md` to say who it is for. |

## Plugins

One plugin per audience, named for the team: `company` for everyone, then `engineering`, `design`, `marketing`, and so on. A person installs `company` plus their own team's plugin.

Shared skills live only under `plugins/<plugin>/skills/`. Install from `plugins/` or an individual plugin so maintenance skills and templates stay out of teammate installs. Skills may name external services or repositories when they declare that access requirement and explain how to fetch the inputs. A skill that requires running inside one particular repo stays with that repo.

Keep shared frontmatter spec-only. Host-specific presentation or invocation settings may live in optional host metadata files, but core behavior must work without them. A system without a required capability gets a useful draft or an explicit blocker, never a claim that the missing action succeeded.

## Releases

A merge to `main` is the release. Nothing is versioned by hand at the plugin level. A skill may record its own revision in `metadata.version` when its callers need to know which behavior they got.
