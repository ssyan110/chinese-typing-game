import {test,expect} from '@playwright/test';

async function finishWarmup(page,mode){
 await page.route('https://www.googletagmanager.com/**',route=>route.abort());
 await page.goto('./');
 await page.locator('#settings-toggle').click();
 await page.locator('#reduce-motion').check();
 await page.locator('#settings-toggle').click();
 await page.locator(`[data-mode=${mode}]`).click();
 await page.locator('#enter-lobby:enabled').click();
 await page.locator('#learning-tutorial').click();
 const words=[];
 for(let turn=0;turn<3;turn++){
  const word=await page.locator('#learning-prompt').innerText();
  words.push(word);
  await page.locator('#learning-input').fill(word);
  await page.locator('#learning-dialog form button').click();
  await page.getByRole('button',{name:turn<2?'Từ tiếp theo':'Xem kết quả',exact:true}).click();
 }
 return words;
}

for(const mode of ['simplified','traditional']){
 test(`${mode} warm-up launches the same three words untimed before opting into chapter timing`,async({page})=>{
  const mobile=mode==='traditional';
  if(mobile)await page.setViewportSize({width:390,height:844});
  const words=await finishWarmup(page,mode);
  const before=await page.evaluate(()=>localStorage.getItem('tulinh.save.v1'));
  await page.locator('#learning-starter-battle').click();
  if(mobile){
   await expect(page.locator('#ready-context')).toContainText('Không giới hạn thời gian');
   await page.locator('#start-ready').click();
  }
  const played=[];
  for(let i=0;i<3;i++){
   await expect(page.locator('#rune-seconds')).toHaveText('Không giới hạn');
   const word=await page.locator('#active-rune').innerText();
   played.push(word);
   await page.locator('#hanzi-input').fill(word);
  }
  expect(played.sort()).toEqual(words.sort());
  await expect(page.locator('#starter-complete')).toContainText('3/3');
  expect(await page.evaluate(()=>localStorage.getItem('tulinh.save.v1'))).toBe(before);
  if(!mobile){
   await page.locator('#starter-timed').click();
   await expect(page.locator('#battle-kind')).toContainText('CÓ TÍNH GIỜ');
   await expect(page.locator('#rune-seconds')).toHaveText(/\d+s/);
   const timedWords=[];
   for(let i=0;i<3;i++){
    const word=await page.locator('#active-rune').innerText();
    timedWords.push(word);
    await page.locator('#hanzi-input').fill(word);
   }
   expect(timedWords.sort()).toEqual(words);
   await expect(page.locator('#starter-complete')).toContainText('3/3');
  }
  await page.locator('#starter-chapter').click();
  if(mobile)await page.locator('#start-ready').click();
  await expect(page.locator('#battle-kind')).toContainText('CHẶNG 1');
  await expect(page.locator('#rune-seconds')).toHaveText(/\d+s/);
 });
}
