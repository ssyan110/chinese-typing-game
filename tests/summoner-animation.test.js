import test from 'node:test';import assert from 'node:assert/strict';
import {combatFeedback} from '../src/summoner/combat-motion.js';
const before={hp:100,shield:14,enemyHp:720,kind:'campaign'};
test('combat feedback distinguishes damage, shield absorption and a successful defense',()=>{
 const shield=combatFeedback(before,{hp:100,shield:7,enemyHp:702,lastAction:{spell:'ward',defending:false}},'correct');assert.equal(shield.heroDamage,0);assert.equal(shield.blocked,7);assert.equal(shield.counter,true);assert.equal(shield.enemyDamage,18);
 const defense=combatFeedback(before,{hp:100,shield:14,enemyHp:710,lastAction:{spell:'strike',defending:true}},'correct');assert.equal(defense.defending,true);assert.equal(defense.counter,false);
 assert.equal(combatFeedback({...before,kind:'review'},{hp:100,enemyHp:720},'correct'),null);
 assert.equal(combatFeedback(before,before,'partial'),null);
});
test('a newly cast shield shows the actual enemy counter even when HP stays full',async()=>{
 const {Duel}=await import('../src/summoner/engine.js'),words=Array.from({length:20},(_,i)=>({id:String(i),s:'字'+String.fromCodePoint(0x4e00+i)})),g=new Duel({words,kind:'campaign'}),before={hp:g.hp,shield:g.shield,enemyHp:g.enemyHp,kind:g.kind};g.choose('ward');g.submit(g.target.label);const fx=combatFeedback(before,g,'correct');assert.equal(fx.counter,true);assert.equal(fx.blocked,7);assert.equal(fx.heroDamage,0);
});
