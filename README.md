# Đấu Trường Hán Tự — Đấu trường triệu hồi

Vietnamese-first Chinese vocabulary battles, independently implemented with a new turn-based engine and interface. Choose Simplified Chinese, Traditional Chinese or Zhuyin first, then an HSK/TOCFL level and encounter.

Student site: **https://ssyan110.github.io/chinese-typing-game/**

## Story journey: walking into the original battles

The full eight-stop journey follows the red panda from Thanh Hòa village through bamboo woodland, a river harbor, red sandstone canyon, mountain academy, snowy pass and ancient city, then home to a lantern festival. Each stop has its own matte 3D environment, with visible walking followed by the original Duel typing battle. The first eight existing curriculum chapters supply the vocabulary. All story and UI text is Vietnamese. Existing chapter victories unlock the route; original vocabulary progress, rewards, timing and saves remain authoritative. The map offers a single continue button and lets players revisit the ending after completing the journey.

Every regular vocabulary chapter uses one of the eight environments; chapters beyond the story remain fully playable, with the same exhaustive vocabulary coverage. The legacy three-stop task-engine save format stays readable for compatibility, but delivery puzzles and alternate typing tasks are not part of the live game.


## Gameplay

- Before a Hanzi battle, **Thử nhập 3 từ** offers an optional untimed input-method tutorial. It does not change chapter progress. Incorrect battle submissions show the target and entered text with differing characters underlined.
- After at least 24 hours, **Nhớ lại … từ đã luyện từ hôm trước** offers up to five pinyin-to-Hanzi recall questions from the selected vocabulary pool and local successful-answer history. Answers stay hidden until requested. Hints, corrections and alternative homophones do not credit independent recall of the target word. Clean recall postpones that word for another 24 hours. Results share the existing atomic save, history and JSON backup, without unlocking chapters. This measures reading-to-character recall, not vocabulary meaning; Vietnamese definitions and dictation are not included. The exercise is available for Simplified and Traditional modes. Deleting the relevant history also removes its scheduling evidence; history retains at most 128 sessions.
- Voluntarily stopped runs show the words practiced and needing review without a failure rank or zero-star graphic. Vocabulary loading times out after 45 seconds and offers a direct retry button.

- The first curriculum chapter contains 15 distinct words (30 presentations); subsequent chapters contain at most 20 (40 presentations, with a shorter final remainder). Every source word remains represented exactly once in the chapter catalog.
- Finite challenges use two shuffled passes. A wrong answer or timeout schedules at most one additional presentation per word, including when the additional attempt is wrong. Correcting an answer counts as practice. Timeouts advance the queue but do not count as correct answers. After the capped queue finishes, any word with fewer than two correct answers leaves the run unfinished and is available in mistake review; it never creates an infinite repetition loop. Otherwise the final answer defeats the opponent regardless of remaining HP.
- Partial correct-answer counts persist by word identity and script/system. Continue resumes only remaining practice with proportional monster HP and a visible remaining-turn label. Old two-answer practice is credited under the new rules, old completions remain intact, and previously won chapter vocabulary is recognized across the new chapter boundaries. Replaying a completed chapter or starting free play always uses the complete word set.
- Three encounters: jade guardian, moon moth and lantern sentinel. Free play selects at most 20 words with the same two-pass and single-extra-attempt rules; endless mode continues until defeat or voluntary stop.
- Complete the visible rune to cast a selected spell. Strike builds energy; Ward spends energy to create a shield; Mend spends two energy to heal. Energy is capped at three.
- On defense turns, completing the rune blocks the enemy and counterattacks. No F/J or Space command is required. Missed deadlines cause an enemy attack. Zero HP ends the run; only replay starts at full health.
- Every ten correct finite-challenge answers, explicitly select healing, more damage or a shield. Supplies are labeled as a mid-battle break, keep the same opponent HP and resume input focus. No supply interrupts the final answer.
- Six seconds per rune for new players by default (existing saved settings are preserved), adjustable from 1–60 seconds. Pause freezes the battle. Keyboard/mouse and on-screen Zhuyin symbol buttons are available.
- Phone challenges open a central **Bắt đầu** dialog before timing starts. Background controls are inert until the student starts or returns to chapter selection. Starting closes the dialog and focuses Hanzi input in the same tap. After an explicit pause, **Tiếp tục** resumes directly; a supply choice also resumes directly. Prepare the Chinese input method before starting. The compact keyboard layout keeps HP, the target, answer feedback and input visible; small phones use a reflowed Zhuyin touch grid without changing physical key mappings.
- Optional word-by-word results are available after victory, defeat and voluntary stop, with mistakes first. Mistake review is untimed and does not deduct HP.
- Results distinguish typing accuracy (`correct / (correct + errors)`) from the rating ratio (`correct / (correct + errors + timeouts)`). With 30 correct, no errors and three timeouts these are 100% and 91%; existing star/rank rules and saved records are preserved. Distinct vocabulary and successful input counts are labeled separately, with errors and timeouts in separate table columns.
- Stars for standard duels and curriculum chapters: win with ≥90% rating ratio = three, ≥75% = two, otherwise one. A failed/incomplete run gets zero. Endless and review do not receive stars. Full rules are shown in results.

The top menu opens **Lịch sử trên máy**: local session results, word details, dates, course/chapter links, and a visible storage notice. Up to 128 recent sessions are stored locally, with no cloud sync. See `docs/practice-and-motion-2026-10-17.md` for behavior and validation.

Progress, partial practice and history now save together in one atomic browser record. One tab holds the write lock; other tabs show a notice and cannot start a conflicting run. Close the active tab and return to the other one to continue. Existing browser saves migrate without deleting the original keys. History also offers a downloadable JSON backup and validated restore with an explicit replacement preview. Reopening the page resumes saved word practice, rather than restoring an exact in-progress combat turn. Current browsers with Web Locks support are required for safe saved play.

The home screen offers the last selected course, and timing controls appear before chapter browsing. Mistake review covers every selected word, including sets larger than ten.

## Local combat-art preview

The battle hero is an articulated Three.js lantern red panda with independently animated limbs, face, ears, tail and lantern. It uses no cropped character images or action atlas. Remotion shares this deterministic scene. The homepage and journey use renders of the same rounded 3D cast and dioramas; the existing external social cover retains its earlier illustration. See [hero implementation and validation](docs/lantern-panda-2026-10-17.md).

## Development

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 5186 --strictPort
npm test
npm run build
npm run preview -- --host 127.0.0.1 --port 4186 --strictPort
npx playwright install chromium
npm run test:browser
```

The active application uses `src/summoner/engine.js`, `curriculum.js`, `app.js`, `mobile.js`, `style.css`, `arena-layout.css`, `mobile.css` and the root `index.html` entry. Edit that root HTML for UI changes. `src/summoner/shell.html` is a standalone launcher for the published game, not a second app entry. Opening either HTML file directly redirects to the online game and requires Internet access; use the Vite development/preview URL for local testing. The browser uses native modules, HTML/CSS, the DOM arena with a lazily loaded scene with an articulated 3D hero and 3D opponents/effects and browser-native feedback and standard Audio; there are no inherited game-runtime imports.

Phone/tablet play has touch controls beside the arena, landscape layout, safe-area padding and a visual-viewport layout for Chinese software keyboards. Rotation preserves the current duel and all existing curriculum progress. See `docs/mobile-2026-10-16.md` and `docs/device-ux-2026-10-21.md` for device sizes, result definitions, checks and physical-device limitations.

`npm test` runs the independent summoner tests, including real vocabulary validation. Historical adaptation tests/scripts remain as historical development records and are not acceptance tests for this engine.

`npm run test:browser` is the maintained browser acceptance suite. It builds and serves the production game under `/chinese-typing-game/`, then checks desktop campaigns in all three modes, phone input/readiness/rotation, simulated native keyboard sizes, complete mistake review, save ownership, backup/restore and returning-course navigation. CI runs this before publishing. For local installed Chrome, use `PLAYWRIGHT_CHANNEL=chrome npm run test:browser`; `PLAYWRIGHT_BASE_URL` can target an already running local server. Browser keyboard fixtures do not establish physical iOS/Android IME acceptance.

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

Earlier model studies are documented in [the sculpted-character notes](docs/sculpted-combat-2026-10-17.md). The selected red-panda hero supersedes the procedural human and fox previews.

Shared product icons, color tokens, accessibility behavior and final visual audit are documented in [the product design system](docs/product-design-system-2026-10-17.md).
