import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(new URL('..',import.meta.url).pathname);
const base=process.env.SITE_BASE||'/chinese-typing-game/';
if(!/^\/[a-zA-Z0-9_-]+\/$/.test(base))throw Error('Expected one repository path');
const dist=path.join(root,'dist');
if(!fs.existsSync(path.join(dist,'index.html')))throw Error('Build the independent application first');
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);if(entry.isDirectory())walk(p);else if(/\.(html|css|js)$/.test(p)){const text=fs.readFileSync(p,'utf8').replace(/(["'(])\/(assets|original|data)\//g,(_,q,kind)=>q+base+kind+'/').replaceAll('href="/favicon.svg"','href="'+base+'favicon.svg"');fs.writeFileSync(p,text);}}}
walk(dist);fs.writeFileSync(path.join(dist,'.nojekyll'),'');console.log('Prepared independent application for',base);
