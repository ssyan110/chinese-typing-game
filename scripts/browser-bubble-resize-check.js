async page=>{
 await page.goto('http://127.0.0.1:4186/');await page.locator('#practice-setup.show').waitFor({timeout:40000});
 await page.locator('[data-practice-mode=simplified]').click();await page.locator('#enter-original-game').click();await page.locator('#title-screen.show').waitFor();
 await page.setViewportSize({width:390,height:844});
 const before=await page.evaluate(()=>{closeOverlays();resetRun(false);loadStage(0,true);const d=game.stageData;d.spawnTimer=0;updateHomefall(.01);updateHomefall(1.3);setTargetSeconds(5);togglePause(true);const o=d.objects[0],r=el.arena.getBoundingClientRect();return {id:o.id,remaining:(r.height-38-o.y)/o.speed,hp:game.playerHp,progress:(o.y-o.flightLayout.origin)/(o.flightLayout.boundary-o.flightLayout.origin)};});
 const samples=[];
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:width===390?844:1000});
  samples.push(await page.evaluate(id=>{reflowHomefallObjects();renderProjectiles();const o=game.stageData.objects.find(o=>o.id===id),r=el.arena.getBoundingClientRect();return {remaining:(r.height-38-o.y)/o.speed,hp:game.playerHp,progress:(o.y-o.flightLayout.origin)/(o.flightLayout.boundary-o.flightLayout.origin)};},before.id));
 }
 // A control change immediately after a layout change must use the new geometry.
 await page.setViewportSize({width:1440,height:1000});
 const reset=await page.evaluate(id=>{setTargetSeconds(8);const o=game.stageData.objects.find(o=>o.id===id);return {remaining:(el.arena.getBoundingClientRect().height-38-o.y)/o.speed,hp:game.playerHp};},before.id);
 const result={before,samples,reset};await page.evaluate(r=>window.__bubbleResizeVerification=r,result);
 if(samples.some(s=>Math.abs(s.remaining-before.remaining)>.2||Math.abs(s.progress-before.progress)>.001||s.hp!==before.hp)||Math.abs(reset.remaining-8)>.05||reset.hp!==before.hp)throw Error(JSON.stringify(result));
}
