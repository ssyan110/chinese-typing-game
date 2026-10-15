async(page)=>{
 await page.goto('http://127.0.0.1:4186/');await page.bringToFront();await page.locator('#practice-setup.show').waitFor({timeout:40000});
 await page.evaluate(()=>{PROFILE_STORAGE_KEY='wuxia_first_boss_error_test';});await page.locator('[data-practice-mode=simplified]').click();await page.locator('#enter-original-game').click();await page.locator('#title-screen.show').waitFor();
 const result=await page.evaluate(()=>{
  closeOverlays();loadStage(4,true);let hp=game.playerHp;el.imeInput.value='錯錯錯';el.imeInput.dispatchEvent(new InputEvent('input',{bubbles:true,data:'錯錯錯'}));const hanziLoss=hp-game.playerHp;
  practice.mode='zhuyin';applyTypingMode();loadStage(4,true);hp=game.playerHp;const expected=game.stageData.currentInputWord[0];handleBossInput({code:'KeyQ'},expected==='q'?'a':'q');const zhuyinLoss=hp-game.playerHp;togglePause(true);
  return {hanziLoss,zhuyinLoss};
 });
 await page.evaluate(r=>{window.__bossFirstError=r;},result);
 if(result.hanziLoss!==4||result.zhuyinLoss!==4)throw Error(JSON.stringify(result));
}
