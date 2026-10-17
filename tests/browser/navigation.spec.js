import {test,expect} from '@playwright/test';
test('returning learner opens the saved course and sees timing before chapter browsing',async({page})=>{
 await page.goto('./');await page.locator('[data-mode=traditional]').click();
 await page.locator('#vocab-level').selectOption('A1');await page.locator('#enter-lobby:enabled').click();
 const order=await page.evaluate(()=>{
  const timing=document.querySelector('.timing-card'),chapters=document.getElementById('chapter-list');
  return Boolean(timing.compareDocumentPosition(chapters)&Node.DOCUMENT_POSITION_FOLLOWING);
 });expect(order).toBe(true);
 await page.reload();await expect(page.locator('#return-course')).toContainText('TOCFL A1');
 await page.locator('#return-course').click();await expect(page.locator('#lobby-screen')).toBeVisible();
 await expect(page.locator('#lobby-selection')).toContainText('TOCFL A1');
 await page.locator('#continue-learning').click();expect(await page.evaluate(()=>window.__tulinh.snapshot().mode)).toBe('traditional');
});
