# Components

## Contents

This file has no subsections.

Read a component's guidelines before you use it. Group order follows the app: shell first, then the panel, then page parts.

**Actions**

- `Button`: The app's text buttons, as D renders them: the dark `primary` fill for the main action of a view, the outlined `secondary`, the muted `ghost` link-button and the `danger` outline.
- `Icon`: One lucide glyph (the icon library D uses) inside the 24px house icon box.
- `IconButton`: A button that shows only a lucide glyph: the rail tools, the panel toolbar, row actions and the Send button.

**Status**

- `Badge`: A small status or tag label: "Running", "Draft", "NEW", "Paid", and the neutral tag pills in insight cards.
- `CountBadge`: A count chip inside a button or beside a heading, as in "Approvals 6".
- `ScoreChip`: The green relevancy score chip in creator rows and cards ("94").

**People**

- `Avatar`: The round initials avatar for a creator or teammate.

**Agent**

- `AgentFace`: A round agent portrait: 34px in the rail, 18px in Build-with selectors, 23px beside IVY'S TAKE and 96px in the panel signature.
- `AgentLabel`: The glass "{ Ivy }" pill under the agent portrait at the top of the panel.

**Shell**

- `AgentRail`: The 56px left rail that switches agents, adds an agent, and holds the Hide navigation, Settings and Help tools and the workspace button.
- `AppShell`: The four-column app frame: the agent rail, the nav column, the main column with its sticky page header, and the agent panel.
- `PageHeader`: The 64px bar at the top of the main column: the destination on the left, the "Approvals [n]" button and, while the panel is hidden, the "Chat with {agent}" pill on the right.
- `ReopenAssistant`: The mint "Chat with {agent}" pill in the page header that shows the agent panel again after "Hide assistant".
- `SectionHeading`: The title block of a view: the campaign detail heading with its action and tabs row, or a page title with an optional eyebrow, a subtitle and actions.
- `Sidebar`: The 186px nav column: the agent's name and role, UPPERCASE section labels, 36px rows with counts, collapsible groups, and a third-level tree for a team member's pages.

**Navigation**

- `SegmentedControl`: A grey track of two to four options that switches how the same data is shown, such as "List" and "Kanban".
- `Tabs`: Tabs that switch the sections of a view, drawn either as the campaign's underlined row or as D's grey pill track.

**Agent panel**

- `AgentPanel`: The assistant aside on the right of every page: a 64px toolbar, a scrolling body on the shared panel ground, and a composer footer.
- `AgentSelector`: The "Build with Ivy" and "Build with Elliot" buttons in the composer row, each opening that agent's Build menu.
- `AgentSignature`: The agent's identity at the top of the panel body: the 96px portrait in a thin white ring, the "{ Ivy }" pill and the role line.
- `ChatComposer`: The panel footer: the two Build-with selectors, then the "Ask your team anything…" input and the Send button.
- `InsightCard`: The destination's card in the assistant panel on an empty thread: an optional eyebrow and badge, the finding, a short reason, stats, tags and up to three actions.
- `PanelGreeting`: Elliot's header above his card in the panel: a title that asks what to work on today and a line that points to the quick starts.
- `PanelNote`: The "FROM THE PANEL" card that reports what the panel just did, for example that it opened the Brief tab.
- `StatGrid`: A two-column grid of labelled numbers inside a panel card: Shortlisted 67, Contacted 27, Signed 4, Never approached 40.
- `TaskCard`: A suggested task in the assistant panel: a 20px glyph, the task, one line of why, and a small "{Agent} →" link that starts it.

**Chat**

- `BusyBar`: The line that sits above the composer while a scripted chat flow is running, saying what the agent is doing and offering "Start over".
- `ChatMessage`: One message in the agent panel's chat thread, with the name of whoever wrote it ("You", "Ivy" or "Elliot") above the text.
- `ConversationHistory`: The list of past chats: a "New chat" button, a search that matches titles only, and one row per conversation with a pin toggle.
- `FlowStepCard`: One step of a scripted chat flow, such as Ivy's creator discovery, Ivy's campaign brief or Elliot's draft, built from slots so every step uses the same card.
- `FullViewDialog`: The "Your team · Conversations" dialog that opens the chat at full size, with the conversation history on the left and the thread, "Back to workspace" and a composer on the right.
- `RunCard`: The card an agent shows while it runs a job from the chat, such as Elliot's "week" and "quiet" runs, plus the offer button and the ready card that stand in when "Agent opens views" is off.
- `StatusBubble`: The agent's answer to a status question such as "How are we doing today?": a chat message with a title, four figures in a 2x2 grid, and links to where the work is.

**Overlays**

- `AlertDialog`: A confirmation dialog for an action that needs a clear yes or no, such as D's "Delete thread from Limelight?".
- `Dialog`: A modal window over a dimmed page, as D renders its shadcn dialogs: a 512px centered card or the full view.
- `Drawer`: A full-height panel that slides over the right side of the page for detail and review work.
- `KebabMenu`: A 32px "⋮" button that opens a short list of actions for one object, such as D's "Thread actions" menu in the Inbox.
- `Sheet`: A near-full-screen editing surface with a gradient header, as D uses for the sequence builder ("Create sequence").

**Feedback**

- `EmptyState`: The message a list, table, board column or panel shows when it has nothing to display, in D's own words.
- `Notice`: A one-sentence confirmation that appears in the page after an action, often with an Undo, such as "Creator review saved.".
- `ProgressBar`: A thin horizontal bar that shows how much of a task is done.
- `Snackbar`: A dark bar at the bottom of the screen that confirms a completed action and offers the next steps.

**Onboarding**

- `ChecklistPopover`: The floating "Getting started" card that tracks the five setup steps and moves where the user drags it.

**Forms**

- `SelectableTile`: SelectableTile is one option in a small single-choice set, shown as a bordered tile with a title and a one-line description.

**Filters**

- `BulkBar`: The bar between the filters and the creator table: the need-review toggle, the selection count and the sort select.
- `Chip`: A removable value shown as an outlined button, where one click on the whole chip removes it.
- `FilterBar`: The row of filters above a table or board: search, a status select, a view switch, the result count and one primary action.
- `FilterChip`: A toggle chip with a count pill that filters a list, as in the Inbox "Campaign conversations" card.
- `ResultCount`: The "20 of 20" count in the filter bar, announced politely when it changes.

**Cards**

- `CampaignCard`: CampaignCard summarises one campaign above the campaign detail: its name, status, pipeline size and three outreach stats.
- `CampaignGrid`: CampaignGrid is the row of campaign cards at the top of Campaigns, with the "+ New campaign" button under it.

**Team operations**

- `ActivityItem`: One record on the Activity timeline: a small dot, a meta line with the agent and time, the title, one line of detail, and a "View record" button.
- `ApprovalReviewDrawer`: The 640px side drawer that reviews one approval: the full proposed action in an editable field, then "Approve & next" and "Reject", which both move on to the next item.
- `ApprovalRow`: One decision card in the Approvals list: who asks and what kind of decision it is, the title, its context, a one-line preview of the proposed action, and the buttons to review, approve or reject it.
- `CountHeader`: The header of a team operations page: a small kicker, the page title, a muted subtitle, a big right-aligned count of open decisions, and the filter row under them.
- `PendingActionCard`: A card for a ritual action that waits out a one-minute review window before it runs, with a "Cancel action" button to veto it.
- `RitualCard`: A card for one recurring ritual: the agent, Active or Paused, the ritual name and purpose, its Schedule, Control and Next run, and the Pause, Edit ritual and Run now buttons.
- `SkillCard`: A card for one skill template in the Skills library: the skill name, what it does, and a "Use template" button that opens the "Configure workflow" drawer.

**Inbox**

- `InlinePaymentCard`: The payment step inside an Inbox conversation: a "Review & pay" card to confirm a simulated payment, the "Payment record" it turns into, and the dark completion snackbar.
- `MessageBubble`: One message in an Inbox conversation: a small meta line with the author and time, then the text, in a green-tint bubble when you or Ivy sent it and as plain text when the creator wrote it.
- `ReadCard`: Ivy’s recommendation for the open Inbox thread: the "IVY’S READ" eyebrow and thread status, a one-line verdict, the reasoning, evidence pills, four key facts, and the next actions.
- `ThreadHeader`: The header above an Inbox conversation: the creator’s initials and name with a "View creator" link, their role, the campaign in green, and the 32px "Thread actions" menu at the top right.
- `ThreadListItem`: One conversation in the Inbox thread list: the creator’s initials and name, the campaign and age, a status badge, the last message, and an "Unread" mark.

**Calendar**

- `CalendarEvent`: CalendarEvent is one item on a calendar day: a stage-coloured booking chip in the Ivy campaign calendar, or a post card with a status mark in the Elliot content calendar.
- `MonthGrid`: MonthGrid lays out a month of calendar days and places each booking or post on its date, for both the Ivy campaign calendar and the Elliot content calendar.
- `PartyFilterTile`: PartyFilterTile is a filter button in the WAITING ON card that shows one party ("The creator", "Finance", "Procurement"), how many deliverables it holds and why, and filters the calendar to them when pressed.
- `Stepper`: Stepper shows where a booking stands: a six-stage track from Contracting to Live, or the three handoff tiles that say whether it is contracted, paid and reported.

**Metrics**

- `Funnel`: Funnel is the Analytics "CONVERSION FUNNEL" card: four stages from impressions to booked demos, each with its value, its rate of the previous stage and a bar that shrinks stage by stage.
- `Gauge`: Gauge is the posting-cadence scale on Analytics: a low-to-high track with a tick for the usual pace, a dot for the current pace, and the people below and above pace.
- `MetricCard`: MetricCard shows one number with its context: a wallet figure with an action, a stat with its delta and trend line, or a titled chart card.

**Creator portal**

- `PortalShell`: PortalShell is the public creator page a campaign brief opens into: a top bar, a demo banner, the brief heading, an at-a-glance box, the brief sections and a sticky response aside.

**Data table**

- `CreatorCell`: CreatorCell is the first cell of a creator row: initials, the name as a button with its status badge, the role line and the date the creator was added.
- `DataTable`: DataTable is the app's list of records: a header row, one row per record, 1px row dividers and a light hover tint.
- `PlatformIcons`: PlatformIcons shows which platforms a creator posts on, as D's text marks "in", "𝕏" and "▶".
- `RowActions`: RowActions is the last cell of a creator row: Accept and Reject for a new creator, Message after acceptance, and a status badge otherwise.

**Disclosure**

- `Disclosure`: Disclosure hides secondary detail behind a one-line summary that opens and closes in place.

**Elliot content**

- `PostCard`: PostCard is an Elliot post in the Content view: the Kanban card with author, date, text preview and the draft's approval button, or the post cell of the List view.
- `StepCard`: StepCard is one step of an Elliot engagement sequence in the composer: what happens (Reply, Reaction or Repost), from which account, how long after the post goes live, and the reply text or reaction.

**Form controls**

- `Checkbox`: A 13px checkbox with a label, drawn to match the native checkbox that D renders in Chrome.
- `DateInput`: A native date field, as in D's Record external payment dialog, sized like a text field.
- `FileDropzone`: A bordered upload box with a title, the browser's file input and a format line, as in Elliot's "Add a source" dialog.
- `NumberInput`: A labelled number field with tabular figures and the browser's native stepper, as in D.
- `RadioCard`: One bordered radio choice with a bold title and a one-line description, as in D's Invite teammate dialog.
- `RadioCardGroup`: A fieldset of RadioCards for one exclusive choice, such as D's Member / Admin role in Invite teammate.
- `SearchInput`: The filter-bar search field, with a 16px search glyph inside its left edge.
- `Select`: A single-choice dropdown: a shadcn trigger with an optional inline UPPERCASE label, and a portaled listbox.
- `TextInput`: A labelled single-line text field with an optional hint, error and disabled reason.
- `Textarea`: A labelled multi-line field for replies, targeting notes, voice instructions and portal notes, with an optional character counter.
- `Toggle`: An on/off switch with an 11px label: D's "Agent opens views" in the panel toolbar.

**Kanban**

- `KanbanBoard`: KanbanBoard lays records out in stage columns with a title and a count per column, and accepts any card renderer.
- `KanbanCard`: KanbanCard is one creator on the Creators pipeline board: initials, name, platforms and followers, a role or rate line and the relevancy score.

**Menus**

- `DropdownMenu`: A menu that opens from a trigger button and lists actions: D's "Build with Ivy" and "Build with Elliot" menus and the rail's workspace account menu.

**Readiness**

- `ReadinessList`: ReadinessList shows whether something is ready to go: the Pay modal's three payment checks with the "Payment is blocked" notice, or the brief editor's readiness box before publishing.

**Sequence builder**

- `CadencePill`: CadencePill shows when a sequence step goes out: the "Start immediately" pill for the first step, the editable wait before a later step, or the short wait line between steps in the rail.
- `EmailPreview`: EmailPreview renders one sequence step the way a chosen creator will receive it, with the merge tokens filled in and highlighted, and lets you send yourself a test.
- `StepRail`: StepRail is the left column of the sequence builder: a recommendation, the Stop on reply switch, the list of steps with the waits between them, and "Add step".
- `TokenChip`: TokenChip is a small button in the sequence editor that inserts a merge token ("Creator First Name") at the cursor, or turns the "AI Command" helper on and off.

**Settings**

- `ListRow`: ListRow is one line inside a settings card: a title with a muted description and optional actions, or a label and value pair.
- `SettingsHeader`: SettingsHeader is the top of the Team settings page: the "TEAM" eyebrow, the team name with its initial, the permanent team identifier chip and the page buttons.
- `SettingsSection`: SettingsSection is one block of the Team settings page: an UPPERCASE heading, an optional line of help, and a white card that holds the rows.
