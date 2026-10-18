import {THEME_WORDS,STATIONS,PUZZLES} from './story-data.js';
import {wordLabel,isCompleted} from './curriculum.js';
export const storyKey=s=>[s.mode,s.system,s.level,s.cumulative?'all':'level'].join(':');
export const emptyStory=()=>({version:1,courses:{}});
export function allocateStoryWords({pool,station,mode,scope,progress,practice={},records=[],used=[]}){
 const chosen=[],seen=new Set(),prior=new Set(used),weak=new Map();
 for(const r of records)if(r.selection?.mode===mode&&`${r.selection.mode}:${r.selection.system}`===scope)for(const w of r.rows||[])if(w.wrong)weak.set(w.id,(weak.get(w.id)||0)+w.wrong);
 const ordered=[...pool].sort((a,b)=>Number(prior.has(a.id))-Number(prior.has(b.id)));
 const add=(words,n,role)=>{for(const word of words){if(n<=0||chosen.length===8)break;if(seen.has(word.id))continue;seen.add(word.id);chosen.push({word,role});n--;}};
 add(ordered.filter(w=>THEME_WORDS[w.s]?.theme===station),4,'theme');
 add(ordered.filter(w=>!isCompleted(progress,scope,w,mode)&&!weak.has(w.id)&&!practice[scope]?.[w.id]),2,'course');
 const review=ordered.filter(w=>weak.has(w.id)||practice[scope]?.[w.id]).sort((a,b)=>(weak.get(b.id)||0)-(weak.get(a.id)||0));
 add(review,2,'review');
 add(ordered.filter(w=>THEME_WORDS[w.s]?.theme===station),8-chosen.length,'theme');
 add(ordered,8-chosen.length,'course');
 return chosen;
}
export function newRun(items){return {ids:items.map(x=>x.word.id),roles:items.map(x=>x.role),cursor:0,puzzle:0,counts:{},mistakes:{},wrong:0,hints:0,recall:0,choices:0,hp:100,done:false,completed:false,dirty:false,hinted:false};}
export function runPhase(run){return Math.min(2,Math.floor(run.cursor/run.ids.length));}
export function currentWord(run,words){
 if(run.cursor<run.ids.length*3)return words[run.cursor%words.length];
 const start=(run.cursor-run.ids.length*3)%words.length;
 for(let n=0;n<words.length;n++){const w=words[(start+n)%words.length];if((run.counts[w.id]||0)<3)return w;}
 return null;
}
export const needsPuzzle=run=>!run.done&&run.puzzle<=runPhase(run);
export function answerPuzzle(run,station,index){
 if(!needsPuzzle(run))return false;
 const correct=PUZZLES[station][run.puzzle].answer===index;
 if(correct){run.puzzle++;run.choices++;}else run.wrong++;
 return correct;
}
export function recallEligible(word,words,mode){
 const meaning=THEME_WORDS[word.s]?.vi;if(!meaning)return false;
 return new Set(words.filter(w=>THEME_WORDS[w.s]?.vi===meaning).map(w=>wordLabel(w,mode))).size===1;
}
export function answerWord(run,word,mode,value,station,{recallAllowed=true}={}){
 if(run.done||run.hp<=0||needsPuzzle(run))return {accepted:false};
 if(String(value).normalize('NFC').replace(/\s/g,'')!==wordLabel(word,mode)){
  if(!run.dirty&&station==='bamboo')run.hp=Math.max(0,run.hp-12);
  run.dirty=true;run.wrong++;run.mistakes[word.id]=(run.mistakes[word.id]||0)+1;return {accepted:false};
 }
 const clean=!run.dirty,recall=runPhase(run)===1&&recallAllowed&&!!THEME_WORDS[word.s]&&!run.hinted&&clean;
 if(clean){run.counts[word.id]=Math.min(3,(run.counts[word.id]||0)+1);if(recall)run.recall++;if(station==='bamboo')run.hp=Math.min(100,run.hp+2);}
 run.cursor++;run.dirty=false;run.hinted=false;
 run.done=run.puzzle===3&&run.ids.every(id=>run.counts[id]===3);
 if(run.done)run.completed=true;
 return {accepted:true,credited:clean,recall,done:run.done};
}
// Optional save extension: old v1 backups remain valid and gain an empty journey on load.
export function validStory(value){
 if(!value||value.version!==1||!value.courses||typeof value.courses!=='object'||Array.isArray(value.courses))return false;
 const courses=Object.entries(value.courses);if(courses.length>100)return false;
 return courses.every(([key,course])=>{
  if(!/^(simplified|traditional|zhuyin):(hsk|tocfl):(1|2|3|4|5|6|7-9|N1|N2|A1|A2|B1|B2|C1):(all|level)$/.test(key)||!course||typeof course!=='object'||Array.isArray(course))return false;
  return Object.entries(course).every(([id,r])=>{
   if(!STATIONS.some(s=>s.id===id)||!r||!Array.isArray(r.ids)||!r.ids.length||r.ids.length>8||new Set(r.ids).size!==r.ids.length||r.ids.some(id=>typeof id!=='string'||!id||id.length>=100))return false;
   if(!Array.isArray(r.roles)||r.roles.length!==r.ids.length||r.roles.some(x=>!['theme','course','review'].includes(x)))return false;
   if(!r.mistakes||typeof r.mistakes!=='object'||Array.isArray(r.mistakes)||Object.entries(r.mistakes).some(([id,n])=>!r.ids.includes(id)||!Number.isInteger(n)||n<0||n>1_000_000))return false;
   if(!r.counts||typeof r.counts!=='object'||Array.isArray(r.counts)||Object.entries(r.counts).some(([id,n])=>!r.ids.includes(id)||!Number.isInteger(n)||n<1||n>3))return false;
   if(['cursor','puzzle','wrong','hints','recall','choices','hp'].some(k=>!Number.isInteger(r[k])||r[k]<0||r[k]>1_000_000)||r.hp>100||r.puzzle>3)return false;
   if(['done','completed','dirty','hinted'].some(k=>typeof r[k]!=='boolean'))return false;
   return !r.done||(r.puzzle===3&&r.ids.every(id=>r.counts[id]===3));
  });
 });
}
