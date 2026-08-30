# Builder learnings — independent judgment OS

Compressed learnings for Powerful Kids / wickedSmart. **Not kid UI copy.** These govern how we build and how parents think — the Mirror app (`src/`) implements a slice of this; the 30-min practice surface is separate (`docs/30-MINUTE-PRACTICE.md`).

---

## Cognitive Mirror

The product is a **mirror**, not a manager.

- Reflect what the child already did, noticed, or felt — do not assign worth from the app.
- Missions are **exercises** (do → reflect → feedback), not lectures or scores.
- Parent view shows signal (completions, feedback export), not judgment dashboards.
- Language: "You showed up" / "power practice" — never shame, never red X's for missed days.

**Kill test:** If a screen feels like school grades or chore compliance, kill it.

---

## Zero-effort entry

Friction kills kid honesty and parent consistency.

- One tap to a mission; no login wall in MVP.
- Feedback optional fields — hard/fun/free text, not mandatory essays.
- Younger sibling: play-first, big targets, no reading gate.
- Config drives profiles (`src/config/children.ts`) so adding a kid is data, not a rewrite.

---

## Session arc (Mirror)

Every kid session should feel like a short arc, not an infinite feed:

1. **Land** — greeting speaks to capability ("You notice what others miss").
2. **Do** — one clear action, 5–15 min, steps not walls of text.
3. **Reflect** — 1–2 prompts, no grades.
4. **Feedback** — how it felt, more/less like this (telemetry).
5. **Release** — back to life; streak is growth language, not obligation.

---

## Voice rules

| Do | Don't |
|----|-------|
| Capable, calm, powerful | Cutesy mascots, baby talk (except play mode simplicity) |
| "Power practice", "mission", "notice" | "Homework", "assignment", "quiz", "streak or fail" |
| Connect to mentor text when relevant | Spoilers or page-locked gates mid-book |
| Honor difficulty ("what was hard?") | Toxic positivity or "just try harder" |

Ayaan's voice: reader-writer building courage. Younger sibling: play, breathe, grow — fewer words, same respect.

---

## 30-minute kid practice = separate surface

The **30-min practice** is a parent-led architecture (see `docs/30-MINUTE-PRACTICE.md`). It is **not** the Mirror app's mission list.

- Mirror: async missions, kid-initiated, feedback loop.
- 30-min: synchronous block, parent holds structure, one thread per week.
- Do not merge them into one UI or one habit tracker.

---

## Child-psych basis (compressed)

Ground product choices in development, not vibes:

- **Autonomy:** kid picks mission when possible; agency builds grit.
- **Competence:** reflection names what worked; difficulty is data, not defect.
- **Relatedness:** friendship/courage missions; feedback heard by builders (Girish reads export).
- **Growth mindset:** revision mission, "before/after" writing — effort and strategy, not fixed ability.
- **Emotional literacy:** feelings detective, suitcase, breath — name it to tame it (age-appropriate).
- **No performative genius:** see 30-min doc; never optimize for looking smart on camera.

Ages differ: ~10 gets narrative/opinion stretch; ~3 gets motor/sensory play shell — same architecture, different `childIds` on missions.

---

## Focus–Filter–Release (parent only)

Parent mental model for practice time — **not shown in kid UI**:

| Phase | Parent job |
|-------|------------|
| **Focus** | One intention for the block (literacy, courage, writing type) |
| **Filter** | Protect from distraction; hold the 30-min container |
| **Release** | End clean; kid feedback optional; no debrief lecture |

Parent insights tab = export and read feedback, not real-time surveillance theater. Girish has full visibility in prototype; production may narrow later.

---

## Feedback as product telemetry

Kid feedback fields (feeling, hard, fun, more/less, free text) are **customer signal**:

- Timestamp + `missionId` + `childId` in `localStorage`
- Parent JSON export for iteration
- Drives which missions to expand, cut, or remix — not report cards

POS builds the product; kid feedback steers the product. Both loops stay separate.

---

## Evolve

Promote a learning into `AGENTS.md` or config only after it survives three real sessions with Ayaan or sibling feedback. Until then, it lives here.
