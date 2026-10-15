async (page) => {
 const passed=[];const errors=[];const failedRequests=[];const external=[];
 const check=(value,label)=>{if(!value)throw Error(label);passed.push(label);};
 page.on('pageerror',error=>errors.push(error.message));
 page.on('response',res=>{if(res.status()>=400&&res.url().includes('127.0.0.1'))failedRequests.push(res.url());});
 page.on('request',req=>{if(req.url().includes('script.google.com')||req.url().includes('static.itch.io'))external.push(req.url());});
 await page.setViewportSize({width:1440,height:1000});
 await page.goto('http://127.0.0.1:4186');await page.bringToFront();
 await page.locator('#practice-setup.show').waitFor({timeout:40000});await page.evaluate(()=>{PROFILE_STORAGE_KEY='wuxia_qa_transient';});
 check(await page.locator('[data-practice-mode]').count()===3,'Original-style setup asks for input mode before game menu');
 check(!(await page.locator('#title-screen').evaluate(el=>el.classList.contains('show'))),'Original game menu remains hidden until practice selected');
 await page.waitForTimeout(550);await page.screenshot({path:'output/playwright/reference-style-mode.png'});
 await page.locator('[data-practice-mode="simplified"]').click();
 check(await page.locator('[data-vocabulary-level]').count()===7,'HSK 1–6 plus shared 7–9 band');
 await page.locator('#include-earlier').check();
 await page.waitForTimeout(550);await page.screenshot({path:'output/playwright/reference-style-levels.png'});
 await page.locator('#enter-original-game').click();await page.locator('#title-screen.show').waitFor();
 check(await page.evaluate(()=>practice.words.length)===300,'Full selected HSK source vocabulary loaded');
 await page.waitForTimeout(550);await page.screenshot({path:'output/playwright/reference-style-title.png'});
 await page.locator('#btn-start').click();await page.locator('#stage-select-screen.show').waitFor();
 check(await page.locator('[data-stage-play]').count()===5,'Original five stage cards, thumbnails and wood controls');
 check((await page.evaluate(()=>STAGES.map(stage=>stage.mechanic))).join(',')==='homefall,top_anchor,bottom_defense,word_combo,boss_raid','All five original simulation mechanics retained');
 await page.waitForTimeout(550);await page.screenshot({path:'output/playwright/reference-style-map.png'});
 const confirmIfNeeded=async()=>{if(await page.locator('#ime-input').inputValue())await page.locator('#ime-confirm').click();};
 const begin=async index=>{
  await page.locator(`[data-stage-play="${index}"]`).click();
  for(let i=0;i<7;i++){
   if(await page.evaluate(()=>game.mode)==='dialogue')await page.locator('#dialogue-next').click();
   else break;
  }
  await page.waitForFunction(()=>game.mode==='playing',{timeout:15000});
 };
 const leave=async()=>{await page.locator('#btn-pause').click();await page.locator('#btn-pause-to-title').click();await page.locator('#stage-select-screen.show').waitFor();};
 await begin(0);
 for(let i=0;i<3;i++){
  await page.waitForFunction(()=>game.stageData?.objects?.length>0);
  const text=await page.evaluate(()=>game.stageData.rowTokens[game.stageData.objects[0].char].text);
  await page.locator('#ime-input').fill(text);await confirmIfNeeded();
 }
 check(await page.evaluate(()=>game.stageData.runeHits)>=3,'Falling-rune Hanzi input hits the original moving objects');
 check(await page.evaluate(()=>game.stageData.cleared)>=1,'Three hits trigger original charge-and-slash mechanic');
 check(await page.locator('#hero-sprite').evaluate(el=>el.complete&&el.naturalWidth>0),'Original animated hero PNG frames loaded');
 check(await page.locator('#enemy-sprite').evaluate(el=>el.complete&&el.naturalWidth>0),'Original monster GIF loaded');
 await page.waitForTimeout(550);await page.screenshot({path:'output/playwright/reference-style-stage1.png'});
 await leave();await begin(1);
 for(let i=0;i<2;i++){
  const text=await page.evaluate(()=>game.stageData.rowTokens[game.stageData.expectedKey].text);
  await page.locator('#ime-input').fill(text);await confirmIfNeeded();
  check(await page.evaluate(()=>game.stageData.expectedType)==='anchor','Khinh công switches from typing to F/J guard');
  const key=await page.evaluate(()=>game.stageData.expectedKey.toUpperCase());
  await page.keyboard.press(key);
 }
 check(await page.evaluate(()=>game.stageData.burstCount)>=1,'Two cloud charges plus original F/J defense trigger cloud burst');
 await page.waitForTimeout(550);await page.screenshot({path:'output/playwright/reference-style-stage2.png'});
 await leave();await begin(2);
 for(let i=0;i<3;i++){
  await page.waitForFunction(()=>game.stageData?.objects?.length>0);
  const text=await page.evaluate(()=>game.stageData.rowTokens[game.stageData.objects[0].char].text);
  await page.locator('#ime-input').fill(text);await confirmIfNeeded();
 }
 check(await page.evaluate(()=>game.stageData.blocked)>=3,'Incoming original projectile objects blocked with selected Hanzi');
 check(await page.evaluate(()=>game.stageData.counterBursts)>=1,'Three shield charges trigger original counterattack');
 await page.waitForTimeout(550);await page.screenshot({path:'output/playwright/reference-style-stage3.png'});
 await leave();await begin(3);
 const before=await page.evaluate(()=>game.stageScore);
 await page.locator('#ime-input').evaluate(el=>{el.dispatchEvent(new CompositionEvent('compositionstart',{bubbles:true}));el.value='x';el.dispatchEvent(new InputEvent('input',{bubbles:true,isComposing:true,data:'x'}));});
 check(await page.evaluate(()=>game.stageScore)===before,'IME preedit is not judged');
 const target=await page.evaluate(()=>game.stageData.currentWord);
 await page.locator('#ime-input').evaluate((el,text)=>{el.value=text;el.dispatchEvent(new CompositionEvent('compositionend',{bubbles:true,data:text}));el.dispatchEvent(new InputEvent('input',{bubbles:true,data:text}));},target);
 await page.waitForFunction(()=>game.stageData.completed>0);
 check(await page.evaluate(()=>game.stageScore)>before,'Committed Simplified word drives original word-combo scoring');
 await page.waitForTimeout(550);await page.screenshot({path:'output/playwright/reference-style-stage4.png'});
 await leave();await begin(4);
 const bossTarget=await page.evaluate(()=>game.stageData.currentWord);const hp=await page.evaluate(()=>game.enemyHp);
 await page.locator('#ime-input').fill(bossTarget);
 check(await page.evaluate(()=>game.enemyHp)<hp,'Chinese word damages original multi-phase boss');
 await page.waitForFunction(()=>game.stageData.guardMode,{timeout:15000});
 const guard=await page.evaluate(()=>game.stageData.guardKey.toUpperCase());await page.keyboard.press(guard);
 check(await page.evaluate(()=>game.stageData.guardSuccess)>0,'Original boss F/J quick-time defense works');
 await page.waitForTimeout(550);await page.screenshot({path:'output/playwright/reference-style-stage5.png'});
 await page.locator('#btn-pause').click();const time=await page.evaluate(()=>game.stageTimerLeft);await page.waitForTimeout(1000);
 check(await page.evaluate(()=>game.stageTimerLeft)===time,'Original pause freezes stage clock');
 await page.locator('#btn-resume').click();
 // Accelerate only the remaining timer to exercise original result/record path.
 await page.evaluate(()=>{game.stageTimerEndAt=performance.now()+100;});
 await page.locator('#result-screen.show').waitFor({timeout:12000});
 check((await page.locator('#result-stage-line').innerText()).includes('Quyết chiến ma giáo')&&await page.evaluate(()=>game.stageIndex)===4,'Original results identify completed timed stage');
 await page.waitForTimeout(550);await page.screenshot({path:'output/playwright/reference-style-results.png'});
 await page.locator('#btn-practice').click();
 for(let i=0;i<5;i++){if(await page.evaluate(()=>game.mode)==='dialogue')await page.locator('#dialogue-next').click();else break;}
 await page.waitForFunction(()=>game.mode==='playing');
 check(await page.evaluate(()=>game.practiceMode&&game.chineseMode&&!!game.stageData.currentWord),'Supplementary practice retains selected Chinese mode and dictionary tokens');
 await page.locator('#ime-input').fill(await page.evaluate(()=>game.stageData.currentWord));
 check(await page.evaluate(()=>game.stageData.completed)>0,'Supplementary practice accepts Chinese input');
 await leave();await page.locator('#btn-select-back').click();await page.locator('#change-practice').click();await page.locator('#change-practice-mode').click();
 await page.locator('[data-practice-mode="traditional"]').click();
 check(await page.locator('[data-vocabulary-level]').count()===7,'TOCFL levels available for Traditional Chinese');
 await page.locator('#enter-original-game').click();await page.locator('#btn-start').click();await begin(3);
 await page.locator('#ime-input').fill(await page.evaluate(()=>game.stageData.currentWord));
 check(await page.evaluate(()=>game.stageData.completed)>0,'Traditional target accepted by original word-combo game');
 await leave();await page.locator('#btn-select-back').click();await page.locator('#change-practice').click();await page.locator('#change-practice-mode').click();
 await page.locator('[data-practice-mode="zhuyin"]').click();await page.locator('#enter-original-game').click();await page.locator('#btn-start').click();await begin(3);
 const keys=await page.evaluate(()=>game.stageData.currentInputWord);await page.keyboard.type(keys,{delay:50});
 check(await page.evaluate(()=>game.stageData.completed)>0,'Zhuyin physical key sequence drives original combo combat');
 await leave();await begin(0);await page.waitForFunction(()=>game.stageData?.objects?.length>0);
 const rowkey=await page.evaluate(()=>game.stageData.objects[0].char);await page.keyboard.press(rowkey);
 check(await page.evaluate(()=>game.stageData.runeHits)>0,'Original Zhuyin falling-rune keyboard drill retained');
 await leave();await page.locator('#btn-select-back').click();await page.locator('#btn-stage5').click();
 await page.waitForFunction(()=>game.mode==='playing',{timeout:15000});
 check(await page.evaluate(()=>game.endlessBossMode&&game.stageTimerEndAt===0),'Original endless boss mode has no three-minute limit');
 await leave();await page.locator('#btn-select-back').click();await page.locator('#change-practice').click();await page.locator('#change-practice-mode').click();
 await page.setViewportSize({width:390,height:844});await page.waitForTimeout(550);await page.screenshot({path:'output/playwright/reference-style-mode-mobile.png'});
 check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Mobile setup fits viewport');
 await page.locator('[data-practice-mode="simplified"]').click();await page.waitForTimeout(550);await page.screenshot({path:'output/playwright/reference-style-level-mobile.png'});
 check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Mobile vocabulary selection fits viewport');
 check(errors.length===0,'No application runtime errors: '+errors.join('; '));check(failedRequests.length===0,'No missing local assets: '+failedRequests.join('; '));check(external.length===0,'No requests to reference leaderboard or itch runtime');
 await page.evaluate(result=>{window.__referenceSmoke=result;},{passed:passed.length,checks:passed,errors,failedRequests,external});
 await page.setViewportSize({width:1440,height:1000});
 await page.locator('#change-practice-mode').click();
}
