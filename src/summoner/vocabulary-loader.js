export const VOCABULARY_LEVELS={hsk:['1','2','3','4','5','6','7-9'],tocfl:['N1','N2','A1','A2','B1','B2','C1']};

// Cache pending requests too: rapid level changes must not download a level twice.
export function createVocabularyLoader(fetcher){
 const cache=new Map();
 function get(system,level){
  const path=`data/levels/${system}/${level}.json`;
  if(!cache.has(path)){
   const pending=Promise.resolve().then(()=>fetcher(path)).then(async response=>{
    if(!response.ok)throw Error('HTTP '+response.status);
    const rows=await response.json();if(!Array.isArray(rows))throw Error('Invalid vocabulary');return rows;
   }).catch(error=>{cache.delete(path);throw error;});
   cache.set(path,pending);
  }
  return cache.get(path);
 }
 return async(system,level,cumulative)=>{
  const levels=VOCABULARY_LEVELS[system],index=levels?.indexOf(level)??-1;
  if(index<0)throw Error('Unknown vocabulary level');
  return (await Promise.all((cumulative?levels.slice(0,index+1):[level]).map(value=>get(system,value)))).flat();
 };
}
