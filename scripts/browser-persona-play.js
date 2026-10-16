async page=>{
 const command=__COMMAND__;
 const symbols={'ㄅ':'1','ㄆ':'q','ㄇ':'a','ㄈ':'z','ㄉ':'2','ㄊ':'w','ㄋ':'s','ㄌ':'x','ㄍ':'e','ㄎ':'d','ㄏ':'c','ㄐ':'r','ㄑ':'f','ㄒ':'v','ㄓ':'5','ㄔ':'t','ㄕ':'g','ㄖ':'b','ㄗ':'y','ㄘ':'h','ㄙ':'n','ㄧ':'u','ㄨ':'j','ㄩ':'m','ㄚ':'8','ㄛ':'i','ㄜ':'k','ㄝ':',','ㄞ':'9','ㄟ':'o','ㄠ':'l','ㄡ':'.','ㄢ':'0','ㄣ':'p','ㄤ':';','ㄥ':'/','ㄦ':'-','ˇ':'3','ˋ':'4','ˊ':'6','˙':'7'};
 if(command.begin){
 const c=command.config;await page.setViewportSize({width:c.mobile?390:1366,height:c.mobile?844:900});await page.goto('http://127.0.0.1:4186/');await page.locator('#practice-setup.show').waitFor();
 await page.evaluate(c=>{window.__persona={config:c,actions:0,errors:[],samples:[],words:[],guards:0,wrong:0,started:Date.now()};window.addEventListener('error',e=>window.__persona.errors.push(e.message));},c);
 await page.locator(`[data-practice-mode=${c.mode}]`).click();await page.locator('#vocabulary-system').selectOption(c.system);await page.locator(`[data-vocabulary-level="${c.level}"]`).click();await page.locator('#include-earlier').uncheck();await page.locator('#enter-original-game').click();await page.locator('#title-screen.show').waitFor();
 if(c.endless)await page.locator('#btn-stage5').click();else{await page.locator('#btn-start').click();await page.locator(`[data-stage-play="${c.index}"]`).click();}
 for(let i=0;i<12;i++){if(await page.evaluate(()=>game.mode)==='dialogue')await page.locator('#dialogue-next').click();else break;}
 await page.waitForFunction(()=>game.mode==='playing');await page.locator(`[data-target-seconds="${c.seconds}"]`).click();
 }
 const c=await page.evaluate(()=>window.__persona.config);
 if(await page.locator('#pause-screen.show').isVisible())await page.locator('#btn-resume').click();
 const end=Date.now()+25000;
 while(Date.now()<end){
 const state=await page.evaluate(()=>({mode:game.mode,hp:game.playerHp,typed:game.totalTyped,correct:game.correctTyped,left:game.stageTimerLeft}));
 if(['failed','result'].includes(state.mode)){await page.evaluate(s=>window.__persona.outcome=s,state);break;}
 if(state.mode==='paused'){await page.locator('#btn-resume').click();continue;}
 if(state.mode==='dialogue'){await page.locator('#dialogue-next').click();continue;}
 if(state.mode!=='playing'){await page.waitForTimeout(200);continue;}
 const visible=await page.evaluate(()=>{const visible=n=>n&&getComputedStyle(n).display!=='none'&&n.getBoundingClientRect().width>0;const bubbles=[...document.querySelectorAll('.bubble-word')].filter(visible).map(n=>n.textContent);return {bubbles,main:visible(el.promptBoard)?el.promptMain.textContent:'',guard:el.arena.classList.contains('world-guard'),input:visible(el.imeInput),value:el.imeInput.value,actions:window.__persona.actions,qi:el.qiText.textContent};});
 if(visible.guard){const key=visible.main.match(/\b[FJ]\b/)?.[0];if(key){await page.keyboard.press(key.toLowerCase());await page.evaluate(()=>window.__persona.guards++);}await page.waitForTimeout(350);continue;}
 const word=visible.bubbles[0]||visible.main;
 if(!word||word.includes('Chờ')){await page.waitForTimeout(150);continue;}
 await page.waitForTimeout(c.delay);
 try{
 if(c.mode==='zhuyin'){
  const current=await page.locator('#word-progress .current').textContent().catch(()=>null);const key=[...(current||word)].map(ch=>symbols[ch]).filter(Boolean)[0];
  if(key)await page.keyboard.press(key);else{const latin=word.match(/\(([A-Z0-9;,.\/-])\)/)?.[1];if(latin)await page.keyboard.press(latin.toLowerCase());}
 }else if(visible.input&&/\p{Script=Han}/u.test(word)){
  await page.locator('#ime-input').fill('');
  if(c.wrongEvery&&visible.actions>0&&visible.actions%c.wrongEvery===0){await page.locator('#ime-input').fill('錯錯錯');await page.locator('#ime-confirm').click();await page.evaluate(()=>window.__persona.wrong++);}
  else {for(const ch of [...word]){await page.keyboard.insertText(ch);await page.waitForTimeout(c.charDelay||90);}if(await page.locator('#ime-input').inputValue())await page.locator('#ime-confirm').click();}
 }
 await page.evaluate(w=>{window.__persona.actions++;window.__persona.words.push(w);},word);
 }catch(e){const stopped=await page.evaluate(()=>game.mode!=='playing');if(!stopped)throw e;}
 }
 const sample=await page.evaluate(()=>({at:Date.now(),mode:game.mode,hp:game.playerHp,typed:game.totalTyped,correct:game.correctTyped,left:game.stageTimerLeft,score:Math.round(game.stageScore),combo:game.maxCombo,cycles:game.stageCycles,errors:window.__persona.errors}));
 await page.evaluate(s=>window.__persona.samples.push(s),sample);
 if(sample.mode==='playing')await page.keyboard.press('Escape');
 if(['failed','result'].includes(sample.mode)){await page.screenshot({path:`output/playwright/persona-${c.name}-outcome.png`,fullPage:true});await page.evaluate(()=>window.__persona.finished=true);}
 return sample;
}
