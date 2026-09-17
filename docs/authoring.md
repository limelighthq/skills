# Writing a skill

A skill is a set of instructions for an agent, written the way you would brief a capable new teammate who has never seen this task. This guide covers what makes a skill work. [conventions.md](conventions.md) covers what the validator enforces.

## How an agent reads a skill

Agents load a skill in three stages. Write for each stage.

1. **Always loaded: `name` and `description`.** About 100 tokens per skill, for every skill, in every session. The agent decides whether to use your skill from this text alone.
2. **Loaded when the skill activates: the `SKILL.md` body.** Keep it under 500 lines and about 5,000 tokens.
3. **Loaded on demand: bundled files.** The agent opens a file under `references/`, `scripts/`, or `assets/` only when the body tells it to.

## Write the description first

The description is the part that most often decides whether a skill works. A good body behind a vague description never runs.

- Write in third person: "Builds release notes", not "I build" or "You can use this to".
- Say what the skill does, then when to use it. Include the words people type when they need it.
- Put the key use case first. Listings get truncated.
- Keep the value on one line. Wrap it in double quotes if it contains `: ` or ` #`.

```yaml
# Weak: the agent cannot tell when this applies
description: Helps with releases.

# Strong
description: "Builds release notes from merged pull requests, grouped by area. Use when preparing a release, or when someone asks what shipped or what changed since a date."
```

Before you write the body, collect three real requests the skill must handle. After you write it, try all three in a fresh session and confirm that the skill triggers and behaves as written. Then try one request that should not trigger it.

## Write the body

- **Give instructions, not background.** The agent is already capable. State what to do in this task that it would not do by default. If a line changes nothing about the agent's behavior, delete it.
- **Number any sequence of steps.** State one action per step.
- **Say what done looks like.** Name the output format, the file path, or the message.
- **Say when to stop.** List the conditions under which the agent must stop and ask a person. Skills that write, send, merge, or delete need exactly one clear human approval point before the first irreversible action.
- **Match freedom to risk.** Give exact commands where a mistake is costly. Give goals and constraints where judgment helps.
- **State the reason behind a rule.** "Quote the description because YAML drops text after ` #`" survives edge cases. A bare "always quote" does not.
- **Use one term per thing.** Do not rotate synonyms.
- **Record scars where they bite.** When a real run fails, add the fix to the step where it failed. Phrase it as what to do.

## Keep the skill self-contained

A skill is installed on its own, into tools you have never seen, at a path you do not control.

- Bundle every file the skill needs inside its directory. Do not link to files elsewhere in any repo.
- Refer to bundled files by paths relative to the skill root, such as `references/formats.md`, and keep them one level deep. Agents may only skim a file that is reached through a chain of links.
- Name other skills in plain text, never by file path. The other skill may not be installed.
- Declare real requirements in `compatibility`: a runtime, a CLI, network access, or one specific agent.
- Give a reference file over 100 lines a `## Contents` heading, so the agent can read part of it.

## Scripts

Use a script when the work is deterministic, fragile, or repeated. A script costs no context until it runs, and it gives the same result every time.

- Make each script executable, with a shebang.
- Print errors that say what to fix. The agent reads them and acts on them.
- List dependencies in `compatibility` and at the top of the script.
- Handle missing input inside the script. Do not leave the agent to guess.

## Secrets and private data

Name where a secret lives, such as an environment variable or a secret manager. Never write its value. Examples use invented data. A skill that touches credentials states the rule inside the skill: load into memory only, never print, never commit, and stop on any violation.

## Review checklist

- The description alone tells a stranger what the skill does and when to use it.
- Three real requests trigger the skill, and an unrelated request does not.
- Every step is an action. No step restates what an agent does by default.
- Irreversible actions sit behind one explicit approval.
- `npm run validate` passes with no new warnings.
