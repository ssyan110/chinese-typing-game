async source=>{
 const report=[];
 for(const width of [320,390,768,1366]){
  const c=await source.context().browser().newContext({viewport:{width,height:950}}),p=await c.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto('http://localhost:5186/');
  const failures=await p.locator('[data-icon-only]').evaluateAll(ns=>ns.filter(n=>n.offsetParent&&(!n.getAttribute('aria-label')||!n.querySelector('svg[aria-hidden=true]')||n.getBoundingClientRect().height<44)).map(n=>n.id));if(failures.length)throw Error(JSON.stringify(failures));
  if(await p.locator('#fullscreen-toggle').evaluate(n=>getComputedStyle(n,'::after').content)!=='none')throw Error('Duplicate fullscreen glyph');
  await p.locator('#sound-toggle').click();if(await p.locator('#sound-toggle').getAttribute('data-icon')!=='volume'||await p.locator('#sound-toggle').getAttribute('aria-pressed')!=='true')throw Error('Sound icon state lost');await p.locator('#sound-toggle').click();
  await p.locator('#settings-toggle').click();await p.locator('#high-contrast').check();await p.locator('#reduce-motion').check();if(await p.locator('#settings-toggle').getAttribute('aria-expanded')!=='true')throw Error('Settings state');await p.locator('#high-contrast').uncheck();await p.locator('#settings-toggle').click();
  await p.screenshot({path:'output/playwright/product-home-'+width+'.png',fullPage:true});
  await p.locator('[data-mode=simplified]').click();await p.locator('#enter-lobby:enabled').click();await p.locator('#lobby-seconds').fill('60');await p.locator('#lobby-seconds').press('Tab');
  const value=await p.locator('#continue-learning').innerText();await p.locator('#continue-learning > svg').waitFor();if(!value.includes('chặng'))throw Error('Continue label removed');await p.screenshot({path:'output/playwright/product-lobby-'+width+'.png',fullPage:true});
  await p.locator('#continue-learning').click();await p.locator('#arena[data-renderer=three]').waitFor();await p.locator('#hanzi-input').fill(await p.locator('#active-rune').innerText());await p.locator('#pause-button').click();await p.locator('#pause-dialog').waitFor();await p.screenshot({path:'output/playwright/product-pause-'+width+'.png',fullPage:true});
  await p.locator('#resume').click();await p.locator('#pause-button').click();await p.locator('#quit-paused').click();await p.locator('#result-screen').waitFor();if(await p.locator('#result-stars .ui-icon').count()!==3)throw Error('Rating SVG missing');await p.screenshot({path:'output/playwright/product-result-'+width+'.png',fullPage:true});
  await p.locator('#history-toggle').click();await p.locator('.history-record').waitFor();if(await p.locator('.history-record .history-word-table').count()!==1)throw Error('Word history missing');await p.screenshot({path:'output/playwright/product-history-'+width+'.png',fullPage:true});
  if(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Overflow '+width);if(errors.length)throw Error(errors.join(';'));report.push({width,iconsAccessible:true,dynamicLabels:true,soundState:true,settings:true,resultAndHistory:true,errors});await c.close();
 }
 return report;
}
