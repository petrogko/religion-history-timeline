# 0015. Private notes links, built outside the repo only

- **Status:** Accepted
- **Date:** 2026-10-01

## Context

The repo is public. A maintainer may also keep their own notes on each religion, and want each card to link to them, for example with `obsidian://` links into a local vault. Those links name a private vault and its folders, which must never be committed.

## Decision

- **The page code can render notes links.** It shows "Open the history note in Obsidian" only when a `NOTES` object is present: `{ "vault": "<name>", "files": { "<id>": "<path in vault>" } }`.
- **The public build leaves it empty.** `NOTES` is always `null`, and a test asserts it.
- **A private build injects it.** `node scripts/build.mjs --notes <file> --fragment-out <file> --page-out <file>` adds the map. The script refuses any output path inside the repo.
- **The notes map is kept outside the repo too.**

## Consequences

- One template serves both the public page and a private copy, so they can't drift apart.
- The vault name and the note paths never appear in git history.

## Alternatives considered

- **Keep a separate private copy of the page.** It drifts from the public one with every change.
- **Put notes links in the public data.** It leaks personal paths.
