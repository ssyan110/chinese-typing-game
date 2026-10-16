# Delivery correction and regression verification

The reported screenshot was reproducible: directly opening the old `src/summoner/shell.html` showed an unstyled document with unresolved root-relative assets. The previous delivery had not verified this opening path.

## Corrections

- `shell.html` is now a self-contained, styled launcher to the published game. It has no external local dependencies. The root `index.html` also redirects on `file:` before loading application resources. Internet is required for these direct-file launch paths; local development uses the Vite HTTP URL.
- Broad gameplay testing found that successful intermediate Zhuyin keys advanced engine progress without invalidating the UI. The displayed current symbol stayed stale, encouraging repeat input and unfair errors. Each accepted symbol now updates the revision and visible progress. A regression test fails before the fix and passes after it.
- Root `index.html` is the sole app HTML source; the README no longer instructs editing the launcher as a duplicate app.

## Current verification

- Native Chrome: opened both local HTML paths and observed the styled published mode-selection screen with artwork and working controls. Closed only the temporary incognito QA window; the user's original tab remains on the working online game.
- Fifteen Node tests pass, including both file-entry guards and the Zhuyin progress regression.
- Local browser standard regression: 22 checks; composition/audio/accessibility/endless regression: 12 checks. Both pass with no runtime errors.
- Added UI-driven matrix: all 42 mode/system/level selectors load vocabulary; completed all nine combinations of three practice modes and three opponents through all three rounds. Zhuyin uses physical keyboard events following the visible highlighted symbol, with zero mistakes; Hanzi uses committed visible target text. Results record actual source vocabulary and award three stars on these clean victories.
- Checked selection, lobby, battle and result document widths at 320, 390, 768 and 1440 pixels. Inspected active battle screenshots at each width, including hero/enemy HP, target, input, tactics and controls. No horizontal overflow, clipped lower panel or missing artwork was observed. On smaller screens the page scrolls vertically.
- The 176-check local matrix reports no runtime errors or missing application assets. This count includes repeated per-target Hanzi checks; it is not 176 independent gameplay scenarios.

Browser automation supplies committed Hanzi and controlled composition events. Native macOS/Windows IME candidate-window input and physical mobile/Safari keyboard behavior remain unverified. Browser viewport checks are not physical-device acceptance.

Evidence: ignored `output/delivery-*.log` and `output/playwright/delivery-*.png`. Deployment and final published-site verification are recorded in the delivery response and GitHub Actions run.
