---
name: app-demo-video
description: "Creates a polished narrated video of real interactions in the Limelight app. Use when asked to record an app demo, show shipped features, or replace screenshots with live footage, with branded chapters, clean cuts, and an exact transcript."
compatibility: Requires a user-specified app environment or URL, authenticated browser control and recording, writable artifact storage, a video editor or FFmpeg/ffprobe, and ElevenLabs access for the default narration. Brand assets are supplied or obtained from an available design skill.
---

# App demo video

Produce a reviewable MP4 showing the real app in the environment the user specifies. Default to roughly two minutes, 1080p landscape, concise ElevenLabs narration, Limelight marketing theming, and clean chapter cuts. Adapt length, voice, and format to the request. This is a product walkthrough, not a source-code recap.

## Choose the environment first

1. Identify the user's explicit target: local, preview, staging, production, or a specific app URL. If none is supplied, ask **“Which environment or app URL should I record?”** Do not infer it from the current tab, a prior demo, or the skill name. Continue independent script and theme preparation while waiting.
2. Resolve a named environment to its verified app URL using available project context. Ask for the URL if the mapping is unknown. For an ambiguous custom URL, confirm its environment before performing writes.
3. Confirm the visible URL, signed-in workspace, and demo persona before recording. State the environment in the opening or persistent label. A merge is not proof of deployment; only call a feature shipped to that environment when its availability is verified.

## Prepare the story

1. Establish the requested scope from the conversation, supplied feature list, or accessible change evidence. For “since Friday,” resolve the date in the user's timezone and find the actual baseline. Do not substitute unrelated recent work.
2. Make a compact shot list: feature, visible interaction, expected result, evidence, and any side effect. Prioritize the user's visible outcomes over implementation details.
3. Inspect the target app to confirm each shot is possible. Prefer existing demo records and reversible interactions. Before capture, choose a demo workspace or framing that excludes sensitive customer data; if no viable shot avoids it, stop that shot and request a suitable demo surface. Keep demonstration posts unscheduled and announcements off when publishing is not part of the request. Production access does not authorize sending, publishing, deleting, or changing real customer records.
4. Prepare a reviewable narration draft and theme. Use an available user-selected marketing design skill, or limelight-marketing-design-system when installed. Obtain approved fonts, logo, and agent colors from that source or supplied assets. Keep the product UI intact; theme the surrounding cards and labels. If assets are missing, use a clearly labeled neutral draft rather than inventing brand rules.

Read [capture and edit guidance](references/capture-and-edit.md) when recording or assembling footage. It contains the test-clip gate, timestamp handling, narration alignment, and export checks.

## Record and narrate

1. Discover the host's actual recording capabilities. Prefer a purpose-built browser recorder with explicit start/stop and a selected tab. Follow the host's browser-control instructions and tool schemas; do not assume a particular browser library or bypass tool restrictions.
2. **Record and finalize a three-to-five-second test clip before the full shoot.** Show a visible action, inspect the resulting video frames, and prove that the correct app and environment were captured. Confirm that the recorder can stop and produce a playable file. A successful start call is not evidence of useful footage.
3. Record short clips with one clear action and visible result each. Show typing, opening a dialog, cancelling, changing a tab, playing media, generating a draft, or scrolling through the result as appropriate. Capture through the result, not only the click. Keep a brief lead-in and ending hold for editing.
4. Finalize every clip promptly and verify its contents. Record source environment, capture date, and simulated versus real outcomes in a manifest. Do not leave a recorder running while waiting for unrelated work or user input. If stopping fails, use documented stop controls and request manual help promptly.
5. Generate narration through authorized ElevenLabs access, using an available stock voice or the user's specified existing voice. Honor a supplied voiceover or different provider. Do not clone a person's voice or start an unrequested paid subscription. Save the actual downloaded audio, exact text, and voice settings so edits do not require regenerating everything. After a timeout, check whether the job or download already succeeded before retrying.
6. Assemble a new MP4 revision, preserving the previous cut. Align each feature's footage to its narration, shorten loading with a visible cut, and use restrained chapter transitions. Preserve actual outcome wording, such as captured, simulated, saved, or published.

Use smooth cursor movement where the recorder supports it. Post-production cursor easing may follow actual recorded positions and clicks; an editorial pointer must not imply actions that never happened. Keep important product text readable at normal playback size.

## Verify and deliver

1. Inspect the final exported video, including every scene change and at least one moving sequence per live clip. Confirm that action and result are both visible, labels match the environment, and no unrelated desktop or sensitive content appears.
2. Listen across narration edits and verify the spoken words against the transcript. Probe the file and decode the full video/audio stream, or use equivalent editor checks. Report any unavailable visual or audio inspection rather than claiming it passed.
3. Deliver the MP4, exact transcript, and concise coverage/validation notes. List remaining screenshots, excluded features, unverified claims, and any shortened waits. Keep raw private captures outside the shareable package.

**Done means:** a playable narrated MP4 with real app footage for the promised shots, approved or explicitly provisional theming, and source/validation notes. A slideshow or animated screenshot is a draft, not a completed live-footage request. If recording, authentication, narration, or rendering is unavailable, deliver the useful storyboard and assets with the specific blocker. Do not silently downgrade the requested medium.

## Authorization and stopping

Creating and reviewing the local video is the default scope. For any irreversible demo action or external sharing, use **one approval point immediately before the first such action**, after preparing the concrete action or artifact and its destination. That approval covers only the disclosed action set and destinations; materially changed scope needs new authorization. Existing explicit authorization counts where host policy permits; do not ask again for the same authorized action. Filming alone is not authorization to publish a post, message coworkers, or distribute the video.

Use credentials only through the host's supported authentication or in-memory secret mechanism; never print or commit them. Stop the affected operation if credentials appear in logs or footage, exclude that material from exports, and report the exposure. Do not include authenticated session state, live customer data, signed links, or run recordings in the skill itself.
