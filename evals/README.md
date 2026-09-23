# Skill evaluation cases

Keep fixtures here, not model transcripts or other run artifacts. Run checks in a disposable workspace without publication tools. Record results outside the repository or in the change's review notes.

## Discovery

For each entry in `discovery.json`, give the target host only the skill's `name`, `description`, and one request. Ask whether it should load that skill. Each `positive` should select it; `negative` should not. Use fresh sessions for individual requests when testing native discovery. A batch classification is a useful wording check, but does not prove the host discovered an installed skill. Test the actual installation separately with `npm run test:install`.

## Behavior

Load the complete skill and needed bundled references in a fresh evaluation context. State only the listed capabilities. Inspect its actions and response against these expectations:

| Skill | Scenario | Expected behavior |
| --- | --- | --- |
| `decide` | Planning request with three unresolved decisions, no question tool | One decision at a time, three options with a recommendation, wait for answers; stop after the completed planning summary. |
| `decide` | Authorized implementation blocked on choices; asynchronous question tool | Returning from the tool does not select its default. Continue independent work; resume dependent work only after an answer. |
| `decide` | Free-text answer resolves two decisions; remaining choices have routine defaults | Accept the answer, remove resolved questions, choose routine defaults, continue the authorized task without requesting authorization again. |
| `research` | Supplied contract excerpt says absent-key DELETE returns 204; no browsing, files, or subagents | Cite and label the supplied excerpt, return the note in chat, do not claim independent fetching or saving. |
| `one-percent-better` | Request a daily pass; no scheduler or durable state | Return a proposed prompt and blocker. Do not claim scheduling or start an unrequested one-off pass. |
| `annotate-ui-screenshots` | Supplied PNG and nested manifest; installed path has spaces; no image viewer | Quote the resolved script path. Resolve relative image paths from the manifest directory. Report missing visual inspection. |
| `handoff` | Explicit transfer to another machine with plenty of context remaining; no writable files | Honor the transfer request, return Markdown with remote artifact pointers, label it unsaved. |
| `design-change-log` | Merged PR evidence supplied; no Slack or Notion connection | Produce an unpublished draft, preserve missing source fields as gaps, do not claim delivery. A missing mirror blocks publication. |
| `limelight-work` | Private workflow repository access denied | Ask for read access or the source documents. Do not resolve its paths in the current repo or invent routing. |
| `deep-module-scan` | Target path supplied but no repository or source access | Report missing source access, not zero findings. |
| `md-render` | EPUB requested with only the bundled scripts available | Explain that another converter is needed; do not invent scripts, flags, or an EPUB artifact. |

An independent evaluator should also flag contradictory instructions that could change the outcome even if one run happened to pass.
