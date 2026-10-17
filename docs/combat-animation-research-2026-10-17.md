# Combat animation research — 2026-10-17

Scope: first-party game-development references and browser guidance for a classroom typing game. These findings inform implementation; they do not establish that this game's current animation or balance has passed playtesting.

## Findings from primary sources

1. **Effects must explain the action.** Riot's VFX education stresses balancing satisfaction with gameplay clarity, showing the relevant action/state and a coherent visual identity. More particles alone are not a better result. [Riot: Visual Effects](https://www.riotgames.com/en/artedu/visual-effects)
2. **Hit reactions are gameplay feedback, not only decoration.** Santa Monica's combat lead describes exaggerated enemy reactions as part of God of War's core combat identity. The team constrained reactions to keep enemies visible and tuned their movement rather than relying entirely on physics (slides 20–21, 143–165). This supports deliberate readable poses and bounded recoil; it does not prescribe this game's timing. [Mihir Sheth: Evolving God of War's Combat](https://media.gdcvault.com/gdc2019/presentations/Sheth_Mihir_EvolvingCombat.pdf)
3. **Articulated 2D characters can perform real poses.** Godot's cutout workflow divides a character into parts with local pivots and parent/child transforms. Rotation of torso, arms and legs produces poses; depth ordering and particles can be combined with the rig. This is distinct from moving one complete picture. The page warns that parts of its Godot-specific instructions may be outdated; the technique, rather than those APIs, is the relevant reference. [Godot: Cutout animation](https://docs.godotengine.org/en/stable/tutorials/animation/cutout_animation.html)
4. **Choose the rendering tool for the effect.** Riot's HTML/JavaScript client uses different animation tools for different needs and notes that layout/paint work is expensive. Multi-element sequences also require explicit orchestration. This is evidence for a small event-driven animation state/timeline, not a claim that a browser game needs a new 3D engine. [Riot: Animation in the League of Legends Client](https://www.riotgames.com/en/news/animation-league-legends-client)
5. **Prefer transforms/opacity and verify rendering cost.** Google's browser guidance recommends avoiding animation of layout/paint properties where possible, checking the rendering pipeline in DevTools, and using `will-change` sparingly. Mobile performance still needs measurement on representative hardware. [web.dev: High-performance CSS animations](https://web.dev/articles/animations-guide)
6. **Motion should be reducible.** W3C's explanation of WCAG 2.3.3 recommends respecting motion preferences and allowing nonessential interaction animation to be disabled. Preserve the information in a stationary alternative. [W3C: Animation from Interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions)

## Proposed application to this game

The following is a design proposal, not timing copied from a cited production game.

- **Use lightweight articulated 2D with depth cues (2.5D).** Animate separate head, torso, casting arm, supporting arm and legs; monsters should have independent head/body/limb or wing/tail poses. Ground shadows, layered projectiles, foreshortened rings and small scale changes provide spatial depth. Describe this honestly as 2.5D, not actual 3D models.
- **Player attack:** short anticipation (arm draws back, knees bend), decisive cast/strike (torso turns, arm extends), projectile/trail, impact at the target, then recovery. Starting point: roughly 100 / 140 / 220 ms for anticipation / strike / recovery; tune visually. Do not lock or clear typing input while this plays.
- **Impact:** synchronize contact spark/ring, damage number, target torso/head recoil and a short held contact pose (~40–60 ms). This visual hit-stop must not pause the lesson timer or reject keystrokes. Avoid a fullscreen white flash.
- **Monster attack:** clearly different wind-up pose and directional warning before release; then player flinch, shield response if relevant, and recovery. Drive cues from actual combat events/timing, not unrelated looping effects. Do not imply a dodge mechanic that does not exist.
- **Idle:** restrained breathing and separate appendage movement. **Defeat:** knees/body collapse or dissolve rather than sliding the whole picture away. Avoid constant camera motion; optional very small battlefield shake only on stronger impacts.
- **Overlapping events:** newest attack/hit events must replay reliably; clean up particles/timers after effects and on leaving battle. Do not let an old recovery reset a newer hit state. Cap live particles, especially on mobile.
- **Reduced motion:** retain damage numbers, health changes, static impact highlights and distinct attack state; remove shake, trails and continuous bobbing. No informational loss.

## Acceptance checks

- Capture idle, wind-up, strike, impact and recovery frames: independent body-part poses must be visible for both actors.
- A hit must align damage feedback with impact; continuous fast typing must remain responsive throughout effects.
- Check repeated hits, simultaneous player/enemy effects, defeat, restart, mobile viewport and reduced-motion mode.
- Profile a representative mobile device; screenshots alone cannot prove smooth frame rate.
- Balance is a separate audit: verify the victory condition and vocabulary coverage before increasing HP. Extending animation or a timer cannot repair an early-win logic error.
