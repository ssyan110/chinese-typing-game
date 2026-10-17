# Selected articulated panda and history deletion release

The user selected the existing rounded 3D panda shown in the original combat preview screenshot, withdrawing the request to continue the detailed reconstruction. `lantern-panda.js` has been restored byte-for-byte from 28528a6. It remains an articulated, image-free model with independently posed parts. Do not replace it with the cancelled refinement or reconstructed asset. Experimental local files are archived under ignored `output/panda-model/retired-experiments/`; they are not imported or staged for production.

The game preview is http://localhost:5186/ and the animation control preview is http://localhost:5186/animation-lab/preview.html. The user authorized deploying the selected model and history deletion together on 2026-10-17. The baseline is 28528a6; publish through the main-branch Pages workflow after validation, then verify deletion against the live URL in an isolated browser context.

Each run has a trash-icon “Xóa lượt này” action. “Xóa tất cả lượt luyện” clears run results and their per-run word lists. Both require confirmation and state that deletion cannot be undone. Completed chapter/word progress and partial practice counts are preserved. If the active run is deleted, it is suppressed from later autosaves and does not silently reappear. New runs save normally. Failed storage writes preserve in-memory and displayed history and show an error.

Local validation: unit suite and production build; browser deletion/cancel/reload, legacy record deletion, progress byte preservation, active-run non-resurrection, storage-write failure, 390px confirmation text and overflow. Art approval applies to the selected screenshot model; no detailed-model parity is claimed.
