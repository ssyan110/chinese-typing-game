import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {createVocabularyLoader,VOCABULARY_LEVELS} from '../src/summoner/vocabulary-loader.js';
import {selectVocabulary} from '../src/summoner/engine.js';
import {splitVocabulary} from '../scripts/split-vocabulary.mjs';
const sources=Object.fromEntries(['hsk','tocfl'].map(system=>[system,JSON.parse(fs.readFileSync(new URL(`../public/data/${system}.json`,import.meta.url),'utf8'))]));
test('every split level preserves vocabulary identity, order and all three modes',async()=>{
 for(const [system,levels]of Object.entries(VOCABULARY_LEVELS)){
  const groups=splitVocabulary(sources[system]);assert.equal([...groups.values()].flat().length,sources[system].length);
  const load=createVocabularyLoader(async path=>({ok:true,json:async()=>groups.get(path.split('/').at(-1).replace('.json',''))}));
  for(const level of levels)for(const cumulative of [false,true]){
   const rows=await load(system,level,cumulative);
   for(const mode of ['simplified','traditional','zhuyin'])assert.deepEqual(selectVocabulary(rows,system,level,cumulative,mode),selectVocabulary(sources[system],system,level,cumulative,mode));
  }
 }
});
test('initial HSK is under 40KB and rapid level changes share pending downloads',async()=>{
 let resolve;const pending=new Promise(done=>resolve=done),requests=[];
 const load=createVocabularyLoader(async path=>{requests.push(path);await pending;return {ok:true,json:async()=>[{level:path.includes('/1.')?'1':'2'}]};});
 const first=load('hsk','1',true),second=load('hsk','2',true);resolve();await Promise.all([first,second]);
 assert.deepEqual(requests,['data/levels/hsk/1.json','data/levels/hsk/2.json']);
 assert.ok(Buffer.byteLength(JSON.stringify(splitVocabulary(sources.hsk).get('1')))<40000);
});
test('a failed level can be retried instead of retaining a rejected cache entry',async()=>{
 let calls=0;const load=createVocabularyLoader(async()=>{if(++calls===1)throw Error('offline');return {ok:true,json:async()=>[{id:'retained'}]};});
 await assert.rejects(load('hsk','1',false),/offline/);assert.deepEqual(await load('hsk','1',false),[{id:'retained'}]);assert.equal(calls,2);
});
