# Panda Playground interface

Adam selected concept C on 2026-10-21. The implementation uses sky blue, ivory,
navy, coral primary actions, pastel mode cards and subtle solid bottom shadows.
Existing Vietnamese instructions, all input modes, practice rules, saves and
the articulated battle characters remain in place.

`src/summoner/playground.css` is the final visual layer after the existing
stylesheets. It styles the home, course form, route, chapter cards, journey,
battle controls, results and dialogs. Combat coordinates and keyboard viewport
geometry remain owned by `battle-stage.css` and `mobile.css`.

The home background is decorative; all headings, instructions and controls are
native HTML. On phones the mode cards become a vertical list. Reduced-motion
preferences disable the new card transitions, and focus rings remain visible.

## Illustration

- Tool: built-in image generation, generated for this project.
- Production file: `public/original/art/playground/home-adventure.webp` (247,166 bytes).
- The selected-media staging script includes `original/art/playground` so the
  production build contains the same illustration as development.
- This image is a homepage background, not a replacement for the in-game 3D cast.

Generation prompt:

> Create a premium polished 3D animated family adventure game website background
> illustration, landscape 1536x1024. Bright airy sky blue clouds, floating Chinese
> mountain islands, emerald trees, tiny traditional Chinese village architecture,
> a stone path and warm lanterns. Very cute rounded RED PANDA explorer with orange
> fur, striped fluffy tail, green tunic and small backpack holding a warm glowing
> lantern, large on RIGHT THIRD of composition, full body visible, friendly face,
> standing on a mossy floating island. LEFT HALF is very pale blue and white open
> cloud sky, quiet low detail blank space suitable for overlaid dark navy website
> headings. Bottom fifth fades smoothly into soft ivory white clouds to support
> overlaid UI cards. Cheerful warm daylight, tactile high quality stylized 3D,
> beautifully art directed, soft shadows, coral orange and teal accents. NO TEXT,
> NO LETTERS, NO SYMBOLS, NO UI, NO LOGOS, NO WATERMARK. This is background artwork
> only, not a website screenshot.

## Verification

- 103 existing Node tests passed.
- All 34 existing browser checks passed, including the three complete eight-stop
  journeys, phone keyboard layouts, persistence, backup and WebKit composition.
- Production build passed and includes the 247,166-byte homepage illustration.
- Inspected desktop and phone screenshots for the home, course, lobby and battle.
- Home, course, lobby and battle have no horizontal page overflow at widths
  320, 390, 768, 1024 and 1440 CSS pixels.
- Screenshots and browser-suite log are under ignored `output/ui-refresh/`.
- Browser automation simulates phone keyboard geometry; physical iOS/Android
  keyboard acceptance is not established by this visual update.
- No deployment was performed as part of this change.
