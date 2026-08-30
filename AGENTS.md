# AGENTS.md — Powerful Kids

**Every prompt and change in this repo runs through Prompt Operating System (POS) v3.6.**

Source of truth: [prompt-operating-system](https://github.com/youtextme/prompt-operating-system) · [Live docs](https://youtextme.github.io/prompt-operating-system/)

This file is repo law alongside `.cursor/rules/00-prompt-os.mdc`. Do not vendor the full kernel; use `pos/` for thin contracts.

---

## Seven-layer objective runner

Route every non-trivial ask through:

| Layer | Name | Before product code |
|------:|------|---------------------|
| 1 | **Need** | Freeze success, kill, boundary, checkable done (`pos/need.md`) |
| 2 | **Context** | Inventory authorised tools, paths, budgets, child profiles |
| 3 | **Hypothesis** | State falsifiable hypothesis + cheapest disproof |
| 4 | **Truth** | Numbers/URLs sourced or tagged `[unverified]` |
| 5 | **Critique** | Writer ≠ grader; separate pass/fail |
| 6 | **Retrieve** | Named gap + source + budget; files before generation |
| 7 | **Autonomy** | MAPE-K loop; terminal status only `proven` / `killed` / `blocked` |

**Hard rules:**

- Freeze Need before product code.
- Writer never grades itself.
- Terminal outcomes only: **proven**, **killed**, or **blocked** — never "looks good."

Design paper: [OBJECTIVE-RUNNER.md](https://github.com/youtextme/prompt-operating-system/blob/main/docs/OBJECTIVE-RUNNER.md)

---

## Verification ladder

```
L1 Formal → L2 Programmatic → L3 Adversarial → L4 Multi-judge → L5 Single judge → L6 Self-grade FORBIDDEN
```

For this repo:

- **L2:** `npm run build` must pass for shipping UI changes.
- **L3:** Kid feedback and parent export are adversarial inputs — do not optimize for fake completion.
- **L6:** Never mark done because the builder said so; receipts only.

---

## Eight tenets (short)

| Tenet | Rule |
|-------|------|
| **GoSolo** | Autonomous routing through POS; no manual SDK theater |
| **KeepItWarm** | Git spine + audit trail; contracts in `pos/` |
| **TerminalOutcomes** | Falsifiable contracts per prompt; boolean DoD |
| **WayofWorking** | Disprove the brief before product code |
| **BarRaiserBoard** | Independent verification; minority veto on kill/metric |
| **FeedbackLoop** | ≤3 high-leverage human questions at outcome gates |
| **FormulasAndBooleans** | Exit codes and checks, not vibes |
| **Evolve&Improve** | Learnings in `docs/`; promote after evidence |

Full tenets: [TENETS.md](https://github.com/youtextme/prompt-operating-system/blob/main/docs/TENETS.md)

---

## Product surfaces (do not merge)

| Surface | What it is | Where |
|---------|------------|-------|
| **Mirror** | Kid companion app — missions, reflection, feedback | `src/` Vite app |
| **30-min practice** | Parent-led structured practice architecture | `docs/30-MINUTE-PRACTICE.md` (separate; not kid task UI) |

**Kill criteria for product work:** Mirror becomes a habit tracker, chore list, or quiz-for-grades app. See `docs/LEARNINGS.md`.

---

## Builder learnings (in-repo)

- `docs/LEARNINGS.md` — Cognitive Mirror, voice, child-psych, Focus-Filter-Release (parent)
- `docs/30-MINUTE-PRACTICE.md` — 4-phase practice, Open Quest, five engines

Kid in-app feedback (`localStorage`) is product telemetry — treat as customer signal, not grades.

---

## Workflow checklist

1. Read this file + `.cursor/rules/00-prompt-os.mdc`
2. Write/update `pos/need.md`
3. Inventory Context (configs in `src/config/`, existing missions)
4. State Hypothesis + cheapest disproof
5. Implement smallest slice
6. Run `npm run build` (L2)
7. Critique separately — writer does not declare proven

---

## Repo map

```
pos/           Thin POS contracts (need.md)
docs/          Builder learnings (not kid UI)
src/config/    Child profiles + missions (config-driven)
src/           Mirror kid app
AGENTS.md      This file
```

**Remotes:** Origin now (`youtextme/powerful-kids` when created) · GitHub mirror later (`wickedSmart`)
