// The visual viewport, rather than 100vh, describes the space above a phone IME.
export function mobileViewport({width,height,layoutHeight,baselineHeight,focused=false,scale=1,coarse=false}){
 const mobile=width<=1024||(coarse&&width<=1400),zoomed=Math.abs(scale-1)>.05;
 return {mobile,keyboard:mobile&&focused&&!zoomed&&(baselineHeight-height>120||height<500),height:zoomed?layoutHeight:height};
}
export function installMobileLayout(){
 const byId=id=>document.getElementById(id),body=document.body,root=document.documentElement;
 const slot=byId('mobile-spells'),heading=document.querySelector('.spell-heading'),spells=document.querySelector('.spell-list'),notice=byId('battle-notice'),aside=document.querySelector('.tactics-panel'),arena=byId('arena');
 const headingAnchor=document.createComment('desktop spell controls'),noticeAnchor=document.createComment('desktop battle notice');aside.insertBefore(headingAnchor,heading);arena.insertBefore(noticeAnchor,notice);
 let moved=false,scheduled=false,baselineHeight=innerHeight,baselineWidth=innerWidth;
 for(const button of spells.querySelectorAll('button'))button.setAttribute('aria-label',button.textContent.trim().replace(/\s+/g,' '));
 function sync(){
  scheduled=false;const vv=window.visualViewport,width=innerWidth;
  if(Math.abs(width-baselineWidth)>120){baselineWidth=width;baselineHeight=innerHeight;}else baselineHeight=Math.max(baselineHeight,innerHeight);
  const state=mobileViewport({width,height:vv?.height||innerHeight,layoutHeight:innerHeight,baselineHeight,focused:document.activeElement===byId('hanzi-input'),scale:vv?.scale||1,coarse:matchMedia('(pointer:coarse)').matches});
  body.dataset.mobile=String(state.mobile);body.classList.toggle('native-keyboard',state.keyboard&&body.dataset.screen==='battle-screen');body.classList.toggle('keyboard-tight',state.keyboard&&state.height<280&&body.dataset.screen==='battle-screen');
  root.style.setProperty('--visible-height',Math.round(state.height)+'px');root.style.setProperty('--visible-top',Math.round(vv?.offsetTop||0)+'px');
  if(state.mobile&&!moved){slot.append(notice,heading,spells);moved=true;}else if(!state.mobile&&moved){headingAnchor.after(heading,spells);noticeAnchor.after(notice);moved=false;}
  if(!state.mobile||body.dataset.screen!=='battle-screen')return;
  const input=body.dataset.mode==='zhuyin'?byId('touch-keyboard'):byId('cast-form');
  const top=arena.getBoundingClientRect().top+scrollY,bottom=parseFloat(getComputedStyle(document.querySelector('main')).paddingBottom)||16,available=state.height-top-slot.offsetHeight-input.offsetHeight-16-bottom;
  const height=Math.max(body.dataset.mode==='zhuyin'?(state.height<=700?180:200):200,Math.min(480,Math.floor(available)));
  if(root.style.getPropertyValue('--mobile-arena-height')!==height+'px')root.style.setProperty('--mobile-arena-height',height+'px');
  if(document.activeElement===byId('hanzi-input')&&!state.keyboard)keepVisible();
 }
 function refresh(){if(!scheduled){scheduled=true;requestAnimationFrame(sync);}}
 function keepVisible(){
  if(body.dataset.mobile!=='true'||body.dataset.screen!=='battle-screen'||body.classList.contains('native-keyboard'))return;
  const field=arena.getBoundingClientRect(),keyboard=byId(body.dataset.mode==='zhuyin'?'touch-keyboard':'cast-form').getBoundingClientRect(),height=window.visualViewport?.height||innerHeight;
  if(field.top<0||keyboard.bottom>height)arena.scrollIntoView({block:'start',behavior:'instant'});
 }
 window.addEventListener('resize',refresh);window.addEventListener('orientationchange',refresh);window.visualViewport?.addEventListener('resize',refresh);window.visualViewport?.addEventListener('scroll',refresh);
 document.addEventListener('focusin',refresh);document.addEventListener('focusout',refresh);document.fonts?.ready.then(refresh);
 if(typeof ResizeObserver!=='undefined'){const observer=new ResizeObserver(refresh);for(const node of [slot,byId('cast-form'),byId('touch-keyboard'),document.querySelector('.battle-heading')])observer.observe(node);}
 sync();return {refresh,keepVisible};
}
