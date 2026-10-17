# Repeated practice, local history and combat motion — 2026-10-17

## Diagnosis and final design

The supplied first-chapter card showed 20/20 completed: it did not establish that the game skipped any of that chapter's words. Previously a chapter required one success per word, so a fast player could finish 20 in about 35 seconds. Separately, the free-duel engine could finish before seeing its whole deck: a deterministic simulation of 2.2 seconds per answer, Ward and power rewards won after 15 answers / 33 seconds. These are different issues.

The final change keeps **20 words per chapter**; the proposed 40-word expansion was withdrawn following the user's correction. New finite challenges require three correct, error-free presentations per word, separated by shuffled passes, plus depletion of enemy HP. Correcting a wrong response still casts a spell but earns no clean-practice increment; that word returns on a later pass. A timeout returns the word to the queue. A pass boundary avoids an immediate repeat when multiple words remain. A one-word final chapter necessarily repeats its only word.

First-chapter HP rises from 360 to **720** (36 per distinct word). Free play chooses at most 20 random distinct words and uses the same repeat guard, with an encounter-based HP minimum. Both HP and practice must be finished; three practices alone do not force the monster's remaining HP to zero. A visible practice shield keeps HP above the outstanding-practice floor until enough practice has happened. This guard also survives arbitrarily large attack bonuses.

Finite encounters offer an explicit supply choice every five correct entries; the monster does not heal. Finite counterattack damage no longer escalates just because more supplies were taken. Endless mode still scales by wave. There is no forced minimum time or passive waiting: 60 successful entries is the baseline for a fresh 20-word challenge, with more attempts after errors or low-damage spell use. Resumed sessions can require fewer new answers.

## Local persistence and history

The header's **Lịch sử trên máy** button opens history directly. It shows date, course/script/level, chapter, in-progress/stopped/defeated/won status, session time, accuracy, current-session word details and cumulative practice quota. Users can reopen the corresponding course route. Opening history during battle pauses the game; Escape closes history without silently resuming the battle.

- Existing `tulinh.progress.v1` completion strings and `tulinh.records.v1` records remain readable. Old wins are explicitly labeled as old-rule wins; they do not bypass a new challenge's three-practice requirement.
- Partial counts (1 or 2) are saved immediately under `tulinh.practice.v1`, by script, vocabulary system, word ID and current label. Counts do not leak between scripts or changed spellings.
- Word practice completion and defeated-challenge completion are separate. A persistent challenge signature is added to the existing progress object only after an actual campaign victory. Cards distinguish sufficient word practice from a defeated challenge.
- History stores up to 128 recent sessions; per-word progress and challenge victories are separate from that history limit. New records include rules version 2 and retain old records.
- Resume restores vocabulary-practice counts, not a frozen combat snapshot: a new fight starts with fresh player and enemy HP. This is not cloud synchronization. Storage warnings cover clearing site data, resetting or switching browsers/profiles, private browsing and changing devices.

## Motion implementation

Two small WebGL textured meshes deform the existing player/monster illustrations locally. Hero arm/clothing/head regions, guardian/sentinel hands/body, and moth wings have different motion fields. This is articulated **2D deformation with 2.5D depth cues**, not imported 3D characters or a fully rigged 3D scene.

Browser-native timelines add a casting ring, shaded projectile, perspective impact ring, sparks and actual damage/blocked/healed numbers. Attack, enemy counterattack, successful defense and timeout reactions use actual combat outcomes. Newly granted shields and healing are reported separately from net HP change. Input remains available; effects do not earn answers or modify combat HP. The next word's timer continues during ordinary effects; supplies/results wait briefly so the impact can be seen. Reduced-motion mode suppresses these effects and uses undeformed meshes. Unsupported or lost WebGL falls back to the original still illustration rather than breaking input.

## Research and limits

See [practice-design-research-2026-10-17.md](practice-design-research-2026-10-17.md) and [combat-animation-research-2026-10-17.md](combat-animation-research-2026-10-17.md) for primary sources. Repeated retrieval research motivates continued practice after one success; **visible-answer typing is not semantic retrieval**. Three clean practices is an adjustable product default, not a validated mastery threshold. This release does not claim delayed retention, provide translations/audio recall cues, or schedule later-day spaced reviews.

The research notes include proposals broader than this implementation. Ordinary wrong drafts are corrected on the current visible presentation and revisited on later shuffled passes; the scheduler does not guarantee exactly three intervening items in every edge case. Within-session randomization is not claimed as a full spaced-repetition algorithm.

## Validation

- 46 Node tests passed, including full HSK/TOCFL source coverage and chapter completion matrices, boosted-damage protection, three-practice behavior, distinct HP/win criteria, partial counts, legacy progress, shield feedback and mesh deformation.
- Browser UI flow: stopped after 7 correct entries, reloaded, resumed at 7/60 and reached 60/60 with 20 distinct words / zero JavaScript errors. One pass did not end the challenge. The automated resumed run entered 53 new correct answers; its speed is not evidence of student duration or learning.
- Browser UI flow at 390px Traditional/moth and 320px Zhuyin/sentinel: attack, shield, defense, timeout, two mesh renderers, history and no horizontal document overflow / zero page errors.
- Legacy fixture: preserved 20 existing word completions and the old history record; a new retry still required 60 entries. Escape/history pause, reduced effects and simulated WebGL-loss fallback passed.
- Test browser average requestAnimationFrame interval across 60 samples was 16.7ms while both meshes were active; meshes intentionally update at about 30Hz. This is not a real-phone GPU benchmark.
- Production build and whitespace checks passed. Actual OS Chinese IME candidate selection, physical-phone software keyboards, Safari and classroom learning acceptance were not repeated in this change; browser fill/touch tests do not establish those.
- Screenshots and a short recorded browser preview are under `output/playwright/`; those QA files are not shipped as part of the student build.

Natural Vietnamese gate: added instructions distinguish successful entries, corrected attempts, cumulative counts, challenge wins and local-only storage. These were read back in desktop and phone renders. No claim of user or classroom acceptance is implied.

## Visible history details revision

Each history card now displays its full result metrics (score, accuracy, correct/wrong/timeout counts, duration, combo, grade and available stars) and word table immediately. No disclosure click is required. The per-word wrong count excludes timeout events, which have their own column; rows with errors are highlighted. Old records with no word data explicitly say the detail was not saved, and absent metrics use a dash. Browser checks compared real saved game results against the displayed values, confirmed reload persistence and a 320px table without horizontal overflow. Existing 46 tests and the production build passed.
