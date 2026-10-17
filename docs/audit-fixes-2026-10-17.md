# Audit fixes — 17 October 2026

Implemented with separate mobile, engine/review, and storage sub-agents, then integrated and verified together.

## Delivered

- Mobile challenges wait for an explicit **Bắt đầu** action before countdown/HP penalties. Pause/resume and supply choices return to readiness on phones. The input can receive focus before starting, and the start button preserves it.
- Native-keyboard layouts prioritize HP, target, countdown, actionable answer/save feedback, input and pause. Optional scenery and spell controls give way when space is limited.
- At 320×568, all 41 Zhuyin touch keys fit in a seven-column grid with roughly 39×44px targets. Physical keyboard mapping is unchanged. Landscape sizing reserves enough width for the original four-row layout.
- Mistake review completes the entire selected set. Unit regressions cover 1/10/11/20 words in Simplified, Traditional and Zhuyin, including correction and untimed/damage-free behavior.
- Progress, partial practice and history use a single atomic `tulinh.save.v1` snapshot. Web Locks allow one writer tab. Secondary tabs explain the conflict and cannot overwrite saves or start conflicting practice. A new owner reloads durable data before writing.
- Existing split-key saves migrate without deleting the originals. Invalid canonical saves and storage failures are reported rather than silently overwritten. A pagehide cancels pending lock acquisition and ends the current combat record; returning reloads saved word practice instead of resuming a stale combat object after ownership changes.
- History includes validated JSON backup download and restore. Restore shows the number of completed words and history records and requires a visible replacement action. Invalid or oversized files leave current data intact.
- Returning users can reopen the last selected course directly. Timing controls now precede chapter browsing. Screen transitions establish heading focus, while native dialogs and labeled controls remain available.
- Reduced-motion scenes avoid repeated static redraws. Combat rendering pauses behind history/reward dialogs. The existing illustrated/3D identity and three-pass learning requirements remain intact.
- Added a maintained `npm run test:browser` suite and a CI browser gate. It builds the production prefix `/chinese-typing-game/` and checks the delivered application, not only source modules. Historical mobile scripts were updated for readiness and current 60-answer chapters where touched.

## Validation

- 73 active Node tests pass.
- Production build passes; the lazy Three.js chunk still triggers Vite's existing >500 kB warning.
- Root dependency audit reports zero known vulnerabilities at verification time; the separate animation-lab dependency tree is not included in that claim.
- Maintained production-browser coverage: desktop full 60-answer campaigns in all three modes; durable progress/history after reload; complete 20-word mistake review; single-writer ownership transfer and history deletion; backup download/preview/restore/rejection; storage denial; phone ready gate, answer input, pause/resume and rotation; 180–420px native-keyboard viewport fixtures, panning, pinch zoom and dismissal; return-to-course navigation.
- Final maintained production suite: 14/14 passed in 33.5 seconds using installed Chrome against the built GitHub Pages prefix, including recovery from a corrupt save using a validated backup. The broader mobile script also passed all 280 checks across three modes and ten portrait/landscape sizes, plus keyboard viewport fixtures.
- Additional full phone campaigns against the production build at 320×568: Simplified, Traditional and Zhuyin each completed 60 answers with 11 supply choices, no page errors, and completion retained after reload. This run used normal combat animation and touch interactions.
- Final screenshots were inspected for the 320px Zhuyin layout and the compact native-keyboard readiness state. Screen geometry and interactions are automated; these are not learner acceptance results.

Commands:

```sh
npm test
npm run build
npx playwright install chromium
npm run test:browser
```

For an installed local Chrome, use `PLAYWRIGHT_CHANNEL=chrome npm run test:browser`. CI installs Chromium automatically. Test output is ignored under `output/`.

## Boundaries and remaining research

This change is local and has not been deployed or pushed. Physical iOS/Android candidate windows, Safari, learner touch accuracy, screen-reader behavior, and device battery/thermal performance still need direct acceptance checks. Browser input and viewport emulation cannot establish those results.

The audit's proposals to change reward cadence, profile/reduce 3D geometry, add offline installation, or introduce cloud/teacher workflows remain research or expansion decisions. The existing reward rules and learning requirements were preserved. CSS stage ownership was clarified for the affected mobile states; a wholesale styling/framework rewrite was not undertaken.

Natural Vietnamese gate: new controls identify the action and outcome—open the keyboard, start timing, download a backup, or explicitly replace current data. Existing Chinese character variants and gameplay vocabulary remain unchanged.
