async(page)=>{
 const checks=[],errors=[],missing=[],old=[];const check=(ok,label)=>{if(!ok)throw Error(label);checks.push(label);};
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&r.url().startsWith('http://127.0.0.1:4186'))missing.push(r.url());});page.on('request',r=>{if(/\/game\/(assets|audio|fonts)\//.test(r.url()))old.push(r.url());});
 await page.setViewportSize({width:1440,height:1000});await page.goto('http://127.0.0.1:4186');await page.bringToFront();await page.locator('#practice-setup.show').waitFor({timeout:40000});check(await page.title()==='Đèn Sao · Hành trình chữ Hán','Original academy identity is live');
 await page.screenshot({path:'output/playwright/original-setup-desktop.png'});await page.locator('[data-practice-mode=simplified]').click();await page.locator('#enter-original-game').click();await page.locator('#title-screen.show').waitFor();await page.locator('#btn-start').click();await page.locator('[data-stage-play="0"]').click();
 for(let i=0;i<6;i++){if(await page.evaluate(()=>game.mode)==='dialogue')await page.locator('#dialogue-next').click();else break;}await page.waitForFunction(()=>game.mode==='playing'&&game.stageData.objects.length>0);
 const initial=await page.evaluate(()=>({time:audio.bgm.main.currentTime,src:audio.bgm.main.currentSrc,loop:audio.bgm.main.loop,paused:audio.bgm.main.paused}));await page.waitForTimeout(1000);
 check(initial.src.includes('/original/audio/jade-postroad.mp3')&&initial.loop&&!initial.paused&&await page.evaluate(t=>audio.bgm.main.currentTime>t,initial.time),'Original looping music actually plays and advances');
 check(await page.locator('#hero-sprite').evaluate(n=>n.currentSrc.includes('/original/art/refined/hero-')&&n.naturalWidth>0),'Original hero animation image decodes');check(await page.locator('#enemy-sprite').evaluate(n=>n.currentSrc.includes('/original/art/refined/')&&n.naturalWidth>0),'Refined illustrated creature decodes');
 const word=await page.locator('.bubble-word').first().innerText();await page.locator('#ime-input').fill(word);await page.locator('#ime-confirm').click();check(await page.evaluate(()=>game.correctTyped)>0,'Actual visible bubble can be answered through the separate dock');
 check(await page.locator('#prompt-board').evaluate(n=>getComputedStyle(n).display==='none'),'No duplicate upper target frame in rune game');
 const verifyGeometry=async width=>{
  await page.setViewportSize({width,height:1000});await page.waitForTimeout(120);
  const result=await page.evaluate(()=>{const r=id=>document.getElementById(id).getBoundingClientRect();const input=r('ime-input'),arena=r('arena'),hud=r('top-hud'),controls=r('combat-controls');return {overflow:document.documentElement.scrollWidth>innerWidth,dock:el.imePanel.parentElement.id,inputOutside:input.top>=arena.bottom,arenaOutsideHud:arena.top>=hud.bottom,controlsInsideHud:controls.bottom<=hud.bottom+1,inputVisible:getComputedStyle(el.imeInput).visibility==='visible'&&getComputedStyle(el.imePanel).opacity==='1'};});
  check(!result.overflow&&result.dock==='typing-dock'&&result.inputOutside&&result.arenaOutsideHud&&result.controlsInsideHud&&result.inputVisible,`${width}px: HUD, battlefield and visible typing lane do not overlap`);
 };
 for(const width of [1440,768,390])await verifyGeometry(width);
 await page.screenshot({path:'output/playwright/original-bubbles-mobile.png',fullPage:true});
 await page.setViewportSize({width:1440,height:1000});await page.waitForTimeout(180);await page.screenshot({path:'output/playwright/original-bubbles-desktop.png'});
 // Isolated layout/mechanic fixtures after the real menu/answer path above.
 for(const index of [1,2,3,4]){
  await page.evaluate(i=>{closeOverlays();resetRun(false);loadStage(i,true);if(i===2){game.stageData.spawnTimer=0;updateBottomDefense(.01);renderProjectiles();}},index);
  await page.setViewportSize({width:390,height:844});await page.waitForTimeout(120);
  check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Original stage ${index+1} mobile layout fits`);
  await page.screenshot({path:`output/playwright/original-stage${index+1}-mobile.png`,fullPage:true});
 }
 await page.evaluate(()=>{const token={text:'中华人民共和国',phonetic:'PINYIN_SENTINEL'};setCurrentWordToken(game.stageData,token);renderPromptForStage();});
 check(await page.locator('#word-progress').innerText()==='','Long Hanzi target fixture still provides no pinyin');
 check(await page.locator('#prompt-board').evaluate(n=>{const a=el.arena.getBoundingClientRect(),r=n.getBoundingClientRect();return r.left>=a.left&&r.right<=a.right&&r.bottom<=a.bottom;}),'Long Hanzi world target stays within mobile arena');
 await page.screenshot({path:'output/playwright/original-longword-mobile.png',fullPage:true});
 check(errors.length===0,'No original-world runtime errors');check(missing.length===0,'All original media loads without 404');check(old.length===0,'No source-game picture, audio or font requests');
 await page.evaluate(r=>window.__originalWorldVerification=r,{passed:checks.length,checks,errors,missing,old,word,music:initial});
}
