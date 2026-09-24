# BusyBar

The line that sits above the composer while a scripted chat flow is running, saying what the agent is doing and offering "Start over".

## Consumer provides

- `label`: "Adding creators" (Ivy discovery) or "Working with Elliot" (Elliot's draft, angles, interview and source flows).
- `onStartOver`: cancel the flow. D keeps the person's message and removes the flow card. It does not restart the flow.
- `actionLabel` only to change "Start over".

## Anatomy

- Row: flex, space-between, centred, 8px gap. It sits directly on the panel ground as the last item of the panel body (16px under the flow card).
- Label: `small` type (12px / 18px), `ink`.
- Button: outlined, 28px tall, 8px 16px padding, `chat-busy-action` type (11px / 15.71px, 450), white fill, 1px `chat-busy-border`.
- In `FullViewDialog` the label switches to the system face and `ink-overlay`.

## States

- Shown only while a flow is active. D shows no spinner, progress bar or skeleton anywhere in the chat. The run steps in `RunCard` are its only progress treatment.
- The button hovers like every outlined button.

## Keyboard and accessibility

- The label has `role="status"`, so a screen reader announces the flow when the bar appears.
- "Start over" is a native button after the flow card in Tab order. Its focus ring is core's `focus-ring-panel` inside the panel body.

## D exceptions

- Button border: D `#DDDFE4` becomes `chat-busy-border` `#5F6678`, the same hue. The bar sits on the panel image, and `control-border` is only 1.7:1 on the lavender behind it. The darker border clears 3:1 on every sampled ground there (control borders 3:1). In the full view the bar sits on white and uses `control-border-overlay`.
- `role="status"` on the label is a non-visual addition (WCAG 4.1.3).

## Do / Don't

- Do show one bar at a time, under the latest flow card.
- Don't use it for page loading. It belongs to chat flows only.
