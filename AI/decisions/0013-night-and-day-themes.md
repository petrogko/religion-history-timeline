# 0013. Night and Day themes

- **Status:** Accepted (supersedes [0006](0006-single-dark-star-chart-theme.md))
- **Date:** 2026-10-01

## Context

Version 1.0 was dark only. Readers asked for a day theme, and readers on light systems got a dark page.

## Decision

- **One token set, two value sets.** The page is dark-first.
	- Night values sit on the bare `:root`, with `color-scheme: dark`.
	- Day values redefine the same tokens in two identical blocks: `@media (prefers-color-scheme: light) :root:not([data-theme="dark"])`, and `:root[data-theme="light"]`.
	- A test asserts that every `var(--x)` is defined on `:root`, and that both Day blocks match.
- **Choosing a theme.** With no choice made, the page follows the system setting (or the host's `data-theme`). The Night/Day buttons set `data-theme` on the root and remember it in `localStorage["rtt-theme"]`.
- **Night** keeps the star-atlas look:
	- a faint seeded starfield (`--starfield` opacity);
	- a soft glow on the largest stars and on the selection (`--glow: url(#rtt-glow)`).
- **Day** is an engraved, paper-white atlas:
	- navy ink, with an amber accent `#9a5d00`;
	- `--starfield: 0` and `--glow: none`.
- **Contrast in Day:**
	- muted text `#5f6680` is about 5.5:1 on the panel;
	- the amber is about 5.2:1 on the panel and 4.4:1 on the time band.
- **The accent has one job in both themes:** selection and "Today". No colour encodes a category ([0005](0005-focus-and-context-instead-of-family-colours.md)).

## Consequences

- Both themes must be checked visually for any change.
- New colours must be added as tokens to all three blocks.

## Alternatives considered

- **Invert Night automatically.** Inverted palettes lose contrast and character, so Day is designed as its own set.
- **Three buttons (Auto, Night, Day).** More controls for little gain. Clearing site data returns to Auto.
