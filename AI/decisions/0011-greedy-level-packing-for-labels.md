# 0011. Greedy level packing for labels, with text halos

- **Status:** Accepted
- **Date:** 2026-10-01

## Context

- Twelve religions on the "grew" side start between 1500 and 200 BCE, a stretch of about 170 px at desktop width, and each needs a readable two-line label.
- Labels have to stay next to their stars, and stems have to reach the band.

## Decision

- **Measure each label** (`label` over `ds`) with a canvas, using the real fonts once `document.fonts.ready` resolves.
- **Place labels to the right of their stars**, and flip a label to the left only when it would overflow the right edge.
- **Pack each side separately, in time order.** Each record takes the **lowest level** whose existing label boxes it doesn't overlap. Levels are `STEP` = 33 px apart.
- **Let stems pass behind labels.** A stem may cross a label on a lower level. Labels carry a 5 px halo in the background colour (`paint-order: stroke`), so the stem appears to pass behind the text.
- **Size the chart to the data.** Its height follows from the deepest level used on each side.
- **Set a minimum chart width of 1,060 px.** Narrower screens scroll the chart sideways inside its own container.

## Consequences

- The layout is simple and deterministic, recomputes in well under a millisecond, and re-packs cleanly for the true-to-time scale.
- It isn't globally optimal: an early long label can push later ones up a level. Short `label` values matter, so keep them under about 22 characters.

## Alternatives considered

- **A force-directed label layout.** Non-deterministic, and labels jitter during the scale animation.
- **Labels only on hover.** The page would no longer be readable at rest, and wouldn't work for touch or screenshots.
