async(page)=>{
 const checks=[],errors=[],missing=[];const check=(ok,label)=>{if(!ok)throw Error(label);checks.push(label);};
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.url().includes('127.0.0.1')&&r.status()>=400)missing.push(r.url());});
 await page.goto('http://127.0.0.1:4186/');await page.bringToFront();await page.setViewportSize({width:1440,height:1000});await page.locator('#practice-setup.show').waitFor({timeout:40000});
 check(await page.locator('[data-practice-mode]').count()===3,'Practice selection precedes all game menus');
 for(const mode of ['simplified','traditional','zhuyin']){
  await page.locator('[data-practice-mode='+mode+']').click();
  for(const system of ['hsk','tocfl']){
   await page.locator('#vocabulary-system').selectOption(system);
   const levels=await page.locator('[data-vocabulary-level]').evaluateAll(nodes=>nodes.map(n=>n.dataset.vocabularyLevel));
   for(const level of levels){
    await page.locator('[data-vocabulary-level="'+level+'"]').click();await page.locator('#include-earlier').uncheck();await page.locator('#enter-original-game').click();await page.locator('#title-screen.show').waitFor();
    const selection=await page.evaluate(()=>({count:practice.words.length,mode:practice.mode,system:practice.system,level:practice.level,invalid:practice.words.some(w=>practice.mode==='zhuyin'&&!w.keys)}));
    check(selection.count>0&&selection.mode===mode&&selection.system===system&&selection.level===level&&!selection.invalid,mode+' / '+system+' / '+level+' loads playable vocabulary');
    await page.locator('#change-practice').click();
   }
   await page.locator('[data-vocabulary-level="'+levels.at(-1)+'"]').click();await page.locator('#include-earlier').check();await page.locator('#enter-original-game').click();await page.locator('#title-screen.show').waitFor();
   check(await page.evaluate(()=>practice.words.length)===(system==='hsk'?(mode==='zhuyin'?10999:11000):7517),mode+' / '+system+' cumulative advanced count correct');await page.locator('#change-practice').click();
  }
  await page.locator('#change-practice-mode').click();
 }
 await page.locator('[data-practice-mode=simplified]').click();await page.locator('#enter-original-game').click();await page.locator('#title-screen.show').waitFor();
 await page.locator('#btn-title-settings').click();
 for(const [button,prop,css] of [['#btn-assist','assistMode',null],['#btn-contrast','highContrast','access-contrast'],['#btn-motion','reducedMotion','reduce-motion']]){
  const before=await page.evaluate(p=>game.profile[p],prop);await page.locator(button).click();check(await page.evaluate(p=>game.profile[p],prop)!==before,button+' toggles state');
  if(css)check(await page.locator('body').evaluate((n,c)=>n.classList.contains(c),css)===!before,button+' applies body style');await page.locator(button).click();
 }
 await page.locator('#btn-open-leaderboard').click();await page.locator('#leaderboard-screen.show').waitFor();check(await page.locator('#title-leaderboard-grid .rankboard').count()===5,'Local records show all five stages');await page.locator('#btn-leaderboard-refresh').click();await page.locator('#btn-leaderboard-back').click();
 check(await page.locator('#title-screen.show').isVisible(),'Leaderboard returns to title');
 await page.locator('#btn-start').click();await page.locator('[data-stage-play="0"]').click();
 for(let i=0;i<8;i++){if(await page.evaluate(()=>game.mode)==='dialogue')await page.locator('#dialogue-next').click();else break;}await page.waitForFunction(()=>game.mode==='playing');
 await page.keyboard.press('Escape');await page.locator('#pause-screen.show').waitFor();const left=await page.evaluate(()=>game.stageTimerLeft);await page.waitForTimeout(1100);check(await page.evaluate(()=>game.stageTimerLeft)===left,'Escape pause freezes clock');await page.locator('#btn-resume').click();
 const newTab=await page.context().newPage();await newTab.goto('about:blank');await newTab.bringToFront();await page.waitForTimeout(800);await page.bringToFront();await newTab.close();const nativeHidden=await page.evaluate(()=>document.hidden);
 if(!await page.locator('#pause-screen.show').isVisible()){
  await page.evaluate(()=>window.dispatchEvent(new Event('blur')));
  check(await page.locator('#pause-screen.show').isVisible(),'Controlled window-blur event pauses (automation kept both tabs visible)');
 }else check(true,'Actual tab switch automatically pauses');await page.locator('#btn-resume').click();await page.locator('#btn-pause').click();await page.locator('#btn-pause-to-title').click();check(await page.locator('#stage-select-screen.show').isVisible(),'Pause can return to stage map');
 for(const width of [390,768,1440]){
  await page.setViewportSize({width,height:width===390?844:1000});
  check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'No horizontal overflow at '+width+'px');await page.screenshot({path:'output/playwright/fullqa-map-'+width+'.png'});
 }
 await page.setViewportSize({width:1440,height:1000});
 check(errors.length===0,'No application errors during menu audit');check(missing.length===0,'No missing local assets during menu audit');
 await page.evaluate(r=>{window.__flowAudit=r;},{passed:checks.length,checks,errors,missing});
}
