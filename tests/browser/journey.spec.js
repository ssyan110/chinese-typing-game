import {test,expect} from '@playwright/test';
import {JOURNEY_STOPS} from '../../src/summoner/journey-route.js';
// Keep DOM traces and explicit outcome screenshots without encoding thousands
// of intermediate WebGL screenshots during a 480-answer journey.
test.use({trace:{mode:'retain-on-failure',screenshots:false,snapshots:true,sources:true}});
async function lobby(page,mode){await page.goto('./');await page.locator('#settings-toggle').click();await page.locator('#reduce-motion').check();await page.locator('#settings-toggle').click();await page.locator(`[data-mode=${mode}]`).click();await page.locator('#enter-lobby').click();await page.locator('#lobby-seconds').fill('60');await page.locator('#lobby-seconds').press('Tab');}
for(const mode of ['simplified','traditional','zhuyin'])test(`eight-stop journey preserves ${mode} practice through the homecoming ending`,async({page})=>{
 test.setTimeout(240_000); // 480 full answers; mobile Zhuyin presses each visible symbol.
 if(mode==='zhuyin')await page.setViewportSize({width:390,height:844});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await lobby(page,mode);await expect(page.locator('button[data-station=bamboo]')).toBeDisabled();await page.locator('button[data-station=village]').click();
 for(const [index,{id:station,name}] of JOURNEY_STOPS.entries()){
  const opponent=['guardian','moth','sentinel'][index%3];
  await expect(page.locator('#journey-screen')).toBeVisible();await page.locator('#journey-action').click();await expect(page.locator('#journey-task-title')).toHaveText('Có đối thủ phía trước!');expect((await page.evaluate(()=>window.__tulinh.story())).travel).toBe(1);
  await expect.poll(()=>page.evaluate(()=>window.__tulinh.story()?.scene?.opponent)).toBe(opponent);
  expect((await page.evaluate(()=>window.__tulinh.story())).scene.opponentVisible).toBe(true);
  await page.locator('#journey-action').click();
  if(await page.locator('#start-ready').isVisible())await page.locator('#start-ready').click();
  await expect(page.locator(mode==='zhuyin'?'#touch-keyboard':'#cast-form')).toBeVisible();await expect(page.locator('#arena')).toHaveAttribute('data-habitat',station);
  for(let i=0;i<100;i++){const s=await page.evaluate(()=>window.__tulinh.snapshot());if(s.status==='won')break;if(s.status==='reward'){await page.locator('[data-reward=heal]').click();continue;}if(mode==='zhuyin'){const keys=await page.locator('#zhuyin-progress').evaluate(n=>{const map=new Map([...document.querySelectorAll('[data-symbol-key]')].map(b=>[b.querySelector('b').textContent,b.dataset.symbolKey]));return [...n.querySelectorAll('span')].map(s=>map.get(s.textContent));});if(s.correct===0){for(const key of keys)await page.locator(`[data-symbol-key="${key}"]`).click();}else await page.keyboard.type(keys.join(''));}else await page.locator('#hanzi-input').fill(s.target);await expect.poll(()=>page.evaluate(()=>window.__tulinh.snapshot().correct)).toBe(s.correct+1);}
  expect((await page.evaluate(()=>window.__tulinh.snapshot())).correct).toBe(60);await expect(page.locator('#result-selection')).toContainText(name);await page.locator('#continue-curriculum').click();
  if(station==='homecoming')await expect.poll(()=>page.evaluate(()=>window.__tulinh.story()?.scene?.opponentVisible)).toBe(false);
 }
 await expect(page.locator('#journey-task-title')).toHaveText('Đã đến nơi!');await page.screenshot({path:'output/journey-ending.png'});await page.locator('#journey-action').click();await expect(page.locator('.journey-stop:disabled')).toHaveCount(0);await expect(page.locator('.journey-continue')).toHaveText('Xem lại kết thúc');await page.locator('.journey-continue').click();await expect(page.locator('#journey-task-title')).toHaveText('Đã đến nơi!');expect(errors).toEqual([]);
});
test('walking can be cancelled; fallback still enters original battle',async({page})=>{
 await page.addInitScript(()=>{const get=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(t,...a){return t.includes('webgl')?null:get.call(this,t,...a);};});
 await lobby(page,'simplified');await page.locator('button[data-station=village]').click();await page.locator('#journey-action').click();
 await page.locator('#journey-back').click();await expect(page.locator('#lobby-screen')).toBeVisible();expect(await page.evaluate(()=>window.__tulinh.snapshot())).toBeNull();
 await page.locator('button[data-station=village]').click();await expect(page.locator('.journey-opponent')).toBeHidden();
 expect(await page.locator('.journey-walker').evaluate(n=>n.style.left)).toBe('14%');
 await page.locator('#journey-action').click();
 expect(await page.locator('.journey-walker').evaluate(n=>getComputedStyle(n).animationName)).toBe('none');
 await expect(page.locator('#journey-task-title')).toHaveText('Có đối thủ phía trước!');
 await expect(page.locator('.journey-opponent')).toBeVisible();await expect(page.locator('.journey-opponent')).toHaveAttribute('src',/guardian\.png$/);
 await page.locator('#journey-action').click();await expect(page.locator('#hanzi-input')).toBeVisible();
});
