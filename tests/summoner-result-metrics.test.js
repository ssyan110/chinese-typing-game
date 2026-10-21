import test from 'node:test';import assert from 'node:assert/strict';
import {typingAccuracy,typingAccuracyLabel} from '../src/summoner/result-metrics.js';
test('thirty correct submissions with three timeouts retain 100% typing accuracy',()=>{
 assert.equal(typingAccuracy({correct:30,errors:0,misses:3}),100);
 assert.equal(typingAccuracy({correct:30,errors:3,misses:0}),91);
});
test('no submission or a legacy record without counts has no typing percentage',()=>{
 assert.equal(typingAccuracyLabel({correct:0,errors:0,misses:3}),'—');
 assert.equal(typingAccuracyLabel({accuracy:91}),'—');
});

test('the reported 5350-point run keeps its original grade and all fifteen vocabulary rows',async()=>{
 const {Duel}=await import('../src/summoner/engine.js');
 const words=Array.from({length:15},(_,i)=>({id:'w'+i,s:'字'+String.fromCodePoint(0x4e00+i)}));
 const game=new Duel({words,kind:'campaign',seconds:6});
 for(let i=0;i<3;i++)game.tick(6);
 while(['playing','reward'].includes(game.status)){
  if(game.status==='reward')game.reward('heal');else game.submit(game.target.label);
 }
 const result=game.result();assert.equal(result.status,'won');assert.equal(result.correct,30);
 assert.equal(result.errors,0);assert.equal(result.misses,3);assert.equal(result.accuracy,91);
 assert.equal(typingAccuracy(result),100);assert.equal(result.rows.length,15);
 assert.equal(result.score,5350);assert.equal(result.stars,3);assert.equal(result.grade,'A');
});
