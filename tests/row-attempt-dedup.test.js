import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const adapter=fs.readFileSync(new URL('../src/reference/adapter.js',import.meta.url),'utf8');
const handler=adapter.slice(adapter.indexOf('handleChineseWordComboImeInput=function(confirm=false)'),adapter.indexOf('const nativeTopPrompt='));
const input=fs.readFileSync(new URL('../src/reference/input-state.js',import.meta.url),'utf8');
test('confirming the same wrong row draft cannot double-charge HP; editing starts a new attempt',()=>{
 const state={game:{imeComposing:false,mode:'playing',stageData:{rowTokens:{a:{text:'水'}},objects:[{char:'a',y:10}]}},el:{imeInput:{value:'錯'}},isChineseTypingStage:()=>true,getStage:()=>({mechanic:'homefall'}),recordWordStat(){},recordAttempt(){},setTypingStatus(){},charged:0};
 state.softMistake=()=>state.charged++;vm.createContext(state);vm.runInContext(input+'\n'+handler,state);
 state.handleChineseWordComboImeInput();state.handleChineseWordComboImeInput(true);state.handleChineseWordComboImeInput(true);assert.equal(state.charged,1);
 state.el.imeInput.value='';state.handleChineseWordComboImeInput();state.el.imeInput.value='錯';state.handleChineseWordComboImeInput();assert.equal(state.charged,2);
 state.el.imeInput.value='別';state.handleChineseWordComboImeInput();assert.equal(state.charged,3);
});
