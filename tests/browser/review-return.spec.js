import {test,expect} from '@playwright/test';

async function lobby(page){
 await page.route('https://www.googletagmanager.com/**',route=>route.abort());
 await page.goto('./');
 await page.locator('#settings-toggle').click();
 await page.locator('#reduce-motion').check();
 await page.locator('#settings-toggle').click();
 await page.locator('[data-mode=simplified]').click();
 await page.locator('#enter-lobby:enabled').click();
 await page.locator('#lobby-seconds').fill('60');
 await page.locator('#lobby-seconds').press('Tab');
}
async function makeMistakeAndStop(page){
 await page.locator('#hanzi-input').fill('錯誤');
 await page.locator('#cast-form').evaluate(form=>form.requestSubmit());
 await expect.poll(()=>page.evaluate(()=>window.__tulinh.snapshot().errors)).toBe(1);
 await page.locator('#end-run').click();
 await expect(page.locator('#result-screen')).toBeVisible();
 await expect(page.locator('#review-errors')).toHaveClass(/primary-button/);
 await expect(page.locator('.result-actions button').first()).toHaveId('review-errors');
 await expect(page.locator('#result-summary')).toContainText('Ôn xong sẽ trở về chặng này');
 await page.locator('#review-errors').click();
 await expect(page.locator('#battle-kind')).toContainText('XONG SẼ TRỞ VỀ CHẶNG');
 expect((await page.evaluate(()=>window.__tulinh.snapshot())).kind).toBe('review');
 await expect(page.locator('#rune-seconds')).toHaveText('Không giới hạn');
 const target=await page.locator('#active-rune').innerText();
 await page.locator('#hanzi-input').fill(target);
 await expect.poll(()=>page.evaluate(()=>window.__tulinh.snapshot()?.kind)).toBe('campaign');
}
test('unfinished chapter prioritizes review and returns to the selected chapter',async({page})=>{
 await lobby(page);
 await page.locator('[data-chapter="2"]').click();
 await makeMistakeAndStop(page);
 await expect(page.locator('#battle-kind')).toContainText('CHẶNG 2');
});
test('unfinished story battle returns to the same story stop after review',async({page})=>{
 await lobby(page);
 await page.locator('.journey-overview summary').click();
 await page.locator('button[data-station=village]').click();
 await page.locator('#journey-action').click();
 await page.locator('#journey-action').click();
 await expect(page.locator('#arena')).toHaveAttribute('data-habitat','village');
 const title=await page.locator('#battle-title').innerText();
 await makeMistakeAndStop(page);
 await expect(page.locator('#arena')).toHaveAttribute('data-habitat','village');
 await expect(page.locator('#battle-title')).toHaveText(title);
});
test('stopping without mistakes offers the same chapter directly',async({page})=>{
 await lobby(page);
 await page.locator('[data-chapter="2"]').click();
 await page.locator('#end-run').click();
 await expect(page.locator('#review-errors')).toBeHidden();
 await expect(page.locator('#continue-curriculum')).toContainText('chặng 2');
 await page.locator('#continue-curriculum').click();
 await expect(page.locator('#battle-kind')).toContainText('CHẶNG 2');
});

test('review completes the last word and the chapter needs only one final battle answer',async({page})=>{
 await lobby(page);
 await page.evaluate(async()=>{
  const source=await(await fetch('data/hsk.json')).json(),seen=new Set();
  const words=source.filter(word=>{
   if(word.level!=='1'||seen.has(word.s))return false;
   seen.add(word.s);return true;
  }).slice(0,15);
  const save=JSON.parse(localStorage.getItem('tulinh.save.v1'));
  save.practice={'simplified:hsk':Object.fromEntries(words.map((word,index)=>[word.id,{label:word.s.replace(/\s/g,''),count:index===14?1:2}]))};
  localStorage.setItem('tulinh.save.v1',JSON.stringify(save));
 });
 await page.reload();
 await page.locator('#return-course').click();
 await page.locator('[data-chapter="1"]').click();
 await makeMistakeAndStop(page);
 let battle=await page.evaluate(()=>window.__tulinh.snapshot());
 expect(battle.practiceTotal-battle.practiceDone).toBe(1);
 await expect(page.locator('#battle-kind')).toContainText('CÒN 1 LƯỢT');
 await page.reload();
 await page.locator('#return-course').click();
 await page.locator('[data-chapter="1"]').click();
 battle=await page.evaluate(()=>window.__tulinh.snapshot());
 expect(battle.practiceTotal-battle.practiceDone).toBe(1);
 await page.locator('#hanzi-input').fill(battle.target);
 await expect(page.locator('#result-title')).toHaveText('Đã hoàn thành chặng 1');
 expect((await page.evaluate(()=>window.__tulinh.snapshot())).result.correct).toBe(1);
 await page.locator('#replay').click();
 battle=await page.evaluate(()=>window.__tulinh.snapshot());
 expect(battle.practiceDone).toBe(0);
 expect(battle.practiceTotal).toBe(30);
});
