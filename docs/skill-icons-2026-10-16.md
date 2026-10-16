# Skill and reward controls

Players should identify an action by its emblem, then confirm a short Vietnamese name and the cost or reward. Three original SVG emblems replace typographic symbols: a gold lightning slash for strike/power, a blue crystal shield for ward/protection, and a green healing crest for mend/heal. No external game artwork or branding is used. The existing paper, jade and brass palette and Be Vietnam Pro type are retained.

Battle controls are now three icon buttons with cost badges and a selected checkmark. Hidden descriptions remain in their accessible names; desktop tooltips and the existing battle-help disclosure explain effects. Rewards use three side-by-side tiles with short names and numeric effects. A separate disclosure retains exact effects and HP/shield caps without filling each tile with prose. Game rules, costs and persistence are unchanged.

The icon sizes adapt to available space: 64px desktop skills, 56px regular mobile skills and 42px on short/landscape screens. Reward icons are 60–80px on portrait phones and 52px on short landscape screens. The existing native-keyboard layout retains compact controls and hides optional controls only in its very tight viewport state.

Verification: 28 Node tests, build, 280 mobile assertions across three modes and ten sizes, plus `scripts/browser-skill-icons-check.js`. The latter completes a 20-item chapter in each mode at 320×568, selects heal/power/shield rewards, expands/collapses effect help, checks reward icon geometry and rotates the reward dialog through 390×844, 844×390 and 568×320. Browser touch simulation is not physical-device testing. Screenshots and logs are retained under ignored `output/`.
