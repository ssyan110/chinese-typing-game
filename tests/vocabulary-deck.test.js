import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const scope=vm.createContext({});vm.runInContext(fs.readFileSync(new URL('../src/reference/vocabulary-deck.js',import.meta.url),'utf8'),scope);
const tokens=Array.from({length:300},(_,i)=>({text:'詞'+i,sourceId:i}));
test('all 300 vocabulary answers appear once per pass, over three passes',()=>{
 const deck=scope.createVocabularyDeck(tokens);let last='';
 for(let pass=0;pass<3;pass++){
  const round=Array.from({length:300},()=>deck.next());assert.equal(new Set(round.map(t=>t.text)).size,300);
  assert.notEqual(round[0].text,last);last=round.at(-1).text;
  assert.ok(round.every(t=>tokens.includes(t)));
 }
});
test('does not show the same displayed answer twice for duplicate database entries',()=>{
 const deck=scope.createVocabularyDeck([{text:'水',sourceId:1},{text:'水',sourceId:2},{text:'水果',sourceId:3}]);
 for(let i=0;i<6;i++){const a=deck.next(),b=deck.next();assert.notEqual(a.text,b.text);}
});
test('concurrent targets are skipped without losing their place in the pass',()=>{
 const deck=scope.createVocabularyDeck([{text:'甲'},{text:'乙'},{text:'丙'}],()=>.999);
 assert.equal(deck.next(['甲']).text,'乙');assert.equal(deck.next(['甲']).text,'丙');
 assert.equal(deck.next(['甲']),null);assert.equal(deck.next().text,'甲');
});
test('empty deck is safe',()=>assert.equal(scope.createVocabularyDeck([]).next(),null));
test('Zhuyin homophones retain different database words',()=>{
 const deck=scope.createVocabularyDeck([{text:'ㄐㄧ',hanzi:'雞',sourceId:1},{text:'ㄐㄧ',hanzi:'機',sourceId:2},{text:'ㄕㄨㄟˇ',hanzi:'水',sourceId:3}]);
 assert.equal(new Set(Array.from({length:3},()=>deck.next().sourceId)).size,3);
});
