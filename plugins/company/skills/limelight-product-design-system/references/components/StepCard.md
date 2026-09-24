# StepCard

StepCard is one step of an Elliot engagement sequence in the composer: what happens (Reply, Reaction or Repost), from which account, how long after the post goes live, and the reply text or reaction.

## Consumer provides

- `index` (0-based, names the controls "Step 1 …"), `type` and `onTypeChange`.
- `account`, `accounts` and `onAccountChange`. The Limelight account shows the badge "auto", a person shows "needs approval" (override with `approval`).
- `delay`, `onDelayChange`, `unit` (`min`, `hr`, `day`) and `onUnitChange`.
- Reply and Repost: `text` and `onTextChange`. Reaction: `reaction` (Like, Celebrate, Support, Insightful) and `onReactionChange`.
- `onRemove` for the "Remove step 1" button.
- Stack the steps in `StepCard.Sequence` under the "ENGAGEMENT SEQUENCE" label and the post, then a full-width secondary Button "+ Add engagement step".

## Anatomy

- Card: white, 1px `line-card`, radius 12, `shadow-sm`, 24px padding.
- Head row: SegmentedControl (md) Reply / Reaction / Repost, the neutral Badge, and a secondary Button with the `x` icon.
- Timing row, 16px above and below: account Select (md, 200px), delay TextInput (220px), unit Select (md, 200px), then "after posting" at 14px.
- Reply text: 120px minimum, 18px padding, 14px/23.1px, radius 9 (`ed-radius-field`), 1px `ed-field-line` frame, 6px below it as in D. A Reply card is 828x280 at 1440. Reaction: a second SegmentedControl.
- Select values, the delay value and the remove button use the card's `ink-strong`, as D's card foreground does.
- Sequence: 2px `ed-sequence-line` rail on the left, 20px indent, 18px between steps.

## States

- Type Reply or Repost shows the text. Reaction shows the reaction choice.
- The badge follows the account.

## Keyboard and accessibility

- Every control has a name: "Step 1 type", "Step 1 account", "Step 1 delay", "Step 1 delay unit", "Step 1 text", "Step 1 reaction", "Remove step 1".
- Each card is a group named "Engagement step 1". The sequence is a list.

## D exceptions

- Reply text frame: D `#DEDEDA` (1.35:1) → `ed-field-line` `#959589` (3.03:1), the lightest passing shade of D's warm grey. Rule: control borders 3:1.
- Remove button: D's "×" text → lucide `x` (16px). Rule: icons are lucide.

## Do / Don't

- Do keep the steps in the order they run.
- Don't let a person's step skip approval. Only the Limelight account runs "auto".
