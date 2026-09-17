# Limelight agent skills

One repo for the skills Limelight's AI agents share. A skill is a folder with a `SKILL.md` file that teaches an agent how to do one task the way we do it.

The repo is a plugin marketplace named `limelight`. Each team has one plugin. Every skill follows the open [Agent Skills](https://agentskills.io/specification) format, so the same files work in Claude, Claude Code, Codex, Cursor, and other agents.

| Plugin | For | Skills |
| --- | --- | --- |
| [`company`](plugins/company) | Everyone | `limelight-work`, `md-render` |
| [`engineering`](plugins/engineering) | Engineers | `annotate-ui-screenshots`, `deep-module-scan`, `handoff`, `one-percent-better`, `recap`, `research` |

## Install

### Claude Code

```
/plugin marketplace add limelighthq/skills
/plugin install company@limelight
/plugin install engineering@limelight
```

The repo is private. If the add step fails on authentication, run `gh auth setup-git` once and retry.

Plugins here set no version on purpose. Claude Code then treats each commit on `main` as a new version, so a merged change reaches everyone on their next marketplace update. `claude plugin validate` prints a "no version specified" warning because of this. The warning is expected.

### Pin the plugins in a repo

Add this to the repo's `.claude/settings.json`. Teammates get the marketplace and the plugins when they trust the folder.

```json
{
  "extraKnownMarketplaces": {
    "limelight": { "source": { "source": "github", "repo": "limelighthq/skills" } }
  },
  "enabledPlugins": {
    "company@limelight": true,
    "engineering@limelight": true
  }
}
```

### Other agents

The [`skills` CLI](https://github.com/vercel-labs/skills) reads this repo's marketplace file and installs skills into Codex, Cursor, and other agents.

```bash
npx skills add limelighthq/skills --list
```

```bash
npx skills add limelighthq/skills --skill handoff
```

## Change or add a skill

You do not need to code, and you do not need a local setup.

- **Ask for it.** Open a [skill request](https://github.com/limelighthq/skills/issues/new?template=skill-request.yml). Describe the task the way you would explain it to a new teammate.
- **Edit it on GitHub.** Open the skill's `SKILL.md`, select the pencil icon, change the text, and select "Propose changes". GitHub opens a pull request for you. A check validates the skill, and an owner reviews it.

Engineers can work locally:

```bash
npm ci
```

```bash
npm run new:skill -- engineering release-notes
```

```bash
npm run validate
```

Read [docs/authoring.md](docs/authoring.md) before you write a skill. [docs/conventions.md](docs/conventions.md) lists every rule the validator enforces.

## Layout

```
.claude-plugin/marketplace.json     the catalog: one entry per plugin
plugins/<plugin>/
  .claude-plugin/plugin.json        plugin name and description
  README.md                         who the plugin is for
  skills/<skill>/
    SKILL.md                        required: frontmatter + instructions
    references/                     optional: detail the agent reads on demand
    scripts/                        optional: code the agent runs
    assets/                         optional: templates and static files
templates/skill/                    what `npm run new:skill` copies
tools/                              the validator and the scaffolder
tests/                              tests for the tools
docs/                               authoring guide, conventions, migration record
```

## How a change ships

1. A pull request changes a skill.
2. CI runs the tool tests and `npm run validate`. Any error blocks the merge.
3. An owner from [CODEOWNERS](.github/CODEOWNERS) reviews the change.
4. The merge to `main` is the release. There is no version to bump.

[docs/migration.md](docs/migration.md) records where the first skills came from and which skills still live in other repos.
