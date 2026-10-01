# 0002. Vanilla JavaScript and hand-built SVG

- **Status:** Accepted
- **Date:** 2026-10-01

## Context

- The chart has about 44 stars, 39 lines and a few dozen axis elements.
- The layout is unusual: stems going both ways, label packing, a blended scale and an undated block. A charting library would fight that more than it helps.
- External scripts would also have to come from an allowlisted CDN.

## Decision

- **The code:** one IIFE in plain ES5-style JavaScript (`var`, no modules), with SVG elements created through a tiny `el()` helper.
- **Updates:**
	- elements that persist (stars, stems, labels, lines) are created once and their attributes updated;
	- elements that depend on scale (eras, axis, ticks) are rebuilt as SVG strings each frame.
- **Dependencies:** none at runtime, and none in `package.json`.

## Consequences

- No supply-chain surface, nothing to upgrade, and the file works in any modern browser.
- The layout, the tween, the tooltip and the keyboard handling are all our own code, so they must be documented ([ARCHITECTURE.md](../ARCHITECTURE.md)) and kept small.

## Alternatives considered

- **d3.** Its scales and transitions are convenient, but 90 KB is overkill for one blended scale and one tween.
- **Canvas rendering.** It's harder to make accessible (focusable stars, `aria-label`s, real text), and text measurement is needed either way.
