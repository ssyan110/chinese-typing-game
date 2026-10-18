import {chromium} from '@playwright/test';
import {mkdir,cp,writeFile} from 'node:fs/promises';
import {JOURNEY_STOPS} from '../src/summoner/journey-route.js';
const out=new URL('../output/journey-2026-10-18/art/',import.meta.url);await mkdir(out,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1200,height:720},deviceScaleFactor:1});
await page.goto('http://127.0.0.1:5186/');
await page.evaluate(async()=>{const {createJourneyScene}=await import('/src/summoner/story-scene.js');const canvas=document.createElement('canvas');canvas.id='render-art';Object.assign(canvas.style,{position:'fixed',inset:'0',width:'1200px',height:'720px',zIndex:'99999'});document.body.append(canvas);window.artStage=createJourneyScene(canvas,{reduced:()=>true});});
for(const station of JOURNEY_STOPS.map(s=>s.id)){
 await page.evaluate(id=>{window.artStage.setStation(id);window.artStage.showActors(true);window.artStage.draw(0);},station);
 await page.locator('#render-art').screenshot({path:new URL(station+'.png',out).pathname});
 await page.evaluate(()=>{window.artStage.showActors(false);window.artStage.draw(0);});
 await page.locator('#render-art').screenshot({path:new URL(station+'-background.png',out).pathname});
}
await page.evaluate(async()=>{
 window.artStage.dispose();document.querySelector('#render-art').remove();const T=await import('/node_modules/.vite/deps/three.js');const {createFighter,poseFighter}=await import('/src/summoner/combat-scene3d.js');
 const canvas=document.createElement('canvas');canvas.id='render-figure';Object.assign(canvas.style,{position:'fixed',top:'0',left:'0',width:'600px',height:'720px',zIndex:'99999'});document.body.append(canvas);
 const renderer=new T.WebGLRenderer({canvas,alpha:true,antialias:true,preserveDrawingBuffer:true});renderer.setSize(600,720);renderer.setClearColor(0,0);renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.12;const scene=new T.Scene();scene.add(new T.HemisphereLight('#ffefcc','#526951',2.6));const sun=new T.DirectionalLight('#ffe2ac',3.5);sun.position.set(-4,10,8);scene.add(sun);const camera=new T.OrthographicCamera(-1.5,1.5,1.8,-1.8,.1,30);camera.position.set(0,2.1,8);camera.lookAt(0,1.25,0);let actor;
 window.figure=id=>{if(actor)scene.remove(actor.group);actor=createFighter(id);actor.group.rotation.y=.3;actor.group.traverse(n=>{if(n.material?.isMeshStandardMaterial){n.material.roughness=.88;n.material.metalness=0;}});scene.add(actor.group);poseFighter(actor,'idle',0,0,true);renderer.render(scene,camera);};
});
for(const id of ['hero','guardian','moth','sentinel']){await page.evaluate(id=>window.figure(id),id);const png=await page.locator('#render-figure').evaluate(canvas=>canvas.toDataURL('image/png'));await writeFile(new URL(id+'.png',out),Buffer.from(png.split(',')[1],'base64'));}
await browser.close();await cp(out,new URL('../public/original/art/journey/',import.meta.url),{recursive:true});console.log('Rendered eight dioramas, backgrounds and four matching actors.');
