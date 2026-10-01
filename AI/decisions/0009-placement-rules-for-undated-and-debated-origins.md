# 0009. Placement rules for undated, debated and gradual origins

- **Status:** Accepted
- **Date:** 2026-10-01

## Context

Every star needs a single x position, but many origins aren't single dates:

- some are prehistoric;
- some are disputed by a thousand years (Zarathustra);
- some unfold over centuries (Taoism, Judaism, Unitarian Universalism);
- some religions also ended.

Inventing precise dates would mislead.

## Decision

1. **The earliest firm evidence.** Plot the first written record or the founding event. Example: Chinese folk religion sits at the Shang oracle bones, c. 1250 BCE.
2. **No datable start.** Put the religion in the undated block (`pre`), and give any commonly cited age in the text. This covers Aboriginal Australian religion (50,000+ years), African traditional religions, Native American religions, Korean shamanism and Shinto.
3. **A debated date.** Plot a midpoint and record the full span as `range`, drawn as a dotted outline on the band when the religion is selected. Examples:
	- Zoroastrianism: plotted at 1000 BCE, range 1500–500 BCE.
	- Samaritanism: plotted at 350 BCE, range 500–150 BCE.
	- Mandaeism: plotted at 150 CE, range 1–300 CE.
4. **A gradual start.** Plot the earliest recognizable form and record the span to the mature form as `range`. Examples:
	- Judaism: 1200–500 BCE.
	- Hinduism: 1500–500 BCE.
	- Taoism: 400 BCE – 142 CE.
	- Unitarian Universalism: 1568–1961.
	- Jehovah's Witnesses: 1870–1931.
5. **Historical religions** get an `end` year and an `endLabel` saying what ended them. Example: Ancient Egypt ends c. 537 CE, when the temple at Philae closed.
6. **The span of the selected religion** is drawn as a gold band from its start to its end, or to today.

## Consequences

- No invented dates, and the uncertainty stays visible.
- Readers have to open a religion to see its range; the default view shows one point per religion.

## Alternatives considered

- **Drawing every uncertainty range at rest.** Too much visual noise across 44 religions.
- **Plotting prehistoric traditions at arbitrary early dates.** False precision.
