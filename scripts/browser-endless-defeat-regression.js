async(page)=>{
 await page.goto('http://127.0.0.1:4186/');await page.bringToFront();await page.locator('#practice-setup.show').waitFor({timeout:40000});await page.evaluate(()=>{PROFILE_STORAGE_KEY='wuxia_endless_routes_test';game.profile=JSON.parse(JSON.stringify(originalProfileDefaults));});
 await page.locator('[data-practice-mode=traditional]').click();await page.locator('#enter-original-game').click();await page.locator('#title-screen.show').waitFor();await page.locator('#btn-stage5').click();await page.waitForFunction(()=>game.mode==='playing');
 const near=await page.evaluate(()=>{game.stageData.distance=0;updateBossRaid(.001);return {mode:game.mode,hp:game.playerHp,record:getSpecialRecord('endlessBoss'),reason:el.resultSub.textContent};});
 if(near.mode!=='result'||near.hp<=0||near.record.playCount!==1||!near.reason.includes('áp sát'))throw Error(JSON.stringify(near));
 await page.locator('#btn-replay').click();await page.waitForFunction(()=>game.mode==='playing');
 const hp=await page.evaluate(()=>{damagePlayer(999,'Thử hết sinh lực');return {mode:game.mode,hp:game.playerHp,playCount:getSpecialRecord('endlessBoss').playCount};});
 if(hp.mode!=='result'||hp.hp!==0||hp.playCount!==2)throw Error(JSON.stringify(hp));
 await page.evaluate(r=>{window.__endlessRoutes=r;},{proximity:near,hp});
}
