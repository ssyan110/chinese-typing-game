# Safari input and character visibility correction

The user's real iPhone screenshots exposed gaps in the Chromium-only acceptance checks.

- Cancelling `pointerdown` on the Start button suppressed its tap-generated click in WebKit. Removing that cancellation restores the existing start/resume flow; no extra input mode was added.
- The renderer measured a hidden canvas before showing it, then skipped resize/redraw while the challenge waited for Start. It now measures after becoming visible and redraws a paused scene when its visible dimensions change.
- Compact Hanzi layouts and sufficiently tall keyboard-open layouts now retain a small character stage. The smallest keyboard viewports still prioritize the Chinese target, HP, feedback and input.
- Programmatically focused headings no longer get the blue browser outline. Interactive controls retain their keyboard focus indicators.

Added WebKit regressions for touch Start, Simplified/Traditional composition, paused-scene sizing, rotation and keyboard viewport changes. CI installs WebKit as well as Chromium. These tests model composition events and viewport changes; they do not operate an actual iPhone Chinese keyboard.
