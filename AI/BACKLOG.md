# Backlog

Known limitations and ideas, roughly by value. Open an issue before starting anything large.

## Limitations

- **Phone use.** Below 1,060 px the chart scrolls sideways. That works, but on a phone the card is far below the chart. A sticky "selected" bar, or a bottom sheet, would help.
- **Dense regions.** Around 1500–200 BCE the lower side stacks about 7 levels, and true-to-time mode stacks the 1800s–1900s. Label packing is greedy, not optimal ([ADR 0011](decisions/0011-greedy-level-packing-for-labels.md)).
- **Key moments before 3600 BCE can't be drawn**, because the axis starts there. Aboriginal religion's moments therefore start in 1788 ([ADR 0014](decisions/0014-key-moments-eras-and-sources.md)).
- **Follower sources cover 18 of 44 religions.** The rest give an estimate without a named source.
- **Text is English only.**

## Ideas

- **Branches inside the big traditions**, as an expandable second level: Sunni / Shia, Catholic / Orthodox / Protestant, Theravada / Mahayana / Vajrayana.
- **Map view** of where each religion came out, linked to the timeline selection.
- **Followers over time** for the large religions, from historical estimates, clearly marked as such.
- **Compare two religions** side by side, with their spans and key moments overlaid.
- **Print / PDF layout.** Artifacts can't print, but GitHub Pages can.
- **Fully offline**, by self-hosting the four font families with a subset (the OFL licence allows it).
- **Automated screenshot test** in CI with Playwright: render at 1440 and 400 px in both themes, and check there's no horizontal page scroll.
