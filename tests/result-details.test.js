import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const scope=vm.createContext({});vm.runInContext(fs.readFileSync(new URL('../src/reference/result-details.js',import.meta.url),'utf8'),scope);
test('full practice list sorts most mistakes first and keeps correct and unanswered items',()=>{
 const items={a:{label:'水',correct:2,wrong:0},b:{label:'水果',correct:1,wrong:3},c:{label:'休息',correct:0,wrong:2},d:{label:'好',correct:0,wrong:0}};
 const rows=scope.sortedPracticeReview(items);assert.deepEqual(Array.from(rows,r=>r.label),['水果','休息','水','好']);assert.equal(rows[0].correct,1);assert.equal(rows[0].wrong,3);assert.equal(Object.keys(items).length,4);
});
test('empty practice list is safe',()=>assert.equal(scope.sortedPracticeReview().length,0));
const runtime=fs.readFileSync(new URL('../public/game/runtime.js',import.meta.url),'utf8');
vm.runInContext(runtime.match(/const STAGE_SCORE_TIERS = \{[\s\S]*?\n        \};/)[0]+runtime.match(/function buildJudgeScore\([\s\S]*?\n        \}/)[0]+runtime.match(/function evaluateStageResult\([\s\S]*?\n        \}/)[0],scope);
test('actual scoring reproduces the user screenshot: 95%, 95 inputs, combo 50, 10526 points, one star and B',()=>{
 const judge=scope.buildJudgeScore(5596,95,50,95);assert.equal(judge.total,10526);
 assert.equal(judge.accScore,2470);assert.equal(judge.comboScore,1700);assert.equal(judge.typedScore,760);
 const rating=scope.evaluateStageResult(1,judge.total,95,50,95);assert.equal(rating.stars,1);assert.equal(rating.grade,'B');assert.equal(rating.tiers[1]-judge.total,474);
});
