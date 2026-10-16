# Tự Linh independent rebuild — 2026-10-16

## Accepted direction

Retain Chinese typing combat, replace the inherited engine and overall experience with a newly authored fantasy summoning duel. Keep Vietnamese UI, Simplified/Traditional/Zhuyin, HSK/TOCFL vocabulary selection, adjustable time, zero-HP defeat and optional mistake-first word review.

## Active implementation boundary

The runtime imports `src/summoner/engine.js` from `app.js`. The root HTML and CSS use a new document structure and ivory/ink summoning-board layout. No legacy engine functions, adapter imports, fixed five-stage sequence, F/J defense, Space ultimate or timed three-minute scoring are used. This is an independent implementation claim based on source/build inspection, not a claim that a formally independent legal clean-room process or legal clearance has occurred.

The former `reference-game.html`, `src/reference/` and `public/game/` were removed from the Git index using `git rm --cached`; their local files remain ignored. No local archive or Git history was deleted. Historical commits remain accessible in the existing repository; any rights issue concerning the old publication must be considered separately. HSK/TOCFL data and font rights are separate from the new application code.

## New combat contract

Each normal duel has three rounds. Three encounters vary HP, counter damage and defense frequency; the moth adds a quick-answer bonus. Players select Strike, Ward or Mend and complete one visible target. Attack casts receive a counterattack if the opponent survives; defense casts block the attack and counter. Every missed rune deadline triggers 22 incoming damage. Wrong committed Hanzi costs four damage once per edited draft; wrong Zhuyin keys cost three. Shields absorb damage before HP. HP zero is terminal.

Energy starts at two, caps at three, and is rebuilt by Strike. Ward costs one, Mend two. Defeating an enemy pauses for an explicit healing/power/shield reward; remaining HP carries forward. Endless continues through rounds without a three-round win. Stopping a run saves an incomplete outcome. Review draws the actual missed source words, is untimed, has no HP damage and ends after up to ten completed targets.

The deck consumes the selected vocabulary pool before cycling, avoids an immediate cycle-boundary repeat, and deduplicates labels. HSK 7–9 and TOCFL C1–C2 remain shared levels. Hanzi practice UI never reads token pinyin. Zhuyin has all 41 physical-key equivalents on screen.

## Verification and limitations

- Twelve Node tests: engine rules, no revival, pause, draft deduplication, finite energy, defense, three-round completion, untimed review, deck coverage, all 42 language/system/level combinations, Zhuyin input lengths and independent entry/import boundary.
- `scripts/browser-summoner-check.js`: 22 UI checks, including a full three-round duel, failure by natural timed attacks, explicit retry, result review, untimed practice, three language modes, responsive layouts and full touch-button Zhuyin entry.
- `scripts/browser-summoner-edge-check.js`: 12 checks for composition crossing a timeout, pause/resume wall time, a real Ward cast, audio time progression, accessibility persistence and endless stopping.
- Browser gameplay uses visible targets and UI actions. Controlled composition events are not native macOS/Windows candidate-window acceptance. Touch buttons are tested by browser pointer clicks, not a physical mobile keyboard/Safari device.
- Source audit rejects known inherited-runtime signatures and any legacy game directory in the deployment. This verifies the implementation/build boundary, not the full legal status of source data, generated art or previous repository history.

Evidence is retained in ignored `output/summoner-*.log` and `output/playwright/summoner-*.png`. Previous adaptation playtests do not certify this new engine.

## Complete UI-driven tactical play

A separate natural-clock run of Traditional / TOCFL A1 / Lantern Sentinel used a one-second reading pause per target and actual typed characters. Ward/Strike choices and between-round rewards were clicked through the UI. It finished all three rounds with 29 different completed targets, 100% accuracy, three stars/S, 5270 points and 100 HP after shield absorption, over 38 active seconds. The counterattack mechanics were also separately verified by the no-input defeat and real Ward checks; preserved HP in this tactical run is not evidence of an inactive enemy. No HP, opponent, timer or target state was edited. Evidence: `output/summoner-natural-final-{1,2}.log`.

The first visual-effect run exposed an SVG `className` setter error. It was fixed with `setAttribute`, followed by a fresh 22-check browser pass and a clean full tactical run. An earlier player-driver attempt also tried to click submit behind the reward dialog after auto-completion; the driver was corrected to respect the actual reward state. Neither failed attempt is counted as passing evidence.
