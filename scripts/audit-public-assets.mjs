import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(new URL('..',import.meta.url).pathname);
const maps=['art','audio'].map(kind=>JSON.parse(fs.readFileSync(path.join(root,'public/original/'+kind+'-map.json'),'utf8')));
const expected=new Set(maps.flatMap(map=>Object.values(map)));
for(const file of expected)if(!fs.existsSync(path.join(root,'dist',file)))throw Error('Missing original media in deployment: '+file);
for(const folder of ['assets','audio','fonts'])if(fs.existsSync(path.join(root,'dist/game',folder)))throw Error('Archived media must not ship: '+folder);
for(const name of ['index.html','game/runtime.js','game/adaptation.css','game/bubble-mode.css','game/original-theme.css']){
 const text=fs.readFileSync(path.join(root,'dist',name),'utf8');
 if(/(?:\/game\/|["'`(])(?:assets|audio|fonts)\//.test(text))throw Error('Unmapped archived media reference in '+name);
}
console.log('Public-media audit passed:',expected.size,'original asset replacements; no archived media shipped.');
