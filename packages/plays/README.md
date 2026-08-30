# plays

**Job:** Return today's trio + sprint tags from the content bank.

## Need

- **Success:** 21 plays in bank; `getTodaysTrio(playDate)` returns exactly 3 unique plays; sprint/essentials metadata for parents.
- **Kill:** Stores videos, talks to Drive, captures proof, renders UI.
- **Boundary:** Content + selection only. Depends on `day-clock` for index math.

## Exports

- `getTodaysTrio(playDate)` — 3 plays for that date
- `getPlay(id)` — single play
- `getDayTheme(dayIndex)` — daily thread
- `getSprintContext(dayIndex)` — parent sprint tags
