async(page)=>{
 await page.goto('http://127.0.0.1:4186');await page.bringToFront();await page.locator('#practice-setup.show').waitFor({timeout:40000});
 await page.locator('[data-practice-mode=simplified]').click();await page.locator('#enter-original-game').click();await page.locator('#btn-start').click();await page.locator('[data-stage-play="0"]').click();
 for(let i=0;i<7;i++){if(await page.evaluate(()=>game.mode)==='dialogue')await page.locator('#dialogue-next').click();else break;}
 await page.waitForFunction(()=>game.mode==='playing');
 await page.evaluate(()=>{
  PROFILE_STORAGE_KEY='wuxia_input_regression';
  const d=game.stageData;d.rowTokens={a:{text:'水',phonetic:'shuǐ'},s:{text:'水果',phonetic:'shuǐguǒ'}};d.allKeys=['a','s'];d.allowed=['a','s'];d.objects=[{id:991,char:'a',x:800,y:70,speed:0,drift:0},{id:992,char:'s',x:950,y:100,speed:0,drift:0}];d.spawnTimer=999;d.runeHits=0;d.charge=0;game.totalTyped=0;game.correctTyped=0;renderPromptForStage();renderProjectiles();
 });
 await page.locator('#ime-input').evaluate(el=>{el.dispatchEvent(new CompositionEvent('compositionstart',{bubbles:true}));el.value='水';el.dispatchEvent(new CompositionEvent('compositionend',{bubbles:true,data:'水'}));el.dispatchEvent(new InputEvent('input',{bubbles:true,data:'水'}));});
 await page.waitForTimeout(50);
 const first=await page.evaluate(()=>({hits:game.stageData.runeHits,value:el.imeInput.value,wrong:game.totalTyped-game.correctTyped}));
 if(first.hits!==0||first.value!=='水')throw Error('PREFIX REGRESSION: 水 was consumed before 水果 was finished: '+JSON.stringify(first));
 await page.locator('#ime-input').fill('水果');
 const final=await page.evaluate(()=>({hits:game.stageData.runeHits,remaining:game.stageData.objects.map(o=>o.char),wrong:game.totalTyped-game.correctTyped}));
 if(final.hits!==1||final.remaining.includes('s')||!final.remaining.includes('a')||final.wrong!==0)throw Error('水果 did not consume only the fruit target: '+JSON.stringify(final));
 await page.evaluate(result=>{window.__inputRegression=result;},{first,final,passed:true});
}
