# 0014. Key moments, eras and sources for every religion

- **Status:** Accepted
- **Date:** 2026-10-01

## Context

Version 1.0 told *when* and *how* each religion came out. Readers wanted more history and visible sources. Long-form research histories already existed for all 44 religions, written to a shared template: an at-a-glance box, a timeline split into eras, and further reading.

## Decision

- **New fields, extracted from the histories:**

	| Field | Shown as |
	|---|---|
	| `origin` | "Where it began" |
	| `founders` | "Founder and key figures" |
	| `branches` | "Main branches" |
	| `eras` | "Its history in N eras" |
	| `sources` | "Sources and further reading" |

- **Key moments (`milestones`):**
	- 3–5 dated events per religion, chosen from what each history states, with no new facts;
	- each one is `[year, label, approximate?]`;
	- labels are neutral and attribute faith claims;
	- they are drawn as gold diamonds on the time band for the selected religion, with tooltips;
	- they are listed in the card, and hovering a list item highlights its diamond.
- **Follower sources (`followersSource`):** where a count has a specific source (Pew, a census, an official report), it is named under the figure.
- **Two new panels:**
	- **The world today**: Pew's 2020 shares as single-hue bars, which select the matching religion;
	- **Sources and method**: how placement works, plus the follower sources grouped by source.

## Consequences

- The page is about twice the size (about 138 KB), all text.
- The validator checks the new fields, and `npm run links` covers every source link.
- Milestones before 3600 BCE are left out (the axis starts there).

## Alternatives considered

- **Draw every religion's key moments at rest.** More than 200 diamonds would bury the chart.
- **Show eras as segments of the gold band.** Era date ranges are written for people ("c. 600–1500", "Renaissance – today"), and turning them into numbers would invent precision.
