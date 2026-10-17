import fs from 'node:fs';
const root=new URL('../',import.meta.url);
for(const name of ['data','original/brand','original/fonts','original/audio','original/art/refined','original/art/skills','original/art/chapters'])fs.cpSync(new URL('public/'+name,root),new URL('dist/'+name,root),{recursive:true});
fs.copyFileSync(new URL('public/original/brand/favicon.svg',root),new URL('dist/favicon.svg',root));
for(const name of ['tulinh-mark.svg','tulinh-logo.svg','tulinh-logo.png'])fs.copyFileSync(new URL('public/original/art/'+name,root),new URL('dist/original/art/'+name,root));
const files=[];function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=new URL(e.name+(e.isDirectory()?'/':''),dir);if(e.isDirectory())walk(p);else if(/\.(html|css|js)$/.test(e.name))files.push(p);}}walk(new URL('dist/',root));
for(const p of files){const text=fs.readFileSync(p,'utf8');if(/TypeGameWuxia|reference-game|\/game\/runtime|src\/reference|nativeHanzi|stage2NextPrompt/.test(text))throw Error('Legacy runtime leaked into independent build: '+p);}
if(fs.existsSync(new URL('dist/game/',root)))throw Error('Legacy game directory must not ship');
console.log('Independent summoner build verified; only selected original media and vocabulary staged.');
