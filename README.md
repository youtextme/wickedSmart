# Powerful Kids

Companion apps kids love — exercise-based learning that builds grit, growth mindset, calm confidence, and emotional intelligence. Not lectures. Not preaching. Real practice.

**Future GitHub mirror:** `wickedSmart` · **Origin:** `youtextme/powerful-kids` (when created)

---

## Two surfaces

| Surface | Role | Location |
|---------|------|----------|
| **Mirror** | Kid companion app — missions, reflection, feedback | `src/` (this repo's Vite app) |
| **30-min practice** | Parent-led practice architecture — not kid task UI | [`docs/30-MINUTE-PRACTICE.md`](docs/30-MINUTE-PRACTICE.md) |

Do not merge them into a habit tracker. Builder philosophy: [`docs/LEARNINGS.md`](docs/LEARNINGS.md).

---

## How we build — Prompt OS v3.6

**Every prompt and change runs through POS** (seven-layer objective runner).

| Resource | Link |
|----------|------|
| Source of truth | [github.com/youtextme/prompt-operating-system](https://github.com/youtextme/prompt-operating-system) |
| Live docs | [youtextme.github.io/prompt-operating-system](https://youtextme.github.io/prompt-operating-system/) |
| Repo law | [`AGENTS.md`](AGENTS.md) |
| Cursor rule | [`.cursor/rules/00-prompt-os.mdc`](.cursor/rules/00-prompt-os.mdc) |
| Active contract | [`pos/need.md`](pos/need.md) |

Layers: Need → Context → Hypothesis → Truth → Critique → Retrieve → Autonomy (MAPE-K). Freeze Need before product code. Writer never grades itself. L2 ship gate: `npm run build`.

---

## Product vision

Config-driven so each child gets a personalized experience. Girish's kids (Ayaan and younger sibling) are first users — in-app feedback is product telemetry.

### First users

| Profile | Age | Mode | Focus |
|---------|-----|------|-------|
| **Ayaan** | ~10, 4th grade (Ms. Luz) | Practice | Literacy with *The Tiger Rising*; narrative, informational, and opinion writing |
| **Little Explorer** | ~3 | Play | Play-first shell — architecture ready for full toddler content |

---

## What's in the Mirror MVP

- **Kid home** — speaks to each child as capable; brand: Powerful Kids
- **8 practice missions** for Ayaan — Tiger Rising–inspired exercises + writing stretches
- **3 play missions** for younger sibling
- **Feedback loop** — after each mission + Feedback tab; persisted to `localStorage`
- **Parent insights** — completions, feedback, JSON export
- **Power-practice progress** — streak language, never shame
- **Config-driven** — `src/config/children.ts`, `src/config/missions.ts`

---

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:4317](http://localhost:4317)

## Build

```bash
npm run build
npm run preview
```

---

## How feedback feeds iteration

Every completion and feedback entry includes `missionId`, `childId`, timestamp, ratings, and free text. Export from the **Parent** tab. Use kid voice to decide which missions to expand, cut, or remix — POS governs how we build; kid feedback governs what we build.

---

## Project structure

```
AGENTS.md              POS repo law
.cursor/rules/         Cursor always-apply POS rule
pos/                   Thin contracts (need.md)
docs/                  Builder learnings + 30-min practice
src/config/            Child profiles + missions
src/                   Mirror kid app
```

---

## Origin / GitHub setup

```bash
origin repo create powerful-kids
git remote set-url origin https://origin.cursor.com/youtextme/powerful-kids.git
git push -u origin main
```

Mirror to GitHub as `wickedSmart` when ready.

---

## License

Private — family prototype.
