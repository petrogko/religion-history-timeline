# 0010. Neutral, attributed, spot-checked content

- **Status:** Accepted
- **Date:** 2026-10-01

## Context

The subject is sensitive. Readers include believers of every tradition shown, and people of none. The text was AI-assisted, which raises the bar for accuracy and for being open about how it was made.

## Decision

- **Attribute beliefs and conclusions.** Beliefs are attributed to the tradition ("Tradition holds…", "Adherents believe…"). Historical conclusions are attributed to scholars ("Historians date…"). No miracle or revelation is stated as fact, and none is mocked.
- **State controversies and persecution factually.** Scientology's criminal convictions, the persecution of Falun Gong and the Yazidi genocide are given with their attributions and without editorializing.
- **Check the facts.**
	- Key dates and figures were spot-checked against mainstream sources.
	- World shares come from the Pew Research Center (2025).
	- Every external link is HTTP-checked (`npm run links`).
- **Be open about how it was made.** The footer and the README say the text is AI-assisted and spot-checked, that dates are approximate and often debated, and that small-group numbers are rough.
- **Record corrections.** Corrections are noted in `CHANGELOG.md` with their source.

## Consequences

- Contributors must follow [CONTENT-GUIDE.md](../CONTENT-GUIDE.md), and reviewers should push back on unattributed claims.
- The page avoids taking sides, which sometimes means presenting a group's own figures next to independent estimates instead of choosing one.

## Alternatives considered

- **Only the traditions' own self-descriptions.** That isn't history, and the accounts often conflict.
- **Only academic framing.** It reads as dismissive to believers. Pairing the two is the established approach in religious studies.
