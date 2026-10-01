# Changelog

All notable changes to this project. Newest first. Dates are ISO (YYYY-MM-DD).

## [1.1.0] — 2026-10-01

### Added
- **Day theme** alongside Night ([ADR 0013](AI/decisions/0013-night-and-day-themes.md)). The page follows the system setting until a Night/Day button is chosen, and remembers the choice.
- **Night visuals:** a faint seeded starfield, a soft glow on the largest stars and on the selection, a halo pulse when a religion is selected, and stars that grow on hover.
- **Key moments** ([ADR 0014](AI/decisions/0014-key-moments-eras-and-sources.md)): 217 dated events across the 44 religions, drawn as gold diamonds on the time band for the selected religion and listed in its card.
- **More facts on every card:** where it began, founder and key figures, main branches, and its history in 5–7 eras.
- **Sources:**
	- every card lists further reading (116 checked links);
	- 18 follower figures name their source (Pew, censuses, official reports);
	- a new "Sources and method" panel explains placement and groups the follower sources.
- **The world today:** Pew Research Center 2020 shares as single-hue bars that open the matching religion.
- **Search box** to find a religion by name.
- **"Where it began" column** in the list view.
- **Private builds** with links to a local notes vault, written outside the repo only ([ADR 0015](AI/decisions/0015-private-notes-links-outside-the-repo.md)).

### Changed
- **Content moved to `data/religions.json`**, and the page became `src/template.html`. The build inlines the data and writes `dist/religions-through-time.html` and `index.html` ([ADR 0012](AI/decisions/0012-data-in-json-inlined-at-build.md)).
- **Validator and tests:**
	- the validator checks the new fields (eras, key moments, sources, world figures);
	- the tests check that the theme tokens are complete, that the public build has no notes links, and that private builds refuse in-repo paths.
- **Mesopotamian religion's end date:** 79 CE (the last datable cuneiform tablet), to match its key moments.
- **The intro paragraph and the chart label** now count religions from the data.

## [1.0.0] — 2026-10-01

### Added
- The interactive timeline:
	- 44 religions in 8 families, placed by when they came out
	- above the band if founded by a teacher or prophet; below if grown from tradition
	- star size for followers today, hollow stars for religions no longer practised
	- lineage lines in three kinds (grew out of, drew on, shares roots with)
	- family filters, a "Recent stretched" / "True to time" scale toggle with an animated transition, a list view, a detail panel, tooltips, keyboard navigation and `#id` deep links
- The build script (`index.html`), the data validator, the link checker and a `node:test` suite.
- AI docs: architecture, 11 architecture decision records, the data model, the content guide, the runbook, project history and the backlog.
- CI workflow running the checks on every push and pull request.
