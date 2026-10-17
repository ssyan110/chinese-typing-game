async source=>{
 const results=[];
 for(const width of [320,390,768,1366,1920]){
  const c=await source.context().browser().newContext({viewport:{width,height:900}}),p=await c.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto('http://localhost:5186/');await p.locator('.setup-hero').waitFor();
  if(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Home overflow '+width);
  const clipped=await p.locator('#setup-screen .mode-choice').evaluateAll(ns=>ns.filter(n=>n.scrollWidth>n.clientWidth).length);if(clipped)throw Error('Clipped choice '+width);
  await p.locator('#history-toggle').click();await p.locator('#history-dialog').waitFor();await p.keyboard.press('Escape');
  for(const mode of ['simplified','traditional','zhuyin']){
   await p.locator('[data-mode='+mode+']').click();await p.locator('#level-form').waitFor();await p.locator('#vocab-level option').first().waitFor({state:'attached'});
   if(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Level overflow '+width+' '+mode);
   if(width===390&&mode==='simplified')await p.screenshot({path:'output/playwright/home-redesign-level-390.png',fullPage:true});
   await p.locator('#back-modes').click();await p.locator('#mode-choices').waitFor();
  }
  await p.locator('.sources summary').click();await p.locator('.sources a').first().waitFor();await p.locator('.sources summary').click();
  await p.locator('[data-mode=simplified]').focus();await p.keyboard.press('Enter');await p.locator('#level-form').waitFor();await p.locator('#enter-lobby:enabled').click();await p.locator('#chapter-list').waitFor();
  if(errors.length)throw Error(errors.join(';'));results.push({width,modes:3,history:true,keyboard:true,overflow:false,errors});await c.close();
 }
 return results;
}
