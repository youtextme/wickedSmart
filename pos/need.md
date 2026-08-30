# Need — wickedSmart PWA (program card)

**Status:** slice-1 **proven** · slice-2 **in progress** · **reliability + opener** on PR #4

**Surface:** 30-min practice / parent OS — not Cognitive Mirror

---

## Opener fix — 4-choice first beat (2026-08-30)

### Job

After **Go**, first beat is **4 tap choices + voice** — not a paragraph with Tap Next. Wrong pick still advances: show + speak the right line, then **Next**.

### Success

| # | Check |
|---|-------|
| 1 | `beatsForPlay` day opener = `kind: 'choice'` with 4 options |
| 2 | Pick speaks label; wrong pick reveals `revealText` (visible when muted) |
| 3 | **Next** only after a pick |
| 4 | `evidence-check` exit 0; no **exercise** in kid UI |
| 5 | `favicon.ico` present; glow `pointer-events: none` |

### Kill

- Go → unexplained reading wall; Tap Next before any choice; **exercise** in kid UI.

### Boundary

- Day-0 opener only. Story paragraphs follow after choice beat.

---

## Reliability fix — one-tap Go + real favicon (2026-08-30)

### Job

Kid taps **Go** once → story beat appears. Tab icon is a readable gold **W**, not a navy blob. `favicon.ico` ships with deploy.

### Success

| # | Check |
|---|-------|
| 1 | `.title-glow` (and sibling glows) do not intercept pointer events |
| 2 | Playwright: real `.go-btn` click → 4 `.beat-choice` buttons; Next after pick |
| 3 | `favicon.ico` + PNG/SVG present in `apps/pwa/public/` |
| 4 | `evidence-check` exit 0 |
| 5 | GitHub Pages `/wickedSmart/` 200; `/wickedSmart/favicon.ico` 200 after merge |

### Kill

- New stack; **exercise** in kid UI; fake-ready without beat transition evidence.

### Boundary

- CSS + static assets + day-opener choice beat. No full catalog rewrite.

---

## Slice 1 (frozen — do not break)

**Job:** Finish one real play, leave proof, close tab. No login. `evidence-check` exit 0.

**Proven:** https://youtextme.github.io/wickedSmart/ · ports + Dexie isolation · shell+plays+proof

---

## Slice 2 — game map + 6–7 short plays/day (~15 min each)

### Job

Game-world home (quest map). **6–7 small plays per day**, each ~15 min — quick jobs, stacked wins. Stateful routes + resume. Volume is week/month trajectory, not one sitting.

### Success

- Map with rooms; complete lights next; Continue = last unfinished room.
- Mix engines: read/write stretch, research, question+tools, presence, people, agency.
- Autosave drafts; refresh resumes route + step + drafts.
- `evidence-check` exit 0; no **exercise** in kid UI.

### Kill

- Homework card list; 1000-word wall in one play; fancy UI; lost state on refresh.

### Done (slice 2)

| # | Check |
|---|-------|
| 1 | Map home ships |
| 2 | Refresh-resume works |
| 3 | 21 plays with named skills |
| 4 | evidence-check exit 0 |
| 5 | GitHub Pages redeployed |

### Boundary

- Keep packages/ports. Drafts in plays Dexie. Diary/Drive stubs. No CMS. No kid login.

---

## Reliability law (unchanged)

- Local truth · `clock.today()` Seoul now−3h · one Dexie DB per package · proof never waits Drive
