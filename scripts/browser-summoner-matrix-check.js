async page=>{
 const checks=[],errors=[],missing=[];const check=(ok,label)=>{if(!ok)throw Error(label);checks.push(label);};
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&r.url().includes('127.0.0.1'))missing.push(r.url());});
 await page.setViewportSize({width:1440,height:1000});await page.goto('http://127.0.0.1:4186/');await page.locator('#mode-choices').waitFor();
 for(const mode of ['simplified','traditional','zhuyin']){
  await page.locator(`[data-mode=${mode}]`).click();await page.locator('#enter-lobby:enabled').waitFor();
  for(const system of ['hsk','tocfl']){await page.locator('#vocab-system').selectOption(system);for(const level of await page.locator('#vocab-level option').evaluateAll(ns=>ns.map(n=>n.value))){await page.locator('#vocab-level').selectOption(level);await page.locator('#enter-lobby:enabled').waitFor();check(/\d/.test(await page.locator('#pool-description').innerText()),`${mode}/${system}/${level} loads a nonempty pool`);}}
  await page.locator('#vocab-level').selectOption('N1');await page.locator('#cumulative').check();await page.locator('#enter-lobby:enabled').waitFor();await page.locator('#cumulative').uncheck();await page.locator('#enter-lobby:enabled').waitFor();await page.locator('#enter-lobby').click();
  await page.locator('#lobby-seconds').fill('60');await page.locator('#lobby-seconds').press('Tab');
  for(const encounter of ['guardian','moth','sentinel']){
   await page.locator(`[data-encounter=${encounter}]`).click();let actions=0,defense=false;
   while(actions++<120){const s=await page.evaluate(()=>window.__tulinh.snapshot());if(['won','lost'].includes(s.status))break;if(s.status==='reward'){await page.locator('[data-reward=heal]').click();continue;}
    defense ||= (await page.locator('#rune-action').innerText()).includes('PHÒNG THỦ');
    if(mode==='zhuyin'){const symbol=await page.locator('#zhuyin-progress .current').innerText();const key=await page.locator('[data-symbol-key]').evaluateAll((ns,v)=>ns.find(n=>n.querySelector('b').textContent===v).dataset.symbolKey,symbol);await page.keyboard.press(key===' '?'Space':key);}
    else {check(await page.locator('#active-rune').evaluate(n=>/^\p{Script=Han}+$/u.test(n.textContent)),`${mode}/${encounter} target contains Hanzi only`);await page.locator('#hanzi-input').fill(await page.locator('#active-rune').innerText());}
   }
   const result=await page.evaluate(()=>window.__tulinh.snapshot().result);check(result.status==='won'&&result.stars===3&&defense,`${mode}/${encounter} completes three rounds with defense and three stars`);
   check(result.rows.length>1&&result.errors===0&&result.misses===0,`${mode}/${encounter} records actual vocabulary answers`);await page.locator('#back-lobby').click();
  }
  await page.locator('#change-content').click();
 }
 for(const width of [320,390,768,1440]){await page.setViewportSize({width,height:width<500?844:1000});await page.reload();await page.locator('#mode-choices').waitFor();check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${width}px selection fits`);await page.locator('[data-mode=traditional]').click();await page.locator('#enter-lobby:enabled').waitFor();await page.locator('#enter-lobby').click();check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${width}px lobby fits`);await page.locator('[data-encounter=sentinel]').click();await page.locator('#pause-button').click();check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${width}px battle fits`);await page.screenshot({path:`output/playwright/delivery-${width}.png`,fullPage:true});await page.locator('#quit-paused').click();check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${width}px results fit`);}
 check(errors.length===0,'No runtime errors in matrix');check(missing.length===0,'No missing assets in matrix');return {passed:checks.length,checks,errors,missing};
}
