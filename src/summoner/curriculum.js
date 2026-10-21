// Stable, exhaustive chapters. Completion means a correct answer, never exposure alone.
export const CHAPTER_SIZE=20;
export const FIRST_CHAPTER_SIZE=15;
export const wordLabel=(word,mode)=>String(mode==='zhuyin'?word.z:mode==='traditional'?word.t:word.s).normalize('NFC').replace(/\s/g,'');
export const progressScope=(mode,system)=>`${mode}:${system}`;
export function readProgress(value){
 if(!value||value.version!==1||!value.scopes||typeof value.scopes!=='object'||Array.isArray(value.scopes))return {version:1,scopes:{}};
 const scopes={};for(const [scope,entries]of Object.entries(value.scopes)){if(entries&&typeof entries==='object'&&!Array.isArray(entries))scopes[scope]=Object.fromEntries(Object.entries(entries).filter(([id,label])=>id.length<100&&typeof label==='string'&&label.length<200));}const result={version:1,scopes};if(value.challenges&&typeof value.challenges==='object'&&!Array.isArray(value.challenges))result.challenges=Object.fromEntries(Object.entries(value.challenges).filter(([key,at])=>key.length<4000&&Number.isFinite(at)&&at>0));return result;
}
export function isCompleted(progress,scope,word,mode){return progress.scopes[scope]?.[word.id]===wordLabel(word,mode);}
export function markCompleted(progress,scope,word,mode){progress.scopes[scope]??={};progress.scopes[scope][word.id]=wordLabel(word,mode);}
export function chaptersFor(words,mode,progress,scope){
 const chapters=[];for(let start=0;start<words.length;){const size=start===0?FIRST_CHAPTER_SIZE:CHAPTER_SIZE,items=words.slice(start,start+size),remaining=items.filter(w=>!isCompleted(progress,scope,w,mode));chapters.push({number:chapters.length+1,words:items,remaining,done:items.length-remaining.length,encounter:['guardian','moth','sentinel'][chapters.length%3]});start+=size;}return chapters;
}

const chapterKey=(scope,words,mode)=>scope+'|'+JSON.stringify(words.map(w=>[w.id,wordLabel(w,mode)]));
export function hasChapterWon(progress,scope,words,mode){
 if(progress.challenges?.[chapterKey(scope,words,mode)])return true;
 // Chapter boundaries changed from 20/20 to 15/20. Keep victories whose
 // vocabulary was covered by previously won chapters, without treating mere
 // vocabulary exposure as a victory.
 const covered=new Set();for(const key of Object.keys(progress.challenges||{})){
  if(!key.startsWith(scope+'|'))continue;
  try{for(const pair of JSON.parse(key.slice(scope.length+1)))if(Array.isArray(pair)&&pair.length===2)covered.add(JSON.stringify(pair));}catch{}
 }
 return words.length>0&&words.every(w=>covered.has(JSON.stringify([w.id,wordLabel(w,mode)])));
}
export function markChapterWon(progress,scope,words,mode){progress.challenges??={};progress.challenges[chapterKey(scope,words,mode)]=Date.now();}
