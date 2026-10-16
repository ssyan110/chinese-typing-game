import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url),read=p=>fs.readFileSync(new URL(p,root));
const art=JSON.parse(read('public/original/art-map.json')),audio=JSON.parse(read('public/original/audio-map.json'));
const source=JSON.parse(read('data/upstream/game-assets.json'));
test('every previous illustration and sound resolves to a local authored replacement',()=>{
 for(const name of new Set(source.filter(name=>!name.startsWith('fonts/')))){
  const replacement=art[name]||audio[name];assert.ok(replacement,name);assert.match(replacement,/^original\/(art|audio)\//);assert.ok(read('public/'+replacement).length>100,replacement);
 }
 assert.equal(Object.keys(art).length,87);assert.equal(Object.keys(audio).length,21);
});
test('original SVG geometry contains no imported images, scripts or remote font/image references',()=>{
 for(const file of Object.values(art).filter(f=>f.endsWith('.svg'))){const svg=read('public/'+file).toString();assert.match(svg,/<svg/);assert.doesNotMatch(svg,/<(?:image|script|foreignObject)\b|(?:href|src)=["']https?:|@import|@font-face/i,file);}
});
test('the illustrated hero has distinct standing, attack, defense and jump poses',()=>{
 const hashes=['stand','attack','defense','jump'].map(state=>createHash('sha256').update(read('public/'+art[`assets/character/${state}-1.png`])).digest('hex'));assert.equal(new Set(hashes).size,4);
 for(const file of new Set(Object.values(art).filter(f=>f.endsWith('.webp')))){const bytes=read('public/'+file);assert.equal(bytes.subarray(0,4).toString(),'RIFF');assert.equal(bytes.subarray(8,12).toString(),'WEBP');}
});
test('rendered runtime has no references to archived picture, audio or font directories',()=>{
 for(const file of ['public/game/runtime.js','public/game/adaptation.css','index.html'])assert.doesNotMatch(read(file).toString(),/(?:\/game\/|["'`(])(?:assets|audio|fonts)\//,file);
});
