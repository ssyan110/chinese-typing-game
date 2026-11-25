import {test} from 'node:test';
import assert from 'node:assert/strict';
import {Duel} from '../src/summoner/engine.js';

test('starter duel practices each tutorial word once at learner pace and ends with a defense',()=>{
 const words=['三','人','好'].map((s,id)=>({s,t:s,id}));
 const duel=new Duel({kind:'starter',words,seconds:1,initialPractice:{0:2,1:2,2:2}});
 const presented=[];
 while(duel.status==='playing'){
  const {id,label}=duel.target;
  duel.tick(3600);
  assert.equal(duel.misses,0);
  assert.equal(duel.target.id,id);
  if(!presented.length)duel.submit('错误');
  presented.push(id);
  assert.equal(duel.defending,presented.length===3);
  assert.equal(duel.submit(label),'correct');
  assert.ok(presented.length<=3);
 }
 assert.equal(duel.status,'won');
 assert.equal(duel.enemyHp,0);
 assert.deepEqual(presented.sort(),[0,1,2]);
 assert.equal(duel.result().practiceTotal,3);
});

test('optional timed retry ends after the three familiar words even when a player times out',()=>{
 const words=['三','人','好'].map((s,id)=>({s,t:s,id}));
 const duel=new Duel({kind:'starter-timed',words,seconds:3});
 assert.equal(duel.untimed,false);
 duel.tick(3);
 assert.equal(duel.misses,1);
 duel.submit(duel.target.label);
 duel.submit(duel.target.label);
 assert.equal(duel.status,'ended');
 assert.equal(duel.result().practiceTotal,3);
 assert.equal(duel.result().correct,2);
});
