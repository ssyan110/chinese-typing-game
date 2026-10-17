import {test,expect} from '@playwright/test';

test('backup downloads, previews replacement, restores and rejects bad files',async({page})=>{
 await page.goto('./');await expect(page.locator('#save-status')).toBeHidden();
 await page.locator('[data-mode=simplified]').click();await page.locator('#enter-lobby:enabled').click();
 await page.locator('#continue-learning').click();
 await page.locator('#hanzi-input').fill(await page.locator('#active-rune').innerText());
 await page.locator('#pause-button').click();await page.locator('#quit-paused').click();
 await page.locator('#history-toggle').click();await page.locator('.history-backup summary').click();
 const [download]=await Promise.all([page.waitForEvent('download'),page.locator('#export-backup').click()]);
 expect(download.suggestedFilename()).toBe('dau-truong-han-tu-backup.json');
 const snapshot=await page.evaluate(()=>JSON.parse(localStorage.getItem('tulinh.save.v1')));
 const backup=JSON.stringify({format:'tulinh-backup',version:1,data:snapshot});
 await page.locator('[data-history-clear]').click();await page.locator('[data-history-confirm]').click();
 await expect(page.locator('.history-record')).toHaveCount(0);
 await page.locator('#import-backup').setInputFiles({name:'backup.json',mimeType:'application/json',buffer:Buffer.from(backup)});
 await expect(page.locator('#confirm-import')).toBeVisible();
 await expect(page.locator('.history-record')).toHaveCount(0);
 await page.locator('#confirm-import').click();await expect(page.locator('.history-record')).toHaveCount(1);
 const before=await page.evaluate(()=>localStorage.getItem('tulinh.save.v1'));
 await page.locator('#import-backup').setInputFiles({name:'bad.json',mimeType:'application/json',buffer:Buffer.from('{bad')});
 await expect(page.locator('.history-backup [role=status]')).toContainText('không hợp lệ');
 expect(await page.evaluate(()=>localStorage.getItem('tulinh.save.v1'))).toBe(before);
 await page.reload();await page.locator('#history-toggle').click();await expect(page.locator('.history-record')).toHaveCount(1);
});

test('unavailable storage does not erase data or silently start an unsaved run',async({page})=>{
 await page.addInitScript(()=>{Storage.prototype.setItem=function(){throw new DOMException('full','QuotaExceededError');};});
 await page.goto('./');await expect(page.locator('#save-status')).toContainText('Không mở hoặc lưu được');
 await page.locator('[data-mode=simplified]').click();await page.locator('#enter-lobby:enabled').click();await page.locator('#continue-learning').click();
 expect(await page.evaluate(()=>window.__tulinh.snapshot())).toBeNull();
});

test('a validated backup can recover a corrupt canonical save without clearing browser data',async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('tulinh.save.v1','{broken'));
 await page.goto('./');await expect(page.locator('#save-status')).toContainText('Không mở hoặc lưu được');
 await page.locator('#history-toggle').click();await page.locator('.history-backup summary').click();
 const data={version:1,progress:{version:1,scopes:{}},practice:{},records:[]};
 await page.locator('#import-backup').setInputFiles({name:'recovery.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({format:'tulinh-backup',version:1,data}))});
 await page.locator('#confirm-import').click();await expect(page.locator('#save-status')).toBeHidden();
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('tulinh.save.v1')))).toEqual(data);
 await page.locator('[data-history-close]').click();await page.locator('[data-mode=simplified]').click();
 await page.locator('#enter-lobby:enabled').click();await page.locator('#continue-learning').click();
 await expect(page.locator('#battle-screen')).toBeVisible();
});
