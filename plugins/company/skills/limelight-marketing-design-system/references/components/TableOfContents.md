# TableOfContents

The sticky "{ INDEX }" list beside a long article. It links to the article's headings.

- The consumer provides `items` ({label, href, level 2 or 3, current}). Build them from the article's h2/h3 ids, and set `current` on the heading in view.
- Style: a `SectionTag` title, then links in Geist 16px `#6b6a6a` (Figma Text/Light/02, 5.2:1) with a `surface-400` rule under each and 12px vertical padding. The current link and hovered links turn `text-600`. Level-3 links are indented and set at 14px.
- It sticks 7rem from the top, in a 24px-padded right column. Hide it on phones.
