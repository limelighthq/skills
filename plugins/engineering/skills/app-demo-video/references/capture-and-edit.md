# Capture and edit guidance

## The recording gate

1. Choose the exact app tab or window in the **user-specified environment**. Capture a dedicated window or tab instead of the whole desktop where possible.
2. Record a short interaction, stop, and inspect frames from before, during, and after it. Verify correct surface, framing, motion, resolution, and a playable finalized file.
3. Only start the full shoot after that test passes. If the recorder captured another display or the file cannot decode, fix the capture setup and repeat the short test. Do not keep recording speculative footage.

A direct tab capture avoids unrelated windows and desktop notifications. If the available host permits continuous frame capture instead of a native recorder, it can produce real footage: capture at a measured useful cadence throughout the action, store each frame's monotonic timestamp, and encode according to elapsed time. Preserve irregular capture intervals. Accept the result only if the requested motion, action, and result remain clearly visible at normal playback speed. Report a low capture rate; encoding sparse frames at 30 fps does not create smooth live footage. Do not take a handful of before/after screenshots and call them video.

Use only supported capture APIs. A skill does not grant access to an alternate automation framework when host instructions restrict browser control.

## Shot plan and evidence

Keep a small manifest outside the installed skill:

| Field | Meaning |
| --- | --- |
| Feature and narration | The user-visible change and its spoken explanation |
| Environment and URL | Verified target, without tokens or signed query strings |
| Workspace/persona | The intended demo identity; avoid unnecessary personal details |
| Source and time range | Clip filename, source in/out times, capture date |
| Action and result | What actually happened on screen |
| Provenance | Live app footage, earlier verification screenshot, local simulation, or diagram |
| Edits and limitations | Speed changes, shortened waits, redactions, missing evidence |

Show relevant UI large enough to read. Trim navigation and dead time, but preserve the causality between the action and its result. Label a shortened generation wait rather than implying instantaneous output. Never use a generated mock of the app as evidence that the real feature works.

When a live shot is unavailable, either leave it out and say why or use a clearly labeled supporting still. Label local-test and simulated publication examples on screen even when the surrounding video demonstrates another environment. Match narration to those limits.

## Narration and branding

1. Group the story by outcome and write the voiceover before the final edit. Prefer short, concrete sentences. Check feature claims against the shot manifest.
2. Generate narration once the script is stable. Retain the provider's downloaded file and settings. Use paragraph or sentence boundaries for later cuts, not arbitrary character proportions.
3. Use timestamps from the speech provider or align against playback. Silence detection helps find candidate edit points but does not establish which words were spoken; listen across each splice.
4. Make the exact delivered transcript match the edited audio. Remove an unfilmed paragraph from both. Do not leave “two improvements” if only one remains.

For a Limelight treatment, use the approved marketing assets available in the task. The example workflow used an airy neutral canvas, a black wordmark, regular-weight display headings, softer supporting text, an agent-specific gradient, and short chapter cards. These are composition cues, not a replacement for current brand specifications. Do not hard-code personal asset paths or assume another skill is installed. Preserve the user-approved treatment when revising a video.

## Editing and output

Use an available editor or FFmpeg. A practical output bundle is:

```text
app-demo/
  demo-v2.mp4
  transcript.txt
  coverage.md
  timeline.json
```

Store private raw footage, session material, and working files separately. Keep portable source paths relative to the working artifact directory. Do not overwrite a user's earlier cut. Keep music optional and below narration if requested.

A useful export target is H.264, yuv420p, 1920×1080, 30 fps with AAC audio and MP4 fast-start. Adapt portrait, frame rate, and resolution to the source and user request; do not claim upscaled footage is native 1080p.

For a file already rendered, these commands inspect and decode it without modifying it:

```bash
ffprobe -v error -show_entries format=duration,size:stream=codec_name,width,height,r_frame_rate -of json "demo-v2.mp4"
ffmpeg -v error -i "demo-v2.mp4" -f null -
```

A clean decode only establishes media integrity. Inspect moving sequences and listen to the audio as well. A contact sheet is useful for framing and accidental disclosure, but cannot prove smooth motion or narration continuity.

## Recovery and completion

Use bounded capture sessions and save progress between them. Before another paid narration request or a repeated demo write, reconcile what already completed. Restore temporary edits to an existing demo record where appropriate, or retain a deliberately created draft and disclose it. Do not delete user records as cleanup without authorization.

If a recording cannot stop, prioritize ending capture over editing. Tell the user the documented manual stop step. Never claim the raw recording is ready until it finalizes and decodes. If an essential capability remains unavailable, deliver a clearly labeled partial artifact and the precise remaining work, rather than another screenshot cut presented as live footage.
