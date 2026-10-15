async(page)=>{
 await page.goto('http://127.0.0.1:4186/');await page.bringToFront();await page.locator('#practice-setup.show').waitFor({timeout:40000});
 await page.evaluate(()=>{PROFILE_STORAGE_KEY='wuxia_feedback_test';});await page.locator('[data-practice-mode=simplified]').click();await page.locator('#enter-original-game').click();await page.locator('#title-screen.show').waitFor();
 const results=await page.evaluate(()=>{
  closeOverlays();loadStage(0,true);damageEnemy(3);updateHud();
  const damageVisible=document.querySelector('#enemy-health .health-loss-number').textContent;
  resetTimedCycle(getStage());updateHud();
  const stale=document.querySelector('#enemy-health .health-loss-number').textContent;
  game.analytics.keyStats={a:{hit:12,miss:0},s:{hit:10,miss:0}};
  return {damageVisible,stale,weakKeys:calculateWeakKeys()};
 });
 await page.evaluate(()=>loadStage(1));await page.waitForTimeout(6500);
 for(let i=0;i<10;i++){if(await page.evaluate(()=>game.mode)==='dialogue')await page.locator('#dialogue-next').click();else break;}await page.waitForFunction(()=>game.mode==='playing');await page.waitForTimeout(100);
 results.afterReadingIntro=await page.evaluate(()=>({hp:game.playerHp,max:game.maxPlayerHp,remaining:game.stageData.deadline-performance.now()}));
 if(results.afterReadingIntro.hp!==results.afterReadingIntro.max)throw Error(JSON.stringify(results));
 if(!results.damageVisible||results.stale||results.weakKeys.length)throw Error(JSON.stringify(results));
 await page.evaluate(r=>{window.__feedbackRegression=r;},results);
}
