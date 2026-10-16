import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('the local launcher has embedded styling and a complete online destination, with no broken app imports',()=>{
 const html=read('src/summoner/shell.html');assert.match(html,/<style>/);assert.match(html,/<meta http-equiv="refresh"/);assert.match(html,/https:\/\/ssyan110\.github\.io\/chinese-typing-game\//);assert.doesNotMatch(html,/<script[^>]+src=|<link[^>]+stylesheet|<img|type="module"/);
});
test('opening the root source HTML as a file redirects before application resources load',()=>{
 const html=read('index.html');const guard=html.indexOf('location.protocol===\'file:\'');assert.ok(guard>0);assert.ok(guard<html.indexOf('rel="stylesheet"'));assert.ok(guard<html.indexOf('type="module"'));assert.match(html,/launch=local-v2/);
});
