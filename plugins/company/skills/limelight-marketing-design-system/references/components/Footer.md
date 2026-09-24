# Footer

The site footer: link columns under `SectionTag` titles, a newsletter card on the right, and a large logo with uppercase legal links at the bottom.

- The consumer provides `columns` ({title, links}), `aside` (usually a `NewsletterForm`), `logo` (`limelight-logo-black`) and `legal` links.
- Links: Host Grotesk 20px in `text-400`, turning `text-600` on hover. FLAG: this is only 4.38:1 on `surface-150` (the site's own pair, kept exact). Set the footer on `surface-100`, or use `text-500`, if you need a strict AA pass. Legal: Geist 12px uppercase in `text-500`.
- Layout: a 12-column grid. Links take columns 1–6 and the card takes columns 9–12. There is 120px between the top block and the logo row.
- Put the "Deploy your first AI employee now." CTA block (centered `heading-xl` + primary Button) just above it.
