// Sculpted ornament stays attached to the existing articulated joints.
// Curved silhouettes and layered surfaces replace the prototype's plain shapes.
import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
export function texturePalette(p){
 const size=256;
 function texture(type){const data=new Uint8Array(size*size*4);for(let y=0;y<size;y++)for(let x=0;x<size;x++){
  const grain=Math.sin(x*127.1+y*311.7)*43758.5453,noise=grain-Math.floor(grain);
  const wave=Math.sin(x*.062+Math.sin(y*.037)*2+Math.sin((x+y)*.019)*3);
  let v=type==='jade'?205+25*wave+15*noise:type==='cloth'?225+((x%3===0||y%3===0)?-20:8)+noise*10:225+noise*28;
  if(type==='jade'&&Math.abs(Math.sin(x*.053+y*.023+Math.sin(y*.035)*2))<.035)v=135;
  const i=(y*size+x)*4;data[i]=data[i+1]=data[i+2]=v;data[i+3]=255;
 }const t=new T.DataTexture(data,size,size);t.wrapS=t.wrapT=T.RepeatWrapping;t.needsUpdate=true;return t;}
 const jade=texture('jade'),cloth=texture('cloth'),metal=texture('metal');
 for(const key of ['jade','jadeLight','jadeDark']){p[key].map=jade;p[key].bumpMap=jade;p[key].bumpScale=.012;}
 for(const key of ['teal','navy','cloth']){p[key].map=cloth;p[key].bumpMap=cloth;p[key].bumpScale=.006;}
 for(const key of ['gold','goldLight']){p[key].roughnessMap=metal;p[key].bumpMap=metal;p[key].bumpScale=.003;}
}
export function refineFighter(actor, p){
 const {kind,joints:j}=actor;
 const mesh=(parent,g,m,pos=[0,0,0],scale=[1,1,1])=>{const n=new T.Mesh(g,m);n.position.set(...pos);n.scale.set(...scale);n.castShadow=n.receiveShadow=true;parent.add(n);return n;};
 const ball=(parent,r,m,pos,scale)=>mesh(parent,new T.SphereGeometry(r,24,16),m,pos,scale);
 const curve=(parent,points,r,m)=>mesh(parent,new T.TubeGeometry(new T.CatmullRomCurve3(points.map(a=>new T.Vector3(...a))),24,r,6,false),m);
 const swirl=(parent,x,y,z,r,m,turns=1.4)=>{const pts=[];for(let i=0;i<=30;i++){const t=i/30,a=t*Math.PI*2*turns;pts.push([x+Math.cos(a)*r*(1-t*.82),y+Math.sin(a)*r*(1-t*.82),z+Math.sin(t*Math.PI)*.012]);}curve(parent,pts,.009,m);};
 const leaf=(parent,x,y,z,s,m)=>{const shape=new T.Shape();shape.moveTo(0,0);shape.bezierCurveTo(-.5,.4,-.35,.8,0,1);shape.bezierCurveTo(.35,.8,.5,.4,0,0);const n=mesh(parent,new T.ExtrudeGeometry(shape,{depth:.018,bevelEnabled:true,bevelSize:.012,bevelThickness:.008,bevelSegments:2}),m,[x,y,z],[s,s,s]);return n;};
 if(kind==='hero'){
  // Mature face proportions: tapered jaw, cheek planes, eyelids and swept hair.
  const head=j.head;head.scale.set(.76,.91,.82);head.position.y=.99;
  ball(head,.15,p.skin,[0,-.10,.01],[.87,.85,.83]);
  curve(head,[[-.065,-.105,.191],[0,-.11,.204],[.065,-.105,.190]],.005,p.boot);
  for(const s of [-1,1]){
   ball(head,.047,p.skin,[s*.20,-.005,-.005],[.38,1,.6]);
   curve(head,[[s*.045,.033,.205],[s*.09,.045,.207],[s*.123,.03,.187]],.009,p.hair);
   curve(head,[[s*.02,.20,.17],[s*.10,.22,.19],[s*.19,.11,.13],[s*.18,-.06,.03]],.033,p.hair);
   for(let i=0;i<4;i++)curve(head,[[s*.025,.24,-.02],[s*(.10+i*.026),.20,.035],[s*(.17+i*.01),.08,-.05]],.014,p.hair);
  }
  for(let i=0;i<5;i++)curve(j.tail,[[i*.018-.04,.03,0],[i*.025-.05,-.12,-.23],[i*.028-.05,-.38,-.30],[i*.02-.04,-.46,-.20]],.024,p.hair);
  curve(head,[[-.16,.25,-.05],[0,.32,-.1],[.16,.27,-.06]],.018,p.gold);
  // Draped mustard scarf, embroidered lapels, layered sleeves and robe hems.
  const scarfMat=new T.MeshStandardMaterial({color:'#bc8736',roughness:.85});
  curve(j.body,[[-.2,.76,.12],[-.1,.70,.23],[.10,.73,.23],[.23,.79,.06]],.07,scarfMat);
  for(const s of [-1,1]){
   curve(j.cape,[[s*.1,.03,-.02],[s*.35,-.15,-.08],[s*.52,-.40,-.04],[s*.67,-.48,.08]],.075,scarfMat);
   const arm=j['arm'+(s<0?'L':'R')],fore=j['fore'+(s<0?'L':'R')];
   ball(arm,.15,p.teal,[s*.01,-.17,0],[1.02,1.6,.96]);
   for(const y of [-.09,-.22])curve(arm,[[s*.12,y,-.03],[s*.14,y-.035,.06],[s*.09,y-.05,.12]],.009,p.gold);
   const cuff=mesh(fore,new T.CylinderGeometry(.13,.17,.16,24),p.cloth,[0,-.23,0]);
   mesh(fore,new T.CylinderGeometry(.134,.14,.035,24),p.gold,[0,-.31,0]);
   for(let k=0;k<3;k++)swirl(fore,(k-1)*.065,-.21,.14,.035,p.gold);
   // Gold boots and distinct fingers, rather than a spherical mitten.
   const hand=j['hand'+(s<0?'L':'R')];
   for(let k=0;k<4;k++)ball(hand,.022,p.skin,[(k-1.5)*.034,-.09,.068],[.7,1.7,.8]);
   curve(j['knee'+(s<0?'L':'R')],[[-.1,-.10,.10],[0,-.06,.145],[.1,-.1,.1]],.018,p.gold);
  }
  for(let i=0;i<8;i++){
   const panel=j['robe'+i],a=i*Math.PI/4;
   const surface=new T.BufferGeometry(),verts=[],uv=[],ids=[];
   for(let row=0;row<=8;row++)for(let col=0;col<=6;col++){
    const v=row/8,u=col/6,theta=a+(u-.5)*.70,r=.30+v*.19+Math.sin(u*Math.PI*4)*.012;
    verts.push(Math.sin(theta)*r,-v*.68,Math.cos(theta)*r);uv.push(u,v);
   }
   for(let r=0;r<8;r++)for(let c=0;c<6;c++){const n=r*7+c;ids.push(n,n+7,n+1,n+1,n+7,n+8);}
   surface.setAttribute('position',new T.Float32BufferAttribute(verts,3));surface.setAttribute('uv',new T.Float32BufferAttribute(uv,2));surface.setIndex(ids);surface.computeVertexNormals();
   // Replace the original angular open cylinder panel.
   const old=panel.children[0];panel.remove(old);old.geometry.dispose();
   mesh(panel,surface,i%2?p.teal:p.navy);
   const ornament=new T.Group();ornament.rotation.y=a;panel.add(ornament);
   curve(ornament,[[-.07,-.05,.303],[-.11,-.35,.40],[-.14,-.66,.48]],.009,p.gold);
   curve(ornament,[[.07,-.05,.303],[.11,-.35,.40],[.14,-.66,.48]],.009,p.gold);
   for(let k=0;k<3;k++){const y=-.30-k*.12,z=.37+k*.035;swirl(ornament,0,y,z,.046,p.gold);leaf(ornament,.035,y-.035,z,.07,p.gold);}
  }
  // Waist knot, pendants and travelling pouch from the painted reference.
  for(const s of [-1,1])curve(j.body,[[0,.03,.29],[s*.16,.08,.31],[s*.23,-.03,.28],[s*.08,-.07,.30],[0,.03,.29]],.022,p.gold);
  ball(j.body,.13,p.boot,[-.28,-.08,.15],[.85,1.15,.7]);
  for(const s of [-1,1]){curve(j.body,[[s*.05,-.02,.30],[s*.12,-.22,.34],[s*.1,-.40,.35]],.017,p.gold);ball(j.body,.04,p.gold,[s*.1,-.42,.35]);}
 }else if(kind==='guardian'){
  const head=j.head;head.scale.set(1.08,1.03,1.03);
  // Lion muzzle, broad nose, cheek curls, curled brow and swept antlers.
  ball(head,.12,p.jadeDark,[0,-.045,.49],[1.1,.65,.55]);
  for(const s of [-1,1]){
   ball(head,.13,p.jade,[s*.13,-.12,.43],[1,.65,.6]);
   curve(head,[[s*.06,.12,.35],[s*.18,.22,.33],[s*.31,.15,.23]],.045,p.gold);
   curve(head,[[s*.24,.25,-.08],[s*.37,.44,-.1],[s*.36,.57,-.16],[s*.26,.66,-.16]],.045,p.gold);
   for(let k=0;k<4;k++){
    const curl=new T.Group();curl.position.set(s*(.24+(k%2)*.065),.15-Math.floor(k/2)*.18,.12);curl.rotation.y=s*.65;head.add(curl);
    ball(curl,.12,p.jade,[0,0,0],[1,1,.65]);swirl(curl,0,0,.085,.087,p.jadeLight);
   }
   ball(head,.10,p.jade,[s*.30,.21,-.01],[1,1,.6]);
  }
  for(let i=0;i<3;i++)leaf(head,(i-1)*.11,.27,.13,.20,p.gold);
  // Cloud relief on chest, scalloped shoulders, plated forearms and shin guards.
  for(const s of [-1,1]){
   for(let k=0;k<3;k++)swirl(j.body,s*(.21+k*.06),.56-k*.12,.37,.072,p.jadeLight);
   const arm=j['arm'+(s<0?'L':'R')],fore=j['fore'+(s<0?'L':'R')],hand=j['hand'+(s<0?'L':'R')];
   ball(arm,.29,p.jade,[s*.015,0,.02],[1.12,.62,1.08]);
   const rim=mesh(arm,new T.TorusGeometry(.27,.025,8,40),p.gold,[s*.015,.015,.04],[1.12,.65,1]);rim.rotation.x=.65;
   swirl(arm,0,.05,.28,.11,p.gold);
   for(let k=0;k<3;k++){
    const y=-.11-k*.09;ball(fore,.205,p.jade,[0,y,.015],[1,.45,1.03]);
    curve(fore,[[-.17,y,.12],[0,y-.04,.21],[.17,y,.12]],.018,p.gold);
   }
   for(let k=0;k<4;k++){
    const x=(k-1.5)*.105;ball(hand,.065,p.jade,[x,-.14,.18],[.72,1.4,.8]);
    curve(hand,[[x-.025,-.13,.22],[x,-.1,.24],[x+.025,-.13,.22]],.008,p.goldLight);
   }
   const shin=j['knee'+(s<0?'L':'R')];ball(shin,.205,p.jade,[0,-.15,.08],[.95,1.15,.75]);
   curve(shin,[[-.17,-.28,.17],[0,-.32,.24],[.17,-.28,.17]],.022,p.gold);swirl(shin,0,-.13,.245,.10,p.gold);
   leaf(j.body,s*.24,-.10,.29,.3,p.gold);
  }
  // Ceremonial arch rises behind the lion head, as in the original jade guardian.
  const halo=new T.Group();halo.position.set(0,.8,-.28);j.body.add(halo);
  const arc=[];for(let i=0;i<=40;i++){const a=-.2+i/40*Math.PI*1.4;arc.push([Math.cos(a)*.57,Math.sin(a)*.57,0]);}
  curve(halo,arc,.047,p.gold);curve(halo,arc.map(([x,y,z])=>[x*.85,y*.85,z]),.018,p.goldLight);
  for(let i=0;i<9;i++){const a=i/8*Math.PI;leaf(halo,Math.cos(a)*.57,Math.sin(a)*.57,0,.16,p.gold);}
  for(const s of [-1,1]){curve(j.body,[[s*.32,.12,.25],[s*.42,-.15,.22],[s*.38,-.38,.23]],.02,p.gold);for(let k=0;k<5;k++)curve(j.body,[[s*.38+(k-2)*.012,-.38,.23],[s*.39+(k-2)*.016,-.60,.23]],.009,p.teal);}
 }else if(kind==='moth'){
  for(const [side,s] of [['L',-1],['R',1]]){const wing=j['wing'+side];
   for(let k=0;k<7;k++){const a=k/6*1.5;curve(wing,[[s*.06,0,.09],[s*.4,.2*Math.sin(a),.10],[s*(.55+.43*Math.sin(a)),.15+.65*Math.cos(a),.085]],.008,p.goldLight);}
   for(const y of [.55,-.38]){ball(wing,.14,p.jadeDark,[s*(y>0?.77:.79),y,.08],[1,.8,.15]);swirl(wing,s*.79,y,.12,.11,p.gold);ball(wing,.035,p.light,[s*.79,y,.13]);}
  }
 }else if(kind==='sentinel'){
  for(const s of [-1,1]){
   for(let k=0;k<3;k++)leaf(j.head,s*.22,.1+k*.13,.15,.18,p.gold);
   const fore=j['fore'+(s<0?'L':'R')];for(let k=0;k<3;k++)swirl(fore,(k-1)*.09,-.15,.18,.045,p.gold);
  }
 }
 // Batch static siblings per material, without merging any animated joint.
 function batch(parent){for(const child of [...parent.children])if(!child.isMesh)batch(child);
  const groups=new Map();for(const n of [...parent.children])if(n.isMesh&&!Array.isArray(n.material)){n.updateMatrix();const source=n.geometry.index?n.geometry.toNonIndexed():n.geometry.clone();const g=source.applyMatrix4(n.matrix);const key=n.material;if(!groups.has(key))groups.set(key,[]);groups.get(key).push({n,g});}
  for(const [material,items]of groups)if(items.length>1){const geometry=mergeGeometries(items.map(x=>x.g),false);if(geometry){for(const {n}of items){parent.remove(n);n.geometry.dispose();}mesh(parent,geometry,material);}for(const {g}of items)g.dispose();}else items[0].g.dispose();
 }
 batch(actor.root);
 return actor;
}
