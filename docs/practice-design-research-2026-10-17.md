# Repeated chapter practice — research and design, 2026-10-17

Purpose: preserve a chapter's 20 words while preventing one quick pass or low monster HP from prematurely ending useful practice. Primary-study findings below inform a design; none tested this particular game or establishes its learning effectiveness.

## Primary evidence

- **Continue retrieval after the first correct answer.** In a foreign-vocabulary experiment, repeated tests after successful recall improved delayed recall, whereas additional study without further testing did not produce the same benefit. This argues against treating one success as permanent mastery. [Karpicke & Roediger, 2008, Science; DOI 10.1126/science.1152408](https://doi.org/10.1126/science.1152408)
- **A three-success criterion is a reasonable starting point, not a universal rule.** Across three experiments with conceptual materials, Rawson and Dunlosky compared initial criteria and subsequent relearning. Their recommendation was three initial correct recalls followed by three relearning sessions at widely spaced intervals. Three passes in one game session are not equivalent to those later sessions. [Rawson & Dunlosky, 2011, original study abstract; DOI 10.1037/a0023956](https://pubmed.ncbi.nlm.nih.gov/21707204/)
- **Separate repetitions; do not claim one optimal spacing schedule.** Vocabulary experiments found an expanding schedule better on a short-delay test but equally spaced retrieval better two days later. A brief in-game gap is defensible, but not proof of an optimal durable-learning algorithm. [Karpicke & Roediger, 2007, author-hosted paper; DOI 10.1037/0278-7393.33.4.704](https://learninglab.psych.purdue.edu/downloads/2007/2007_Karpicke_Roediger_JEPLMC.pdf)
- **Corrective feedback matters after errors.** A study of Luganda–English pairs found that providing the correct answer after an incorrect response improved one-week retention. Show the correction, not merely a red error indicator, then provide another later attempt. Do not transfer the study's percentage effect to this game. [Pashler et al., 2005, author-hosted paper; DOI 10.1037/0278-7393.31.1.3](https://www.yorku.ca/ncepeda/publications/PCWR2005.pdf)
- **Delayed retention needs delayed measurement.** Cepeda and colleagues varied study gaps and final retention intervals over days/months. The favorable gap depended on the retention interval. A completion flag or same-session score cannot establish long-term retention. [Cepeda et al., 2008, author-hosted paper; DOI 10.1111/j.1467-9280.2008.02209.x](https://laplab.ucsd.edu/articles/Cepeda%20et%20al%202008_psychsci.pdf)

## Proposed implementation contract

1. Keep **20 distinct chapter words**. Run separated shuffled passes, avoiding an immediate repeat across pass boundaries. Initial target: every word succeeds at least **three times on separate presentations**, so at least 60 successful word presentations when the learner makes no errors. Three is a transparent design default informed by research, not proof of mastery.
2. After a mistake, reveal the expected answer and return that word after several other words (e.g. at least three intervening items when possible). Do not count correcting the visible answer within the same presentation as another independent success. Error-containing presentations should not earn a clean-recall success.
3. In **visible-answer typing**, label counts as successful practice/correct entries. This is orthographic/keyboard practice; do not label it semantic recall or claim vocabulary mastery. A true recall mode would hide the answer until after response, cue meaning/audio appropriately, and log hint use separately.
4. Keep **monster damage and practice coverage separate**. A chapter challenge succeeds only when HP is depleted **and** the practice criterion is met. Neither “seen all 20 once” nor early HP depletion should auto-win. Make any phase/HP floor explicit rather than showing a defeated monster attacking indefinitely. Tune HP so a typical three-pass run lands near defeat, with no passive damage path bypassing practice.
5. Let the learner **stop and save** at any time. Persist actual per-word counts/errors and session duration even without challenge victory. An interrupted session is practiced, not failed learning; it must not become challenge completed. Resume according to the product's stated behavior.
6. Local history should distinguish **practiced / in progress** from **challenge completed**, record the criterion version, and avoid importing a legacy one-pass completion as evidence of the new three-pass criterion. Separate “previously completed under older rules” if retaining those records.
7. Offer future review on later days; record delayed performance separately. Do not present randomization within one chapter as experimentally validated interleaving across concepts, or within-session spacing as full spaced repetition over days.

## Meaningful checks

- One clean 20-word pass cannot finish the challenge; early HP depletion cannot bypass practice.
- Repeated submissions on one presentation cannot increment a word multiple times.
- Mistakes/hints produce feedback and later retries; completion requires the intended clean successes.
- Three clean separated passes can finish when HP is depleted; no endless battle after criteria are met.
- Stopping saves practice evidence without awarding victory. Reloaded and legacy histories preserve those distinctions.
- Validate classroom reading and actual duration with learners; automated scheduler tests cannot prove retention.
