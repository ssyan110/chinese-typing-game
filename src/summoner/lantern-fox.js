import * as T from 'three';

// A purpose-built animal silhouette; no humanoid face, clothing or staff rig.
const material=(color,roughness=.75,extra={})=>new T.MeshStandardMaterial({color,roughness,...extra});
const fur=material('#f4e8d3'),white=material('#fff8e9'),warm=material('#d7b98d'),earPink=material('#cf9585');
const teal=material('#287c73'),dark=material('#123b3a'),iris=material('#46b9a3',.3),ink=material('#202c30',.32);
const gold=material('#cda255',.38,{metalness:.55}),glow=material('#ffe7a0',.35,{emissive:'#ffa431',emissiveIntensity:.8});
const mesh=(parent,geo,mat,pos=[0,0,0],scale=[1,1,1])=>{const n=new T.Mesh(geo,mat);n.position.set(...pos);n.scale.set(...scale);n.castShadow=n.receiveShadow=true;parent.add(n);return n;};
const ellipsoid=(p,r,m,pos,scale=[1,1,1])=>mesh(p,new T.SphereGeometry(r,32,24),m,pos,scale);
const joint=(p,name,pos)=>{const n=new T.Group();n.name=name;n.position.set(...pos);p.add(n);return n;};
const tube=(p,points,r,m)=>mesh(p,new T.TubeGeometry(new T.CatmullRomCurve3(points.map(v=>new T.Vector3(...v))),32,r,8,false),m);
function ear(parent,side){
 const pivot=joint(parent,'ear',[side*.29,.25,-.035]);pivot.rotation.z=-side*.22;
 const shape=new T.Shape();shape.moveTo(-.21,-.05);shape.bezierCurveTo(-.23,.10,-.14,.31,0,.48);shape.bezierCurveTo(.14,.31,.25,.08,.21,-.05);shape.quadraticCurveTo(0,-.14,-.21,-.05);
 const outer=mesh(pivot,new T.ExtrudeGeometry(shape,{depth:.085,bevelEnabled:true,bevelThickness:.045,bevelSize:.038,bevelSegments:4,curveSegments:20}),fur,[0,0,-.04]);
 mesh(pivot,new T.ShapeGeometry(shape,24),earPink,[0,.045,.10],[.62,.72,1]);
 tube(pivot,[[side*-.02,.12,.115],[0,.24,.116],[0,.34,.115]],.012,warm);
 return pivot;
}
function tail(parent,name,points){
 const pivot=joint(parent,name,[0,-.15,-.25]),path=new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p))),frames=path.computeFrenetFrames(40,false),v=[],norm=[],uv=[],idx=[];
 // Smooth tapered brush tail, cream body with an ivory tip.
 for(let row=0;row<=40;row++){
  const t=row/40,c=path.getPointAt(t),r=.008+Math.sin(Math.PI*Math.pow(t,.78))*.255;
  for(let col=0;col<=16;col++){const a=col/16*Math.PI*2,n=frames.normals[row].clone().multiplyScalar(Math.cos(a)).addScaledVector(frames.binormals[row],Math.sin(a));v.push(c.x+n.x*r,c.y+n.y*r,c.z+n.z*r);norm.push(n.x,n.y,n.z);uv.push(col/16,t);}
 }
 for(let row=0;row<40;row++)for(let col=0;col<16;col++){const a=row*17+col;idx.push(a,a+17,a+1,a+1,a+17,a+18);}
 const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(v,3));g.setAttribute('normal',new T.Float32BufferAttribute(norm,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setIndex(idx);g.addGroup(0,16*6*27,0);g.addGroup(16*6*27,16*6*13,1);const n=mesh(pivot,g,[warm,white]);
 return pivot;
}
export function createLanternFox(actor){
 const {root,joints:j}=actor;actor.isFox=true;
 const body=j.body=joint(root,'fox-body',[0,1.0,0]);
 ellipsoid(body,.39,fur,[0,0,0],[.92,1.22,.82]);
 ellipsoid(body,.30,white,[0,-.045,.255],[.78,1.06,.34]);
 const head=j.head=joint(body,'fox-head',[0,.67,.035]);
 ellipsoid(head,.43,fur,[0,0,0],[1.12,.91,.85]);
 // Long pointed cheek tufts and a small forward muzzle make the fox readable.
 for(const s of [-1,1]){
  const cheek=ellipsoid(head,.23,white,[s*.30,-.14,.17],[1.2,.65,.82]);cheek.rotation.z=s*.28;
  const tuft=mesh(head,new T.ConeGeometry(.12,.28,24),fur,[s*.46,-.10,.07]);tuft.rotation.z=-s*1.05;
  const eye=joint(head,'eye-'+s,[s*.195,.045,.306]);eye.rotation.y=s*.32;eye.rotation.z=-s*.13;
  ellipsoid(eye,.108,ink,[0,0,0],[1.03,1.15,.35]);
  ellipsoid(eye,.078,iris,[-s*.012,-.006,.031],[.80,1.12,.20]);
  ellipsoid(eye,.049,ink,[-s*.018,.0,.046],[.62,1.10,.15]);
  ellipsoid(eye,.025,white,[-.025,.041,.055],[1,1,.45]);ellipsoid(eye,.010,white,[.030,-.035,.05]);
  j[s<0?'eyeL':'eyeR']=eye;
  tube(head,[[s*.10,.19,.29],[s*.19,.21,.29],[s*.26,.18,.255]],.012,warm);
 }
 ellipsoid(head,.17,white,[0,-.16,.335],[1.2,.62,.95]);
 const nose=ellipsoid(head,.057,ink,[0,-.12,.483],[1,.65,.68]);nose.rotation.z=Math.PI;
 tube(head,[[0,-.15,.474],[0,-.19,.474],[-.053,-.207,.447]],.007,dark);
 tube(head,[[0,-.19,.474],[.053,-.207,.447]],.007,dark);
 const rune=mesh(head,new T.OctahedronGeometry(.060),gold,[0,.19,.351],[.6,1.3,.25]);
 j.earL=ear(head,-1);j.earR=ear(head,1);
 // Soft scarf and two loose ends; gold is reserved for small trim and the bell.
 const collar=mesh(body,new T.TorusGeometry(.265,.072,12,48),teal,[0,.39,.01],[1.14,1,.90]);collar.rotation.x=Math.PI/2;
 const scarf=j.cape=joint(body,'scarf-tail',[-.17,.37,-.13]);
 const ribbon=new T.Shape();ribbon.moveTo(-.08,0);ribbon.bezierCurveTo(-.12,-.2,-.35,-.25,-.32,-.51);ribbon.lineTo(-.23,-.47);ribbon.lineTo(-.17,-.54);ribbon.bezierCurveTo(-.15,-.30,.07,-.27,.08,0);ribbon.closePath();
 const rm=teal.clone();rm.side=T.DoubleSide;mesh(scarf,new T.ShapeGeometry(ribbon,24),rm);tube(scarf,[[-.07,-.04,.01],[-.10,-.18,.01],[-.24,-.36,.01],[-.25,-.46,.01]],.009,gold);
 ellipsoid(body,.075,gold,[0,.27,.33]);tube(body,[[-.035,.28,.383],[.035,.28,.383]],.006,dark);
 for(const [side,s]of [['L',-1],['R',1]]){
  const arm=j['arm'+side]=joint(body,'fox-arm-'+side,[s*.29,.16,.015]);
  ellipsoid(arm,.125,fur,[s*.03,-.11,.025],[.87,1.45,.9]);
  const fore=j['fore'+side]=joint(arm,'fox-wrist-'+side,[s*.015,-.25,.03]);
  ellipsoid(fore,.115,fur,[0,-.06,.03],[.9,1.15,.9]);
  const paw=j['hand'+side]=joint(fore,'fox-paw-'+side,[0,-.14,.06]);ellipsoid(paw,.12,white,[0,0,.015],[1,.8,1.1]);
  for(let k=0;k<2;k++)tube(paw,[[(k-.5)*.045,-.04,.11],[(k-.5)*.045,.0,.12]],.005,warm);
  const hip=j['leg'+side]=joint(root,'fox-hip-'+side,[s*.19,.70,.0]);
  ellipsoid(hip,.15,fur,[0,-.19,0],[1,1.65,1]);
  const knee=j['knee'+side]=joint(hip,'fox-ankle-'+side,[0,-.33,.025]);
  ellipsoid(knee,.09,fur,[0,-.13,.015],[1,1.5,1]);ellipsoid(knee,.16,white,[0,-.27,.09],[.98,.62,1.55]);
 }
 j.tail=tail(body,'fox-tail-center',[[0,0,0],[0,-.20,-.45],[.18,-.02,-.9],[.25,.40,-1.0],[.05,.78,-.88]]);
 j.tailL=tail(body,'fox-tail-left',[[-.10,0,0],[-.45,-.08,-.40],[-.77,.10,-.48],[-.87,.48,-.30],[-.78,.75,-.20]]);
 j.tailR=tail(body,'fox-tail-right',[[.10,0,0],[.45,-.08,-.40],[.79,.13,-.48],[.92,.53,-.25],[.81,.84,-.14]]);
 // Lantern hangs below the outstretched paw instead of a long human weapon.
 const lantern=j.lantern=joint(j.handR,'fox-lantern',[0,-.10,.0]);
 const handle=mesh(lantern,new T.TorusGeometry(.115,.014,8,32),gold,[0,-.10,0]);
 const glass=ellipsoid(lantern,.18,glow,[0,-.37,0],[.8,1.15,.8]);
 for(const y of [-.20,-.54]){const r=mesh(lantern,new T.TorusGeometry(.125,.018,8,32),gold,[0,y,0]);r.rotation.x=Math.PI/2;}
 for(let i=0;i<6;i++){const a=i*Math.PI/3; tube(lantern,[[Math.cos(a)*.09,-.21,Math.sin(a)*.09],[Math.cos(a)*.147,-.37,Math.sin(a)*.147],[Math.cos(a)*.09,-.54,Math.sin(a)*.09]],.009,gold);}
 tube(lantern,[[0,-.55,0],[0,-.68,0]],.012,teal);ellipsoid(lantern,.025,gold,[0,-.68,0]);
 return actor;
}
export function poseLanternFox(actor,action,p,time,reduced){
 const j=actor.joints;actor.root.position.set(0,0,0);actor.root.rotation.set(0,0,0);Object.values(j).forEach(n=>n.rotation.set(0,0,0));
 j.body.position.y=1; j.armL.rotation.z=-.13;j.armR.rotation.z=.28;j.armR.rotation.x=-.65;j.foreR.rotation.x=-.25;
 j.earL.rotation.z=.22;j.earR.rotation.z=-.22;
 j.eyeL.rotation.set(0,-.32,.13);j.eyeR.rotation.set(0,.32,-.13);j.eyeL.scale.y=j.eyeR.scale.y=1;
 if(reduced)return;
 const blink=(time%5.2);j.eyeL.scale.y=j.eyeR.scale.y=blink>4.8?1-Math.sin((blink-4.8)/.4*Math.PI)*.92:1;
 const wave=Math.sin(time*2.4);j.body.position.y=1+wave*.016;j.head.rotation.z=Math.sin(time*1.4)*.035;
 j.tail.rotation.y=Math.sin(time*1.7)*.18;j.tailL.rotation.z=Math.sin(time*2+.4)*.09;j.tailR.rotation.z=Math.sin(time*2+1.4)*.09;j.cape.rotation.x=wave*.12;
 j.lantern.rotation.z=Math.sin(time*2)*.10;
 const pulse=Math.sin(Math.PI*p),strike=Math.exp(-Math.pow((p-.48)/.17,2));
 if(action==='attack'){
  actor.root.position.z=strike*.58-Math.sin(Math.PI*Math.min(1,p/.3))*.06;actor.root.position.y=Math.sin(Math.PI*p)*.08;
  j.body.rotation.y=Math.sin(p*Math.PI*2)*-.22;j.body.rotation.x=strike*.15;
  j.armL.rotation.x=-pulse*1.7;j.foreL.rotation.x=-pulse*.4;j.armR.rotation.x=-.65-pulse*.55;j.foreR.rotation.x=-.25-pulse*.35;
  j.legL.rotation.x=-strike*.35;j.kneeL.rotation.x=strike*.35;j.legR.rotation.x=strike*.25;
  j.tail.rotation.y+=pulse*.45;j.tailL.rotation.x=-pulse*.3;j.tailR.rotation.x=-pulse*.3;j.lantern.rotation.x=pulse*.35;
 }else if(action==='hit'){
  actor.root.position.z=-pulse*.25;j.body.rotation.x=-pulse*.25;j.head.rotation.x=-pulse*.2;j.earL.rotation.z+=pulse*.45;j.earR.rotation.z-=pulse*.45;j.armL.rotation.x=-pulse*.6;j.armR.rotation.x=-.65-pulse*.3;
 }else if(action==='guard'){
  j.armL.rotation.x=-pulse*1.8;j.foreL.rotation.x=-pulse*.55;j.body.rotation.x=pulse*.1;j.kneeL.rotation.x=pulse*.3;j.tailL.rotation.y=-pulse*.5;j.tailR.rotation.y=pulse*.5;
 }else if(action==='heal'){
  j.armR.rotation.x=-.65-pulse*1.1;j.foreR.rotation.x=-.25-pulse*.35;j.head.rotation.x=-pulse*.12;actor.root.position.y=pulse*.12;
 }
}
