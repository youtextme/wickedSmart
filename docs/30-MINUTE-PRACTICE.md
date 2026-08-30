# 30-minute practice architecture

**Separate surface from the Mirror kid app.** This document defines how a parent runs a focused ~30-minute practice block. It is **not** implemented as kid chore UI or a habit tracker in `src/`.

See also: `docs/LEARNINGS.md` (Focus–Filter–Release, voice, child-psych).

---

## Purpose

One contained block where a child practices literacy, writing, courage, or play — with structure held by the parent and **no performative genius** (no optimizing for looking smart, performing for a camera, or racing siblings).

---

## Four phases (~30 min)

| Phase | Time | What happens |
|-------|------|----------------|
| **1. Arrive** | ~3 min | Land: intention in one sentence. "Today we're noticing feelings in the book." No lecture. |
| **2. Open Quest** | ~15 min | Single threaded activity — read, write, or exercise. One quest, not a buffet. |
| **3. Reflect** | ~7 min | Short reflection aligned with mission style: what did you notice? what was hard? |
| **4. Close** | ~5 min | Release: optional feedback to Mirror app or verbal; parent notes one line for export. |

Phases flex; total stays ~30 min. If energy is low, shorten Open Quest — never shame.

---

## Open Quest

One **open-ended quest** per session — not a worksheet dump.

Examples (Tiger Rising season):

- Find one page where a character feels caged; read it aloud and name the feeling.
- Write three sentences: what Rob might be afraid to say.
- Revision: one sentence from school writing, made stronger.

Quest must be **doable mid-book** and exercise-based. Parent picks from mission bank or invents within the week's thread.

---

## Single-thread week

One **thread** per week ties sessions together without overwhelming:

| Week thread | Example focus |
|-------------|----------------|
| Feelings | noticing, naming, suitcase metaphor |
| Courage | small brave moves, breath |
| Friendship | signals, trust |
| Writing | narrative → revision → opinion (rotate) |

Mirror app missions can align to the thread but async practice still counts. Thread is parent planning lens, not a kid-facing "week 3 badge."

---

## Five engines

Practice draws from five engines (mix per week, not all every day):

| Engine | What it builds | Example |
|--------|----------------|---------|
| **Read** | Comprehension, vocabulary, mentor text | Tiger Rising passage + notice |
| **Write** | Narrative, opinion, informational | 3-sentence opinion; scene draft |
| **Reflect** | EQ, metacognition | "What was hard?" journaling |
| **Move** | Body regulation, courage | breath, power stomp (younger) |
| **Connect** | Relatedness | friendship signals; tell parent one thing |

Engines are **config tags** for future mission metadata — not five tabs in kid UI.

---

## No performative genius

Hard rules for 30-min blocks:

- No filming for praise unless the child asks.
- No comparing siblings in the block.
- No "show me how smart you are" framing.
- Celebrate **showing up** and **honest reflection**, not polish.
- Difficulty is information: "that was hard" is success data.

---

## Relation to Mirror app

| 30-min practice | Mirror app |
|-----------------|------------|
| Parent-held time box | Kid-initiated async |
| Synchronous | Anytime |
| Verbal + optional app feedback | In-app feedback + localStorage |
| Planned in this doc | Implemented in `src/` |

A child may complete a Mirror mission **during** Open Quest — that is integration, not duplication. Do not rebuild 30-min scheduling into the Vite app as a task manager.

---

## Parent receipt

After Close, parent may log one line (export or journal):

- Thread, quest, one kid quote, energy level (optional).

Feeds POS iteration and mission rewrites — not kid grades.
