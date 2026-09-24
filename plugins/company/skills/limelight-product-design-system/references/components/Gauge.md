# Gauge

Gauge is the posting-cadence scale on Analytics: a low-to-high track with a tick for the usual pace, a dot for the current pace, and the people below and above pace.

## Consumer provides

- `current` and `usual` as positions from 0 to 100 (D's month: 40 and 62).
- `label`, the accessible name. D's: "Current cadence 3.0. vs 3.8 usual".
- Optional `groups`: `[{label: "BELOW PACE", items: ["Jessica 0.9", "Ryan 1.2"]}, {label: "KEEPING UP", items: ["Sarah 2.8", "David 2.1"]}]`.
- Put it in a MetricCard chart ("POSTING CADENCE"), after the caption "posts / week · team avg".

## Anatomy

- Track: 6px tall, radius 4, `gradient-cadence` (amber at the low end, neutral middle, mint at the high end), 24px above and 10px below.
- Usual tick: 2x16px `chart-usual`, 5px above the track.
- Current dot: 14px `chart-1` circle with a 3px white ring.
- Ends: "Low activity" and "High activity", 11.2px `muted`.
- Groups: 14px below, a wrapping row with an 8px gap. Group labels 11.2px `ink-strong`, people as neutral Badges.

## States

- None. The gauge is static.

## Keyboard and accessibility

- The track is one image with a full name that states both values. The groups are plain text.

## D exceptions

- Usual tick: D `#A1A1AA` (2.33:1 on the track) → `chart-usual` `#8C8C97` (3.03:1). Rule: marks that carry data 3:1.

## Do / Don't

- Do state the current and usual values in the accessible name.
- Don't add numbers along the track. D's scale is relative (Low activity to High activity).
