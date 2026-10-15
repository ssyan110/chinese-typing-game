async page=>{
 const rows=[];
 for(const width of [390,1440]){
  await page.setViewportSize({width,height:width===390?844:1000});
  for(const index of [0,2,3,4]){
   await page.evaluate(index=>{closeOverlays();resetRun(false);loadStage(index,true);const d=game.stageData;if(index===0||index===2){d.spawnTimer=0;(index===0?updateHomefall:updateBottomDefense)(.01);for(const o of d.objects){if(index===0){d.rowTokens[o.char]={text:'中华人民共和国' ,phonetic:''};o.x=el.arena.clientWidth*.81;o.y=el.arena.clientHeight-70;o.speed=.1;}else{o.x=el.arena.clientWidth*.5;o.speed=.1;}}renderProjectiles();if(index===0){for(const n of el.projectileLayer.querySelectorAll('.bubble-word'))n.textContent='中华人民共和国';renderProjectiles();}}renderPromptForStage();},index);
   await page.screenshot({path:`output/playwright/bubble-${width}-stage${index+1}.png`});
   rows.push(await page.evaluate(({width,index})=>{const a=el.arena.getBoundingClientRect(),d=el.imePanel.getBoundingClientRect();const nodes=[...el.projectileLayer.querySelectorAll('.hanzi-object')].map(n=>{const r=n.getBoundingClientRect(),t=n.querySelector('.bubble-seconds').getBoundingClientRect();return {inside:r.left>=a.left&&r.right<=a.right&&r.top>=a.top&&r.bottom<=a.bottom,timerInside:t.bottom<=a.bottom};});return {width,stage:index+1,dockOutside:d.top>=a.bottom||d.bottom<=a.top,noOverflow:document.documentElement.scrollWidth<=innerWidth,bubbles:nodes};},{width,index}));
  }
 }
 await page.evaluate(rows=>window.__bubbleGeometry=rows,rows);
 if(rows.some(r=>!r.dockOutside||!r.noOverflow||r.bubbles.some(b=>!b.inside||!b.timerInside)))throw Error(JSON.stringify(rows));
}
