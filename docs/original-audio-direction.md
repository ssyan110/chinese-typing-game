# Đèn Sao — original music and sound

All 21 recordings were created for this project by the local score/synthesis program `scripts/compose-original-audio.py`. No recording, sample, melody extraction, artist imitation, paid generation API or source-game audio was used.

- **Lantern Courtyard**: original 16-bar D-minor-pentatonic melody, 88 BPM, 43.64-second circular loop. Soft additive plucks, a breath-like sine flute and quiet wooden percussion.
- **Jade Postroad**: related original answering motifs and new arrangement, 100 BPM, 38.4-second loop.
- **Inkstorm Duel**: transposed original motif and denser percussion, 120 BPM, 32-second loop.
- **18 sound effects**: deterministic original note/envelope/noise designs for correct/wrong answers, hover/click, guards, hits, buffs and results.

The source code contains every note, timing, oscillator, envelope and mixing rule. NumPy is used only for local synthesis; FFmpeg encodes MP3. These are authoring dependencies, not student/browser/server dependencies. Production uses the saved small MP3 files. WAV analysis of all 21 clips confirms non-silent signals and no full-scale clipping; actual HTML audio playback is separately checked in browser QA. Technical measurements do not imply subjective listening or student acceptance.
