# AI docs

Working knowledge for AI agents and human maintainers: how the page is built, why, and how to change it safely.

## Reading order

1. [ARCHITECTURE.md](ARCHITECTURE.md): the moving parts, from data to pixels.
2. [decisions/](decisions/README.md): architecture decision records (ADRs), the reasons behind the design.
3. [DATA-MODEL.md](DATA-MODEL.md): the fields of a religion record and the rules the validator enforces.
4. [CONTENT-GUIDE.md](CONTENT-GUIDE.md): how the text is written and sourced, and where each religion is placed.
5. [RUNBOOK.md](RUNBOOK.md): step-by-step recipes for common tasks.
6. [HISTORY.md](HISTORY.md): how the project was made and what was verified.
7. [BACKLOG.md](BACKLOG.md): known limitations and ideas.

## Conventions for these docs

- **ADRs are append-only.** To change a decision, add a new ADR that supersedes the old one and mark the old one `Superseded by NNNN`. Don't rewrite history.
- **Keep docs true to the code.** When a constant, field or behaviour changes, update ARCHITECTURE.md or DATA-MODEL.md in the same change.
- **No personal information.** The repo is public.
