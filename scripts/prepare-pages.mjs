import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(new URL('..',import.meta.url).pathname);
const base=process.env.SITE_BASE||'/chinese-typing-game/';
if(!/^\/[a-zA-Z0-9_-]+\/$/.test(base))throw Error('Expected a single repository path');
const dist=path.join(root,'dist');
if(!fs.existsSync(path.join(dist,'index.html')))throw Error('Run npm run build first');
function rewrite(file){let data=fs.readFileSync(file,'utf8');data=data.replaceAll('/game/',base+'game/').replaceAll('/data/',base+'data/').replaceAll('/favicon.svg',base+'favicon.svg');fs.writeFileSync(file,data);}
for(const file of ['index.html','game/runtime.js','game/adaptation.css'])rewrite(path.join(dist,file));
fs.writeFileSync(path.join(dist,'.nojekyll'),'');
console.log('Prepared GitHub Pages paths:',base);
