# 0004. A stretched time scale, an undated block, and a true-to-time toggle

- **Status:** Accepted
- **Date:** 2026-10-01

## Context

- **The span is extreme.** Origins run from "50,000+ years ago" to 1992. Eleven religions appear after 1800, and five have no datable start at all.
- **A linear axis** crushes the last two centuries into a few pixels.
- **A log axis of years-before-present** over-expands the most recent decades, and still hands the deep past a large share of the width.

## Decision

- **The undated block.** Traditions with no datable start sit in a separate block at the left, labelled "Undated" and separated by an axis-break mark. Inside it, position means order only.
- **The dated axis** runs from 3600 BCE to 2030 CE. The default "Recent stretched" scale maps a year to `1 − √(2030 − year) / √5630`, which gives about 40% of the dated width to 3600 BCE – 1 CE, 30% to 1 CE – 1500, and 30% to 1500 – now (against 64%, 27% and 9% on a linear axis).
- **A "True to time" toggle** switches to a linear scale with a 650 ms animated transition. The choice persists per viewer.
- **Ticks show real years**, and the caption under the chart says which scale is active and what it does to durations.

## Consequences

- Recent movements get room for their labels, and the deep past still reads as long.
- In the default view, durations are not proportional. The caption and the toggle make that explicit rather than hidden.
- The undated block avoids inventing dates for prehistoric traditions ([ADR 0009](0009-placement-rules-for-undated-and-debated-origins.md)).

## Alternatives considered

- **A broken axis with several linear segments.** Discontinuous slopes are harder to read than one smooth curve.
- **A log scale.** Too much width goes to the last 50 years.
