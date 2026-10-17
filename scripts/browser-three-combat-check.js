async page=>{
 const results=[];
 for(const [kind,width,mode]of [['guardian',1366,'simplified'],['moth',390,'traditional'],['sentinel',320,'zhuyin']]){
  const c=await page.context().browser().newContext({viewport:{width,height:900}}),p=await c.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto('http://127.0.0.1:5186/');await p.locator('[data-mode='+mode+']').click();await p.locator('#enter-lobby:enabled').click();await p.locator('#lobby-seconds').fill('60');await p.locator('#lobby-seconds').press('Tab');await p.locator('.free-play summary').click();await p.locator('[data-encounter='+kind+']').click();await p.locator('#arena[data-renderer=three]').waitFor();
  if(mode==='zhuyin'){const goal=1;for(let n=0;n<40;n++){if(await p.evaluate(()=>window.__tulinh.snapshot().correct)>=goal)break;const symbol=await p.locator('#zhuyin-progress .current').innerText(),key=await p.locator('[data-symbol-key]').evaluateAll((ns,s)=>ns.find(n=>n.querySelector('b').textContent===s).dataset.symbolKey,symbol);await p.locator('[data-symbol-key="'+key+'"]').click();}}else await p.locator('#hanzi-input').fill(await p.locator('#active-rune').innerText());
  await p.waitForTimeout(420);await p.screenshot({path:'output/playwright/three-'+kind+'-'+width+'.png'});const state=await p.evaluate(()=>window.__tulinh.snapshot());if(state.correct!==1||state.enemyHp>=state.enemyMax||errors.length)throw Error(JSON.stringify({state,errors}));
  if(await p.locator('.combat-3d-stage').count()!==1||await p.locator('.actor-mesh').count())throw Error('Old mesh renderer remains');if(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Overflow');
  const samples=await p.evaluate(()=>new Promise(resolve=>{const times=[];let before=performance.now();function frame(now){times.push(now-before);before=now;if(times.length===31)resolve(times.slice(1));else requestAnimationFrame(frame);}requestAnimationFrame(frame);}));
  await p.locator('#pause-button').click();await p.locator('#quit-paused').click();await p.locator('#history-toggle').click();if(!await p.locator('.history-word-table').isVisible())throw Error('History regressed');await p.locator('[data-history-close]').click();results.push({kind,width,correct:state.correct,averageFrameMs:Math.round(samples.reduce((a,b)=>a+b,0)/samples.length*10)/10,errors});await c.close();
 }
 return results;
}
