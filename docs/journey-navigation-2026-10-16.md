# Illustrated chapters and app navigation

The chapter selector now uses illustrated stage cards: an original garden, moon pavilion or dawn gate scene, the existing original opponent art, a large chapter number and the actual vocabulary preview. Each card has a numeric completion count, a progress track and a visible next/in-progress/completed state. Chapters stay exhaustive, stable and paginated at 12 per page; no vocabulary or unlock rules changed. Layout: two columns on phones, three on tablets, four on ordinary desktops and six on very wide displays.

The game records its mode, vocabulary level, chapter-list page and screen in browser history. Page-level back buttons follow the same route. The home selection has a disabled back button because it is the first app page. Back/forward restores selections and pagination, rather than starting a new duel. Browser Back or the battle back button pauses an active duel; the pause dialog offers resume, return to chapter selection, or end and view results. Correct answers are already saved immediately. Reward selection remains modal until the player chooses a reward or ends the run. Completed/abandoned duels are never resurrected through Forward. Branding navigates inside the app instead of reloading the document.

Implementation: `src/summoner/navigation.js`, `src/summoner/journey.css`, curriculum rendering in `app.js`, original SVG scenes in `public/original/art/chapters/`. Only navigation choices are stored in history; combat objects and incomplete IME drafts are not serialized.

Validation uses `scripts/browser-journey-check.js` (31 assertions for card assets/states, back/forward, pause/resume, explicit leave, saved answers, page preservation, and layouts from 320 to 3840px). Existing Node, mobile, curriculum and duel regressions are also run. Browser touch simulation does not establish physical Safari/Android swipe or native keyboard acceptance. Logs/screenshots are retained under ignored `output/journey-*` and `output/playwright/journey-*`.

The skill/reward regression also presses Browser Back while a reward is pending, then completes all three modes with all three reward types and checks persisted completion.
