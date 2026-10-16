# Tự Linh — Đấu trường triệu hồi

Vietnamese-first Chinese vocabulary battles, independently implemented with a new turn-based engine and interface. Choose Simplified Chinese, Traditional Chinese or Zhuyin first, then an HSK/TOCFL level and encounter.

Student site: **https://ssyan110.github.io/chinese-typing-game/**

## Gameplay

- Three encounters: jade guardian, moon moth and lantern sentinel. A standard duel has three rounds; endless mode continues until defeat or voluntary stop.
- Complete the visible rune to cast a selected spell. Strike builds energy; Ward spends energy to create a shield; Mend spends two energy to heal. Energy is capped at three.
- On defense turns, completing the rune blocks the enemy and counterattacks. No F/J or Space command is required. Missed deadlines cause an enemy attack. Zero HP ends the run; only replay starts at full health.
- Between rounds, explicitly select healing, more damage or a shield. There is no automatic full-health revival.
- Five seconds per rune by default, adjustable from 1–60 seconds. Pause freezes the battle. Keyboard/mouse and on-screen Zhuyin symbol buttons are available.
- Optional word-by-word results are available after victory, defeat and voluntary stop, with mistakes first. Mistake review is untimed and does not deduct HP.
- Stars for standard duels: win with ≥90% accuracy = three, ≥75% = two, otherwise one. A failed/incomplete duel gets zero. Endless and review do not receive stars. Full rules are shown in results.

## Development

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 5186 --strictPort
npm test
npm run build
npm run preview -- --host 127.0.0.1 --port 4186 --strictPort
```

The active application consists only of `src/summoner/engine.js`, `app.js`, `style.css` and the root `index.html` entry. Edit that root HTML for UI changes. `src/summoner/shell.html` is a standalone launcher for the published game, not a second app entry. Opening either HTML file directly redirects to the online game and requires Internet access; use the Vite development/preview URL for local testing. The browser uses native modules, HTML/CSS, the Canvas-free DOM arena and standard Audio; there are no inherited game-runtime imports.

`npm test` runs the independent summoner tests, including real vocabulary validation. Historical adaptation tests/scripts remain as historical development records and are not acceptance tests for this engine.

## Deployment

The `Publish student game` workflow tests and builds `main`, prepares the `/chinese-typing-game/` prefix, and deploys GitHub Pages. `scripts/stage-summoner-public.mjs` explicitly stages only vocabulary, self-hosted fonts, original audio and the refined illustrated cast. It rejects legacy game-runtime signatures. No `dist/game/` directory is published. `scripts/prepare-pages.mjs` rewrites only the build artifact; the local build stays at root.

## Data, media and provenance

- HSK: [uranbekanarbaev/hsk-3.0-vocabulary-dataset](https://github.com/uranbekanarbaev/hsk-3.0-vocabulary-dataset), syllabus 11/2025. HSK 7–9 share an advanced pool. Source rights notes are in `data/upstream/HSK-RIGHTS.md`.
- TOCFL: [ivankra/tocfl](https://github.com/ivankra/tocfl), list 07/2023. C1–C2 share one pool. This application does not represent endorsement by either examination provider or grant new rights in their data.
- Hanzi gameplay shows no pinyin. Zhuyin is derived from the supplied readings; conversion can require teacher review for particular words and regional pronunciations. Repeated labels are deduplicated within a selected mode.
- Refined character illustrations were generated specifically for this project with AI assistance. Music and effects were locally synthesized. Be Vietnam Pro is self-hosted under the included OFL font licence.
- The previous application adapted TypeGameWuxia. That runtime and adapter are now removed from the current tracked application tree, retained as an ignored local archive, and excluded from the build. Existing Git history has **not** been rewritten and still records that earlier adaptation. Rewriting the current application does not retroactively clear rights in prior distributions. See `docs/independent-rebuild-2026-10-16.md`.

No project-wide third-party licence or legal clearance is implied by this README. Local scores and settings stay in the browser and do not synchronize between devices.
