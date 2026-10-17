# Selected hero: lantern red panda

User selected concept 02 from the five-character comparison. The implemented hero retains rust-red fur, cream face mask, amber eyes, ring-striped tail, teal gold-embroidered cape, jade clasp, bamboo-painted paper lantern and tassels. The homepage and 1200×630 social cover use the generated high-resolution transparent portrait. Quiet Tiếng Hoa HAHA credit and channel icons are preserved.

## Runtime approach

The hero is handpainted frame art inside the existing Three.js scene. It is a camera-facing 2.5D sprite, not a fully modeled/rigged 3D animal. Enemies, projectiles, impacts, ground and shield remain 3D. The hero uses different drawn poses for readiness, windup, attack, recoil, guard and healing; no UV deformation or body-image warping is used. Attack and guard share a complete forward-paw pose with different timing and spell effects. Cropped source poses 5–7 are excluded from playback after visual QA.

`lantern-panda.js` maps the game action/progress to atlas frames and returns to idle after recovery. Reduced motion holds the ready pose. Feet are registered per frame from alpha bounds, and the static root only moves for footwork. Existing pause/event timing is retained. Scene installation waits for the atlas before hiding fallback images. Atlas load failure or WebGL context loss restores the detailed portrait. The opponent geometry and all learning/progress/history rules are unchanged.

Assets: `public/original/art/red-panda/portrait.webp` (high-resolution still) and `actions.webp` (2048×2048, 4×4 timing atlas). Original generated sources are retained locally in `output/red-panda/`; the committed WebP files are the runtime deliverables. `animation-lab/prepare-panda-atlas.html` and `scripts/prepare-panda-atlas.js` register the source art with gutters and row baselines. The renderer then aligns each displayed frame's lowest opaque pixels to the ground. No background-removal or anatomy edits were performed by the registration script.

The game uses the Pages-rewritten asset URL; Remotion injects its own `staticFile()` URL into the shared scene. Remotion Studio serves the parent public directory and uses the same image atlas. No video export was requested or rendered.

## Verification

- 47 unit tests pass, including painted pose transitions, recovery and reduced motion; production build passes.
- Browser checks pass for guardian/Simplified at 1366px, moth/Traditional at 390px and sentinel/Zhuyin at 320px: answer accepted, damage applied, one scene, detailed history, no horizontal overflow or JavaScript errors.
- All action controls load the painted atlas. A deliberately blocked atlas displays the red-panda fallback and keeps the game playable.
- Older 20-word completion records remain readable; the new 60-success goal, pause/history/Escape and context-loss fallback remain valid.
- Home and chapter images load on desktop and phone. Share cover was recaptured and visually checked.
- The prepared production build was served under `/chinese-typing-game/`; both portrait and atlas returned image/webp 200 and the mobile battle accepted input without page errors.
- The social metadata uses `social-cover-red-panda.png` so future link previews have a new image URL. Existing social posts may keep their platform-cached preview.
- Remotion Studio loads its atlas successfully, with no page errors. Desktop timing observations are not a physical-phone benchmark.

This remains a local preview on the current branch. It has not been published over the live student version.
