# 0003. The vertical side encodes how a religion came out

- **Status:** Accepted
- **Date:** 2026-10-01

## Context

The brief was "a timeline in the center with dots that would stem up and down around how and when they came out." Time takes the horizontal axis. The up/down split can carry one binary fact, or be purely decorative.

## Decision

- **Above the band:** a religion started, or given its lasting form, by a specific teacher or prophet (`how: "founded"`).
- **Below the band:** a religion that grew gradually out of a people's traditions (`how: "grew"`).

The split is roughly balanced: 19 above, 25 below. Borderline cases are classified by the rules in [CONTENT-GUIDE.md](../CONTENT-GUIDE.md#founded-or-grew):

- Jainism and Yarsanism are founded.
- Taoism, Yazidism, Rastafari and Unitarian Universalism grew.

## Consequences

- The chart answers both questions in the brief at a glance: when (x) and how (side).
- Some classifications are judgement calls. They are written down, and each record's `story` explains its own origin.
- Stems can't be used just to spread labels out; each side packs its own labels ([ADR 0011](0011-greedy-level-packing-for-labels.md)).

## Alternatives considered

- **Alternate up and down only for spacing.** Wastes a visual channel.
- **Living above, historical below.** Badly unbalanced (36 vs 8), and the hollow stars already show it.
- **Split by family.** Eight families can't map to two sides.
