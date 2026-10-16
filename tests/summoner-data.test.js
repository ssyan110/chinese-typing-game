import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {selectVocabulary,Duel} from '../src/summoner/engine.js';
for(const [system,levels]of Object.entries({hsk:['1','2','3','4','5','6','7-9'],tocfl:['N1','N2','A1','A2','B1','B2','C1']})){
 const rows=JSON.parse(fs.readFileSync(new URL('../public/data/'+system+'.json',import.meta.url)));
 test(system+' every level and mode has valid real vocabulary',()=>{
  for(const level of levels)for(const mode of ['simplified','traditional','zhuyin']){
   const words=selectVocabulary(rows,system,level,false,mode);assert.ok(words.length>0,mode+' '+level);
   const labels=words.map(w=>mode==='zhuyin'?w.t+'|'+w.z.replace(/\s/g,''):mode==='traditional'?w.t:w.s);assert.equal(new Set(labels).size,labels.length);
   for(const w of words)if(mode==='zhuyin')assert.equal(w.z.replace(/\s/g,'').length,w.keys.length,w.id);
   const game=new Duel({words,mode});assert.ok(game.target.label);assert.equal(Object.hasOwn(game.target,'p'),false);assert.equal(Object.hasOwn(game.target,'phonetic'),false);
  }
 });
}
test('independent browser entry imports only the new engine, never the reference adapter',()=>{
 const app=fs.readFileSync(new URL('../src/summoner/app.js',import.meta.url),'utf8');const entry=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
 assert.doesNotMatch(app,/reference-game|src\/reference|nativeHanzi|TypeGameWuxia/);assert.match(app,/from '\.\/engine\.js'/);assert.doesNotMatch(entry,/\/game\/|reference-game|runtime\.js/);assert.match(entry,/src\/summoner\/app\.js/);
});
