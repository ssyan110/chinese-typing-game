async(page)=>{
 const command=__COMMAND__;
 const map={'ㄅ':'1','ㄆ':'q','ㄇ':'a','ㄈ':'z','ㄉ':'2','ㄊ':'w','ㄋ':'s','ㄌ':'x','ㄍ':'e','ㄎ':'d','ㄏ':'c','ㄐ':'r','ㄑ':'f','ㄒ':'v','ㄓ':'5','ㄔ':'t','ㄕ':'g','ㄖ':'b','ㄗ':'y','ㄘ':'h','ㄙ':'n','ㄧ':'u','ㄨ':'j','ㄩ':'m','ㄚ':'8','ㄛ':'i','ㄜ':'k','ㄝ':',','ㄞ':'9','ㄟ':'o','ㄠ':'l','ㄡ':'.','ㄢ':'0','ㄣ':'p','ㄤ':';','ㄥ':'/','ㄦ':'-','ˇ':'3','ˋ':'4','ˊ':'6','˙':'7'};
 const snapshot=()=>page.evaluate(()=>({mode:game.mode,stage:game.stageIndex+1,left:game.stageTimerLeft,hp:game.playerHp,enemy:game.enemyHp,score:Math.round(game.stageScore),typed:game.totalTyped,correct:game.correctTyped,combo:game.combo,cycles:game.stageCycles,phase:game.stageData?.phase,guardSuccess:game.stageData?.guardSuccess,charge:game.stageData?.charge??game.stageData?.shieldCharge??game.stageData?.cloudCharge,progress:game.stageData?.progress,objects:game.stageData?.objects?.length,prompt:el.promptMain.textContent,qi:el.qiText.textContent,practice:game.practiceMode,errors:window.__userPlay.errors}));
 if(command.action==='begin'){
  await page.goto('http://127.0.0.1:4186/');await page.bringToFront();await page.setViewportSize({width:1440,height:1000});await page.locator('#practice-setup.show').waitFor({timeout:40000});
  await page.evaluate(config=>{PROFILE_STORAGE_KEY='wuxia_full_user_qa_v1';game.profile=JSON.parse(JSON.stringify(originalProfileDefaults));readProfile();applyAccessibilityOptions();window.__userPlay={config,started:Date.now(),actions:0,guards:0,ultimates:0,wrongInputs:0,autoPauses:0,errors:[],samples:[],finished:false};window.addEventListener('error',e=>window.__userPlay.errors.push(e.message));},command.config);
  await page.locator('[data-practice-mode='+command.config.mode+']').click();
  await page.locator('#vocabulary-system').selectOption(command.config.system);await page.locator('[data-vocabulary-level="'+command.config.level+'"]').click();await page.locator('#include-earlier').uncheck();await page.locator('#enter-original-game').click();await page.locator('#title-screen.show').waitFor();
  await page.locator('#btn-title-settings').click();
  for(const id of ['#btn-assist','#btn-contrast','#btn-motion'])if((await page.locator(id).innerText()).includes('bật'))await page.locator(id).click();
  await page.locator('#btn-title-settings').click();
  if(command.config.endless)await page.locator('#btn-stage5').click();
  else {await page.locator('#btn-start').click();await page.locator('[data-stage-play="'+command.config.index+'"]').click();}
  for(let i=0;i<10;i++){if(await page.evaluate(()=>game.mode)==='dialogue')await page.locator('#dialogue-next').click();else break;}
  await page.waitForFunction(()=>game.mode==='playing',{timeout:20000});
  await page.evaluate(()=>window.__userPlay.started=Date.now());
 }
 const config=await page.evaluate(()=>window.__userPlay.config);
 const photoTag=(config.endless?'endless':config.practice?'practice':'stage'+(config.index+1))+(config.suffix?'-'+config.suffix:'');
 if(await page.locator('#pause-screen.show').isVisible())await page.locator('#btn-resume').click();
 const until=Date.now()+(command.seconds||28)*1000;
 while(Date.now()<until){
  const state=await snapshot();
  if(['result','failed'].includes(state.mode)){
   await page.evaluate(s=>{window.__userPlay.finished=true;window.__userPlay.outcome=s;window.__userPlay.resultText=document.querySelector(s.mode==='result'?'#result-card':'#fail-screen').innerText;},state);break;
  }
  if(state.mode==='paused'){await page.evaluate(()=>window.__userPlay.autoPauses++);await page.locator('#btn-resume').click();continue;}
  if(state.mode==='dialogue'){await page.locator('#dialogue-next').click();continue;}
  if(state.mode==='cinematic'){await page.keyboard.press('Enter');continue;}
  if(state.mode!=='playing'){await page.waitForTimeout(100);continue;}
  try{
  if(command.action==='idle'){await page.waitForTimeout(200);continue;}
  const ui=await page.evaluate(()=>({main:el.promptMain.textContent,stage:el.promptStage.textContent,ime:el.imePanel.classList.contains('show'),qi:parseFloat(el.qiText.textContent),value:el.imeInput.value,actions:window.__userPlay.actions}));
  // Choose actions from visible target/defense instructions, not hidden target keys.
  const guard=/ĐỠ ĐÒN|Đỡ đòn/.test(ui.main+' '+ui.stage)&&/\b[FJ]\b/.test(ui.main);
  if(guard){const key=ui.main.match(/\b[FJ]\b/)[0].toLowerCase();await page.keyboard.press(key);await page.evaluate(()=>window.__userPlay.guards++);await page.waitForTimeout(260);continue;}
  if(config.index===4&&ui.qi>=100&&!ui.value){await page.keyboard.press('Space');await page.evaluate(()=>{window.__userPlay.ultimateAttempts=(window.__userPlay.ultimateAttempts||0)+1;if(game.qi<100)window.__userPlay.ultimates++;});await page.waitForTimeout(400);continue;}
  if(ui.main.includes('Chờ mục tiêu')){await page.waitForTimeout(180);continue;}
  if(ui.actions>0&&ui.actions%23===0&&await page.evaluate(()=>window.__userPlay.lastWrongAction!==window.__userPlay.actions)){
   if(ui.ime){await page.locator('#ime-input').fill('錯錯錯',{timeout:4000});await page.waitForTimeout(300);await page.locator('#ime-input').fill('',{timeout:4000});}
   else {const wanted=ui.main.match(/\(([A-Z0-9;,.\/-])\)/)?.[1]?.toLowerCase()||[...ui.main].map(c=>map[c]).filter(Boolean)[0];await page.keyboard.press(wanted==='q'?'a':'q');}
   await page.evaluate(()=>{window.__userPlay.lastWrongAction=window.__userPlay.actions;window.__userPlay.wrongInputs++;});
  }
  if(config.mode==='zhuyin'){
   if(config.index<3){const key=ui.main.match(/\(([A-Z0-9;,.\/-])\)/)?.[1]?.toLowerCase()||[...ui.main].map(c=>map[c]).filter(Boolean)[0];if(key)await page.keyboard.press(key);}
   else {
    // The current highlighted symbol is the visible next key after a correction/guard.
    const progress=await page.locator('#word-progress .current').textContent().catch(()=>null);
    const key=progress&&map[progress];
    if(key)await page.keyboard.press(key);else {const keys=[...ui.main].map(c=>map[c]).filter(Boolean).join('');if(keys)await page.keyboard.type(keys,{delay:130});}
   }
  }else if(ui.ime&&/\p{Script=Han}/u.test(ui.main)){
   await page.locator('#ime-input').fill('',{timeout:4000});
   for(const char of [...ui.main]){if(!await page.locator('#ime-input').isVisible())break;await page.keyboard.insertText(char);await page.waitForTimeout(160);}
   const status=await page.locator('#typing-status').textContent();if(status?.includes('bấm Enter')&&await page.locator('#ime-input').inputValue())await page.keyboard.press('Enter');
  }
  await page.evaluate(()=>window.__userPlay.actions++);await page.waitForTimeout(config.mode==='zhuyin'?190:500);
  }catch(error){
   const transitioning=await page.evaluate(()=>game.mode!=='playing'||!el.imePanel.classList.contains('show'));
   if(!transitioning)throw error;
  }
 }
 const state=await snapshot();await page.evaluate(s=>window.__userPlay.samples.push({...s,at:Date.now()}),state);
 if(await page.evaluate(()=>window.__userPlay.finished)){await page.waitForTimeout(650);await page.screenshot({path:'output/playwright/fullqa-'+config.mode+'-'+photoTag+'-result.png'});}
 else {
  const n=await page.evaluate(()=>window.__userPlay.samples.length);
  if(n===1||n===4||n===7)await page.screenshot({path:'output/playwright/fullqa-'+config.mode+'-'+photoTag+'-'+n+'.png'});
  if(state.mode==='playing')await page.keyboard.press('Escape');
 }
}
