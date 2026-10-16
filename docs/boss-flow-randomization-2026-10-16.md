# One boss, one finite HP bar

The previous implementation reused `beginRound()` after every supply choice. That recreated the same opponent at full HP, including inside an exhaustive vocabulary chapter. The UI did not communicate a new opponent, so the repeated refill looked like a broken health bar.

Finite chapter battles now start one boss with 18 HP per unfinished vocabulary item (a fresh 20-word chapter starts at 360 HP). HP never refills or changes its maximum during that attempt. Supplies occur at roughly 25%, 50% and 75% vocabulary completion and retain the opponent's current HP. Player healing/shields and attack bonuses still apply. Each unfinished word protects 18 HP of the boss's health pool; damage can reduce only the unprotected portion. Every successful word releases its protected portion, and the last correct word delivers the finishing attack. This preserves the requirement to correctly practice every source item without an invulnerable 1-HP stall. Missed words return to the queue; their seals remain until correctly answered.

Finite free-play battles also share one HP pool across their three phases: the sum of the previous three health pools (210/246/282 for the three opponents). Supply choices occur at the one-third health thresholds. Defeating that opponent ends the duel. Endless mode continues creating a new opponent after a kill, now explicitly labelled by wave. Untimed review rules and player zero-HP failure behavior are unchanged.

# Randomization

The existing Fisher–Yates deck already shuffled each new battle. It still covers the entire selected pool before repeating and avoids immediate repetition at deck-cycle boundaries. The battle constructor now also accepts the previous run's opening ID, and avoids that item as the new opening when at least two items remain. The app keeps a bounded map of opening IDs by mode, vocabulary scope, encounter, game kind and chapter in session storage. Replays and re-entry after a reload in the same tab therefore change the opening and the complete ordering; no seed or frozen ordering is reused. A one-item remaining pool necessarily retains its only item.

The chapter cards remain in stable numbered order; their word previews are samples, not the battle's upcoming sequence. Each battle independently shuffles the chapter's remaining vocabulary (or the whole chapter for replay after completion).

# Validation

- 33 Node tests, including fixed finite HP pools, no healing at supplies, vocabulary seals under an exaggerated attack bonus, short chapters, complete permutations and previous-opening avoidance. Existing exhaustive HSK/TOCFL curriculum coverage and zero-HP tests are retained.
- `scripts/browser-boss-flow-check.js`: three complete runs in each practice mode (180 answers); checks every HP transition, supply selection, full unique chapter coverage, three different orderings, opening change after a reload, all three finite opponents and an explicitly labelled second endless wave.
- Existing curriculum, general duel and mobile regressions are also run. Browser QA uses Chromium and controlled IME events; it is not physical-device/native-IME acceptance.

Logs are retained under ignored `output/boss-*.log`.
