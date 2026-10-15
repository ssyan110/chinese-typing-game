# Vocabulary database evidence

Checked 2026-10-15. Imported data and raw source files are in this project. Levels, editions and conversion provenance are separate from the gameplay difficulty.

## Selected: HSK November 2025 examination syllabus

- Database: https://github.com/uranbekanarbaev/hsk-3.0-vocabulary-dataset
- Dataset author/source notes: https://github.com/uranbekanarbaev/hsk-3.0-vocabulary-dataset/blob/main/SOURCES.md
- Import: `data/hsk-3.0-all.json`, preserved as `data/upstream/hsk-2025.json`.
- 11,000 entries with contiguous source IDs, first-introduced bands 1–6 and 7–9, original pinyin, parts of speech and physical syllabus PDF page.
- Incremental counts: 300, 200, 500, 1,000, 1,600, 1,800, 5,600. Cumulative counts: 300, 500, 1,000, 2,000, 3,600, 5,400, 11,000.
- HSK 7, 8 and 9 share one vocabulary list; separate sublists would be invented.
- This is an independent transcription, not an official dataset API. Its source notes link the official Chinese Testing International syllabus; the source PDF itself was not independently transcribed or checked word by word in this task.
- Original JSON fields remain in the raw input. Game data adds OpenCC Simplified-to-Traditional conversion, computed Zhuyin and physical key sequences.
- Rights: `data/upstream/HSK-RIGHTS.md` preserves the repository notice. Its MIT license applies to the original browser code, and its CC BY license to original ancillary materials. Neither is a blanket license for the underlying examination syllabus. This work does not claim otherwise.

## Selected: TOCFL July 2023 reference vocabulary

- Official resource page: https://tocfl.edu.tw/tocfl/index.php/teach/download
- Official archive downloaded and opened: https://tocfl.edu.tw/assets/files/vocabulary/8000zhuyin_202307.zip
- Machine-readable data: https://github.com/ivankra/tocfl/blob/master/tocfl-202307.csv
- Import: `data/upstream/tocfl-202307.csv`.
- 7,517 entries. Exact level counts are 160 / 234 / 347 / 485 / 1,173 / 2,342 / 2,776. Matched these against the official workbook's “各等詞條數(Entry Number)” sheet; this was not a full row-by-row reconciliation.
- Source levels: Novice 1, Novice 2, Beginner, Basic, Intermediate, Advanced, Fluent. The UI labels these Dự bị 1, Dự bị 2, A1, A2, B1, B2 and C1–C2 (shared fluent band). There is no invented separate C2 vocabulary list.
- The parsed CSV supplies Traditional, Simplified, pinyin, POS and structured variants. The game selects the first structured spelling variant and preserves original spellings in the raw CSV.
- Source repository does not contain a standalone license grant. Preserve attribution and source rights. The reference list is used here as local classroom practice data, with no claim of an open commercial redistribution license.
- This is explicitly the July 2023 edition, not a claim to be the latest list. The official resource page is linked in the application for checking changes.

## Other databases examined

- https://github.com/ivankra/hsk30 : 11,092-entry HSK **2021 proficiency standard**, MIT notice; useful for a separate edition, not merged into the selected 2025 syllabus.
- https://github.com/ayman-ezz/hsk-3.0-word-list : clean CSV/JSONL compilation of the 11,092-entry standard; same edition distinction applies.
- https://github.com/jelleverheyen/hsk-vocabulary : combined HSK 2.0/3.0 JSON, pinyin, forms and dictionary information. Did not import to avoid mixing old and new classifications.
- https://github.com/ivankra/tocfl also contains TBCL and historical TOCFL files. TBCL levels are not silently substituted for TOCFL levels.

## Conversion limits

`opencc-js@1.4.2` converts HSK forms to Traditional Chinese with the `cn` → `tw` profile. This does not turn a mainland syllabus into a Taiwan vocabulary standard or replace the source pronunciation with a Taiwan pronunciation.

`pinyin-to-zhuyin@1.1.0` converts pinyin to Zhuyin. Source pinyin is preserved; separators and alternative-reading selection are normalized only for computed prompts. Every emitted Zhuyin symbol has a known key. The unsupported HSK ǹg reading is not assigned a guessed sequence. Conversion and keyboard-map tests are mechanical checks; they do not establish a full linguistic review of 18,517 entries.

Raw-input SHA-256 hashes, playable counts, Zhuyin counts and per-level counts are in `public/data/manifest.json`. Game records do not leave the browser. There is no connection to the original game's leaderboard.

## Upstream snapshots

- HSK repository commit: `6859875bf3ba3b7209dee3b23171f893f7493776`.
- TOCFL repository commit: `1fb4a6ba132bacba4742cfdfeb13e12d0730e4ea`.
- Requested REA checkout commit: `f255899ee849aaef4a23fc385c62616ccf089e16`.
