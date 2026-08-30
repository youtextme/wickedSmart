# wickedSmart

Kid story game — **6–7 short plays a day** (~10 min each), proof you showed up. No login. Local truth first.

**Live:** https://youtextme.github.io/wickedSmart/

## Kid path

1. **Game title** — particles, ambient loop (first tap), one **Go** button
2. **One beat at a time** — tap **Next** through a short scene; tap gold words for meaning + voice
3. **Proof** — record or pick a video/photo at the end of each play
4. **Break or next** — two choices; resume remembers the exact beat on refresh
5. **Parent corner** — small ◎ icon (not kid-facing scores)

## Architecture (packages with ports)

```
apps/pwa/              shell: KidPath, wire ports only
packages/clock/        today() → dayId (Intl, Seoul −3h)
packages/plays/        week bank + beats + completion (Dexie)
packages/proof/        capture → outbox (Dexie)
```

POS: `pos/need.md` · `pos/context.md` · `pos/hypothesis.md`

## Run locally

```bash
npm install
npm run dev          # http://localhost:4317
npm run build
npm run evidence-check   # contract + build gate (exit 0 = proven)
```

## Install (iPhone / Android)

1. Open https://youtextme.github.io/wickedSmart/
2. **iPhone:** Safari → Share → **Add to Home Screen**
3. **Android (Chrome):** Menu or install banner → **Install app**

## kid-day

`dayId = Seoul calendar date of (now − 3 hours)`. Computed on open — no cron, no push.

## Wheels

vite-plugin-pwa + Workbox · Dexie 4 · Intl kid-day · Web Speech (glossary voice)

## Proven stamp

shell + plays + proof — beat resume in Dexie, proof in proof Dexie, `evidence-check` exit 0.
