# LogoStrip

The customer-proof band under the hero: a small label ("Join hundreds of top brands who trust Limelight") over a slow scrolling row of customer logos.

- The consumer provides `logos` ({src, alt}) and optional `label`. Set `moving={false}` for a static row. The marquee stops when the user prefers reduced motion.
- Customer logos are not part of this system: use each customer's approved logo file, in its own monochrome grey version, at a max height of 39px.
- Label: 14px `text-500`. Padding: 80px top and 40px bottom. The row fades out at both edges.
