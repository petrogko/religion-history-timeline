@AGENTS.md

## Claude Code notes

- Republishing the claude.ai artifact: follow [AI/RUNBOOK.md](AI/RUNBOOK.md#republish-the-claude-artifact). Run `npm run build`, then publish the fragment (`dist/religions-through-time.html`, or a private build written outside the repo), not `index.html`. Pass the existing artifact URL so the link stays the same, and keep that URL out of this repo.
- Charts follow the data-visualization rules recorded in the ADRs:
	- no categorical colour without a validated palette;
	- thin marks;
	- hover plus keyboard access;
	- a list view as the table alternative;
	- both themes checked.
- Work in this repo only. Don't read or write files outside it unless the user asks, and never copy anything personal in.
