# Lantern Atlas · Học viện Đèn Sao

Original interface direction: a night academy whose couriers collect written lanterns and restore a sky atlas. Indigo layered paper landscapes, mint glass lantern bubbles, amber light and round controls form the interface. The palette and silhouette language deliberately replace the old parchment, timber buttons, pixel monsters, sword portraits and CRT texture.

## Visual tokens

- Canvas: `#101c38`; deep panel: `#142744`; type: `#f4f8f6`.
- Teal focus/action: `#77e0c7`; amber primary action/reward: `#ffce83`.
- Coral player damage and dusty rose opponent health keep HP changes distinct from input success.
- System sans serif for Vietnamese and Chinese system fonts for glyph coverage; no inherited display fonts or fake calligraphy.
- Rounded rectangular cards, circular lantern projectiles, fine borders, restrained translucency; no wood or source image texture.

## Screen contract

Mode choice remains the first screen. Three content cards retain Chinese script examples, Vietnamese instructions and large touch targets. Level chips follow. Stage map, results, records, loading, pause, dialogue, controls, HP, damage alerts and typing field share the same tokens.

Falling targets remain the primary reading surface. Theme CSS does not change visibility of the old top target box: the bubble input module owns removal and gameplay behavior. Timer, native Chinese IME field, pause, damage feedback, vocabulary tables and scoring disclosures retain their existing IDs and behavior.

Authored scenery and characters are integrated separately by the asset mapper. This stylesheet contains no upstream media references. It deliberately preserves the functional geometry from the responsive adaptation to avoid hiding IME or covering targets.

## Integration and QA

Load `src/reference/original-theme.css` last, after adaptation and bubble mode CSS. Check 390 px phone, 768 px tablet and desktop. Confirm mode, level, stage map, active five stages, endless boss, pause, settings, results and review disclosures. Native focus outlines, reduced motion, high contrast and HP warning semantics must stay visible. A coherent new visual identity does not itself remove obligations associated with reused code; source provenance and license assessment remain separate from this authored presentation.
