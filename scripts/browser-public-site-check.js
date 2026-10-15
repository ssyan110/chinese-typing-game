async(page)=>{
 const checks=[],errors=[],failed=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&r.url().startsWith('https://ssyan110.github.io/'))failed.push({url:r.url(),status:r.status()});});
 const check=(ok,label)=>{if(!ok)throw Error(label);checks.push(label);};
 await page.setViewportSize({width:1440,height:1000});const response=await page.goto('https://ssyan110.github.io/chinese-typing-game/',{waitUntil:'domcontentloaded',timeout:60000});await page.bringToFront();check(response.status()===200,'Public HTTPS site returns 200');await page.locator('#practice-setup.show').waitFor({timeout:120000});
 check(await page.locator('[data-practice-mode]').count()===3,'Public mode-first screen works without login');check(await page.locator('#target-seconds').inputValue()==='5','Published version defaults to five seconds');
 await page.screenshot({path:'output/playwright/public-site-mode-selection.png'});
 await page.locator('[data-practice-mode=simplified]').click();await page.locator('#enter-original-game').click();await page.locator('#title-screen.show').waitFor({timeout:30000});check(await page.evaluate(()=>practice.words.length)===300,'Public HSK database loads 300 level-one words');await page.locator('#btn-start').click();await page.locator('[data-stage-play="0"]').click();
 for(let i=0;i<8;i++){if(await page.evaluate(()=>game.mode)==='dialogue')await page.locator('#dialogue-next').click();else break;}await page.waitForFunction(()=>game.mode==='playing'&&game.stageData.objects.length>0);
 const word=await page.locator('#prompt-main').innerText();await page.locator('#ime-input').fill(word);await page.locator('#ime-confirm').click();check(await page.evaluate(()=>game.correctTyped)>0,'Public game accepts actual visible Simplified target');check(await page.locator('#word-progress').innerText()==='','Public Hanzi practice has no pinyin');
 await page.locator('#target-seconds').fill('8');await page.locator('#target-seconds').press('Enter');check(await page.evaluate(()=>targetSeconds)===8,'Public custom seconds input works');await page.locator('[data-target-seconds="5"]').click();
 await page.keyboard.press('Escape');check(await page.evaluate(()=>game.mode)==='paused','Public keyboard pause works');await page.locator('#btn-resume').click();await page.screenshot({path:'output/playwright/public-site-gameplay.png'});
 for(const mode of ['traditional','zhuyin']){
  await page.evaluate(()=>openPracticeSetup('mode'));await page.locator(`[data-practice-mode=${mode}]`).click();await page.locator('#enter-original-game').click();await page.locator('#title-screen.show').waitFor({timeout:30000});check(await page.evaluate(()=>practice.words.length)===160,`${mode}: public TOCFL database loads 160 preparation words`);
  await page.locator('#btn-start').click();await page.locator('[data-stage-play="3"]').click();for(let i=0;i<8;i++){if(await page.evaluate(()=>game.mode)==='dialogue')await page.locator('#dialogue-next').click();else break;}await page.waitForFunction(()=>game.mode==='playing');
  if(mode==='traditional'){await page.locator('#ime-input').fill(await page.evaluate(()=>game.stageData.currentWord));await page.locator('#ime-confirm').click();}
  else{await page.locator('#arena').click({position:{x:15,y:200},force:true});const keys=await page.evaluate(()=>game.stageData.currentInputWord);for(const key of keys)await page.keyboard.press(key===' '?'Space':key);}
  check(await page.evaluate(()=>game.stageData.completed)>0,`${mode}: public word game accepts its input mode`);
 }
 await page.setViewportSize({width:390,height:844});await page.waitForTimeout(150);check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Published mobile layout has no horizontal overflow');
 check(errors.length===0,'No published application runtime errors');check(failed.length===0,'No missing published local assets or dictionaries');await page.evaluate(r=>window.__publicVerification=r,{passed:checks.length,checks,word,errors,failed,url:page.url()});
}
