# Training damage and battle stage correction

Reported: frequent near-death during practice; wrong answers feel excessively punitive; oversized/clipped actors; unclear win condition.

## Reproduced causes

Finite practice was extended to 60 clean successes but retained survival-style damage. Pure basic attacks with non-healing power supplies lost at 28 correct answers for the guardian and 23 for moth/sentinel. A correct offensive answer countered for 7/8/10; timeout cost 22. Repeated distinct submitted errors (and wrong Zhuyin keys) could each subtract 4/3. Ordinary Hanzi typing drafts are not auto-submitted as errors; explicit submission or incorrect Zhuyin keys trigger the penalty.

The renderer covered the full arena beneath overlapping HUD/prompt layers. Camera width was fixed, irrespective of the available height. Wide/shallow arenas could crop taller actor poses. Merely scaling the hero by device width did not fix this.

## Current rules

Campaign and finite free practice only:
- Initial hero HP stays 100; 20 words per full chapter, three clean successes per word, in interleaved passes.
- First wrong submission on a presentation costs 2; further wrong submissions/keys on that presentation still count as errors and affect accuracy but do not remove additional HP.
- Timeout brings that presentation's total penalty to at most 6 (after a 2-point mistake, timeout costs 4). Shields absorb damage as before.
- Clean completion heals 1 before the selected spell and any counter. Wrong-then-correct completion still deals spell damage but does not get clean-practice credit or the passive recovery.
- Counters are 2/3/4 for guardian/moth/sentinel. Correct defense blocks the counter.
- Supplies every five completed targets, spell energy, shield, healing and power rewards remain available. Supply does not heal the monster.
- All three opponents survive until every word has three clean successes; victory additionally requires monster HP zero. If repetitions are complete but HP remains, practice continues. Hero HP zero still ends the run; partial practice persists.

Endless retains escalating survival damage and new enemies. Error review remains untimed and damage-free. These mode differences are explained in the in-game help. Historical records and save keys are unchanged.

## Presentation

The arena has separate HUD, character stage and prompt regions. Canvas sizing uses its own region rather than the entire arena. Both actors are smaller; the camera fits vertical as well as horizontal space. Floating feedback coordinates include the canvas offset. The native IME layout retains a fitted mini-stage plus a separate prompt and input; only extremely short keyboard viewports suppress the scenery. No new image generation was required.

## Verification

53 unit tests pass. Added regression cases fail against the old balance and pass after the change: perfect basic-attack runs without healing strategy, repeated Hanzi/Zhuyin errors, capped mistake-plus-timeout damage, clean defense and retained endless/review behavior. With power supplies, all three 20-word chapters win at 60 correct answers; observed minimum HP: guardian 94, moth 62, sentinel 62.

Browser checks: repeated explicit wrong submissions leave HP 98 while recording three errors; stage, HP panels and prompt do not overlap at 320/390/1366px. Sixty camera/pose/opponent/aspect cases keep full hero sprite bounds and enemy 3D bounds inside the camera, including a 1600×180 stage. A simulated 390×400 IME viewport retains a 117px stage, distinct prompt, and input ending at y394. This is viewport simulation, not proof of a specific phone/IME implementation.

Traditional/Zhuyin attack, guard, defense and timeout flows pass. The existing saved 7/60 run resumes and wins at 60/60, with word-level history preserved. Full production build passes. Deployment evidence is recorded separately from these local checks.

Natural Vietnamese gate: help and intent text now reflect the actual damage values and both completion conditions; wording preserves spell and mode distinctions.
