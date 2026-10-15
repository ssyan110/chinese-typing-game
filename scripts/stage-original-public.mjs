import fs from 'node:fs';
const root=new URL('../',import.meta.url);
// Explicit allowlist: source-game images/audio/fonts never enter the public build.
for(const name of ['data','original'])fs.cpSync(new URL('public/'+name,root),new URL('dist/'+name,root),{recursive:true});
fs.mkdirSync(new URL('dist/game/',root),{recursive:true});
for(const name of ['runtime.js','adaptation.css','bubble-mode.css','original-theme.css'])fs.copyFileSync(new URL('public/game/'+name,root),new URL('dist/game/'+name,root));
fs.copyFileSync(new URL('public/original/art/favicon.svg',root),new URL('dist/favicon.svg',root));
console.log('Staged original-only public media.');
