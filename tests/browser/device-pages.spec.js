import {test,expect} from '@playwright/test';
const sizes=[
 [320,568,true],[390,844,true],[430,932,true],[568,320,true],[844,390,true],
 [768,1024,true],[1024,638,true],[820,1180,true],[1180,720,true],
 [834,1194,true],[1194,734,true],[1024,1366,true],[1366,900,true],[800,1280,true],
 [1280,720,false],[1440,900,false],[1920,1080,false]
];
async function noOverflow(page){expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);}
for(const [width,height,touch] of sizes)test(`${touch?'touch':'desktop'} ${width}x${height}: core screens and word submission`,async({browser,baseURL},testInfo)=>{
  const context=await browser.newContext({baseURL,viewport:{width,height},isMobile:touch,hasTouch:touch});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  try{
   await page.goto('./');await expect(page.locator('#choose-practice')).toBeVisible();await noOverflow(page);
   await page.locator('[data-mode=simplified]').click();await noOverflow(page);await page.locator('#enter-lobby:enabled').click();await noOverflow(page);
   await page.locator('#lobby-seconds').fill('60');await page.locator('#lobby-seconds').press('Tab');await page.locator('#continue-learning').click();
   if(await page.locator('#start-ready').isVisible())await page.locator('#start-ready').click();
   await noOverflow(page);
   for(const selector of ['#active-rune','#hero-hp-label','#pause-button','#hanzi-input']){
    const box=await page.locator(selector).boundingBox();expect(box,`${width}x${height} ${selector}`).not.toBeNull();
    expect(box.y).toBeGreaterThanOrEqual(-1);expect(box.y+box.height,`${width}x${height} ${selector}`).toBeLessThanOrEqual(height+1);
   }
   await page.screenshot({path:testInfo.outputPath(`battle-${width}x${height}.png`)});
   await page.locator('#hanzi-input').fill(await page.locator('#active-rune').innerText());
   await expect.poll(()=>page.evaluate(()=>window.__tulinh.snapshot().correct)).toBe(1);
   await page.locator('#pause-button').click();await expect(page.locator('#resume')).toBeVisible();await page.locator('#resume').click();
   await page.locator('#pause-button').click();await page.locator('#quit-paused').click();await expect(page.locator('#result-screen')).toBeVisible();await noOverflow(page);
   await page.locator('#word-review summary').click();await expect(page.locator('#review-rows tr')).toHaveCount(2);
   await page.locator('#history-toggle').click();await expect(page.locator('.history-dialog')).toBeVisible();await page.locator('[data-history-close]').click();
   await page.locator('#settings-toggle').click();await expect(page.locator('#reduce-motion')).toBeVisible();await noOverflow(page);
   expect(errors).toEqual([]);
  }finally{await context.close();}
});
