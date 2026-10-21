import {test,expect} from '@playwright/test';
test('a timeout does not lower typing accuracy and repeated words are counted explicitly',async({page})=>{
 await page.goto('./');await page.locator('[data-mode=simplified]').click();await page.locator('#enter-lobby:enabled').click();
 await page.locator('#lobby-seconds').fill('1');await page.locator('#lobby-seconds').press('Tab');await page.locator('#continue-learning').click();
 await expect.poll(()=>page.evaluate(()=>window.__tulinh.snapshot().misses)).toBeGreaterThanOrEqual(1);
 await page.locator('#battle-seconds').fill('60');await page.locator('#battle-seconds').press('Tab');
 await page.locator('#hanzi-input').fill(await page.locator('#active-rune').innerText());
 await expect.poll(()=>page.evaluate(()=>window.__tulinh.snapshot().correct)).toBe(1);await page.locator('#end-run').click();
 const state=await page.evaluate(()=>window.__tulinh.snapshot().result);
 const metrics=page.locator('#result-metrics');
 await expect(metrics.locator('div').filter({hasText:'Độ chính xác khi nhập'})).toContainText('100%');
 await expect(metrics.locator('div').filter({hasText:'Tỷ lệ tính hạng'})).toContainText(Math.round(state.correct/(state.correct+state.misses)*100)+'%');
 await expect(page.locator('#result-summary')).toContainText(state.misses+' lần hết giờ');
 await expect(page.locator('#result-coverage')).toContainText(state.rows.length+' từ khác nhau');
 await expect(page.locator('#result-coverage')).toContainText('1 lượt nhập đúng');
 await page.locator('#word-review summary').click();
 await expect(page.locator('#word-review thead')).toContainText('Nhập sai');await expect(page.locator('#word-review thead')).toContainText('Hết giờ');
});
