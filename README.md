# wickedSmart

Kid PWA — **3 plays a day**, proof you showed up. No login. Local truth first.

**Live:** https://youtextme.github.io/wickedSmart/

## Architecture (not microservices — ports)

One static PWA bundle. Capabilities are **packages with public ports**, extractable later without rewrite.

```
apps/pwa/              shell: PWA install, wire ports only
packages/clock/        today() → dayId (Intl, Seoul −3h)
packages/plays/        7×3 catalog + completion (Dexie)
packages/proof/        capture → outbox (Dexie)
packages/diary/        stub (slice 2)
packages/drive/        stub (drive.file adapter)
packages/identity/     stub (parent Google later)
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
3. **Android (Chrome):** Menu or install banner → **Install app** / Add to Home Screen

## kid-day

`dayId = Seoul calendar date of (now − 3 hours)`. Computed on open — no cron, no push.

## Wheels (see pos/context.md)

vite-plugin-pwa + Workbox · @khmyznikov/pwa-install · Dexie 4 · Intl kid-day · Web Share (diary later) · GIS drive.file (drive later)

## Proven stamp (slice 1)

shell + plays + proof — one play completed, proof in proof Dexie, `evidence-check` exit 0.
