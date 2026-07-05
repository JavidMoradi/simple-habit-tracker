# Simple Habit Tracker

A single-page habit tracker. Pick a day on a calendar and mark how well
you kept up a habit — no backend, no login, no database. Everything is
stored in your browser's `localStorage`.

## Features

- **Calendar tracking** — click any day to cycle it through:
  Green (accomplished) → Yellow (partial) → Red (missed) → clear.
- **Month view** — the current month by default, with `‹` `›` arrows to
  browse other months. Every month renders at the same size.
- **Annual view** — all 12 months of a year at a glance, with `‹` `›`
  arrows to look back at previous years (capped at the current year).
- **Today button** — jumps the active view back to the current
  month/year.
- **Multiple habits** — use the dropdown in the navbar to switch
  between habits, add a new one, or remove the selected one (at least
  one habit always remains). Each habit keeps its own independent
  progress.
- **Streak badge** — a 🔥 counter next to the habit dropdown showing
  the current habit's consecutive-day streak, in the same spirit as
  Duolingo's streak (any tracked day keeps it alive, and it stays lit
  until a day actually passes with no activity).
- **Persistence** — habits and all tracked progress are saved to
  `localStorage` automatically and reloaded the next time you open the
  app.

## Tech stack

- [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- Plain CSS (no framework)
- [oxlint](https://oxc.rs/) for linting

## How to run

```bash
npm install
npm run dev
```

Then open the printed local URL (e.g. `http://localhost:5173`) in your
browser.

Other scripts:

```bash
npm run build    # production build, output to dist/
npm run preview  # preview the production build locally
npm run lint     # run oxlint
```
