import * as T from 'three';
export const PANDA_ART='/original/art/red-panda/portrait.webp';
const mat=(color,extra={})=>new T.MeshStandardMaterial({color,roughness:.78,...extra});
const orange=mat('#ba5935'),rust=mat('#873b28'),cream=mat('#f8e4bc'),brown=mat('#352722'),pink=mat('#b36e59'),jade=mat('#24665f'),gold=mat('#cba75b',{metalness:.5,roughness:.35}),black=mat('#181c19',{roughness:.24}),amber=mat('#c18b39',{roughness:.24}),paper=mat('#ffe4a0',{emissive:'#ffae42',emissiveIntensity:.65});
function mesh(p,g,m,pos=[0,0,0],scale=[1,1,1]){const n=new T.Mesh(g,m);n.position.set(...pos);n.scale.set(...scale);n.castShadow=n.receiveShadow=true;p.add(n);return n;}
const oval=(p,m,pos,scale)=>mesh(p,new T.SphereGeometry(1,32,24),m,pos,scale);
const joint=(p,name,pos)=>{const n=new T.Group();n.name=name;n.position.set(...pos);p.add(n);return n;};
const line=(p,pts,r,m)=>mesh(p,new T.TubeGeometry(new T.CatmullRomCurve3(pts.map(v=>new T.Vector3(...v))),20,r,6,false),m);
// All surfaces are authored volumes. No character images, texture atlas or UV frame selection.
export function createLanternPanda(actor){
 const j=actor.joints;actor.isPanda=true;actor.ready=Promise.resolve();
 const body=j.body=joint(actor.root,'panda-torso',[0,.95,0]);
 oval(body,brown,[0,-.02,0],[.29,.41,.23]);
 const head=j.head=joint(body,'panda-head',[0,.57,.015]);
 oval(head,orange,[0,0,0],[.43,.36,.32]);
 for(const s of [-1,1]){
  const side=s<0?'L':'R';const ear=j['ear'+side]=joint(head,'rounded-ear-'+side,[s*.32,.27,-.045]);
  oval(ear,cream,[0,0,0],[.145,.15,.085]);oval(ear,rust,[0,-.005,.061],[.102,.11,.035]);oval(ear,pink,[0,-.015,.082],[.06,.065,.012]);
  oval(head,cream,[s*.295,-.105,.16],[.19,.16,.165]);
  const patch=oval(head,cream,[s*.185,.055,.266],[.13,.165,.063]);patch.rotation.z=-s*.3;
  const eye=j['eye'+side]=joint(head,'eye-'+side,[s*.18,.035,.319]);eye.rotation.y=s*.25;
  oval(eye,brown,[0,0,0],[.075,.087,.025]);oval(eye,amber,[0,-.003,.022],[.05,.064,.013]);oval(eye,black,[0,0,.032],[.028,.05,.009]);oval(eye,cream,[-.018,.026,.04],[.016,.019,.006]);
  line(head,[[s*.10,.17,.278],[s*.19,.19,.27],[s*.25,.15,.255]],.012,rust);
  // Sculpted cheek fur follows the face, instead of disconnected pointed ears.
  for(let k=0;k<3;k++){const tuft=oval(head,cream,[s*(.35+k*.018),-.09-k*.045,.13],[.092,.032,.065]);tuft.rotation.z=s*(.2+k*.12);}
 }
 oval(head,cream,[0,-.12,.30],[.18,.10,.105]);oval(head,black,[0,-.077,.397],[.062,.038,.027]);
 line(head,[[0,-.10,.396],[0,-.145,.395],[-.048,-.16,.377]],.006,brown);line(head,[[0,-.145,.395],[.048,-.16,.377]],.006,brown);
 // Tail is a single continuous curved ringed volume, with a movable base.
 j.tail=joint(body,'ringed-tail',[0,-.20,-.18]);
 const curve=new T.CatmullRomCurve3([[0,0,0],[-.32,-.22,-.24],[-.65,-.12,-.35],[-.78,.20,-.32],[-.65,.45,-.24]].map(v=>new T.Vector3(...v)));
 const g=new T.TubeGeometry(curve,64,.16,16,false),colors=[];
 for(let i=0;i<g.attributes.position.count;i++){const t=Math.floor(i/17)/64;const c=new T.Color(Math.floor(t*9)%2?'#783922':'#c97745');colors.push(c.r,c.g,c.b);const v=new T.Vector3().fromBufferAttribute(g.attributes.position,i),center=curve.getPointAt(t);v.sub(center).multiplyScalar(.35+.65*Math.sin(Math.PI*(.08+t*.87))).add(center);g.attributes.position.setXYZ(i,v.x,v.y,v.z);}
 g.setAttribute('color',new T.Float32BufferAttribute(colors,3));g.computeVertexNormals();mesh(j.tail,g,mat('#ffffff',{vertexColors:true}));oval(j.tail,rust,[-.65,.45,-.24],[.07,.07,.07]);
 // Tailored shoulder cape: a curved cloth surface with hem and embroidery.
 j.cape=joint(body,'embroidered-cape',[0,.30,0]);
 const points=[];for(let i=0;i<=24;i++){const a=i/24*Math.PI*2;points.push(new T.Vector2(.30+.045*Math.cos(a*4),.0));}
 const capeGeo=new T.LatheGeometry([new T.Vector2(.23,.05),new T.Vector2(.32,-.05),new T.Vector2(.36,-.23),new T.Vector2(.33,-.40)],48);mesh(j.cape,capeGeo,mat('#24665f',{side:T.DoubleSide}),[0,0,0],[1,1,.85]);
 for(const y of [-.08,-.38]){const ring=mesh(j.cape,new T.TorusGeometry(y===-.08?.33:.335,.008,6,64),gold,[0,y,0],[1,.85,1]);ring.rotation.x=Math.PI/2;}
 for(const s of [-1,1])for(let k=0;k<3;k++)line(j.cape,[[s*(.09+k*.06),-.14,.272],[s*(.13+k*.06),-.21,.285],[s*(.10+k*.06),-.28,.28]],.005,gold);
 oval(body,gold,[0,.28,.276],[.073,.078,.022]);oval(body,jade,[0,.28,.297],[.047,.052,.015]);
 for(const [side,s]of [['L',-1],['R',1]]){
  const arm=j['arm'+side]=joint(body,'shoulder-'+side,[s*.27,.18,0]);oval(arm,orange,[s*.025,-.12,0],[.108,.19,.11]);
  const fore=j['fore'+side]=joint(arm,'elbow-'+side,[s*.025,-.24,.015]);oval(fore,brown,[0,-.09,0],[.092,.15,.095]);
  const hand=j['hand'+side]=joint(fore,'paw-'+side,[0,-.19,.03]);oval(hand,brown,[0,0,.015],[.10,.085,.11]);
  for(let k=0;k<2;k++)line(hand,[[(k-.5)*.045,-.025,.11],[(k-.5)*.045,.012,.12]],.004,rust);
  const leg=j['leg'+side]=joint(actor.root,'hip-'+side,[s*.16,.64,0]);oval(leg,brown,[0,-.14,0],[.13,.22,.13]);
  const knee=j['knee'+side]=joint(leg,'knee-'+side,[0,-.27,0]);oval(knee,brown,[0,-.10,.015],[.09,.15,.105]);oval(knee,brown,[0,-.24,.075],[.13,.075,.18]);
 }
 j.lantern=joint(j.handR,'hanging-lantern',[0,-.045,0]);
 mesh(j.lantern,new T.TorusGeometry(.095,.011,8,32),gold,[0,-.09,0]);oval(j.lantern,paper,[0,-.32,0],[.135,.17,.135]);
 for(const y of [-.16,-.48]){const r=mesh(j.lantern,new T.TorusGeometry(.085,.014,8,32),gold,[0,y,0]);r.rotation.x=Math.PI/2;}
 for(let k=0;k<8;k++){const a=k*Math.PI/4;line(j.lantern,[[Math.cos(a)*.08,-.16,Math.sin(a)*.08],[Math.cos(a)*.138,-.32,Math.sin(a)*.138],[Math.cos(a)*.08,-.48,Math.sin(a)*.08]],.005,gold);}
 line(j.lantern,[[0,-.49,0],[0,-.59,0]],.009,jade);for(let k=-2;k<=2;k++)line(j.lantern,[[0,-.58,0],[k*.009,-.68,0]],.004,jade);
 poseLanternPanda(actor);return actor;
}
export function poseLanternPanda(actor,action='idle',progress=0,time=0,reduced=false){
 const j=actor.joints,p=Math.max(0,Math.min(1,progress));actor.root.position.set(0,0,0);actor.root.rotation.set(0,0,0);
 Object.values(j).forEach(n=>n.rotation.set(0,0,0));j.eyeL.rotation.y=-.25;j.eyeR.rotation.y=.25;j.eyeL.scale.y=j.eyeR.scale.y=1;
 j.body.position.y=.95;j.armL.rotation.z=-.12;j.armR.rotation.z=.28;j.armR.rotation.x=-.75;j.foreR.rotation.x=-.3;
 if(reduced)return;
 const wave=Math.sin(time*2.2);j.body.position.y+=wave*.012;j.head.rotation.z=Math.sin(time*1.3)*.025;j.tail.rotation.y=Math.sin(time*1.6)*.14;j.cape.rotation.x=wave*.025;j.lantern.rotation.z=Math.sin(time*2)*.09;
 const blink=time%5.3;j.eyeL.scale.y=j.eyeR.scale.y=blink>5?1-Math.sin((blink-5)/.3*Math.PI)*.94:1;
 if(p>=1||action==='idle')return;
 const pulse=Math.sin(Math.PI*p),strike=Math.exp(-Math.pow((p-.5)/.17,2));
 if(action==='attack'){actor.root.position.z=strike*.35;j.body.rotation.y=Math.sin(p*Math.PI*2)*-.28;j.head.rotation.y=-j.body.rotation.y*.4;j.armL.rotation.x=-pulse*1.7;j.foreL.rotation.x=-pulse*.6;j.armR.rotation.x-=pulse*.4;j.legL.rotation.x=-strike*.28;j.kneeL.rotation.x=strike*.28;j.legR.rotation.x=strike*.20;j.tail.rotation.y+=pulse*.32;j.lantern.rotation.x=pulse*.25;}
 if(action==='hit'){actor.root.position.z=-pulse*.18;j.body.rotation.x=-pulse*.22;j.head.rotation.x=-pulse*.16;j.earL.rotation.z=pulse*.22;j.earR.rotation.z=-pulse*.22;j.armL.rotation.x=-pulse*.5;}
 if(action==='guard'){j.armL.rotation.x=-pulse*1.8;j.foreL.rotation.x=-pulse*.7;j.body.rotation.x=pulse*.08;j.kneeL.rotation.x=pulse*.2;}
 if(action==='heal'){j.armR.rotation.x-=pulse*.9;j.foreR.rotation.x-=pulse*.3;j.head.rotation.x=-pulse*.12;actor.root.position.y=pulse*.06;}
}
