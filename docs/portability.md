# Portability

The shared unit is a complete skill folder under `plugins/<plugin>/skills/`. It uses the [Agent Skills format](https://agentskills.io/specification), ordinary instructions, and bundled resources. Hosts choose how to discover and invoke it. A skill cannot supply tools, credentials, persistence, or permissions that a host lacks.

## Packaging and installation

Each team plugin has two manifests: root `plugin.json` for [Agent Plugins](https://agent-plugins.org/specification), and `.claude-plugin/plugin.json` for Claude-compatible loaders. Validation keeps their contents identical apart from `$schema`. Both point implicitly to the same `skills/` directory. The root `.claude-plugin/marketplace.json` remains the catalog supported by Claude Code and [Codex](https://developers.openai.com/plugins/build/plugins).

The [README](../README.md#install) covers plugin and individual-skill installation. Generic installers must start at `plugins/`, not the repository root. Root discovery can also find `.claude/skills/publish-skills-to-notion`, which is repository maintenance. Standard metadata does not define a universal hidden/internal flag, so the install source is the distribution boundary.

Keep shared frontmatter spec-only. Put trigger phrases in `description` and workflow rules in the body. Optional host presentation files may improve a particular client's UI, but cannot carry essential behavior. Plugin releases follow repository revisions; neither manifest sets `version`.

## Capabilities and fallbacks

| Skill | What the full workflow needs | When a capability is missing |
| --- | --- | --- |
| `decide` | Conversation and user answers | Ask in plain text if no suitable question tool exists. An asynchronous tool return is not an answer. |
| `recap` | Session history | Summarize only available context; do not invent earlier work. |
| `handoff` | Session context; persistent files for a saved handoff | Return the handoff in chat and label it unsaved. Prefer revision IDs and remote artifact links for another machine. |
| `research` | Primary-source access or supplied evidence | Work inline without delegation. Return Markdown without filesystem access. State evidence gaps when sources cannot be obtained. |
| `deep-module-scan` | Source and test access through files, a connector, or supplied bundle | Request source access; do not report a clean scan from unavailable code. |
| `one-percent-better` | Git, isolated workspace, tests, authenticated PR access | Stop at missing required capabilities. Recurring runs additionally need a scheduler and durable state outside disposable worktrees. |
| `limelight-work` | Read access to `limelighthq/ai-workflows`; write and PR access for publishing | Ask for the source documents when unavailable; return an unpublished proposal when publishing is unavailable. |
| `design-change-log` | Private GitHub evidence; Notion and Slack for publication | Draft from available evidence and label verification or publication blockers. Preserve the approval gate. |
| `annotate-ui-screenshots` | Python 3.10+, Pillow, image files; viewer for visual verification | Supplied images need no capture tool. Without execution, return a proposed manifest. Without viewing, mark inspection incomplete. |
| `md-render` | Python 3.10+, Markdown, Pygments; WeasyPrint and native libraries for PDF; watchdog for preview | Explain missing dependencies. Offer source or an available host renderer, labeled accurately. Unsupported formats need separate tooling. |
| `limelight-product-design-system` | File access to the copy. A browser and network access for prototypes. Read access to the target code for implement and review. | Without a browser, deliver the page and say nobody viewed it. Without network, say React could not load. Without code access, ask for it. Never report a clean review of unread code. |

Resolve bundled resources from the actual loaded skill location. Use an available interpreter, quote paths, and keep outputs in the user's working project or chosen destination. Use the same Python environment for package installation and execution. A host running on Windows may expose `python` or `py -3` instead of `python3`.

Tool names and schemas vary. Instructions describe capabilities; the agent must use tools actually exposed by its host. Private repository access and service authorization remain requirements on every host.

## Repeatable checks

Run the repository checks:

```bash
npm ci
npm run validate
npm test
npm run test:install
```

The installer check requires network access to npm. It uses `skills@1.7.0` in a temporary project with explicit Codex, Claude Code, Cursor, and OpenCode targets. It checks every installed file against the source bundle and rejects extra skills. It does not modify a personal installation or require access to the private remote repository.

For bundled scripts, create an isolated Python environment and select its interpreter. From the repository root, run:

```text
<python> -m pip install -r plugins/engineering/skills/annotate-ui-screenshots/requirements.txt -r plugins/company/skills/md-render/requirements-preview.txt
<python> -m pip install -r plugins/company/skills/md-render/requirements-pdf.txt
<python> -m unittest discover -s tests -p "test_*.py" -v
<python> -m unittest discover -s plugins/engineering/skills/annotate-ui-screenshots -p "test_*.py" -v
```

PDF also needs the platform libraries in the [WeasyPrint installation guide](https://doc.courtbouillon.org/weasyprint/stable/first_steps.html). Without the PDF extra, that one integration test is skipped. CI requires the PDF extra on Linux and tests HTML, preview, and annotation on Linux, macOS, and Windows. The render tests use paths with spaces, unrelated working directories, a restricted `PATH`, and a headless preview server.

[Discovery fixtures](../evals/discovery.json) contain three matching requests and one nonmatching request per skill. [Behavior scenarios](../evals/README.md) cover missing tools, asynchronous answers, and external access. Run model checks when descriptions or workflow behavior changes; static validation alone cannot prove that an agent follows the instructions.

## Verification boundary

The portability pass on 2026-09-23 checked all 40 description/request decisions through fresh Codex 0.147.0 and Claude Code 2.1.280 CLI sessions; both matched expectations. Each host received one batch containing the descriptions and independent requests. This checks wording, not automatic loading in every product UI. Separate agent evaluations exercised the workflow fallbacks listed in `evals/README.md`.

Installation is tested for all four target agents. OpenCode 1.15.12's live model run was blocked by its provider requiring client 1.18.0 or newer. Cursor's live model behavior and the new remote CI matrix were not run locally. Local macOS execution passed the annotation, HTML, PDF, and preview tests. Publishing to Slack, Notion, or private repositories was not part of these checks.

These checks establish a portable format, complete installation, and tested behavior under specified capabilities. They do not promise identical tool availability or model behavior in every system.
