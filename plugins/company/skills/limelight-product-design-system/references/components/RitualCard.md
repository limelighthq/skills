# RitualCard

A card for one recurring ritual: the agent, Active or Paused, the ritual name and purpose, its Schedule, Control and Next run, and the Pause, Edit ritual and Run now buttons.

"Edit ritual" opens a built-in `Dialog` to change the schedule, the next run and the approval mode.

## Consumer provides

- `agent`, `name`, `description`, `schedule` ("Every Monday at 09:00"), `mode` ("Manual approval", "Delayed with veto" or "Automatic") and `next` ("2026-09-21 09:00").
- `active` (default true). `onToggle` for Pause and Resume.
- `onRunNow`. `runDisabled` and `runDisabledReason` when a review is pending in Approvals or an action is waiting in Activity.
- `lastRun`: "9/23/2026, 7:53:42 PM" adds "Last simulated run: …".
- `approvals`: 3 or more on Manual approval shows the autonomy suggestion.
- `onSave({schedule, next, mode})` for the dialog. `editOpen` / `onEditOpenChange` / `editMode` to control it.

## Anatomy

- Card: `surface`, 1px `line-card`, `radius-xl`, `shadow-sm`, 24px padding. Cards stack with a 20px gap.
- Top line: `ops-agent` name on the left, a neutral `Badge` ("Active", "Paused") on the right.
- Name: h2, `ritual-title` (19px/25.65px, 500, -0.025em), `ink-strong`, 16px above and 10px below.
- Purpose: 14px/22.4px `ink-strong`, 20px below.
- Meta: a `dl` grid of three columns (1.2fr 1fr 1fr), 18px gap, 18px padding between 1px `line` rules, 18px below. Labels (`dt`) are 11px `ops-meta-label`, 6px above the 13px value.
- "Last simulated run: …": 14px/21px `muted`.
- Autonomy suggestion: 18px padding, `ops-suggestion-fill`, 1px `ops-suggestion-border`, `radius-flow` (7px), 13px text. "You approved this ritual 3 times." in bold, "Would a review window work better? You can still cancel each action before it runs.", a secondary "Review automation option", and "Nothing changes until you save." at 10.4px in `ops-suggestion-note`.
- Actions: "Pause" or "Resume" and "Edit ritual" (secondary), "Run now" (primary), 8px apart, 14px (or 18px after the meta) below.

Edit ritual dialog (group D’s centered 512px `Dialog`, title "Edit ritual", subtitle "Limelight · Local prototype"): the ritual name as h3, `TextInput` "Schedule", `DateInput` "Next run" (datetime-local), `Select` "Approval mode", the helper line for the mode, "Autonomy concept for review. No live actions run.", and a full-width primary "Save ritual".

Helper lines: Manual approval "Every suggested action waits in Approvals." Delayed with veto "A one-minute preview window lets you cancel from Activity." Automatic "Ritual actions complete in the simulation. Rate and budget decisions still require approval."

## States

- Active: "Pause", Next run shows the date.
- Paused: badge "Paused", Next run "Paused", "Resume", and "Run now" disabled with "Paused. Resume the ritual to run it now."
- Review pending (Manual approval run): "Run now" disabled with "A review is pending in Approvals."
- Action waiting (Delayed with veto run): "Run now" disabled with a reason such as "An action is waiting in Activity. Cancel it there or wait one minute."
- Automatic: "Run now" stays enabled.
- Suggestion: "Review automation option" opens the dialog on "Delayed with veto". Nothing changes until Save.
- Dialog: "Save ritual" is disabled while Schedule is blank or Next run is empty. The line "Add a schedule and a next run to save the ritual." says why.

## Keyboard and accessibility

- The card is a `section` named by the ritual name. Every button is described by it.
- A disabled "Run now" is described by its reason instead.
- "Edit ritual" and "Review automation option" have `aria-haspopup="dialog"`. The dialog traps focus and returns it on close.
- The meta is a description list, so a screen reader reads "Schedule, Every Monday at 09:00".

## D exceptions

| D | DS | Rule | Why |
|---|---|---|---|
| Meta labels #80848B | `ops-meta-label` #72767D | Text 4.5:1 | D’s labels are 3.76:1 on white. |
| "Nothing changes until you save." #777777 on #F3F7FA | `ops-suggestion-note` #717171 | Text 4.5:1 | D’s line is 4.16:1 on the suggestion fill. |
| "Run now" and "Save ritual" turn off with no reason | Opaque reason lines tied with `aria-describedby` | Disabled explanation (ENG-3773) | The dimmed button must not be the only carrier of why it is off. |

## Do / Don't

- Do use a `Select` for the approval mode. D shows the three modes in a select, not radio cards.
- Do cancel a waiting delayed action when the ritual is paused.
- Don't hide why "Run now" is off. Always pass `runDisabledReason` with `runDisabled`.
- Don't imply real automation. Keep "Autonomy concept for review. No live actions run." in the dialog.
