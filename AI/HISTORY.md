# Project history

## 2026-10-01: version 1.1.0

The request: richer visuals, more information, sources, and a day theme.

- **Extraction.** Origin, founders, branches, eras and further-reading links were taken mechanically from the long-form research histories, the same ones the 1.0 texts came from.
- **Key moments.** Four research agents picked 3–5 dated events per religion, using only events those histories state. 217 moments were then reviewed by hand. Six labels were reworded so faith claims are attributed (for example, "Date Joseph Smith later gave for his First Vision"). A contested death toll was dropped from the 2025 Suwayda entry.
- **Follower sources.** 18 were added, from figures checked during the 1.0 research.
- **Day theme.** Designed as its own palette, not an inversion. The contrast of its muted text and amber accent was checked against the panel and the time band.
- **Data.** Moved from the HTML into `data/religions.json`.
- **Verification:**
	- `npm run validate`: 44 religions, 39 lineage links, 217 key moments, 116 sources.
	- `npm test`: 10 of 10 pass.
	- `npm run links`: 117 of 117 links returned 200.
	- Rendered headlessly at 1440 px in Night and Day; no horizontal page scroll at 400 px.

## 2026-10-01: version 1.0.0

Built in a single session with Claude Code (Claude Opus 5.5).

### Research

- **The set:** 44 religions chosen to cover the major living traditions, plus the most important small, indigenous, ancient and modern ones, grouped into 8 families.
- **The histories:** parallel research agents wrote a long-form history of each religion (500–1,800 words) to a shared template and a set of anchor facts. The chart's `story`, `beliefs`, `texts` and `followers` fields are condensed from those histories.
- **Spot-checking:** the agents checked uncertain dates and figures against Wikipedia, the Pew Research Center, official statistics and news reports. Corrections made during checking:
	- **Judaism:** about 15 million → about 15.8 million (Jewish Agency, 2024).
	- **Latter Day Saint movement:** about 17 million → about 18 million (church statistical report, end of 2025, plus other LDS bodies).
	- **Cheondoism:** "North Korea claims more" → "North Korea reports ~15,000". That was North Korea's figure to the UN Human Rights Committee in 2002; higher numbers are outside estimates.
- **World shares:** from the Pew Research Center's June 2025 report (2020 data). Christians 28.8%, Muslims 25.6%, unaffiliated 24.2%, Hindus 14.9%, Buddhists 4.1%, other religions 2.2%, Jews 0.2%.

### Design

The request was for "a timeline in the center with dots that stem up and down around how and when they came out." That became:

- a star-chart theme ([ADR 0006](decisions/0006-single-dark-star-chart-theme.md));
- founded-above / grew-below ([ADR 0003](decisions/0003-vertical-side-encodes-how-it-came-out.md));
- a stretched time scale with an undated block ([ADR 0004](decisions/0004-stretched-time-scale-and-undated-block.md)).

An 8-colour family palette was considered and run through a palette validator. It failed: with 8 categories in a dot chart, some colour pairs are indistinguishable under colour-vision deficiency. That led to the focus-and-context design ([ADR 0005](decisions/0005-focus-and-context-instead-of-family-colours.md)).

### Verification at release

- `npm run validate`: 44 religions, 8 families, 39 lineage links, no problems.
- `npm test`: 8 of 8 pass.
- `npm run links`: every link returned HTTP 200.
- Rendered with a headless browser at desktop width. One round of fixes followed:
	- the gold span had covered the year labels;
	- adjacent BCE ticks touched each other;
	- a modifier-letter apostrophe (ʼ) fell back to another font.
- The list view checked: 44 rows, and the caption is hidden.
