import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {allocateStoryWords,newRun,answerPuzzle,answerWord,currentWord,needsPuzzle,validStory,emptyStory,storyKey} from '../src/summoner/story-engine.js';
import {PUZZLES,THEME_WORDS} from '../src/summoner/story-data.js';
import {selectVocabulary} from '../src/summoner/engine.js';
import {wordLabel} from '../src/summoner/curriculum.js';
import {exportBackup,parseBackup,emptySave} from '../src/summoner/storage.js';
import {JOURNEY_STOPS,chapterSetting} from '../src/summoner/journey-route.js';
const hsk=JSON.parse(fs.readFileSync(new URL('../public/data/hsk.json',import.meta.url)));
const tocfl=JSON.parse(fs.readFileSync(new URL('../public/data/tocfl.json',import.meta.url)));
const progress={version:1,scopes:{}};
const allocate=(pool,station='village',extra={})=>allocateStoryWords({pool,station,mode:'simplified',scope:'simplified:hsk',progress,...extra});
test('the full journey has eight distinct environments and fits every selected course without skipping vocabulary',()=>{
 assert.equal(JOURNEY_STOPS.length,8);assert.equal(new Set(JOURNEY_STOPS.map(s=>s.id)).size,8);
 for(const stop of JOURNEY_STOPS){assert.ok(stop.name&&stop.intro&&stop.encounter);assert.ok(fs.existsSync(new URL(`../public/original/art/journey/${stop.id}-background.png`,import.meta.url)));}
 for(const [system,rows]of [['hsk',hsk],['tocfl',tocfl]])for(const level of new Set(rows.map(w=>w.level)))for(const mode of ['simplified','traditional','zhuyin'])for(const cumulative of [false,true]){
  const pool=selectVocabulary(rows,system,level,cumulative,mode);assert.ok(Math.ceil(pool.length/20)>=JOURNEY_STOPS.length,`${system} ${level} ${mode}`);
  for(let number=1;number<=Math.ceil(pool.length/20);number++)assert.ok(JOURNEY_STOPS.includes(chapterSetting(number)));
 }
 assert.ok(JOURNEY_STOPS.at(-1).after);assert.equal(chapterSetting(9),JOURNEY_STOPS[0]);
});
test('all levels and modes allocate unique words within the selected pool, never inventing topic translations',()=>{
 for(const [system,rows,levels]of [['hsk',hsk,['1','2','3','4','5','6','7-9']],['tocfl',tocfl,['N1','N2','A1','A2','B1','B2','C1']]])for(const level of levels)for(const mode of ['simplified','traditional','zhuyin'])for(const cumulative of [false,true])for(const station of ['village','bamboo','harbor']){
  const pool=selectVocabulary(rows,system,level,cumulative,mode),items=allocate(pool,station,{mode,scope:`${mode}:${system}`});
  assert.equal(items.length,Math.min(8,pool.length));assert.equal(new Set(items.map(i=>i.word.id)).size,items.length);
  assert.ok(items.every(i=>pool.includes(i.word)));assert.ok(items.filter(i=>i.role==='theme').every(i=>THEME_WORDS[i.word.s]?.theme===station));
 }
});
test('allocation keeps four topic slots, two course slots, and reserves two review slots',()=>{
 const pool=selectVocabulary(hsk,'hsk','1',false,'simplified'),weak=pool.filter(w=>['八','百'].includes(w.s));
 const items=allocate(pool,'village',{records:[{selection:{mode:'simplified',system:'hsk'},rows:weak.map(w=>({id:w.id,wrong:5}))}]});
 assert.equal(items.filter(i=>i.role==='theme').length,4);assert.equal(items.filter(i=>i.role==='review').length,2);
});
test('three different puzzle sequences and all 24 clean inputs required; wrong answer repair is not credit',()=>{
 const words=selectVocabulary(hsk,'hsk','1',false,'simplified');
 for(const station of ['village','bamboo','harbor']){
  const items=allocate(words,station),run=newRun(items),deck=items.map(i=>i.word);let credited=0;
  assert.equal(answerPuzzle(run,station,(PUZZLES[station][0].answer+1)%3),false);assert.equal(run.puzzle,0);
  assert.equal(answerWord(run,deck[0],'simplified',deck[0].s,station).accepted,false);
  for(let n=0;n<200&&!run.done;n++){
   if(needsPuzzle(run)){answerPuzzle(run,station,PUZZLES[station][run.puzzle].answer);continue;}
   const word=currentWord(run,deck);
   if(run.cursor===0){answerWord(run,word,'simplified','wrong',station);const result=answerWord(run,word,'simplified',word.s,station);assert.equal(result.credited,false);continue;}
   const result=answerWord(run,word,'simplified',word.s,station);if(result.credited)credited++;
  }
  assert.equal(run.done,true);assert.equal(run.completed,true);assert.equal(credited,24);assert.equal(run.cursor,25);assert.equal(run.choices,3);
 }
});
test('hints do not count as independent recall; traditional and zhuyin accepted exactly',()=>{
 for(const mode of ['traditional','zhuyin']){const items=allocate(selectVocabulary(tocfl,'tocfl','N1',true,mode),'village',{mode,scope:`${mode}:tocfl`});const r=newRun(items);r.cursor=items.length;r.puzzle=2;r.hinted=true;const word=currentWord(r,items.map(i=>i.word));assert.equal(answerWord(r,word,mode,wordLabel(word,mode),'village').recall,false);}
});
test('journey saves round trip with old progress and old backups remain supported',()=>{
 const items=allocate(hsk.filter(w=>w.level==='1')),story=emptyStory(),key=storyKey({mode:'simplified',system:'hsk',level:'1',cumulative:true});story.courses[key]={village:newRun(items)};
 assert.equal(validStory(story),true);const old=emptySave();old.progress.scopes['simplified:hsk']={'hsk-1':'爱'};
 assert.deepEqual(parseBackup(exportBackup({...old,story})).story,story);assert.deepEqual(parseBackup(exportBackup({...old,story})).progress,old.progress);assert.deepEqual(parseBackup(exportBackup(old)),old);
 const invalid=structuredClone(story);invalid.courses[key].village.done=true;assert.equal(validStory(invalid),false);assert.throws(()=>parseBackup(exportBackup({...old,story:invalid})));
});
