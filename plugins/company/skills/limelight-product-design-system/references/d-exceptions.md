# D exceptions

## Contents

- Text 4.5:1
- Borders, marks and icons 3:1
- Visible focus
- Icon floor and lucide
- Disabled reason (ENG-3773)
- D defect
- Decision 5
- Accessibility (non-visual)

These are the only places this system departs from live D. Colour fixes keep D's hue and saturation and lower the lightness until the pair passes on every ground it sits on (the lightest passing shade). The non-visual accessibility rows change semantics only (roles, names, descriptions, focus order); nothing on screen changes.

| Category | Rows |
|---|---|
| Text 4.5:1 | 47 |
| Borders, marks and icons 3:1 | 57 |
| Visible focus | 8 |
| Icon floor and lucide | 16 |
| Disabled reason (ENG-3773) | 11 |
| D defect | 10 |
| Decision 5 | 2 |
| Accessibility (non-visual) | 43 |

D's own green focus rings (creator portal, selectable tiles, inline payment, "View creator") already clear 3:1, so the system keeps them; they are not exceptions.

## Text 4.5:1

| Where | Token | D value | DS value | Why |
|---|---|---|---|---|
|  | `ink-tab` | #77767c | #76767b | D's #77767C measures 4.499:1 on white; one step darker reaches 4.5:1. |
|  | `muted-subtle` | #9499a0 | #71777f | D's 'Added' date is 2.87:1 on white. Same hue, darker until 4.5:1. |
|  | `warning-text` | #996e18 | #926917 | D's warning label is 4.19:1 on its fill. |
|  | `neutral-text` | #77777e | #6e6e75 | D's neutral badge label is 3.97:1 on #F2F2F3. |
|  | `avatar-1-ink` | #82766d | #756a62 | D's initials are 3.8:1 on their fill. |
|  | `avatar-2-ink` | #6b8374 | #5d7265 | D's initials are 3.59:1 on their fill. |
|  | `avatar-3-ink` | #7a7589 | #6e697b | D's initials are 3.81:1 on their fill. |
|  | `checklist-meta` | #717888 | #6f7686 | D's percent line is 4.43:1. |
| SectionHeading eyebrowTone='team' · 'LIMELIGHT / YOUR TEAM' on Approvals and Activity | `heading-kicker` | #727782 | #707580 | D's team eyebrow is 4.49:1 on white. Same hue and saturation, darker until 4.5:1 on surface and surface-header. |
| DropdownMenu · 'Draft with Ivy, review in the campaign panel', 'Owner' | `menu-desc` | #767681 | #6e6e78 | D's item description is 4.49:1 on white and 4.06:1 on a highlighted item (#F0F4F9). Same hue, darker until it clears 4.5:1 on white and on all three highlight grounds. |
| DropdownMenu · 'QUICK ACTIONS', 'YOUR TEAMS' | `menu-label` | #8a8a94 | #757580 | D's section label is 3.42:1 on white. |
| TaskCard · 'Ivy', 'Elliot' link | `task-link` | #747780 | #6e717a | D's agent link is 4.47:1 on white and 4.16:1 on its #F4F7FB hover ground. Lightest passing shade on both: 4.88:1 and 4.54:1. |
| PanelGreeting · 'Quick starts for Content. Or ask Elliot anything.'; PanelNote inset text | `panel-muted` | #76767e | #6b6b72 | D paints the card-body grey straight onto the panel image: 3.96:1 on #EAF1FC and lower on the image's darkest pixel (#EEEBFD). Lightest shade of D's hue that clears every sampled ground: 4.52:1 on #EEEBFD, 4.96:1 on the inset note ground #F5F8FB (D 4.23:1). |
| RunCard · steps not started yet ('Looking for gaps against your posting plan') | `chat-step-pending` | #a0a1a8 | #757680 | D's not-started run step is 2.57:1 on white. Same hue, lightest shade that clears 4.5:1 (4.51:1). |
| ConversationHistory · current row subline (history dialog and full view) | `chat-history-meta` | #777777 | #6f6f6f | D's 'Current conversation' line is 4.05:1 on the current row ground #F0F4F9. Lightest passing shade: 4.55:1 on #F0F4F9, 5.02:1 on white. |
| FullViewDialog · ChatMessage 'You' label | `chat-full-user-label` | #71717a | #6f6f78 | D's 'You' label is 4.4:1 on the grey user bubble (#F4F4F5) in the full view. Lightest passing shade: 4.53:1. Agent labels on white stay muted-overlay (4.83:1). |
| FlowStepCard · answer input placeholder ('Or type your own answer…') | `chat-flow-placeholder` | #27272a at 50% (renders #939394) | #767677 | D's answer-input placeholder renders 3.07:1 on white. Same hue, lightest shade that clears 4.5:1 (4.54:1). |
| Creator review drawer · tertiary tags and meta, drawer EmptyState body | `drawer-meta` | #96909e / #99939f / #98949f / #95909b / #8b8592 | #756e7e | 'Sample insights' (9px) is 2.86:1 on the recommendation card; 'Sample content', 'Last 60 days', '/100', post meta and stats are 2.8-3.6:1. Same hue, darker until 4.5:1 on every drawer ground. |
| Creator review drawer · section notes, fit-detail terms | `drawer-note` | #807987 | #756e7b | 3.88:1 on the recommendation card, 4.2:1 on white. |
| Creator review drawer · IVY'S TAKE | `drawer-take` | #777087 | #746d84 | 4.36:1 on the recommendation card gradient. |
| Creator review drawer · 'For Q2 SaaS Growth' | `drawer-campaign` | #81798e | #756e82 | 3.84:1 on the recommendation card gradient. |
| 'Invoice or transfer reference', 'https://…' | `placeholder-flow` | #929493 (50% of #242A28) | #737574 | Flow and portal placeholders render at 50% of the text colour, 3.05:1 on white. Same hue, darkened to 4.64:1 on surface and 4.5:1 on the portal aside. |
| Textarea default: 'Write a reply, or review Ivy’s draft above…' | `placeholder-reply` | #8e8e90 (50% of #1D1D20) | #767679 | The reply composer placeholder is 3.27:1 on white. Same hue, darkened to 4.53:1. |
| CreatorCell · 'Added 14 Sept' | `person-date` | #9499a0 | #6a7078 | D's 'Added' date is 2.87:1 on white. Base muted-subtle (#71777F) passes on white but falls to 4.29:1 on a hovered row (surface-subtle at 50%). Same hue, darker until it clears 4.5:1 on white, hover and selected grounds. |
| SettingsSection · 'Organization details' | `settings-heading` | #74747d | #72727b | D's section heading is 4.40:1 on the settings ground #FAF9F7. |
| SettingsSection '1 member', SettingsHeader 'TEAM' and 'Permanent team identifier' | `settings-meta` | #777777 | #737373 | D's small meta text is 4.26:1 on #FAF9F7 and 4.48:1 on white. |
| Disclosure card · 'Prototype only: links use data saved in this browser.' | `disclosure-note` | #777777 | #767676 | D's note is 4.48:1 on white. |
| Disclosure inline · 'Topics', 'Confirm audience fit ...' | `disclosure-term` | #807987 | #756e7b | D's terms and note are 3.88:1 on the drawer card ground #F7F5FC. |
| PortalShell · 'Deliverables' | `portal-glance-label` | #6e7b72 | #68746c | D's at-a-glance label is 4.10:1 on #F3F7F3 and 4.43:1 on white. |
| CountHeader · 'LIMELIGHT / YOUR TEAM' on Approvals and Activity | `ops-kicker` | #727782 | #717681 | D's .ops-kicker is 4.49:1 on white. Same hue and saturation, one step darker reaches 4.55:1. |
| CountHeader · 'need your decision' | `ops-count-label` | #777777 | #767676 | D's .ops-count small is 4.48:1 on white. |
| ActivityItem · meta 'Ivy · Example · 06:57 PM' | `muted-subtle` | #7a8189 | #71777f | D's .activity-list small is 3.94:1 on white. The lightest passing shade of its hue is exactly the base tertiary grey, so the item reuses muted-subtle. |
| RitualCard · 'Schedule', 'Control', 'Next run' | `ops-meta-label` | #80848b | #72767d | D's .routine-meta small is 3.76:1 on white. |
| RitualCard · 'Nothing changes until you save.' | `ops-suggestion-note` | #777777 | #717171 | D's .autonomy-suggestion small is 4.16:1 on its #F3F7FA fill. #717171 is 4.53:1. |
| CalendarEvent booking chip · creator name (11px) · In revisions | `cal-revisions-ink` | #906f29 | #8d6d28 | D is 4.37:1 on cal-revisions-fill. Same hue and saturation, HSL lightness lowered to the lightest passing shade: 4.51:1 on cal-revisions-fill. |
| CalendarEvent booking chip · creator name (11px) · Brief sent | `cal-brief-ink` | #517298 | #507197 | D is 4.48:1 on cal-brief-fill. Same hue and saturation, HSL lightness lowered to the lightest passing shade: 4.54:1 on cal-brief-fill. |
| CalendarEvent booking chip · creator name (11px) · Contracting | `cal-contracting-ink` | #856a7b | #816777 | D is 4.30:1 on cal-contracting-fill. Same hue and saturation, HSL lightness lowered to the lightest passing shade: 4.51:1 on cal-contracting-fill. |
| CalendarEvent booking chip · creator name (11px) · Scheduled | `cal-scheduled-ink` | #7d6d9e | #766598 | D is 4.05:1 on cal-scheduled-fill. Same hue and saturation, HSL lightness lowered to the lightest passing shade: 4.52:1 on cal-scheduled-fill. |
| MonthGrid content · day numbers, post event time, title and owner, 'Create new post' label | `ed-cal-ink` | #79808b | #6c727d | D is 3.98:1 on surface and 3.72:1 on ed-cal-outside. Same hue and saturation, HSL lightness lowered to the lightest passing shade: 4.84:1 on surface and 4.52:1 on ed-cal-outside. |
| MonthGrid content · SUN to SAT row (11.2px) | `ed-cal-weekday` | #95999f | #6e7279 | D is 2.86:1 on surface and 2.67:1 on ed-cal-outside. Same hue and saturation, HSL lightness lowered to the lightest passing shade: 4.83:1 on surface and 4.51:1 on ed-cal-outside. |
| PartyFilterTile · reasons line, 11px ('awaiting impressions · in revisions', 'nothing waiting') | `party-reason` | #767780 | #6c6d75 | D is 3.90:1 on party-pressed-fill and 4.14:1 on surface-hover and 4.45:1 on surface. Same hue and saturation, HSL lightness lowered to the lightest passing shade: 4.51:1 on party-pressed-fill and 4.79:1 on surface-hover and 5.14:1 on surface. |
| Stepper · stage label not reached (10px, Booking drawer) | `stepper-todo-ink` | #888888 | #767676 | D is 3.54:1 on surface. Same hue and saturation, HSL lightness lowered to the lightest passing shade: 4.54:1 on surface. |
| MetricCard · up delta ('+2 vs last month', '+18% vs. April') and on-pace headline | `metric-up` | #298662 | #298561 | D is 4.49:1 on surface. Same hue and saturation, HSL lightness lowered to the lightest passing shade: 4.54:1 on surface. |
| Funnel · '4.8% of previous' (11.2px) | `funnel-meta` | #8a8b8e | #757679 | D is 3.41:1 on surface. Same hue and saturation, HSL lightness lowered to the lightest passing shade: 4.54:1 on surface. |
| StepRail waits and grips, CadencePill mini, EmailPreview placeholder, hint and close icon | `seq-ink-3` | #777b85 | #6d717a | D is 4.24:1 on surface and 4.02:1 on seq-rail and 3.98:1 on seq-pill-fill and 3.92:1 on seq-subtle. Same hue and saturation, HSL lightness lowered to the lightest passing shade: 4.89:1 on surface and 4.64:1 on seq-rail and 4.59:1 on seq-pill-fill and 4.52:1 on seq-subtle. |
| StepRail · 'needs' warning line (11px) | `seq-amber` | #a16b13 | #9c6712 | D is 4.25:1 on seq-amber-fill and 4.54:1 on surface. Same hue and saturation, HSL lightness lowered to the lightest passing shade: 4.51:1 on seq-amber-fill and 4.81:1 on surface. |
| EmailPreview address placeholder 'Enter email address' (D: --text at 50%, #25242A over white) | `seq-placeholder` | #929195 | #77767b | D is 3.13:1 on surface. Same hue and saturation, HSL lightness lowered to the lightest passing shade: 4.50:1 on surface. |

## Borders, marks and icons 3:1

| Where | Token | D value | DS value | Why |
|---|---|---|---|---|
|  | `control-border` | #dddfe4 | #858d9e | D's input border (hsl 220 11% 88%) is 1.28:1 on white. Same hue and saturation, darker until 3:1 on every ground a control sits on (white, header, nav, panel bar, hovered row, settings, sequence-builder and notice grounds). |
|  | `selected-border` | #b7cde3 | #6695c4 | D's selected-card border is 1.56:1; it is the only mark of the selected card in the grid. |
|  | `resize-grip` | #c3cedb | #748dac | D's grip is 1.4:1 on the panel ground and is the only visible mark of the resize control. |
|  | `accept-hover-border` | #c9e2d6 | #559f7c | D's hover border is 1.37:1; it replaces the control border while hovered, on a hovered row (#FAFAFA). |
|  | `reject-hover-border` | #edcec8 | #ce7a6a | D's hover border is 1.47:1; it replaces the control border while hovered. |
|  | `mint-border` | #96b6a8 | #719c8a | D's pill border is 2.16:1 on the header. |
|  | `ring-1` | #9edbea | #29a1bf | The ring is the only mark of the selected agent when the nav is hidden; D's stops are 1.5-1.95:1. Each stop keeps its hue, darker until 3:1. |
|  | `ring-2` | #a9bfee | #6e93e2 | See ring-1. |
|  | `ring-3` | #c7b0e7 | #a884da | See ring-1. |
|  | `ring-4` | #ecc8e7 | #cf75c3 | See ring-1. |
|  | `checklist-done` | #68a58a | #62a185 | D's done fill is 2.86:1 on white and the white check is 2.86:1 on it. |
|  | `checklist-todo-ring` | #d9dde4 | #8895ab | D's ring is 1.36:1. |
|  | `checklist-current-ring` | #789dd0 | #7097cd | D's ring is 2.79:1. |
|  | `checklist-grip` | #afb5c0 | #8d95a5 | D's grip is 2.06:1. |
|  | `progress-start` | #7c9ecb | #678ec3 | D's fill is 2.47:1 on its track. |
|  | `progress-end` | #9b8dcb | #9282c6 | D's end stop is 2.66:1 on its track. |
| TaskCard · arrow-right in the agent link | `task-arrow` | #7695b4 | #7392b2 | D's link arrow is 3.12:1 at rest but 2.9:1 on the #F4F7FB hover ground. Lightest passing shade on both: 3.24:1 and 3.01:1. The 20px card glyph keeps D's #7695B4 (task-icon), which only sits on white. |
| AgentPanel · 'Resize assistant' grip | `resize-grip-hover` | #c3cedb | #6581a3 | D keeps its #C3CEDB grip on the hover and focus band (rgba(155,188,229,.3) over #EAF1FC = #D2E1F5), where it is 1.2:1; the base resize-grip is 2.57:1 there. The grip darkens to the lightest passing shade of D's hue (3.03:1) while the separator is hovered, focused or dragged. |
| StatusBubble links · FlowStepCard choices and outlined actions · RunCard 'A few things to fix' (panel) | `control-border` | #dddfe4 | #858d9e | D's outlined chat buttons are 1.3:1 on white. Base control-border is D's hue at 3:1 (3.41:1 on white). |
| BusyBar · Start over, RunCard · offer (panel). In the full view both sit on white and use control-border-overlay. | `chat-busy-border` | #dddfe4 | #5f6678 | 'Start over' and the 'Open Calendar' offer sit on the panel image, not on white, where control-border is 1.7:1. Same hue, lightest shade that clears 3:1 on every sampled ground behind them (3.01:1 on #A7BAF8, 3.11:1 on #B6BDE2). |
| FlowStepCard frame='none' · lettered options, chips, author select, answer input and send (panel and full view) | `chat-flow-border` | #dedee5 | #9393aa | D's in-message step controls are 1.3:1 on the white bubble. Same 240° hue, lightest shade that clears 3:1 (3.0:1). |
| ConversationHistory search input (dialog and full view) · FullViewDialog composer input · BusyBar and RunCard offer inside the full view. Overlay buttons get it from group D's .lla-overlay scope. | `control-border-overlay` | #e4e4e7 | #8c8c99 | D's shadcn control border in the portal is 1.26:1 on white. Group D's overlay token: same hue, 3.32:1 on white, 3.02:1 on the hovered #F4F4F5 fill, 3.01:1 on chat-history-current. |
| .lla-overlay scope · Cancel, Reject, Not a fit, Next, overlay fields | `control-border-overlay` | #e4e4e7 | #8c8c99 | Outline buttons and fields inside portaled overlays use shadcn's border, 1.26:1 on white. Same 240° hue, lightest shade that clears 3:1 on surface, surface-nav, surface-subtle (hovered outline) and chat-history-current. |
| Sheet discard confirm · Keep editing | `seq-control-border` | #d4d9e1 | #808fa7 | 'Keep editing' outline is 1.42:1 on white. Group H's shade of the same hue. |
| TextInput/NumberInput/DateInput/Textarea variant targeting, flow, portal: Internal campaign targeting, Record external payment, creator portal pricing form | `control-border-flow` | #ced8d1 | #7e9986 | Ivy flow and portal fields are 1.46:1 on white. Same green-gray hue, lightest shade that clears 3:1 on surface (3.09) and the portal aside #FAFCFB (3.0). |
| Textarea default: Inbox reply composer | `control-border-reply` | #ccd8d1 | #7d9c8a | The reply composer border is 1.47:1 on the white conversation ground. Same hue, darkened to 3.0:1. |
| Textarea variant voice: 'Custom instructions', 'Common CTAs' | `control-border` | no border | #858d9e | Tone of Voice textareas have no border, so the field has no visible edge on the white card. The DS adds the base control border. |
| FilterChip at rest (Inbox 'Q2 SaaS Growth 4') | `filterchip-border` | #dedfe2 | #91949e | A resting campaign chip's border is 1.33:1 on the white filter card and is the only edge of the button. Same hue, darkened to 3.03:1. |
| FileDropzone (Add a source) | `dropzone-border` | #dddddd | #949494 | The upload box border is 1.36:1 on the dialog surface and marks the drop target. Same neutral, darkened to 3.03:1. |
| RowActions · Accept / Reject / Message at rest | `row-action-border` | #e6e8eb | #8891a0 | D's row action border is 1.23:1 on white. Same hue, darker until 3:1 on white and on a hovered row (3.18:1 and 3.02:1). |
| SelectableTile · 'Lumanu' | `tile-border` | #cbd8cf | #7b9c85 | D's unselected tile border is 1.47:1 and is the tile's only boundary. |
| PortalShell · 'Express interest without rates', 'Ask a question', 'Not this time', 'Back' | `portal-control-border` | #cbd6ce | #7e9985 | D's portal button border is 1.49:1 on white and 1.45:1 on the aside. Same hue, darker until 3:1 on both (3.10:1 and 3.01:1). Portal inputs (D #CED8D1) use group E's control-border-flow. |
| MessageBubble · draft | `inbox-draft-border` | #7c9b8e | #769689 | D's dashed draft frame is 2.82:1 on the draft fill. It is the visible mark that a message is not sent (the words 'draft, not sent' also say so). |
| InlinePaymentCard · 'Payment provider' | `control-border-flow` | Native provider <select> border #CED8D1 (1.46:1 on white) | #7e9986 | D's border is 1.46:1 on the white card, the only ground it sits on. |
| ApprovalReviewDrawer 'Proposed action' / 'Recorded outcome' · SkillCard Configure workflow 'Instructions' | `control-border-overlay` | Drawer textarea with no border (0px): 212 x 220, 14px padding | #8c8c99 | D's textarea shows no edge at all on the white drawer. The overlay border family is D's shadcn #E4E4E7 raised to 3:1. |
| CalendarEvent booking chip · 2px left stage mark · Live | `cal-live-mark` | #80b09a | #5f997f | D is 2.24:1 on cal-live-fill and 2.44:1 on surface. Same hue and saturation, HSL lightness lowered to the lightest passing shade: 3.03:1 on cal-live-fill and 3.31:1 on surface. |
| CalendarEvent booking chip · 2px left stage mark · In revisions | `cal-revisions-mark` | #c6a050 | #b08a39 | D is 2.30:1 on cal-revisions-fill and 2.46:1 on surface. Same hue and saturation, HSL lightness lowered to the lightest passing shade: 3.00:1 on cal-revisions-fill and 3.21:1 on surface. |
| CalendarEvent booking chip · 2px left stage mark · In progress | `cal-progress-mark` | #9da4ae | #848d9a | D is 2.26:1 on cal-progress-fill and 2.51:1 on surface. Same hue and saturation, HSL lightness lowered to the lightest passing shade: 3.02:1 on cal-progress-fill and 3.36:1 on surface. |
| CalendarEvent booking chip · 2px left stage mark · Brief sent | `cal-brief-mark` | #95b3d6 | #638fc3 | D is 1.94:1 on cal-brief-fill and 2.17:1 on surface. Same hue and saturation, HSL lightness lowered to the lightest passing shade: 3.02:1 on cal-brief-fill and 3.36:1 on surface. |
| CalendarEvent booking chip · 2px left stage mark · Contracting | `cal-contracting-mark` | #bf9bae | #ad7e97 | D is 2.19:1 on cal-contracting-fill and 2.47:1 on surface. Same hue and saturation, HSL lightness lowered to the lightest passing shade: 3.01:1 on cal-contracting-fill and 3.38:1 on surface. |
| CalendarEvent booking chip · 2px left stage mark · Scheduled | `cal-scheduled-mark` | #afa0ce | #9480be | D is 2.11:1 on cal-scheduled-fill and 2.40:1 on surface. Same hue and saturation, HSL lightness lowered to the lightest passing shade: 3.03:1 on cal-scheduled-fill and 3.45:1 on surface. |
| CalendarEvent post · 3px left status mark · published | `ed-status-published` | #32a77f | #30a17a | D is 3.01:1 on surface and 2.81:1 on ed-cal-outside. Same hue and saturation, HSL lightness lowered to the lightest passing shade: 3.23:1 on surface and 3.02:1 on ed-cal-outside. |
| CalendarEvent post · 3px left status mark · pending | `ed-status-pending` | #bf951c | #b18a1a | D is 2.79:1 on surface and 2.60:1 on ed-cal-outside. Same hue and saturation, HSL lightness lowered to the lightest passing shade: 3.22:1 on surface and 3.01:1 on ed-cal-outside. |
| CalendarEvent post · 3px left status mark · draft | `ed-status-draft` | #999999 | #8f8f8f | D is 2.85:1 on surface and 2.66:1 on ed-cal-outside. Same hue and saturation, HSL lightness lowered to the lightest passing shade: 3.23:1 on surface and 3.02:1 on ed-cal-outside. |
| PartyFilterTile · 2px inset bar while the filter is on | `party-pressed-mark` | #8faecf | #638ebc | D is 2.02:1 on party-pressed-fill and 2.30:1 on surface. Same hue and saturation, HSL lightness lowered to the lightest passing shade: 3.01:1 on party-pressed-fill and 3.43:1 on surface. |
| Stepper · ring of a stage not reached | `stepper-todo-dot` | #dedee2 | #9393a0 | D is 1.34:1 on surface. Same hue and saturation, HSL lightness lowered to the lightest passing shade: 3.03:1 on surface. |
| Stepper handoff · minus icon 'Not yet' | `handoff-todo` | #a3a4ad | #93949f | D is 2.48:1 on surface. Same hue and saturation, HSL lightness lowered to the lightest passing shade: 3.01:1 on surface. |
| MetricCard chart · 'previous' line and legend swatch | `chart-previous` | #9b9b9b | #949494 | D is 2.78:1 on surface. Same hue and saturation, HSL lightness lowered to the lightest passing shade: 3.03:1 on surface. |
| MetricCard chart · POSTS VS. FOLLOWERS GAINED bars | `chart-bar` | #8887bd at 50% opacity (renders #c4c3de) | #9290c2 | The posts bars carry data that is printed nowhere else. D's half-opacity accent renders 1.72:1 on surface. The DS draws a solid shade of the same hue at 3.00:1. |
| Gauge · 2x16 'usual' tick | `chart-usual` | #a1a1aa | #8c8c97 | D is 2.33:1 on gauge track and 2.56:1 on surface. Same hue and saturation, HSL lightness lowered to the lightest passing shade: 3.03:1 on gauge track and 3.33:1 on surface. |
| PostCard · image placeholder icon (D text glyph, now lucide image) | `post-image-glyph` | #aaaaaa | #8e8e8e | D is 2.15:1 on post-image-fill. Same hue and saturation, HSL lightness lowered to the lightest passing shade: 3.03:1 on post-image-fill. |
| CadencePill fields, EmailPreview To select and address field, StepRail dashed Add step | `seq-control-border` | #d4d9e1 | #808fa7 | D is 1.42:1 on surface and 1.35:1 on seq-rail and 1.33:1 on seq-pill-fill and 1.31:1 on seq-subtle. Same hue and saturation, HSL lightness lowered to the lightest passing shade: 3.28:1 on surface and 3.11:1 on seq-rail and 3.08:1 on seq-pill-fill and 3.03:1 on seq-subtle. |
| TokenChip 1px border | `seq-chip-line` | #e8e9ed | #888da2 | D is 1.21:1 on surface and 1.16:1 on seq-chip-fill and 1.11:1 on seq-ivy-fill. Same hue and saturation, HSL lightness lowered to the lightest passing shade: 3.29:1 on surface and 3.15:1 on seq-chip-fill and 3.02:1 on seq-ivy-fill. |
| StepRail · 'Stop on reply' switch track when off | `seq-switch-off` | #d4d9e1 | #8795ab | D is 1.42:1 on surface. Same hue and saturation, HSL lightness lowered to the lightest passing shade: 3.04:1 on surface. |
| StepRail · border of the active step | `seq-active-line` | #94bda9 | #609c7f | D is 1.96:1 on seq-active-fill and 1.97:1 on seq-rail. Same hue and saturation, HSL lightness lowered to the lightest passing shade: 3.03:1 on seq-active-fill and 3.04:1 on seq-rail. |
| StepCard · reply text frame | `ed-field-line` | #dededa | #959589 | D is 1.35:1 on surface. Same hue and saturation, HSL lightness lowered to the lightest passing shade: 3.03:1 on surface. |
| TokenChip 'Snippets' border | `seq-snippets-line` | #e4e6eb | #858ea5 | D is 1.15:1 on seq-subtle and 1.25:1 on surface. Same hue and saturation, HSL lightness lowered to the lightest passing shade: 3.03:1 on seq-subtle and 3.28:1 on surface. |

## Visible focus

| Where | Token | D value | DS value | Why |
|---|---|---|---|---|
|  | `focus-ring-panel` | #8fb6e0 | #2e68a8 | Controls in the panel (Start over, the run offer, quick starts) sit on the Elliot image; focus-ring #4D8BCE drops to 1.2-2.2:1 on its darker pixels. Same hue, darker until 3:1 on every sampled pixel. |
|  | `focus-ring` | #8fb6e0 | #4d8bce | D's button ring is 2.11:1 on white and 1.86:1 on the panel ground, inputs use a 1px #9FBFE9 ring, and the agent portraits show no ring at all. One ring for every control: D's width and offset, same hue, darker until 3:1. |
| AgentRail | none | No focus ring on the agent portraits (`outline: none`). The selected agent's gradient ring sits 2 to 5px outside the 40px button. | The global focus-ring (2px) at a 6px offset on rail portraits only, so it sits 6 to 8px out with a 1px gap from the selection ring. Every other control keeps the 3px offset. | At the global 3px offset the ring lands on the selection ring (1.18:1 against its stops), so focusing the selected portrait only turned the gradient blue. 6px is the smallest offset that keeps the two rings apart. The ring still fits inside the 56px rail. |
| DropdownMenu items | none | build-menu-item outline: 0; focus shows only as the highlight ground (#EDF7F2 / #EFF5FC / #F0F4F9, about 1.07:1) | core focus ring on the focused item | Keyboard focus must be visible at 3:1. The ring comes from core; B adds no ring rule. |
| AgentPanel · 'Resize assistant' | none | .chat-resize:focus-visible { outline: 0 } with the 30% blue band only | core focus ring on the separator | The separator is keyboard operable (tabindex 0). D's band is its only focus mark and is 1.3:1 against the panel. |
| FullViewDialog | none | history and transcript scroll columns start at the content edge (x 195 and 479) | same positions, 5px inner padding with an equal negative margin on both columns | WCAG 2.4.7 Focus Visible: the DS ring (2px at a 3px offset) needs 5px of room, and D's scroll columns start flush at the content edge, so they would clip it on 'New chat', the rows, 'Back to workspace' and the composer input. |
| All E-forms controls | none | Input focus: 1px #9FBFE9 ring in the page, 1px #18181B ring in dialogs, outline none | Global focus ring (2px focus-ring, 3px offset) on every field, trigger, switch, checkbox box, radio dot and chip | #9FBFE9 is 1.89:1 on white. The base focus-ring exception covers it. It is listed so the form fields are covered explicitly. |
| PartyFilterTile.Group | none | Party tiles clipped by overflow hidden on the group | End tiles rounded (radius 8 minus the 1px frame), nothing clipped | WCAG 2.4.7 Focus Visible: the group cut off the focus ring. |

## Icon floor and lucide

| Where | Token | D value | DS value | Why |
|---|---|---|---|---|
| Sidebar | none | Nav glyphs are text characters at 13px: ⌃ / ⌄ (group toggles), ⌕ (Search team), + (Add member, Add profile) | lucide chevron-up / chevron-down / search / plus at the 16px indicator size in the 24px box | Glyphs next to a label and glyphs in compact (28x36) icon buttons render at 16px. The box overlaps the row padding by 4px so labels stay where D puts them. |
| AgentRail | none | Rail tool glyphs (menu, settings, circle-help) and Add agent (plus) render at 16px in 36px and 40x36 buttons | 20px action glyph (icon-glyph) in the same buttons | Standalone icon buttons of 36px or more carry the 20px action glyph. |
| ChatComposer · Send message | none | Send glyph 16px (lucide size 16, shadcn [&_svg]:size-4) | 20px action glyph in the 24px box | Send is a standalone 36x34 icon button, so it takes the 20px action glyph. Every other panel glyph (toolbar, Build-with chevrons, TaskCard arrow, menu icons) is already 16px in D and stays 16px. |
| RunCard steps · StatusBubble links · ConversationHistory 'New chat' · FlowStepCard chips and answer row | none | text marks ✓ · → + ✦ ↑ ✎ at 12 to 14px | lucide check, dot, arrow-right, plus, sparkles, arrow-up, pencil at 16px | D writes these marks as text characters. The 24px box overlaps the row or button padding so rows keep D's height (run step 18px, option row 39px). |
| ConversationHistory dialog layout | none | 'Open full view' panel-left glyph 16px (shadcn size-4) in a 50x36 button | 20px glyph, same 50x36 button | The button is a standalone icon button, so the glyph takes the action tier. |
| FlowStepCard answer row (Elliot in-message steps) | none | answer send button 24.8x39 with a text arrow '↑' | 34x39 with a 16px arrow-up in the 24px box | The 24px icon box needs the extra width. The input gives up 9px. |
| Dialog, AlertDialog, Drawer · Close | none | 16x16 close button hit area (16px X glyph at 70%) | 24x24 box, same 16px glyph at the same spot; opacity 1 while focused | Every icon sits in a 24px box. At 70% the global ring would render #81ADDC (2.35:1), so the focused X is drawn at full opacity; D's own ring is a box-shadow. |
| Sheet · Close | none | 21px text glyph ✕ | lucide x, 16px, same 34x29 button | Unicode ✕ maps to lucide x (binding ruling 3). |
| ChecklistPopover | none | Minimise and Dismiss 18x18 with 14px glyphs; grip and current chevron 13px | 24px boxes with 16px glyphs (the two boxes overlap 2px so the drag area stays 202px) | House icon sizes. The step check (11px) stays: it is part of the 16px state mark. |
| Chip: Tone of Voice emojis and list symbols, Campaign calendar filter chip | none | × typed as text in the chip label ('😂 ×', '× Waiting on the creator'), drawn at the 14px label size | lucide x at 16px in the 24px icon box | The × is the chip's remove mark, and the house rule draws marks as 16px glyphs in a 24px box. The chip grows by about 12px ('😂 ×' is 64px in D, 76px in the DS). |
| PlatformIcons, KanbanCard meta line | none | 14px platform marks (11px on Kanban cards) | 16px | The letter marks 'in', '𝕏', '▶' stay text, raised to the 16px glyph floor. |
| Disclosure card · 'Sharing settings' | none | Native list-style marker (disclosure-closed) at 14px, a triangle about 8px wide | lucide chevron-right, 16px, rotates 90° when open | The marker is the only affordance of the summary and sat below the 16px floor. |
| Disclosure inline · 'View fit details' | none | chevron-down 14px | 16px | Indicator glyphs are 16px. |
| PortalShell · 'https://limelighthq.com ↗' | none | '↗' text glyph | lucide arrow-up-right 16px | D's unicode arrow maps to lucide arrow-up-right. |
| ThreadHeader · 'View creator' | none | '↗' text glyph (12px) after 'View creator' | lucide arrow-up-right, 16px glyph in the 24px box | D's arrow is a 12px text character below the icon floor. |
| ReadinessList, PostCard, StepRail, CadencePill, TokenChip, EmailPreview, StepCard, Stepper | none | Text and emoji used as icons: ✓ ⚠ (Pay modal), ▧ (image), 📨 🕒 ⠿⠿ ↳ ＋ (rail), ✦ ✕ ➤ (tokens, preview), × (remove step); lucide Check and Minus at 15px in the handoff tiles | lucide check, triangle-alert, image, mail, clock, grip-vertical, corner-down-right, plus, sparkles, x, send-horizontal, minus. 16px glyphs in the 24px box (image placeholder 20px). | House icon rule. |

## Disabled reason (ENG-3773)

| Where | Token | D value | DS value | Why |
|---|---|---|---|---|
| FlowStepCard disabled (answered in-message step) | none | answered step: controls at 0.65 opacity, no text | same dimming plus the opaque muted line 'You answered this step. Continue below.' | A dimmed control must not be the only carrier of why it is off. |
| Drawer (review) · pager | none | 'Previous creator' disabled on the first creator with no reason | opaque 'This is the first creator.' in drawer-muted, linked by aria-describedby | The reason for a disabled control must exist in opaque text tied to it. |
| EmptyState · flow (Creator responses gated) | none | disabled 'Create pricing request' with the reason in unlinked text | reason linked with aria-describedby | The explanation of a disabled control must be tied to it. |
| DateInput preview, Record external payment | none | A future payment date disables 'Record payment — no transfer' at 0.5 opacity with no stated reason | The disabled button carries an opaque muted reason ('Choose today or an earlier payment date to record it.') tied with aria-describedby. The date field itself stays as D. | The dimmed button was the only carrier of why it is off. |
| TextInput, NumberInput, DateInput, Textarea, Select, Toggle, Checkbox, RadioCard, RadioCardGroup, FileDropzone | none | Disabled controls dim to 0.5 with no stated reason ('Create invitation', 'Save ritual', 'Save app domain', 'Accept proposal & review payment') | Every E-forms control takes disabledReason: opaque muted text tied with aria-describedby while disabled | A dimmed control must not be the only carrier of why it is off. |
| ApprovalReviewDrawer | none | 'Approve & next' disabled on blank text with no reason | Opaque muted line 'Write the proposed action to approve it. Reject stays available.' tied with aria-describedby | The dimmed button must not be the only carrier of why it is off. |
| RitualCard | none | 'Run now' disabled (paused, review pending, action waiting) with no reason | runDisabledReason line tied with aria-describedby ('Paused. Resume the ritual to run it now.', 'A review is pending in Approvals.') | D explains none of the three disabled cases. |
| RitualCard · Edit ritual dialog | none | 'Save ritual' disabled on a blank schedule or empty next run with no reason | 'Add a schedule and a next run to save the ritual.' tied with aria-describedby | The dimmed button must not be the only carrier of why it is off. |
| SkillCard · Configure workflow drawer | none | 'Save workflow draft' disabled on blank instructions with no reason | 'Write the instructions to save a draft.' tied with aria-describedby | The dimmed button must not be the only carrier of why it is off. |
| InlinePaymentCard · review | none | 'Confirm simulated payment' disabled until the box is ticked, with no reason | 'Tick the approval box to confirm the payment.' tied with aria-describedby | The dimmed button must not be the only carrier of why it is off. |
| PartyFilterTile | none | Disabled party tile ('Procurement 0') has no description | The reasons line ('nothing waiting') describes the button via aria-describedby | The reason a tile is off stays in opaque text tied to it. |

## D defect

| Where | Token | D value | DS value | Why |
|---|---|---|---|---|
| AppShell | none | Shell min-width 1122px (nav hidden 936px), which assumes a 260px chat column while the default is 300px | min-width = rail 56 + nav 186 + main 620 + the live chat width (1162px at the default; 976px with the nav hidden) | D's workspace has overflow:hidden and a min-width 40px short of its own grid, so below 1162px the panel's right 40px (Hide assistant, Send) is cut off and cannot be reached. The DS sizes the min-width from --chat-width, so the page scrolls sideways instead and nothing clips. No auto-hide (decision 7). |
| Dialog · centered | none | no max height: a centered dialog taller than the viewport runs off screen | max-height: 100dvh - 32px, scrolls | Controls at the bottom of a tall centered dialog become unreachable (WCAG 1.4.10 Reflow). |
| Sheet header · Save | `seq-cta` | hover: fill #f5f6f8 under a white label (opacity .85) | #232127 | D's .seq-btn:hover background overrides the primary fill, so the 'Save' label vanishes while hovered (1.1:1). |
| Snackbar · payment complete | `ink` | #ffffff labels on #ffffff buttons | #1d1d20 | The snackbar's outline buttons inherit its white text, so 'View payments', 'View approvals' and 'Dismiss' are invisible (1:1). D's fill and #DDDFE4 border stay; only the label colour changes (16.8:1). |
| ChecklistPopover | none | z-index 80 (above every scrim and modal) | z-floating 40 | The checklist stays bright and clickable over dialogs and drawers. Decision: keep it below modals. |
| ChecklistPopover · floating | none | default left 12px, top = viewport - 420 | default left = rail width + 12 (68px), same top | At D's default the card covers the rail's Hide navigation, Settings and Help; a real click on Help lands on the checklist. Decision: clear of the rail tools. Clamping (8px inside the viewport on mount, resize and expand) is D's. |
| FileDropzone | none | The box says 'Drop a file here, or browse', but a drop is accepted only on the native file input, not on the rest of the box | A file dropped anywhere on the box is passed to onChange. No new visual state. | The copy promises a drop target that does not work across most of its area. |
| InlinePaymentCard | none | A Paid record overwrites a Failed one, and the retry form claims 'funds available' with no sign of the failure | Record mode keeps status 'Failed · {provider}' with D's failure copy. lastAttempt='Failed' repeats D's own sentence 'The simulated provider declined this payment. No completed payment was recorded. Review funding and retry.' above the retry form. No new copy. | A Paid record must not hide a Failed one (orchestrator ruling 6). |
| MonthGrid content · every day | none | '+ Create new post' 14px/20px button, 146px wide in a 114px day. The next day covers it, so it reads '+ Create new p' | Full-width 14px/20px secondary Button (plus icon, 8px side padding). The label wraps inside the day. | Text overflowed its button and was cut off by the next day. Size and copy stay D's. |
| PostCard · draft action | none | Draft CTA 'Send to Jordan for approval' on one centred line, clipped past the 131px card body | The label wraps inside the card, still centred (at least 36px tall) | Text overflowed its button and the card. |

## Decision 5

| Where | Token | D value | DS value | Why |
|---|---|---|---|---|
| AppShell + ReopenAssistant | none | Hide assistant and 'Chat with {agent}' both drop focus to BODY | Hide moves focus to the reopen pill. Reopen moves focus into the panel (its [data-lla-panel-focus] element, else the composer input, else its first control) | Grant's decision 5: the hide is session-only, and focus follows the control the user pressed. D drops focus to BODY in both directions, which leaves keyboard and screen-reader users at the top of the document. |
| AgentPanel · open false → true | none | Hide / reopen leaves focus where it was | reopen moves focus into the panel ([data-lla-panel-focus], else the composer input, else the aside) | Grant's decision 5: focus moves into the panel on reopen and onto the 'Chat with {agent}' pill on hide (the consumer moves it to the pill). |

## Accessibility (non-visual)

| Where | Token | D value | DS value | Why |
|---|---|---|---|---|
| ReopenAssistant | none | aria-label 'Show assistant' on a pill that reads 'Chat with Ivy' | Accessible name 'Chat with Ivy, show assistant' (visible text first) | WCAG 2.5.3 Label in Name (Level A): D's accessible name 'Show assistant' does not contain the visible label 'Chat with Ivy', so a speech user who says 'click Chat with Ivy' gets nothing. The DS name starts with the visible text and keeps D's 'show assistant' phrase. |
| DropdownMenu · Build with Elliot quick actions | none | Menu section label is a Radix Label (plain div, no role) | items after a section sit in role=group, aria-labelledby the label | WCAG 1.3.1 Info and Relationships: the visual grouping under 'QUICK ACTIONS' is exposed to assistive technology. |
| DropdownMenu two-line items | none | Menu item accessible name is its whole text ('Create campaign brief Draft with Ivy, review in the campaign panel') | name = title (aria-labelledby), description = aria-describedby | WCAG 1.3.1 and 4.1.2: the title names the item and the second line is read as its description, as the visual hierarchy shows. |
| DropdownMenu · account menu 'Limelight' | none | 'Limelight ✓' (the check is a text character) | lucide check (aria-hidden) plus visually hidden '(current)' | WCAG 1.1.1 Non-text Content: the ✓ maps to the lucide check glyph (ruling 3), so the current-team state is given as text. |
| FlowStepCard disabled | none | answered step fieldset has no name or description | fieldset aria-labelledby the step lead (or title). Every disabled option, chip, select, input, send and button has aria-describedby the reason line | WCAG 1.3.1 Info and Relationships and 4.1.2 Name, Role, Value: the ENG-3773 reason must reach assistive tech on the controls it explains, not only on an unnamed group. |
| RunCard | none | run steps show state only by colour and the ✓ / · mark | each step carries hidden 'Done:', 'Working:' or 'Next:' text. The list is named 'Progress' and the card sets aria-busy until the last step | WCAG 1.4.1 Use of Color and 1.3.1 Info and Relationships: step state must not rely on colour or a glyph. |
| BusyBar | none | 'Adding creators' is plain text | the label has role='status' | WCAG 4.1.3 Status Messages: the flow starting is announced without moving focus. |
| ConversationHistory | none | 'No chats match.' is a plain paragraph | role='status' | WCAG 4.1.3 Status Messages: the search result is announced without moving focus. |
| Dialog, AlertDialog, Drawer, Sheet, discard confirm | none | focus drops to <body> when a dialog, drawer or confirm closes | focus returns to the opener | WCAG 2.4.3 Focus Order: after closing, keyboard users restart at the top of the page in D (REPORT §6). |
| AlertDialog · Delete thread from Limelight? | none | role dialog, described by the subtitle 'Limelight · Local prototype' | role alertdialog, described by the warning paragraphs | WCAG 4.1.2 Name, Role, Value and 1.3.1 Info and Relationships: a destructive confirm is announced as an alert with its consequence ('This does not delete emails…'). D already focuses Cancel. |
| Sheet · Create sequence, discard confirm (alertdialog) | none | plain div: no dialog role, no aria-modal, focus stays on the opener behind the sheet | role dialog, aria-modal, focus moved in and trapped, returned on close | WCAG 4.1.2 Name, Role, Value and 2.4.3 Focus Order: keyboard focus stays on the page behind the overlay in D. |
| ProgressBar · variant primary | none | shadcn Progress without aria-valuenow (Calendar 'Waiting on', Getting started page) | aria-valuenow, aria-valuemin, aria-valuemax, aria-valuetext | WCAG 4.1.2 Name, Role, Value: the bar announces no amount in D. The checklist bar already has D's values and is unchanged. |
| TextInput, NumberInput, DateInput, Textarea, Select, Checkbox, RadioCard, FileDropzone | none | Field hints, errors and descriptions are separate text with no programmatic link, and no aria-invalid | Hint, disabled reason, error and checkbox description join aria-describedby; an error sets aria-invalid | WCAG 1.3.1 Info and Relationships and 3.3.1 Error Identification: the text that explains a field is exposed with that field. |
| Toggle | none | 'Agent opens views' is an aria-label on the switch; the visible span is not bound to it | The visible label is a <label for> the switch, so a click on it flips the switch | WCAG 1.3.1 Info and Relationships and 2.5.3 Label in Name: the visible text is the programmatic label. |
| BulkBar | none | The '20 need review' filter button changes fill when on but exposes no state | aria-pressed on the review button | WCAG 4.1.2 Name, Role, Value: a toggle button exposes its pressed state. |
| ResultCount, BulkBar | none | '20 of 20' and '0 selected for outreach' are plain spans | role=status on ResultCount and the BulkBar selection count | WCAG 4.1.3 Status Messages: a count that changes after a filter or selection is announced without moving focus. |
| FilterBar, SearchInput | none | The filter bar is a plain div; the search field has no landmark | FilterBar is role=group with the name 'Filters'; SearchInput's wrapper is role=search | WCAG 1.3.1 Info and Relationships: the filter controls are exposed as one named group, and the search as a search region. |
| RadioCardGroup | none | The Member / Admin cards follow an 'Email' field with no fieldset or legend | RadioCardGroup is a fieldset with a legend (visually hidden when D shows none) | WCAG 1.3.1 Info and Relationships: the radios are exposed as one named group. |
| CreatorCell | none | The name button's aria-label 'Review Eli Garrison' hides the status badge inside it | Same aria-label, plus aria-describedby pointing at the badge | WCAG 1.3.1 Info and Relationships / 4.1.2 Name, Role, Value: the row status (NEW, ACCEPTED, REJECTED) is visible but was not exposed to screen readers. |
| PlatformIcons | none | aria-label on a plain span ('LinkedIn, X'), which has no role, so assistive tech ignores it | role='img' with the same aria-label, marks aria-hidden | WCAG 1.1.1 Non-text Content / 4.1.2: the platform marks need a text alternative that is actually exposed. |
| DataTable | none | No caption | Visually hidden caption ('Creators in Q2 SaaS Growth') | WCAG 1.3.1 Info and Relationships: names the table for screen-reader table navigation. |
| CampaignCard | none | Selected campaign has only a visual state | aria-current='true' on the selected card's title button | WCAG 1.3.1 / 4.1.2: the selected campaign is conveyed by colour and border only. |
| KanbanBoard | none | The horizontally scrolling board is a plain div that keyboard users cannot scroll; columns are unlabelled sections; cards are not a list | Named region with tabindex 0, columns labelled by their h3, cards in ul/li, the count read as 'Count 21' | WCAG 2.1.1 Keyboard (scrollable region reachable without a mouse) and 1.3.1 Info and Relationships (column grouping, count meaning). |
| SettingsSection | none | Unlabelled settings sections | Each section is labelled by its heading (aria-labelledby) | WCAG 1.3.1 Info and Relationships: exposes the section structure to landmark and heading navigation. |
| SettingsHeader | none | The team initial 'A' is part of the h1 text ('AAgus's Studio') | The initial is aria-hidden, so the heading reads 'Agus's Studio' | WCAG 2.4.6 Headings and Labels / 1.3.1: the decorative initial corrupted the page heading text. |
| PortalShell | none | Unlabelled main and aside; external links give no new-tab warning | main labelled by the h1, aside named 'Your response', the arrow icon labelled 'opens in a new tab' | WCAG 1.3.1 Info and Relationships (landmark names) and 3.2.5 Change on Request (G201: warn before opening a new window). |
| ApprovalRow · ActivityItem · PendingActionCard · RitualCard · SkillCard | none | Repeated buttons ('Approve', 'Reject', 'Review details', 'View record', 'Cancel action', 'Pause', 'Edit ritual', 'Run now', 'Use template') carry no reference to their item | Each button has aria-describedby pointing to its row or card title | WCAG 2.4.6 Headings and Labels (and 2.4.9): identical button names in a list need their item to be told apart. No visible change. |
| ThreadListItem | none | The selected thread is marked only by its border (class 'selected') | aria-current="true" on the selected ThreadListItem | WCAG 1.3.1 Info and Relationships and 4.1.2 Name, Role, Value: the selection must be available to assistive tech, not only as a 1px frame. |
| ApprovalRow · ActivityItem · RitualCard · SkillCard · ThreadHeader | none | Buttons that open a drawer or dialog give no hint of it | aria-haspopup="dialog" on Review details, View record, Edit ritual, Review automation option, Use template and the View creator link | WCAG 4.1.2 Name, Role, Value: the control announces that it opens a dialog. |
| ApprovalRow · ActivityItem · PendingActionCard · RitualCard · SkillCard · ReadCard | none | Cards are plain divs; ritual meta and read facts are spans and divs; times are plain text | article / section named by the card title (aria-labelledby), <dl> for Schedule / Control / Next run and the ReadCard facts, <time> for activity times | WCAG 1.3.1 Info and Relationships: the label-value pairs and card boundaries are exposed as structure. No visible change. |
| SkillCard · Configure workflow drawer | none | 'Workflow draft saved. Nothing has run.' is a role=status paragraph inserted only when the draft saves | The role=status paragraph exists while the drawer is open and receives the text on save | WCAG 4.1.3 Status Messages: a live region must exist before its text changes for screen readers to announce it reliably. |
| MonthGrid content · create button | none | Accessible name 'Create post on 2026-07-06' while the button shows '+ Create new post' | 'Create new post on 2026-07-06' | WCAG 2.5.3 Label in Name: the accessible name must contain the visible label. |
| MonthGrid | none | No day semantics: day cells are plain divs | Each in-month day is a group named 'Friday 1 May' ('…, today'); the weekday row is hidden from assistive tech | WCAG 1.3.1 Info and Relationships: events and create buttons get their date. |
| CalendarEvent booking chip | none | Booking chip aria-label 'Alex Rivera · Live' while the chip also shows '×2' | 'Alex Rivera · Live · booked 2 times' | WCAG 1.3.1 Info and Relationships: the aria-label hid the visible count. |
| CalendarEvent post | none | Post event states its status only with the 3px colour mark | A visually hidden status word comes first ('Published.') | WCAG 1.4.1 Use of Color: the status had no text equivalent. |
| Stepper | none | Stage track li elements carry only a class for done or not reached | Visually hidden ', done' / ', not reached' after each label (the current stage keeps aria-current='step') | WCAG 1.3.1 Info and Relationships: done and not reached were colour-only. |
| ReadinessList payment | none | Readiness marks are text glyphs '✓' and '⚠' | lucide icons named 'Ready' and 'Blocker' | WCAG 1.1.1 Non-text Content: the icons that replace the glyphs need a text equivalent. |
| ReadinessList brief | none | Brief readiness box is a plain div | role='status', so new problems are announced while editing | WCAG 4.1.3 Status Messages. |
| MetricCard chart, Funnel | none | Chart cards are plain divs; funnel stages are divs with bars | Chart cards are sections titled by their h3; funnel stages are an ordered list and the bars are hidden from assistive tech (every value is printed) | WCAG 1.3.1 Info and Relationships. |
| PostCard | none | Kanban score badge reads '89'; the image placeholder is a div with aria-label and no role | Score chip named 'Fidelity 89'; the placeholder icon is an image named 'Image placeholder' | WCAG 1.1.1 Non-text Content and 4.1.2 Name, Role, Value: aria-label on a role-less div is not announced reliably. |
| StepRail | none | Sequence steps are divs with a click handler | Buttons in an ordered list, the open one with aria-current='step'; the rail is a region named 'Sequence steps' | WCAG 2.1.1 Keyboard and 4.1.2 Name, Role, Value: the keyboard could not reach or open a step. |
| StepRail, CadencePill, EmailPreview | none | Stop on reply switch, wait fields, To select and test address field have no accessible name; the preview close button is named '✕' | Named 'Stop on reply', 'Wait amount', 'Wait unit', 'Send time' (group 'Wait before this step'), 'To:' as a label, 'Test email address' (described by the hint), 'Close preview' | WCAG 4.1.2 Name, Role, Value and 3.3.2 Labels or Instructions. |
| StepCard | none | Engagement step cards are unnamed divs | Each card is a group named 'Engagement step 1'; the sequence is a list | WCAG 1.3.1 Info and Relationships. |
