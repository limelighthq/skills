# Example entry

A complete posted entry, reproduced as it appears in the `Design updates` database. Read it for
the level of detail expected, then write yours to the same standard.

Note what it does: every item names a file and an identifier, caveats are fenced off from
behaviour, and a ship step that could not run is recorded rather than skipped.

## Contents

- [Properties](#properties)
- [Body](#body)
- [What to copy from it](#what-to-copy-from-it)

## Properties

| Property | Value |
| --- | --- |
| Update | `2026-09-15 Ivy + Shared shell: quick-start cards for Ivy, and the Campaigns top section` |
| Date | 2026-09-15 |
| Agents | Ivy, Shared shell |
| Kinds | Behavioural, Cosmetic, Caveat, Process note |
| Items | 6 |
| Mock revision | `4a3179b` |
| Mock files | `_shared/chat-flows.js (CARD_SETS, cardsFor, fill, BUILT, start), _shared/v2-shell.js (flowCtx, flowCards, heroFlowHtml, startFlow, campaignCard, campaignsBody, newCampaignBtn, miniStat), _shared/v2-shell.css (.v2-chead, .v2-crow, .v2-ccard, .v2-cnew, .v2-ms-v, .v2-tabs-u)` |
| Upstream PR | `https://github.com/limelighthq/ux-flow-v1/pull/91` |
| Mirror PR | `https://github.com/limelighthq/agent-platform/pull/3436` |
| Live mock | `https://staging.agents.limelighthq.com/ux-flow-v1/v2-nav-workspace.html?agent=ivy&dest=campaigns&sub=all` |
| Source | Slack permalink of the brief DM |
| Supersedes | *(empty)* |
| Decision needed | Unticked |
| Open questions | *(empty)* |
| Posted by | Agus's Claude |
| Status | New |
| Linear, Notes | *(empty — engineering owns these)* |

`Items` is 6 because the behaviour section has six numbered items.

**One inconsistency to be aware of.** This entry has a filled Vocabulary section but does not tick
`Vocabulary` in `Kinds`. Follow the rule in SKILL.md, not this row: tick a kind for every section
you fill. Raise it with Grant if you think the rule should be looser.

## Body

### Changes that affect product behaviour

1. **Ivy gets seven context-aware quick-start card sets.** `CARD_SETS` in `_shared/chat-flows.js`. All campaigns; the Creators, Calendar and Performance tabs inside a campaign; Inbox; Inbox › Sequences; Payments; Analytics. Each is four cards with a label, a one-line description and a `suggested` flag on the first. Before this she fell back to the generic four on every surface, which on Payments or Inbox meant four cards about writing posts.
2. **Card-set keys are agent-scoped.** They keyed on destination alone, and **both agents have an Analytics destination**, so an unscoped `analytics` key handed Ivy Elliot's posting cards. Keys now read `<agent>:<dest>[:<sub|@camp>[:<tab>]]`, for example `ivy:campaigns:@camp:discovery`. `cardsFor()` builds the candidate keys most-specific-first. Elliot's existing six sets were renamed with an `elliot:` prefix in the same pass.
3. **The campaign tab decides the card set, not the campaign.** Ivy's campaign is `state.sub` and the tab inside it is `state.tab`, so `flowCtx()` in `_shared/v2-shell.js` now carries `tab`, `campaign` and `campaignName`. A campaign id normalises to the literal `@camp` in the key, so one set serves all three campaigns rather than needing one set per campaign. `fill()` swaps `{camp}` into labels and sends.
4. **`flowCards()` no longer excludes Ivy.** It was gated on `state.agent !== 'elliot'`. That single line is why Ivy had no cards at all.
5. **Flow bubbles speak as the agent whose surface they are on.** `pushAgent('elliot', …)` was hardcoded in the flow paths, as was `AGENTS.elliot` in `heroFlowHtml()` and the literal string "Elliot" in the hero subtitle and card byline. They read the current agent now.
6. **The Campaigns top section.** `campaignsBody()` and `campaignCard()` in `_shared/v2-shell.js`. New campaign left the card row and became `newCampaignBtn()`, a quiet text button below it: as a fourth dashed tile it competed with three real campaigns and took a quarter of the width, so the cards went from about 300px to 406px each. A `.v2-chead` label with a rule names the section. `.v2-crow` is three columns (auto-fit min 212 → 256px) rather than sized for four. The selected card had an accent border, an accent fill **and** a 3px ring next to two plain cards; it is now a tint and one soft border, with a hover border so the row reads as selectable. The tabs use `.v2-tabs-u`, underlining rather than sitting in a segmented pill, with the active underline on the section rule rather than floating above it. Card stats got `.v2-ms-v` / `.v2-ms-l` instead of inline font sizes.

### Vocabulary

- **`@camp`** — the literal key segment standing in for any campaign id, so one card set serves every campaign.
- Card-set key shape: `<agent>:<dest>[:<sub|@camp>[:<tab>]]`.

### Caveats (do not build on these)

- **Only Elliot has real scripted flows.** Draft, Interview and Source are built; every Ivy card routes to the existing keyword answer engine instead, so you get a sentence back rather than a guided flow with an artifact at the end. The cards are right; what sits behind most of them is thin.
- `brief`, `brief-open` and `outreach` appear as `flow:` values on Ivy's cards but **are not built**. `BUILT` in `chat-flows.js` lists what exists; `start()` returns null for anything else and `startFlow()` routes it to the answer engine.
- Card counts, descriptions and the campaign mini-stats (Contacted / Replied / Signed are derived as fixed fractions of `c.count`) are sample values, not data.

### Not agent-specific

- The Campaigns restyle is on the shared surface. Elliot reaches it in variants A and B, where his copy reads "advocates enrolled" rather than "creators in pipeline". Verified it still does. He has no Campaigns destination in C or D, so `?agent=elliot&dest=campaigns` redirects to Content there.

### Process notes

- **A named-but-unbuilt flow key used to open the wrong script.** `start()` fell through to `draftReply()` for any unknown key, so Ivy's "Start a new campaign" opened Elliot's *who will this post be for?* author picker. Guard added. The second half matters too: returning null alone left the card posting the user's line and going silent, so `startFlow()` routes unbuilt keys to `askTeam()`.
- **Inbox and Payments hide the chat on arrival** (`CHAT_HIDDEN_DESTS`), so those two card sets only render once the chat is opened. Existing intended behaviour, from the ask about not mixing agent talk with creator messages — not a regression, but it makes those two sets look missing on a fresh load.
- The flow map step of the ship process could not run: `flow-map/` is not on `main`. It lives on the unmerged branch `claude/vigorous-poincare-4188bd`.

### Open questions

- None. A real Ivy flow is the obvious next piece, most likely **Start a new campaign → brief**, which would need `briefBody()` to stop returning a hardcoded paragraph and read from the campaign instead.

### Triage (engineering)

*(left empty)*

## What to copy from it

- **Item 4 is one sentence.** Length follows the change, not a quota. A one-line gate removal gets
  a line; a restyle touching six selectors gets a paragraph.
- **Item 2 explains why the old shape broke.** "Both agents have an Analytics destination" is the
  reason the key had to change. An implementer who knows the reason will not reintroduce it.
- **The caveats name what is fake.** Mini-stats derived from fixed fractions, three `flow:` values
  that point at nothing. Without this section an engineer builds against sample data.
- **The last process note records a step that did not run**, and says where the missing directory
  lives. Do this rather than dropping the step silently.
