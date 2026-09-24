# Funnel

Funnel is the Analytics "CONVERSION FUNNEL" card: four stages from impressions to booked demos, each with its value, its rate of the previous stage and a bar that shrinks stage by stage.

## Consumer provides

- `stages`: `{value, label, ofPrevious}`. D's month: 232K Impressions, 11.1K Engagements (4.8%), 1.9K Link clicks (17%), 14 Demos booked (0.7%).
- `title` (default "CONVERSION FUNNEL"), `subtitle` (default "posts → pipeline, via your UTMs"), and `note` ("Attribution comes from Limelight link tracking, no network member data involved.").

## Anatomy

- Card: same frame as MetricCard (radius 12, `line-card`, `shadow-sm`, 24px padding).
- Title 13px/19.5px weight 500, subtitle 14px/22.4px `muted`.
- Stages: 4 equal columns, 12px gap. Value 23px/34.5px weight 700. Label 12px/19.2px. Rate "4.8% of previous" 11.2px `funnel-meta` in a 21px line (it may wrap to two lines).
- Bar: 20px below, full column width, height 48px × (1 − 0.26 × stage), never below 12%. Fill `chart-funnel`.
- Note 14px/22.4px `muted`.

## States

- None. The card is static.

## Keyboard and accessibility

- Stages are an ordered list, so the order reads as a funnel. Every stage prints its value, so the bars are decorative and hidden from assistive tech.

## D exceptions

- Rate line: D `#8A8B8E` (3.41:1) → `funnel-meta` `#757679` (4.54:1). Rule: text 4.5:1.

## Do / Don't

- Do keep four stages. The bar heights follow D's fixed step, not the values.
- Don't read the bars as a scale. The printed values and rates are the data.
