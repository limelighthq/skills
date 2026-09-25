# LeadForm

The gated-download form on resource pages (first name, last name, email, company, website, "Where did you hear about us?"), styled in the brand.

- The consumer provides `fields`. Each field has a `name` and a `label`, and optionally `type`, `required`, `half` (two per row), `placeholder`, `autoComplete` and `options` (which make it a select). The consumer also provides `cta` and `onSubmit(data)`.
- Fields: 14px/500 `text-600` labels. Inputs are 38px tall, `border-hairline`, 6px radius, 4/16 padding, 14px text, placeholders in `text-400`. Required fields get the native `required` attribute plus a `text-500` asterisk. The submit is a primary `Button`.
- Layout: a two-column grid with 16px gaps. Half fields stack on phones. Put it to the right of an `ArticleHeader` + `CheckList` + cover image.
- NOTE: the live site renders this form as a HubSpot embed in HubSpot's default theme (Helvetica, 15px radius, `#f5f8fa` fields, a pure red asterisk). That does not match the brand. Restyle the HubSpot form to these values, or post to HubSpot from this component.
