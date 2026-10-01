# 0007. Four follower size classes

- **Status:** Accepted
- **Date:** 2026-10-01

## Context

- **Followers today span seven orders of magnitude**, from about 900 Samaritans to about 2.3 billion Christians.
- **Many counts are uncertain:** estimates vary widely, groups claim far more than outsiders find, and some are not counted at all.
- **Sizing stars by exact count** would imply a precision that isn't there.

## Decision

- **Star radius uses four classes:**

	| Class | Followers | Radius |
	|---|---|---|
	| `xl` | over 1 billion | 9 px |
	| `l` | over 100 million | 7 px |
	| `m` | over 1 million | 5.2 px |
	| `s` | under 1 million | 3.8 px |

- **Two extra styles:**
	- historical religions (`none`) are hollow rings;
	- religions whose followers are not reliably counted (`rough: true`) get a dashed outline at partial fill. That covers Native American religions, Korean shamanism, Shinto and Confucianism.
- **The exact estimate** is always given in words in `followers`, with its uncertainty.

## Consequences

- The four largest traditions stand out at once, and the size encoding stays honest where the numbers are soft.
- Borderline groups (Druze at about 1 million) sit at a class edge. The text gives the real figure.

## Alternatives considered

- **Area proportional to count.** The largest stars would be 1,600× the smallest; unreadable.
- **A continuous log radius.** It still implies precision that the data lacks.
