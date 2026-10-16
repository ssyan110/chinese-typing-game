// History contains navigation choices, never a second copy of the live duel.
export function installNavigation({capture,restore,blocked,onBlocked}){
 const session='tulinh-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2),entries=[{route:'modes',data:capture()}];let index=0,restoring=false,bouncing=false,revision=0;
 const state=()=>({tulinhNavigation:session,index,...entries[index]});
 history.replaceState(state(),'');
 function remember(){if(restoring)return;entries[index].data=capture();history.replaceState(state(),'');}
 function visit(route){
  if(restoring)return true;
  if(entries[index].route===route){remember();return true;}
  const ancestor=entries.slice(0,index).findLastIndex(e=>e.route===route);
  if(ancestor>=0){history.go(ancestor-index);return false;}
  const entry={route,data:capture()};
  if(['battle','result'].includes(route)&&['battle','result'].includes(entries[index].route)){entries[index]=entry;history.replaceState(state(),'');}
  else{entries.splice(index+1);entries.push(entry);index++;history.pushState(state(),'');}
  return true;
 }
 window.addEventListener('popstate',async event=>{
  const target=event.state;
  if(target?.tulinhNavigation!==session)return;
  if(bouncing){if(target.index===index)bouncing=false;else history.go(index-target.index);return;}
  if(blocked()&&target.index!==index){bouncing=true;onBlocked();history.go(index-target.index);return;}
  if(target.index<index&&target.index>0&&target.route===entries[index].route){index=target.index;history.back();return;}
  index=target.index;const route=['battle','result'].includes(target.route)?'lobby':target.route;entries[index]={route,data:target.data};if(route!==target.route)history.replaceState(state(),'');const token=++revision;restoring=true;
  try{await restore(route,target.data,()=>revision===token);}finally{if(revision===token)restoring=false;}
 });
 function back(){if(blocked()){onBlocked();return;}const parent=entries.slice(0,index).findLastIndex(e=>e.route!==entries[index].route);if(parent>=0)history.go(parent-index);}
 return {visit,remember,back};
}
