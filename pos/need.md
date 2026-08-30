# Need — wickedSmart PWA (program card)

**Status:** slice-1 **proven** (evidence-check exit 0, live URL)  
**Surface:** 30-min practice / parent OS — not Cognitive Mirror  
**Proven stamp this week:** `apps/pwa` + `packages/plays` + `packages/proof` only

## Job

Ayaan opens a PWA this week, finishes **one real play**, leaves a **proof artifact**, can close the tab. Parent does not babysit the stack.

## Success

- Cold HTTPS URL → installable PWA (Add to Home Screen).
- Kid path: **offline, no login**, local write is source of truth.
- One play completed; proof written to proof contract (IndexedDB outbox).
- `npm run evidence-check` exit 0 on play+proof slice.
- Repeat open → plays visible in <1s (V1 SLO).

## Kill

- Perceived effort after open; lecture/task UI.
- **Login wall on first open** (anonymous kid is the happy path).
- Shell contains domain logic.
- Any capability imports another's **internals** or reads sibling IndexedDB.
- Proven = button count or folder count (not receipts).
- Kid waits on Google Drive to complete a play.
- Word **exercise** in kid or parent UI.
- Claiming "microservices" without contract + isolated failure + replaceable impl.

## Boundary

- This week: **one Origin static HTTPS deploy**, one PWA bundle.
- Growth: extract packages without rewrite; **no HTTP extraction this week**.
- Diary / drive / clock-as-service / identity = **later slices** — may exist as contracts, not proven stamp.
- POS is **build-time**, not runtime kid UI.

## Done (checkable)

| # | Check | Receipt |
|---|-------|---------|
| 1 | Three program cards frozen | `pos/need.md`, `pos/context.md`, `pos/hypothesis.md` |
| 2 | Kid completes 1 play | plays completion boolean persisted |
| 3 | Proof artifact written | proof outbox entry `{dayId, playId, proofId}` |
| 4 | Contract tests pass | `scripts/evidence-check.mjs` exit 0 |
| 5 | Build green | `npm run build` exit 0 |
| 6 | Live URL | HTTPS deploy receipt |

## Reliability law (kid path wins)

- Local truth beats Drive. Drive is replica behind proof outbox (later).
- Day id = only time concept: `today = calendar date of (instant − 3h) in Asia/Seoul`.
- No shared `store.ts`. One store per package.
