# 0005. Focus and context instead of family colours

- **Status:** Accepted
- **Date:** 2026-10-01

## Context

The obvious encoding was one colour per family. There are 8 families, and in a dot chart any star can sit next to any other, so all 28 colour pairs must be distinguishable, not just neighbours in a legend.

A candidate 8-hue palette for the dark background was run through a palette validator. It checks colour-vision-deficiency (CVD) separation and a normal-vision floor. The palette failed:

- **worst CVD pair:** ΔE 1.0 (deutan, violet vs blue);
- **worst normal-vision pair:** ΔE 10.2, below the 15 floor;
- **lightness band and chroma floor:** both failed.

The data-visualization rules followed here cap categorical hues at three for all-pairs chart forms such as scatter and dot charts. Past that, the rule is to fold or facet.

## Decision

- **No hue encodes a category.**
	- Every living star is the same starlight ink.
	- Historical stars are hollow.
	- Uncounted ones are dashed.
- **Families are shown by focus and context.**
	- A family chip keeps its members at full opacity and dims every other star to 18%.
	- Lineage lines inside the family brighten.
- **Selection uses gold, a halo ring and a bolder label** together, so it never depends on hue alone. Parents and children of the selection get a gold halo and label.
- **Family is always shown in text** too: in the tooltip, the detail panel and the list view.

## Consequences

- The design is accessible to colour-blind viewers by construction, and calmer to look at.
- You can't see every family's cluster at once; you see one family at a time. The list view, which can be filtered by family, covers the overview.

## Alternatives considered

- **8 colours plus direct labels.** The validator's normal-vision floor is a hard failure that labelling doesn't excuse.
- **Fold to 3 colour groups plus "other".** That grouping would be arbitrary (which three?) and misleading.
- **Small multiples per family.** That loses the single shared timeline the brief asked for.
