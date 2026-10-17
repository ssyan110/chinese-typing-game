import test from 'node:test';
import assert from 'node:assert/strict';
import {Duel,makeDeck,selectVocabulary} from '../src/summoner/engine.js';
const words=Array.from({length:30},(_,i)=>({id:'w'+i,level:'1',s:'字'+String.fromCodePoint(0x4e00+i),t:'詞'+String.fromCodePoint(0x4e00+i),z:'ㄅㄚ',keys:'18'}));
test('deck covers the complete pool before repeating and avoids cycle-boundary repeats',()=>{const d=makeDeck(words,()=>.37);const first=words.map(()=>d());assert.equal(new Set(first.map(w=>w.id)).size,30);assert.notEqual(d().id,first.at(-1).id);});
test('vocabulary selection respects variant, level, cumulative scope and missing Zhuyin',()=>{const rows=[...words,{id:'advanced',level:'2',s:'爱',t:'愛'}];assert.equal(selectVocabulary(rows,'hsk','1',false,'simplified').length,30);assert.equal(selectVocabulary(rows,'hsk','2',true,'traditional').length,31);assert.equal(selectVocabulary(rows,'hsk','2',true,'zhuyin').length,30);});
test('word timeout attacks, zero HP is terminal, and paused time cannot damage',()=>{const g=new Duel({words,seconds:5});g.pause();g.tick(100);assert.equal(g.hp,100);g.resume();g.tick(5);assert.equal(g.hp,94);for(let i=0;i<20;i++)g.tick(5);assert.equal(g.hp,0);assert.equal(g.status,'lost');g.submit(g.target.label);g.tick(100);assert.equal(g.hp,0);assert.equal(g.status,'lost');});
test('IME partial text is unjudged and one wrong draft cannot be charged twice',()=>{const g=new Duel({words});assert.equal(g.submit('zi'),'preedit');assert.equal(g.submit(g.target.label.slice(0,1)),'partial');const hp=g.hp;g.submit('錯誤');g.submit('錯誤');assert.equal(g.hp,hp-2);g.edit('');g.submit('錯誤');assert.equal(g.hp,hp-2);});
test('defense is completed with the actual target rather than F/J shortcuts',()=>{const g=new Duel({words});g.submit(g.target.label);g.submit(g.target.label);assert.equal(g.defending,true);const hp=g.hp;g.submit(g.target.label);assert.equal(g.hp,Math.min(100,hp+1));assert.equal(g.blocks,1);});
test('spells spend finite energy and zero HP cannot be healed',()=>{const g=new Duel({words});assert.equal(g.choose('mend'),true);g.submit(g.target.label);assert.equal(g.energy,0);assert.equal(g.choose('mend'),false);g.hp=0;g.status='lost';g.choose('mend');g.submit(g.target.label);assert.equal(g.hp,0);});
test('extended practice requires explicit supply selections and produce a transparent learning rating',()=>{const g=new Duel({words,seconds:60});let guard=0;while(!['won','lost'].includes(g.status)&&guard++<200){if(g.status==='reward')g.reward('heal');else g.submit(g.target.label);}assert.equal(g.status,'won');assert.ok(g.round>=12);assert.equal(g.result().accuracy,100);assert.equal(g.result().stars,3);assert.ok(g.result().rows.length>0);});
test('Zhuyin accepts physical keys, preserves progress on a mistake and has touch-key parity',()=>{const g=new Duel({words,mode:'zhuyin'});assert.equal(g.key('1'),'partial');assert.equal(g.key('q'),'wrong');assert.equal(g.progress,1);assert.equal(g.key('8'),'correct');assert.equal(g.correct,1);assert.equal(g.errors,1);});
test('each correct Zhuyin symbol invalidates the rendered progress before the next key',()=>{const g=new Duel({words,mode:'zhuyin'}),revision=g.revision;g.key('1');assert.equal(g.progress,1);assert.ok(g.revision>revision);assert.equal(g.errors,0);});
test('review uses no HP loss or countdown and finishes with learning details',()=>{const g=new Duel({words:words.slice(0,2),kind:'review'});g.tick(500);g.submit('錯');assert.equal(g.hp,100);g.submit(g.target.label);g.submit(g.target.label);assert.equal(g.status,'won');assert.equal(g.result().rows.length,2);});

for (const mode of ['simplified', 'traditional', 'zhuyin']) {
 for (const size of [1, 10, 11, 20]) {
  test(`${mode} mistake review completes every selected word in a ${size}-word set`, () => {
   const selected = words.slice(0, size);
   const game = new Duel({words: selected, kind: 'review', mode, rng: () => .37});
   const seen = new Set();
   for (let index = 0; index < size; index++) {
    assert.equal(game.status, 'playing', 'review must stay open until every word is answered');
    assert.equal(seen.has(game.target.id), false, 'each selected word is presented once');
    seen.add(game.target.id);
    const target = game.target;
    const remaining = game.remaining;
    game.tick(500);
    assert.equal(game.remaining, remaining, 'review remains untimed');
    if (mode === 'zhuyin') {
     game.key('!');
     assert.equal(game.correct, index, 'a wrong key must not complete a word');
     for (const key of target.input) game.key(key);
    } else {
     game.submit('錯誤');
     assert.equal(game.correct, index, 'a wrong answer must not complete a word');
     game.submit(target.label);
    }
    assert.equal(game.hp, 100, 'mistake review must not lose HP');
    assert.equal(game.correct, index + 1);
   }
   assert.equal(game.status, 'won');
   assert.deepEqual([...seen].sort(), selected.map(word => word.id).sort());
   const result = game.result();
   assert.equal(result.correct, size);
   assert.equal(result.rows.length, size);
   assert.ok(result.rows.every(row => row.correct === 1 && row.wrong === 1));
   const revision = game.revision;
   game.submit(game.target.label);
   game.key('1');
   game.tick(500);
   assert.equal(game.correct, size, 'completed review cannot add another answer');
   assert.equal(game.revision, revision);
  });
 }
}
