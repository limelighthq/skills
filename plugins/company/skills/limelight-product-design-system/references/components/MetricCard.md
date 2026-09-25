# MetricCard

MetricCard shows one number with its context: a wallet figure with an action, a stat with its delta and trend line, or a titled chart card.

## Consumer provides

- `variant`:
  - `wallet` (Payments › Transactions, "Your Wallet"): `label`, `value`, `unit` ("USD"), and either `action` (Button "Add funds") or `note` ("Lifetime deposits to your wallet").
  - `stat` (default, Analytics and the campaign Performance tab): `label`, `value`, `delta`, `deltaTone` (`up` or `down`), `spark` (`{values}`). `size="lg"` is the Performance tab.
  - `chart` (Analytics charts): `title` in D's caps ("ENGAGEMENT OVER TIME"), `aside` ("vs 3.8 usual") or `legend`, optional `headline` with `headlineTone`, `value` (the big number), `caption`, then `spark` or `children` (a Gauge), then `note`.
- Place cards in a grid: wallet 3-up with a 16px gap, stats 4-up with a 14px gap, charts 2-up with a 20px gap.

## Anatomy

All cards: white ground, 1px `line-card`, radius 12 (`radius-xl`), `shadow-sm`, 24px padding, `ink-strong` figures.
- Wallet: label 14px/21px `muted`. Value 26px/39px weight 400, -0.6px, with 15px above and below. Unit 10px `muted-overlay`, 8px after the value. Note 14px/22.4px `muted`.
- Stat: a 12px-gap column. Label as above. Value 27px/40.5px weight 550, -0.7px (`lg`: 30px/45px weight 500). Delta 11.2px/16.8px in `metric-up` or `metric-down`. Sparkline 36px tall (`lg`: 38px).
- Chart: title 13px/19.5px weight 500 with the aside (11.2px `muted`) or legend (10x3 swatches, 11.2px `muted-overlay`) at the right. Headline 14px/22.4px in `metric-up` or `metric-alert`. Big number 36px/54px, -1px, 20px above and below. Caption 14px/22.4px. Chart 100px tall.
- Trend chart: D's 320x88 viewBox stretched to the box. Series 1 line 1.6px in `chart-1` with a 2.2px end dot and a 12% `chart-area` fill. `previous` draws a `chart-previous` line. `bars` draws `chart-bar` bars under a `chart-2` line.

## States

- Delta up or down, headline on pace or below pace. Cards are not interactive. Actions inside them (Add funds) are Buttons.

## Keyboard and accessibility

- Each trend chart is an image with a name ("Posts trend", "Current and previous engagement"), as in D.
- Chart cards are sections. The title is an h3. Put the numbers the chart shows in the value, caption or a table (D's "Top performing posts").

## D exceptions

- Up delta: D `#298662` (4.49:1) → `metric-up` `#298561` (4.54:1). Rule: text 4.5:1.
- Previous line and swatch: D `#9B9B9B` (2.78:1) → `chart-previous` `#949494` (3.03:1). Rule: marks that carry data 3:1.
- Posts bars: D draws the accent at 50% opacity (`#C4C3DE`, 1.72:1) → solid `chart-bar` `#9290C2` (3.0:1). No value is printed for them, so the bars carry data. Rule: 3:1.
- The area fill (12%) stays decorative. The line carries the data.
- Sparklines draw at full opacity, as live D draws them.

## Do / Don't

- Do write the delta the way D does ("+12% vs last month", "−0.2pt vs. April") and pick the tone from the direction that is good for the user.
- Do keep the wallet unit small and after the value.
- Don't put more than one number in a stat card. Use a chart card for comparisons.
