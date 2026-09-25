# Textarea

A labelled multi-line field for replies, targeting notes, voice instructions and portal notes, with an optional character counter.

## Consumer provides

- `label` (or `hideLabel` with an accessible label), native textarea props, `rows`.
- Optional `hint`, `error`, `disabledReason`.
- `maxLength` with `showCount` shows D's counter: "592/3000 characters". `counterLabel` changes the noun.
- `variant`: the D form (see Anatomy).

## Anatomy

| Variant | D form | Field |
|---|---|---|
| `default` | Inbox reply composer ("Write a reply, or review Ivy’s draft above…") | 14px/21 `ink`, padding 12px, `radius-lg` 8, min 110px, 1px `control-border-reply`, placeholder `placeholder-reply` |
| `voice` | Tone of Voice "Custom instructions", "Common CTAs" | 14px/21 `ink-strong`, padding 14px, `radius-lg` 8, min 120px, 1px `control-border`. Label 14px/21 `ink-strong`, 19px above the field. Counter 11.2px/16.8 `ink-strong`, 8px below |
| `targeting` / `flow` | Internal campaign targeting "Targeting" | 14px/21.7 weight 500 `flow-ink`, padding 10px 12px, `radius-flow` 7, min 130px, `control-border-flow` |
| `portal` | Creator portal "Notes (optional)" | Arial 14px/22.4 weight 500, 4 rows (111.6px), `radius-flow` 7, `control-border-flow` |

- Every variant: white ground, no shadow, resizes vertically. Inside dialogs the default border is `control-border-overlay`.

## States

- Rest, focus (global ring), filled, error, disabled (0.5 with an opaque reason).

## Keyboard and accessibility

- The counter joins `aria-describedby`. It is not a live region, so it does not interrupt typing.

## D exceptions

- Reply composer: D #CCD8D1 (1.47:1) becomes `control-border-reply` #7D9C8A, the same hue at 3:1. Its placeholder (50% of ink, 3.27:1) becomes `placeholder-reply` #767679 (4.5:1).
- Flow and portal: D #CED8D1 becomes `control-border-flow`.
- Tone of Voice draws its textareas with no border, so the field has no visible edge. The DS adds a 1px `control-border`. Rule: control borders 3:1.

## Do / Don't

- Do show the counter when D has a limit (3000 for instructions, 500 for CTAs).
- Don't put a submit action inside the field. D places "Send reply" after it.
