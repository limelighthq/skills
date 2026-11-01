# Limelight agent skills

One repo for the skills Limelight's AI agents share. A skill is a folder with a `SKILL.md` file that teaches an agent how to do one task the way we do it.

The repo is a plugin marketplace named `limelight`. Each team has one plugin. Shared skills follow the open [Agent Skills](https://agentskills.io/specification) format. The same skill folders can load in Codex, Claude Code, Cursor, OpenCode, and other compatible agents. Each skill states the tools it needs and what to do when they are unavailable. See the [portability contract and checks](docs/portability.md).

| Plugin | For | Skills |
| --- | --- | --- |
| [`company`](plugins/company) | Everyone | `decide`, `dumb-mode`, `limelight-marketing-design-system`, `limelight-product-design-system`, `limelight-work`, `md-render` |
| [`design`](plugins/design) | Designers | `design-change-log` |
| [`engineering`](plugins/engineering) | Engineers | `annotate-ui-screenshots`, `deep-module-scan`, `handoff`, `one-percent-better`, `recap`, `research` |

## Install

### Claude Code

```
/plugin marketplace add limelighthq/skills
/plugin install company@limelight
/plugin install design@limelight
/plugin install engineering@limelight
```

The repo is private. If the add step fails on authentication, run `gh auth setup-git` once and retry.

Plugins here set no version on purpose. Claude Code then treats each commit on `main` as a new version, so a merged change reaches everyone on their next marketplace update. `claude plugin validate` prints a "no version specified" warning because of this. The warning is expected.

### Enable Claude Code plugins in a repo

Add this to the repo's `.claude/settings.json`. Teammates get the marketplace and the plugins when they trust the folder.

```json
{
  "extraKnownMarketplaces": {
    "limelight": { "source": { "source": "github", "repo": "limelighthq/skills" } }
  },
  "enabledPlugins": {
    "company@limelight": true,
    "design@limelight": true,
    "engineering@limelight": true
  }
}
```

### Codex plugins

Codex supports the existing marketplace catalog and plugin layout. Add the marketplace:

```bash
codex plugin marketplace add limelighthq/skills
```

Then install `company`, `design`, or `engineering` from Codex's plugin browser. Each plugin also includes a standard root `plugin.json` for [Agent Plugins](https://agent-plugins.org/specification) clients. Both manifests load the same skill files.

### Individual skills in Codex, Cursor, OpenCode, and other agents

The [`skills` CLI](https://github.com/vercel-labs/skills) copies or links complete skill folders into the selected agent's discovery directory. Run these commands in the project where you want the skills. Version 1.7.0 is used by this repo's install checks.

```bash
npx skills@1.7.0 add https://github.com/limelighthq/skills/tree/main/plugins --list
```

Install all shared skills for Codex:

```bash
npx skills@1.7.0 add https://github.com/limelighthq/skills/tree/main/plugins --agent codex --skill '*' --copy
```

Or select one skill and one agent:

```bash
npx skills@1.7.0 add https://github.com/limelighthq/skills/tree/main/plugins --agent cursor --skill handoff --copy
```

Replace `cursor` with `opencode`, `claude-code`, or another supported target. Add `--global` for a personal installation across projects. Use one installation route per host to avoid duplicate skill discovery. Private repository access must already work through Git.

Install from `plugins/`, not the repository root: generic root discovery also finds this repo's maintenance skills. With a local checkout, use `npx skills@1.7.0 add ./plugins` and the same options. Update CLI-managed project skills with `npx skills@1.7.0 update -p`; remove one with:

```bash
npx skills@1.7.0 remove handoff --agent cursor
```

Without an installer, copy the **whole** `plugins/<plugin>/skills/<skill>/` folder into the host's documented skill directory. Codex uses `.agents/skills/` in a project. Preserve bundled scripts, references, and requirements; copying only `SKILL.md` is insufficient. A chat-only system can follow the text, but executable workflows still need their declared tools.

## Change or add a skill

You do not need to code, and you do not need a local setup.

- **Ask for it.** Open a [skill request](https://github.com/limelighthq/skills/issues/new?template=skill-request.yml). Describe the task the way you would explain it to a new teammate.
- **Edit it on GitHub.** Open the skill's `SKILL.md`, select the pencil icon, change the text, and select "Propose changes". GitHub opens a pull request for you. A check validates the skill, and an owner reviews it.
- **Create or edit a skill in Notion.** In [Limelight Skills](https://app.notion.com/p/0368efd473c142a08302c2e183ef7616), edit an existing skill's instructions or Description. For a new skill, add its name, description, and instructions, then choose its Plugin when ready to sync. Automation opens a GitHub change, runs the repository checks, and merges it if there is no conflict. The [sync runbook](docs/notion-publishing.md) explains the one-time Plugin setup, supporting files, review mode, and conflicts.

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
  plugin.json                       standard Agent Plugins manifest
  .claude-plugin/plugin.json        Claude-compatible manifest
  README.md                         who the plugin is for
  skills/<skill>/
    SKILL.md                        required: frontmatter + instructions
    references/                     optional: detail the agent reads on demand
    scripts/                        optional: code the agent runs
    assets/                         optional: templates and static files
.claude/skills/                     maintenance skills, excluded by the plugins/ install route
templates/skill/                    what `npm run new:skill` copies
tools/                              the validator and the scaffolder
tests/                              tests for the tools
evals/                              repeatable discovery and behavior scenarios
docs/                               authoring guide, conventions, migration record
```

## How a change ships

1. A pull request changes a skill.
2. CI runs validation, tool tests, installation checks, and bundled script tests. Any error blocks the merge.
3. GitHub-authored changes receive review from [CODEOWNERS](.github/CODEOWNERS). Claude also posts an advisory review that checks the rules in `AGENTS.md` and `docs/`. It never blocks a merge. To ask Claude for a fix, mention `@claude` in a comment. Managed Notion imports merge automatically after checks and fresh conflict verification, unless maintainers enable review mode.
4. The merge to `main` is the release. There is no version to bump.
5. The **Sync skills with Notion** workflow coordinates both directions: GitHub merges publish immediately, and Notion edits are checked every 15 minutes on a best-effort schedule. New Git skills are discovered automatically. Follow [the sync runbook](docs/notion-publishing.md) for activation, ownership conflicts, and recovery. The original **Publish skills to Notion** workflow remains available for manual repair and as a fallback when two-way sync is disabled.

[docs/migration.md](docs/migration.md) records where the first skills came from and which skills still live in other repos.
