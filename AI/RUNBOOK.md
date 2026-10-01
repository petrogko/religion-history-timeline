# Runbook

Recipes for common tasks. Every recipe ends with the same check:

```sh
npm run validate && npm run build && npm test
```

## Edit a religion's text or numbers

1. Find the record in `data/religions.json` (search for `"id": "<id>"`).
2. Edit the field.
	- Follow [CONTENT-GUIDE.md](CONTENT-GUIDE.md).
	- Keep the first sentence of `story` able to stand alone as the tooltip.
	- When a follower figure changes, update `followersSource`.
3. Run the check. Add a line to `CHANGELOG.md`, with the source for any changed number.

## Add or change key moments

1. Each moment is `[year, "label", approx]`:
	- `year` is negative for BCE;
	- `approx` is `true` for a "c." date.
2. Keep 3–5 per religion, spread from the formative period to the modern era, in time order.
3. Write neutral labels of at most 80 characters, and attribute faith claims ("Muslims date…", "Tradition holds…").
4. Moments before 3600 BCE can't be drawn; leave them in the `eras` or the `story` instead.

## Add a religion

1. Make sure it belongs: a distinct, notable tradition, not a branch of one already shown.
2. Add a record with every field in [DATA-MODEL.md](DATA-MODEL.md):
	- choose `how` with the [founded-or-grew rules](CONTENT-GUIDE.md#founded-or-grew);
	- choose `y`, `range` or `pre` with the [placement rules](CONTENT-GUIDE.md#placement-in-time);
	- check each `parents` kind.
3. Update the expected count in `tests/page.test.mjs` and in the README. The page computes its own count.
4. Run `npm run links` (it needs network).
5. Render the page and check the label doesn't force an awkward extra level. If it does, shorten `label`.

## Change the layout or look

1. Read [ARCHITECTURE.md](ARCHITECTURE.md) and the relevant ADRs first.
2. Layout constants (`BAND`, `BASE`, `STEP`, `TOPPAD`, `BOTPAD`, the minimum width 1060) sit together near `geometry()` in `src/template.html`.
3. Colours are tokens only. Add each new token to the bare `:root` (Night) and to **both** Day blocks; the tests check this.
4. Check visually:
	- at about 1440 px and 400 px wide;
	- in Night and Day;
	- in both views;
	- with a family filter on;
	- after switching to "True to time".

	Any headless browser (Playwright, Puppeteer) can screenshot `index.html`.
5. If the change alters a decision, add an ADR.

## Refresh the README screenshots

1. Render `index.html` at 1440 × 1000 in the default state: Christianity selected, stretched scale, timeline view.
2. Save the viewport in Night as `docs/screenshot.png` and in Day as `docs/screenshot-day.png`.

## Republish the Claude artifact

The page is also published as a private claude.ai artifact. Its URL is kept outside this repo.

1. Run `npm run build`, or make a private build (below).
2. In Claude Code, publish the **fragment** to the existing artifact URL:
	- `dist/religions-through-time.html`, or your private fragment;
	- don't publish `index.html`, because the host adds its own skeleton.
3. Don't pass a new icon. Publishing without the URL creates a separate artifact.

## Private build with links to your own notes

[ADR 0015](decisions/0015-private-notes-links-outside-the-repo.md) explains why this exists.

1. Keep a notes map **outside the repo**:

	```json
	{ "vault": "<your vault name>", "files": { "christianity": "<folder>/<note name>" } }
	```

2. Build to paths outside the repo:

	```sh
	node scripts/build.mjs --notes <notes.json> --fragment-out <private-fragment.html> --page-out <private-page.html>
	```

The script refuses any output path inside the repo. Each card then shows "Open the history note in Obsidian".

## Release

1. Bump `version` in `package.json`.
2. Move the changelog entries under a new version heading with today's date.
3. Commit, tag `vX.Y.Z` and push. GitHub Pages, if enabled, serves the new `index.html`.
