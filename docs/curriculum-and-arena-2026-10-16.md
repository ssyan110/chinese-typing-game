# Complete vocabulary curriculum and arena design

## Completion contract

The primary flow is practice mode → vocabulary system/level → exhaustive curriculum. Earlier levels are included by default; the checkbox allows practicing only newly introduced vocabulary. Selected pool items are partitioned in source order into chapters of 20, with a final shorter chapter when necessary. All chapters are accessible, with pagination and a word catalog. Three enemy designs rotate across these chapters; the number of enemies does not constrain the vocabulary.

Within a chapter, items are shuffled once. Only a correct completed answer marks an item complete. A timed-out item returns to the queue, while wrong attempts stay on the same target. A chapter ends in victory only after every remaining item is correct. Defeating an enemy grants an explicit between-round reward and continues the chapter. Zero HP remains terminal. Correct items are saved immediately, so defeat, stopping or reloading never discards those successful answers. Resume supplies only unfinished items. Explicitly replaying an already completed chapter allows practice without erasing progress.

Progress is keyed by practice mode, vocabulary system, stable source ID and current displayed answer. Changing level/cumulative scope preserves matching word progress. Simplified, Traditional and Zhuyin do not unlock each other's progress. Storage is local to this browser; it does not synchronize between devices. A storage failure is displayed rather than silently promising persistence. A correct answer once is a coverage indicator, not a claim of long-term retention.

Free duels, endless and error review also record correct vocabulary, but remain distinct from exhaustive curriculum completion. Hanzi input remains outside the arena and no pinyin is displayed in Hanzi play. Zhuyin no longer collapses different source words merely because their readings match. Identical Hanzi display strings are deduplicated; all source display strings remain represented. Thus exercise counts can be lower than raw database row counts without losing any displayed word. All 331 additional TOCFL variant spellings are now imported, expanding 7,517 source rows to 7,848 items before deduplication. The one missing conversion, HSK 嗯, uses [MOE's ˙ㄣ reading](https://dict.concised.moe.edu.tw/dictView.jsp?ID=39854).

## Design system

- Color: dark ink arena `#142e32`, warm paper controls, jade for completion/HP, gold for the active rune, coral for enemy damage. These colors have explicit gameplay roles.
- Typography: self-hosted Be Vietnam Pro for Vietnamese, separate Hanzi/Zhuyin fonts, tabular numbers for countdown and HP. Readable wording is preserved rather than reduced to unexplained icons.
- Layout: compact header; viewport-filling battle field; tactics rail on desktop, stacked controls on small screens; input outside the arena. Full screen is a user-controlled action. The level directory uses numbered rows and real progress rather than decorative feature cards.
- Components: original folded-page/lantern vector seal, branded favicon, explicit completed/unfinished chapter states, bounded pagination, per-chapter word catalog, persisted per-word completion, accessible buttons and keyboard focus. High contrast and reduced motion remain supported.

## Verification

23 Node tests cover all 42 mode/system/level combinations, both cumulative choices, complete partition coverage, no omitted source display strings, timeout requeue, no successful-item repetition, partial resume, progress isolation, corrupt storage and full engine playthroughs of every chapter in every level and mode, with and without earlier levels. UI automation separately exercises actual chapter play, reload/defeat resume, all three scripts, next chapter, final vocabulary page, full screen and responsive layouts. Browser-generated input is distinct from native IME candidate-window acceptance; physical phones and Safari keyboards remain unverified.

An additional end-to-end browser run completes all 15 HSK 1 chapters: 300 distinct words, no repeats or omissions, with 300/300 retained after reload. A paced Traditional TOCFL A1 free duel completes 29 words in 38 active seconds at the five-second setting. The local browser curriculum suite passes 51 checks; standard regression passes 22, edge-case regression 12, and the free-duel matrix 176 (including repeated per-target assertions). All nine practice-mode/opponent combinations reach victory. Active layouts were inspected at mobile, laptop and 4K sizes, with no missing assets or runtime errors observed. A separate fit regression checks both Hanzi and Zhuyin at 1280×720, 1366×768, 1920×1080 and 3840×2160: no page overflow and no hero, enemy or HP clipping. Actors scale to the available arena height rather than the entire viewport. Screenshots and logs are in ignored `output/curriculum-*` and `output/playwright/curriculum-*`.

Coverage table below is generated from the committed databases with earlier levels included, matching the default UI. HSK 7–9 and TOCFL C1–C2 remain shared source pools. Counts describe this project's imported edition, not a new exam-provider certification.

| Bộ từ | Cấp | Giản thể: từ / chặng | Phồn thể: từ / chặng | Chú âm: từ / chặng |
|---|---|---:|---:|---:|
| HSK | 1 | 300 / 15 | 300 / 15 | 300 / 15 |
| HSK | 2 | 497 / 25 | 497 / 25 | 498 / 25 |
| HSK | 3 | 988 / 50 | 988 / 50 | 995 / 50 |
| HSK | 4 | 1978 / 99 | 1978 / 99 | 1992 / 100 |
| HSK | 5 | 3557 / 178 | 3557 / 178 | 3583 / 180 |
| HSK | 6 | 5334 / 267 | 5334 / 267 | 5375 / 269 |
| HSK | 7-9 | 10896 / 545 | 10896 / 545 | 10958 / 548 |
| TOCFL | N1 | 177 / 9 | 184 / 10 | 184 / 10 |
| TOCFL | N2 | 441 / 23 | 452 / 23 | 453 / 23 |
| TOCFL | A1 | 828 / 42 | 844 / 43 | 851 / 43 |
| TOCFL | A2 | 1325 / 67 | 1346 / 68 | 1355 / 68 |
| TOCFL | B1 | 2441 / 123 | 2472 / 124 | 2489 / 125 |
| TOCFL | B2 | 4696 / 235 | 4755 / 238 | 4778 / 239 |
| TOCFL | C1 | 7400 / 370 | 7480 / 374 | 7509 / 376 |
