async page=>{
 const failures=[],checks=[];
 const check=(ok,label,details)=>{(ok?checks:failures).push({label,details});};
 await page.goto('http://127.0.0.1:4186/');await page.locator('#practice-setup.show').waitFor();await page.locator('[data-practice-mode=simplified]').click();await page.locator('#enter-original-game').click();await page.locator('#title-screen.show').waitFor();
 for(const index of [0,1,2,3,4]){
  await page.evaluate(index=>{closeOverlays();resetRun(false);loadStage(index,true);setTargetSeconds(60);if(index===0||index===2){game.stageData.spawnTimer=0;(index===0?updateHomefall:updateBottomDefense)(.01);renderProjectiles();}},index);
  const initial=await page.evaluate(()=>({hp:game.playerHp,wrong:game.totalTyped-game.correctTyped}));
  await page.locator('#ime-input').fill('錯錯錯');await page.waitForTimeout(100);const first=await page.evaluate(()=>({hp:game.playerHp,wrong:game.totalTyped-game.correctTyped}));
  await page.locator('#ime-confirm').click();const second=await page.evaluate(()=>({hp:game.playerHp,wrong:game.totalTyped-game.correctTyped}));
  check(first.hp<initial.hp&&second.hp===first.hp&&second.wrong===first.wrong,'One wrong committed string is charged once in stage '+(index+1),{initial,first,second});
 }
 await page.setViewportSize({width:390,height:844});await page.evaluate(()=>{closeOverlays();resetRun(false);loadStage(4,true);renderCombatPressure();updateHud();});
 const geometry=await page.evaluate(()=>{const ids=['prompt-board','combat-pressure','enemy-health','hero-health'];return Object.fromEntries(ids.map(id=>{const r=document.getElementById(id).getBoundingClientRect();return [id,{x:r.x,y:r.y,w:r.width,h:r.height}];}));});
 const a=geometry['combat-pressure'],b=geometry['enemy-health'];check(!(a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y),'Mobile boss health does not cover word countdown',geometry);
 await page.evaluate(()=>closeOverlays());await page.evaluate(()=>openPracticeSetup('mode'));await page.locator('[data-practice-mode=zhuyin]').click();await page.locator('#enter-original-game').click();await page.locator('#title-screen.show').waitFor();
 await page.evaluate(()=>{closeOverlays();resetRun(false);loadStage(0,true);});await page.locator('#target-seconds').focus();await page.keyboard.press('Escape');check(await page.locator('#pause-screen.show').isVisible(),'Escape can pause while editing target seconds');
 await page.evaluate(r=>window.__personaRegression=r,{checks,failures});if(failures.length)throw Error(JSON.stringify(failures));return {checks,failures};
}
