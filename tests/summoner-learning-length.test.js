import test from 'node:test';
import assert from 'node:assert/strict';
import {Duel} from '../src/summoner/engine.js';
import {CHAPTER_SIZE,chaptersFor,readProgress,markCompleted,progressScope} from '../src/summoner/curriculum.js';
const words=Array.from({length:85},(_,i)=>({id:'length-'+i,s:'字'+String.fromCodePoint(0x4e00+i),t:'字'+String.fromCodePoint(0x4e00+i),z:'ㄅ',keys:'1'}));
test('chapters provide 20 distinct words without dropping the final partial chapter or old progress',()=>{
 const p=readProgress(null),scope=progressScope('simplified','hsk');words.slice(0,20).forEach(w=>markCompleted(p,scope,w,'simplified'));
 const chapters=chaptersFor(words,'simplified',p,scope);assert.equal(CHAPTER_SIZE,20);assert.deepEqual(chapters.map(c=>c.words.length),[20,20,20,20,5]);assert.equal(chapters[0].done,20);assert.equal(chapters[0].remaining.length,0);
});
test('free play cannot win before 20 distinct vocabulary targets even with boosted damage',()=>{
 const g=new Duel({words,kind:'duel',seconds:60,rng:()=>.37});assert.ok(g.enemyMax>=720);g.power=999;
 let actions=0;while(!['won','lost'].includes(g.status)&&actions++<100){if(g.status==='reward'){g.reward('heal');continue;}g.choose(g.energy?'ward':'strike');g.submit(g.target.label);if(g.correct<60)assert.notEqual(g.status,'won');}
 assert.equal(g.status,'won');assert.equal(g.completedIds.size,20);assert.equal(g.correct,60);
});
test('a 20-word chapter stays playable with basic attacks and frequent healing supplies',()=>{
 for(const encounter of ['guardian','moth','sentinel']){const g=new Duel({words:words.slice(0,20),kind:'campaign',encounter,seconds:5});let safety=0;while(!['won','lost'].includes(g.status)&&safety++<100){if(g.status==='reward'){g.reward('heal');continue;}g.tick(1.75);g.choose('strike');g.submit(g.target.label);}assert.equal(g.status,'won',encounter);assert.equal(g.correct,60);assert.equal(g.result().elapsed,105);}
});
test('three practices do not automatically win while the monster still has HP',()=>{
 const g=new Duel({words:words.slice(0,2),kind:'campaign'});g.enemyHp=1000;g.enemyMax=1000;let guard=0;
 while(g.correct<6&&guard++<30){if(g.status==='reward')g.reward('heal');else g.submit(g.target.label);}
 assert.equal(g.practiceDone,6);assert.equal(g.completedIds.size,2);assert.equal(g.status,'playing');assert.ok(g.enemyHp>0);
});
test('partial practice resumes without treating one old success as all three successes',()=>{
 const subset=words.slice(0,20),initialPractice=Object.fromEntries(subset.map(w=>[w.id,1]));const g=new Duel({words:subset,kind:'campaign',initialPractice});assert.equal(g.practiceDone,20);assert.equal(g.completedIds.size,0);g.submit(g.target.label);assert.equal(g.practiceDone,21);assert.notEqual(g.status,'won');
});
test('correcting a wrong presentation gives feedback but does not count as a clean repetition',()=>{
 const g=new Duel({words:words.slice(0,20),kind:'campaign'}),id=g.target.id;g.submit('錯誤');g.submit(g.target.label);assert.equal(g.correct,1);assert.equal(g.practiceCounts.get(id),0);assert.equal(g.practiceDone,0);assert.equal(g.status,'playing');
});
