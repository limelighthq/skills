# SettingsSection

SettingsSection is one block of the Team settings page: an UPPERCASE heading, an optional line of help, and a white card that holds the rows.

## Consumer provides

- `title` ("Organization details", "Organization members", "Join requests", "Agents", "Integrations", "Billing", "API keys", "Danger zone").
- `meta` ("1 member") or `actions` (Button "Create API key") beside the heading.
- `description` between the heading and the card ("Keys for programmatic access. Example keys do not grant access to the live app.").
- `children`: `ListRow`s, fields, or a muted empty line ("No pending join requests.").
- `footer`: a Button after the card ("Invite teammate") or a string note ("Your team has complimentary access to Ivy. No payment method is on file and you will not be invoiced.").
- `card={false}` for content that brings its own cards (the Agents grid).

## Anatomy

- Page: `settings-ground` (#FAF9F7) main column, 720px content column (`settings-column`) with 20px side padding.
- Sections stack with 36px between them.
- Heading: 12px / 18px, weight 400, 0.07em tracking, UPPERCASE, `settings-heading`, 12px below. With meta or actions the heading row is flex, space-between, centered.
- Meta: 11px `settings-meta`.
- Description and footer note: 14px / 21px `muted`, no margins.
- Card: `surface`, 1px `line-card`, radius 12px (`radius-xl`), `shadow-sm`, padding 24px.

## States

- Empty: a muted line inside the card, as D does.
- Focus and disabled states belong to the rows and buttons inside.

## Keyboard and accessibility

- Each section is a landmark-free `section` labelled by its heading (`h2` by default, `headingLevel` to change it).

## D exceptions

| D | DS | Rule | Why |
|---|---|---|---|
| Heading #74747D | `settings-heading` #72727B | Text 4.5:1 | D is 4.40:1 on #FAF9F7. |
| Meta #777777 | `settings-meta` #737373 | Text 4.5:1 | D is 4.26:1 on #FAF9F7. |

## Do / Don't

- Do keep D's section order: Organization details, Organization members, Join requests, Agents, Integrations, Billing, API keys, Danger zone.
- Do use a secondary Button for "Leave organization", as D does.
- Don't put section headings inside the card.
