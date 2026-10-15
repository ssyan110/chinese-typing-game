async(page)=>{
 const checks=[],errors=[];page.on('pageerror',error=>errors.push(error.message));
 const verify=(ok,label)=>{if(!ok)throw Error(label);checks.push(label);};
 await page.goto('http://127.0.0.1:4186');await page.evaluate(()=>localStorage.removeItem('wuxia_combat_speed'));await page.reload();await page.bringToFront();await page.setViewportSize({width:1440,height:1000});
 await page.locator('#practice-setup.show').waitFor({timeout:40000});
 await page.locator('[data-practice-mode=simplified]').click();await page.locator('#enter-original-game').click();
 await page.locator('#btn-start').click();await page.locator('[data-stage-play="0"]').click();
 for(let i=0;i<8;i++){if(await page.evaluate(()=>game.mode)==='dialogue')await page.locator('#dialogue-next').click();else break;}
 await page.waitForFunction(()=>game.mode==='playing');
 verify(await page.locator('[data-combat-speed="0.5"]').getAttribute('aria-pressed')==='true','First visit defaults to 0.5×');
 const seen=[];
 for(let i=0;i<12;i++){
  await page.waitForFunction(()=>game.mode==='playing'&&game.stageData.objects.length>0);
  const word=await page.locator('#prompt-main').innerText();seen.push(word);
  await page.locator('#ime-input').fill(word);await page.locator('#ime-input').press('Enter');
 }
 verify(new Set(seen).size===12,'Twelve naturally spawned rune targets are all distinct and accepted');
 verify(await page.evaluate(()=>game.totalTyped-game.correctTyped===0),'No incorrect attempts for displayed Hanzi targets');
 await page.locator('#ime-input').focus();await page.locator('[data-combat-speed="0.25"]').click();
 verify(await page.locator('#ime-input').evaluate(node=>node===document.activeElement),'Speed button preserves typing focus');
 const timing=await page.evaluate(()=>{
  const d=game.stageData;d.objects=[{id:999,char:Object.keys(d.rowTokens)[0],x:700,y:130,speed:40,drift:0,hanziPaced:true}];d.spawnTimer=99;
  const end=game.stageTimerEndAt;setCombatSpeed(.25);updateGameplay(.1);const slow=d.objects[0].y-130;
  d.objects[0].y=130;setCombatSpeed(1);updateGameplay(.1);return {slow,fast:d.objects[0].y-130,endUnchanged:end===game.stageTimerEndAt};
 });
 verify(Math.abs(timing.fast/timing.slow-4)<.001,'0.25× makes existing rune movement four times slower immediately');
 verify(timing.endUnchanged,'Speed change leaves three-minute wall-clock finish unchanged');
 await page.locator('[data-combat-speed="0.75"]').click();await page.reload();await page.locator('#practice-setup.show').waitFor();
 verify(await page.locator('[data-combat-speed="0.75"]').getAttribute('aria-pressed')==='true','Selected speed survives reload');
 for(const mode of ['simplified','traditional','zhuyin']){
  await page.evaluate(()=>openPracticeSetup('mode'));
  await page.locator(`[data-practice-mode="${mode}"]`).click();await page.locator('#enter-original-game').click();
  await page.waitForFunction(()=>practice.loaded&&!document.querySelector('#practice-setup').classList.contains('show'));
  // Controlled stage fixtures isolate all mechanics; first rune run above used the real menu and spawning.
  const result=await page.evaluate(()=>{
   const out=[];PROFILE_STORAGE_KEY='wuxia_speed_qa';
   for(let stage=0;stage<5;stage++){
    closeOverlays();resetRun(false);game.independentStageMode=true;loadStage(stage,true);setCombatSpeed(.5);
    const d=game.stageData;
    if(d.rowTokens&&stage!==1){for(let i=0;i<30;i++){d.objects=[];const key=drawRowTarget(d);out.push({stage,text:d.rowTokens[key].text,id:d.rowTokens[key].sourceId});}}
    else if(d.rowTokens){for(let i=0;i<30;i++){d.expectedType='top';stage2NextPrompt();out.push({stage,text:d.rowTokens[d.expectedKey].text,id:d.rowTokens[d.expectedKey].sourceId});}}
    else if(stage>=3){for(let i=0;i<30;i++){(stage===3?stage4NextWord:stage5NextWord)();out.push({stage,text:d.currentWord,id:d.currentToken.sourceId});}}
    if(stage===1){const end=d.deadline;updateGameplay(.1);out.push({stage,deadlineExtension:d.deadline-end});}
    if(stage===3){const before=d.wordTimeLeft;updateGameplay(.1);out.push({stage,wordTimerDelta:before-d.wordTimeLeft});}
    if(stage===4){d.guardMode=true;d.guardDeadline=performance.now()+5000;const before=d.guardDeadline;const distance=d.distance;updateGameplay(.1);out.push({stage,guardExtension:d.guardDeadline-before,distanceDelta:distance-d.distance});}
   }
   return out;
  });
  await page.evaluate(result=>{window.__speedResult=result;},result);
  const words=result.filter(row=>row.text);verify(words.length===(mode==='zhuyin'?60:150)&&new Set(words.map(row=>row.id)).size===words.length,`${mode}: no repeats across all vocabulary-backed stages in one shared pass`);
  verify(result.some(row=>Math.abs(row.deadlineExtension-50)<.01),`${mode}: jump/FJ deadlines follow selected speed`);
  verify(result.some(row=>Math.abs(row.wordTimerDelta-.05)<.001),`${mode}: word countdown follows selected speed`);
  verify(result.some(row=>Math.abs(row.guardExtension-50)<.01&&row.distanceDelta>0),`${mode}: boss defense and approach follow selected speed`);
  verify(await page.evaluate(()=>game.stageData.words.every(t=>(practice.mode==='zhuyin'?practice.bopomofo:practice.tokens).some(p=>p.sourceId===t.sourceId))),`${mode}: full-word pool comes from selected database`);
 }
 await page.evaluate(()=>{closeOverlays();resetRun(false);game.independentStageMode=true;loadStage(0,true);setCombatSpeed(.5);});
 await page.waitForTimeout(500);await page.screenshot({path:'output/playwright/vocabulary-speed-desktop.png'});
 for(const width of [390,768,1440]){
  await page.setViewportSize({width,height:1000});await page.waitForTimeout(150);
  verify(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${width}px: no horizontal overflow`);
  verify(await page.locator('#combat-speed').evaluate(node=>{const r=node.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth;}),`${width}px: all speed controls fit viewport`);
 }
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:'output/playwright/vocabulary-speed-mobile.png'});
 verify(errors.length===0,'No browser runtime errors');
 await page.evaluate(result=>{window.__speedVerification=result;},{passed:checks.length,checks,naturalTargets:seen,timing,errors});
}
