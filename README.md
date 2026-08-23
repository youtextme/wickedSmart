# Powerful Kids

Companion apps kids love — exercise-based learning that builds grit, growth mindset, calm confidence, and emotional intelligence. Not lectures. Not preaching. Real practice.

**Future GitHub mirror:** `wickedSmart`

## Product vision

Powerful Kids is config-driven so each child gets a personalized experience. Girish's kids (Ayaan and younger sibling) are the first users — their in-app feedback is treated as product telemetry that drives iteration.

### First users

| Profile | Age | Mode | Focus |
|---------|-----|------|-------|
| **Ayaan** | ~10, 4th grade (Ms. Luz) | Practice | Literacy with *The Tiger Rising*; narrative, informational, and opinion writing |
| **Little Explorer** | ~3 | Play | Play-first shell — architecture ready for full toddler content |

## What's in this MVP

- **Kid home** — speaks to each child as capable; brand: Powerful Kids
- **8 practice missions** for Ayaan — Tiger Rising–inspired exercises (feelings, courage, friendship, revision, narrative + opinion writing)
- **3 play missions** for younger sibling — power stomp, brave breath, feelings faces
- **Feedback loop** — after each mission + dedicated Feedback tab (how it felt, hard/fun, free text, more/less like this)
- **Parent insights** — completions, all feedback, JSON export
- **Progress** — power-practice streak language, never shame
- **Config-driven** — child profiles and missions live in `src/config/`

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

## How feedback feeds iteration

Every mission completion and feedback entry is saved to `localStorage` with:

- `missionId`, `childId`, timestamp
- Feeling rating (1–5)
- What was hard / fun
- Free text
- More like this / less like this flags

Parents can export all data as JSON from the **Parent** tab. This prototype treats kid voice as customer feedback — use it to decide which missions to expand, cut, or remix.

## Project structure

```
src/
  config/       # Child profiles + missions (edit here to customize)
  storage/      # localStorage persistence
  context/      # App state
  components/   # UI building blocks
  pages/        # Kid home, mission flow, feedback, parent view
```

## Origin / GitHub setup

Create a private Origin repo named `powerful-kids` (or mirror to GitHub as `wickedSmart`):

```bash
origin repo create powerful-kids
git remote set-url origin https://origin.cursor.com/youtextme/powerful-kids.git
git push -u origin main
```

## License

Private — family prototype.
