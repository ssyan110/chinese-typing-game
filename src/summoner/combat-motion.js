// Small articulated image meshes: no external renderer or 3D model download.
const bell=(x,y,cx,cy,rx,ry)=>Math.exp(-(((x-cx)/rx)**2+((y-cy)/ry)**2));
export function poseVertex(x,y,rig,time,{kind='idle',progress=0,reduced=false}={}){
 if(reduced)return {x,y};
 const p=Math.max(0,Math.min(1,progress)),pulse=Math.sin(Math.PI*p),attack=kind==='attack'?pulse:0,hit=kind==='hit'?Math.sin(p*Math.PI*5)*(1-p):0,guard=kind==='guard'?pulse:0;
 let dx=0,dy=0;const breath=Math.sin(time*2.3)*.006;
 if(rig==='hero'){
  const upper=bell(x,y,.55,.35,.5,.4),arm=bell(x,y,.69,.43,.24,.27),cloth=bell(x,y,.2,.63,.3,.35),head=bell(x,y,.52,.2,.24,.2);
  dx+=upper*(attack*.045-hit*.025)+arm*(attack*.075-guard*.035)+cloth*Math.sin(time*3.2-y*7)*.025;
  dy+=upper*breath-arm*(attack*.055+guard*.025)+head*Math.sin(time*1.8)*.006;
 }else if(rig==='moth'){
  const wing=Math.max(0,Math.min(1,(x-.18)*2)),flap=Math.sin(time*5.5)*(kind==='attack'?.14:.065);
  dx+=(x-.2)*wing*(flap-attack*.12)+hit*.02*y;dy+=wing*Math.sin(time*5.5-1)*.012+attack*.04*(.5-y);
 }else{
  const left=bell(x,y,.18,.65,.22,.26),right=bell(x,y,.82,.64,.22,.27),head=bell(x,y,.48,.24,.25,.23),chest=bell(x,y,.5,.48,.35,.3);
  dx+=left*(-attack*.055+Math.sin(time*2)*.008)+right*(attack*.055+Math.sin(time*2+1)*.008)+head*hit*.045;
  dy-=left*(attack*.13+Math.sin(time*2)*.01)+right*(attack*.08-Math.sin(time*2)*.01);dy+=chest*breath-head*attack*.024;
  if(rig==='sentinel')dx+=Math.sin(time*3-y*6)*.017*(left+right);
 }
 return {x:x+dx,y:y+dy};
}
export function combatFeedback(before,after,outcome){
 if(before.kind==='review'||!['correct','wrong','timeout'].includes(outcome))return null;
 const action=outcome==='correct'?after.lastAction:null,heroDamage=action?.heroDamage??Math.max(0,before.hp-after.hp),blocked=action?.blocked??Math.max(0,before.shield-after.shield);
 return {outcome,spell:outcome==='correct'?(after.lastAction?.spell||'strike'):'strike',defending:outcome==='correct'&&!!after.lastAction?.defending,enemyDamage:Math.max(0,before.enemyHp-after.enemyHp),heroDamage,blocked,heal:action?.heal??Math.max(0,after.hp-before.hp),counter:action?.counter??(outcome!=='correct'||heroDamage>0||blocked>0)};
}
function createMesh(image,rig){
 const canvas=document.createElement('canvas');canvas.className='actor-mesh';canvas.setAttribute('aria-hidden','true');image.after(canvas);
 const gl=canvas.getContext('webgl',{alpha:true,premultipliedAlpha:true,antialias:false,powerPreference:'low-power'});if(!gl){canvas.remove();return null;}
 let valid=true;const shader=(type,source)=>{const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))valid=false;return s;};
 const program=gl.createProgram();gl.attachShader(program,shader(gl.VERTEX_SHADER,'attribute vec2 position;attribute vec2 uv;varying vec2 tex;void main(){tex=uv;gl_Position=vec4(position,0.,1.);}'));gl.attachShader(program,shader(gl.FRAGMENT_SHADER,'precision mediump float;varying vec2 tex;uniform sampler2D image;void main(){vec4 c=texture2D(image,tex);c.a=smoothstep(0.35,0.92,c.a);c.rgb*=c.a;gl_FragColor=c;}'));gl.linkProgram(program);if(!valid||!gl.getProgramParameter(program,gl.LINK_STATUS)){canvas.remove();return null;}gl.useProgram(program);
 const cols=20,rows=26,points=[],indices=[];for(let y=0;y<=rows;y++)for(let x=0;x<=cols;x++)points.push([x/cols,y/rows]);for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){const a=y*(cols+1)+x;indices.push(a,a+1,a+cols+1,a+1,a+cols+2,a+cols+1);}
 const vertices=new Float32Array(points.length*4),buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,vertices.byteLength,gl.DYNAMIC_DRAW);for(const [name,offset]of [['position',0],['uv',8]]){const location=gl.getAttribLocation(program,name);gl.enableVertexAttribArray(location);gl.vertexAttribPointer(location,2,gl.FLOAT,false,16,offset);}const ib=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ib);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(indices),gl.STATIC_DRAW);
 const texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
 let source='',ready=false,lost=false;canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();lost=true;canvas.hidden=true;image.classList.remove('mesh-source');});canvas.addEventListener('webglcontextrestored',()=>{canvas.remove();image.classList.remove('mesh-source');lost=true;});
 return {setRig:value=>rig=value,draw(time,pose){if(lost||!image.complete||!image.naturalWidth)return;if(source!==image.currentSrc){try{gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,image);source=image.currentSrc;ready=true;}catch{return;}}if(!ready)return;
  const w=image.clientWidth,h=image.clientHeight;if(!w||!h)return;const dpr=Math.min(devicePixelRatio||1,1.5),cw=Math.round(w*1.2*dpr),ch=Math.round(h*1.2*dpr);if(canvas.width!==cw||canvas.height!==ch){canvas.width=cw;canvas.height=ch;gl.viewport(0,0,cw,ch);}Object.assign(canvas.style,{left:(image.offsetLeft-w*.1)+'px',top:(image.offsetTop-h*.1)+'px',width:w*1.2+'px',height:h*1.2+'px'});
  const ratio=image.naturalWidth/image.naturalHeight,fitW=Math.min(w,h*ratio)/w,fitH=Math.min(h,w/ratio)/h;for(let i=0;i<points.length;i++){const [x,y]=points[i],v=poseVertex(x,y,rig,time,pose),j=i*4;vertices[j]=(v.x-.5)*fitW*2/1.2;vertices[j+1]=-(v.y-.5)*fitH*2/1.2;vertices[j+2]=x;vertices[j+3]=y;}gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferSubData(gl.ARRAY_BUFFER,0,vertices);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);gl.drawElements(gl.TRIANGLES,indices.length,gl.UNSIGNED_SHORT,0);image.classList.add('mesh-source');},canvas};
}
export function installCombatMotion({arena,hero,enemy,reduced=()=>false}){
 const heroMesh=createMesh(hero,'hero'),enemyMesh=createMesh(enemy,'guardian'),layer=document.createElement('div');layer.className='combat-fx';layer.setAttribute('aria-hidden','true');arena.append(layer);
 let event=null,started=0,pausedAt=0,rig='guardian',lastFrame=0,heroBase=hero.src,animations=[];const preload=[];for(const pose of ['attack','defense','stand']){const img=new Image();img.src=new URL(`original/art/refined/hero-${pose}.webp`,document.baseURI).href;preload.push(img);}
 function clear(){animations.forEach(a=>a.cancel());animations=[];layer.replaceChildren();event=null;pausedAt=0;hero.src=heroBase;arena.removeAttribute('data-combat');}
 function point(node){const a=arena.getBoundingClientRect(),r=node.getBoundingClientRect();return {x:r.left-a.left+r.width*.5,y:r.top-a.top+r.height*.48};}
 function animate(node,keyframes,options){const a=node.animate(keyframes,options);animations.push(a);return a;}
 function ring(p,color,delay=0){const n=document.createElement('i');n.className='fx-ring';Object.assign(n.style,{left:p.x+'px',top:p.y+'px',borderColor:color,boxShadow:`0 0 18px ${color}`});layer.append(n);animate(n,[{opacity:0,transform:'translate(-50%,-50%) perspective(500px) rotateX(62deg) scale(.1)'},{opacity:.85,offset:.25},{opacity:0,transform:'translate(-50%,-50%) perspective(500px) rotateX(62deg) scale(2.1)'}],{duration:530,delay,fill:'both'});}
 function impact(p,color,delay){ring(p,color,delay);for(let i=0;i<10;i++){const n=document.createElement('i'),angle=i*Math.PI*2/10;n.className='fx-spark';Object.assign(n.style,{left:p.x+'px',top:p.y+'px',background:color});layer.append(n);animate(n,[{opacity:0,transform:'scale(.3)'},{opacity:1,offset:.2},{opacity:0,transform:`translate(${Math.cos(angle)*50}px,${Math.sin(angle)*40}px) scale(.1)`}],{duration:360,delay,fill:'both'});}}
 function bolt(a,b,color,delay){const n=document.createElement('i');n.className='fx-bolt';n.style.background=`radial-gradient(circle at 30% 25%,#fff 0%,${color} 38%,transparent 72%)`;n.style.color=color;layer.append(n);animate(n,[{opacity:0,transform:`translate(${a.x}px,${a.y}px) scale(.15)`},{opacity:1,offset:.15},{opacity:1,transform:`translate(${b.x}px,${b.y}px) scale(.8)`,offset:.82},{opacity:0,transform:`translate(${b.x}px,${b.y}px) scale(1.5)`}],{duration:340,delay,fill:'both'});impact(b,color,delay+260);}
 function number(p,text,type,delay){if(!text)return;const n=document.createElement('b');n.className='fx-number '+type;n.textContent=text;Object.assign(n.style,{left:p.x+'px',top:p.y+'px'});layer.append(n);animate(n,[{opacity:0,transform:'translate(-50%,0) scale(.7)'},{opacity:1,offset:.2},{opacity:0,transform:'translate(-50%,-45px) scale(1)'}],{duration:650,delay,fill:'both'});}
 return {reset(encounter){clear();rig=encounter;enemyMesh?.setRig(encounter);},play(feedback){if(!feedback)return;clear();event=feedback;started=performance.now();heroBase=new URL('original/art/refined/hero-stand.webp',document.baseURI).href;const a=point(hero),b=point(enemy),color=feedback.spell==='ward'?'#64c8dc':feedback.spell==='mend'?'#64c591':'#f4bd56';arena.dataset.combat=feedback.outcome;
  if(reduced()){clear();return;}
  hero.src=new URL(`original/art/refined/hero-${feedback.defending?'defense':feedback.outcome==='correct'?'attack':'defense'}.webp`,document.baseURI).href;
  if(feedback.outcome==='correct'){ring(a,color);bolt(a,b,color,100);number(b,'−'+feedback.enemyDamage,'enemy',350);if(feedback.heal)number(a,'+'+feedback.heal,'heal',100);}
  if(feedback.counter||feedback.defending){bolt(b,a,'#dd8061',feedback.outcome==='correct'?590:90);number(a,feedback.heroDamage?'−'+feedback.heroDamage:feedback.blocked?'Khiên −'+feedback.blocked:'Đỡ đòn','hero',feedback.outcome==='correct'?850:350);if(feedback.defending||feedback.blocked)ring(a,'#66cddd',feedback.outcome==='correct'?820:320);}
 },frame(now,{active,paused=false}={}){if(!active){if(event)clear();return;}if(reduced()&&event)clear();if(paused){if(!pausedAt)pausedAt=now;for(const a of animations)a.pause();return;}if(pausedAt){started+=now-pausedAt;pausedAt=0;}for(const a of animations)if(a.playState==='paused')a.play();if(now-lastFrame<33)return;lastFrame=now;const t=(now-started)/1000,reducedMotion=reduced();let hp={kind:'idle',progress:0,reduced:reducedMotion},ep={...hp};if(event){const attack=t/.65;hp={...hp,kind:event.outcome==='correct'?'attack':'hit',progress:attack};ep={...ep,kind:t<.35?'idle':'hit',progress:(t-.35)/.45};if((event.counter||event.defending)&&t>.55){ep={...ep,kind:'attack',progress:(t-.55)/.65};hp={...hp,kind:event.defending||event.blocked?'guard':'hit',progress:(t-.8)/.45};}if(t>1.4)clear();}heroMesh?.draw(now/1000,hp);enemyMesh?.draw(now/1000,ep);},get pending(){return !!event&&performance.now()-started<1200;},clear};
}
