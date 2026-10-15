async(page)=>{
 await page.goto('http://127.0.0.1:4186/');await page.bringToFront();await page.locator('#practice-setup.show').waitFor({timeout:40000});await page.evaluate(()=>{PROFILE_STORAGE_KEY='wuxia_learning_regression';});
 await page.locator('[data-practice-mode=simplified]').click();await page.locator('#enter-original-game').click();await page.locator('#title-screen.show').waitFor();
 await page.evaluate(()=>{closeOverlays();loadStage(3,true);window.__learningBefore={wordStart:game.currentWordStart};togglePause(true);});await page.waitForTimeout(1200);
 const result=await page.evaluate(()=>{togglePause(false);return {pauseShift:game.currentWordStart-window.__learningBefore.wordStart,zeroStars:renderStars(0)};});
 await page.evaluate(()=>loadStage(3));await page.waitForTimeout(1500);
 for(let i=0;i<10;i++){if(await page.evaluate(()=>game.mode)==='dialogue')await page.locator('#dialogue-next').click();else break;}await page.waitForFunction(()=>game.mode==='playing');
 Object.assign(result,await page.evaluate(()=>{
  const target=game.stageData.currentWord;el.imeInput.value=target;el.imeInput.dispatchEvent(new InputEvent('input',{bubbles:true,data:target}));
  const duration=game.analytics.wordStats[target]?.totalMs;
  const missed=game.stageData.currentWord;game.stageData.wordTimeLeft=.001;updateGameplay(.01);const expiredStat=game.analytics.wordStats[missed]?.failCount||0;
  practice.mode='zhuyin';applyTypingMode();game.analytics.keyStats={};for(let i=0;i<6;i++)recordKeyStat('4',false);const weakTone=calculateWeakKeys();togglePause(true);
  return {introWordDuration:duration,expiredStat,weakTone};
 }));
 await page.evaluate(r=>{window.__learningRegression=r;},result);
 if(result.pauseShift<1000||result.zeroStars.includes('class="off">★')||result.introWordDuration>1200||result.expiredStat<1||!result.weakTone.includes('4'))throw Error(JSON.stringify(result));
}
