import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const adapter=fs.readFileSync(new URL('../src/reference/adapter.js',import.meta.url),'utf8');
const handler=adapter.slice(adapter.indexOf("damagePlayer=function(amount,reason='')"),adapter.indexOf('const nativeCombatHud='));
function encounter(){
 const state={game:{mode:'playing',playerHp:3,maxPlayerHp:140,stageMisses:0,stagePerfect:true},failures:0,showToast(){},showCombatDamage(){},updateHud(){}};
 state.failStage=()=>{state.failures++;state.game.mode='failed';};vm.createContext(state);vm.runInContext(handler,state);return state;
}
test('lethal damage clamps HP to zero and ends a timed round once',()=>{
 const s=encounter();s.damagePlayer(10,'miss');assert.equal(s.game.playerHp,0);assert.equal(s.game.mode,'failed');assert.equal(s.game.stagePerfect,false);s.damagePlayer(10);assert.equal(s.failures,1);assert.equal(s.game.playerHp,0);
});
test('non-lethal damage continues play; stopped encounters cannot be damaged or healed',()=>{
 const s=encounter();s.damagePlayer(2);assert.equal(s.game.playerHp,1);assert.equal(s.failures,0);s.game.mode='result';s.damagePlayer(10);assert.equal(s.game.playerHp,1);
});
