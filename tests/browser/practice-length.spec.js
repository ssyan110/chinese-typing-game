import {test,expect} from '@playwright/test';

async function lobby(page){
 await page.goto('./');await expect(page.locator('#save-status')).toBeHidden();
 await page.locator('#settings-toggle').click();await page.locator('#reduce-motion').check();await page.locator('#settings-toggle').click();
 await page.locator('[data-mode=simplified]').click();await page.locator('#enter-lobby:enabled').click();
 await page.locator('#lobby-seconds').fill('60');await page.locator('#lobby-seconds').press('Tab');
}
async function play(page,{size,total,wrong=false}={}){
 const order=[],breaks=[];
 for(let step=0;step<total+10;step++){
  const state=await page.evaluate(()=>window.__tulinh.snapshot());
  if(['won','lost','ended'].includes(state.status))break;
  if(state.status==='reward'){
   breaks.push(state.correct);expect(state.correct%10).toBe(0);
   await expect(page.locator('#reward-title')).toContainText('giữa trận');
   await expect(page.locator('#reward-phase')).toHaveText('NGHỈ GIỮA TRẬN');
   await expect(page.locator('#reward-note')).toContainText('cùng một chặng');
   if(breaks.length===1)await page.screenshot({path:`output/practice-${size}-${total}-supply.png`});
   const hp=state.enemyHp;await page.locator('[data-reward=heal]').click();
   expect((await page.evaluate(()=>window.__tulinh.snapshot())).enemyHp).toBe(hp);
   await expect(page.locator('#hanzi-input')).toBeFocused();continue;
  }
  order.push(state.targetId);
  if(wrong){
   // Exercise the full capped queue despite an intentionally wrong answer on
   // every presentation. Use normal defensive controls rather than editing HP.
   const ward=page.locator('[data-spell=ward]');await page.locator(await ward.isEnabled()?'[data-spell=ward]':'[data-spell=strike]').click();
   await page.locator('#hanzi-input').fill('錯誤');await page.locator('#cast-form').evaluate(f=>f.requestSubmit());
  }
  await page.locator('#hanzi-input').fill(state.target);
  await expect.poll(()=>page.evaluate(()=>window.__tulinh.snapshot().correct)).toBe(state.correct+1);
  if(order.length===5){expect((await page.evaluate(()=>window.__tulinh.snapshot())).status).toBe('playing');await expect(page.locator('#result-screen')).toBeHidden();await page.screenshot({path:`output/practice-${size}-${total}-progress.png`});}
 }
 const state=await page.evaluate(()=>window.__tulinh.snapshot());
 expect(state.status).toBe('won');expect(state.correct).toBe(total);expect(state.enemyHp).toBe(0);
 expect(new Set(order.slice(0,size)).size).toBe(size);
 const counts=Object.values(order.reduce((out,id)=>(out[id]=(out[id]||0)+1,out),{}));
 expect(counts).toHaveLength(size);expect(counts.every(n=>n===(wrong?3:2))).toBe(true);
 expect(breaks).toEqual(Array.from({length:total/10-1},(_,i)=>(i+1)*10));
 await expect(page.locator('#result-screen')).toBeVisible();
 return state;
}
test('first two chapters: 30 then 40 answers, two appearances per word, full replay after reload',async({page})=>{
 test.setTimeout(120_000);
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await lobby(page);await expect(page.locator('#coverage-note')).toContainText('15 từ (30 lượt)');
 await expect(page.locator('#coverage-note')).toContainText('Mỗi từ xuất hiện 2 lần');
 await page.locator('#continue-learning').click();expect((await page.evaluate(()=>window.__tulinh.snapshot())).practiceTotal).toBe(30);
 await play(page,{size:15,total:30});await page.screenshot({path:'output/practice-first-chapter.png'});
 await expect(page.locator('#continue-curriculum')).toContainText('chặng 2');await page.locator('#continue-curriculum').click();
 expect((await page.evaluate(()=>window.__tulinh.snapshot())).practiceTotal).toBe(40);
 await play(page,{size:20,total:40});await page.screenshot({path:'output/practice-second-chapter.png'});
 await page.reload();await page.locator('#return-course').click();await page.locator('[data-chapter="1"]').click();
 const replay=await page.evaluate(()=>window.__tulinh.snapshot());expect(replay.practiceDone).toBe(0);expect(replay.practiceTotal).toBe(30);
 await play(page,{size:15,total:30});expect(errors).toEqual([]);
});
test('chapter two with a mistake on every presentation never shows a word more than three times',async({page})=>{
 await lobby(page);await page.locator('[data-chapter="2"]').click();
 const state=await play(page,{size:20,total:60,wrong:true});
 expect(state.result.rows.every(r=>r.shown===3&&r.correct===3&&r.wrong===3)).toBe(true);
 await expect(page.locator('#review-errors')).toHaveText('Ôn lại 20 từ');
 await page.screenshot({path:'output/practice-second-chapter-mistakes.png'});
});
test('partial first chapter resumes after reload with proportional HP and no repeated completed words',async({page})=>{
 await lobby(page);await page.locator('#continue-learning').click();
 const answered=[];
 for(let i=0;i<5;i++){
  const s=await page.evaluate(()=>window.__tulinh.snapshot());answered.push(s.targetId);await page.locator('#hanzi-input').fill(s.target);
  await expect.poll(()=>page.evaluate(()=>window.__tulinh.snapshot().correct)).toBe(i+1);
 }
 await page.reload();await page.locator('#return-course').click();await page.locator('#continue-learning').click();
 const initial=await page.evaluate(()=>window.__tulinh.snapshot());expect(initial.practiceDone).toBe(5);expect(initial.practiceTotal).toBe(30);expect(initial.enemyMax).toBe(25*12);
 await expect(page.locator('#battle-kind')).toContainText('TIẾP TỤC BẢN LƯU · CÒN 25 LƯỢT');
 for(let step=0;step<30;step++){
  const s=await page.evaluate(()=>window.__tulinh.snapshot());if(s.status==='won')break;
  if(s.status==='reward'){await page.locator('[data-reward=heal]').click();continue;}
  await page.locator('#hanzi-input').fill(s.target);await expect.poll(()=>page.evaluate(()=>window.__tulinh.snapshot().correct)).toBe(s.correct+1);
 }
 const end=await page.evaluate(()=>window.__tulinh.snapshot());expect(end.status).toBe('won');expect(end.correct).toBe(25);
 expect(end.result.rows.every(w=>w.correct===(answered.includes(w.id)?1:2))).toBe(true);
});

test('old two-success saves retain credited words and clearly identify a short resumed remainder',async({page})=>{
 await lobby(page);
 await page.evaluate(async()=>{
  const source=await(await fetch('data/hsk.json')).json(),seen=new Set();
  const words=source.filter(w=>{if(w.level!=='1'||seen.has(w.s))return false;seen.add(w.s);return true;}).slice(0,15);
  const save=JSON.parse(localStorage.getItem('tulinh.save.v1'));
  save.practice={'simplified:hsk':Object.fromEntries(words.map((w,i)=>[w.id,{label:w.s.replace(/\s/g,''),count:i<10?2:1}]))};
  localStorage.setItem('tulinh.save.v1',JSON.stringify(save));
 });
 await page.reload();await page.locator('#return-course').click();await page.locator('#continue-learning').click();
 const initial=await page.evaluate(()=>window.__tulinh.snapshot());expect(initial.practiceDone).toBe(25);expect(initial.enemyMax).toBe(60);
 await expect(page.locator('#battle-kind')).toContainText('TIẾP TỤC BẢN LƯU · CÒN 5 LƯỢT');
 for(let i=0;i<5;i++){
  const s=await page.evaluate(()=>window.__tulinh.snapshot());await page.locator('#hanzi-input').fill(s.target);
  await expect.poll(()=>page.evaluate(()=>window.__tulinh.snapshot().correct)).toBe(i+1);
 }
 await expect(page.locator('#result-title')).toHaveText('Đã hoàn thành chặng 1');
 await expect(page.locator('#continue-curriculum')).toContainText('chặng 2');
 const save=await page.evaluate(()=>JSON.parse(localStorage.getItem('tulinh.save.v1')));
 expect(Object.keys(save.progress.scopes['simplified:hsk'])).toHaveLength(15);
 expect(Object.keys(save.practice['simplified:hsk'])).toHaveLength(0);
});
