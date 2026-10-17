import * as T from 'three';

export const PANDA_ART='/original/art/red-panda/portrait.webp';
export const PANDA_ATLAS='/original/art/red-panda/actions.webp';
// Use the complete painted silhouettes in a 16-slot atlas; cropped source poses are excluded.
export function pandaFrame(action='idle',progress=0,time=0,reduced=false){
 if(reduced)return 0;
 const p=Math.max(0,Math.min(1,progress));
 if(action==='idle'||p>=1)return [0,1,0,2][Math.floor(time*2)%4];
 const frames={attack:[3,4,12,12,13],hit:[8,9,10],guard:[11,12,13],heal:[14,15,14]};
 const sequence=frames[action]||[0];return sequence[Math.min(sequence.length-1,Math.floor(p*sequence.length))];
}
export function createLanternPanda(actor,{heroAtlas=PANDA_ATLAS}={}){
 actor.isPanda=true;actor.frame=0;
 const material=new T.SpriteMaterial({transparent:true,depthWrite:false,toneMapped:false});
 const sprite=new T.Sprite(material);sprite.visible=false;sprite.name='painted-lantern-panda';sprite.center.set(.5,.08);sprite.scale.set(3.05,3.05,1);actor.root.add(sprite);actor.sprite=sprite;
 // Unit tests do not need a DOM or an image decoder.
 const shadow=new T.Mesh(new T.CircleGeometry(.39,32),new T.MeshBasicMaterial({color:'#071e1d',transparent:true,opacity:.22,depthWrite:false}));shadow.rotation.x=-Math.PI/2;shadow.scale.y=.7;shadow.position.y=-.035;actor.root.add(shadow);
 actor.ready=typeof document==='undefined'?Promise.resolve():new Promise((resolve,reject)=>{
  new T.TextureLoader().load(new URL(heroAtlas,document.baseURI).href,texture=>{
   texture.colorSpace=T.SRGBColorSpace;texture.magFilter=T.LinearFilter;texture.minFilter=T.LinearFilter;texture.generateMipmaps=false;texture.repeat.set(.25,.25);texture.offset.set(0,.75);const canvas=document.createElement('canvas');canvas.width=texture.image.width;canvas.height=texture.image.height;const ctx=canvas.getContext('2d');ctx.drawImage(texture.image,0,0);const pixels=ctx.getImageData(0,0,canvas.width,canvas.height).data,size=canvas.width/4;
   actor.baselines=Array.from({length:16},(_,frame)=>{const x0=frame%4*size,y0=Math.floor(frame/4)*size;for(let y=size-1;y>=0;y--)for(let x=0;x<size;x++)if(pixels[((y0+y)*canvas.width+x0+x)*4+3]>128)return 1-(y+.5)/size;return .08;});
   material.map=texture;material.needsUpdate=true;sprite.visible=true;resolve();
  },undefined,reject);
 });
 return actor;
}
export function poseLanternPanda(actor,action='idle',progress=0,time=0,reduced=false){
 const p=Math.max(0,Math.min(1,progress));actor.frame=pandaFrame(action,p,time,reduced);const texture=actor.sprite.material.map;
 if(actor.baselines)actor.sprite.center.y=actor.baselines[actor.frame];
 if(texture)texture.offset.set((actor.frame%4)/4,(3-Math.floor(actor.frame/4))/4);
 actor.root.position.set(0,0,0);actor.root.rotation.set(0,0,0);
 // The different painted poses provide the body motion; only footwork moves the root.
 if(!reduced&&p<1){const impulse=Math.sin(Math.PI*p);if(action==='attack')actor.root.position.x=impulse*.26;if(action==='hit')actor.root.position.x=-impulse*.14;}
}
