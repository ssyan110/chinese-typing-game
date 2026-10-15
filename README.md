# Võ lâm gõ phím — Vietnamese adaptation

A direct adaptation of [TypeGameWuxia by changsheng0612](https://changsheng0612.itch.io/typegamewuxia), preserving its game UI, pixel characters, animated monsters, backgrounds, sound, effects and five distinct combat mechanics. The earlier illustrated prototype was superseded and its source is retained under `output/previous-version/`.

## Play online

Student link: **https://ssyan110.github.io/chinese-typing-game/**

No account is required. Settings and scores are saved in the current browser; they do not synchronize between devices. GitHub Pages serves this public repository with HTTPS. The `Publish student game` workflow tests, builds and publishes `main` automatically. `scripts/prepare-pages.mjs` rewrites only the deployment artifact to the repository subpath; ordinary local builds retain root URLs.

## Run

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 5186 --strictPort
```

For the production version:

```sh
npm run build
npm run preview -- --host 127.0.0.1 --port 4186 --strictPort
```

Open http://127.0.0.1:4186. Node 20 works for the game. The separately cloned `rea/` tool requires a newer Node version and was not installed or configured.

## Student flow

1. Choose **Chú âm**, **Chữ giản thể**, or **Chữ phồn thể**, on a screen using the original game's ink-wash background and wood buttons.
2. Choose HSK or TOCFL, level and whether to include earlier levels.
3. Enter the original-style game menu, then choose an independent three-minute stage or the endless boss mode.

The UI and story dialogue are Vietnamese. The title wordmark is Vietnamese text in the original gold/serif visual style. Chinese remains in practice examples and targets. Original UI geometry, sprites, effects and simulation are retained, with layout accommodations for longer Vietnamese text.

Each normal-play target defaults to **5 seconds**. The in-game **Giây / từ** control accepts **1–60 seconds**, with 3 / 5 / 8 / 10 second presets, and saves the chosen value locally. This replaces the earlier speed multipliers. Hanzi practice does not display pinyin. Both timed and endless bosses attack on word timeout and independently request F/J defense.

## Original mechanics retained

- **Ải 1 — Tấn pháp căn bản:** moving/falling rune objects; three hits charge an automatic sword strike.
- **Ải 2 — Khinh công vượt mây:** timed prompts; jump to gather cloud energy, then return to the requested F/J guard key to trigger cloud bursts.
- **Ải 3 — Quét chân phá ám khí:** incoming moving projectiles; build three shield charges to counterattack.
- **Ải 4 — Kiếm khí tung hoành:** type a complete word/phonetic sequence to attack, keep combos and rotate enemies.
- **Ải 5 — Quyết chiến ma giáo:** multi-phase boss, approach distance, timed F/J defense, counter windows and Space ultimate.
- **Ma vương vô tận:** original endless rounds without the three-minute clock.

Zhuyin uses the original physical-key drills in the first three stages, and selected vocabulary's phonetic sequences in stages four and five. Simplified/Traditional modes attach dictionary words to the original rune/projectile objects, using the device's IME. Word-entry time scales with word length. Hanzi F/J defense has a 1.8-second window. These are targeted input adaptations, not substitute minigames.

Escape pauses, and switching away from the window automatically pauses. The original assistance, contrast and reduced-motion settings remain. The original results, stars, achievements, scoring and review-practice paths remain. Stage and endless records are separated by writing mode, vocabulary system, level and cumulative selection. The reference author's cloud leaderboard and itch runtime are disconnected; no score is sent there.

Chinese input requires the device's Chinese IME. Choose English input for physical Zhuyin drills. Actual phone IME use and Safari need device testing; desktop keyboard play is the primary experience.

## Vocabulary

- **11,000 HSK entries**: November 2025 examination syllabus, HSK 1–6 and shared HSK 7–9 band. No invented split into levels 7, 8 and 9.
- **7,517 TOCFL entries**: July 2023 reference list; two novice levels, A1, A2, B1, B2 and shared fluent C1–C2 band.
- HSK Traditional forms are OpenCC conversions. Pinyin is retained from source; Zhuyin is computed from that pinyin. 10,999 HSK and all 7,517 TOCFL entries have convertible keyboard sequences. The unsupported HSK 嗯 / ǹg is excluded from Zhuyin only.
- No Vietnamese vocabulary definitions were invented. Source rights and conversion limits are recorded in [vocabulary sources](docs/vocabulary-sources.md) and [the manifest](public/data/manifest.json).

## Source and rebuild

- `reference-game.html`: retrieved original HTML/CSS/JavaScript, preserved unchanged.
- `src/reference/ui-vi.tsv`: Vietnamese translations of the original UI and dialogue.
- `src/reference/adapter.js`: practice selection, dictionary integration, Chinese IME bridges and local-record isolation.
- `src/reference/setup.html` and `adaptation.css`: setup screens and targeted typography/layout adjustments.
- `scripts/build-reference.mjs`: generates root `index.html`, `public/game/runtime.js` and adaptation stylesheet.
- `public/game/assets`, `audio`, `fonts`: reference media; 109 files with exact source URLs, byte counts and SHA-256 hashes in `data/upstream/game-asset-manifest.json`.
- `scripts/fetch-reference-assets.py`: reproducible, bounded asset retrieval into this project.
- `scripts/build-vocabulary.mjs`: recreates the local dictionary JSON from preserved upstream data.

The reference game and media remain attributed to their original creator and rights holders. This local adaptation does not claim ownership or a new license for them.

## Verification

```sh
npm test
npm run build
npm audit --audit-level=high
```

The browser scenario in `scripts/browser-reference-smoke.js` runs through Playwright CLI against the production preview. See [QA](docs/qa.md) for current results and limits. Earlier prototype checks are historical and do not establish this adaptation's behavior.

## Typing guidance and damage feedback

The current live word is shown as **Gõ từ này** and highlighted on the matching rune/projectile. Character-mode rune/projectile stages start with two concurrent threats, rising to three after one minute. The nearest threat is highlighted; any live word can be typed. Prioritize the highlighted target; there is no fixed list sequence. If a complete short word is also the start of another word (such as 水 / 水果), continue typing the longer word, or press Enter / **Xuất chiêu** to confirm the short word.

Both fighters have labeled numeric HP plates, loss trails and explicit −HP feedback. The player's low-HP state is marked with persistent warning text. Opponent HP stays visible during pause, and defeated-opponent messages explain the next health bar reset. Keyboard combat and vocabulary selection remain the same.

Combat now shows a target countdown. Missing runes costs 10 HP, missed jumps/projectiles 12 HP, and missed boss guards at least 16 HP; judged incorrect input costs 4 HP. IME preedit and partial correct words are unjudged. Correct input no longer heals; defeating an opponent retains the original cycle recovery. Extra practice keeps slower timing and one grace shield.

## Complete player-flow verification

See [the full playtest report](docs/full-playtest-2026-10-15.md) for the 15 mode/stage combinations, 18 natural timed runs including repair validation, review/endless paths, discovered fixes and platform limits. Raw observations and a machine-readable summary are under `output/full-user-play/`.
