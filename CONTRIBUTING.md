# Contributing

Corrections and additions are welcome, especially from people who know a tradition well.

## Reporting a mistake

Open an issue with:
- the religion and the text that is wrong;
- what it should say;
- a source: a scholarly book or article, an encyclopedia, or the tradition's own official body for self-description.

## Changing the content or the page

1. Content lives in `data/religions.json`, and the page in `src/template.html`. Don't edit `index.html`; it is generated.
2. Follow [AI/CONTENT-GUIDE.md](AI/CONTENT-GUIDE.md):
	- neutral wording, with beliefs attributed to the tradition
	- dates as BCE/CE, with "c." for approximate ones
	- the placement rules for undated and debated origins
	- a named source for any new figure
3. Check and rebuild:

   ```sh
   npm run validate
   npm run build
   npm test
   npm run links   # if you added or changed a link (needs network)
   ```

4. Add a line to [CHANGELOG.md](CHANGELOG.md). For design or architecture changes, add an ADR in [AI/decisions/](AI/decisions/).

## Adding a religion

See [AI/RUNBOOK.md](AI/RUNBOOK.md#add-a-religion). The page is designed around a curated set: a new entry should be a distinct, notable tradition rather than a denomination of one already shown.
