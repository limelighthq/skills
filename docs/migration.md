# Migration record

On 2026-09-17 the first skills were copied into this repo from Limelight's active repos. Each copy is one-time. After a skill is imported, this repo owns it.

## Sources

Only files tracked on each repo's default branch were read, so local run artifacts never came along.

| Repo | Commit | Path |
| --- | --- | --- |
| `limelighthq/agent-platform` | `0932eca56` | `.claude/skills/` |
| `limelighthq/ai-workflows` | `1116e15` | `skills/` |
| `limelighthq/limelight-site` | `efd24f3d` | `md-render/` |
| `limelighthq/agent-hub` | `fe9ee1b` | `skill/` |
| `limelighthq/limelight-social` | `3c38a4f5` | `.claude/skills/` |
| `limelighthq/code` | `cd860c694` | `.claude/skills/` |

## The bar for import

A skill was imported when it works in any repo without a rewrite. The test: no links that leave the skill directory, and no dependence on one repo's paths, scripts, local services, or docs. Skills that fail the test stay where they are. They are not worse skills. They belong next to the code they serve.

## Imported

Every import had one mechanical change: house fields (`version`, `requires_skills`, `requires_mcp`) moved under `metadata` as strings, and `description` and `when_to_use` were re-quoted on one line. Other edits are listed.

| Skill | Plugin | From | Other edits |
| --- | --- | --- | --- |
| `handoff` | engineering | agent-platform | None. |
| `recap` | engineering | agent-platform | None. |
| `research` | engineering | agent-platform | None. |
| `one-percent-better` | engineering | agent-platform | None. |
| `deep-module-scan` | engineering | agent-platform | Two "References" links pointed at files in agent-platform. Replaced with one plain sentence. |
| `annotate-ui-screenshots` | engineering | agent-platform | Script path now uses `${CLAUDE_SKILL_DIR}`, matching its `allowed-tools` entry. Run artifacts go to a git-ignored directory in the working repo, not into the installed skill. Added `compatibility`. |
| `md-render` | company | limelight-site | Added `compatibility` for its Python dependencies. Added `## Contents` to two long reference files. |
| `limelight-work` | company | ai-workflows | "this repo" now names `limelighthq/ai-workflows`, because the skill no longer runs only there. |

The source repos still hold their original copies. Removing a copy is a separate, reviewed change in that repo: enable the plugin there first, confirm the skill triggers, then delete the local copy.

## Not imported

### Need a refactor first

| Skills | Why | What would make them portable |
| --- | --- | --- |
| `pr-loop`, `pr-review-loop`, `pr-ticket-loop`, `verify-loop`, `session-guardian`, `project-closeout`, `linear-status-update`, `scope-to-tickets` (agent-platform) | One interdependent system. The skills call each other, and they point at policy docs in agent-platform such as the loop merge policy. `code` holds older copies of the first three. | Move the shared policy into `references/` inside one skill, import the family in one change as its own plugin, and replace the copies in both repos. |
| `design-critique-loop`, `design-feedback-detective`, `design-system-consistency-loop`, `change-review-digest`, `persona-ux-loop`, `comment-detective`, `comment-conductor`, `pr-preview-evaluation` (agent-platform) | Tied to agent-platform's app, its design tokens in `packages/ui`, its local ports, and its Vercel project. | Separate the review method from the app-specific targets. The method could become a `design` plugin. The targets stay in the repo. |
| `domain-glossary`, `skill-doctor` (agent-platform) | The pattern is general, but the text uses agent-platform's terms, gates, and two-tree skill layout. | Rewrite the examples as generic ones. `skill-doctor` could then audit this repo. |
| `agent-hub`, `agent-hub-env` (agent-hub) | One skill is nested inside the other, which the spec does not allow, and both point at docs in the agent-hub repo. | Give each its own directory and bundle the docs they cite. |
| `credential-registry` (ai-workflows) | Maintains one file in ai-workflows. | Nothing. It is correct where it is. |

### Belong to one repo

`refresh-dev-server`, `local-db-debug`, `worktree-ux-debug`, `limelight-flows`, `social-blueprinter` (agent-platform), and `agent-testing`, `ux-flow-integration` (limelight-social). Each one drives that repo's dev server, database, router, or blueprint format.

### Out of scope

- The customer-facing Ivy skills under `agent-platform/docs/skills-src/`. They are product, with their own packaging.
- Vendor skills such as Stripe's. Install them from the vendor's plugin.
- Skills inside personal agent directories.

## No team skills yet

Every skill found was written by engineering. No marketing, sales, design, or operations skill exists yet. Those plugins get created together with their first skill, through a [skill request](https://github.com/limelighthq/skills/issues/new?template=skill-request.yml) or a pull request.
