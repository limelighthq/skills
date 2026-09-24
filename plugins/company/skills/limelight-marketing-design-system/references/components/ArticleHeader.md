# ArticleHeader

The top of a blog post, a podcast episode or a resource page: a back link or eyebrow, then the date and a chip, then the title, then the actions.

- The consumer provides `title`, and optionally `backHref` (renders a `{ BACK }` SectionTag link) or `tag`, `date`, `chip` (e.g. "33 Min") and `actions`.
- Title: `heading-xl` (Host Grotesk 40/48, -3%). The resource pages set it at 48/53. Meta: 14px `text-400` with a `Chip`. Gaps: 16px.
- Podcast actions: a primary `Button` "Play" with a play icon and a secondary `Button` "View more", 12px apart.
