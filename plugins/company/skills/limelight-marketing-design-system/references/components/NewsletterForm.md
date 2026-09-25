# NewsletterForm

The email sign-up block in the footer card: a `heading-s` title and an email field with a primary "Subscribe" button.

- The consumer provides `onSubmit(email)` and can override `title`, `placeholder` and `cta`. The field has a hidden "Email" label and native email validation.
- Field: Geist 14px, `border-hairline`, 6px radius, 4/16 padding, placeholder in `text-400`, all on `surface-100`.
- Put it at the bottom of the footer card (the card has 120px of empty space above it).
