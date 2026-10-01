# 0001. One self-contained HTML page

- **Status:** Accepted, amended by [0012](0012-data-in-json-inlined-at-build.md) (the data now lives in JSON and is inlined at build time)
- **Date:** 2026-10-01

## Context

The page has to work in three places:

- **As a claude.ai artifact.** The host wraps a fragment in its own document skeleton. Its content security policy allows scripts only from a few CDNs, stylesheets only from Google Fonts, and no requests to other hosts.
- **On GitHub Pages.**
- **Opened straight from disk**, where browsers block `fetch` of local files.

## Decision

- **One source file.** `src/religions-through-time.html` is a single fragment with inline CSS, inline JS and the data inline as a JS literal. `<title>` comes first, and there are no `<!doctype>`, `<html>`, `<head>` or `<body>` tags.
- **One build step.** `scripts/build.mjs` wraps the fragment into a complete `index.html`: head and body, a doctype, meta tags, and the small reset the artifact host would add.
- **The output is committed.** `index.html` is checked in, so Pages can serve it with no workflow, and CI fails if it is stale.

## Consequences

- One file to publish anywhere, and it works offline (fonts fall back to system fonts).
- Content and code share one file, so diffs mix. The data is still machine-checkable: `scripts/lib.mjs` evaluates the `D` literal out of the page for validation and tests.
- The generated file has to be rebuilt after every edit; `npm run check:build` and the tests enforce it.

## Alternatives considered

- **`data.json` loaded with `fetch`.** It breaks when the page is opened from disk, and it adds a second published file to the artifact.
- **A Vite or React build.** Heavy for 44 records and one view, and it adds a dependency tree to a public repo for no user benefit.
