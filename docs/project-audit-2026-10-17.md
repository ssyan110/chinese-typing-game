# Project review — desktop and mobile

Reviewed 17 October 2026. Repository commit: `094976fb55994babd8cb67a41956358db1b177ab`.

## Verdict

The game has a clear visual identity, substantial vocabulary coverage, and a well-separated combat engine. Preserve those foundations. The best next investment is mobile input readiness, visible gameplay feedback, complete mistake review, and durable local storage. Additional artwork, backend services, and game modes should come after these fixes.

This is a review of the current local implementation, not acceptance of the hosted release or a physical-device usability study. No application source was changed.

## Verification

- `npm test`: all 53 active tests passed.
- `npm run build`: passed. Main JS 60.39 kB / 21.47 kB gzip; CSS 104.91 kB / 21.13 kB gzip; lazy combat chunk 546.12 kB / 143.19 kB gzip. Vite reports a large-chunk warning.
- Root `npm audit --json`: zero reported vulnerabilities at audit time. This does not cover the separately locked animation-lab dependency tree or establish that the application has no security defects.
- Chromium UI checks: home, selection, chapter launch, answer entry, pause, stop/results, and history at 320×568, 390×844, 844×390, and 1366×900. Those exercised flows produced no page errors. Additional checks covered Traditional Chinese at 390×844, Zhuyin at 320×568, and landscape at 568×320.
- Controlled VisualViewport fixture: 390px phone with 360px visible keyboard-open height. Input stayed inside the visible region, but HP and feedback were hidden.
- Existing `scripts/browser-mobile-check.js`, with only the test server URL changed in memory, failed at `simplified 568 target and input visible together`. It stopped there; the rest of that matrix is not a current pass. Log: `output/mobile-audit-2026-10-17.log`.
- Direct engine reproduction confirmed a 20-word review finishes after ten distinct words. Two browser tabs confirmed two separate completed practice runs leave only one persisted history record.
- Screenshots were inspected for desktop, portrait, landscape, lobby, and keyboard-open layout. Evidence is in ignored `output/playwright/audit-*.png`.

No physical iPhone/Android device, native Chinese candidate window, Safari, thermal/battery profile, screen-reader session, student session, or live deployment was verified. Browser-generated Chinese input is not a real IME test.

## Prioritized findings

P1 means fix before expanding student use. P2 means valuable optimization after correctness. Effort estimates are relative: S is a localized change, M crosses several modules, L introduces a substantial product workflow. They are not delivery promises.

### 1. P1 · Start the clock when the phone user is ready — S/M

**Observed:** A fresh 320×568 phone chapter started with no focused input and roughly five seconds remaining. Waiting 5.3 seconds without typing caused one miss and reduced HP from 100 to 94. Users still need to open the keyboard, choose Chinese input, and find candidates during that window.

**Evidence:** `src/summoner/app.js:73`–75 creates a playing duel immediately and deliberately focuses input only on desktop; `engine.js:67` applies timeout damage.

**Fix:** Introduce an explicit ready state for new runs. Let the user focus/open the keyboard before starting the countdown. Preserve the existing pause-on-background behavior. Resume after a modal should also provide time to regain input focus.

**Done when:** Fresh phone users can open/switch their Chinese keyboard without losing HP; ready, pause/resume, and rotation never consume an unseen prompt.

### 2. P1 · Keep essential feedback visible above the native keyboard — M

**Observed:** With visible height 360px, both `.hero-vital` and `#battle-notice` compute to `display:none`, while the 3D canvas remains visible. The input fits, but the player cannot see remaining HP or the explanation for an uncredited correction. The hidden status region also cannot serve as normal visible feedback.

**Evidence:** `src/summoner/battle-stage.css:35` onward hides vital cards, then restores the mini-stage; `src/summoner/mobile.css` hides the battle notice in native-keyboard mode. Screenshot: `output/playwright/audit-ime-360.png`.

**Fix:** Reserve a compact line for HP, shield/energy as needed, and the last answer outcome. Give that line priority over scenery. Keep the actual Chinese target and input together; avoid adding a competing duplicate question panel.

**Done when:** At 180–420px visible heights, users can see the target, countdown, input, pause, HP, and actionable error/save feedback without dismissing the keyboard.

### 3. P1 · Fit the complete Zhuyin keyboard on small phones — M

**Observed:** At 320×568, the touch keyboard extended from y=501.8 to y=714.2. Users cannot see the target and all four key rows together. Keys measured approximately 24.7–27.4px wide and 41.6px tall; that is a demanding touch task under a timer even where the layout has no horizontal overflow.

**Evidence:** `src/summoner/app.js:109` generates a desktop-style four-row keyboard; `mobile.js:23` enforces arena minimums; final `battle-stage.css` minimums further increase stage height. Screenshot: `output/playwright/audit-zhuyin-320x568.png`.

**Fix:** Budget the whole viewport, not just the arena. Reduce optional scenery/status density first. Explore a phone-specific Zhuyin arrangement with larger targets while preserving standard keyboard mapping for physical keyboards. Do not fix fit by making characters or controls tiny.

**Done when:** All keys and the active target remain reachable together at 320×568; touch accuracy is checked with actual learners, including tone marks.

### 4. P1 · Restore the landscape fit regression — S/M

**Observed:** The existing mobile suite fails its 568px landscape visibility assertion. In a focused reproduction after input, the form bottom was y=323 in a 320px-high viewport. This particular clipping is small, but it contradicts the fit contract and exposes competing layout rules.

**Evidence:** `scripts/browser-mobile-check.js`; overlapping landscape/native-keyboard rules in `mobile.css` and later `battle-stage.css`. Screenshot: `output/playwright/audit-landscape-after-input.png`.

**Fix:** Define one viewport budget per keyboard/orientation state, including gaps, borders, and safe areas. Remove conflicting arena minima from later overrides.

**Done when:** The existing visibility matrix passes again, followed by real portrait/landscape keyboard checks. Do not equate passing `mobileViewport()` unit tests with fitting the actual page.

### 5. P1 · Review every word promised by “review mistakes” — S

**Observed:** The UI offers review of the entire mistake list, but a review duel declares victory after `Math.min(10, this.words.length)` successful answers. With 20 distinct review words, ten remain unpracticed.

**Evidence:** `src/summoner/engine.js:47`; review button and progress label in `app.js:90` and `app.js:105`. Direct reproduction returned `{status:'won', correct:10, unique:10, requested:20}`.

**Fix:** Finish after all selected review words, or deliberately partition reviews into visible ten-word batches and provide the next batch. Track completion by word identity if error retries are introduced.

**Done when:** Review sets of 1, 10, 11, and 20 words account for every selected word before reporting completion.

### 6. P1 · Prevent multiple tabs from losing saved progress/history — M

**Observed:** Two tabs loaded before either run saved. After each completed a separate practice run, storage contained one history record rather than two. Each tab writes its stale in-memory collection back over the shared key. Progress/practice use the same overwrite pattern.

**Evidence:** `src/summoner/app.js:12`, 17, 20–21; no storage-change listener or transactional merge. The reproduction used isolated test-browser storage.

**Fix:** Use transactional IndexedDB records, or enforce a single writer and explain the active-tab state. A `storage` listener alone does not make concurrent read/modify/write atomic. Preserve deletions with explicit semantics so merging cannot resurrect deleted history.

**Done when:** Concurrent answers and history deletions in two tabs preserve intended data after both tabs reload.

### 7. P2 · Reduce mobile rendering cost before adding more effects — M

**Measured/code-derived:** The combat chunk is already lazy-loaded, which is good. A guardian scene contains 169 meshes and roughly 169,114 geometry triangles before accounting for extra rendering passes; moth and sentinel scenes contain 135/146 meshes. These are scene counts, not measured GPU draw calls or proof of poor FPS. Rendering uses shadows, antialiasing, and up to 1.5 device pixel ratio. `combat-motion.js` redraws about every 33ms while the battle screen is active, including reward states and reduced-motion static scenes.

**Evidence:** `src/summoner/combat-scene3d.js:64`–85; `combat-motion.js:17`; scene traversal performed during this audit.

**Fix:** Add a static/low-effects quality option, stop idle redraws in reduced-motion/static states, and stop rendering behind blocking reward/history dialogs. Measure frame time on a midrange Android phone before reducing geometry or changing shadows. Cache shared geometry/materials where profiling supports it.

**Done when:** Record frame-time and input responsiveness on representative hardware; timers/input remain responsive under rendering load. Do not simply suppress Vite's bundle warning.

### 8. P2 · Make local saves recoverable and less expensive — M

**Risk:** Every credited answer serializes progress, partial practice, and the full recent history synchronously to localStorage. The data is split across keys without a transaction. Quota failures can leave partial writes. There is no export/import backup and no exact duel-state restoration after browser eviction. Existing local-only notices are honest and should stay.

**Evidence:** `app.js:20`–21, `history.js`, and the storage notice in `index.html`. This review did not benchmark long-history serialization or simulate quota failures.

**Fix:** Store incremental records in IndexedDB with a versioned schema and transaction boundary. Add validated JSON export/import for recovery before considering accounts. Separate successful persistence of practice, completion, and history in save-state reporting.

**Done when:** Quota denial, interrupted writes, corrupt input, export/import, and reopening after OS eviction have explicit tested behavior.

### 9. P2 · Shorten the return-to-practice path — S/M

**Observed/design judgment:** The phone home is attractive, but returning players repeat mode and level selection. At 390px the lobby is approximately 2,625px tall; timing controls follow twelve chapter cards, so a beginner may reach a timed run before discovering a slower setting. This is a navigation opportunity, not a reason to remove exhaustive curriculum access.

**Evidence:** `showModes()`, `chooseMode()`, `renderCurriculum()` in `app.js`; inspected home/lobby screenshots.

**Fix:** Offer a prominent return-to-last-course action, a readable timing control beside the main start action, and a collapsible chapter catalog. Keep mode changes, full word coverage, and manual chapter selection available.

**Done when:** A returning learner starts the intended next chapter directly, and a first-time learner sees how to adjust time before launch.

### 10. P2 · Reduce interruptions without weakening practice requirements — M

**Code-derived/design judgment:** A fresh 20-word chapter requires at least 60 credited answers. Reward selection interrupts every five correct answers: typically eleven dialogs before the final answer, and potentially more if the boss survives. The repetition requirement is intentional; the interruption frequency deserves learner testing.

**Evidence:** `engine.js:61`–62; three-practice and enemy-HP completion guards.

**Fix:** Test a less frequent supply cadence or an explicit learner-selected reward preference. Preserve full word coverage, interleaving, correction/requeue behavior, and no automatic full-health revival. Explain why the boss remains alive after word practice is complete.

**Done when:** Compare completion time, abandonment, and perceived interruption with learners, while retaining every required practice credit.

### 11. P2 · Put browser regressions in the release gate — M

**Observed:** CI runs unit tests and a build, but no browser smoke test. Many browser files are standalone function expressions rather than an obvious maintained test command. Some are stale: `browser-mobile-campaign.js` still expects victory after 20 correct answers despite current three-pass rules.

**Evidence:** `.github/workflows/pages.yml` (workflow content), `package.json`, `scripts/browser-mobile-campaign.js`. The active mobile script failed during this audit despite unit tests passing.

**Fix:** Provide one documented browser-test runner and separate active regression checks from historical scripts. Gate release on representative phone Hanzi/Zhuyin, keyboard-open fit, defeat/retry, review >10 words, storage, and the GitHub Pages base path. Add meaningful tests for these failures rather than broad snapshot tests.

**Done when:** A fresh checkout can run the maintained suite with one command and CI catches the reproduced issues.

### 12. P2 · Simplify CSS ownership and source maintenance — M

**Observed:** Ten stylesheets are linked in order. Multiple generations of arena and keyboard rules override one another; `battle-stage.css` both hides and later restores the compact canvas. Much of `app.js` and `engine.js` is compressed into extremely long lines, making state and persistence changes harder to review.

**Evidence:** `index.html:2`; `mobile.css`, `arena-layout.css`, `product.css`, `battle-stage.css`; `app.js` manages rendering, storage, navigation, audio, input, and game orchestration together.

**Fix:** Format the active source, establish one owner for each layout state, and extract storage/input/audio responsibilities incrementally. Preserve the plain-module architecture; a framework rewrite is not justified by the current scope.

**Done when:** Each mobile state has a clear authoritative layout block and changes can be reviewed without tracing repeated late overrides.

### 13. P2 · Strengthen accessible screen transitions and recovery feedback — S/M

**Code-derived:** `showScreen()` hides/shows sections and scrolls but does not establish a general focus destination. Battle focuses only on desktop. Keyboard-open rules hide the live feedback region. Existing semantic buttons, labeled utility icons, native dialogs, reduced-motion and contrast settings are worth preserving.

**Fix:** Move focus intentionally to a visible heading/control after navigation and results, preserve dialog return focus, retain a visible concise status line, and manually check keyboard and screen-reader behavior. Verify dark arena text contrast using computed colors rather than assuming the high-contrast toggle proves compliance.

**Done when:** A keyboard/screen-reader user can identify the current screen, start/stop a run, understand an error, and return from history without losing their place.

## Backend and operational assessment

There is no application server, authentication, database, teacher dashboard, cloud synchronization, or server-authoritative scoring in the current app. GitHub Pages delivers static assets, vocabulary is fetched as JSON, and the browser owns game state. That is an appropriate low-operations model for individual practice. Missing accounts are not a defect against the documented scope.

Prioritize reliable local persistence and backup. Add a backend only for a defined requirement such as cross-device continuation or teacher assignments. A future service should separate authenticated learner progress, assignment membership, attempts, and vocabulary versions; enforce access control on the server; and make synchronization idempotent. Client-generated scores must not become trusted competitive rankings merely because they are uploaded.

For mobile network resilience, evaluate a small versioned offline cache for the app shell and selected vocabulary. There is currently no service-worker/offline installation flow. Do not market offline support from ordinary HTTP caching, and avoid indiscriminately caching all artwork/audio. Instrument errors/load failures only with an explicit data-minimization decision; current silent catches help fallback but provide little owner diagnosis.

## Design critique

Keep the forest/paper/honey palette, Vietnamese-first labels, illustrated red panda, clearly distinguished Chinese modes, quiet publisher credit, and prominent Chinese gameplay target. The visual direction is recognizably a learning game and does not need a wholesale redesign.

The strongest improvement is a simpler information hierarchy during typing: Chinese target → input → outcome and HP → optional combat scenery. The current keyboard layout gives scenery space while hiding actionable state. On the phone lobby, make continuing and adjusting difficulty the first decisions; chapter browsing should remain available without dominating the return visit. Tiny status text and narrow Zhuyin keys should not be the mechanism that makes the layout fit.

Vocabulary provenance and mechanical coverage tests are useful, but generated Traditional Chinese/Zhuyin conversions still require linguistic review for regional readings and polyphones. No conversion defects are asserted by this audit. Do not add pinyin to Han-character gameplay to compensate for onboarding or input issues.

## Recommended build order

1. **Mobile correctness:** readiness state, keyboard-visible HP/outcomes, Zhuyin fit, landscape regression. Acceptance: real iOS Safari + Android Chrome Hanzi entry and touch Zhuyin, portrait/landscape, background/return and rotation.
2. **Learning and data integrity:** complete review sets; transactional storage or a single-writer safeguard; backup/recovery. Acceptance: >10-word review and two-tab persistence reproductions pass.
3. **Release confidence:** maintain one browser suite and add it to CI; include production base-path smoke coverage.
4. **Performance and product polish:** profile mobile rendering, simplify CSS ownership, improve return-to-practice navigation, and test reward cadence with learners.
5. **Optional expansion:** cloud progress or teacher workflows only after their user need and acceptance criteria are defined.

The smallest useful closure task is the mobile readiness state: no countdown or HP loss until the learner explicitly starts after opening the input. It has a concrete reproduction and a clear completion condition.
