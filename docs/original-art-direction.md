# Học viện Đèn Sao — original art direction

The learner is a lantern courier at a fictional academy of floating observatories. Jade fabric, midnight ink, amber lantern light and cream paper replace the former pixel-art martial-arts imagery. The geometry and silhouettes in this pack were authored for this project; no source-game image pixels, extracted paths or third-party illustrations were used.

## Visual vocabulary

- **Hero:** asymmetrical jade travelling robe, cream inner fold, amber trailing scarf, rounded hair knot and hooked lantern staff. Twenty-four actual geometry/pose frames cover standing, running, jumping, attacking, defending and injury. Attack staff angles, body lean, scarf curve and jump height change across frames.
- **Adversaries:** paper creatures assembled around seven silhouette families: mask beast, folded moth, lantern sentinel, ribbon serpent, stone kite, tufted ink familiar and star shard. Elite/boss crowns distinguish stronger variants. SVG breathing animation replaces the prior GIF motion.
- **World:** layered indigo-to-teal atmospheric landscape, terrace silhouettes, moon disc, sparse stars and hanging lanterns. Bamboo and architectural pillars frame a quiet central battlefield. Six environmental color families support the original mechanics and level slots.
- **Interface:** rounded ink tiles, jade edges, warm paper accents. Original heart, shield, staff/sword, water and scroll symbols.

## Build and provenance

Run `node scripts/build-original-art.mjs` from the project root. The script generates all replacement images in `public/original/art/` and the exhaustive routing table `public/original/art-map.json`.

The mapping retains old asset identifiers solely so existing gameplay code can route to the replacement art. Old descriptive filenames are compatibility identifiers, not a claim that these illustrations depict the original game's characters. Runtime display names should use the new academy creature vocabulary.

Coverage: **87 unique original image paths → 87 authored SVG assets**. The manifest repeats one standing frame; it maps once. All vector geometry is local, self-contained, and uses no external images, web fonts, scripts or remote dependencies. Every animation is embedded SVG SMIL. The separate favicon is also original.

## QA boundary

Generation verifies file coverage. Pose-frame hashes differ within every four-frame state. This pack makes the media visually distinct; it does not independently establish legal clearance for source-derived code or mechanics. The root implementation must stop publishing source art/audio/fonts and verify rendered alignment, contrast and animation in the actual game.
