# ContentCard

A linked card in the blog and podcast grids: the image, then the date and a `Chip` (category or duration), then the title.

- The consumer provides `href`, `image` (+ `imageAlt`), `date`, `tag` and `title`. Set `ratio` for the image: blog covers are 16/9 (the default), and podcast covers are close to 1/1.
- Image: a 1px 5%-black border and `radius-md`. On hover it zooms slightly (2%). Meta: 14px `text-400`, 12px gap. Title: Geist 18px (not Host Grotesk) in `text-600`, 16px below the meta.
- Grid: 3 columns with 16px column gaps and 40px row gaps (wrap the cards in `.ll-content-grid`), on a white panel. There is one column on phones. After the grid, put a centered secondary "Load more" Button.
- Blog cover art comes from the content team. Keep it in the brand's pastel gradients.
