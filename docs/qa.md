# Current adaptation QA — 2026-10-15

This report applies to the adaptation of the original TypeGameWuxia, not to the superseded illustrated prototype. Earlier prototype screenshots and logs under `output/` are historical.

## Source fidelity

- Preserved the retrieved original HTML/CSS/JavaScript in `reference-game.html`.
- Downloaded the game's original character PNG frames, monster GIFs, pixel scene backgrounds, textures, icons, effects, audio and title font. All 109 files have source URLs, sizes and SHA-256 hashes in `data/upstream/game-asset-manifest.json`.
- The build translates UI/story strings and layers the practice selector and dictionary/IME bridges onto the original runtime. It does not substitute the previous prototype's combat engine.
- Original mechanics retained: falling moving runes with three-hit charge, timed cloud jump/F/J guard, incoming projectiles with three-hit shield counter, word combo combat, multi-phase boss with guard/counter windows/ultimate, endless boss cycles, adaptive difficulty, original character animation and effects.
- The first three Hanzi stages route IME words to the original object/key handlers. Stage-two Hanzi entry allows at least 8 seconds plus one second per displayed character, while the original guard timing is unchanged. Zhuyin retains original physical-key drills in the first three stages.
- The original Chinese logo lettering is replaced with a Vietnamese gold/serif wordmark. Scene artwork and characters are unchanged.

## Automated checks

- `npm test`: six current data/asset tests. Full HSK/TOCFL counts, source bands and unique IDs; script-form separation; every generated Zhuyin/key mapping; manifest counts and one unsupported pronunciation; SHA-256 verification of every reference asset.
- `node --check public/game/runtime.js`: generated runtime syntax.
- `npm run build`: production build, with asset URLs rooted at `/game/` so extracted CSS can resolve backgrounds and fonts.
- `npm audit --audit-level=high`: zero reported vulnerabilities.
- `scripts/browser-reference-smoke.js`: Playwright CLI scenario against the built preview on port 4186. See `output/browser-reference-smoke.log` and the assertion summary for actual executed results.

Browser scope includes selecting mode before menu, choosing HSK/TOCFL, entering the original map, playing all five original mechanics through UI input, testing all three writing modes, pause, supplementary practice, endless boss, local assets and absence of requests to the original leaderboard. It accelerates the remaining stage timer only for the result/record path; that accelerated check does not mean a full three-minute playthrough was observed.

The scenario simulates DOM composition events to confirm that Chinese preedit is not judged. It also enters actual physical key sequences through the browser keyboard API for Zhuyin and F/J defense. This is not actual OS IME candidate-selection testing.

## Visual and copy review

Screenshots under `output/playwright/reference-style-*.png` show the current selection, level, original title/menu, original five-card map, the five original scenes, results and mobile setup. Desktop review uses 1440×1000; mobile setup review uses 390×844. The previous mint/paper interface is no longer the active app.

Vietnamese instructions explicitly name the input method and action: use English input for physical Zhuyin keys, use the Chinese IME for Simplified/Traditional targets, type the word on an actual moving rune/projectile, and press the requested F or J during guard. Hanzi row-stage action chips and objectives refer to word input rather than calling them Zhuyin drills. Vocabulary pronunciation hints are labeled “Phiên âm”.

Reader review follows the visible flow without chat context: choose content, choose vocabulary, enter game, choose stage, follow its target/defense prompts, review the original result screen. This is an author/reader comprehension check, not student testing.

## Remaining acceptance limits

- Native macOS/Windows/phone IME candidate selection and Safari are untested.
- Mobile setup has layout coverage; the original keyboard-intensive battle UI needs real-device playtesting. Desktop keyboard play remains the primary experience.
- Automatic Traditional/phonetic conversions have not received line-by-line teacher review. See vocabulary source notes for the unsupported HSK pronunciation and source-edition limits.
- Original gameplay timing/balance and learning usefulness have not been accepted in a classroom. The local adaptation is not externally deployed.
- The original author's leaderboard and itch runtime are disabled. Records remain local and are separated by content/level/cumulative selection.

## Executed browser result

The production-preview scenario passed **33 assertions**, including both cloud-charge/guard cycles. `output/browser-reference-results.log` records the exact assertion list. No app runtime errors, missing local asset responses, original-author leaderboard requests or itch runtime requests were observed. The six current automated data/asset tests also passed. These results replace the earlier prototype's 8/31 figures.

## Input and combat-clarity fix — 2026-10-15

A targeted browser regression reproduced the reported prefix failure: committing 水 immediately consumed the 水 rune and cleared the field, preventing the second committed character 果 from completing 水果. The old header also advertised the whole row key-to-word bank, including words without a live object. The previous browser smoke only filled complete strings, so it missed the per-character commit case.

`src/reference/input-state.js` now owns input classification. A committed prefix waits; an ambiguous complete short word requires Enter or the visible “Xuất chiêu” button. A known inactive/expired word is not scored as incorrect. Composition and Latin preedit remain unjudged. The failing pre-fix log and passing post-fix log are `output/input-regression-before.log` and `output/input-regression-after.log`.

Character-mode rune/projectile stages now have one active word at a time, with an 8 + 2 × character-count second travel window (capped at 18 seconds). The top board displays only the live recommended target and pronunciation. Physical Zhuyin retains the original object density, with one recommended target highlighted. Rune/projectile DOM nodes are reused across animation frames; this was checked by node identity, with no FPS improvement claim.

HP bars now have Vietnamese labels in the top HUD and numeric plates near both fighters. Real damage calls produce numeric −HP feedback, a lost-health trail, a contextual message and player-edge feedback. Low player HP has persistent text and styling. Opponent HP remains numeric while paused; defeat messaging explains the next opponent's replenished bar.

The adaptation stylesheet is loaded after the original styles so controls use their intended layout. The arena clips without becoming a focus-scroll container. Mobile battle HUD and target/input geometry were adjusted together. Test damage screenshots use controlled calls through the real damage functions, not a claim of naturally occurring 100-HP hits.

Current tests: 12 data/input/asset tests. The expanded experience scenario checks prefix entry, inactive targets, explicit confirmation, live-only guidance, node reuse, health loss/low-HP/paused HP, defeat explanation, confirmation layout, target containment and mobile HUD geometry. Its exact executed result is in `output/browser-experience-check-results.log`. The original 33-assertion production-browser scenario is retained and rerun after these changes. Screenshots: `experience-target-desktop.png`, `experience-damage-desktop.png`, `experience-low-hp-desktop.png`, and `experience-mobile.png` under `output/playwright/`.

Actual OS candidate selection remains a separate device check; composition boundary events are simulated in the regression. The fix specifically includes separate per-character commits, which the earlier smoke did not cover.

Final rerun: all 12 automated tests passed; the expanded experience scenario passed 24 assertions and the original gameplay scenario passed 33 assertions (57 browser assertions total). No application runtime errors or missing local assets were observed in the original gameplay run.

## Combat pressure revision — 2026-10-15

The previous input-clarity pass overcorrected difficulty: 10–18-second travel times, one concurrent Hanzi target, 1-HP original miss penalties, several grace shields and correct-answer healing made misses almost harmless. Combat now starts with two concurrent Hanzi threats and rises to three after 60 seconds. Word-length-aware travel time is 3.2–8 seconds (two-character words start at 4.7 seconds). The highlighted live target remains the recommendation, and other live words are accepted.

Normal combat has no automatic grace shields. Missed runes cost 10 HP, missed jumps, F/J guards and escaped projectiles cost 12 HP, and missed boss guards cost at least 16 HP. Judged incorrect input costs 4 HP. Correct actions no longer heal; the original defeated-opponent cycle recovery remains. Supplementary practice retains slower pacing and one grace shield.

Whole-word stage four now has a visible countdown and a real 10-HP enemy attack when it expires. The same target and any partial/composing input are preserved after that attack. Pause freezes the added timer. Non-Hanzi IME preedit is ignored before explicit submission in all Hanzi stages. The original per-character underline is removed only in whole-word Hanzi mode; Zhuyin character progression is retained.

`scripts/browser-combat-balance.js` includes a real 14-second no-input observation through the running simulation, plus controlled deadline/boundary tests through each original update function. Screenshots are `output/playwright/combat-idle-damage.png` and `combat-word-countdown.png`. The timing values are an implemented baseline, not a claim of student-tested difficulty balance.

Executed revision checks: 19 combat-balance assertions passed, including real idle damage and all five miss paths; the updated experience scenario passed 24 assertions and the five-stage/three-mode scenario passed 33 assertions. All 12 automated data/input/asset tests passed. Production build and generated-runtime syntax passed. These checks do not replace native IME/device or classroom acceptance.

## Single Chinese target row — 2026-10-15

Removed the smaller duplicate Hanzi progress row beneath the large word in Hanzi word-combo/boss stages. The lower hint now contains pronunciation only. Simplified and Traditional modes were checked in both stages and after partial input (six browser assertions passed). Screenshot: `output/playwright/single-chinese-row.png`. Production build and runtime syntax passed. The combat-balance scenario now checks for a single Hanzi row instead of inspecting a removed current-character span.

## Full player-flow signoff — 2026-10-15

See `docs/full-playtest-2026-10-15.md` for scope, fixes and evidence. The three-mode/five-stage matrix completed 15 natural three-minute games; three additional full timed runs checked repair behavior (54 active game-clock minutes total). All modes also completed review practice/replay and natural endless defeat/record/replay. The final pass includes mode/level/cumulative record isolation, real reload persistence, load-error recovery, actual BGM playback and corrected mobile bounds. The report distinguishes natural play, controlled regression fixtures, and native-device limits.

## Vocabulary rotation and adjustable pace — 2026-10-15

This revision supersedes the short time windows and fixed row vocabulary pools described above.

- Normal vocabulary-backed stages use a shared shuffled deck for the selected mode/system/level/cumulative scope. Each new rune, projectile, jump word, word-combo word or boss word takes the next item. Wave resets and stage changes do not reset the deck. Switching to another scope keeps its own deck; switching back resumes it. Reloading the page starts fresh decks.
- Hanzi answers with identical written forms are deduplicated. Zhuyin homophones with different underlying Hanzi are retained as distinct vocabulary items. The deck avoids consecutive identical displayed answers where possible, skips concurrent targets, and reshuffles only after its current pass is consumed. Stage 4/5 no longer bias selection by length; selected vocabulary level determines the pool, and word length determines the input window.
- Zhuyin stages 1–3 remain physical-key/symbol training from the original game; their symbols may repeat. Full database-word rotation applies to Zhuyin stages 4–5. Supplementary review intentionally repeats its small weak-word deck, without changing the normal-play deck.
- Stage 4 expiry retains the same unfinished word and IME input, preserving the existing input-safety behavior. This is an unfinished target, not a newly repeated draw. A selected token counts as drawn even if the player leaves before answering it; this is exposure rotation, not proof of mastery.
- Persistent Vietnamese `Tốc độ` buttons offer 0.25×, 0.5×, 0.75× and 1×; first-visit default is 0.5×. Changes apply immediately to current threats and retain IME focus. Selection is saved locally. Combat dt, jump/FJ deadlines, boss guard deadlines, boss approach and whole-word countdown all scale together. The real three-minute round clock, damage per hit and IME composition handling remain unchanged.
- Chinese moving-target base time is now `min(24, 6 + 1.5 × displayed length)` simulation seconds, without the previous automatic time-window shrink. A two-character target has 9 base seconds, approximately 18 wall seconds at default 0.5× or 36 at 0.25×. Stage 4 includes its existing additional 1.2 base seconds. Actual concurrency still requires prioritizing live threats.

Verification:

- `npm test`: 17 passing tests, including 300 distinct words per pass over three passes, pass-boundary repetition, duplicate forms, concurrent targets and Zhuyin homophones. Production build and runtime syntax passed.
- `scripts/browser-vocabulary-speed-check.js`: 29 assertions passed. Real menu entry and keyboard/IME-field actions answered 12 naturally spawned distinct Hanzi rune words with zero errors. Controlled fixtures checked 30 draws per vocabulary-backed stage in all modes, selected database membership, every speed-dependent mechanic, the unchanged round deadline, speed persistence and typing focus. Existing rune movement was measured as 1 px vs 4 px for equal dt at 0.25× vs 1×.
- Existing `browser-reference-smoke.js`: 33 assertions passed, covering five mechanics, three input modes, partial input, pause, review/endless entry, assets and runtime errors. This is a smoke regression, not a new full-duration playthrough.
- Width checks at 390/768/1440 px passed. A final mobile layout repair was separately checked for non-overlapping metric/bar sections, HUD containment, arena clearance, HP/target clearance and no horizontal overflow; the rendered screenshot was inspected.
- Logs: `output/vocabulary-speed-check-results.log`, `output/vocabulary-speed-reference-smoke-results.log`, `output/vocabulary-speed-mobile-results.log`. Screenshots: `output/playwright/vocabulary-speed-desktop.png`, `output/playwright/vocabulary-speed-mobile.png`.

Native OS IME candidate interaction, physical phones and Safari remain outside this browser-based verification. No classroom acceptance or lasting vocabulary mastery is inferred from these tests.

## Optional per-run practice detail and scoring explanation — 2026-10-15

The result screen now has two native `<details>` disclosures, closed by default on every result: `Xem từ / ký hiệu đã luyện` and `Vì sao có số sao và xếp hạng này?`.

The full practice table lists every observed target with correct count, incorrect/missed count and an explicit unanswered status. It sorts by descending incorrect count, then correct count. Incorrect/missed includes judged wrong input and expiry; it does not treat an unfinished target at round end as wrong. A word can have both successful and failed attempts. Zhuyin full-word entries retain their actual Chinese word identity, including homophones; the first three Zhuyin stages report symbols instead of claiming vocabulary-word practice. Defense F/J keys are excluded. Targets expire without input in row-based Zhuyin stages also increment the missed count.

During testing, the original `resetRun` was found to leave `analytics.keyStats` and `wordStats` from previous runs in memory. These and the new review ledger now reset at a new run; review-practice entry also starts a fresh analytics ledger after extracting its review plan. Persistent profile records are unchanged. These details are per-run in-memory data, not a historical word report that can be reconstructed after reloading.

Scoring rules are unchanged. The optional explanation uses the actual `buildJudgeScore`, stage thresholds and rating functions, displaying combat score + accuracy bonus + combo bonus + input bonus, current star/grade, next-star gap and ordered grade conditions. It explicitly states that slower speed can reduce throughput in three real minutes, thresholds are shared across speeds, and game rank is not a Chinese-proficiency assessment. The source grade logic has ordered overrides; the UI describes that order rather than replacing it with an inaccurate star-to-letter mapping.

The supplied example is reproduced by automated checks: combat 5,596 + 95×26 (2,470) + combo 50×34 (1,700) + 95×8 (760) = 10,526. Stage 1 thresholds are 7,000 / 11,000 / 15,500. Therefore one star; accuracy ≥86% and at least one star gives B. The gap to two stars is 474 points.

Verification: 20 automated tests passed, production build and generated-runtime syntax passed. `scripts/browser-result-detail-check.js` passed 14 browser assertions: real visible target input with two errors then a correct answer; a correct-only word; an unanswered word; collapsed-default/expand behavior; error-first sorting; supplied-score explanation; mobile table bounds; fresh-run isolation; Traditional and physical-key Zhuyin whole-word identity; no runtime errors. The short result scenario ends its fixture round early and the example score uses controlled numbers; it is not a new full-duration game. Logs are `output/result-detail-check-results.log`; screenshots are `output/playwright/result-practice-detail.png`, `result-practice-mobile.png`, `result-score-detail.png`. The controlled example values are restored before capturing the practice-detail screenshots.

The existing five-stage/three-mode reference smoke regression also passed all 33 assertions on the final runtime, including review practice, pause, result/records, assets and no author-cloud requests. Evidence: `output/result-detail-reference-smoke-results.log`. An earlier concurrent build temporarily removed a preview asset while the scenario was running; after the build finished, the entire scenario was rerun successfully without further code changes.

## Five-second configurable targets and active boss attacks — 2026-10-15

This revision supersedes the earlier speed-multiplier UI and the 18-second default. The latest user correction sets **5 seconds** as the default, not four. `Giây / từ` now provides 3/5/8/10-second presets and a numeric 1–60-second field, persisted under a new seconds preference. Legacy speed preferences do not alter these actual seconds. Changing the value immediately gives current word/jump/moving targets the chosen remaining time. Invalid values restore the last valid setting. Adjustment while paused preserves the selected window on resume. The three-minute round clock remains unchanged; supplementary review remains untimed.

Moving-target timing uses actual remaining travel distance divided by the selected seconds; old minimum pixel-speed clamps were removed so a 60-second setting also works at narrow viewport widths. This pacing is applied to both Hanzi and Zhuyin moving objects. All normal full-word stages, including timed and endless bosses, now display a visible countdown. Boss word expiry records a missed word and triggers an actual 16-HP attack while preserving the current target and composing input. Boss F/J attacks also run independently on a 6/5/4-second cooldown by phase. Word countdown pauses during defense and resumes its remaining value afterward; it does not reset on every guard or double-charge that guard-resolution frame. Missed guards retain real damage. Correctly typing words does not cancel the independent attack schedule.

Simplified and Traditional target tokens no longer contain display pinyin, and the phonetic display getter returns empty for Hanzi modes. The large Chinese word remains; row prompt/hints and whole-word panels contain no pinyin. The existing vocabulary sources retain their pinyin data internally for conversion/other modes.

Verification on the revised runtime: `npm test` passed 20 tests; production build and runtime syntax passed. `browser-seconds-boss-check.js` passed 19 browser assertions. A natural no-input endless run observed HP **140 → 124** at the first five-second word expiry, then **124 → 108** from the independent missed guard, without modifying HP, deadlines or attack timers. Checks also covered visible countdown, all five Hanzi stage windows in both scripts, absence of pinyin, custom/preset input, invalid input, reload persistence, pause and desktop/mobile layout. `browser-target-window-check.js` passed four additional assertions: geometry-measured 1/5/60-second arrivals for rune/projectile stages across all three modes, plus adjustment while paused. Controlled stage fixtures are separate from the natural idle-boss observation. The final guard-countdown refinement was followed by a fresh full 19-assertion run.

Evidence: `output/seconds-boss-check-results.log`, `output/target-window-check-results.log`; screenshots `output/playwright/seconds-boss-attack.png`, `seconds-control-desktop.png`, `seconds-control-mobile.png`. Rendered control/countdown screenshots were inspected. Native input-method candidate selection, physical phones and Safari remain unverified. Older speed-specific browser scripts assert superseded UI behavior and are not the current acceptance scenarios.
