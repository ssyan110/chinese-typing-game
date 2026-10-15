// One shuffled pass through distinct vocabulary items before any answer repeats.
function createVocabularyDeck(tokens,random=Math.random){
 const unique=[...new Map(tokens.map(token=>[token.hanzi||token.text,token])).values()];
 let remaining=[],last='';
 function refill(){
  remaining=[...unique];
  for(let i=remaining.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[remaining[i],remaining[j]]=[remaining[j],remaining[i]];}
  if(remaining.length>1&&remaining[0].text===last){[remaining[0],remaining[1]]=[remaining[1],remaining[0]];}
 }
 return {next(excluded=[]){
  if(!unique.length)return null;
  if(!remaining.length)refill();
  const blocked=new Set(excluded);
  let index=remaining.findIndex(token=>!blocked.has(token.text)&&token.text!==last);
  if(index<0)index=remaining.findIndex(token=>!blocked.has(token.text));
  // If all remaining words are still on screen, wait until one has been answered.
  if(index<0)return null;
  const [token]=remaining.splice(index,1);last=token.text;return token;
 }};
}
