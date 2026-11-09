---
name: on-tap-today
description: "Builds a ranked, time-blocked plan for the rest of today from the person's Limelight calendar, meeting action items, tasks, Linear issues and GitHub pull requests. Use when someone asks what is on tap today, what to work on today, to plan their day, for a daily plan, or what is on their plate."
compatibility: "Reads whichever of these the agent can reach: a calendar, a meeting-notes tool with action items (such as Circleback), a task manager (such as Todoist), Linear, Notion, and GitHub through the gh CLI or a GitHub connector. Works with any subset and says which sources it could not check."
metadata:
  owner: company
---

# On tap today

Give the person one short plan for the rest of today: what to do, in what order, and why. The plan covers Limelight work only. This skill only reads. It never completes, comments on, moves or reschedules anything.

## 1. Set the frame

1. Get the current local date, time and time zone. Plan only the hours that remain today.
2. Find the hard stop. Use the end of the last work event, or an event on any personal calendar that ends the workday (for example a school pickup or dinner). Default to 6 PM local if nothing sets one.
3. Scope is Limelight work only: Elliot, Ivy, the platform, Limelight customers and Limelight teammates. Drop work for other companies or clients, side projects and personal errands. A personal calendar can still set the hard stop, but do not list its events.

## 2. Read every source

Run independent reads at the same time. For each source, record whether you read it, could not reach it, or found nothing. A source you could not reach is "not checked", never "nothing to do".

1. **Calendars.** People often connect more than one calendar account. List the calendars you can reach and read today's events from all of them, not only the first one. Also read tomorrow and the next two working days for events that need preparation today.
2. **Meeting action items.** Read action items assigned to the person from meeting-notes tools. Read today's and yesterday's meetings in full. Pending lists keep items for weeks after they are done, so treat any item older than 7 days as "may be stale". Check a stale item against Linear or GitHub before you list it as open. If you cannot check it, put it under "May be stale" in the output.
3. **Tasks.** Read tasks due today or overdue. Keep only Limelight projects and labels. When a task description holds status notes, the latest note is the current status.
4. **Linear.** Read issues assigned to the person in started or unstarted states, issues with a due date on or before today, and unread notifications that ask for a reply or review.
5. **GitHub.** Read open pull requests the person wrote and pull requests that request their review. Keep only the `limelighthq` organization. With the gh CLI:

   ```bash
   gh search prs --author=@me --state=open --owner=limelighthq --json number,title,repository,updatedAt,url
   gh search prs --review-requested=@me --state=open --owner=limelighthq --json number,title,repository,updatedAt,url
   ```

   A pull request with no update in 14 days goes to "Optional cleanup", not the main plan.
6. **Notion (optional).** Read pages or comments that mention the person in the last 2 days and ask them for something.

## 3. Rank

Merge duplicates first. One piece of work often shows up as a meeting action item, a task and a Linear issue. List it once and link the best source.

Rank what remains in this order:

1. Work that unblocks someone else today, or that a meeting today or tomorrow depends on. Name the dependency, for example "the customer test on Tuesday at 11 AM needs this".
2. Fixed meetings. They anchor the time blocks.
3. Work due today or already late.
4. Reviews that other people are waiting on.
5. Short items that fit in the gaps.

Put everything else under "Next up" or "Optional cleanup". Do not pad the plan to fill the day.

## 4. Write the plan

Reply in chat, in this shape. Keep it under about 40 lines.

```markdown
**Today, <weekday> <YYYY-MM-DD>. It is <time>. Hard stop at <time>.**

1. **<start> to <end>: <work, in plain words>.** <One sentence: why now, and what it unblocks.> [source](url)
2. **<time>: <meeting name>.** <Prep in one sentence, if any.>
3. ...

**Next up:** <meetings or deadlines in the next two working days that need something from today's work>.

**May be stale:** <old action items you could not confirm as open, one line each>.

**Optional cleanup:** <stale PRs and other low-value items, one line>.

**Not checked:** <sources you could not reach>.
```

Rules for the plan:

- Use the person's local time with AM and PM.
- Give each item one link, to the page where the work happens.
- Say plainly when an item may already be done: "Circleback lists this as pending, but it may have shipped."
- Leave out any section that has nothing in it, except "Not checked".

## 5. Follow-ups

After the plan, offer at most one follow-up that you could do now, for example "Check which of the stale action items already shipped?" Do it only if the person says yes.

If the person narrows the scope ("ignore X"), rebuild the plan with that filter. Do not re-read the sources unless they ask.

## Stop conditions

- Stop and ask if you cannot tell which calendar or task project holds Limelight work, and guessing would leave out most of the day.
- Never write to any source. If the person asks you to complete a task, move a meeting or reply to someone, treat that as a new request after the plan is delivered.
