import {test,expect} from '@playwright/test';

async function seedPriorSession(page,hoursAgo=25){
 await page.goto('./');
 await expect(page.locator('#save-status')).toBeHidden();
 await page.evaluate(age=>{
  const selection={mode:'simplified',system:'hsk',level:'1',cumulative:true};
  const save=JSON.parse(localStorage.getItem('tulinh.save.v1'));
  save.records=[{id:'prior-chapter',scope:'HSK 1',selection,chapter:2,kind:'campaign',status:'ended',at:new Date(Date.now()-age*3600000).toISOString(),rows:[{id:'hsk-1',label:'爱',correct:1,wrong:0,missed:0,shown:1}]}];
  localStorage.setItem('tulinh.save.v1',JSON.stringify(save));
  localStorage.setItem('tulinh.settings.v1',JSON.stringify({lastCourse:selection,sound:false,reduced:true,seconds:60}));
 },hoursAgo);
 await page.reload();
}

test('home review opens directly, reports independent recall and resumes the unfinished chapter',async({page})=>{
 await seedPriorSession(page);
 await page.getByRole('button',{name:/Ôn lại 1 từ.*HSK 1/}).click();
 await expect(page.locator('#learning-prompt')).toHaveText('ài');
 await page.locator('#learning-input').fill('爱');
 await page.getByRole('button',{name:'Kiểm tra',exact:true}).click();
 await page.getByRole('button',{name:'Xem kết quả',exact:true}).click();
 await expect(page.locator('#learning-feedback')).toContainText('1/1');
 await page.locator('#learning-dialog').getByRole('button',{name:/chặng 2/i}).click();
 await expect(page.locator('#battle-kind')).toContainText('CHẶNG 2');
 await page.reload();
 await expect(page.locator('#choose-practice')).toHaveText('Chọn cách luyện');
});

test('home switches to due review at 24 hours without a reload',async({page})=>{
 await page.clock.install({time:new Date('2026-11-25T12:00:00Z')});
 await seedPriorSession(page,23.99);
 await expect(page.locator('#return-course')).toBeVisible();
 await expect(page.locator('#choose-practice')).toHaveText('Chọn cách luyện');
 await page.clock.fastForward(60000);
 await expect(page.locator('#choose-practice')).toContainText('Ôn lại 1 từ');
});

test('battle results expose the return time only after a word has been entered correctly',async({page})=>{
 await seedPriorSession(page,1);
 await page.locator('#return-course').click();
 await page.locator('[data-chapter="1"]').click();
 await page.locator('#end-run').click();
 await expect(page.locator('#result-recall-time')).toBeHidden();
 await page.locator('#continue-curriculum').click();
 const word=await page.locator('#active-rune').innerText();
 await page.locator('#hanzi-input').fill(word);
 await expect.poll(()=>page.evaluate(()=>window.__tulinh.snapshot().correct)).toBe(1);
 await page.locator('#end-run').click();
 await expect(page.locator('#result-recall-time')).toContainText('quay lại trang đầu');
 const lastSessionTime=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('tulinh.save.v1')).records.at(-1).at);
 const endedAt=await lastSessionTime();
 await page.clock.setFixedTime(new Date(Date.parse(endedAt)+3600000));
 await page.locator('#history-toggle').click();
 expect(await lastSessionTime()).toBe(endedAt);
});

test('direct home review focuses the answer and can be left by Escape or browser Back',async({page})=>{
 await seedPriorSession(page);
 await page.locator('#choose-practice').filter({hasText:'Ôn lại'}).click();
 await expect(page.locator('#learning-input')).toBeFocused();
 await page.keyboard.press('Escape');
 await expect(page.locator('#learning-dialog')).toBeHidden();
 await expect(page.locator('#lobby-screen')).toBeVisible();
 await page.locator('#learning-recall').click();
 await page.goBack();
 await expect(page.locator('#learning-dialog')).toBeHidden();
 await expect(page.locator('#level-form')).toBeVisible();
});
