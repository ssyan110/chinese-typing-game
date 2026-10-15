import fs from 'node:fs';
import crypto from 'node:crypto';
import { parse } from 'csv-parse/sync';
import * as OpenCC from 'opencc-js';
import { p2z } from 'pinyin-to-zhuyin';
const root = new URL('../', import.meta.url);
const read = name => fs.readFileSync(new URL(`data/upstream/${name}`, root), 'utf8');
const convert = OpenCC.Converter({from:'cn',to:'tw'});
const keymap = {'ㄅ':'1','ㄆ':'q','ㄇ':'a','ㄈ':'z','ㄉ':'2','ㄊ':'w','ㄋ':'s','ㄌ':'x','ㄍ':'e','ㄎ':'d','ㄏ':'c','ㄐ':'r','ㄑ':'f','ㄒ':'v','ㄓ':'5','ㄔ':'t','ㄕ':'g','ㄖ':'b','ㄗ':'y','ㄘ':'h','ㄙ':'n','ㄧ':'u','ㄨ':'j','ㄩ':'m','ㄚ':'8','ㄛ':'i','ㄜ':'k','ㄝ':',','ㄞ':'9','ㄟ':'o','ㄠ':'l','ㄡ':'.','ㄢ':'0','ㄣ':'p','ㄤ':';','ㄥ':'/','ㄦ':'-','ˇ':'3','ˋ':'4','ˊ':'6','˙':'7'};
function entry(id, level, s, t, p) {
  const z = p2z(p.toLowerCase().split("/")[0].replace(/-/g," ").replace(/’/g,"'"), {tonemarks:true,inputHasToneMarks:true}).replace(/\s+/g,' ').trim();
  const symbols = [...z.replace(/\s/g,'')];
  const keys = symbols.every(c=>keymap[c]) ? symbols.map(c=>keymap[c]).join('') : '';
  return {id,level,s,t,p,z:keys ? z : '',keys};
}
const hsk = JSON.parse(read('hsk-2025.json')).map(r=>entry(`hsk-${r.id}`,r.level,r.hanzi,convert(r.hanzi),r.pinyin));
const rows = parse(read('tocfl-202307.csv'), {columns:true,skip_empty_lines:true,bom:true});
const tocfl = rows.map(r=>{
  const variants = r.Variants ? JSON.parse(r.Variants) : [];
  const v = variants[0] || r;
  const level = r.ID.startsWith('L0-1')?'N1':r.ID.startsWith('L0-2')?'N2':({'1':'A1','2':'A2','3':'B1','4':'B2','5':'C1'})[r.ID[1]];
  return entry(r.ID,level,v.Simplified,v.Traditional,v.Pinyin);
});
const valid = list=>list.filter(r=>r.level && /^[\p{Script=Han}]+$/u.test(r.s) && /^[\p{Script=Han}]+$/u.test(r.t));
fs.mkdirSync(new URL('public/data/',root),{recursive:true});
const manifest = {generated:'2026-10-15',sources:[
  {id:'hsk',label:'HSK 3.0 · Đề cương 11/2025',url:'https://github.com/uranbekanarbaev/hsk-3.0-vocabulary-dataset',official:'https://www.chinesetest.cn/',edition:'2025-11',rawCount:hsk.length,playableCount:valid(hsk).length,zhuyinCount:valid(hsk).filter(x=>x.keys).length,note:'HSK 7–9 dùng chung một danh sách nâng cao. Chữ phồn thể được chuyển bằng OpenCC; chú âm được chuyển từ pinyin của nguồn.'},
  {id:'tocfl',label:'TOCFL · Danh sách 07/2023',url:'https://github.com/ivankra/tocfl',official:'https://tocfl.edu.tw/tocfl/index.php/teach/download',edition:'2023-07',rawCount:tocfl.length,playableCount:valid(tocfl).length,zhuyinCount:valid(tocfl).filter(x=>x.keys).length,note:'Hai bậc dự bị, A1, A2, B1, B2 và bậc lưu loát C1–C2 dùng chung. Không tách riêng C2 khi nguồn không có danh sách riêng.'}
], hashes:Object.fromEntries(['hsk-2025.json','tocfl-202307.csv'].map(n=>[n,crypto.createHash('sha256').update(read(n)).digest('hex')])),levels:{}};
for (const [name,list] of [['hsk',valid(hsk)],['tocfl',valid(tocfl)]]) {
 fs.writeFileSync(new URL(`public/data/${name}.json`,root),JSON.stringify(list));
 manifest.levels[name]=Object.fromEntries([...new Set(list.map(r=>r.level))].map(l=>[l,{words:list.filter(r=>r.level===l).length,zhuyin:list.filter(r=>r.level===l&&r.keys).length}]));
}
fs.writeFileSync(new URL('public/data/manifest.json',root),JSON.stringify(manifest,null,2));
console.log(JSON.stringify(manifest,null,2));
