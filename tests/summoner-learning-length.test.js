import test from 'node:test';
import assert from 'node:assert/strict';
import {Duel} from '../src/summoner/engine.js';
import {chaptersFor,readProgress,markCompleted,progressScope,markChapterWon,hasChapterWon} from '../src/summoner/curriculum.js';
const words=Array.from({length:85},(_,i)=>({id:'length-'+i,s:'字'+String.fromCodePoint(0x4e00+i),t:'詞'+String.fromCodePoint(0x4e00+i),z:'ㄅㄚ',keys:'18'}));
function finish(g,{wrong=false,timeout=false,spell='strike'}={}){
 let safety=0;
 while(g.status==='playing'||g.status==='reward'){
  assert.ok(safety++<300,'practice must terminate without grinding');
  if(g.status==='reward'){g.reward('heal');continue;}
  if(wrong)g.mode==='zhuyin'?g.key('!'):g.submit('錯誤');
  if(timeout&&g.target.id===g.battleWords[0].id){g.tick(60);continue;}
  g.choose(spell);if(g.mode==='zhuyin')for(const key of g.target.input)g.key(key);else g.submit(g.target.label);
 }
 return g.result();
}
test('chapter boundaries cover the entire pool once: 15 first, then 20 including the tail',()=>{
 const p=readProgress(null),scope=progressScope('simplified','hsk');words.slice(0,20).forEach(w=>markCompleted(p,scope,w,'simplified'));
 const chapters=chaptersFor(words,'simplified',p,scope);
 assert.deepEqual(chapters.map(c=>c.words.length),[15,20,20,20,10]);assert.deepEqual(chapters.flatMap(c=>c.words),words);
 assert.equal(chapters[0].done,15);assert.equal(chapters[1].done,5);
});
for(const mode of ['simplified','traditional','zhuyin'])for(const encounter of ['guardian','moth','sentinel']){
 test(`${mode}/${encounter}: first chapter lasts 30 answers, second 40 with only two appearances per word`,()=>{
  for(const [chapter,size,total] of [[1,15,30],[2,20,40]]){
   const g=new Duel({words:words.slice(0,size),kind:'campaign',mode,encounter,seconds:60,rng:()=>.37});g.power=999;
   const order=[];let rewards=0;
   while(g.status!=='won'){
    if(g.status==='reward'){rewards++;g.reward('heal');continue;}
    assert.equal(g.status,'playing');order.push(g.target.id);
    if(mode==='zhuyin')for(const key of g.target.input)g.key(key);else g.submit(g.target.label);
    if(g.correct<total)assert.notEqual(g.status,'won',`chapter ${chapter} must not finish at ${g.correct}`);
   }
   assert.equal(g.correct,total);assert.equal(g.enemyHp,0);assert.equal(rewards,total/10-1);
   assert.equal(new Set(order.slice(0,size)).size,size);assert.equal(new Set(order.slice(size)).size,size);
   assert.ok(g.result().rows.every(r=>r.shown===2&&r.correct===2));
  }
 });
 test(`${mode}/${encounter}: repeated mistakes add only one extra presentation per word`,()=>{
  const g=new Duel({words:words.slice(15,35),kind:'campaign',mode,encounter,seconds:60});
  const result=finish(g,{wrong:true,spell:'ward'});
  assert.equal(result.status,'won');assert.equal(result.correct,60);assert.equal(result.practiceTotal,60);
  assert.ok(result.rows.every(r=>r.shown===3&&r.correct===3&&r.wrong===3));
 });
}
test('remaining boss HP and a low-damage spell cannot extend a completed practice',()=>{
 for(const spell of ['strike','ward','mend'])for(const encounter of ['guardian','moth','sentinel']){
  const g=new Duel({words:words.slice(0,20),kind:'campaign',encounter,seconds:60});g.enemyHp=g.enemyMax=99999;
  const r=finish(g,{spell});assert.equal(r.status,'won');assert.equal(r.correct,40);assert.equal(g.enemyHp,0);
 }
});
test('old one/two-success practice resumes only remaining presentations and scales HP',()=>{
 const selected=words.slice(0,20),initialPractice=Object.fromEntries(selected.map((w,i)=>[w.id,i<15?2:1]));
 const g=new Duel({words:selected,kind:'campaign',initialPractice});assert.equal(g.enemyMax,60);assert.equal(g.practiceDone,35);
 const r=finish(g,{spell:'mend'});assert.equal(r.status,'won');assert.equal(r.correct,5);assert.equal(r.practiceDone,40);assert.equal(r.rows.length,5);
});
test('a completed set restarts full practice instead of ending after a few old words',()=>{
 const selected=words.slice(0,15),initialPractice=Object.fromEntries(selected.map(w=>[w.id,2]));
 assert.equal(finish(new Duel({words:selected,kind:'campaign',initialPractice})).correct,30);
});
test('repeated timeout stops at three presentations and leaves the word for review without a false victory',()=>{
 const g=new Duel({words:words.slice(0,20),kind:'campaign',seconds:60});
 const r=finish(g,{timeout:true});assert.equal(r.status,'ended');assert.equal(r.rows.find(w=>w.id===words[0].id).shown,3);
 assert.equal(r.rows.find(w=>w.id===words[0].id).missed,3);assert.equal(r.practiceDone,r.practiceTotal);assert.ok(g.enemyHp>0);
});
test('wrong then corrected counts as progress and schedules a single delayed extra practice',()=>{
 const g=new Duel({words:words.slice(0,20),kind:'campaign'}),id=g.target.id;
 for(let i=0;i<8;i++){g.edit('');g.submit('錯誤');}g.submit(g.target.label);
 assert.equal(g.practiceDone,1);assert.equal(g.practiceCounts.get(id),1);assert.equal(g.practiceTotal,41);
 assert.equal(g.campaignQueue.filter(w=>w.id===id).length,2);
 const r=finish(g);assert.equal(r.status,'won');assert.equal(r.rows.find(w=>w.id===id).shown,3);
});
test('chapter victory migration preserves won vocabulary but cannot invent a new victory',()=>{
 const p=readProgress(null),scope='simplified:hsk';markChapterWon(p,scope,words.slice(0,20),'simplified');
 const c=chaptersFor(words,'simplified',p,scope);assert.equal(hasChapterWon(p,scope,c[0].words,'simplified'),true);
 assert.equal(hasChapterWon(p,scope,c[1].words,'simplified'),false);
 markChapterWon(p,scope,words.slice(20,40),'simplified');assert.equal(hasChapterWon(p,scope,c[1].words,'simplified'),true);
 assert.equal(hasChapterWon(p,'traditional:hsk',c[0].words,'traditional'),false);
});
