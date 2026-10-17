# Home design — lantern field guide

Audience: Vietnamese-speaking students choosing how to practice Chinese. Primary action: choose Simplified, Traditional or Zhuyin, then select HSK/TOCFL and a level. The game name and local history remain prominent; the creator credit and optional social links stay in the footer.

Applied skills: `frontend-design` for the working interface; `natural-vietnamese-writing` and reader clarity for student copy. This is implemented in the game, not a separate mockup.

## Design contract

- Color: warm paper #f6f4ec, forest #183e36, honey #e9c887; pale sage for control symbols. Dark scene with warm text, quiet light selection panel.
- Typography: existing bundled Be Vietnam Pro, 400/600/700. Display heading with two lines, compact step marker, clear mode title and supporting input instructions. No external font requests.
- Layout: illustrated left panel and right selection column at desktop width; compact illustrated panel and vertically stacked choices on phones. The existing model still is reused; no new WebGL work or animation on the home page.
- Components: articulated fox still inside an arched stage, three concise practice rules, three real mode buttons, existing vocabulary form, visible local-save note, existing sources disclosure. Hover, keyboard focus, disabled, loading and reduced-motion behavior retained.
- Scope: `home.css` is loaded last and scoped to `#setup-screen` or the active home screen. Battle, local storage keys, progression rules and records are unchanged.

## Reader verification

Before: one paragraph combined 20-word limit, three correct answers per word, interleaving, defeating the boss and saving. After: the visible rule strip preserves the completion conditions, while the selection note explains the next step and the save note explains where progress is stored. The detailed deletion/privacy explanation remains in local history.

Natural Vietnamese gate: compact student instructions use concrete actions; 20-word maximum and three interleaved correct repetitions are preserved; no invented usage statistics, endorsements or learning claims. Review was by the implementer, not a student usability study.

Validation: production build and the existing 47 tests pass. Browser checks cover all three mode selections, return, level selection, entering the chapter lobby, keyboard Enter, sources and history/Escape at 320, 390, 768, 1366 and 1920px. Images load, choices do not clip and there is no horizontal overflow. Desktop and phone screenshots were visually inspected. This redesign is local and has not been published to students.
