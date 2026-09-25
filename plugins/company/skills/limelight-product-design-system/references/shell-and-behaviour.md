# Shell and behaviour

These rules are decided (Grant, 2026-09-23) and match D. The component guidelines repeat the parts that apply to them.

1. **Landing.** `/` opens the first entitled agent's default destination: Ivy → Campaigns, Elliot → Content. A deep link (`?agent=elliot`) opens that agent. An agent switch resets the destination to that agent's default. The full view is an overlay dialog over the page, not a route.
2. **Reopen pill.** "Hide assistant" is the last toolbar icon. While the panel is hidden, a "Chat with {agent}" pill sits in the page header after "Approvals [n]": `panel-left` icon, `mint-fill`, 40px tall, radius 22, the same for both agents, aria-label "Show assistant". The hide lasts for the session only: an agent switch or a reload shows the panel again. Focus moves into the panel on reopen and onto the pill on hide.
3. **The rail agent's panel on every page.** Shared pages (Approvals, Activity, Rituals, Settings, Knowledge, Getting started) show the rail agent's signature and cards. One composer everywhere ("Ask your team anything…", both Build-with menus). One panel ground for both agents.
4. **No auto-hide.** The panel stays open on every page and at every width, Inbox and Payments included. Inbox handles density with its own grid: thread list 260px, 205px at 1150px and below, stacked at 750px and below.
5. **Restore the last thread.** First load shows the signature, then the destination's insight card, then the composer. A returning user sees the restored last thread. One thread spans all pages and both agents. New conversation and History sit in the panel toolbar.
6. **Resize from 260 to 440.** A 10px separator on the panel's left edge resizes it from 260 to min(440, viewport - 862). Arrow keys move 20px. Home and End jump to the limits. A double-click resets to 300. The width persists.
7. **Getting started.** A floating, movable 280px checklist (`ChecklistPopover`). It sits under every dialog (`z-floating`) and starts at x = 68, clear of the rail's Hide navigation, Settings and Help (D starts at x = 12 over them). Drag and arrow keys move it; it stays inside the viewport.
