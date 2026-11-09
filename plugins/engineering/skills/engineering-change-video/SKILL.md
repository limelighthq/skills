---
name: engineering-change-video
description: "Create a concise engineering-demo MP4 with voiceover and a transcript for all meaningful files, code, configuration, and workspace artifacts changed during the current agent session. Use when an engineering agent has implemented or modified changes and needs a narrated before/after walkthrough, release handoff, demo, or implementation summary."
---

## Purpose
Create a trustworthy, concise video walkthrough of the meaningful changes made during the current agent session.
## Required behavior
1. **Inventory the session changes.** Inspect the session’s tool history, repository diffs, created or modified files, configuration changes, and workspace artifacts. Include only changes made during this session or explicitly identified by the user. Do not substitute unrelated recent workspace activity.
2. **Verify the result.** Inspect the final state and run the most relevant available tests, checks, previews, or demonstrations. Separate verified behavior from inferred behavior. If the session record or environment is incomplete, state the gap instead of inventing evidence.
3. **Group the story.** Organize changes by user-visible outcome, then supporting implementation details. Prioritize what changed, why it matters, how it works, and how it was validated.
4. **Collect visuals.** Prefer real before/after screenshots, screen recordings, rendered UI, terminal output, diagrams, or other evidence from the changed artifact. Use simple labeled slides or diagrams only when real visuals are unavailable. Redact secrets, tokens, credentials, personal data, and unrelated private content.
5. **Write the narration.** Use a clear, concise engineering-demo voice. Target roughly 60–120 seconds unless the change is too complex to explain accurately in that time. Use plain language, name the affected surfaces, and avoid claims not supported by the evidence.
6. **Render the video.** Produce an MP4 with a readable opening title, a short change summary, the visual walkthrough, validation evidence, and a brief closing status. Add readable on-screen labels where useful. Keep pacing deliberate and ensure the voiceover is synchronized with the visuals.
7. **Deliver the transcript.** Provide the exact voiceover text separately, along with a compact list of changes covered, validation performed, known gaps, and source artifacts.
## Default video structure
- **Title card:** change name and session date
- **What changed:** 2–4 key outcomes
- **Walkthrough:** before/after or step-by-step visuals
- **Implementation note:** only the technical detail needed to understand the change
- **Validation:** tests, checks, or demo evidence and their results
- **Status:** complete, partial, or blocked; include follow-up items if needed
## Output contract
Return:
1. A downloadable or attached **MP4 video with voiceover**.
2. The **voiceover transcript**.
3. A **change coverage summary** listing each included change and its evidence.
4. A **validation summary** listing commands, tests, previews, or checks performed and their outcomes.
5. **Known gaps and follow-ups**, clearly labeled when evidence or tooling is missing.
If the environment cannot render audio or video, do not pretend that it did. Produce the best available storyboard, visual asset plan, narration script, and exact render instructions, then explain what prevented MP4 creation.
## Quality and safety rules
- Do not claim that a change works unless it was observed, tested, or clearly shown in the session.
- Do not include secrets, credentials, access tokens, private keys, or unnecessary personal information in visuals or narration.
- Do not silently omit a meaningful session change; list excluded changes and the reason when scope is ambiguous.
- Preserve the user’s terminology and product names, but explain unfamiliar implementation terms briefly.
- Keep the video focused on changes from the current session, not a general product tour.
- If a requested visual cannot be reproduced, label it as a limitation and use the strongest available evidence.
## Example trigger
> “Create a video with voiceover for the changes we made in this session.”
Expected result: an MP4 engineering demo covering the session’s meaningful changes, plus the transcript, evidence-backed change summary, validation results, and any unresolved gaps.
