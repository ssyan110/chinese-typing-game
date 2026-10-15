async(page)=>{
 const checks=[],errors=[];page.on('pageerror',e=>errors.push(e.message));
 const check=(ok,label)=>{if(!ok)throw Error(label);checks.push(label);};
 await page.goto('http://127.0.0.1:4186/');await page.locator('#practice-setup.show').waitFor({timeout:40000});
 for(const mode of ['simplified','traditional','zhuyin']){
  await page.evaluate(()=>openPracticeSetup('mode'));await page.locator(`[data-practice-mode=${mode}]`).click();await page.locator('#enter-original-game').click();await page.locator('#title-screen.show').waitFor();
  for(let index=0;index<5;index++){
   const result=await page.evaluate(index=>{
    closeOverlays();resetRun(false);setTargetSeconds(5);loadStage(index,true);
    const d=game.stageData;
    if(index===0||index===2){d.spawnTimer=0;(index===0?updateHomefall:updateBottomDefense)(.05);renderProjectiles();}
    renderPromptForStage();updateImePanelHint();renderCombatPressure();
    const arena=el.arena.getBoundingClientRect(),ime=el.imePanel.getBoundingClientRect();
    return {dock:el.imePanel.parentElement.id,imeOutside:ime.top>=arena.bottom||ime.bottom<=arena.top,hidden:getComputedStyle(el.promptBoard).display==='none',mechanic:el.arena.dataset.mechanic,phonetic:getTokenPhonetic(d.currentToken),progress:el.wordProgress.textContent,bubbles:[...el.projectileLayer.querySelectorAll('.hanzi-object')].map(n=>({word:n.querySelector('.bubble-word')?.textContent,time:n.querySelector('.bubble-seconds')?.textContent})),frame:getComputedStyle(el.promptBoard).backgroundImage,words:practice.tokens.slice(0,4).map(t=>t.phonetic)};
   },index);
   if(mode!=='zhuyin'&&index!==1)check(result.dock==='typing-dock'&&result.imeOutside,`${mode} stage ${index+1}: input dock stays outside the arena`);
   check(result.mechanic===['homefall','top_anchor','bottom_defense','word_combo','boss_raid'][index],`${mode} stage ${index+1}: world target layout active`);
   if(index===0||index===2)check(result.hidden&&result.bubbles.length>0&&result.bubbles.every(b=>b.word&&/\d\.\ds$/.test(b.time)),`${mode} stage ${index+1}: only real moving bubbles with countdowns`);
   else check(!result.hidden&&result.frame==='none',`${mode} stage ${index+1}: frameless world target visible`);
   if(mode!=='zhuyin'){
    check(!result.phonetic&&!result.progress&&result.words.every(p=>!p),`${mode} stage ${index+1}: no pronunciation data or duplicate Hanzi row`);
    const leaks=await page.evaluate(()=>{
     const d=game.stageData;if(d.currentToken&&typeof d.currentToken==='object')d.currentToken.phonetic='PINYIN_SENTINEL';
     const snapshots=[];
     for(const composing of [false,true]){game.imeComposing=composing;game.imeDraftText='ce';renderPromptForStage();updateImePanelHint();snapshots.push(el.arena.textContent,document.getElementById('typing-dock')?.textContent||'',[...document.querySelectorAll('#arena [title],#arena [aria-label],#arena [placeholder],#typing-dock [title],#typing-dock [aria-label],#typing-dock [placeholder]')].map(n=>[n.title,n.getAttribute('aria-label'),n.getAttribute('placeholder')].join(' ')).join(' '));}
     game.imeComposing=false;game.imeDraftText='';
     return snapshots.some(t=>t.includes('PINYIN_SENTINEL'));
    });
    check(!leaks,`${mode} stage ${index+1}: composing and accessible hints cannot expose token pronunciation`);
   }
  }
 }
 await page.evaluate(()=>openPracticeSetup('mode'));await page.locator('[data-practice-mode=simplified]').click();await page.locator('#enter-original-game').click();await page.locator('#title-screen.show').waitFor();
 const accepted=await page.evaluate(async()=>{
  practice.mode='simplified';applyTypingMode();closeOverlays();resetRun(false);loadStage(0,true);
  const d=game.stageData;d.spawnTimer=0;updateHomefall(.01);d.spawnTimer=0;updateHomefall(.01);
  const objects=[...d.objects];if(objects.length<2)return {count:objects.length};
  const selected=objects[objects.length-1],word=d.rowTokens[selected.char].text,correct=game.correctTyped;
  el.imeInput.value=word;handleChineseWordComboImeInput(true);return {word,accepted:game.correctTyped>correct,removed:!d.objects.some(o=>o.id===selected.id)};
 });
 check(accepted.accepted&&accepted.removed,'Non-first live bubble is accepted without sequence');
 check(errors.length===0,'No runtime errors');await page.evaluate(result=>window.__bubbleModeVerification=result,{passed:checks.length,checks,accepted,errors});
}
