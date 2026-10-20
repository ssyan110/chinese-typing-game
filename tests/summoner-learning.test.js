import {test} from 'node:test';
import assert from 'node:assert/strict';
import {compareAnswer,dueRecallWords,acceptsRecall} from '../src/summoner/learning.js';
import {exportBackup,parseBackup} from '../src/summoner/storage.js';
const selection={mode:'simplified',system:'hsk',level:'1',cumulative:true};
const pool=[{id:'1',s:'包子',t:'包子',p:'bāozi'},{id:'2',s:'他',t:'他',p:'tā'},{id:'3',s:'她',t:'她',p:'tā'}];
const now=Date.parse('2026-10-20T12:00:00Z');
const record=(age,rows,extra={})=>({scope:'test',kind:'campaign',selection,at:new Date(now-age).toISOString(),rows,...extra});
test('feedback identifies wrong, missing and extra characters without HTML',()=>{
 assert.deepEqual(compareAnswer('包子','饱子').different,[1]);
 assert.deepEqual(compareAnswer('包子','包').different,[2]);
 assert.equal(compareAnswer('包子','包子子').extra,true);
});
test('recall requires a prior successful answer at least 24h ago in the matching scope',()=>{
 const history=[record(86400001,[{id:'1',correct:1},{id:'2',correct:0}]),record(86400001,[{id:'3',correct:1}],{selection:{...selection,mode:'traditional'}})];
 assert.deepEqual(dueRecallWords(pool,history,selection,now).map(w=>w.id),['1']);
 assert.deepEqual(dueRecallWords(pool,history,{...selection,mode:'zhuyin'},now),[]);
});
test('clean recall postpones a word; a hint or corrected answer does not',()=>{
 const old=record(90000000,[{id:'1',correct:1}]);
 assert.equal(dueRecallWords(pool,[old,record(0,[{id:'1',correct:1}],{kind:'review'})],selection,now).length,0);
 assert.equal(dueRecallWords(pool,[old,record(0,[{id:'1',correct:0,wrong:1}],{kind:'review'})],selection,now).length,1);
});
test('pinyin prompts accept matching homophones and reject wrong readings',()=>{
 assert.equal(acceptsRecall(pool[1],'她',pool,'simplified'),true);
 assert.equal(acceptsRecall(pool[0],'饱子',pool,'simplified'),false);
});
test('recall evidence round trips through existing backup without changing progress',()=>{
 const data={progress:{version:1,scopes:{}},practice:{},records:[record(0,[{id:'1',label:'包子',correct:1,wrong:0,shown:1}],{kind:'review',learningTask:'pinyin-recall'})]};
 const restored=parseBackup(exportBackup(data));
 assert.equal(restored.records[0].learningTask,'pinyin-recall');
 assert.deepEqual(restored.progress,data.progress);
});
