async page=>{
 const results=[];for(const mode of ['simplified','zhuyin'])for(const viewport of [{width:1280,height:720},{width:1366,height:768},{width:1920,height:1080},{width:3840,height:2160}]){
  await page.setViewportSize(viewport);await page.goto('http://127.0.0.1:4186/');await page.locator(`[data-mode=${mode}]`).click();await page.locator('#enter-lobby:enabled').waitFor();await page.locator('#enter-lobby').click();await page.locator('#continue-learning').click();
  const sizes=await page.evaluate(()=>{const arena=document.getElementById('arena').getBoundingClientRect();return {width:innerWidth,height:innerHeight,body:document.documentElement.scrollHeight,scroll:document.documentElement.scrollWidth,clipped:[...document.querySelectorAll('.hero-station>img,.enemy-station>img,.vital-card')].filter(n=>{const r=n.getBoundingClientRect();return r.top<arena.top||r.bottom>arena.bottom||r.left<arena.left||r.right>arena.right;}).map(n=>n.id||n.className)};});
  if(sizes.scroll>sizes.width||sizes.body>sizes.height+5||sizes.clipped.length)throw Error(JSON.stringify({mode,...sizes}));results.push({mode,...sizes});await page.screenshot({path:`output/playwright/curriculum-fit-${mode}-${viewport.width}.png`});await page.locator('#pause-button').click();
 }return results;
}
