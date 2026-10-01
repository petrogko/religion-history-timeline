# 0012. Data in JSON, inlined into the page at build time

- **Status:** Accepted (amends [0001](0001-single-self-contained-html-page.md))
- **Date:** 2026-10-01

## Context

Version 1.1 added origin, founders, branches, eras, 217 key moments and 116 sources to the 44 records. With the data written as a JS literal inside the HTML:
- content edits and code edits mixed in one file;
- the toolchain had to evaluate the literal out of the page to validate it.

## Decision

- **The data** lives in `data/religions.json`: families, the world-today figures, and the religions.
- **The page** is `src/template.html`. It holds two markers: `/*@DATA@*/null` and `/*@NOTES@*/null`.
- **`scripts/build.mjs`** replaces the markers with script-safe JSON (`<`, U+2028 and U+2029 escaped) and writes:
	- `dist/religions-through-time.html`: the artifact fragment, not committed;
	- `index.html`: the standalone page, committed for GitHub Pages.
- **Opening the template directly** shows a short "build the page" message, not a broken chart.

[ADR 0001](0001-single-self-contained-html-page.md) still holds for what ships: every published page is one self-contained file.

## Consequences

- Content diffs are clean JSON diffs. The validator reads the JSON directly.
- There is always a build step before publishing. `npm run check:build` and the tests catch a stale `index.html`.

## Alternatives considered

- **Keep the literal in the HTML.** Workable, but noisy diffs and a fragile extraction.
- **Load the JSON with `fetch` at runtime.** It breaks when the page is opened from disk, and it adds a second published file ([0001](0001-single-self-contained-html-page.md)).
