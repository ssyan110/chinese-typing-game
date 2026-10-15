async(page)=>{
 const checks=[];const check=(ok,label)=>{if(!ok)throw Error(label);checks.push(label);};
 await page.goto('http://127.0.0.1:4186');await page.locator('#practice-setup.show').waitFor({timeout:40000});
 for(const mode of ['simplified','traditional','zhuyin']){
  await page.evaluate(()=>openPracticeSetup('mode'));await page.locator(`[data-practice-mode=${mode}]`).click();await page.locator('#enter-original-game').click();await page.locator('#title-screen.show').waitFor();
  const measurements=await page.evaluate(()=>{
   const rows=[];for(const i of [0,2])for(const seconds of [1,5,60]){
    closeOverlays();resetRun(false);setTargetSeconds(seconds);loadStage(i,true);const d=game.stageData;(i===0?updateHomefall:updateBottomDefense)(.001);
    const rect=el.arena.getBoundingClientRect(),o=d.objects[0];rows.push({i,seconds,remaining:i===0?(rect.height-38-o.y)/o.speed:(o.x-126)/o.speed});
   }
   return rows;
  });
  check(measurements.every(row=>Math.abs(row.remaining-row.seconds)<.01),`${mode}: rune and projectile arrival matches 1, 5 and 60 second settings`);
 }
 await page.evaluate(()=>{closeOverlays();resetRun(false);setTargetSeconds(5);loadStage(1,true);});await page.locator('#btn-pause').click();
 await page.locator('#target-seconds').fill('12');await page.locator('#target-seconds').press('Enter');await page.waitForTimeout(500);await page.locator('#btn-resume').click();
 check(await page.evaluate(()=>Math.abs((game.stageData.deadline-performance.now())/1000-12)<.3),'Changing seconds while paused resumes with the full chosen jump window');
 await page.evaluate(()=>{setTargetSeconds(5);});await page.evaluate(r=>window.__targetWindowVerification=r,{passed:checks.length,checks});
}
