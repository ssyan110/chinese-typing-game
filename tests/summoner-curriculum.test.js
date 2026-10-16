import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {Duel,selectVocabulary} from '../src/summoner/engine.js';
import {chaptersFor,markCompleted,progressScope,readProgress,isCompleted} from '../src/summoner/curriculum.js';
import {parse} from 'csv-parse/sync';
const rows=JSON.parse(fs.readFileSync(new URL('../public/data/hsk.json',import.meta.url))),words=selectVocabulary(rows,'hsk','1',false,'simplified');
test('every source word is represented in an exhaustive chapter in every mode, level and cumulative scope',()=>{
 for(const system of ['hsk','tocfl']){const source=JSON.parse(fs.readFileSync(new URL('../public/data/'+system+'.json',import.meta.url)));for(const level of new Set(source.map(w=>w.level)))for(const mode of ['simplified','traditional','zhuyin'])for(const cumulative of [false,true]){
  const pool=selectVocabulary(source,system,level,cumulative,mode),chapters=chaptersFor(pool,mode,readProgress(null),progressScope(mode,system));
  assert.equal(chapters.length,Math.ceil(pool.length/20));assert.deepEqual(chapters.flatMap(c=>c.words),pool);assert.ok(chapters.every(c=>c.words.length>0&&c.words.length<=20));assert.equal(new Set(pool.map(w=>w.id)).size,pool.length);
  const labels=new Set(pool.map(w=>mode==='zhuyin'?w.t+'|'+w.z.replace(/\s/g,''):mode==='traditional'?w.t:w.s));
  const levelOrder=[...new Set(source.map(x=>x.level))],allowed=new Set(cumulative?levelOrder.slice(0,levelOrder.indexOf(level)+1):[level]);
  for(const w of source.filter(w=>allowed.has(w.level))){assert.ok(labels.has(mode==='zhuyin'?w.t+'|'+w.z.replace(/\s/g,''):mode==='traditional'?w.t:w.s),system+'/'+level+'/'+mode+'/'+w.s);}
 }}
});
test('campaign requires every target correct; expired words return and successful words never repeat',()=>{
 const g=new Duel({words:words.slice(0,20),kind:'campaign',seconds:5,rng:()=>.4});const missed=g.target.id;g.tick(5);assert.equal(g.misses,1);assert.notEqual(g.target.id,missed);
 let safety=0;const answered=new Set();while(g.status!=='won'&&safety++<100){if(g.status==='reward'){g.reward('heal');continue;}assert.equal(g.status,'playing');const id=g.target.id;assert.ok(!answered.has(id));g.choose(g.energy>=1?'ward':'strike');g.submit(g.target.label);answered.add(id);}
 assert.equal(g.status,'won');assert.equal(answered.size,20);assert.equal(g.completedIds.size,20);assert.ok(answered.has(missed));
});
test('saved successful answers resume exactly remaining words and are isolated by script and vocabulary system',()=>{
 let p=readProgress(null);const scope=progressScope('simplified','hsk');for(const w of words.slice(0,7))markCompleted(p,scope,w,'simplified');p=readProgress(JSON.parse(JSON.stringify(p)));
 const c=chaptersFor(words,'simplified',p,scope);assert.equal(c[0].done,7);assert.deepEqual(c[0].remaining,words.slice(7,20));assert.equal(c[1].done,0);assert.equal(isCompleted(p,progressScope('traditional','hsk'),words[0],'traditional'),false);assert.equal(isCompleted(p,progressScope('simplified','tocfl'),words[0],'simplified'),false);assert.equal(isCompleted(p,scope,{...words[0],s:'新資料'},'simplified'),false);
});
test('all 20-word campaign chapters can finish, including Zhuyin homophones as separate vocabulary',()=>{
 for(const mode of ['simplified','traditional','zhuyin'])for(const encounter of ['guardian','moth','sentinel']){const g=new Duel({words:words.slice(0,20),kind:'campaign',mode,encounter,seconds:60});let safety=0;while(!['won','lost'].includes(g.status)&&safety++<500){if(g.status==='reward'){g.reward('heal');continue;}g.choose(g.energy>=1?'ward':'strike');if(mode==='zhuyin')g.key(g.target.input[g.progress]);else g.submit(g.target.label);}assert.equal(g.status,'won',mode+'/'+encounter);assert.equal(g.correct,20);}
});
test('malformed saved progress is safely ignored',()=>{for(const value of [null,[],{version:1,scopes:null},{version:1,scopes:[]}])assert.deepEqual(readProgress(value),{version:1,scopes:{}});assert.deepEqual(readProgress({version:1,scopes:{bad:[],ok:{x:7,y:'字'}}}).scopes,{ok:{y:'字'}});});
test('all original TOCFL variant spellings and HSK rows survive vocabulary import',()=>{
 const original=parse(fs.readFileSync(new URL('../data/upstream/tocfl-202307.csv',import.meta.url)),{columns:true,skip_empty_lines:true,bom:true}),built=JSON.parse(fs.readFileSync(new URL('../public/data/tocfl.json',import.meta.url))),seen=new Set(built.map(w=>w.s+'|'+w.t+'|'+w.p));
 for(const row of original)for(const v of row.Variants?JSON.parse(row.Variants):[row])assert.ok(seen.has(v.Simplified+'|'+v.Traditional+'|'+v.Pinyin),row.ID+' '+v.Traditional);
 assert.equal(rows.length,JSON.parse(fs.readFileSync(new URL('../data/upstream/hsk-2025.json',import.meta.url))).length);assert.ok([...rows,...built].every(w=>w.z&&w.keys),'No word is silently excluded from Zhuyin');
});
for(const system of ['hsk','tocfl'])test(system+' every chapter, including cumulative levels, can be completed to 100%',()=>{
 const source=JSON.parse(fs.readFileSync(new URL('../public/data/'+system+'.json',import.meta.url)));
 for(const mode of ['simplified','traditional','zhuyin'])for(const level of new Set(source.map(w=>w.level)))for(const cumulative of [false,true]){
  const progress=readProgress(null),scope=progressScope(mode,system),pool=selectVocabulary(source,system,level,cumulative,mode);
  for(const chapter of chaptersFor(pool,mode,progress,scope)){
   const g=new Duel({words:chapter.words,mode,kind:'campaign',encounter:chapter.encounter});let actions=0;
   while(!['won','lost'].includes(g.status)&&actions++<1000){
    if(g.status==='reward'){g.reward('heal');continue;}
    g.choose(g.energy>=1?'ward':'strike');const word=g.target.word,outcome=mode==='zhuyin'?g.key(g.target.input[g.progress]):g.submit(g.target.label);
    if(outcome==='correct')markCompleted(progress,scope,word,mode);
   }
   assert.equal(g.status,'won',`${mode}/${level}/${cumulative}/${chapter.number}`);assert.equal(g.completedIds.size,chapter.words.length);
  }
  assert.ok(chaptersFor(pool,mode,progress,scope).every(c=>c.remaining.length===0),`${mode}/${level}/${cumulative} reaches full completion`);
 }
});
