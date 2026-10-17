# Refined articulated characters · local preview

The existing Three.js / Remotion joint animation is preserved. The hero now has swept hair, smaller face proportions, layered sleeves, cloth folds, embroidered robe panels, scarf tails, a waist knot and pendants. The jade guardian has a lion muzzle, curled brows and mane, curved antlers, an ornamental back arch, layered armor, fingers and tassels. Moth wing eyespots and veins and sentinel ornaments are refined too. Procedural jade veining, fabric grain and metal roughness are shared by runtime and stills.

`combat-sculpt.js` attaches ornament to the original joints and batches static geometry per joint/material. It does not merge independently animated bones. These remain stylized procedural models; they do not reproduce the original illustration's intricate sculpting and painted detail.

The homepage, chapter opponents, free-play cards, WebGL fallback figures and social cover now use matching stills captured from the actual models. Original painted assets are retained as references. Mobile keeps the existing compact layout that hides the large decorative home illustration.

Preview: http://localhost:5186/ and http://localhost:5186/animation-lab/preview.html . Remotion uses the same scene at http://localhost:3011/CombatStudy . This branch has not been published to students.

Rebuild stills with the local Vite server running: execute `scripts/capture-refined-portraits.js` with the Playwright CLI, then convert the four PNG captures in `output/sculpted/` to WebP in `public/original/art/sculpted/` with cwebp. `animation-lab/portraits.html` sets the camera and lights. Capture `scripts/capture-refined-cover.js` to regenerate the 1200×630 social cover.

Validation: all 47 unit tests pass; production build passes. Browser combat checks passed for guardian at 1366px, moth at 390px and sentinel with Zhuyin at 320px: correct input, damage, one 3D canvas, detailed history, no horizontal overflow and no JavaScript errors. Browser requestAnimationFrame averaged 16.7ms in this desktop environment; that is not a physical phone performance measurement.
