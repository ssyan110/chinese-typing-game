import * as T from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {createFighter,poseFighter} from './combat-scene3d.js';
const colors={village:{sky:'#dce8cf',earth:'#77965e',sun:'#ffe2ac'},bamboo:{sky:'#bfdbca',earth:'#477659',sun:'#e5f2c9'},harbor:{sky:'#ecd3b4',earth:'#bc9a6a',sun:'#ffd39b'},canyon:{sky:'#ecd1ae',earth:'#b97c51',sun:'#ffe0ad'},academy:{sky:'#d9e2df',earth:'#9dada2',sun:'#fff1c9'},snow:{sky:'#d6e6ed',earth:'#dce5de',sun:'#eaf6fa'},city:{sky:'#717e91',earth:'#788582',sun:'#ffd19b'},homecoming:{sky:'#334e5c',earth:'#698171',sun:'#ffca7b'}};
export function createJourneyScene(canvas,{station='village',reduced=()=>false}={}){
 const renderer=new T.WebGLRenderer({canvas,antialias:true,alpha:false,preserveDrawingBuffer:true,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.12;
 const scene=new T.Scene(),camera=new T.OrthographicCamera(-7,7,5,-5,.1,100),environment=new T.Group();scene.add(environment);
 const materials=new Map();const mat=(color)=>{if(!materials.has(color))materials.set(color,new T.MeshStandardMaterial({color,roughness:.88,metalness:0}));return materials.get(color);};
 function mesh(p,g,c,x,y,z){const m=new T.Mesh(g,typeof c==='string'?mat(c):c);m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;p.add(m);return m;}
 const block=(p,c,x,y,z,w,h,d,r=.08)=>mesh(p,new RoundedBoxGeometry(w,h,d,2,Math.min(r,w/4,h/4,d/4)),c,x,y,z);
 const ball=(p,c,x,y,z,sx,sy,sz)=>{const m=mesh(p,new T.SphereGeometry(1,16,12),c,x,y,z);m.scale.set(sx,sy,sz);return m;};
 const pole=(p,c,x,y,z,h,r=.07)=>mesh(p,new T.CylinderGeometry(r,r*1.08,h,12),c,x,y,z);
 const group=(x=0,y=0,z=0)=>{const g=new T.Group();g.position.set(x,y,z);environment.add(g);return g;};
 function house(x,z,s=1){const g=group(x,0,z);g.scale.setScalar(s);block(g,'#ead9b5',0,.9,0,1.8,1.8,1.5);block(g,'#79533c',0,.12,0,2,.22,1.7);for(const x of [-.83,.83])block(g,'#8b6544',x,1,0,.12,1.85,1.6);for(const sign of [-1,1]){const roof=block(g,'#47665b',sign*.54,2.05,0,1.32,.18,2.05);roof.rotation.z=sign*-.55;for(let n=0;n<6;n++){const tile=block(g,'#57786a',sign*.54,2.15,-.85+n*.34,1.3,.045,.07,.01);tile.rotation.z=sign*-.55;}}
 block(g,'#4d5341',-.35,.6,.78,.55,1.13,.08);block(g,'#f4bd62',.47,1.04,.79,.46,.54,.07);for(const x of [.35,.58])block(g,'#86613f',x,1.05,.84,.035,.6,.04,.01);block(g,'#86613f',.47,1.04,.85,.5,.035,.04,.01);lantern(g,-.72,1.65,1);return g;}
 function lantern(p,x,y,z){pole(p,'#7c5a3c',x,y+.22,z,.35,.025);ball(p,'#f4b855',x,y,z,.13,.18,.13);for(const yy of [-.15,.15])block(p,'#9b6839',x,y+yy,z,.21,.035,.21,.01);}
 function tree(x,z,s=1){const g=group(x,0,z);pole(g,'#886a48',0,.8,0,1.6,.14);for(const [a,b,c,d]of [[0,2,0,.75],[-.45,1.65,.05,.62],[.45,1.65,.15,.6],[0,1.6,-.4,.62]])ball(g,'#789962',a,b,c,d,d*.85,d);g.scale.setScalar(s);}
 function bamboo(x,z,h=3){const g=group(x,0,z);for(const dx of [-.22,.12,.37]){const height=h+dx;pole(g,'#658e52',dx,height/2,dx/2,height,.065);for(let n=.3;n<height;n+=.55){pole(g,'#a1b97b',dx,n,dx/2,.04,.079);}for(const side of [-1,1]){const leaf=ball(g,'#4d784d',dx+side*.26,height-.5,.1,.4,.075,.15);leaf.rotation.z=side*.4;const tip=ball(g,'#72975c',dx+side*.18,height-.05,-.05,.34,.065,.13);tip.rotation.z=side*.55;}}}
 const hemi=new T.HemisphereLight('#ffefcc','#526951',2.6);scene.add(hemi);const sun=new T.DirectionalLight('#ffe2ac',3.5);sun.position.set(-4,10,8);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);Object.assign(sun.shadow.camera,{left:-10,right:10,top:10,bottom:-10});sun.shadow.normalBias=.04;scene.add(sun);const fill=new T.DirectionalLight('#d5e8d9',1.2);fill.position.set(7,4,-2);scene.add(fill);
 function soften(actor){actor.group.traverse(n=>{if(n.material?.isMeshStandardMaterial){n.material.roughness=.88;n.material.metalness=0;}});return actor;}
 const hero=soften(createFighter('hero'));scene.add(hero.group);hero.group.position.set(-1.25,0,1.55);hero.group.rotation.y=.5;hero.group.scale.setScalar(1.1);
 let creature=createFighter('sentinel');scene.add(creature.group);let current='',gate=[],signs=[],cargo=[],boat=null,progress=0,last=0,eventAt=-10,eventKind='',destroyed=false;
 function clearEnvironment(){environment.traverse(n=>n.geometry?.dispose());environment.clear();gate=[];signs=[];cargo=[];boat=null;}
 function setStation(id){
  if(current===id)return;current=id;clearEnvironment();const palette=colors[id];scene.background=new T.Color(palette.sky);scene.fog=new T.Fog(palette.sky,22,44);sun.color.set(palette.sun);const night=id==='homecoming',dusk=id==='city';hemi.intensity=night?.8:dusk?1.5:2.6;sun.intensity=night?.7:dusk?1.5:3.5;fill.intensity=night?.45:dusk?.8:1.2;
  scene.remove(creature.group);creature.group.traverse(n=>n.geometry?.dispose());creature=soften(createFighter(id==='bamboo'?'guardian':id==='harbor'?'moth':'sentinel'));scene.add(creature.group);creature.group.position.set(1.8,0,1.3);creature.group.rotation.y=-.65;creature.group.scale.setScalar(id==='bamboo'?.82:.64);
  const distant=id==='snow'?'#e2eaea':id==='canyon'?'#c09067':night?'#3c6264':dusk?'#596e79':null;
  for(let i=0;i<8;i++)ball(environment,distant||(i%2?'#9db49a':'#b6c5a7'),-11+i*3.2,0,-8-(i%2)*2,3,2.7+(i%3)*.7,2.8);
  block(environment,palette.earth,0,-.35,0,15,.6,12,.2);
  if(id==='village'){
   block(environment,'#d3ba8a',0,-.02,2,10,.12,3);block(environment,'#6e9f96',-4,.01,0,1.1,.13,11);
   house(-3.2,-3,1.3);house(2.5,-3.7,1.25);house(5,-1.8,.85);
   for(const x of [-1.35,1.35]){block(environment,'#806047',x,1.1,-1,.18,2.3,.2);lantern(environment,x,1.8,-.75);}
   block(environment,'#4d7162',0,2.32,-1,3.3,.25,.55);block(environment,'#d2b17c',0,1.95,-1,1.45,.4,.15);
   for(const side of [-1,1]){const g=group(side*1.25,0,-1);block(g,'#a98454',-side*.52,.85,0,1.05,1.7,.14);for(let n=0;n<4;n++)block(g,'#bf9b63',-side*(.15+n*.25),.85,.08,.05,1.55,.08);gate.push(g);}
   for(const [x,z]of [[-6,-2],[-5,3],[5,3],[6,-4]])tree(x,z,.85);
   for(let n=0;n<12;n++){const z=-4+(n%4)*.65,x=-6+Math.floor(n/4)*.5;ball(environment,'#afbb71',x,.13,z,.3,.13,.27);}
   for(let n=0;n<10;n++)block(environment,'#d4c5a3',-2+n*.43,.08,2.8,.32,.06,.45);
   const mailbox=group(-2.9,0,1.1);pole(mailbox,'#816041',0,.6,0,1.2);block(mailbox,'#b66e42',0,1.25,0,.55,.55,.45);block(mailbox,'#ead8ad',0,1.25,.24,.3,.14,.03,.01);
  }else if(id==='bamboo'){
   block(environment,'#78aaa0',0,.005,-1,15,.13,1.9);
   for(let n=0;n<13;n++)block(environment,'#c4bc97',0,.12,-3+n*.55,1.8,.16,.45);
   for(let n=0;n<22;n++)bamboo((n%2?-1:1)*(3+(n%5)*.72),-5+Math.floor(n/2)*.7,2.8+(n%3)*.4);
   for(const [x,z]of [[-2,2],[-2,-1],[2,-3]]){const g=group(x,0,z);pole(g,'#816649',0,.65,0,1.3,.07);const sign=block(g,'#b9a477',0,1.35,0,.9,.35,.12);sign.rotation.z=.25;signs.push(sign);}
   for(let n=0;n<9;n++)ball(environment,'#80948a',-3.5+n*.85,.1,-.3,.35,.19,.3);
   const shrine=group(3.1,0,-2.1);block(shrine,'#9bafa1',0,.25,0,1.6,.5,1.2);block(shrine,'#bac6ab',0,.8,0,1,.75,.9);block(shrine,'#5c7766',0,1.35,0,1.5,.25,1.3);
  }else if(id==='harbor'){
   block(environment,'#72a9a1',0,-.01,-2.4,15,.2,6.5);block(environment,'#c6ac80',0,.11,2.7,15,.28,4.2);
   for(let n=0;n<21;n++)block(environment,'#a67d51',-5+n*.5,.25,-.25,.46,.2,3.2);
   for(const x of [-5,-2,2,5]){pole(environment,'#765740',x,.18,-1.5,1.1,.12);lantern(environment,x,1.7,-1.5);pole(environment,'#765740',x,1,-1.5,2,.065);}
   house(-4,-4.5,1.1);house(4,-4.7,1.2);house(1,-5,.75);
   boat=group(1.2,.08,-2.8);ball(boat,'#805d40',0,0,0,1.6,.35,.6);block(boat,'#bc9661',0,.2,0,2.4,.12,.8);pole(boat,'#74583d',0,1.2,0,2.4,.055);const sail=block(boat,'#f7e4bd',.5,1.5,0,.92,1.25,.06);sail.rotation.y=-.15;
   for(let n=0;n<3;n++){const g=group(-3.2+n*.63,0,.6);block(g,'#ad8054',0,.4,0,.56,.7,.62);for(const y of [.16,.62])block(g,'#dbc297',0,y,.32,.6,.06,.05,.01);cargo.push(g);}
   const stall=group(4,0,2.2);block(stall,'#8d6745',0,.5,0,1.8,1,.7);for(const x of [-.85,.85])pole(stall,'#84603e',x,1,0,2,.055);block(stall,'#bc7852',0,2,0,2,.15,1.1);for(let n=0;n<6;n++)ball(stall,'#af5940',-.6+n*.23,1.1,0,.13,.13,.13);
   for(let n=0;n<10;n++){const wave=block(environment,'#b0d1bc',-6+n*1.3,.11,-2.3-(n%3)*.7,.7,.02,.035,.005);wave.castShadow=false;}
  }else if(id==='canyon'){
   block(environment,'#d5ab79',0,.02,1.7,14,.13,2.9);
   block(environment,'#6d9e95',0,.01,-1.1,2.3,.12,11);
   for(const side of [-1,1])for(let i=0;i<5;i++){
    const g=group(side*(4.2+(i%2)*.65),0,-4+i*1.7);const height=2.4+(i%3)*.7;
    block(g,i%2?'#b46e49':'#c58b5d',0,height/2,0,2.7,height,2,.24);
    block(g,'#d8a673',0,height+.08,0,2.8,.25,2.1,.1);
    block(g,'#97613f',0,.65,0,2.85,.16,2.07,.02);
   }
   block(environment,'#d6bf91',0,.16,1.6,4,.25,2.5);for(const z of [.3,2.9]){block(environment,'#9a7350',0,.55,z,4.2,.28,.18);for(const x of [-1.8,0,1.8])block(environment,'#aa8560',x,.35,z,.2,.65,.22);}
   for(const x of [-2.2,2.2]){pole(environment,'#7a6048',x,.8,2.1,1.6,.06);lantern(environment,x,1.6,2.1);}
   for(let i=0;i<7;i++)ball(environment,'#b99a76',-3+i,.08,3.8,.26,.12,.2);
  }else if(id==='academy'){
   block(environment,'#d3d1b8',0,.02,1,12,.12,8);
   for(let x=-5;x<=5;x++)for(let z=-2;z<=4;z++)block(environment,(x+z)%2?'#bec3b0':'#c9cbb6',x,.1,z,.94,.07,.94,.025);
   house(0,-4,1.7);house(-4,-2,.8);house(4,-2,.8);
   for(const side of [-1,1]){
    const shelf=group(side*4.8,0,1);block(shelf,'#795e43',0,1,0,1.4,2,.5);for(const y of [.2,.8,1.4]){block(shelf,'#c8ac7a',0,y,.1,1.55,.1,.65);for(let i=0;i<5;i++)block(shelf,['#788d79','#d9bd83','#ae7952'][i%3],-.5+i*.24,y+.25,.15,.17,.4,.29,.02);}
    lantern(environment,side*2.2,1.6,-1.3);pole(environment,'#7f6141',side*2.2,.8,-1.3,1.6,.07);
   }
   block(environment,'#a7baad',0,.14,-.7,2.5,.25,1.2);block(environment,'#78a99e',0,.28,-.7,2.2,.04,.95);tree(-5,3,.85);tree(5,3,.85);
  }else if(id==='snow'){
   block(environment,'#a3c4cb',0,.01,-1,15,.13,3.2);block(environment,'#eff0df',0,.14,1.8,12,.22,2.5);
   for(const side of [-1,1])for(let i=0;i<6;i++){
    const x=side*(3.2+(i%2)*1.6),z=-5+i*1.4,h=1.5+(i%3)*.4;pole(environment,'#7c7867',x,.4,z,.8,.1);
    mesh(environment,new T.ConeGeometry(.85,h,8),'#698d83',x,h/2+.5,z);mesh(environment,new T.ConeGeometry(.82,h*.77,8),'#eff2e7',x,h*.64+.6,z);
   }
   for(let i=0;i<6;i++)block(environment,'#afc7c4',-2.5+i,.29,1.8,.91,.08,2.3,.06);
   for(const x of [-3,3]){pole(environment,'#7e8678',x,.7,2.8,1.4,.07);lantern(environment,x,1.4,2.8);}
   for(let i=0;i<7;i++)ball(environment,'#f2f3e8',-6+i*2,.16,3.8,.6,.25,.5);
  }else if(id==='city'){
   block(environment,'#a3a896',0,.02,2,12,.12,5);for(let i=0;i<10;i++)block(environment,'#bcc0a9',-4.5+i,.1,2,.9,.06,1.3,.025);
   for(const side of [-1,1]){
    block(environment,'#87978d',side*3,1.35,-2,3.6,2.7,1.4,.12);
    block(environment,'#a7b09a',side*1.4,1.65,-1.9,.8,3.3,1.6,.1);
    for(let i=0;i<4;i++)block(environment,'#b5baa1',side*(2+i*.7),2.9,-2,.45,.45,1.4,.05);
    for(let i=0;i<3;i++)block(environment,'#667d73',side*(2+i*.8),.3+i*.4,-1.25,.46,.16,.05,.02);
    lantern(environment,side*1.4,1.5,-.99);
   }
   block(environment,'#b2b59b',0,3.25,-2,3.7,.55,1.65,.12);
   for(const [x,z]of [[-5,1],[5,.2],[-4,3.4],[4,3.8]]){const column=group(x,0,z);block(column,'#a1ad98',0,.55,0,.6,1.1,.65);block(column,'#c2c5aa',0,1.12,0,.8,.17,.82);ball(column,'#758a72',0,.1,.5,.6,.15,.4);}
  }else if(id==='homecoming'){
   block(environment,'#79a499',-4,.01,0,1.2,.13,11);block(environment,'#baa77b',0,.02,2,12,.13,3);
   house(-3.1,-3,1.25);house(2.5,-3.4,1.25);house(5,-1.2,.8);tree(-5,3,.8);tree(5,3,.8);
   for(const x of [-1.5,1.5])block(environment,'#785f47',x,1.15,-1,.2,2.3,.3);
   block(environment,'#b99a65',0,2.35,-1,3.6,.28,.5);
   for(let i=0;i<9;i++){const x=-5+i*1.25,y=2.7-Math.sin(i/8*Math.PI)*.7;lantern(environment,x,y,.8);const light=new T.PointLight('#ffc66d',1.8,3);light.position.set(x,y,.8);environment.add(light);}
   for(const side of [-1,1]){block(environment,'#a8774b',side*3.5,.45,2.8,1.8,.9,.9);for(let i=0;i<4;i++)ball(environment,'#e6b766',side*3.5-.6+i*.4,1,2.8,.15,.15,.15);lantern(environment,side*3.5,1.8,2.8);}
   const glow=new T.PointLight('#ffdb9a',5,10);glow.position.set(0,3,2);environment.add(glow);
  }
  setProgress(progress);
 }
 function setProgress(value){progress=value;gate.forEach((g,i)=>g.rotation.y=value>=1?(i?-1:1)*1.15:0);signs.forEach((s,i)=>{s.rotation.z=value>i/3?0:.25;s.material=mat(value>i/3?'#e0c88e':'#b9a477');});cargo.forEach((g,i)=>{g.position.x=value>=1?2.4+(i-1)*.45:-3.2+i*.63;g.position.y=value>=1?.35:0;g.position.z=value>=1?-2.8:.6;});if(boat)boat.position.x=value>=1?2.4:1.2;}
 let walkingProgress=null,encounterVisible=null;
 function travel(value){walkingProgress=value;hero.group.position.set(-4+value*2.75,0,1.55);hero.group.rotation.y=value<1?1.1:.5;creature.group.visible=encounterVisible??value>.85;gate.forEach((g,i)=>g.rotation.y=(i?-1:1)*1.15);}
 function setOpponent(kind){if(!kind)return;scene.remove(creature.group);creature.group.traverse(n=>n.geometry?.dispose());creature=soften(createFighter(kind));scene.add(creature.group);creature.group.position.set(1.8,0,1.3);creature.group.rotation.y=-.65;creature.group.scale.setScalar(kind==='guardian'?.82:.64);}
 function resize(){const w=canvas.clientWidth,h=canvas.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);const aspect=w/h,halfW=Math.max(5.4,4*aspect),halfH=halfW/aspect;Object.assign(camera,{left:-halfW,right:halfW,top:halfH,bottom:-halfH});camera.position.set(0,6.8,12);camera.lookAt(0,.7,0);camera.updateProjectionMatrix();renderer.render(scene,camera);}
 const observer=new ResizeObserver(resize);observer.observe(canvas);setStation(station);resize();
 function draw(now=0){if(destroyed)return;const t=now/1000,age=t-eventAt;poseFighter(hero,age<1?eventKind:'idle',age,t,reduced());if(walkingProgress>0&&walkingProgress<1&&!reduced()){const swing=Math.sin(t*11)*.5;hero.joints.legL.rotation.x=swing;hero.joints.legR.rotation.x=-swing;hero.joints.armL.rotation.x=-swing;hero.joints.armR.rotation.x=swing;hero.root.position.y=Math.abs(Math.sin(t*11))*.045;}poseFighter(creature,current==='bamboo'&&age<1&&eventKind==='attack'?'hit':'idle',age,t+.4,reduced());if(boat&&!reduced())boat.position.y=.08+Math.sin(t)*.025;renderer.render(scene,camera);}
 function animate(now){if(destroyed)return;if(now-last>50&&!document.hidden&&canvas.getClientRects().length){draw(now);last=now;}requestAnimationFrame(animate);}requestAnimationFrame(animate);
 return {setStation,setOpponent,travel,setProgress,draw,resize,showEncounter(value){encounterVisible=value;creature.group.visible=value;},snapshot:()=>({station:current,opponent:creature.kind,opponentVisible:creature.group.visible,heroX:hero.group.position.x}),showActors(value){hero.group.visible=creature.group.visible=value;},react(correct){eventAt=performance.now()/1000;eventKind=correct?'attack':'hit';},dispose(){destroyed=true;observer.disconnect();clearEnvironment();hero.group.traverse(n=>n.geometry?.dispose());creature.group.traverse(n=>n.geometry?.dispose());materials.forEach(m=>m.dispose());renderer.dispose();}};
}
