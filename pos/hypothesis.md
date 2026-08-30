# Hypothesis — H0 capability ports behind thin shell

## H0

Capabilities live behind one thin PWA shell **iff** each package exposes **public ports only** (`commands`, `queries`, `events`), contract tests fail on cross-imports and sibling-store access, and shell only wires + mounts UI.

HTTP vs in-process is a swap behind the same port surface. **No HTTP extraction this week.**

## Cheapest kill

If proof imports plays internals or a shared god-store exists, **H0 is dead**.

## Test (`scripts/evidence-check.mjs`)

- Cross-import: `proof` does not import `@wickedsmark/plays` or `plays/src/catalog`
- Dexie: `wickedsmark-plays-v1` ≠ `wickedsmark-proof-v1`
- Banned wheels absent (idb, googleapis, serwist, …)
- `npm run build` exit 0

## Observation (2026-08-30)

```
EVIDENCE-CHECK: exit 0 — H0 live (in-process ports, Dexie isolation)
```

Proof capture uses only `{ dayId, playId }` from shell props — zero imports from plays package.

## Verdict

**H0 LIVE** — honest modular monolith with extractable ports. Not claiming microservices.
