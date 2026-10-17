import {test,expect} from '@playwright/test';

for(const mode of ['simplified','traditional'])test(`Safari phone ${mode}: tap starts and Chinese composition casts`,async({browser,baseURL})=>{
 const context=await browser.newContext({baseURL,viewport:{width:402,height:730},isMobile:true,hasTouch:true});
 const page=await context.newPage();
 try{
  await page.goto('./');
  const outline=await page.locator('#setup-title').evaluate(n=>getComputedStyle(n).outlineStyle);
  expect(outline).toBe('none');
  await page.locator(`[data-mode=${mode}]`).tap();await page.locator('#enter-lobby:enabled').tap();
  await page.locator('#lobby-seconds').fill('60');await page.locator('#lobby-seconds').press('Tab');
  await page.locator('#continue-learning').tap();
  await page.locator('#start-ready').tap();
  await expect.poll(()=>page.evaluate(()=>window.__tulinh.snapshot().status)).toBe('playing');
  for(const spell of ['ward','mend','strike']){
   await page.locator(`[data-spell=${spell}]`).tap();
   await expect(page.locator('#hanzi-input')).toBeFocused();
  }
  const word=await page.locator('#active-rune').innerText();
  await page.locator('#hanzi-input').tap();await page.locator('#hanzi-input').dispatchEvent('compositionstart');
  await page.locator('#hanzi-input').fill('ni');
  expect(await page.evaluate(()=>window.__tulinh.snapshot().errors)).toBe(0);
  await page.locator('#hanzi-input').fill(word);await page.locator('#hanzi-input').dispatchEvent('compositionend',{data:word});
  await expect.poll(()=>page.evaluate(()=>window.__tulinh.snapshot().correct)).toBe(1);
  await page.locator('#pause-button').tap();await page.locator('#resume').tap();
  await page.locator('#start-ready').tap();
  await expect.poll(()=>page.evaluate(()=>window.__tulinh.snapshot().status)).toBe('playing');
 }finally{await context.close();}
});

test('Safari paused scene paints at its visible size before starting',async({browser,baseURL})=>{
 const context=await browser.newContext({baseURL,viewport:{width:402,height:730},isMobile:true,hasTouch:true,deviceScaleFactor:3});
 const page=await context.newPage();
 try{
  await page.addInitScript(()=>{
   window.__safariHeight=730;
   const vv=new EventTarget();
   Object.defineProperties(vv,{height:{get:()=>window.__safariHeight},offsetTop:{get:()=>35},scale:{get:()=>1}});
   Object.defineProperty(window,'visualViewport',{value:vv});
  });
  await page.goto('./');await page.locator('[data-mode=simplified]').tap();await page.locator('#enter-lobby:enabled').tap();await page.locator('#continue-learning').tap();
  await expect(page.locator('#arena')).toHaveAttribute('data-renderer','three');
  await expect.poll(()=>page.locator('canvas').evaluate(n=>n.clientHeight)).toBeGreaterThan(0);
  await expect.poll(()=>page.locator('canvas').evaluate(n=>n.width===Math.floor(n.clientWidth*Math.min(devicePixelRatio,1.5)))).toBe(true);
  await page.setViewportSize({width:430,height:780});
  await expect.poll(()=>page.locator('canvas').evaluate(n=>n.width===Math.floor(n.clientWidth*Math.min(devicePixelRatio,1.5)))).toBe(true);
  await page.locator('#hanzi-input').tap();
  await page.evaluate(()=>{window.__safariHeight=400;visualViewport.dispatchEvent(new Event('resize'));});
  await expect(page.locator('body')).toHaveClass(/native-keyboard/);
  await expect.poll(()=>page.locator('canvas').evaluate(n=>n.clientHeight)).toBeGreaterThan(30);
  for(const selector of ['#active-rune','#hero-hp-label','#hanzi-input','#start-ready']){
   const box=await page.locator(selector).boundingBox();
   expect(box.y).toBeGreaterThanOrEqual(35);expect(box.y+box.height).toBeLessThanOrEqual(435);
  }
 }finally{await context.close();}
});
