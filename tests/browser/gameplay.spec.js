import {test, expect} from '@playwright/test';
async function lobby(page, mode = 'simplified') {
 await page.goto('./');
 await expect(page.locator('#save-status')).toBeHidden();
 await page.locator('#settings-toggle').click();
 await page.locator('#reduce-motion').check();
 await page.locator('#settings-toggle').click();
 await page.locator(`[data-mode=${mode}]`).click();
 await page.locator('#enter-lobby:enabled').click();
 await page.locator('#lobby-seconds').fill('60');
 await page.locator('#lobby-seconds').press('Tab');
}
async function ready(page) {
 if (await page.locator('#start-ready').isVisible()) await page.locator('#start-ready').click();
}
async function answer(page, mode) {
 const previous = await page.evaluate(() => window.__tulinh.snapshot().correct);
 if (mode === 'zhuyin') {
  for (let i = 0; i < 40; i++) {
   if (await page.evaluate(() => window.__tulinh.snapshot().correct) > previous) break;
   const symbol = await page.locator('#zhuyin-progress .current').innerText();
   const key = await page.locator('[data-symbol-key]').evaluateAll((nodes, symbol) => nodes.find(n => n.querySelector('b').textContent === symbol).dataset.symbolKey, symbol);
   await page.locator(`[data-symbol-key="${key}"]`).click();
  }
 } else await page.locator('#hanzi-input').fill(await page.locator('#active-rune').innerText());
 await expect.poll(() => page.evaluate(() => window.__tulinh.snapshot().correct)).toBe(previous + 1);
}
for (const mode of ['simplified', 'traditional', 'zhuyin']) {
 test(`desktop ${mode}: complete chapter, results and durable progress`, async ({page}) => {
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await lobby(page, mode);
  await page.locator('#continue-learning').click();
  for (let step = 0; step < 100; step++) {
   const state = await page.evaluate(() => window.__tulinh.snapshot());
   if (state.status === 'won') break;
   if (state.status === 'reward') { await page.locator('[data-reward=heal]').click(); continue; }
   await answer(page, mode);
  }
  const result = await page.evaluate(() => window.__tulinh.snapshot().result);
  expect(result.status).toBe('won'); expect(result.correct).toBe(60);
  expect(result.errors).toBe(0); expect(result.misses).toBe(0);
  await expect(page.locator('#result-coverage')).toContainText('20 /');
  await page.locator('#word-review summary').click();
  await expect(page.locator('#review-rows tr')).toHaveCount(20);
  await page.reload();
  await page.locator('#history-toggle').click();
  await expect(page.locator('.history-record')).toHaveCount(1);
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('tulinh.save.v1')));
  expect(saved.records[0].correct).toBe(60);
  expect(Object.keys(saved.progress.scopes[`${mode}:${saved.records[0].selection.system}`])).toHaveLength(20);
  expect(errors).toEqual([]);
 });
}

test('mobile reward selection resumes play without another ready click', async ({browser, baseURL}) => {
 const context = await browser.newContext({baseURL, viewport: {width: 390, height: 844}, isMobile: true, hasTouch: true});
 const page = await context.newPage();
 try {
  await lobby(page); await page.locator('#continue-learning').click(); await ready(page);
  for (let i = 0; i < 5; i++) { await answer(page, 'simplified'); }
  await expect(page.locator('#reward-dialog')).toBeVisible();
  await page.locator('[data-reward=heal]').click();
  await expect.poll(() => page.evaluate(() => window.__tulinh.snapshot().status)).toBe('playing');
  await expect(page.locator('#start-ready')).toBeHidden();
 } finally { await context.close(); }
});
test('twenty-word mistake review finishes every word through the UI', async ({page}) => {
 await lobby(page);
 await page.locator('#continue-learning').click();
 // Deliberately make mistakes on twenty distinct targets before correcting each.
 for (let i = 0; i < 20; i++) {
  if (await page.evaluate(() => window.__tulinh.snapshot().status) === 'reward') await page.locator('[data-reward=heal]').click();
  await page.locator('#hanzi-input').fill('錯誤');
  await page.locator('#cast-form').evaluate(form => form.requestSubmit());
  await answer(page, 'simplified');
 }
 if (await page.evaluate(() => window.__tulinh.snapshot().status) === 'reward') await page.locator('[data-reward=heal]').click();
 await page.locator('#pause-button').click(); await page.locator('#quit-paused').click();
 await expect(page.locator('#review-errors')).toContainText('20');
 await page.locator('#review-errors').click();
 await expect(page.locator('#round-label')).toContainText('/ 20');
 for (let i = 0; i < 20; i++) {
  expect(await page.evaluate(() => window.__tulinh.snapshot().status)).toBe('playing');
  await answer(page, 'simplified');
 }
 expect(await page.evaluate(() => window.__tulinh.snapshot().status)).toBe('won');
 await page.locator('#word-review summary').click(); await expect(page.locator('#review-rows tr')).toHaveCount(20);
});
test('single writer blocks a second tab, then transfers ownership and preserves deletion', async ({page, context}) => {
 await lobby(page); await page.locator('#continue-learning').click(); await answer(page, 'simplified');
 await page.locator('#pause-button').click(); await page.locator('#quit-paused').click();
 const second = await context.newPage(); await second.goto('./');
 await expect(second.locator('#save-status')).toContainText('thẻ khác');
 await second.locator('[data-mode=simplified]').click(); await second.locator('#enter-lobby:enabled').click();
 await second.locator('#continue-learning').click();
 expect(await second.evaluate(() => window.__tulinh.snapshot())).toBeNull();
 await page.close(); await second.bringToFront();
 await expect(async () => { await second.reload(); await second.locator('[data-mode=simplified]').click(); await second.locator('#enter-lobby:enabled').click(); await second.locator('#continue-learning').click(); expect(await second.evaluate(() => window.__tulinh.snapshot())).not.toBeNull(); }).toPass(); await ready(second);
 await answer(second, 'simplified'); await second.locator('#pause-button').click(); await second.locator('#quit-paused').click();
 await second.locator('#history-toggle').click(); await expect(second.locator('.history-record')).toHaveCount(2);
 await second.locator('[data-history-delete]').first().click(); await second.locator('[data-history-confirm]').click();
 await expect(second.locator('.history-record')).toHaveCount(1);
 await second.reload(); await second.locator('#history-toggle').click(); await expect(second.locator('.history-record')).toHaveCount(1);
});
for (const mode of ['simplified', 'traditional', 'zhuyin']) {
 test(`phone ${mode}: ready gate, controls, pause and rotation`, async ({browser, baseURL}) => {
  const context = await browser.newContext({baseURL, viewport: {width:320,height:568}, isMobile:true, hasTouch:true});
  const page = await context.newPage();
  try {
   await lobby(page, mode); await page.locator('#continue-learning').click();
   await expect(page.locator('#start-ready')).toBeVisible();
   const before = await page.evaluate(() => window.__tulinh.snapshot());
   await page.waitForTimeout(1100);
   const after = await page.evaluate(() => window.__tulinh.snapshot());
   expect(after.hp).toBe(100); expect(after.remaining).toBe(before.remaining); expect(after.misses).toBe(0);
   await ready(page);
   await answer(page, mode);
   await expect(page.locator('#hero-hp-label')).toBeVisible();
   for (const viewport of [{width:320,height:568}, {width:568,height:320}, {width:390,height:844}]) {
    await page.setViewportSize(viewport);
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    const selectors = mode === 'zhuyin' ? ['#zhuyin-progress', '#zhuyin-keys'] : ['#active-rune', '#hanzi-input'];
    for (const selector of selectors) {
     const box = await page.locator(selector).boundingBox();
     expect(box.y).toBeGreaterThanOrEqual(0);
     expect(box.y + box.height).toBeLessThanOrEqual(viewport.height + 2);
    }
   }
   await page.locator('#pause-button').click(); await page.locator('#resume').click();
   await expect(page.locator('#start-ready')).toBeVisible();
   await ready(page); await answer(page, mode);
   expect(await page.evaluate(() => window.__tulinh.snapshot().correct)).toBe(2);
  } finally { await context.close(); }
 });
}
