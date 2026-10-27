import {test,expect} from '@playwright/test';
import {fileURLToPath} from 'node:url';

test('home does not preload hidden battle and journey illustrations',async({page})=>{
 const hiddenArt=[];page.on('request',r=>{if(/\/original\/art\/journey\/(?:hero|guardian|moth|sentinel|village)\.png/.test(r.url()))hiddenArt.push(r.url());});
 await page.goto('./');await expect(page.locator('#choose-practice')).toBeVisible();
 await page.waitForTimeout(250);expect(hiddenArt).toEqual([]);
});

test('a vocabulary response slower than fifteen seconds still opens the course',async({page})=>{
 await page.route('**/data/levels/hsk/1.json',async route=>{
  await new Promise(resolve=>setTimeout(resolve,16000));
  await route.fulfill({path:fileURLToPath(new URL('../../public/data/levels/hsk/1.json',import.meta.url)),contentType:'application/json'});
 });
 await page.goto('./');await page.locator('[data-mode=simplified]').click();
 await expect(page.locator('#enter-lobby')).toBeEnabled({timeout:22000});
 await expect(page.locator('#pool-description')).toContainText('300');
});

async function course(page,mode='simplified'){
 await page.goto('./');await page.locator(`[data-mode=${mode}]`).click();
 await page.locator('#enter-lobby:enabled').click();
 await page.locator('#lobby-seconds').fill('60');await page.locator('#lobby-seconds').press('Tab');
}

for(const mode of ['simplified','traditional','zhuyin'])test(`phone ${mode}: visible start dialog protects input and starts with one tap`,async({page})=>{
 await page.setViewportSize({width:390,height:844});await course(page,mode);
 await page.locator('#continue-learning').click();
 const dialog=page.locator('#battle-ready');await expect(dialog).toBeVisible();
 expect(await dialog.evaluate(n=>n.matches(':modal'))).toBe(true);
 await expect(page.locator('#start-ready')).toBeFocused();
 const before=await page.evaluate(()=>window.__tulinh.snapshot());
 await page.waitForTimeout(1100);
 const waiting=await page.evaluate(()=>window.__tulinh.snapshot());
 expect(waiting.remaining).toBe(before.remaining);expect(waiting.hp).toBe(before.hp);
 await page.locator('#start-ready').click();await expect(dialog).toBeHidden();
 await expect.poll(()=>page.evaluate(()=>window.__tulinh.snapshot().status)).toBe('playing');
 if(mode!=='zhuyin'){
  await expect(page.locator('#hanzi-input')).toBeFocused();
  const pause=await page.locator('#pause-button').boundingBox();expect(pause.y).toBeGreaterThanOrEqual(0);
  await page.locator('#hanzi-input').fill(await page.locator('#active-rune').innerText());
  await expect.poll(()=>page.evaluate(()=>window.__tulinh.snapshot().correct)).toBe(1);
 }
 await page.locator('#pause-button').click();await page.locator('#resume').click();
 await expect(dialog).toBeHidden();
 await expect.poll(()=>page.evaluate(()=>window.__tulinh.snapshot().status)).toBe('playing');
 if(mode!=='zhuyin')await expect(page.locator('#hanzi-input')).toBeFocused();
});

test('mode choice brings the next form into view and announces its heading',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('./');
 await page.locator('[data-mode=simplified]').click();
 await expect(page.locator('#choice-title')).toBeFocused();
 const box=await page.locator('#vocab-system').boundingBox();expect(box.y).toBeGreaterThanOrEqual(0);expect(box.y+box.height).toBeLessThan(844);
 await expect(page.locator('#pool-description')).toContainText('16 chặng');
});

test('timing is visible before both journey and chapter entry points',async({page})=>{
 await course(page);
 expect(await page.locator('.timing-card').evaluate(n=>Boolean(n.compareDocumentPosition(document.getElementById('journey-map'))&Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
 await expect(page.locator('.journey-stops')).toBeHidden();
 await page.locator('.journey-overview summary').click();await expect(page.locator('button[data-station=village]')).toBeVisible();
});

test('stop and view results opens the saved results directly',async({page})=>{
 await course(page);await page.locator('#continue-learning').click();
 await page.locator('#hanzi-input').fill(await page.locator('#active-rune').innerText());
 await page.locator('#end-run').click();await expect(page.locator('#result-screen')).toBeVisible();
 await expect(page.locator('#pause-dialog')).toBeHidden();
 expect((await page.evaluate(()=>window.__tulinh.snapshot())).result.correct).toBe(1);
 const save=await page.evaluate(()=>JSON.parse(localStorage.getItem('tulinh.save.v1')));expect(save.records[0].correct).toBe(1);
});

test('a stopped story battle offers direct continuation with the same saved practice',async({page})=>{
 await course(page);await page.locator('#settings-toggle').click();await page.locator('#reduce-motion').check();await page.locator('#settings-toggle').click();
 await page.locator('.journey-continue').click();await page.locator('#journey-action').click();await page.locator('#journey-action').click();
 await page.locator('#hanzi-input').fill(await page.locator('#active-rune').innerText());
 await page.locator('#end-run').click();await expect(page.locator('#continue-curriculum')).toBeVisible();
 await page.locator('#continue-curriculum').click();
 await expect(page.locator('#battle-title')).toHaveText('Làng Thanh Hòa');
 expect((await page.evaluate(()=>window.__tulinh.snapshot())).practiceDone).toBe(1);
});

test('readiness can be cancelled without starting or writing an empty practice record',async({page})=>{
 await page.setViewportSize({width:320,height:568});await course(page);await page.locator('#continue-learning').click();
 for(const size of [{width:320,height:568},{width:568,height:320}]){
  await page.setViewportSize(size);
  const box=await page.locator('#start-ready').boundingBox();expect(box.y).toBeGreaterThanOrEqual(0);expect(box.y+box.height).toBeLessThanOrEqual(size.height);
 }
 await page.locator('#start-ready').press('Escape');await expect(page.locator('#lobby-screen')).toBeVisible();
 expect((await page.evaluate(()=>JSON.parse(localStorage.getItem('tulinh.save.v1')))).records).toHaveLength(0);
});

test('muted students load only the selected vocabulary level and no music',async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('tulinh.settings.v1',JSON.stringify({sound:false})));
 const requests=[];page.on('request',request=>requests.push(new URL(request.url()).pathname));
 await page.goto('./');await page.locator('[data-mode=simplified]').click();
 await expect(page.locator('#pool-description')).toContainText('300');
 expect(requests.filter(path=>path.includes('/data/'))).toEqual([expect.stringContaining('/data/levels/hsk/1.json')]);
 expect(requests.some(path=>path.includes('/original/audio/'))).toBe(false);
});

test('new students get quiet music while saved sound preferences are preserved',async({page})=>{
 await page.addInitScript(()=>{
  window.__music=[];
  window.Audio=class{constructor(src){this.src=src;window.__music.push(this);}play(){return Promise.resolve();}pause(){}};
 });
 await page.goto('./');await expect(page.locator('#sound-toggle')).toHaveAttribute('aria-pressed','true');
 await page.locator('[data-mode=simplified]').click();
 expect(await page.evaluate(()=>window.__music[0].volume)).toBeCloseTo(.11);
 await page.locator('#settings-toggle').click();await expect(page.locator('#volume')).toHaveValue('20');
 await page.locator('#volume').fill('30');await page.locator('#sound-toggle').click();
 await page.reload();await expect(page.locator('#sound-toggle')).toHaveAttribute('aria-pressed','false');
 await page.locator('#settings-toggle').click();await expect(page.locator('#volume')).toHaveValue('30');
 await page.locator('[data-mode=simplified]').click();expect(await page.evaluate(()=>window.__music.length)).toBe(0);
 await page.locator('#sound-toggle').click();expect(await page.evaluate(()=>window.__music[0].volume)).toBeCloseTo(.165);
});
