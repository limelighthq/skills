# DropdownMenu

A menu that opens from a trigger button and lists actions: D's "Build with Ivy" and "Build with Elliot" menus and the rail's workspace account menu.

## Consumer provides

- `trigger`: a render function. It receives `{ref, id, "aria-haspopup", "aria-expanded", "aria-controls", onClick, onKeyDown}`. Spread all of them on the trigger, `ref` included. A DOM button and the DS `Button` both accept the ref.
- `items`: an array of entries.
  - An item: `{id, label, description?, meta?, icon?, tone?, selected?, danger?, disabled?, onSelect?}`.
  - A rule: `{separator: true}`.
  - A section label: `{section: "Quick actions"}`. The label renders in capitals.
- `side`, `align` and `offset` (px gap between trigger and menu, default 8). D's values: Build menus `side="top" align="end"` with the default 8. The rail account menu `side="right" align="end" offset={10}`. The kebab menu sits 6px below its trigger (`offset={6}`). The menu flips when it does not fit.
- `tone`: `"ivy"` or `"elliot"` for the Build menus. Omit it for neutral menus.
- Optional: `width`, `label`, `onSelect`, and `open` / `defaultOpen` / `onOpenChange`.

## Anatomy

- Surface: `surface`, 1px `line-menu`, `radius-card` (10px), `shadow-menu`, 6px padding, `z-menu` (100). Width follows the content between 270px and 340px. The Build with Ivy menu measures 302px. The Build with Elliot menu reaches 340px.
- Item: `radius-md` (6px), padding 12px 14px, gap 12px.
  - Two-line item: a 16px glyph, then the title (13px/19.5px, weight 600, `menu-ink`) over the description (12px/18px, `menu-desc`), 3px apart.
  - Single-line item: the label at 13px/19.5px, weight 400 ("Account", "Team settings").
  - `meta` sits beside the title on the same line ("Limelight" and "Owner").
- Icon colour: `menu-icon-ivy` (#397965) by default and in the Ivy menu. `menu-icon-elliot` (#4674B6) in the Elliot menu.
- Section label: 10px/15px capitals, `menu-label`, padding 8px 10px 2px ("QUICK ACTIONS", "YOUR TEAMS").
- Rule: 1px `menu-rule`, 5px margin.
- Text uses `letter-spacing: normal`. D portals the menu outside its brand scope, so the app's -0.012em does not apply.
- D's Build menu icons: Create campaign brief `pencil`, Run a new creator discovery `target`, Monitor negotiations `message-circle`, Draft content `notebook-pen`, Browse content inspiration `lightbulb`. Quick actions: Draft a new post `pencil`, Create an educational post `sparkles`, Turn a customer win into a post `heart`, Brainstorm angles first `sparkles`.

## States

- Highlighted (hover or arrow keys): `menu-hover-ivy` (#EDF7F2) in the Ivy menu, `menu-hover-elliot` (#EFF5FC) in the Elliot menu, `menu-hover` (#F0F4F9) in neutral menus.
- Focus: the item under keyboard focus also shows the house focus ring.
- Selected: `selected: true` adds a check after the title and announces "(current)".
- Danger: the title and icon use `danger-ink`.
- Disabled: D has no disabled menu items. When you need one, the title and icon dim to `opacity-disabled`. The description stays opaque and is tied to the item with `aria-describedby`. Put the reason there. The preview uses D's own sentence for the unconnected action: "Create a team is not connected in the C3 preview."

## Keyboard and accessibility

- The trigger carries `aria-haspopup="menu"` and `aria-expanded`. The surface is `role="menu"`, named by the trigger unless you pass `label`.
- Enter, Space or ArrowDown on the trigger opens the menu on the first item. A click opens it with focus on the menu surface (Radix).
- ArrowUp and ArrowDown move without wrapping (D's Radix default). Home and End jump to the ends. Typing a letter jumps to the next matching label.
- Enter or Space chooses the item. The menu closes and focus returns to the trigger.
- Escape closes the menu and returns focus to the trigger. Inside a dialog, Escape closes only the menu.
- Tab does nothing while the menu is open (Radix).
- The menu is modal, as in D: a press outside only closes it. The click does not reach the page.
- Items after a section label sit in a `role="group"` named by that label.
- The menu renders in place with `position: fixed`. It escapes scroll clipping and stays inside its opener's DOM, so a dialog around it still treats it as inside.

## D exceptions

| D value | DS value | Rule | Why |
|---|---|---|---|
| Description #767681 | `menu-desc` #6E6E78 | Text 4.5:1 | D is 4.49:1 on white and 4.06:1 on a highlighted item. |
| Section label #8A8A94 | `menu-label` #757580 | Text 4.5:1 | D is 3.42:1 on white. |
| Item focus `outline: 0` | Core focus ring | Visible focus | D shows focus only through the highlighted ground (about 1.07:1). |

Non-visual fixes (listed in exceptions.json as Accessibility): items after a section label sit in a named `role="group"` (WCAG 1.3.1). A two-line item is named by its title and described by its second line (1.3.1, 4.1.2). The current team's ✓ becomes the lucide `check` plus hidden text "(current)" (1.1.1).

## Do / Don't

- Do keep D's copy and case: "Create campaign brief", "Draft with Ivy, review in the campaign panel".
- Do give every icon item a description when the menu mixes icons and text, as D does.
- Don't restyle the surface per use. Pass `tone` for the agent accent.
- Don't put a disabled item's reason only in its dimmed title.
