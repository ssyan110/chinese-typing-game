import {test,expect} from '@playwright/test';

async function openLobby(page,mode){
 await page.route('https://www.googletagmanager.com/**',route=>route.abort());
 await page.goto('./');
 await page.locator('#settings-toggle').click();
 await page.locator('#reduce-motion').check();
 await page.locator('#settings-toggle').click();
 await page.locator(`[data-mode=${mode}]`).click();
 await page.locator('#enter-lobby:enabled').click();
}
for(const mode of ['simplified','traditional','zhuyin']){
 test(`optional defense tutorial uses ${mode} controls without saving progress`,async({page})=>{
  if(mode==='zhuyin')await page.setViewportSize({width:390,height:844});
  await openLobby(page,mode);
  const before=await page.evaluate(()=>localStorage.getItem('tulinh.save.v1'));
  await page.locator('#learning-defense').click();
  await expect(page.locator('#battle-kind')).toContainText('TÙY CHỌN');
  await expect(page.locator('#rune-action')).toHaveText('PHÙ VĂN PHÒNG THỦ');
  await expect(page.locator('#rune-seconds')).toHaveText('Không giới hạn');
  await expect(page.locator('#intent-detail')).toContainText('chặn đòn');
  if(mode==='zhuyin'){
   await page.screenshot({path:'output/defense-tutorial-mobile.png'});
   const keys=await page.locator('#zhuyin-progress').evaluate(node=>{
    const mapping=new Map([...document.querySelectorAll('[data-symbol-key]')].map(button=>[button.querySelector('b').textContent,button.dataset.symbolKey]));
    return [...node.querySelectorAll('span')].map(span=>mapping.get(span.textContent));
   });
   for(const key of keys)await page.locator(`[data-symbol-key="${key}"]`).click();
  }else{
   await page.locator('#hanzi-input').fill('錯誤');
   await page.locator('#cast-form').evaluate(form=>form.requestSubmit());
   await expect(page.locator('#hero-hp-label')).toHaveText('100 / 100');
   await page.locator('#hanzi-input').fill(await page.locator('#active-rune').innerText());
  }
  await expect(page.locator('#defense-complete')).toBeVisible();
  await expect(page.locator('#defense-complete')).toContainText('chặn đòn và phản công');
  await page.locator('#defense-complete button').click();
  await expect(page.locator('#lobby-screen')).toBeVisible();
  expect(await page.evaluate(()=>localStorage.getItem('tulinh.save.v1'))).toBe(before);
 });
}
test('defense exercise may be skipped and a chapter started directly',async({page})=>{
 await openLobby(page,'simplified');
 await expect(page.locator('#learning-defense')).toBeVisible();
 await page.locator('#continue-learning').click();
 expect((await page.evaluate(()=>window.__tulinh.snapshot())).kind).toBe('campaign');
});
test('quitting defense exercise returns to the course without creating a record',async({page})=>{
 await openLobby(page,'simplified');
 const before=await page.evaluate(()=>localStorage.getItem('tulinh.save.v1'));
 await page.locator('#learning-defense').click();
 await page.locator('#end-run').click();
 await expect(page.locator('#lobby-screen')).toBeVisible();
 expect(await page.evaluate(()=>localStorage.getItem('tulinh.save.v1'))).toBe(before);
});

test('the typing warm-up offers the optional defense exercise',async({page})=>{
 await openLobby(page,'simplified');
 await page.locator('#learning-tutorial').click();
 for(let i=0;i<3;i++){
  await page.locator('#learning-input').fill(await page.locator('#learning-prompt').innerText());
  await page.locator('#learning-dialog form button').click();
  await page.getByRole('button',{name:i===2?'Xem kết quả':'Từ tiếp theo',exact:true}).click();
 }
 await page.locator('#learning-dialog').getByRole('button',{name:'Thử phòng thủ'}).click();
 await expect(page.locator('#battle-kind')).toContainText('TÙY CHỌN');
});
test('defense feedback completes with motion enabled',async({page})=>{
 await openLobby(page,'simplified');
 await page.locator('#settings-toggle').click();
 await page.locator('#reduce-motion').uncheck();
 await page.locator('#settings-toggle').click();
 await page.locator('#learning-defense').click();
 await page.locator('#hanzi-input').fill(await page.locator('#active-rune').innerText());
 await expect(page.locator('#defense-complete')).toBeVisible();
});
