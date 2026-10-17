# Đấu Trường Hán Tự — product finish and icon audit

Audience: students practicing Chinese, including school use. The selected illustrated lantern red panda is the product mascot. Tiếng Hoa HAHA remains a quiet creator credit with optional monochrome channel links in the footer; there is no large publisher logo or follow/subscribe prompt. Battle hides the footer.

Applied `frontend-design` and `brand-review`, using the final school-sharing revision in `branding-2026-10-17.md`, the home design and the selected red-panda art as the current visual authority. Earlier human/fox studies remain historical references.

## Shared contract

- Warm paper #fffdf6, forest ink #203e34, green action #2c6b55, honey accents #ac8342, sage borders #cfd8c7. Existing self-hosted Be Vietnam Pro throughout; no new remote fonts, icon service or dependency.
- Interface icons live in `src/summoner/icons.js`: 24px view box, 1.7px rounded strokes, inherited foreground color. Use SVG rather than Unicode arrows, checks and stars. Brand/platform marks and existing illustrated spell emblems stay in their appropriate distinct roles.
- Familiar utilities (fullscreen, sound, settings, close, battle back) can be icon-only, with an accessible Vietnamese name and hover title. Local history keeps its visible label. Learning, progression, pause/replay/review and completion choices keep text alongside the icon.
- Do not replace Chinese characters, Zhuyin keys, numeric scores, grades, vocabulary, instructions, explanations or the local-storage notice with icons. Optional disclosures retain their full title and get a consistent chevron.
- State is part of the control: sound switches muted/volume SVG and keeps aria-pressed; fullscreen switches expand/collapse; settings retains aria-expanded. Result/history ratings use filled and outline SVG stars plus an accessible numeric rating. Completed vocabulary retains an explicit accessible completion label.
- Buttons and social links retain at least 44px target height; icon-only utility buttons are 44×44px. Focus rings, disabled states, keyboard navigation, reduced motion, pause handling and contrast settings remain available.

## Audit outcome

Blocking issues: none found in the exercised local flows. This does not constitute student usability acceptance or live-release acceptance.

Important fixes delivered: unified header/action icons, durable icon+label updates for dynamically generated controls, semantic chapter state icons, result/history ratings, disclosure indicators, shared button/dialog colors and borders. Removed the duplicate mobile fullscreen text glyph. Corrected the phone mascot's right margin and inline alignment of metric labels.

The share cover was also recaptured with the same self-hosted Be Vietnam Pro and warm-paper background as the site.

Minor polish delivered: matching book/route/clock/heart/shield icons for vocabulary, progress, time and vitals; monochrome social marks retain quiet placement and larger invisible click targets.

Before/after examples: `Toàn màn hình ↗` becomes an expand SVG button with the same full accessible name; `✓ Hoàn thành thử thách` becomes a consistent check SVG plus the preserved words; `★★☆` becomes two filled and one outlined star with a spoken numeric rating. No approved learning instructions were rewritten.

## Verification

- 47 unit tests and production build pass.
- All three home mode choices, level selection, keyboard Enter, disclosures and local history were exercised at 320, 390, 768, 1366 and 1920px.
- Dedicated icon checks at 320/390/768/1366px exercise utility names/targets, sound state, contrast/reduced-motion toggles, chapter launch, pause/resume/end, result icons and detailed word history. No page errors or horizontal overflow observed. Screenshots of home, lobby, pause, result and history were inspected.
- Actual UI input was exercised for Simplified/guardian at 1366px, Traditional/moth at 390px and Zhuyin/sentinel at 320px; damage and detailed history remain correct.
- A saved partial challenge resumes at 7/60; the remaining 53 successful answers reach victory at 60/60 with three stars and S. History retains both runs and word-level results. The first 20 total successes do not finish the challenge.
- Legacy completion data, Escape keeping history-paused combat paused, reduced motion and WebGL fallback remain valid.
- The prepared production build under `/chinese-typing-game/` loads the portrait and action atlas correctly and accepts mobile input without page errors.

The outcome is implemented and reviewable locally. It has not been deployed to the live student URL. Browser viewport checks do not replace real-device or real-student testing.
