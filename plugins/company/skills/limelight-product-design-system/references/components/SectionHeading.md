# SectionHeading

The title block of a view: the campaign detail heading with its action and tabs row, or a page title with an optional eyebrow, a subtitle and actions.

## Consumer provides

- `title`.
- `variant`:
  - `detail`: the campaign detail heading ("Q2 SaaS Growth"). Pass one `action` ("Internal targeting") and the `Tabs` as children.
  - `page`: a page title. It is the default when `eyebrow` or `description` is set.
- `eyebrow`: D's data case. CSS makes it uppercase. "Ivy / Inbox" reads "IVY / INBOX".
- `eyebrowTone`: `agent` (Inbox) or `team` ("LIMELIGHT / YOUR TEAM" on Approvals and Activity).
- `description`: the muted subtitle ("Conversations, reply approvals, and the sequences behind them.").
- `actions`: controls on the right ("+ Create" on Elliot Content, the "6 need your decision" count on Approvals).
- `as`: heading level. Default h1.

## Anatomy

- Detail:
  - Wraps, 14px gap, 18px margin below.
  - Title `detail-title` (22px/27.5, 500, -0.045em) in `ink`.
  - The action sits at the right. The children row takes the full width under them.
- Page:
  - Title `page-title` (26px/32.5, 500, -0.045em). It is 30px above 1500px (D).
  - Eyebrow: a 21px line, `eyebrow-page` (10px, 0.15em, uppercase, `ink`) or `eyebrow-team` (10px, 500, 0.1em, `heading-kicker`).
  - The title sits 8px below the eyebrow.
  - Subtitle: 14px/22.4 `muted`, 8px below the title after an eyebrow, flush without one. The team tone uses a 6px gap and a 21px line (D).
  - Actions are centred against the text block, 20px from it.

## States

- Static. It has no interactive states of its own.

## Keyboard and accessibility

- One h1 per view. The page header's h3 is only the crumb.
- The eyebrow is plain text before the h1, so it reads first.

## D exceptions

| D | DS | Rule | Why |
|---|---|---|---|
| Team eyebrow #727782 (4.49:1) | `heading-kicker` #707580 (4.62:1) | Text 4.5:1 | Same hue, darker until it passes. |

## Do / Don't

- Do use `detail` only for the campaign detail under the card grid.
- Do write titles in D's case: "Your Wallet", "Content calendar".
- Don't stack two page headings in one view.
