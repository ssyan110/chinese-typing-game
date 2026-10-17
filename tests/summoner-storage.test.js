import test from 'node:test';
import assert from 'node:assert/strict';
import {createSaveStore,emptySave,SAVE_KEY} from '../src/summoner/storage.js';
function fixture(){
 const data=new Map();let held=false,denied=false;
 const storage={getItem:key=>data.get(key)??null,setItem(key,value){if(denied)throw Error('QuotaExceededError');data.set(key,value);}};
 const locks={async request(name,options,fn){if(held)return fn(null);held=true;try{return await fn({name});}finally{held=false;}}};
 return {storage,locks,data,deny:()=>{denied=true;}};
}
const record=id=>({id,scope:'simplified:hsk',kind:'duel',at:'2026-10-17T00:00:00Z'});
test('two tabs cannot overwrite history and the next writer reloads deletions',async()=>{
 const env=fixture(),a=createSaveStore(env),b=createSaveStore(env);
 assert.equal(await a.acquire(),true);assert.equal(await b.acquire(),false);
 assert.throws(()=>b.save({...emptySave(),records:[record('b')]}));
 a.save({...emptySave(),records:[record('a')]});a.release();await new Promise(resolve=>setImmediate(resolve));
 assert.equal(await b.acquire(),true);const saved=b.load();saved.records.push(record('b'));b.save(saved);
 assert.deepEqual(b.load().records.map(r=>r.id),['a','b']);
 b.save({...saved,records:saved.records.filter(r=>r.id!=='a')});b.release();await new Promise(resolve=>setImmediate(resolve));
 assert.equal(await a.acquire(),true);assert.deepEqual(a.load().records.map(r=>r.id),['b']);a.release();
});
test('progress, partial practice and history remain one prior snapshot on quota failure',async()=>{
 const env=fixture(),store=createSaveStore(env);await store.acquire();const previous=emptySave();previous.records=[record('a')];store.save(previous);env.deny();
 assert.throws(()=>store.save({...emptySave(),progress:{version:1,scopes:{'simplified:hsk':{word:'字'}}}}));assert.deepEqual(store.load(),previous);store.release();
});
test('legacy save migrates without erasing originals; corruption is reported',async()=>{
 const env=fixture();env.data.set('tulinh.records.v1',JSON.stringify([record('old')]));const store=createSaveStore(env);await store.acquire();store.save(store.load());assert.equal(store.load().records[0].id,'old');assert.ok(env.data.has('tulinh.records.v1'));
 env.data.set(SAVE_KEY,'{broken');assert.throws(()=>store.load());assert.equal(env.data.get(SAVE_KEY),'{broken');store.release();
});
test('unsupported locking fails closed instead of silently risking overwrite',async()=>{
 const store=createSaveStore({storage:fixture().storage});assert.equal(await store.acquire(),false);assert.equal(store.status().error,'unsupported');assert.throws(()=>store.save(emptySave()));
});

test('backup round trip preserves progress, repetitions, history and completed challenges',async()=>{
 const {exportBackup,parseBackup}=await import('../src/summoner/storage.js');
 const snapshot={version:1,progress:{version:1,scopes:{'simplified:hsk':{word:'字'}},challenges:{'simplified:hsk|[["word","字"]]':123}},practice:{'traditional:tocfl':{word:{label:'愛',count:2}}},records:[{...record('a'),selection:{mode:'simplified',system:'hsk',level:'1',cumulative:true},rows:[{id:'word',label:'字',correct:3,wrong:0,missed:0,shown:3}]}]};
 assert.deepEqual(parseBackup(exportBackup(snapshot)),snapshot);
});
test('backup import rejects corrupt, oversized, invalid navigation and polluted input without changing stored save',async()=>{
 const {exportBackup,parseBackup}=await import('../src/summoner/storage.js');const env=fixture(),store=createSaveStore(env);await store.acquire();store.save(emptySave());const before=env.data.get(SAVE_KEY);
 for(const text of ['{broken','x'.repeat(5_000_001),JSON.stringify({format:'wrong',version:1,data:emptySave()}),exportBackup(emptySave()).replace('"scopes": {}','"scopes": {"other": {}}'),JSON.stringify({format:'tulinh-backup',version:1,data:{...emptySave(),records:[{...record('bad'),selection:{mode:'evil',system:'hsk',level:'1',cumulative:true}}]}}),'{"format":"tulinh-backup","version":1,"data":{"version":1,"progress":{"version":1,"scopes":{"__proto__":{}}},"practice":{},"records":[]}}'])assert.throws(()=>parseBackup(text));
 assert.equal(env.data.get(SAVE_KEY),before);store.release();
});

test('canonical corruption never silently resets or overwrites durable progress',async()=>{
 const env=fixture(),store=createSaveStore(env);await store.acquire();
 for(const broken of [{...emptySave(),version:99},{...emptySave(),progress:{version:99,scopes:{}}},{...emptySave(),progress:{version:1,scopes:[]}},{...emptySave(),practice:[]},{...emptySave(),records:[{scope:'x',kind:'duel',at:'invalid'}]},{...emptySave(),practice:{'simplified:hsk':{word:{label:'字',count:99}}}}]){
  const bytes=JSON.stringify(broken);env.data.set(SAVE_KEY,bytes);assert.throws(()=>store.load());assert.throws(()=>store.save(broken));assert.equal(env.data.get(SAVE_KEY),bytes);
 }
 store.release();
});
test('pagehide cancels pending acquisition and cannot retain a writer lock',async()=>{
 let dispatch;const env=fixture();const delayedLocks={request:async(name,options,callback)=>{await new Promise(resolve=>{dispatch=resolve;});return env.locks.request(name,options,callback);}};
 const hidden=createSaveStore({...env,locks:delayedLocks});const pending=hidden.acquire();hidden.release();dispatch();assert.equal(await pending,false);assert.equal(hidden.status().writable,false);
 const visible=createSaveStore(env);assert.equal(await visible.acquire(),true);visible.save(emptySave());visible.release();
});
