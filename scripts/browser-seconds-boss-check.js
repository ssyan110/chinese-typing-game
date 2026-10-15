async(page)=>{
 const checks=[],errors=[];page.on('pageerror',e=>errors.push(e.message));const check=(ok,label)=>{if(!ok)throw Error(label);checks.push(label);};
 await page.goto('http://127.0.0.1:4186');await page.bringToFront();await page.setViewportSize({width:1440,height:1000});await page.locator('#practice-setup.show').waitFor({timeout:40000});
 check(await page.locator('#target-seconds').inputValue()==='5','Fresh default is five seconds, independent of old speed preference');
 await page.locator('[data-practice-mode=simplified]').click();await page.locator('#enter-original-game').click();await page.locator('#title-screen.show').waitFor();await page.locator('#btn-stage5').click();
 for(let i=0;i<9;i++){if(await page.evaluate(()=>game.mode)==='dialogue')await page.locator('#dialogue-next').click();else break;}
 await page.waitForFunction(()=>game.mode==='playing');
 check(await page.evaluate(()=>game.endlessBossMode),'Real menu opens endless boss mode');
 const initial=await page.evaluate(()=>({hp:game.playerHp,time:game.stageData.wordTimeLeft}));
 check(initial.time>4&&initial.time<=5,'Endless word countdown starts at five seconds');
 check(await page.locator('#word-progress').innerText()==='','Hanzi prompt has no pinyin line');
 check(!(await page.locator('#ime-hint').innerText()).includes('Phiên âm'),'Hanzi input hint has no pinyin');
 await page.waitForTimeout(5300);const afterWord=await page.evaluate(()=>({hp:game.playerHp,fail:Object.values(game.analytics.wordStats).reduce((n,s)=>n+s.failCount,0)}));
 check(afterWord.hp<=initial.hp-16&&afterWord.fail>=1,'Natural five-second idle timeout triggers real boss attack and at least 16 HP loss');
 await page.screenshot({path:'output/playwright/seconds-boss-attack.png'});
 await page.waitForTimeout(4200);const afterGuard=await page.evaluate(()=>game.playerHp);
 check(afterGuard<=afterWord.hp-16,'Natural independent F/J attack also damages an idle player');
 await page.locator('#target-seconds').fill('8');await page.locator('#target-seconds').press('Enter');
 check(await page.evaluate(()=>targetSeconds===8&&game.stageData.wordTimeLeft<=8),'Custom eight-second value applies immediately');
 await page.locator('#target-seconds').fill('0');await page.locator('#target-seconds').press('Enter');
 check(await page.locator('#target-seconds').inputValue()==='8','Invalid zero-second value restores last valid setting');
 await page.locator('[data-target-seconds="3"]').click();check(await page.locator('#target-seconds').inputValue()==='3','Seconds preset applies');
 await page.locator('#target-seconds').fill('8');await page.locator('#target-seconds').press('Enter');await page.reload();await page.locator('#practice-setup.show').waitFor();
 check(await page.locator('#target-seconds').inputValue()==='8','Custom seconds survive reload');
 for(const mode of ['simplified','traditional']){
  await page.evaluate(()=>openPracticeSetup('mode'));await page.locator(`[data-practice-mode=${mode}]`).click();await page.locator('#enter-original-game').click();await page.locator('#title-screen.show').waitFor();
  const rows=await page.evaluate(()=>{const rows=[];for(let i=0;i<5;i++){closeOverlays();resetRun(false);setTargetSeconds(5);loadStage(i,true);const d=game.stageData;if(i===0||i===2){(i===0?updateHomefall:updateBottomDefense)(.01);renderProjectiles();}renderPromptForStage();updateImePanelHint();renderCombatPressure();rows.push({i,time:i===1?d.deadlineDuration/1000:i>=3?d.wordTimeLeft:combatTargetSeconds(),hint:el.wordProgress.textContent,phonetic:getTokenPhonetic(d.currentToken),counter:document.querySelector('#combat-pressure').textContent});}return rows;});
  check(rows.every(r=>r.time===5),`${mode}: all five word windows use chosen five seconds`);
  check(rows.every(r=>!r.hint&&!r.phonetic),`${mode}: all five stages hide pinyin`);
 }
 await page.evaluate(()=>{closeOverlays();resetRun(false);setTargetSeconds(5);loadStage(3,true);});await page.locator('#btn-pause').click();const frozen=await page.evaluate(()=>game.stageData.wordTimeLeft);await page.waitForTimeout(1100);
 check(await page.evaluate(()=>game.stageData.wordTimeLeft)===frozen,'Pause freezes word countdown');await page.locator('#btn-resume').click();
 await page.screenshot({path:'output/playwright/seconds-control-desktop.png'});
 await page.setViewportSize({width:390,height:844});await page.waitForTimeout(150);
 check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Mobile seconds controls do not overflow');
 check(await page.evaluate(()=>{const r=id=>document.getElementById(id).getBoundingClientRect();const a=r('bar-stack'),b=r('metric-card');return (a.bottom<=b.top||b.bottom<=a.top)&&r('top-hud').bottom<=r('arena').top;}),'Mobile HUD sections remain separated');
 await page.screenshot({path:'output/playwright/seconds-control-mobile.png'});
 check(errors.length===0,'No browser runtime errors');await page.evaluate(r=>window.__secondsBossVerification=r,{passed:checks.length,checks,initial,afterWord,afterGuard,errors});
}
