import {test,expect} from '@playwright/test';
async function lobby(page){
 await page.goto('./');await expect(page.locator('#save-status')).toBeHidden();
 await page.locator('[data-mode=simplified]').click();await page.locator('#enter-lobby:enabled').click();
}
test('new players get six seconds while returning players keep their saved timing',async({page})=>{
 await lobby(page);await expect(page.locator('#lobby-seconds')).toHaveValue('6');
 await page.locator('#lobby-seconds').fill('8');await page.locator('#lobby-seconds').press('Tab');
 await page.reload();await page.locator('#return-course').click();
 await expect(page.locator('#lobby-seconds')).toHaveValue('8');
});
test('three-word tutorial is untimed and does not change curriculum progress',async({page})=>{
 await lobby(page);await page.locator('#learning-tutorial').click();
 for(let i=0;i<3;i++){
  const word=await page.locator('#learning-prompt').innerText();
  await page.locator('#learning-input').fill(word);await page.locator('#learning-dialog form button').click();
  await expect(page.locator('#learning-feedback')).toContainText('Đúng rồi');
  await page.getByRole('button',{name:i===2?'Xem kết quả':'Từ tiếp theo',exact:true}).click();
 }
 await expect(page.locator('#learning-title')).toHaveText('Bạn đã thử xong 3 từ');
 const save=await page.evaluate(()=>JSON.parse(localStorage.getItem('tulinh.save.v1')));
 expect(save.records).toEqual([]);expect(save.progress.scopes).toEqual({});
 await page.screenshot({path:'output/learning-tutorial-desktop.png'});
});
test('next-day recall hides hanzi and stores hinted answers without crediting mastery',async({page})=>{
 await page.goto('./');await expect(page.locator('#save-status')).toBeHidden();
 await page.evaluate(()=>{
  const data=JSON.parse(localStorage.getItem('tulinh.save.v1'));
  data.records=[{scope:'test',kind:'campaign',status:'ended',selection:{mode:'simplified',system:'hsk',level:'1',cumulative:true},at:new Date(Date.now()-90000000).toISOString(),rows:[{id:'hsk-1',label:'爱',correct:1,wrong:0,shown:1}]}];
  localStorage.setItem('tulinh.save.v1',JSON.stringify(data));
 });
 await page.reload();await page.locator('[data-mode=simplified]').click();await page.locator('#enter-lobby:enabled').click();
 await page.locator('#learning-recall').click();await expect(page.locator('#learning-prompt')).toHaveText('ài');
 await page.getByRole('button',{name:'Xem chữ gợi ý',exact:true}).click();
 await expect(page.locator('#learning-feedback')).toContainText('爱');
 await page.locator('#learning-input').fill('爱');await page.locator('#learning-dialog form button').click();
 await page.evaluate(()=>{
  const original=Storage.prototype.setItem;
  Storage.prototype.setItem=function(key,value){Storage.prototype.setItem=original;throw new DOMException('Test quota failure','QuotaExceededError');};
 });
 await page.getByRole('button',{name:'Xem kết quả',exact:true}).click();
 await expect(page.locator('#learning-feedback')).toContainText('Chưa lưu được');
 await page.getByRole('button',{name:'Thử lưu lại',exact:true}).click();
 await expect(page.locator('#learning-feedback')).toContainText('Tự nhớ đúng 0/1');
 const save=await page.evaluate(()=>JSON.parse(localStorage.getItem('tulinh.save.v1')));
 expect(save.records.at(-1).learningTask).toBe('pinyin-recall');expect(save.records.at(-1).rows[0].correct).toBe(0);expect(save.progress.scopes).toEqual({});
});
test('failed vocabulary load exposes a direct retry that recovers',async({page})=>{
 await page.goto('./');
 await page.route('**/data/levels/hsk/1.json',route=>route.abort());
 await page.locator('[data-mode=simplified]').click();
 await expect(page.getByRole('button',{name:'Tải lại từ vựng'})).toBeVisible();
 await expect(page.locator('#enter-lobby')).toBeDisabled();
 await page.unroute('**/data/levels/hsk/1.json');await page.getByRole('button',{name:'Tải lại từ vựng'}).click();
 await expect(page.locator('#enter-lobby')).toBeEnabled();
});
test('independent next-day recall is saved and postpones the word after reload',async({page})=>{
 await page.goto('./');await expect(page.locator('#save-status')).toBeHidden();
 await page.evaluate(()=>{
  const data=JSON.parse(localStorage.getItem('tulinh.save.v1'));
  data.records=[{scope:'test',kind:'campaign',status:'ended',selection:{mode:'simplified',system:'hsk',level:'1',cumulative:true},at:new Date(Date.now()-90000000).toISOString(),rows:[{id:'hsk-1',label:'爱',correct:1,wrong:0,shown:1}]}];
  localStorage.setItem('tulinh.save.v1',JSON.stringify(data));
 });
 await page.reload();await page.locator('[data-mode=simplified]').click();await page.locator('#enter-lobby:enabled').click();
 await page.locator('#learning-recall').click();await expect(page.locator('#learning-prompt')).toHaveText('ài');
 await page.locator('#learning-input').fill('爱');await page.locator('#learning-dialog form button').click();
 await page.getByRole('button',{name:'Xem kết quả',exact:true}).click();
 await expect(page.locator('#learning-feedback')).toContainText('Tự nhớ đúng 1/1');
 await page.getByRole('button',{name:'Về lộ trình',exact:true}).click();await expect(page.locator('#learning-recall')).toBeHidden();
 await page.locator('#history-toggle').click();await expect(page.locator('.history-record').first()).toContainText('Nhớ lại chữ Hán');
 await page.reload();await page.locator('#return-course').click();await expect(page.locator('#learning-recall')).toBeHidden();
});
test('wrong answer shows character comparison and voluntary stop hides failure ranking',async({page})=>{
 await lobby(page);await page.locator('#lobby-seconds').fill('60');await page.locator('#lobby-seconds').press('Tab');
 await page.locator('#continue-learning').click();
 const target=await page.locator('#active-rune').innerText();
 await page.locator('#hanzi-input').fill('错'+target);await page.locator('#cast-form button').click();
 await expect(page.locator('#input-hint')).toContainText('Mẫu:');await expect(page.locator('#input-hint .answer-difference').first()).toBeVisible();
 await page.locator('#end-run').click();
 await expect(page.locator('#result-stars')).toBeHidden();await expect(page.locator('#result-metrics')).not.toContainText('Xếp hạng');await expect(page.locator('#result-coverage')).toContainText('Lượt này:');
 await page.screenshot({path:'output/learning-result-desktop.png'});
});
test('mobile tutorial fits the viewport and closes without starting a battle',async({page})=>{
 await page.setViewportSize({width:390,height:844});await lobby(page);await page.locator('#learning-tutorial').click();
 await expect(page.locator('#learning-input')).toBeVisible();
 const box=await page.locator('#learning-dialog').boundingBox();expect(box.x).toBeGreaterThanOrEqual(0);expect(box.x+box.width).toBeLessThanOrEqual(390);
 await page.screenshot({path:'output/learning-tutorial-mobile.png'});
 await page.getByRole('button',{name:'Về lộ trình',exact:true}).click();await expect(page.locator('#lobby-screen')).toBeVisible();
});
