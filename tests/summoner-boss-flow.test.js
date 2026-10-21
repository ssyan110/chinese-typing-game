import test from 'node:test';
import assert from 'node:assert/strict';
import {Duel,makeDeck} from '../src/summoner/engine.js';
const words=Array.from({length:20},(_,i)=>({id:'seal-'+i,s:'字'+String.fromCodePoint(0x4e00+i),t:'詞'+String.fromCodePoint(0x4e00+i),z:'ㄅㄚ',keys:'18'}));
test('one campaign boss has a larger fixed HP pool and never heals at supply breaks',()=>{
 const g=new Duel({words,kind:'campaign',seconds:60});assert.equal(g.enemyMax,480);let previous=g.enemyHp,rewards=0;
 while(g.status!=='won'){
  assert.notEqual(g.status,'lost');
  if(g.status==='reward'){const hp=g.enemyHp;g.reward(['heal','power','shield'][rewards++%3]);assert.equal(g.enemyHp,hp);assert.equal(g.enemyMax,480);}
  else{g.choose(g.energy>=1?'ward':'strike');g.submit(g.target.label);}
  assert.ok(g.enemyHp<=previous);previous=g.enemyHp;if(g.status!=='won')assert.ok(g.enemyHp>0);
 }
 assert.ok(rewards===3);assert.ok(g.correct===40);assert.equal(g.enemyHp,0);
});
test('a boosted attack cannot bypass the remaining vocabulary seals',()=>{
 const g=new Duel({words,kind:'campaign',seconds:60});g.power=999;
 for(let i=0;i<40;i++){if(g.status==='reward')g.reward('heal');g.submit(g.target.label);assert.equal(g.practiceDone,i+1);assert.equal(g.status==='won',i===39);assert.equal(g.enemyHp,Math.max(0,(39-i)*6));}
});
test('finite free-play phases share one HP bar rather than reviving the same opponent',()=>{
 const g=new Duel({words,seconds:60});assert.equal(g.enemyMax,480);let previous=g.enemyHp,rewards=0,guard=0;
 while(g.status!=='won'&&guard++<100){assert.notEqual(g.status,'lost');if(g.status==='reward'){const hp=g.enemyHp;g.reward('heal');assert.equal(g.enemyHp,hp);rewards++;}else g.submit(g.target.label);assert.ok(g.enemyHp<=previous);previous=g.enemyHp;}
 assert.equal(g.status,'won');assert.ok(rewards===3);assert.equal(g.enemyHp,0);
});
test('new decks reshuffle all entries and avoid the previous run first word',()=>{
 const ids=words.map(w=>w.id),rng=()=>.37,first=makeDeck(words,rng)();const deck=makeDeck(words,rng,first.id),next=words.map(()=>deck());assert.notEqual(next[0].id,first.id);assert.deepEqual(next.map(w=>w.id).sort(),[...ids].sort());assert.deepEqual(words.map(w=>w.id),ids);
 const run=new Duel({words,kind:'campaign',rng,previousFirst:first.id});assert.notEqual(run.target.id,first.id);assert.equal(new Set([run.target.word,...run.campaignQueue].map(w=>w.id)).size,20);
});
test('one-word and two-word chapters finish without empty queues or a resurrected boss',()=>{
 for(const n of [1,2]){const g=new Duel({words:words.slice(0,n),kind:'campaign'});while(g.status!=='won'){if(g.status==='reward')g.reward('heal');else g.submit(g.target.label);}assert.ok(g.correct===n*2);assert.equal(g.enemyHp,0);}
});
