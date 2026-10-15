async page=>{
 await page.goto('http://127.0.0.1:4186/');await page.locator('#practice-setup.show').waitFor();
 await page.locator('[data-practice-mode=simplified]').click();await page.locator('#enter-original-game').click();await page.locator('#title-screen.show').waitFor();
 const results=[];
 for(let index=0;index<5;index++){
  const state=await page.evaluate(index=>{closeOverlays();resetRun(false);game.independentStageMode=true;loadStage(index,true);game.playerHp=3;damagePlayer(4,'Gõ sai mục tiêu.');updateHud();return {index,hp:game.playerHp,mode:game.mode,visible:el.failScreen.classList.contains('show')};},index);
  results.push(state);if(state.hp!==0||state.mode!=='failed'||!state.visible)throw Error('Lethal damage must stop this round: '+JSON.stringify(state));
  await page.locator('#btn-retry-stage').click();
  const retry=await page.evaluate(()=>({hp:game.playerHp,max:game.maxPlayerHp,mode:game.mode}));if(retry.hp!==retry.max||retry.mode!=='playing')throw Error('Explicit retry failed '+JSON.stringify(retry));
 }
 const boss=await page.evaluate(()=>{closeOverlays();resetRun(false);game.independentStageMode=false;game.endlessBossMode=true;loadStage(4,true);game.playerHp=3;damagePlayer(16,'Hết giờ');updateHud();return {hp:game.playerHp,mode:game.mode};});
 if(boss.hp!==0||boss.mode!=='result')throw Error('Endless defeat failed '+JSON.stringify(boss));
 await page.evaluate(r=>window.__hpDefeatVerification=r,{stages:results,boss});
}
