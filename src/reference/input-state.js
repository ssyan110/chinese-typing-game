// Owns committed Hanzi matching, independently of rendering or IME event order.
function assessRowInput(raw, available, known, confirm=false) {
 const text=String(raw||'').normalize('NFC').replace(/[\s\u3000]/g,'');
 if(!text)return {kind:'empty',text};
 const exact=available.find(([,token])=>token.text===text);
 if(exact){
  const longer=known.some(([,token])=>token.text.length>text.length&&token.text.startsWith(text));
  return longer&&!confirm?{kind:'confirm',text,key:exact[0]}:{kind:'match',text,key:exact[0]};
 }
 if(available.some(([,token])=>token.text.startsWith(text)))return {kind:'partial',text};
 if(known.some(([,token])=>token.text===text))return {kind:'unavailable',text};
 if(known.some(([,token])=>token.text.startsWith(text)))return {kind:'partial',text};
 // Latin preedit can be emitted before an OS marks composition as active.
 if(!confirm&&!/\p{Script=Han}/u.test(text))return {kind:'preedit',text};
 return {kind:'wrong',text};
}
function rowTargetEntries(data, mechanic){
 if(!data?.rowTokens)return [];
 if(mechanic==='top_anchor')return data.expectedType==='top'&&data.rowTokens[data.expectedKey]?[[data.expectedKey,data.rowTokens[data.expectedKey]]]:[];
 const objects=[...(data.objects||[])].sort((a,b)=>mechanic==='homefall'?b.y-a.y:a.x-b.x);
 return objects.filter(obj=>data.rowTokens[obj.char]).map(obj=>[obj.char,data.rowTokens[obj.char]]);
}
