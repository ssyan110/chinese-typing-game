# Practice pacing correction — 2026-10-21

The reported problems were a first chapter that appeared to finish after about five answers and a second chapter repeating the same word five or six times. The previous implementation interrupted every five correct answers with a supply dialog labeled “round complete”, required three clean successes per word, excluded corrected answers from progress, and continued drawing completed words while the boss retained HP. Continuing partial practice could shrink the word set while starting a fresh boss HP pool.

## Current behavior

- A full first chapter contains 15 distinct words and 30 presentations. Later chapters contain 20 words and 40 presentations, except the final partial chapter. The chapter catalog covers every vocabulary entry exactly once.
- Two shuffled passes cover the word set. A wrong submission or timeout schedules at most one additional presentation for that word. Further errors, including during its extra presentation, cannot add more. Each word therefore appears at most three times within one finite battle. Repeated wrong submissions within the same active prompt remain possible; they do not create additional presentations.
- A corrected answer counts as a correct practice answer. A timeout advances the presentation queue, but does not add a correct answer. Each word still needs two correct answers for a chapter victory. If the capped queue ends with unresolved words, the battle stops and offers mistake review instead of drawing the word indefinitely or awarding a false victory. Zero HP still causes defeat.
- Boss HP is 12 times the remaining presentation count at launch. Before practice is finished the boss retains protected HP; when all queued practice and required correct answers are complete, the last answer defeats the boss regardless of spell damage or remaining HP. Boss HP never extends the practice queue.
- Supplies occur every ten correct answers, unless the battle has just finished. The dialog says “NGHỈ GIỮA TRẬN” and “Tiếp sức giữa trận”, explicitly states that this is the same chapter, preserves monster HP and returns focus to input.
- Old word completions and history remain intact. Old two-answer partial practice is credited under the new threshold. Continuing a partial chapter uses the full chapter identity with only missing presentations queued; the header explicitly says it is a saved continuation and shows the remaining count. A saved remainder may legitimately contain only five answers. Replaying a completed chapter starts the full 30/40 presentations.
- Chapter boundaries changed from 20/20 to 15/20. Existing victories are recognized when all words in the new chapter were covered by previously won chapter keys. Merely having vocabulary progress does not invent a chapter victory.
- Finite free play uses the same two-pass/capped-extra rules for up to 20 randomly selected words. Endless survival and untimed mistake-review rules remain separate.

## Verification evidence

Final results: `npm test` passed 103/103 logic checks. `npm run test:browser` passed 34/34 Chromium/WebKit checks against a freshly built production site at the deployment prefix, including the build and Pages path preparation. `git diff --check` passed. The local preview at `http://127.0.0.1:5188/` returned HTTP 200; the Codex browser-open request was queued.

The logic suite covers all three scripts and all three opponents, clean 30/40-answer battles, mistakes on every presentation, repeated wrong submissions, timeout caps, remaining HP set to 99,999, all spell choices, old partial counts, completed-set replay, exhaustive curriculum coverage and victory migration. Existing storage, backup and zero-HP checks remain in the suite.

Browser regression tests play chapters one and two using visible controls, confirm the game is still playing after five answers, inspect mid-battle supply text and HP continuity, check every word's actual appearance count, reload partial practice, replay a completed chapter, and load a synthetic old two-success save. The all-mistakes scenario uses the ordinary shield and healing controls to reach the end of the queue without changing player HP through test hooks. Browser tests also cover desktop/mobile input focus, Chinese composition events, three scripts, Safari/WebKit and the complete eight-stop journey.

Logs and screenshots are local, ignored artifacts under `output/`: `balance-unit.log`, `balance-browser-final.log`, and `practice-*.png`. Automated Chinese input/composition tests do not constitute a new physical-device IME playtest. These checks verify the local production build; no online publication is included in this change.

## Visible-text review

Updated lobby instructions, journey instructions, battle help, score help, history explanations, progress labels and supply text. Removed the old three-clean-answer/remaining-HP requirements from the active UI. Reviewed the rendered progress, supply and result screens for consistency with the implemented rules. Vietnamese wording distinguishes a mid-battle break, a completed chapter and a saved continuation; this is an author review, not a new student comprehension study.
