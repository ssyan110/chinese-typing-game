import {test, expect} from '@playwright/test';

// Chromium cannot open a native phone IME in CI. This fixture supplies its
// visual viewport, including panning and zoom, while keeping the real app UI.
async function keyboardPage(browser, baseURL, mode) {
 const context = await browser.newContext({baseURL, viewport:{width:390,height:844}, isMobile:true, hasTouch:true});
 const page = await context.newPage();
 await page.addInitScript(() => {
  window.__keyboardViewport = {height:844, offsetTop:0, scale:1};
  const viewport = new EventTarget();
  for (const key of ['height', 'offsetTop', 'scale']) Object.defineProperty(viewport, key, {get:()=>window.__keyboardViewport[key]});
  Object.defineProperty(window, 'visualViewport', {value:viewport});
 });
 await page.goto('./');
 await expect(page.locator('#save-status')).toBeHidden();
 await page.locator(`[data-mode=${mode}]`).click();
 await page.locator('#enter-lobby:enabled').click();
 await page.locator('#lobby-seconds').fill('60');
 await page.locator('#lobby-seconds').press('Tab');
 await page.locator('#continue-learning').click();
 return {context,page};
}
async function viewport(page, state) {
 await page.evaluate(state => {
  Object.assign(window.__keyboardViewport, state);
  visualViewport.dispatchEvent(new Event('resize'));
  visualViewport.dispatchEvent(new Event('scroll'));
 }, state);
 await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
}
async function fits(page, selectors, height, top) {
 for (const selector of selectors) {
  await expect(page.locator(selector)).toBeVisible();
  const box = await page.locator(selector).boundingBox();
  expect(box.width, `${selector} has a visible width`).toBeGreaterThan(0);
  expect(box.y, `${selector} starts inside the visual viewport`).toBeGreaterThanOrEqual(top - 1);
  expect(box.y + box.height, `${selector} ends inside the visual viewport`).toBeLessThanOrEqual(top + height + 1);
 }
}
for (const mode of ['simplified', 'traditional']) {
 test(`phone ${mode}: IME keeps HP, feedback and input visible at 180–420px`, async ({browser,baseURL}) => {
  const {context,page} = await keyboardPage(browser,baseURL,mode);
  try {
   // Produce genuine actionable feedback, then resume directly with one click after pause.
   await page.locator('#start-ready').click();
   await page.locator('#hanzi-input').fill('錯誤');
   await page.locator('#cast-form').evaluate(form=>form.requestSubmit());
   await expect(page.locator('#battle-notice')).not.toHaveText('');
   await page.locator('#pause-button').click();
   await page.locator('#resume').click();
   await page.locator('#hanzi-input').focus();
   const before = await page.evaluate(()=>window.__tulinh.snapshot());
   for (const height of [420,360,300,240,200,180]) {
    await viewport(page,{height,offsetTop:35});
    await expect(page.locator('body')).toHaveClass(/native-keyboard/);
    await fits(page,['#active-rune','#rune-seconds','#hanzi-input','#hero-hp-label','#battle-notice','#pause-button'],height,35);
    const after = await page.evaluate(()=>window.__tulinh.snapshot());
    expect(after.status).toBe('playing');
    expect(after.remaining).toBeLessThanOrEqual(before.remaining);
    expect(after.hp).toBe(before.hp);
   }
   // Explicit long-label layout fixture; this is not a vocabulary correctness test.
   await page.locator('#active-rune').evaluate(node=>{node.textContent='中華人民共和國';node.classList.add('long-rune');});
   await fits(page,['#active-rune','#hanzi-input'],180,35);
   const target = await page.locator('#active-rune').boundingBox();
   const hp = await page.locator('#hero-hp-label').boundingBox();
   expect(target.y).toBeGreaterThanOrEqual(hp.y + hp.height);
   // A pan moves the whole fitted UI; zoom must remain under browser control.
   await viewport(page,{height:240,offsetTop:70});
   await fits(page,['#hero-hp-label','#battle-notice','#hanzi-input'],240,70);
   await viewport(page,{scale:2});
   await expect(page.locator('body')).not.toHaveClass(/native-keyboard/);
   await page.locator('#hanzi-input').evaluate(node=>node.blur());
   await viewport(page,{height:844,offsetTop:0,scale:1});
   await expect(page.locator('body')).not.toHaveClass(/native-keyboard/);
   await expect(page.locator('#mobile-spells .spell-list')).toBeVisible();
   await expect(page.locator('#hanzi-input')).toBeVisible();
  } finally {await context.close();}
 });
}
