async page=>{
 await page.goto('http://127.0.0.1:4186/');await page.locator('#practice-setup.show').waitFor();await page.locator('[data-practice-mode=simplified]').click();await page.locator('#enter-original-game').click();await page.locator('#title-screen.show').waitFor();
 await page.evaluate(()=>{closeOverlays();resetRun(false);loadStage(0,true);togglePause(true);});
 const checks=[];
 for(const width of [1440,1024,768,390]){
 await page.setViewportSize({width,height:800});
 for(const open of [false,true]){
 await page.locator('#combat-guide').evaluate((n,v)=>n.open=v,open);
 const state=await page.evaluate(()=>{const footer=document.querySelector('#bottom-hud'),progress=document.querySelector('#objective-progress'),details=document.querySelector('#combat-guide'),r=n=>n.getBoundingClientRect();return {overflow:document.documentElement.scrollWidth>innerWidth,footerHeight:r(footer).height,inside:r(progress).bottom<=r(footer).bottom,detailsInside:r(details).bottom<=r(footer).bottom,help:document.querySelector('#help-panel').scrollHeight<=document.querySelector('#help-panel').clientHeight+1};});
 if(state.overflow||!state.inside||!state.detailsInside||(open&&!state.help)||(!open&&state.footerHeight>120))throw Error(JSON.stringify({width,open,...state}));checks.push({width,open,...state});
 }
 await page.locator('#combat-guide').evaluate(n=>n.open=false);
 }
 await page.setViewportSize({width:1440,height:900});await page.evaluate(()=>{togglePause(false);updateHomefall(.1);renderProjectiles();});await page.waitForTimeout(200);await page.screenshot({path:'output/playwright/refined-game-desktop.png',fullPage:true});await page.evaluate(r=>window.__compactFooterVerification=r,checks);
}
