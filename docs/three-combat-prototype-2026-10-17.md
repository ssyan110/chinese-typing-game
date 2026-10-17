# Solid 3D combat prototype with Remotion — 2026-10-17

## Why this replaces the previous approach

The user rejected the picture-mesh animation as visibly distorted still artwork. The previous UV deformation and per-image WebGL renderers have been removed from the local game. This prototype uses actual 3D meshes with parent/child joints for shoulders, elbows, hips, knees, head, clothing and weapons; the moth uses solid extruded wings with pivots. Character pixels are not stretched or warped.

This is a **new stylized/cartoon art direction**, not a high-fidelity recreation of the original painted characters. The three characters and hero are locally authored procedural geometry, not professionally sculpted/rigged imported production assets. Animation and integration are reviewable; visual acceptance remains with the user. No deployment, push or replacement of the live art was performed for this revision.

## Working previews

- Interactive action study: `http://localhost:5186/animation-lab/preview.html` (Vite). Auto-plays a sequence; supports opponent selection, attack, ward, defense, hit, heal and half-speed playback.
- Remotion Studio: `http://localhost:3011/CombatStudy`. The 13-second composition is driven deterministically by `useCurrentFrame()`, using the same scene and poses as the game.
- Local game: `http://localhost:5186/` uses the new renderer during battles. Practice rules, stored records and game engine outcomes are unchanged.

Start Vite with `npm run dev -- --port 5186`. For the animation workspace run `npm ci --prefix animation-lab` once, then `npm run animation:studio` from the game root. Remotion and React are isolated in `animation-lab`; the student game does not load those packages. Three.js is lazily loaded when a battle starts.

The preview is interactive and was not exported with the Remotion renderer; no final production video is claimed.

## Motion contract

- Idle: joint-based breathing, head/cape/hair movement, moth wing flaps.
- Attack: weight shift/wind-up, stepped lunge, torso turn, elbow extension, weapon sweep, recovery.
- Enemy attack and hit: separate timed poses; receiving actor bends/recoils and recovers.
- Defense: lowered stance and raised arm, with a 3D shield; heal raises the staff.
- Volumetric projectiles, 3D particle shards, impact rings, directional lighting and cast/contact shadows.
- Actual engine feedback determines damage/shield/heal numbers. The runtime is faster than the slow study timeline and does not lock input or award answers from animation.
- One persistent stage replaces two image contexts. On WebGL loss or unsupported WebGL2, the local game falls back to undeformed original stills. Reduced motion keeps poses stationary.

## Checks

- 47 Node tests passed, including checks that actors contain genuine 3D geometry, joints move independently and wind-up/strike/recovery are distinct.
- Browser flow passed for Simplified/guardian at 1366px, Traditional/moth at 390px and Zhuyin/sentinel at 320px: rendered the 3D stage, cast a spell via UI input, changed real enemy HP, opened retained word history, no page errors and no horizontal overflow.
- The old `.actor-mesh` elements no longer exist. Screenshots under `output/playwright/three-*` were inspected for silhouettes, weapon bounds, HUD/input readability and actor geometry continuity.
- Test browser requestAnimationFrame samples averaged 16.7ms in those short checks; this is not a physical mobile-GPU benchmark. The game stage updates at approximately 30Hz.
- Production build passes. Its lazy Three.js scene chunk is approximately 137KB gzipped; Vite reports its uncompressed size exceeds 500KB. It is not loaded on the setup/history screen.
- Native IME candidate windows, real-phone software keyboards, Safari and actual classroom usability were not revalidated here.

## Primary technical references

- [Remotion: frame-driven composition](https://www.remotion.dev/docs/idea)
- [Remotion: ThreeCanvas and synchronized Three.js use](https://www.remotion.dev/docs/three-canvas) (reference; this prototype directly drives its shared Three.js scene from the current frame).
- [Three.js Object3D: hierarchical transforms](https://threejs.org/docs/pages/Object3D.html)
- [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer)
