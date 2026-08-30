# Context — wickedSmart slice 1

Verified reuse table (AI Research, 2026-08-30). **Use these wheels. Do not invent replacements.**

## MUST USE

| Layer | Wheel | License | Our use |
|-------|-------|---------|---------|
| PWA | [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) + **Workbox 7** | MIT | `apps/pwa` — config / `injectManifest` only. No hand-written SW. |
| Install UI | [@khmyznikov/pwa-install](https://www.npmjs.com/package/@khmyznikov/pwa-install) | MIT | `<pwa-install>` in shell. `beforeinstallprompt` is Chromium-only — **no polyfill**. |
| Icons | [@vite-pwa/assets-generator](https://github.com/vite-pwa/assets-generator) | MIT | Generate manifest icons from source art. |
| Local store | **Dexie 4** | Apache-2.0 | One Dexie DB **name per package** (`wickedsmark-plays-v1`, `wickedsmark-proof-v1`). Tables only via that package's public port. **No shared god Dexie.** |
| Drive OAuth | GIS CDN `accounts.google.com/gsi/client` | — | Scope **`drive.file` ONLY**. Slice 2+. |
| Drive upload | Thin `fetch` → `/upload/drive/v3/files` | — | Resumable if &gt;5MB. App creates `WickedSmart` folder. No Drive picker. |
| Capture | `<input type="file" accept="image/*" capture="environment">` | — | File → proof Dexie. Optional [compressorjs](https://github.com/fengyuanchen/compressorjs) later. |
| Share | `navigator.share` / `canShare({files})` | — | Diary slice 2+. Hide if missing. **No share polyfill.** |
| kid-day | `Intl.DateTimeFormat` `timeZone: 'Asia/Seoul'` | — | `kid-day = Seoul calendar date of (now − 3h)`. **Never +9 offset hack.** No node-cron. No moment. |

## KILL (do not add)

Serwist dual-stack · `googleapis` / `google-auth-library` in browser · `gapi` npm · PWABuilder runtime · `pwacompat` · `@pwabuilder/pwainstall` · **localforage** · **custom IDB wrapper** · **idb** (use Dexie) · recordrtc · idb-file-storage · day-boundary · Capacitor camera · Notification Triggers for day-id · **event bus** · HTTP microservices this week

## Contracts we write only

| Contract | Owner |
|----------|-------|
| Per-package Dexie table schemas | `plays`, `proof` |
| Drive folder `WickedSmart` + path `{dayId}/{playId}/{proofId}` | `drive` (stub) |
| `today()` kid-day fn | `clock` |
| PWA `injectManifest` + iOS online replay (later) | `apps/pwa` — **outbox stays in proof Dexie** (no dual source of truth) |

**3am while app closed is NOT a PWA cron.** Day-id computed on open. No push to refresh plays.

## Do NOT build

- HTTP microservices, rollover cron, quota service, LLM wrapper, sync engine, CMS, auth platform.
- [whatsapp-connector](https://github.com/youtextme/effortless) — not wired until parent ping is a real Need.
- dailyAutomations / WhatsApp Desktop CDP.

## Play content sources

| Repo | Fit | Status |
|------|-----|--------|
| [youtextme/growth-mindset-reader](https://github.com/youtextme/growth-mindset-reader) | story + 1-min do + tick-done | [unverified] — pattern in `packages/plays/src/catalog.ts` |
| [youtextme/600](https://github.com/youtextme/600) | daily 600-word reader | [unverified] — future slot |
| [youtextme/prompt-to-video](https://github.com/youtextme/prompt-to-video) | prompt→short video | not slice 1 |
| [youtextme/willdo](https://github.com/youtextme/willdo) | family task | not slice 1 |

## Layout (one repo, one static HTTPS)

```
apps/pwa/           composition: PWA install, SW, wire ports, hide diary from kid
packages/clock/     today() → dayId
packages/plays/     7-day catalog + completion (Dexie)
packages/proof/     capture → proofId + outbox (Dexie)
packages/diary/     stub — read model later
packages/drive/     stub — drive.file adapter later
packages/identity/  stub — optional parent Google later
```

## Shell owns

PWA install · SW registration · port wiring (commands/queries/events, **no bus**) · kid never sees diary · **no login wall**

## Shell must NOT own

Day math · play selection · proof bytes · Drive paths · parent scan logic

## Port wiring (frozen)

```
clock.today() → plays.forDay(dayId)
plays.complete → PlayCompleted { dayId, playId }
proof.capture → ProofCaptured { proofId, playId, dayId }  // async; UI never waits Drive
```

## Failure modes

- Browser TZ: kid-day locked via `Intl` + Seoul; device skew documented in README.
- Offline: kid writes always succeed; Drive parent-only pending.
- No Google: local Dexie is truth.
- Tab kill: proof outbox survives in proof Dexie.
- Stale SW: version catalog; never cache outbox API responses.

## Proven stamp this week

`apps/pwa` + `packages/plays` + `packages/proof` — one play completed, proof in proof Dexie, installable URL, `npm run evidence-check` exit 0.
