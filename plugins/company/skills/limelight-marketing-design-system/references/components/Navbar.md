# Navbar

The floating, frosted nav bar at the top of every site page, with its dropdowns and its mobile menu.

- The consumer provides:
  - `logo` (the `limelight-logo-black` asset).
  - `links`: each link has a label and an href. A link with `items` becomes a dropdown (Agents, Resources). Each item has a label, a `description` (e.g. the job title) and an `icon` (the agent's mark).
  - The desktop actions as children: a `tertiary` "Sign in" and a `primary` "Get started" Button.
  - `mobileActions`: full-width buttons for the phone menu (a `secondary` "Sign up" and a primary "Book a demo").
- Bar: 40% white with a 20px backdrop blur, `border-glass`, `radius-md`, 12/20 padding, max width `width-nav`. Put it 24px below the top of the page, over the hero.
- Links: Geist 14/24 in `text-600`, 4/8 padding, `radius-xs`. On hover they get a `surface-150` background.
- Dropdown: a 1px ring in the Ivy radial gradient around a white list (7px radius, 4px padding). Items are 24px icon + title (14px `text-600`) + description (12px `text-500`). On hover an item gets a `surface-300` background. The dropdown opens on hover or click and closes on Esc.
- At 991px and less, the links and actions change to a menu button (two 16px lines in `text-500`; it becomes an X when open). The button opens a white sheet: 18px links with `surface-300` rules, with the full-width buttons at the bottom.
