# Đèn Sao original-media and unobstructed-play release

The user requested three related changes: no pinyin in either Hanzi mode; direct reading of moving bubbles without an upper duplicate target frame and without an in-arena typing overlay; and completely redesigned visual/audio media. Three explicitly requested child agents handled bubble/input auditing, authored art and original UI respectively. The parent composed audio, integrated asset routing and the typing dock, and performed deployment QA.

## Delivered behavior

- Simplified/Traditional tokens carry no display pronunciation. The phonetic getter, ordinary hints, composition hints and accessible labels are guarded. Tests inject a pronunciation sentinel and check the arena plus the separate typing dock. Zhuyin remains a pronunciation-training mode. The operating system's own IME candidate/preedit UI is user input and is not suppressed by the game.
- Stages 1/3 show words only inside the actual moving bubbles/projectiles, each with its own countdown. There is no upper duplicate target frame or preferred-target highlight; any live bubble can be answered. Stage 2 uses a frameless floating word; stages 4/5 place the target above the opponent. F/J defense cues remain distinct.
- The existing IME field and listeners were moved into `#typing-dock`, a separate grid row after the arena. It is never positioned over moving words. Stable dock height avoids layout jumps during defense. Desktop/tablet/phone-width layouts keep HUD, arena, dock and footer separated. The legacy repeatedly-triggered input rise-in animation was removed so the field remains visible.
- Existing five-second/custom-second rules, independent boss attacks, source vocabulary, IME boundaries and per-run optional result details remain functional.

## Original media

- 87 SVG image replacements plus an original favicon: layered academy scenery, lantern courier, 24 actual pose frames across six states, seven paper-creature families, icons and UI illustrations. XML/geometry is locally authored, without imported source images, extracted paths or external fonts/images/scripts.
- 3 original 16-bar looping scores plus 18 synthesized cues, saved as MP3. The deterministic note/timing/oscillator source is retained. No original recording/samples or paid music-generation API was used.
- A new ink-indigo/teal/amber interface replaces wood/parchment/pixel styling. Display names and short stage narratives now belong to the fictional Đèn Sao academy.
- Production explicitly stages only vocabulary, runtime/CSS and the authored media. Original game image/audio/font folders are retained locally as ignored reference archives, removed from the current Git tree, and absent from `dist`. The public build is about 4.3 MB instead of the previous roughly 123 MB public tree.
- This is an original-media redesign of an attributed derived gameplay engine. The program still incorporates TypeGameWuxia source; it is not represented as an independently rewritten engine or as a legal clearance determination. Attribution remains linked in the interface and README.

## Verification before release

- 23 automated tests passed (dictionary integrity, IME/prefix logic, deck rotation, result sorting/scoring, exhaustive original-media routing, SVG dependency boundaries, distinct animation frames and no archived runtime asset references).
- Bubble/input browser regression: 60 assertions over all three modes and all five stages. Includes Hanzi composition/accessibility pronunciation sentinel checks and actual acceptance of a non-first live bubble. Independent child-agent geometry checks cover 390/1440 px × stages 1/3/4/5, including a long-word right-edge fixture. Geometry screenshots deliberately hold objects for inspection and are not observations of normal countdown duration.
- Parent original-world browser regression: 18 assertions. Includes real menu entry and a visible bubble answer, actual new music playback/time advance, decoded new character/opponent SVGs, no old-media requests, no missing assets/runtime errors, 1440/768/390 layout separation and a long-word layout fixture.
- Existing seconds/boss scenario was adapted only to allow either non-overlapping HUD order. All 19 checks passed with the redesigned world. Natural idle endless play still loses 16 HP at word expiry and another 16 on the independent missed guard; custom seconds, reload and pause work.
- WAV analysis of all 21 authored clips: all non-silent, none full-scale clipped. This is a technical audio check, not a subjective listening verdict.
- Production build, runtime syntax and the original-only deployment audit passed. Runtime/CSS links have content hashes to prevent cached old code/styles mixing with new media.

Evidence: `output/bubble-mode-check-results.log`, `output/original-world-check-results.log`, `output/original-seconds-boss-results.log`, `output/original-audio-analysis.json`; rendered screenshots under `output/playwright/original-*.png` and `bubble-*.png`. Native IME candidate selection, physical phone keyboard behavior, Safari and classroom reception remain outside these browser fixtures. Historical 54-minute tests belong to the prior visual version and are not relabeled as a full-duration playthrough of this redesign.

## Public readback and final resize repair

The original-media release (a367aa2, Actions run 38766225024) built and deployed successfully. The parent reran the 18 original-world checks against the real HTTPS website, confirming actual new MP3 playback, all new-media requests, the three viewport layouts and a visible bubble answer. Evidence: `output/public-original-world-check-results.log`; no missing assets, runtime errors or archived-media requests. A fresh settled desktop screenshot is `output/playwright/public-original-stable-desktop.png` (an immediate-resize capture had a transient compositor artifact, without duplicate DOM/HUD elements).

That check also revealed an existing travel-geometry weakness: resizing arena height could change a falling bubble's remaining seconds. The final repair records its prior boundary/origin/lane, preserves remaining time and normalized progress on layout changes, and reflows before movement, rendering and an explicit seconds change. A controlled paused fixture at 26% progress retained 5.000 seconds, progress .2600 and HP140 through 390→1440→390; changing to eight seconds immediately after resizing gave exactly 8.000 seconds. The full 60-check three-mode/five-stage bubble suite then passed again. Evidence: `output/bubble-resize-check-results.log` and refreshed `output/bubble-mode-check-results.log`. This fix preserves the configured timing rather than adding a new grace period or changing collision thresholds.
