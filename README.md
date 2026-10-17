# Đấu Trường Hán Tự — Đấu trường triệu hồi

Vietnamese-first Chinese vocabulary battles, independently implemented with a new turn-based engine and interface. Choose Simplified Chinese, Traditional Chinese or Zhuyin first, then an HSK/TOCFL level and encounter.

Student site: **https://ssyan110.github.io/chinese-typing-game/**

## Gameplay

- The main curriculum partitions the entire selected vocabulary pool into chapters of at most 20 items. Earlier levels are included by default. Every chapter is accessible, including the final partial chapter; there is no fixed limit of three encounters on vocabulary coverage.
- New challenges require three successful presentations per remaining word, with shuffled passes, plus zero enemy HP. Timeouts return to the queue. Partial repetition counts save immediately, even before defeat, quitting or reloading; continue resumes unfinished practice. Existing one-pass completions remain intact and are identified as legacy in history. Progress is separate for Simplified, Traditional and Zhuyin, and for HSK/TOCFL. The optional catalog shows every chapter's actual words and completion state.
- Three encounters: jade guardian, moon moth and lantern sentinel. Free play selects at most 20 words and uses the same three-practice guard; endless mode continues until defeat or voluntary stop.
- Complete the visible rune to cast a selected spell. Strike builds energy; Ward spends energy to create a shield; Mend spends two energy to heal. Energy is capped at three.
- On defense turns, completing the rune blocks the enemy and counterattacks. No F/J or Space command is required. Missed deadlines cause an enemy attack. Zero HP ends the run; only replay starts at full health.
- Every five correct finite-challenge answers, explicitly select healing, more damage or a shield. There is no automatic full-health revival.
- Five seconds per rune by default, adjustable from 1–60 seconds. Pause freezes the battle. Keyboard/mouse and on-screen Zhuyin symbol buttons are available.
- Optional word-by-word results are available after victory, defeat and voluntary stop, with mistakes first. Mistake review is untimed and does not deduct HP.
- Stars for standard duels and curriculum chapters: win with ≥90% accuracy = three, ≥75% = two, otherwise one. A failed/incomplete run gets zero. Endless and review do not receive stars. Full rules are shown in results.

The top menu opens **Lịch sử trên máy**: local session results, word details, dates, course/chapter links, and a visible storage notice. Up to 128 recent sessions are stored locally, with no cloud sync. See `docs/practice-and-motion-2026-10-17.md` for behavior and validation.

## Local 3D animation prototype

The current working branch replaces picture deformation with hierarchical 3D actors. Remotion Studio and the interactive action study share the same scene code. This changes the character style to cartoon 3D and has **not been deployed over the live illustrated version**. See `docs/three-combat-prototype-2026-10-17.md` for preview links, setup, checks and limitations.

## Development

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 5186 --strictPort
npm test
npm run build
npm run preview -- --host 127.0.0.1 --port 4186 --strictPort
```

The active application uses `src/summoner/engine.js`, `curriculum.js`, `app.js`, `mobile.js`, `style.css`, `arena-layout.css`, `mobile.css` and the root `index.html` entry. Edit that root HTML for UI changes. `src/summoner/shell.html` is a standalone launcher for the published game, not a second app entry. Opening either HTML file directly redirects to the online game and requires Internet access; use the Vite development/preview URL for local testing. The browser uses native modules, HTML/CSS, the DOM arena with a lazily loaded solid 3D character scene and browser-native feedback and standard Audio; there are no inherited game-runtime imports.

Phone/tablet play has touch controls beside the arena, landscape layout, safe-area padding and a visual-viewport layout for Chinese software keyboards. Rotation preserves the current duel and all existing curriculum progress. See `docs/mobile-2026-10-16.md` for device sizes, checks and physical-device limitations.

`npm test` runs the independent summoner tests, including real vocabulary validation. Historical adaptation tests/scripts remain as historical development records and are not acceptance tests for this engine.

## Deployment

The `Publish student game` workflow tests and builds `main`, prepares the `/chinese-typing-game/` prefix, and deploys GitHub Pages. `scripts/stage-summoner-public.mjs` explicitly stages only vocabulary, self-hosted fonts, original audio and the refined illustrated cast. It rejects legacy game-runtime signatures. No `dist/game/` directory is published. `scripts/prepare-pages.mjs` rewrites only the build artifact; the local build stays at root.

## Data, media and provenance

- HSK: [uranbekanarbaev/hsk-3.0-vocabulary-dataset](https://github.com/uranbekanarbaev/hsk-3.0-vocabulary-dataset), syllabus 11/2025. HSK 7–9 share an advanced pool. Source rights notes are in `data/upstream/HSK-RIGHTS.md`.
- TOCFL: [ivankra/tocfl](https://github.com/ivankra/tocfl), list 07/2023. All spellings from each source row's `Variants` field are imported, including 妳 and 她; the original 7,517 rows expand to 7,848 entries before display-string deduplication. C1–C2 share one pool. This application does not represent endorsement by either examination provider or grant new rights in their data.
- Hanzi gameplay shows no pinyin. Zhuyin is derived from the supplied readings; conversion can require teacher review for particular words and regional pronunciations. Identical Hanzi labels are practiced once; Zhuyin keeps different words with the same pronunciation as separate items. The previously unsupported HSK 嗯 reading uses [MOE's ˙ㄣ](https://dict.concised.moe.edu.tw/dictView.jsp?ID=39854) for Zhuyin practice.
- Tiếng Hoa HAHA is the publisher brand, paired with the game name Đấu Trường Hán Tự. The existing circular brand logo, readable HA favicon and 1200×630 social cover are in `public/original/brand/`. See `docs/branding-2026-10-17.md` for provenance and checks. The arena fills the browser and offers native full screen where supported. See `docs/curriculum-and-arena-2026-10-16.md` for coverage counts and verification.
- Refined character illustrations were generated specifically for this project with AI assistance. Music and effects were locally synthesized. Be Vietnam Pro is self-hosted under the included OFL font licence.
- The previous application adapted TypeGameWuxia. That runtime and adapter are now removed from the current tracked application tree, retained as an ignored local archive, and excluded from the build. Existing Git history has **not** been rewritten and still records that earlier adaptation. Rewriting the current application does not retroactively clear rights in prior distributions. See `docs/independent-rebuild-2026-10-16.md`.

No project-wide third-party licence or legal clearance is implied by this README. Local scores and settings stay in the browser and do not synchronize between devices.
