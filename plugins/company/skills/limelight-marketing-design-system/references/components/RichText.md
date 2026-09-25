# RichText

The long-form body of blog posts and podcast show notes. It styles plain CMS HTML: h2, h3, p, ul/ol, a, img and blockquote.

- The consumer provides the CMS HTML as `html`, or JSX children. The column is 48rem wide at most.
- h2: Host Grotesk 36px (`heading-l`, -0.02em), 24px above and 16px below. h3: `heading-s`. Paragraphs: Geist 16/24 in `text-400`. List items: `text-600` with a 24px indent. Links: `text-600` with a `surface-500` underline.
- FLAG: the site sets paragraphs in `text-400` on the `surface-150` page, which is 4.38:1 (just below AA). The site's pair is kept. Put the article on `surface-100`, or set `.ll-rich p` to `text-500`, if you need a strict AA pass.
- Pair it with `TableOfContents` in a right-hand column.
