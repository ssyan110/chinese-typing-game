import {readProgress} from './curriculum.js';
import {readPractice,readRecords} from './history.js';

export const SAVE_KEY='tulinh.save.v1';
const LOCK_NAME='tulinh.save.writer.v1';
const empty=()=>({version:1,progress:readProgress(null),practice:{},records:[]});
function sanitize(value){
 return {version:1,progress:readProgress(value.progress),practice:readPractice(value.practice),records:readRecords(value.records)};
}
const validate=value=>checkBackupData(value);

// One tab owns writes for its lifetime. Never emulate this with a localStorage
// lease: read/modify/write of a lease is itself vulnerable to concurrent tabs.
export function createSaveStore({storage,locks,onChange=()=>{}}={}){
 let writable=false,releaseLock=null,acquiring=null,error=null,generation=0;
 const status=()=>({writable,error});
 const notify=()=>onChange(status());
 function load(){
  const raw=storage.getItem(SAVE_KEY);
  if(raw!==null)return validate(JSON.parse(raw));
  const read=(key,fallback)=>{const value=storage.getItem(key);return value===null?fallback:JSON.parse(value);};
  return {version:1,progress:readProgress(read('tulinh.progress.v1',null)),practice:readPractice(read('tulinh.practice.v1',null)),records:readRecords(read('tulinh.records.v1',null))};
 }
 async function acquire(){
  if(writable)return true;
  if(acquiring)return acquiring;
  if(!locks?.request){error='unsupported';notify();return false;}
  const requestGeneration=generation;
  const pending=new Promise(resolve=>{
   locks.request(LOCK_NAME,{mode:'exclusive',ifAvailable:true},async lock=>{
    if(requestGeneration!==generation){resolve(false);return;}
    if(!lock){error='busy';notify();resolve(false);return;}
    writable=true;error=null;
    await new Promise(release=>{releaseLock=release;notify();resolve(true);});
   }).catch(()=>{if(requestGeneration===generation){writable=false;error='unavailable';notify();}resolve(false);});
  });
  acquiring=pending;
  try{return await pending;}finally{if(acquiring===pending)acquiring=null;}
 }
 function save(value){
  if(!writable)throw new Error('Save is owned by another tab or unavailable');
  const data=validate({version:1,...value});
  // A single setItem is atomic: quota denial preserves the preceding snapshot.
  storage.setItem(SAVE_KEY,JSON.stringify(data));
  return data;
 }
 function release(){generation++;acquiring=null;writable=false;releaseLock?.();releaseLock=null;notify();}
 return {acquire,release,load,save,status};
}
export {empty as emptySave};

const object=value=>value!==null&&typeof value==='object'&&!Array.isArray(value);
const validScope=scope=>/^(simplified|traditional|zhuyin):(hsk|tocfl)$/.test(scope);
function checkBackupData(data){
 const fail=()=>{throw new Error('Invalid backup data');};
 if(!object(data)||Object.keys(data).some(key=>!['version','progress','practice','records'].includes(key)))fail();
 if(data.version!==1||!object(data.progress)||data.progress.version!==1||!object(data.progress.scopes)||!object(data.practice)||!Array.isArray(data.records)||data.records.length>128)fail();
 const forbidden=new Set(['__proto__','constructor','prototype']);
 function checkTree(value,depth=0){if(depth>12)fail();if(Array.isArray(value)){for(const entry of value)checkTree(entry,depth+1);}else if(object(value)){for(const [key,entry]of Object.entries(value)){if(forbidden.has(key))fail();checkTree(entry,depth+1);}}else if(typeof value==='number'&&!Number.isFinite(value))fail();}
 checkTree(data);
 for(const [scope,entries]of Object.entries(data.progress.scopes)){
  if(!validScope(scope)||!object(entries))fail();
  for(const [id,label]of Object.entries(entries))if(!id||id.length>=100||typeof label!=='string'||!label||label.length>=200)fail();
 }
 if(data.progress.challenges!==undefined){if(!object(data.progress.challenges))fail();for(const [key,at]of Object.entries(data.progress.challenges))if(!key.includes('|')||!validScope(key.split('|')[0])||key.length>=4000||!Number.isFinite(at)||at<=0)fail();}
 for(const [scope,entries]of Object.entries(data.practice)){
  if(!validScope(scope)||!object(entries))fail();
  for(const [id,entry]of Object.entries(entries))if(!id||id.length>=100||!object(entry)||typeof entry.label!=='string'||!entry.label||entry.label.length>=200||![1,2].includes(entry.count))fail();
 }
 for(const record of data.records){
  if(!object(record)||typeof record.scope!=='string'||!record.scope||!['campaign','duel','review','endless'].includes(record.kind)||typeof record.at!=='string'||!Number.isFinite(Date.parse(record.at)))fail();
  if(record.id!==undefined&&(typeof record.id!=='string'||!record.id||record.id.length>200))fail();
  if(record.status!==undefined&&!['playing','paused','ready','reward','won','lost','ended'].includes(record.status))fail();
  for(const key of ['score','accuracy','correct','errors','misses','elapsed','combo','practiceDone','practiceTotal'])if(record[key]!==undefined&&(!Number.isFinite(record[key])||record[key]<0))fail();
  if(record.selection!==undefined){const s=record.selection;if(!object(s)||!validScope(`${s.mode}:${s.system}`)||typeof s.cumulative!=='boolean'||!(s.system==='hsk'?['1','2','3','4','5','6','7-9']:['N1','N2','A1','A2','B1','B2','C1']).includes(s.level))fail();}
  if(record.rows!==undefined){if(!Array.isArray(record.rows)||record.rows.length>20000)fail();for(const row of record.rows){if(!object(row)||typeof row.id!=='string'||typeof row.label!=='string')fail();for(const key of ['correct','wrong','missed','shown'])if(row[key]!==undefined&&(!Number.isInteger(row[key])||row[key]<0))fail();}}
 }
 return sanitize(data);
}
export function exportBackup(snapshot){
 const data=checkBackupData({version:1,...snapshot});
 return JSON.stringify({format:'tulinh-backup',version:1,data},null,2);
}
export function parseBackup(text){
 if(typeof text!=='string'||text.length>5_000_000)throw new Error('Backup is too large');
 const backup=JSON.parse(text);
 if(!object(backup)||backup.format!=='tulinh-backup'||backup.version!==1)throw new Error('Unsupported backup');
 return checkBackupData(backup.data);
}
