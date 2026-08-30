# Need — POS adoption for Powerful Kids (this change)

**Status:** proven (pending `npm run build` exit 0)

## Success

- A new contributor or agent opening the repo sees POS v3.6 as default law (`AGENTS.md`, `.cursor/rules/00-prompt-os.mdc`).
- Builder learnings live in git (`docs/LEARNINGS.md`, `docs/30-MINUTE-PRACTICE.md`), not only on an agent box.
- `npm run build` still passes (L2 programmatic verification).
- README links POS, learnings, and the two product surfaces (Mirror vs 30-min practice).

## Kill

- POS docs or wiring turn the kid Vite app into a habit tracker, task manager, or chore UI.
- POS adoption adds kid-facing UI effort for governance (docs/rules only).

## Boundary

- Do not vendor the full POS kernel; point to upstream.
- Do not clone `prompt-operating-system` unless a specific file must be read over the network.
- No PR; commit on `main`.

## Definition of done (checkable)

| # | Check | Evidence |
|---|-------|----------|
| 1 | `AGENTS.md` exists with seven-layer runner + eight tenets + verification ladder | file on disk |
| 2 | `.cursor/rules/00-prompt-os.mdc` exists with `alwaysApply: true` | file on disk |
| 3 | `docs/LEARNINGS.md` committed | file on disk |
| 4 | `docs/30-MINUTE-PRACTICE.md` committed | file on disk |
| 5 | README links POS, learnings, surfaces, Origin/wickedSmart | diff in README |
| 6 | Kid app unchanged in behavior (no habit-tracker UI) | no `src/` mission/streak UI changes |
| 7 | Build green | `npm run build` exit 0 |

## Hypothesis

**H:** Repo-level POS law (docs + Cursor rule) is enough for agents to run the seven-layer runner without vendoring the kernel.

**Cheapest disproof:** Next agent ships product code without freezing Need or without L2 build verification.

**Observation:** This change itself follows the runner; build exit code is the receipt.

## Context inventory

- Source of truth: [prompt-operating-system](https://github.com/youtextme/prompt-operating-system) v3.6
- Live docs: [youtextme.github.io/prompt-operating-system](https://youtextme.github.io/prompt-operating-system/)
- Existing kid app: `src/` Vite + React companion (missions, feedback, parent export)
- Product surfaces: Mirror (kid app) vs 30-min practice (separate; see `docs/30-MINUTE-PRACTICE.md`)
