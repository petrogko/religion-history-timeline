# 0008. Three kinds of lineage link

- **Status:** Accepted
- **Date:** 2026-10-01

## Context

"How they came out" includes what they came out of. A single "parent" link would flatten very different relationships:

- Christianity began inside Judaism.
- Caodaism deliberately combined five traditions.
- Zoroastrianism and Hinduism share an Indo-Iranian ancestor that isn't on the chart. A plain link would wrongly read as "Zoroastrianism came from Hinduism".

## Decision

`parents` entries carry a kind:

| Kind | Meaning | Line | In the detail panel |
|---|---|---|---|
| `grew` | Began inside the parent | solid | "its parent" / "grew out of it" |
| `drew` | Took ideas or practices without starting inside it | dashed | "an influence" / "drew on it" |
| `kin` | Shares a common ancestor not shown | dotted | "shared roots" |

- **At rest**, all 39 links are drawn faint, like constellation lines.
- **On selection**, the links touching the selected religion turn gold and the rest fade.
- **The validator** keeps the graph meaningful: no cycles, no parent later than its child, no unknown ids.

## Consequences

- The chart can show the Abrahamic and Dharmic family trees honestly, including the influences that run across families.
- Each link is a claim that needs a source. The content guide asks for fewer, solid links over speculative ones.

## Alternatives considered

- **One link type.** It misstates the relationships above.
- **No links.** It loses half of the "how they came out" story.
