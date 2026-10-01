# Content guide

The page is read by people of every faith and of none. The text has to be accurate, attributed and even-handed.

## Tone

- **Attribute beliefs.** Write "Tradition holds that…", "Adherents believe…" or "Muslims believe…". Historical conclusions get their own attribution: "Historians date…", "Scholars place…". Never state a revelation, miracle or divine origin as fact. Never mock one either.
- **State hard history plainly.** Persecution, schisms, violence (including human sacrifice) and controversies are reported factually, with the claim attributed where it's contested. Don't take sides.
- **Use respectful names.** Use the names communities use for themselves: Vodou, not "voodoo"; Latter Day Saints; Baháʼí.
- **Write plain English.** Use short sentences, BCE/CE, and "c." for approximate dates. Note debated dates in a few words ("debated", "c. 1500–500 BCE").

## Sourcing

- **Write from solid, mainstream scholarship.** If unsure of a date, name or number, check it (encyclopedias, academic sources, the community's own statistics for self-reported membership) rather than guessing.
- **Never invent quotes, numbers or sources.**
- **Follower numbers:**
	- prefer recent, named estimates (Pew Research Center for the large groups; official reports or censuses for the small ones);
	- give ranges where estimates disagree;
	- where a group's own figure is far above outside estimates, say both (see Scientology).
- **Wikipedia links:** each religion links to its main English Wikipedia article. `npm run links` must pass.
- **Name the source of a follower figure** in `followersSource` whenever one exists (a census, an official report, Pew). Leave it out rather than guess.

## Key moments

- 3–5 per religion, chosen from well-documented history and spread from the formative period to today.
- Labels are neutral fragments of at most 80 characters. Attribute faith claims ("Muslims date…", "Tradition holds…", "Date Joseph Smith later gave for…").
- Avoid contested numbers in a label: "Deadly clashes in Suwayda", not a disputed death toll.
- Births of later figures are weak key moments. Prefer events that changed the religion.

## Founded or grew?

`how` decides whether a star sits above or below the band ([ADR 0003](decisions/0003-vertical-side-encodes-how-it-came-out.md)).

- **`founded`:** a specific, historically identifiable teacher or prophet started it, or gave it its lasting form. This holds even when the tradition sees that person as restoring something older.
	- Jainism (Mahavira) and Yarsanism (Sultan Sahak) count as founded.
- **`grew`:** it emerged gradually from a people's practice, or out of a movement with no single founder.
	- Hinduism, Judaism, Shinto and the ancient religions grew.
	- Taoism grew: Laozi is semi-legendary, and the organized church came centuries later.
	- Yazidism grew: a Sufi order that became a religion after its founder's death.
	- Rastafari grew: many early preachers, no single founder.
	- Unitarian Universalism grew: a merger of two denominations.

When in doubt, write down the reasoning in the record's `story`.

## Placement in time

[ADR 0009](decisions/0009-placement-rules-for-undated-and-debated-origins.md) has the full rules. In short:

1. **The earliest firm evidence:** plot the first record or the founding event. Chinese folk religion sits at the Shang oracle bones (c. 1250 BCE), not at an invented prehistoric date.
2. **No datable start at all:** use the undated block (`pre`), and mention the age in `date` if one is commonly cited (Aboriginal religion, 50,000+ years).
3. **A debated date:** plot a reasonable midpoint and give the full span as `range` (Zoroastrianism: plotted at 1000 BCE, range 1500–500 BCE).
4. **A gradual start:** plot the earliest recognizable form and give the span to the mature form as `range` (Taoism: philosophy c. 400 BCE → Celestial Masters 142 CE).
5. **Historical religions** get an `end` and an `endLabel` saying what ended them.

## Lineage

[ADR 0008](decisions/0008-three-kinds-of-lineage-link.md) explains the three kinds.

- **`grew`: grew out of.** It began inside the parent. Christianity from Judaism; the Druze from Ismaili Islam; LDS from Christianity.
- **`drew`: drew on.** It took ideas or practices without starting inside the parent. Manichaeism from Zoroastrianism, Christianity and Buddhism; Wicca from ideas about Celtic, Norse and Greek religion.
- **`kin`: shares roots with.** Both descend from a common ancestor that isn't on the chart.
	- Zoroastrianism and Hinduism share Indo-Iranian roots; never write "Zoroastrianism drew on Hinduism".
	- Samaritanism and Judaism both descend from ancient Israelite religion.
- **Faith claims about origin aren't contradicted, only placed beside history.** Muslims understand Islam as the restored faith of Abraham, revealed to Muhammad. The `drew` links to Judaism and Christianity describe the historical relationship historians draw.
- **Prefer fewer, solid links over many speculative ones.** Leave a link out when scholars broadly dispute it.
