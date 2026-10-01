# Data model

All content lives in `data/religions.json`. `scripts/validate.mjs` enforces the rules below, and CI runs it on every push.

```json
{
  "families": [{ "id": "abr", "name": "Abrahamic" }],
  "world": {
    "source": { "title": "…", "url": "https://…" },
    "year": 2020,
    "groups": [{ "name": "Christians", "share": 28.8, "people": "2.3 bn", "id": "christianity" }]
  },
  "religions": [{ "id": "christianity", "…": "…" }]
}
```

## Religion fields

| Field | Type | Required | Meaning and rules |
|---|---|---|---|
| `id` | string | yes | Stable key, lowercase letters and digits. Used in URL hashes. |
| `label` | string | yes | Short chart label; keep it under about 22 characters. |
| `name` | string | yes | Full name for the card, tooltip, list and search. |
| `fam` | string | yes | A family `id`. |
| `y` | number | one of `y` / `pre` | Plotted year (negative = BCE), in `[-3600, 2026]`. |
| `pre` | integer | one of `y` / `pre` | Slot 0–4 in the undated block; slots are unique. |
| `ds` | string | yes | Short date under the label (`c. 1250 BCE`, `1830`, `prehistoric`). |
| `date` | string | yes | Full date line. |
| `how` | `founded` / `grew` | yes | Above or below the band ([content guide](CONTENT-GUIDE.md#founded-or-grew)). |
| `size` | `xl` / `l` / `m` / `s` / `none` | yes | Followers: over 1 bn · over 100 m · over 1 m · under 1 m · historical. |
| `rough` | boolean | no | Followers not reliably counted (dashed star). |
| `status` | `Living` / `Historical` / `Revived` | yes | `Historical` exactly when `size` is `none`. |
| `end`, `endLabel` | number, string | Historical only | When and how it ended. The text before the first comma appears in the tooltip. |
| `range`, `rangeLabel` | `[from, to]`, string | no | An uncertain or gradual start (dotted outline); `y` lies inside it. |
| `story` | string | yes | How it came out, in 2–4 sentences. The first sentence must stand alone (it is the tooltip). |
| `beliefs` | string | yes | Core beliefs in 1–2 sentences. |
| `texts` | string | yes | Sacred texts, or `None (oral tradition)`. |
| `followers` | string | yes | The estimate with its uncertainty. |
| `followersSource` | string | no | Where the follower figure comes from (shown under it, and grouped in "Sources and method"). |
| `origin` | string | yes | Where it began, with a date. |
| `founders` | string | yes | Founder and key figures, or "No founder; …". |
| `branches` | string | yes (may be `""`) | Main branches; leave it empty when there are none. |
| `eras` | string[] | yes | The religion's history in eras, oldest first (`"Jesus and the apostles (c. 30–100 CE)"`). |
| `milestones` | `[year, label, approx][]` | yes, 2–6 items | Key moments in time order. `year` is an integer in `[-3600, 2026]`; `label` is at most 80 characters, neutral, with faith claims attributed; `approx` is `true` for "c." dates. |
| `sources` | `[title, url][]` | yes, at least 1 | Further reading. Every URL must pass `npm run links`. |
| `parents` | `[id, kind][]` | yes (may be empty) | Lineage. `kind` is `grew`, `drew` or `kin`. |
| `wiki` | string | yes | Main English Wikipedia article slug, URL-encoded. |

## Lineage rules

- Parents exist; there are no self-links and no duplicates.
- A parent can't start later than its child. Undated records count as earliest.
- There are no cycles.
- See [ADR 0008](decisions/0008-three-kinds-of-lineage-link.md) for the three kinds.

## World figures

- Shares must add up to 100% (within 0.5).
- Each group's `id`, when present, must be a religion id. Its bar then selects that religion.
- `source` needs a title and an https URL.

## Families

| id | Name | Members |
|---|---|---|
| `abr` | Abrahamic | 7 |
| `ira` | Iranian & Gnostic | 5 |
| `dha` | Dharmic | 4 |
| `eas` | East Asian | 7 |
| `ind` | Indigenous & folk | 6 |
| `anc` | Ancient | 7 |
| `nrm` | New movements | 7 |
| `non` | Without religion | 1 |
