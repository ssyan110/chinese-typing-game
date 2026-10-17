# Articulated lantern red panda

The battle hero now uses authored Three.js volumes and a joint hierarchy. No Sprite, character-image texture, atlas, crop or frame selection participates in its rendering. The previous atlas is retained as historical source only and excluded from the production build.

Head, ears, eye blinks, shoulders, elbows, paws, hips, knees, single ringed tail, cape and lantern move independently. Attack has anticipation, extension and recovery; hit, guard and healing have separate poses. Reduced motion returns a stable neutral pose. The deterministic time-driven scene is shared with Remotion Studio; no video was exported.

The new model has a rounded 3D toy appearance. It does not reproduce the approved painted illustration's fine fur detail. That illustration remains on the homepage, sharing cover and WebGL fallback.

Validation: 53 unit tests; production build; four browser action controls with zero atlas requests and no page errors; actual input at 320/390/1366 pixels preserves the 2-HP wrong-draft cap; 60 camera/actor/action combinations contain all actor bounds without clipping. These checks establish behavior and framing, not user acceptance of the new art style.
