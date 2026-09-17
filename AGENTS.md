# Instructions for agents working in this repo

This repo is a plugin marketplace of agent skills. People outside engineering read and edit these files, so plain language matters more here than in most repos.

## Before you change anything

- Read [docs/conventions.md](docs/conventions.md). The validator enforces it.
- Read [docs/authoring.md](docs/authoring.md) before you write or reword a skill.

## Rules

- Run `npm run validate` and `npm test` before you say a change is done. Both must pass.
- A skill is self-contained. Every file it needs lives inside its own directory. Never link out of the skill directory, and never assume the skill is installed at a fixed path.
- Skill names are unique across all plugins. Check before you add one.
- Put a field that is not in the Agent Skills spec or the Claude Code reference under `metadata`, as a string.
- Do not add `version` to a `plugin.json` or to a marketplace entry. Each merge to `main` is the release.
- Do not create a plugin with no skills. Add the plugin in the same change as its first skill, and list it in `.claude-plugin/marketplace.json`.
- A reworded `description` changes when agents pick the skill. Treat it as a behavior change and test it on real requests.
- Never commit secrets, customer data, personal home-directory paths, or run artifacts.

## Adding a skill

1. `npm run new:skill -- <plugin> <skill-name>`
2. Write the description first, then the body. Start from three real requests the skill must handle.
3. `npm run validate`
4. Add the skill to the plugin's `README.md` and to the table in the root `README.md`.

## Changing the validator

The tools under `tools/` are tested with `node --test`. Write the failing test first. Each rule has an id that appears in `docs/conventions.md`, in the test name's assertion, and in the message, so keep all three in step.
