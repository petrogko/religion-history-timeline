# 0006. A single dark "star chart" theme

- **Status:** Superseded by [0013](0013-night-and-day-themes.md)
- **Date:** 2026-10-01

## Context

The subject (religions as points across deep time, linked by lineage) suggests a night-sky star atlas: stars on a dark field, with constellation-like lines. Supporting light and dark themes would mean designing and validating two palettes.

## Decision

- **One theme.** The page commits to one dark theme by design.
	- `color-scheme: dark` is set on `:root`.
	- Every colour is still a token there.
	- `body` sets an explicit background, so the page looks the same on any host.
- **The palette:**
	- starlight ink `#ece7da` on a deep navy;
	- one gold accent `#f2c46d` for selection and "Today";
	- muted text `#858ba6`, about 5.7:1 contrast on the background, for axis text.
- **The type:**
	- Cormorant Garamond italic for the title (an engraved, antique tone);
	- IBM Plex Sans for the body;
	- Plex Sans Condensed for chart labels;
	- Plex Mono for dates.

## Consequences

- A distinctive, coherent look, with one palette to keep legible.
- Viewers who prefer light mode still see a dark page. A light variant is in the [backlog](../BACKLOG.md).

## Alternatives considered

- **Light and dark themes.** That doubles the palette work, and a light "parchment" look drifts toward a generic style.
