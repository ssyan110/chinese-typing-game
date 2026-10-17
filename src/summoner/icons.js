// Product-owned SVG system. No icon font, remote requests, or user HTML injection.
const paths={
 trash:['M3 6h18','M9 6V3h6v3','M5 6l1 15h12l1-15','M10 10v7m4-7v7'],
 heart:['M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8'],
 history:['M3 11a9 9 0 1 1 2.6 7','M3 4v7h7','M12 7v5l3 2'],
 expand:['M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5'],
 collapse:['M3 8h5V3m13 5h-5V3M8 21v-5H3m13 5v-5h5'],
 volume:['M11 5 6 9H3v6h3l5 4z','M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14'],
 muted:['M11 5 6 9H3v6h3l5 4z','m16 9 5 6m0-6-5 6'],
 settings:['M9 3h6l.5 3 2 1.2 2.5-.8 2 3.6-2 2v2l2 2-2 3.6-2.5-.8-2 1.2-.5 2.5H9l-.5-2.5-2-1.2-2.5.8L2 16l2-2v-2l-2-2 2-3.6 2.5.8 2-1.2z','M15 13a3 3 0 1 1-6 0 3 3 0 0 1 6 0'],
 back:['M19 12H5m6-6-6 6 6 6'],forward:['M5 12h14m-6-6 6 6-6 6'],external:['M14 3h7v7m0-7L10 14','M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5'],
 pause:['M7 4h3v16H7zM14 4h3v16h-3z'],play:['m8 4 12 8-12 8z'],stop:['M5 5h14v14H5z'],close:['m6 6 12 12M18 6 6 18'],
 replay:['M3 11a9 9 0 1 1 3 7','M3 4v7h7'],check:['m5 12 4 4L19 6'],chevron:['m6 9 6 6 6-6'],
 book:['M12 6C9 3 5 3 2 4v15c4-1 7-1 10 2 3-3 6-3 10-2V4c-3-1-7-1-10 2zm0 0v15'],
 route:['M5 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0m18 14a2 2 0 1 1-4 0 2 2 0 0 1 4 0','M5 5h10a4 4 0 0 1 0 8H9a3 3 0 0 0 0 6h10'],
 shield:['m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6z','m8 12 3 3 5-6'],
 chart:['M4 3v17h17','M8 15V9m5 6V5m5 10v-4'],clock:['M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0','M12 7v5l3 2'],
 star:['m12 3 2.8 5.7 6.3.9-4.6 4.5 1.1 6.3-5.6-3-5.6 3 1.1-6.3-4.6-4.5 6.3-.9z'],
 trophy:['M8 3h8v7a4 4 0 0 1-8 0z','M8 5H4v3a4 4 0 0 0 4 4m8-7h4v3a4 4 0 0 1-4 4m-4 2v6m-4 1h8'],
 target:['M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0','M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0','M12 10v4m-2-2h4'],
 chain:['m10 14 4-4','M8 16 6.5 17.5a4 4 0 0 1-5.7-5.7L6 6.6a4 4 0 0 1 5.7 0m.6 10.8a4 4 0 0 0 5.7 0l5.2-5.2a4 4 0 0 0-5.7-5.7L16 8'],
 save:['M4 3h13l4 4v14H3V3z','M7 3v6h9V3M7 21v-8h10v8'],info:['M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0','M12 11v6m0-10v.1'],
 keyboard:['M3 5h18v14H3z','M6 9h.1m3 0h.1m3 0h.1m3 0h.1m3 0h.1M6 12h.1m3 0h.1m3 0h.1m3 0h.1m3 0h.1M7 16h10'],
 enter:['M20 4v10H4m5-5-5 5 5 5'],infinity:['M12 12C6 1 0 7 3 13c3 7 7 0 9-1 6-11 12-5 9 1-3 7-7 0-9-1'],spark:['m12 2 2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6z']
};
export function icon(name){const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');for(const [k,v]of Object.entries({viewBox:'0 0 24 24',fill:'none',stroke:'currentColor','stroke-width':'1.7','stroke-linecap':'round','stroke-linejoin':'round','aria-hidden':'true',focusable:'false',class:'ui-icon','data-icon-name':name}))svg.setAttribute(k,v);for(const d of paths[name]||paths.info){const path=document.createElementNS(svg.namespaceURI,'path');path.setAttribute('d',d);svg.append(path);}return svg;}
const clean=text=>String(text).replace(/[←→↗↙↵✓]/g,'').replace(/\s+/g,' ').trim();
export function iconLabel(node,text,name=node.dataset.icon){
 const label=clean(node.id==='pause-button'?String(text).replace(/\s*Esc\s*$/,''):text)||node.dataset.iconLabel||node.getAttribute('aria-label')||'';
 if(node.id==='sound-toggle')name=label.includes('tắt')?'muted':'volume';
 if(node.id==='fullscreen-toggle')name=label.includes('Thu nhỏ')?'collapse':'expand';
 node.dataset.icon=name;let span=node.querySelector(':scope > .control-label');
 if(!span){span=document.createElement('span');span.className='control-label';node.replaceChildren(icon(name),span);}else if(node.querySelector(':scope > .ui-icon')?.dataset.iconName!==name)node.querySelector(':scope > .ui-icon')?.replaceWith(icon(name));
 if(span.textContent!==label)span.textContent=label;
 if(node.tagName==='SUMMARY'&&!node.querySelector(':scope > .summary-chevron')){const arrow=icon('chevron');arrow.classList.add('summary-chevron');node.append(arrow);}
 if(node.id==='pause-button'&&!node.querySelector('kbd')){const key=document.createElement('kbd');key.textContent='Esc';node.append(key);}
 if(node.matches('button,a')){node.setAttribute('aria-label',label);node.title=label;}
 return node;
}
export function decorateIcons(root=document){
 for(const n of root.querySelectorAll('summary'))if(!n.dataset.icon)n.dataset.icon=n.closest('.sources,.vocabulary-catalog,.word-review')?'book':n.closest('.history-about')?'save':n.closest('.score-help')?'star':n.closest('.free-play')?'trophy':'info';
 for(const n of root.querySelectorAll('[data-icon]'))if(!n.querySelector(':scope > .ui-icon'))iconLabel(n,n.dataset.iconLabel||n.textContent,n.dataset.icon);
 for(const n of root.querySelectorAll('[data-symbol]'))n.replaceChildren(icon(n.dataset.symbol));
}
export function metricLabel(node,label){const names={'Chính xác':'target','Điểm':'star','Phù văn đúng':'check','Lần đúng':'check','Nhập sai':'close','Hết giờ':'clock','Thời gian':'clock','Chuỗi dài nhất':'chain','Chuỗi tốt nhất':'chain','Xếp hạng':'trophy'};return iconLabel(node,label,names[label]||'chart');}

export function rating(node,count,kind=''){
 if(count===null){node.replaceChildren(document.createTextNode(kind==='review'?'ÔN TẬP':'LIÊN HOÀN'));node.removeAttribute('role');return;}
 count=Math.max(0,Math.min(3,count));node.replaceChildren();node.setAttribute('role','img');node.setAttribute('aria-label',`${count} trên 3 sao`);
 for(let i=0;i<3;i++){const star=icon('star');star.classList.toggle('is-filled',i<count);node.append(star);}
}
