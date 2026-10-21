import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
export function splitVocabulary(rows){
 const groups=new Map();for(const row of rows){if(!groups.has(row.level))groups.set(row.level,[]);groups.get(row.level).push(row);}return groups;
}
export function writeVocabularyLevels(){
 const root=new URL('../public/data/',import.meta.url);
 for(const system of ['hsk','tocfl']){
  const rows=JSON.parse(fs.readFileSync(new URL(system+'.json',root),'utf8'));
  const destination=new URL('levels/'+system+'/',root);fs.mkdirSync(destination,{recursive:true});
  for(const [level,words]of splitVocabulary(rows)){
   if(!/^[A-Za-z0-9-]+$/.test(level))throw Error('Invalid vocabulary level');
   fs.writeFileSync(new URL(level+'.json',destination),JSON.stringify(words));
  }
 }
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))writeVocabularyLevels();
