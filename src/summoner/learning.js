// Learning exercises are separate from combat and never unlock chapters.
export const normalizeAnswer=value=>String(value??'').normalize('NFC').replace(/[\s\u3000]/g,'');
export function compareAnswer(expected,actual){
 const target=[...normalizeAnswer(expected)],answer=[...normalizeAnswer(actual)];
 return {target,answer,different:target.map((ch,i)=>ch!==answer[i]?i+1:null).filter(Boolean),extra:answer.length>target.length};
}
const recallDelay=24*60*60*1000;
export function recallSchedule(pool,records,selection){
 if(selection.mode==='zhuyin')return [];
 const latestSuccess=new Map(),firstWarmup=new Map();
 for(const record of records){
  if(record.selection?.mode!==selection.mode||record.selection?.system!==selection.system)continue;
  const at=Date.parse(record.at);if(!Number.isFinite(at))continue;
  for(const row of record.rows||[]){
   if(record.learningTask==='typing-warmup'){
    if(row.shown>0)firstWarmup.set(row.id,Math.min(at,firstWarmup.get(row.id)??Infinity));
   }else if(row.correct>0)latestSuccess.set(row.id,Math.max(at,latestSuccess.get(row.id)??-Infinity));
  }
 }
 return pool.filter(word=>word.p&&(latestSuccess.has(word.id)||firstWarmup.has(word.id)))
  .map(word=>({word,dueAt:(latestSuccess.get(word.id)??firstWarmup.get(word.id))+recallDelay}))
  .sort((a,b)=>a.dueAt-b.dueAt);
}
export function dueRecallWords(pool,records,selection,now=Date.now()){
 return recallSchedule(pool,records,selection).filter(item=>item.dueAt<=now).slice(0,5).map(item=>item.word);
}
export function acceptsRecall(word,input,pool,mode){
 const label=w=>mode==='traditional'?w.t:w.s;
 return pool.some(w=>w.p===word.p&&normalizeAnswer(label(w))===normalizeAnswer(input));
}
export function installLearning({selection,pool,records,saveRecall,ensureStorage,startDefense,startStarterBattle,getResumeChapter,resumeChapter}){
 const panel=document.createElement('section');panel.className='learning-panel';panel.id='learning-panel';
 const heading=document.createElement('h2'),note=document.createElement('p'),tutorial=document.createElement('button'),defense=document.createElement('button'),recall=document.createElement('button');
 heading.textContent='Luyện trước khi vào trận';
 note.textContent='Mới dùng bộ gõ? Thử 3 từ, không tính giờ và không mất HP. Khi vào trận, chọn 8–10 giây nếu bạn cần thêm thời gian. Sau ít nhất 24 giờ, quay lại đây để thử nhớ chữ từ phiên âm của những từ đã nhập đúng.';
 tutorial.id='learning-tutorial';tutorial.textContent='Thử nhập 3 từ';defense.id='learning-defense';defense.textContent='Thử phòng thủ';recall.id='learning-recall';
 for(const button of [tutorial,defense,recall]){button.type='button';button.className='secondary-button';}
 panel.append(heading,note,tutorial,defense,recall);document.getElementById('journey-map').before(panel);
 const dialog=document.createElement('dialog');dialog.id='learning-dialog';dialog.className='learning-dialog';
 const defenseNext=document.createElement('button');defenseNext.type='button';defenseNext.className='secondary-button';defenseNext.textContent='Thử phòng thủ';defenseNext.hidden=true;
 const starter=document.createElement('button'),chapter=document.createElement('button');
 starter.id='learning-starter-battle';chapter.id='learning-resume-chapter';
 for(const action of [starter,chapter]){action.type='button';action.hidden=true;action.className='secondary-button';}
 const title=document.createElement('h2'),instructions=document.createElement('p'),prompt=document.createElement('p'),form=document.createElement('form'),label=document.createElement('label'),input=document.createElement('input'),submit=document.createElement('button'),feedback=document.createElement('p'),next=document.createElement('button'),hint=document.createElement('button'),close=document.createElement('button');
 title.id='learning-title';dialog.setAttribute('aria-labelledby',title.id);prompt.id='learning-prompt';prompt.className='learning-prompt';input.id='learning-input';input.autocomplete='off';label.htmlFor=input.id;label.textContent='Nhập chữ Hán bằng bộ gõ tiếng Trung';submit.type='submit';submit.textContent='Kiểm tra';feedback.id='learning-feedback';feedback.setAttribute('role','status');
 next.textContent='Từ tiếp theo';hint.textContent='Xem chữ gợi ý';close.textContent='Về lộ trình';
 for(const button of [next,hint,close]){button.type='button';button.className='secondary-button';}
 submit.className='primary-button';form.append(label,input,submit);dialog.append(title,instructions,prompt,form,feedback,hint,next,starter,chapter,defenseNext,close);document.body.append(dialog);
 input.lang='zh';instructions.id='learning-instructions';input.setAttribute('aria-describedby',instructions.id);
 let words=[],index=0,kind='tutorial',revealed=false,hadError=false,rows=[],started=0,finished=false,warmupSaved=false;
 const wordLabel=w=>selection().mode==='traditional'?w.t:w.s;
 function question(){
  revealed=false;hadError=false;input.value='';input.disabled=false;submit.disabled=false;feedback.textContent='';next.hidden=true;hint.hidden=kind!=='recall';
  prompt.textContent=kind==='recall'?words[index].p:wordLabel(words[index]);
  title.textContent=`${kind==='recall'?'Nhớ lại chữ Hán':'Làm quen bộ gõ'} · ${index+1}/${words.length}`;input.focus();
 }
 async function start(type){
  if(!await ensureStorage())return;
  kind=type;words=type==='recall'?dueRecallWords(pool(),records(),selection()):pool().slice(0,3);if(!words.length)return;
  index=0;rows=[];started=Date.now();finished=false;warmupSaved=false;instructions.hidden=false;prompt.hidden=false;form.hidden=false;defenseNext.hidden=true;starter.hidden=true;chapter.hidden=true;
  instructions.textContent=type==='recall'?'Nhìn phiên âm và nhớ lại chữ Hán. Không tính giờ. Nếu cần xem chữ gợi ý, từ đó sẽ chưa được tính là tự nhớ. Bài này luyện nhớ mặt chữ, chưa kiểm tra nghĩa của từ.':'Mở bộ gõ tiếng Trung, nhập phiên âm, chọn chữ trùng với mẫu rồi bấm Kiểm tra. Không tính giờ, không trừ HP và không cộng tiến độ chương.';
  dialog.showModal();question();
 }
 starter.onclick=()=>{dialog.close();startStarterBattle([...words]);};
 chapter.onclick=()=>{dialog.close();resumeChapter(getResumeChapter());};
 function saveExercise(learningTask){
  return saveRecall({learningTask,rows,elapsed:Math.round((Date.now()-started)/1000)});
 }
 tutorial.onclick=()=>start('tutorial');recall.onclick=()=>start('recall');defense.onclick=startDefense;defenseNext.onclick=()=>{dialog.close();startDefense();};
 hint.onclick=()=>{revealed=true;feedback.textContent=`Chữ gợi ý: ${wordLabel(words[index])} · ${words[index].p}`;input.focus();};
 form.onsubmit=e=>{
  e.preventDefault();if(finished||input.disabled||!normalizeAnswer(input.value))return;
  const word=words[index],correct=kind==='recall'?acceptsRecall(word,input.value,pool(),selection().mode):normalizeAnswer(input.value)===normalizeAnswer(wordLabel(word));
  if(!correct){hadError=true;feedback.textContent=`Chưa đúng. Bạn nhập: ${input.value}. ${kind==='tutorial'?`Mẫu: ${wordLabel(word)}.`:'Thử lại hoặc xem chữ gợi ý.'}`;return;}
  const sameWord=normalizeAnswer(input.value)===normalizeAnswer(wordLabel(word));
  rows.push({id:word.id,label:wordLabel(word),correct:kind==='tutorial'?1:Number(!revealed&&!hadError&&sameWord),wrong:hadError?1:0,missed:0,shown:1});
  feedback.textContent=!sameWord?`Bạn nhập ${normalizeAnswer(input.value)}, cũng đọc là ${word.p}. Từ trong lượt ôn này là ${wordLabel(word)}; chưa tính là tự nhớ từ này.`:`Đúng rồi: ${wordLabel(word)} · ${word.p}${kind==='recall'&&(revealed||hadError)?' · Đã luyện lại, chưa tính là tự nhớ.':''}`;
  if(kind==='tutorial'&&index===words.length-1)warmupSaved=saveExercise('typing-warmup');
  input.disabled=true;submit.disabled=true;hint.hidden=true;next.hidden=false;next.textContent=index===words.length-1?'Xem kết quả':'Từ tiếp theo';next.focus();
 };
 next.onclick=()=>{
  if(!finished&&++index<words.length){question();return;}
  finished=true;instructions.hidden=true;prompt.hidden=true;form.hidden=true;next.hidden=true;hint.hidden=true;defenseNext.hidden=kind!=='tutorial';prompt.textContent='';
  const clean=rows.filter(r=>r.correct).length;
  title.textContent=kind==='recall'?'Đã xong lượt nhớ lại':'Bạn đã thử xong 3 từ';
  const saved=kind==='recall'?saveExercise('pinyin-recall'):(warmupSaved ||= saveExercise('typing-warmup'));
  starter.hidden=kind!=='tutorial'||!saved;
  starter.className='primary-button';
  chapter.className=kind==='recall'?'primary-button':'secondary-button';
  starter.textContent=`Đấu thử với ${words.length} từ vừa gõ (không tính giờ)`;
  const chapterNumber=getResumeChapter();
  chapter.hidden=!saved||!chapterNumber;
  chapter.textContent=kind==='tutorial'?`Vào chặng ${chapterNumber} (có tính giờ)`:`Tiếp tục chặng ${chapterNumber}`;
  if(!saved){next.hidden=false;next.textContent='Thử lưu lại';}
  feedback.textContent=kind==='recall'?`Tự nhớ đúng ${clean}/${words.length} từ. ${saved?'Đã lưu trong lịch sử.':'Chưa lưu được kết quả. Giữ trang mở và kiểm tra dung lượng trình duyệt.'} ${clean<words.length?'Bạn có thể ôn lại những từ còn vướng.':''}`:'Chưa lưu được bài làm quen. Bấm “Thử lưu lại” để thêm các từ vừa gõ vào lịch ôn.';
  if(kind==='tutorial'&&saved){
   const schedule=recallSchedule(words,records(),selection());
   const first=schedule[0];
   if(first){
    const time=new Date(Math.ceil(first.dueAt/60000)*60000).toLocaleString('vi-VN',{dateStyle:'short',timeStyle:'short'});
    feedback.textContent=first.dueAt<=Date.now()?'Bạn đã có từ đến lúc ôn. Về lộ trình để thử nhớ chữ từ phiên âm.':`Bạn đã gõ xong ${words.length} từ theo mẫu. Từ ${time}, quay lại để nhìn phiên âm và tự gõ chữ Hán.`;
   }else feedback.textContent=`Bạn đã gõ xong ${words.length} từ theo mẫu.`;
  }
  (saved?(kind==='tutorial'?starter:chapter.hidden?close:chapter):next).focus();refresh();
 };
 close.onclick=()=>dialog.close();
 function refresh(){const due=dueRecallWords(pool(),records(),selection());const zhuyin=selection().mode==='zhuyin';tutorial.hidden=zhuyin;recall.hidden=!due.length;recall.textContent=`Nhớ lại ${due.length} từ đã luyện từ hôm trước`;note.textContent=zhuyin?'Thử phòng thủ trước khi vào trận. Bài tập không tính giờ và bạn có thể bỏ qua.':'Thử nhập 3 từ hoặc tập phòng thủ trước khi vào trận. Cả hai bài đều có thể bỏ qua và không tính giờ. Sau ít nhất 24 giờ, quay lại để thử nhớ chữ từ phiên âm của những từ đã nhập đúng.';panel.hidden=false;}
 return {refresh,startRecall:()=>start('recall')};
}
