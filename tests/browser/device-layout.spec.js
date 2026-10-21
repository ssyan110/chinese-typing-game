import {test,expect} from '@playwright/test';

async function start(browser,baseURL,size,mode){
 const context=await browser.newContext({baseURL,viewport:size,isMobile:true,hasTouch:true});
 const page=await context.newPage();
 await page.addInitScript(({height})=>{
  window.__deviceViewport={height,offsetTop:0,scale:1};const vv=new EventTarget();
  for(const key of Object.keys(__deviceViewport))Object.defineProperty(vv,key,{get:()=>__deviceViewport[key]});
  Object.defineProperty(window,'visualViewport',{value:vv});
 },size);
 await page.goto('./');await page.locator(`[data-mode=${mode}]`).click();await page.locator('#enter-lobby:enabled').click();
 await page.locator('#lobby-seconds').fill('60');await page.locator('#lobby-seconds').press('Tab');await page.locator('#continue-learning').click();
 await page.locator('#start-ready').click();return {context,page};
}
async function visibleWithin(page,selector,height,top=0){
 const box=await page.locator(selector).boundingBox();expect(box,selector).not.toBeNull();
 expect(box.y,selector).toBeGreaterThanOrEqual(top-1);expect(box.y+box.height,selector).toBeLessThanOrEqual(top+height+1);
 expect(box.x,selector).toBeGreaterThanOrEqual(-1);expect(box.x+box.width,selector).toBeLessThanOrEqual(await page.evaluate(()=>innerWidth)+1);
}
for(const mode of ['simplified','traditional','zhuyin'])test(`tablet ${mode}: landscape retains battle, controls, rotation and IME`,async({browser,baseURL},testInfo)=>{
 const {context,page}=await start(browser,baseURL,{width:1024,height:638},mode);
 try{
  for(const size of [{width:1024,height:638},{width:1180,height:720},{width:1366,height:900},{width:834,height:1194},{width:1194,height:734}]){
   await page.setViewportSize(size);await page.evaluate(h=>{__deviceViewport.height=h;visualViewport.dispatchEvent(new Event('resize'));},size.height);
   await expect.poll(()=>page.locator('#arena canvas').evaluate(n=>n.getBoundingClientRect().height)).toBeGreaterThan(100);
   for(const selector of [mode==='zhuyin'?'#zhuyin-progress':'#active-rune','#pause-button',mode==='zhuyin'?'#touch-keyboard':'#hanzi-input'])await visibleWithin(page,selector,size.height);
  }
  if(mode!=='zhuyin'){await page.locator('#hanzi-input').fill('錯誤');await page.locator('#cast-form').evaluate(f=>f.requestSubmit());}
  if(mode!=='zhuyin')for(const height of [400,300,240,180]){
   await page.locator('#hanzi-input').focus();await page.evaluate(height=>{Object.assign(__deviceViewport,{height,offsetTop:35});visualViewport.dispatchEvent(new Event('resize'));},height);
   await expect(page.locator('body')).toHaveClass(/native-keyboard/);
   for(const selector of ['#active-rune','#rune-seconds','#pause-button','#hero-hp-label','#hanzi-input','#battle-notice'])await visibleWithin(page,selector,height,35);
   if(height>=300)await expect.poll(()=>page.locator('#arena canvas').evaluate(n=>n.clientHeight)).toBeGreaterThan(70);
  }
  await page.screenshot({path:testInfo.outputPath(`${mode}-landscape.png`)});
 }finally{await context.close();}
});
