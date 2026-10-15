async(page)=>{
 await page.goto('http://127.0.0.1:4186/');await page.bringToFront();await page.locator('#practice-setup.show').waitFor({timeout:40000});await page.evaluate(()=>{PROFILE_STORAGE_KEY='wuxia_all_zhuyin_keys';});
 await page.locator('[data-practice-mode=zhuyin]').click();await page.locator('#vocabulary-system').selectOption('hsk');await page.locator('[data-vocabulary-level="7-9"]').click();await page.locator('#include-earlier').check();await page.locator('#enter-original-game').click();await page.locator('#title-screen.show').waitFor();
 const plan=await page.evaluate(()=>{
  const needed=new Set(practice.bopomofo.flatMap(t=>[...t.text])),picked=[];const all=needed.size;
  while(needed.size){let best=null,n=0;for(const token of practice.bopomofo){const gain=[...new Set(token.text)].filter(c=>needed.has(c)).length;if(gain>n){best=token;n=gain;}}if(!best)throw Error('Uncovered symbols');picked.push(best);for(const c of best.text)needed.delete(c);}
  closeOverlays();loadStage(3,true);return {all,picked};
 });
 let pressed=0;for(const token of plan.picked){
  const before=await page.evaluate(t=>{setCurrentWordToken(game.stageData,t);return game.correctTyped;},token);await page.keyboard.type(token.input,{delay:75});
  const after=await page.evaluate(()=>game.correctTyped);if(after-before!==token.input.length)throw Error(token.text+': physical key count mismatch');pressed+=token.input.length;
 }
 const result=await page.evaluate(()=>({keys:Object.keys(game.analytics.keyStats),errors:game.totalTyped-game.correctTyped}));result.symbols=plan.all;result.words=plan.picked.length;result.pressed=pressed;
 if(result.symbols!==41||result.keys.length!==41||result.errors!==0)throw Error(JSON.stringify(result));
 await page.keyboard.press('Escape');await page.evaluate(r=>{window.__zhuyinCoverage=r;},result);
}
