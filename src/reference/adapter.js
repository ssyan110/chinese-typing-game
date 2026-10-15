// Vietnamese adaptation over the original game's simulation, sprites and screens.
const practice = {mode:null,system:'hsk',level:'1',cumulative:false,cache:{},manifest:null,words:[],tokens:[],bopomofo:[],loaded:false};
const practiceModes={zhuyin:'Chú âm',simplified:'Chữ giản thể',traditional:'Chữ phồn thể'};
const vocabularyLevels={hsk:['1','2','3','4','5','6','7-9'],tocfl:['N1','N2','A1','A2','B1','B2','C1']};
const practiceTitle=()=>`${practiceModes[practice.mode]||'Chưa chọn'} · ${practice.system==='hsk'?levelName(practice.level):'TOCFL '+levelName(practice.level)}`;
function levelName(level){return practice.system==='hsk'?`HSK ${level.replace('-','–')}`:({N1:'Dự bị 1',N2:'Dự bị 2',C1:'C1–C2'}[level]||level);}
const originalProfileDefaults=JSON.parse(JSON.stringify(game.profile));
const nativeApplyTypingMode=applyTypingMode;
applyTypingMode=function(modeKey){nativeApplyTypingMode(practice.mode==='zhuyin'?'zh-bpmf':practice.mode?'zh-hanzi':modeKey);};
getTypingModeKey=function(){return practice.mode==='zhuyin'?'zh-bpmf':'zh-hanzi';};
getTypingModeLabel=function(){return practiceModes[practice.mode]||'Chọn nội dung';};
getTypingModeLongLabel=function(){return practiceTitle();};
const nativeRefreshModeButtons=refreshTypingModeButtons;
refreshTypingModeButtons=function(){nativeRefreshModeButtons();const options=[[el.btnModeEn,'simplified'],[el.btnModeZhHanzi,'traditional'],[el.btnModeZhBpmf,'zhuyin']];for(const [button,mode]of options){if(button){button.textContent=practiceModes[mode];button.classList.toggle('active',practice.mode===mode);}}};
// Do not connect to or write to the reference author's leaderboard.
isCloudWebhookConfigured=()=>false;
fetchCloudLeaderboard=async()=>{};
uploadPendingCloudScore=async()=>{};
const nativeRecord=getStageRecord;
getStageRecord=function(stageId){return nativeRecord(`${practice.mode}|${practice.system}|${practice.level}|${practice.cumulative}|${stageId}`);};
const nativeSpecialRecord=getSpecialRecord;
getSpecialRecord=function(key){return nativeSpecialRecord(`${practice.mode}|${practice.system}|${practice.level}|${practice.cumulative}|${key}`);};
buildBopomofoModeTokens=function(){return practice.bopomofo;};
const nativeCreateStageData=createStageData;
createStageData=function(stage){
 const data=nativeCreateStageData(stage);
 data.graceLeft=game.practiceMode?1:0;
 if(practice.mode!=='zhuyin'&&practice.tokens.length&&['homefall','top_anchor','bottom_defense'].includes(stage.mechanic)){
  data.rowTokens={};
 }
 return data;
};
const nativeKeyVisual=getKeyVisualLabel;
getKeyVisualLabel=function(key){const token=game.stageData?.rowTokens?.[key];return token?token.text:nativeKeyVisual(key);};
const nativeKeyPrompt=getKeyPromptLabel;
getKeyPromptLabel=function(key){return game.stageData?.rowTokens?.[key]?.text||nativeKeyPrompt(key);};
const nativeIsChineseTypingStage=isChineseTypingStage;
isChineseTypingStage=function(){
 if(practice.mode!=='zhuyin'&&practice.mode&&game.mode==='playing'&&game.stageData?.rowTokens){
  return !(getStage()?.mechanic==='top_anchor'&&game.stageData.expectedType==='anchor');
 }
 return nativeIsChineseTypingStage();
};
const nativeImeHint=updateImePanelHint;
updateImePanelHint=function(){
 if(isChineseTypingStage()&&game.stageData?.rowTokens){
  const stage=getStage(),data=game.stageData;
  el.imeTitle.textContent=`${practiceModes[practice.mode]} · dùng bộ gõ tiếng Trung`;
  const token=stage.mechanic==='top_anchor'?data.rowTokens[data.expectedKey]:null;
  el.imeHint.textContent=game.imeComposing?'Đang chọn chữ; chưa chấm đúng/sai.':token?`Nhập từ ${token.text}. Tiếp theo bấm F/J theo yêu cầu để đỡ đòn.`:'Nhập đúng từ trên phù văn hoặc ám khí đang bay. Chọn xong chữ để hệ thống chấm.';
  return;
 }
 nativeImeHint();
 if(practice.mode!=='zhuyin'&&isChineseTypingStage()){
  el.imeTitle.textContent=`${practiceModes[practice.mode]} · dùng bộ gõ tiếng Trung`;
  el.imeInput.placeholder='Gõ và chọn đúng chữ Hán';
  const data=game.stageData,target=getTokenText(data.currentToken||data.currentWord);
  el.imeHint.textContent=game.imeComposing?`Đang chọn chữ. Từ cần nhập: ${target}`:'Nhập từ trên ấn của đối thủ.';
 }
};
const nativeHanziInput=handleChineseWordComboImeInput;
handleChineseWordComboImeInput=function(confirm=false){
 if(game.imeComposing||game.mode!=='playing')return;
 if(isChineseTypingStage()&&game.stageData?.rowTokens){
  const data=game.stageData,stage=getStage();
  const entries=rowTargetEntries(data,stage.mechanic);
  const result=assessRowInput(el.imeInput.value,entries,Object.entries(data.rowTokens),confirm===true);
  if(result.kind==='empty')return;
  if(result.kind==='match'){
   const born=stage.mechanic==='top_anchor'?data.rowPromptBornAt:data.objects.find(o=>o.char===result.key)?.hanziBornAt;
   recordWordStat(result.text,performance.now()-(born||performance.now()),true);
   el.imeInput.value='';game.imeLastHandledValue='';
   if(stage.mechanic==='homefall')handleHomefallInput(result.key);
   else if(stage.mechanic==='top_anchor')handleTopAnchorInput(result.key);
   else handleBottomDefenseInput(result.key);
   const progress=stage.mechanic==='homefall'?(data.charge===0?'Đã xuất kiếm!':`Tích khí ${data.charge}/${data.chargeNeed}; đủ 3 lần đúng sẽ xuất kiếm.`):stage.mechanic==='bottom_defense'?(data.shieldCharge===0?'Đã phản kích!':`Tích khiên ${data.shieldCharge}/${data.shieldNeed}; đủ 3 nấc sẽ phản kích.`):'Bấm phím F/J được nhắc để đỡ đòn.';
   setTypingStatus(`Đúng rồi! ${result.text} · ${progress}`, 'success');
   data.spawnTimer=Math.min(data.spawnTimer||0,.35);
   updateObjectiveUI();renderPromptForStage();renderProjectiles();updateImePanelHint();return;
  }
  if(result.kind==='confirm'){setTypingStatus(`Gõ tiếp nếu chưa hết từ. Nếu muốn nhập ${result.text}, bấm Enter hoặc Xuất chiêu.`, 'pending');return;}
  if(result.kind==='partial'||result.kind==='preedit'){setTypingStatus('Gõ tiếp cho đủ từ rồi chọn chữ trong bộ gõ.', 'pending');return;}
  if(result.kind==='unavailable'){setTypingStatus(`Từ ${result.text} chưa xuất hiện hoặc đã hết lượt. Nhìn các mục tiêu đang bay.`, 'pending');return;}
  if(entries[0])recordWordStat(entries[0][1].text,0,false);
  recordAttempt(false);softMistake('Chưa đúng từ mục tiêu. Nhìn các mục tiêu đang bay và chọn lại chữ nhé.');
  setTypingStatus('Chưa đúng từ mục tiêu. Bạn có thể sửa lại trong ô nhập.', 'error');return;
 }
 if(confirm!==true&&el.imeInput.value&&!/\p{Script=Han}/u.test(el.imeInput.value)){setTypingStatus('Đang nhập phiên âm; hãy chọn chữ trong bộ gõ.', 'pending');return;}
 const hpBefore=game.playerHp,errorsBefore=game.totalTyped-game.correctTyped;
 nativeHanziInput();
 chargeFirstBossMistake(hpBefore,errorsBefore);
};
const nativeTopPrompt=stage2NextPrompt;
stage2NextPrompt=function(){nativeTopPrompt();const data=game.stageData;if(data?.rowTokens){if(data.expectedType==='top'){data.rowTokens[data.expectedKey]=nextVocabularyToken();renderPromptForStage();}data.deadlineDuration=(data.expectedType==='top'?combatTargetSeconds(getKeyVisualLabel(data.expectedKey).length):1.8)*1000;data.deadline=performance.now()+data.deadlineDuration;if(data.expectedType==='top')data.rowPromptBornAt=performance.now();}else if(data){data.deadlineDuration=(data.expectedType==='top'?targetSeconds:1.8)*1000;data.deadline=performance.now()+data.deadlineDuration;}};

const nativeLoadStage=loadStage;
loadStage=function(index,skipOpening=false){
 resetDamageIndicators();setTypingStatus('Nhìn mục tiêu trong trận đấu rồi bắt đầu gõ.');applyTypingMode();
 nativeLoadStage(index,skipOpening);
 if(game.practiceMode&&game.stageData&&getStage()?.mechanic==='word_combo'){
  const pool=practice.mode==='zhuyin'?practice.bopomofo:practice.tokens;
  const requested=game.practicePlan?.words||[];
  const selected=pool.filter(token=>requested.includes(token.text));
  game.stageData.words=selected.length?selected:pool.slice(0,12);
  game.stageData.reviewDeck=createVocabularyDeck(game.stageData.words);
  setCurrentWordToken(game.stageData,game.stageData.reviewDeck.next());
 }
};
startPracticeMode=function(){
 const pool=practice.mode==='zhuyin'?practice.bopomofo:practice.tokens;
 const slow=(game.lastResultInsights?.slowWords||[]).filter(text=>pool.some(token=>token.text===text));
 game.practicePlan={type:'words',words:slow.length?slow:pool.slice(0,6).map(token=>token.text)};
 game.analytics={keyStats:{},wordStats:{},practiceReview:{}};
 game.practiceMode=true;game.independentStageMode=false;game.bossChallengeMode=false;game.endlessBossMode=false;
 applyTypingMode();showCoach('Luyện lại các từ còn sai hoặc nhập chậm. Nhập đủ từ để xuất kiếm.',1800);loadStage(0);
};

const nativeStartGameplay=startStageGameplay;
startStageGameplay=function(){
 nativeStartGameplay();
 if(getStage()?.mechanic==='top_anchor'){const data=game.stageData;data.deadline=performance.now()+data.deadlineDuration;data.rowPromptBornAt=performance.now();}
 if(['word_combo','boss_raid'].includes(getStage()?.mechanic))beginWordTimer();
 if(practice.mode!=='zhuyin'&&game.stageData?.rowTokens){
  const stage=getStage();
  showCoach(stage.mechanic==='homefall'?'Nhập từ trên phù văn để tích khí. Đủ 3 nấc sẽ tự xuất kiếm.':stage.mechanic==='top_anchor'?'Nhập từ để đạp mây, rồi bấm F hoặc J theo yêu cầu để đỡ đòn.':'Nhập từ trên ám khí để đỡ. Đủ 3 nấc khiên sẽ tự phản kích.',3000);
 }
};
const nativeObjective=updateObjectiveUI;
updateObjectiveUI=function(){
 nativeObjective();
 if(game.stageData?.rowTokens){
  const descriptions={
   homefall:'Nhập bất kỳ phù văn nào đang rơi. Bỏ lỡ mất 10 HP; gõ sai mất 4 HP. Đủ 3 lần đúng sẽ tự xuất kiếm.',
   top_anchor:'Nhập từ để nhảy và tích vân khí. Bấm đúng F hoặc J được nhắc để đỡ đòn; đủ 2 nấc khí sẽ kích nổ mây.',
   bottom_defense:'Nhập bất kỳ ám khí nào đang bay. Lọt đòn mất 12 HP; gõ sai mất 4 HP. Đủ 3 nấc khiên sẽ tự phản kích.'
  };
  el.objectiveMain.textContent=descriptions[getStage()?.mechanic]||el.objectiveMain.textContent;
 }
};
const nativeActionGuide=renderActionGuide;
renderActionGuide=function(stage,data){
 nativeActionGuide(stage,data);
 if(data?.rowTokens){
  const first=el.objectiveGuide.querySelector('.guide-chip>span');
  if(first)first.textContent=stage.mechanic==='homefall'?'Nhập từ trên phù văn':stage.mechanic==='top_anchor'?'Nhập từ để đạp mây':'Nhập từ để đỡ đòn';
 }
};
const nativeResultScreen=openResultScreen;
openResultScreen=function(force=false,reason='normal'){
 nativeResultScreen(force,reason);
 if(game.mode!=='result')return;
 if(practice.mode!=='zhuyin'){
  const weak=Object.entries(game.analytics.wordStats).filter(([,stat])=>stat.failCount>0).sort((a,b)=>b[1].failCount-a[1].failCount).slice(0,3).map(([word])=>word);
  for(const node of el.learningReportText.childNodes)if(node.nodeType===3&&node.textContent.includes('Phím hay gõ sai:')){
   node.textContent=node.textContent.replace('Phím hay gõ sai:','Từ cần luyện lại:');
   if(node.nextSibling)node.nextSibling.textContent=weak.join('、')||'Chưa có từ nào gõ sai';
  }
  game.lastResultInsights.slowWords=[...new Set([...weak,...game.lastResultInsights.slowWords])].slice(0,6);
 }
 if(!game.practiceMode&&!game.endlessBossMode){el.resultTitle.textContent=`Kết quả ải ${getStage()?.id}`;}
 if(!game.practiceMode){el.btnPractice.style.display='inline-block';}
 el.resultStars.setAttribute('aria-label',`${el.resultStars.querySelectorAll('.on').length} trên 3 sao`);
};
const nativeRenderPrompt=renderPromptForStage;
renderPromptForStage=function(){
 nativeRenderPrompt();
 const hanzi=practice.mode!=='zhuyin',data=game.stageData,mechanic=getStage()?.mechanic;
 el.promptBoard.classList.toggle('hanzi-whole-word',hanzi);
 el.arena.dataset.mechanic=mechanic||'';
 el.arena.classList.toggle('world-guard',!!data&&(data.guardMode||mechanic==='top_anchor'&&data.expectedType==='anchor'));
 el.arena.classList.toggle('hanzi-gameplay',hanzi);
 if(hanzi){el.promptBoard.removeAttribute('title');el.promptBoard.removeAttribute('aria-label');}
 if(hanzi&&data&&['word_combo','boss_raid'].includes(mechanic)&&!data.guardMode){
  el.wordProgress.textContent=getTokenPhonetic(data.currentToken||data.currentWord);
 }
 renderActiveTypingCue();
};
// Keep F/J and Space free for the original defense and ultimate mechanics.
const nativeHandleInput=handleInput;
handleInput=function(event){if(event.target?.closest?.('#practice-setup,#combat-controls'))return;nativeHandleInput(event);};
function openPracticeSetup(step='mode'){
 closeOverlays();$('#practice-setup').classList.add('show');game.mode='practice-setup';
 $('#practice-modes').hidden=step!=='mode';$('#practice-levels').hidden=step==='mode';
 $('#practice-heading').textContent=step==='mode'?'Bạn muốn luyện gì?':`Chọn cấp độ · ${practiceModes[practice.mode]}`;
 $('#setup-step').textContent=step==='mode'?'BƯỚC 1 / 2 · CHỌN NỘI DUNG':'BƯỚC 2 / 2 · CHỌN VỐN TỪ';
 $('#setup-intro').textContent=step==='mode'?'Chọn nội dung trước, rồi chọn cấp độ và bước vào ngũ ải.':'Chọn vốn từ cho cả năm ải. Bạn có thể đổi lại trước mỗi lượt chơi.';
 $('#practice-status').textContent='';if(step!=='mode')renderVocabularyLevels();
 $('#practice-card').scrollTop=0;
 requestAnimationFrame(()=>{const focus=step==='mode'?$('[data-practice-mode]'):$('#vocabulary-system');focus?.focus({preventScroll:true});});
}
function renderVocabularyLevels(){
 $('#vocabulary-system').value=practice.system;$('#include-earlier').checked=practice.cumulative;
 const counts=practice.manifest?.levels[practice.system]||{};const mode=practice.mode==='zhuyin'?'zhuyin':'words';
 $('#vocabulary-levels').innerHTML=vocabularyLevels[practice.system].map(level=>`<button class="wood-btn vocabulary-level ${practice.level===level?'active':''}" data-vocabulary-level="${level}" aria-pressed="${practice.level===level}"><strong>${levelName(level)}</strong><small>${counts[level]?.[mode]?.toLocaleString('vi-VN')||'…'} từ mới</small></button>`).join('');
 document.querySelectorAll('[data-vocabulary-level]').forEach(button=>button.onclick=()=>{practice.level=button.dataset.vocabularyLevel;renderVocabularyLevels();});
 $('#vocabulary-note').textContent=practice.system==='hsk'?'HSK 3.0, đề cương 11/2025. HSK 7–9 dùng chung một danh sách nâng cao.':'TOCFL, danh sách 07/2023. Hai bậc dự bị, A1, A2, B1, B2 và bậc lưu loát C1–C2 dùng chung.';
 $('#mode-instruction').textContent=practice.mode==='zhuyin'?'Chuyển bàn phím sang tiếng Anh. Ba ải đầu luyện vị trí phím chú âm; ải 4–5 luyện chuỗi chú âm của từ đã chọn.':'Bật bộ gõ '+(practice.mode==='simplified'?'tiếng Trung giản thể':'tiếng Trung phồn thể')+'. Nhập chữ trên phù văn hoặc từ mục tiêu; bấm F/J khi được nhắc đỡ đòn.';
}
async function enterSelectedPractice(){
 const button=$('#enter-original-game');button.disabled=true;$('#practice-status').textContent='Đang chuẩn bị từ vựng…';
 try{
  if(!practice.cache[practice.system]){const response=await fetch(`/data/${practice.system}.json`);if(!response.ok)throw Error('data');practice.cache[practice.system]=await response.json();}
  const levels=vocabularyLevels[practice.system];const allowed=practice.cumulative?levels.slice(0,levels.indexOf(practice.level)+1):[practice.level];
  practice.words=practice.cache[practice.system].filter(w=>allowed.includes(w.level)&&(practice.mode!=='zhuyin'||w.keys));
  if(!practice.words.length)throw Error('empty');
  practice.tokens=practice.words.map(w=>({text:practice.mode==='simplified'?w.s:w.t,phonetic:'',sourceId:w.id}));
  practice.bopomofo=practice.words.filter(w=>w.keys).map(w=>({text:w.z.replace(/\s/g,''),phonetic:w.t+' · '+w.p,hanzi:w.t,input:w.keys,sourceId:w.id}));
  selectVocabularyDeck();
  ZH_TYPING_WORD_BANK.easy=practice.tokens;ZH_TYPING_WORD_BANK.middle=[];ZH_TYPING_WORD_BANK.hard=[];
  applyTypingMode();practice.loaded=true;
  $('#practice-setup').classList.remove('show');
  closeOverlays();game.mode='title';el.titleScreen.classList.add('show');
  $('#title-sub').textContent=`${practiceTitle()} · ${practice.words.length.toLocaleString('vi-VN')} mục từ${practice.cumulative?' (gồm các cấp trước)':''}. Năm ải độc lập, mỗi lượt 3 phút. Giữ mắt nhìn đối thủ và gõ đúng để xuất chiêu!`;
  renderStageSelect();updateContext();ensureAudioUnlocked();
 }catch(error){$('#practice-status').textContent='Chưa tải được từ vựng. Kiểm tra kết nối rồi thử lại.';}
 finally{button.disabled=false;}
}
function updateContext(){
 let button=$('#change-practice');if(!button){button=document.createElement('button');button.id='change-practice';button.className='wood-btn';button.onclick=()=>openPracticeSetup('level');$('#title-controls').append(button);}
 button.textContent='Đổi nội dung / cấp độ';
 $('#stage-select-sub').textContent=`${practiceTitle()} · ${practice.words.length.toLocaleString('vi-VN')} mục từ · Mỗi lượt 3:00, hết giờ tự tính điểm và sao.`;
}
function showLocalRecords(){
 closeOverlays();game.mode='leaderboard';el.leaderboardScreen.classList.add('show');
 $('#leaderboard-title').textContent='Thành tích trên máy này';$('#leaderboard-sub').textContent=practiceTitle();
 el.titleLeaderboardGrid.innerHTML=STAGES.map(stage=>{const record=getStageRecord(stage.id);return `<div class="rankboard"><strong>${stage.name}</strong><p>${renderStars(record.bestStars||0)}</p><p>Điểm cao nhất: ${Math.round(record.bestScore||0)}</p><p>Chính xác: ${Math.round(record.bestAcc||0)}% · Liên kích: ${Math.round(record.bestCombo||0)}</p><p>Đã vượt: ${Math.round(record.clearCount||0)} lượt</p></div>`;}).join('');
 $('#title-leaderboard-status').textContent='Lưu riêng theo nội dung, cấp độ và lựa chọn ôn tích lũy.';
}
function bindPracticeControls(){
 document.querySelectorAll('[data-practice-mode]').forEach(button=>button.onclick=()=>{practice.mode=button.dataset.practiceMode;practice.system=practice.mode==='simplified'?'hsk':'tocfl';practice.level=vocabularyLevels[practice.system][0];practice.cumulative=false;openPracticeSetup('level');});
 $('#vocabulary-system').onchange=event=>{practice.system=event.target.value;practice.level=vocabularyLevels[practice.system][0];renderVocabularyLevels();};
 $('#include-earlier').onchange=event=>practice.cumulative=event.target.checked;
 $('#change-practice-mode').onclick=()=>openPracticeSetup('mode');$('#enter-original-game').onclick=enterSelectedPractice;
 // Capture replaces only mode-selection navigation; original stage actions remain intact.
 const intercept=(element,fn)=>element?.addEventListener('click',event=>{event.stopImmediatePropagation();fn();},true);
 intercept(el.btnModeEn,()=>{practice.mode='simplified';openPracticeSetup('level');});
 intercept(el.btnModeZhHanzi,()=>{practice.mode='traditional';openPracticeSetup('level');});
 intercept(el.btnModeZhBpmf,()=>{practice.mode='zhuyin';openPracticeSetup('level');});
 el.btnReplay.addEventListener('click',event=>{
  if(!game.practiceMode)return;
  event.stopImmediatePropagation();ensureAudioUnlocked();
  const plan=JSON.parse(JSON.stringify(game.practicePlan));closeOverlays();resetRun(false);
  game.practiceMode=true;game.independentStageMode=false;game.practicePlan=plan;
  applyTypingMode();showCoach('Luyện lại cùng bộ từ, không tính sao.',1400);loadStage(0);
 },true);
 intercept(el.btnOpenLeaderboard,showLocalRecords);intercept(el.btnLeaderboardRefresh,showLocalRecords);
 $('#title-leaderboard-title').textContent='Thành tích từng ải';
 $('#cloud-settings').hidden=true;$('#cloud-upload-panel').hidden=true;$('#btn-leaderboard-refresh').textContent='Làm mới thành tích';
 $('#control-hints').textContent='Chọn ải để thử sức trong 3 phút. Ba ải đầu: tụ khí, khinh công và đỡ ám khí. Hai ải sau: liên chiêu từ vựng và đấu ma vương. Ma vương vô tận không giới hạn thời gian. F/J để đỡ đòn theo yêu cầu; ở ải 5, bấm Space để tung tuyệt chiêu khi đủ nội lực.';
 el.imeInput.setAttribute('aria-label','Nhập từ mục tiêu bằng bộ gõ tiếng Trung');
 const confirm=document.createElement('button');confirm.id='ime-confirm';confirm.className='wood-btn';confirm.textContent='Xuất chiêu ↵';confirm.type='button';confirm.onpointerdown=event=>event.preventDefault();confirm.onclick=()=>{handleChineseWordComboImeInput(true);if(isChineseTypingStage())el.imeInput.focus({preventScroll:true});};el.imePanel.append(confirm);
 const status=document.createElement('div');status.id='typing-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');el.imePanel.append(status);
 el.imeInput.addEventListener('keydown',event=>{if(event.key==='Enter'&&!event.isComposing&&event.keyCode!==229&&!game.imeComposing){event.preventDefault();handleChineseWordComboImeInput(true);}});
 el.imeInput.addEventListener('paste',event=>{event.preventDefault();showToast('Hãy tự gõ để luyện tay nhé.',1000);});
}
// Concurrent targets are read directly from the moving objects in the arena.
const nativeSpawnCap=getAdaptiveSpawnCap;
getAdaptiveSpawnCap=function(mechanic){return game.stageData?.rowTokens&&['homefall','bottom_defense'].includes(mechanic)?(game.practiceMode?1:combatPressureTier()+2):nativeSpawnCap(mechanic);};
function tuneHanziObjects(){
 const data=game.stageData;if(!data)return;
 const rect=el.arena.getBoundingClientRect(),mechanic=getStage()?.mechanic;
 for(const obj of data.objects||[]){
  if(obj.hanziPaced)continue;obj.hanziPaced=true;obj.hanziBornAt=performance.now();
  const seconds=combatTargetSeconds(data.rowTokens?.[obj.char]?.text.length||1);
  if(mechanic==='homefall'){obj.y=Math.max(95,obj.y);obj.x=rect.width*(.43+(obj.id%3)*.19);obj.speed=Math.max(.1,(rect.height-38-obj.y)/seconds);obj.drift=0;obj.flightLayout={boundary:rect.height-38,origin:obj.y,width:rect.width,lane:obj.x/rect.width};}
  else if(mechanic==='bottom_defense'){obj.y=110+(obj.id%3)*Math.max(58,(rect.height-300)/3);obj.speed=Math.max(.1,(obj.x-126)/seconds);}
 }
}
// Arena resizing must not shorten or extend an already flying target's response window.
function reflowHomefallObjects(){
 if(getStage()?.mechanic!=='homefall')return;
 const rect=el.arena.getBoundingClientRect(),boundary=rect.height-38;
 if(!(rect.width>0&&boundary>0))return;
 for(const obj of game.stageData?.objects||[]){
  const prior=obj.flightLayout;if(!prior)continue;
  if(prior.boundary===boundary&&prior.width===rect.width)continue;
  const remaining=Math.max(0,(prior.boundary-obj.y)/obj.speed);
  const progress=Math.max(0,Math.min(1,(obj.y-prior.origin)/Math.max(1,prior.boundary-prior.origin)));
  const origin=Math.min(95,boundary-1);
  obj.y=origin+progress*(boundary-origin);
  obj.x=rect.width*prior.lane;
  if(remaining>0)obj.speed=(boundary-obj.y)/remaining;
  obj.flightLayout={boundary,origin,width:rect.width,lane:prior.lane};
 }
}
const nativeHomefallUpdate=updateHomefall;
updateHomefall=function(dt){reflowHomefallObjects();const data=game.stageData,before=[...(data?.objects||[])];nativeHomefallUpdate(dt);recordExpiredRowWords(data,before);tuneHanziObjects();};
const nativeBottomUpdate=updateBottomDefense;
updateBottomDefense=function(dt){const data=game.stageData,before=[...(data?.objects||[])];nativeBottomUpdate(dt);recordExpiredRowWords(data,before);tuneHanziObjects();};
function recordExpiredRowWords(data,before){
 if(!data)return;
 const live=new Set((data.objects||[]).map(o=>o.id));
 if(!data.rowTokens){if(practice.mode==='zhuyin')for(const obj of before)if(!live.has(obj.id)){const item=practiceReviewItem(getKeyVisualLabel(obj.char));if(item)item.wrong++;}return;}
 for(const obj of before)if(!live.has(obj.id)&&data.rowTokens[obj.char])recordWordStat(data.rowTokens[obj.char].text,0,false);
}
const nativeTopAnchorUpdate=updateTopAnchor;
updateTopAnchor=function(){const d=game.stageData;if(d?.expectedType==='top'&&performance.now()>d.deadline){if(d.rowTokens)recordWordStat(d.rowTokens[d.expectedKey]?.text,0,false);else if(practice.mode==='zhuyin'){const item=practiceReviewItem(getKeyVisualLabel(d.expectedKey));if(item)item.wrong++;}}nativeTopAnchorUpdate();};
let typingSuccessUntil=0;
function setTypingStatus(text,kind='pending'){
 if(kind==='success')typingSuccessUntil=performance.now()+1200;
 const node=$('#typing-status');if(!node)return;
 if(node.textContent!==text)node.textContent=text;node.dataset.kind=kind;
}
function displayRowEntries(data,mechanic){
 if(data?.rowTokens)return rowTargetEntries(data,mechanic);
 if(mechanic==='top_anchor')return data.expectedType==='top'?[[data.expectedKey,{text:getKeyPromptLabel(data.expectedKey),phonetic:'Bấm phím '+data.expectedKey.toUpperCase()}]]:[];
 return [...(data?.objects||[])].sort((a,b)=>mechanic==='homefall'?b.y-a.y:a.x-b.x).map(obj=>[obj.char,{text:getKeyPromptLabel(obj.char),phonetic:'Bấm phím '+obj.char.toUpperCase()}]);
}
function renderActiveTypingCue(){
 const data=game.stageData,stage=getStage();
 const row=!!data&&['homefall','top_anchor','bottom_defense'].includes(stage?.mechanic);
 el.promptMain.classList.toggle('hanzi-row-prompt',row);
 el.promptBoard.classList.toggle('single-hanzi-target',row);
 if(!row)return;
 if(stage.mechanic==='top_anchor'&&data.expectedType==='anchor'){
  el.promptStage.textContent='ĐỠ ĐÒN NGAY';el.promptMain.textContent=data.expectedKey.toUpperCase();el.promptSub.textContent='Bấm đúng phím này. Không nhập chữ Hán khi đỡ đòn.';el.wordProgress.textContent='';return;
 }
 const entries=displayRowEntries(data,stage.mechanic),token=entries[0]?.[1];
 el.promptStage.textContent=data.rowTokens?'GÕ TỪ NÀY':'BẤM PHÍM NÀY';el.promptMain.textContent=token?.text||'Chờ mục tiêu…';
 el.promptSub.textContent=token?(data.rowTokens?'Ưu tiên từ tô sáng. Các mục tiêu còn lại vẫn tiếp tục tiến tới!':'Bấm phím của ký hiệu được tô sáng, không gõ theo danh sách.'):'Mục tiêu tiếp theo sẽ xuất hiện ngay.';
 el.wordProgress.textContent=data.rowTokens?'':token?.phonetic||'';
}
// Reuse moving-object nodes instead of rebuilding the layer on every animation frame.
const nativeProjectileRenderer=renderProjectiles;
const projectileNodes=new Map();let projectileOwner=null,projectileSignature='';
renderProjectiles=function(){
 reflowHomefallObjects();
 const stage=getStage(),data=game.stageData;
 if(!data||!['homefall','bottom_defense'].includes(stage?.mechanic)){projectileOwner=null;projectileNodes.clear();projectileSignature='';nativeProjectileRenderer();return;}
 if(projectileOwner!==data){el.projectileLayer.replaceChildren();projectileNodes.clear();projectileOwner=data;projectileSignature='';}
 const objects=data.objects||[],live=new Set(objects.map(obj=>obj.id));
 for(const [id,node]of projectileNodes)if(!live.has(id)){node.remove();projectileNodes.delete(id);}
 for(const obj of objects){
  let node=projectileNodes.get(obj.id);
  if(!node){node=document.createElement('div');node.className=(stage.mechanic==='homefall'?'rune-orb':'shadow-bolt')+' hanzi-object';node.style.left='0';node.style.top='0';const word=document.createElement('span');word.className='bubble-word';word.textContent=getKeyVisualLabel(obj.char);node.append(word);const timer=document.createElement('small');timer.className='bubble-seconds';node.append(timer);el.projectileLayer.append(node);projectileNodes.set(obj.id,node);}
  const rect=el.arena.getBoundingClientRect();
  // Keep the whole label and countdown visible without changing collision positions.
  const displayX=stage.mechanic==='homefall'?Math.max(8,Math.min(obj.x,rect.width-node.offsetWidth-8)):obj.x;
  const displayY=Math.max(8,Math.min(obj.y,rect.height-node.offsetHeight-8));
  node.style.transform=`translate3d(${displayX}px,${displayY}px,0)`;node.classList.remove('target-highlight');
  const seconds=stage.mechanic==='homefall'?(rect.height-38-obj.y)/obj.speed:(obj.x-126)/obj.speed;
  const time=Math.max(0,seconds);writeText(node.querySelector('.bubble-seconds'),`${time.toFixed(1)}s`);node.classList.toggle('bubble-urgent',time<=2);
  node.setAttribute('aria-label',`${getKeyVisualLabel(obj.char)} · ${time.toFixed(1)} giây`);
 }
 const signature=objects.map(o=>o.id+':'+o.char).join('|');
 if(signature!==projectileSignature){projectileSignature=signature;renderActiveTypingCue();if(!el.imeInput.value&&!game.imeComposing&&performance.now()>typingSuccessUntil)setTypingStatus(objects.length?'Nhập bất kỳ mục tiêu nào đang bay. Không cần theo thứ tự.':'Đang chờ mục tiêu tiếp theo.');}
};
// Damage feedback is driven by actual damage calls, not guessed from score or combo.
const combatFeedback={hero:{until:0,loss:0,before:0,max:1,reason:''},enemy:{until:0,loss:0,before:0,max:1,reason:''}};
let healthUiReady=false,damageMessageUntil=0;
function writeText(node,text){if(node&&node.textContent!==text)node.textContent=text;}
function ensureCombatHealthUI(){
 if(healthUiReady)return;healthUiReady=true;
 for(const [id,label]of [['hp-text','HP của bạn'],['enemy-text','HP đối thủ'],['qi-text','Nội lực'],['timer-text','Thời gian']]){
  const row=$('#'+id)?.closest('.bar-item');if(!row)continue;
  const name=document.createElement('span');name.className='bar-name';name.textContent=label;row.prepend(name);row.dataset.combatBar=id;
 }
 for(const who of ['hero','enemy']){
  const plate=document.createElement('div');plate.id=who+'-health';plate.className='combat-health '+who+'-health';
  plate.innerHTML=`<div class="combat-health-label"><strong></strong><span></span></div><div class="combat-health-track"><i class="health-loss-trail"></i><i class="health-current"></i></div><div class="health-warning"></div><div class="health-loss-number"></div>`;
  el.arena.append(plate);
 }
 const message=document.createElement('div');message.id='combat-damage-message';message.setAttribute('role','status');message.setAttribute('aria-live','polite');message.hidden=true;el.arena.append(message);
}
function resetDamageIndicators(){
 for(const who of ['hero','enemy'])combatFeedback[who]={until:0,loss:0,before:0,max:1,reason:''};damageMessageUntil=0;
}
function showCombatDamage(who,loss,before,max,reason,name){
 if(!(loss>0))return;ensureCombatHealthUI();
 const now=performance.now();combatFeedback[who]={until:now+1900,loss,before,max,reason};
 const format=n=>Number.isInteger(n)?String(n):n.toFixed(1);
 const text=who==='hero'?`Bạn mất ${format(loss)} HP${reason?' · '+reason:''}`:`${name||'Đối thủ'} mất ${format(loss)} HP`;
 const message=$('#combat-damage-message');writeText(message,text);message.dataset.who=who;message.hidden=false;damageMessageUntil=now+2400;
 el.arena.classList.toggle('player-damaged',who==='hero');
 if(who==='hero')setTimeout(()=>el.arena.classList.remove('player-damaged'),650);
 updateCombatHealthUI();
}
function updateCombatHealthUI(){
 ensureCombatHealthUI();const now=performance.now();
 for(const who of ['hero','enemy']){
  const plate=$('#'+who+'-health'),hp=who==='hero'?game.playerHp:game.enemyHp,max=who==='hero'?game.maxPlayerHp:game.maxEnemyHp;
  const state=combatFeedback[who],active=!!game.stageData&&['playing','paused','dialogue','preview','transition','cinematic','failed'].includes(game.mode);
  el.app.classList.toggle('in-combat',active);plate.hidden=!active;const ratio=max>0?Math.max(0,Math.min(1,hp/max)):0,recent=now<state.until;
  writeText(plate.querySelector('strong'),who==='hero'?'BẠN':(MONSTERS[game.currentMonster]?.name||'ĐỐI THỦ'));
  writeText(plate.querySelector('.combat-health-label>span'),`HP ${Math.ceil(hp)} / ${max}`);
  const width=(ratio*100).toFixed(1)+'%';
  if(plate.querySelector('.health-current').style.width!==width)plate.querySelector('.health-current').style.width=width;
  const trailWidth=(recent?Math.max(ratio,state.before/Math.max(1,state.max))*100:ratio*100).toFixed(1)+'%';
  if(plate.querySelector('.health-loss-trail').style.width!==trailWidth)plate.querySelector('.health-loss-trail').style.width=trailWidth;
  const low=who==='hero'&&ratio<=.25;plate.classList.toggle('low-health',low);plate.classList.toggle('recent-damage',recent);
  writeText(plate.querySelector('.health-warning'),low?'NGUY HIỂM · Sắp hết HP':'');
  writeText(plate.querySelector('.health-loss-number'),recent?`−${Number.isInteger(state.loss)?state.loss:state.loss.toFixed(1)} HP`:'');
  const row=$(`[data-combat-bar="${who==='hero'?'hp-text':'enemy-text'}"]`);row?.classList.toggle('recent-damage',recent);row?.classList.toggle('low-health',low);
 }
 const message=$('#combat-damage-message');message.hidden=now>=damageMessageUntil||!game.stageData;
 if(game.stageData)writeText(el.enemyText,`${Math.ceil(game.enemyHp)}/${game.maxEnemyHp}`);
}
function clearReplacedEnemyFeedback(){
 combatFeedback.enemy={until:0,loss:0,before:0,max:1,reason:''};
 const message=$('#combat-damage-message');if(message?.dataset.who==='enemy')damageMessageUntil=0;
}
const nativeFeedbackEnemy=setEnemy;
setEnemy=function(id){if(id!==game.currentMonster)clearReplacedEnemyFeedback();nativeFeedbackEnemy(id);};
const nativeFeedbackTimedCycle=resetTimedCycle;
resetTimedCycle=function(stage){nativeFeedbackTimedCycle(stage);clearReplacedEnemyFeedback();};
const nativeFeedbackEndlessCycle=resetEndlessBossCycle;
resetEndlessBossCycle=function(stage){nativeFeedbackEndlessCycle(stage);clearReplacedEnemyFeedback();};
const nativeWeakKeys=calculateWeakKeys;
calculateWeakKeys=function(limit=3){return nativeWeakKeys(limit).filter(key=>game.analytics.keyStats[key]?.miss>0);};
const nativeDamageEnemy=damageEnemy;
damageEnemy=function(amount){
 const before=game.enemyHp,max=game.maxEnemyHp,recipient=game.currentMonster,name=MONSTERS[recipient]?.name;
 nativeDamageEnemy(amount);
 if(amount>0&&before>0){
  showCombatDamage('enemy',Math.min(amount,before),before,max,'',name);
  if(recipient!==game.currentMonster)combatFeedback.enemy.until=0;
  if(amount>=before){
   writeText($('#combat-damage-message'),`Đã hạ ${name||'đối thủ'}!${game.enemyHp>0?' Đối thủ tiếp theo đã vào trận.':''}`);
   if(game.enemyHp>0)combatFeedback.enemy.until=0;
  }
 }
};
const nativeDamagePlayer=damagePlayer;
damagePlayer=function(amount,reason=''){
 const before=game.playerHp,max=game.maxPlayerHp;
 nativeDamagePlayer(amount,reason);
 if(amount>0&&before>0)showCombatDamage('hero',Math.min(amount,before),before,max,reason,'Bạn');
};
const nativeCombatHud=updateHud;
updateHud=function(){nativeCombatHud();updateCombatHealthUI();renderCombatPressure();};

// Combat balance: actual missed attacks matter; Chinese IME preedit is still unjudged.
function combatPressureTier(){return !game.practiceMode&&(performance.now()-game.stageStart)/1000>=60?1:0;}
function combatTargetSeconds(){return targetSeconds;}
function combatMissDamage(){return ({homefall:10,top_anchor:12,bottom_defense:12,word_combo:10,boss_raid:16})[getStage()?.mechanic]||10;}
const nativeProtectedPunishment=punishWithProtection;
punishWithProtection=function(options={}){return nativeProtectedPunishment({...options,hpLoss:game.practiceMode?(options.hpLoss??2):Math.max(options.hpLoss||0,combatMissDamage())});};
const nativeCombatReward=rewardAction;
rewardAction=function(options={}){return nativeCombatReward(game.practiceMode?options:{...options,heal:0});};
const nativeSoftMistake=softMistake;
softMistake=function(reason){nativeSoftMistake(reason);if(game.mode==='playing'&&!game.practiceMode){setHeroState('Injuried',280);triggerEnemyCast();const lateJump=getStage()?.mechanic==='top_anchor'&&game.stageData?.expectedType==='top'&&performance.now()>game.stageData.deadline;damagePlayer(lateJump?12:4,reason||'Gõ sai mục tiêu.');}};
const nativeSetCombatWord=setCurrentWordToken;
setCurrentWordToken=function(data,token){nativeSetCombatWord(data,token);data.wordTimeLeft=combatTargetSeconds();};
const nativeBalancedGameplay=updateGameplay;
updateGameplay=function(dt){
 nativeBalancedGameplay(dt);
 const data=game.stageData;
 if(game.mode!=='playing'||!data||!['word_combo','boss_raid'].includes(getStage()?.mechanic)||game.practiceMode)return;
 if(getStage()?.mechanic==='boss_raid'&&data.guardMode)return;
 if(data.wordGuardWasActive){data.wordGuardWasActive=false;return;}
 data.wordTimeLeft=(data.wordTimeLeft??combatTargetSeconds())-dt;
 if(data.wordTimeLeft<=0){
  recordWordStat(data.currentWord,0,false);triggerEnemyCast();punishWithProtection({hpLoss:combatMissDamage(),reason:getStage()?.mechanic==='boss_raid'?'Hết giờ! Ma vương chủ động xuất chiêu, bạn mất 16 HP.':'Hết giờ nhập từ, đối thủ đánh trúng!'});
  if(game.mode==='playing'){data.wordTimeLeft=combatTargetSeconds();renderPromptForStage();}
 }
};
function renderCombatPressure(){
 let node=$('#combat-pressure');if(!node){node=document.createElement('div');node.id='combat-pressure';el.promptBoard.append(node);}
 const data=game.stageData,mechanic=getStage()?.mechanic;
 let seconds=null;
 if(game.mode==='playing'&&data&&!game.practiceMode){
  if(mechanic==='word_combo'||mechanic==='boss_raid'&&!data.guardMode)seconds=data.wordTimeLeft;
  else if(mechanic==='top_anchor')seconds=(data.deadline-performance.now())/1000;
  else if(data.objects?.length){
   const rect=el.arena.getBoundingClientRect();
   seconds=Math.min(...data.objects.map(o=>mechanic==='homefall'?(rect.height-38-o.y)/o.speed:(o.x-126)/o.speed));
  }else if(mechanic==='boss_raid'&&data.guardMode)seconds=(data.guardDeadline-performance.now())/1000;
 }
 node.hidden=!Number.isFinite(seconds);
 if(!node.hidden){const time=Math.max(0,seconds);writeText(node,`Còn ${(time/combatSpeed).toFixed(1)}s · Bỏ lỡ −${combatMissDamage()} HP`);node.classList.toggle('urgent',time<=2);}
}


// Keep learning measurements in active play time, including row-based Hanzi prompts.
const nativeLearningPause=togglePause;
togglePause=function(force){
 const resume=game.mode==='paused',pausedAt=game.pauseStartedAt;
 nativeLearningPause(force);
 if(resume&&game.mode==='playing'&&pausedAt){
  const gap=performance.now()-pausedAt,data=game.stageData;
  if(game.currentWordStart)game.currentWordStart+=gap;
  if(data?.rowPromptBornAt)data.rowPromptBornAt+=gap;
  for(const obj of data?.objects||[])if(Number.isFinite(obj.hanziBornAt))obj.hanziBornAt+=gap;
 }
};
const nativePhysicalKeyStat=recordKeyStat;
recordKeyStat=function(key,correct){
 if(practice.mode==='zhuyin'&&typeof key==='string'&&key.length===1&&'0123456789,./;-'.includes(key)){
  const stat=game.analytics.keyStats[key]||(game.analytics.keyStats[key]={hit:0,miss:0});stat[correct?'hit':'miss']+=1;return;
 }
 nativePhysicalKeyStat(key,correct);
};
function chargeFirstBossMistake(hpBefore,errorsBefore){
 if(!game.practiceMode&&game.mode==='playing'&&getStage()?.mechanic==='boss_raid'&&game.playerHp===hpBefore&&game.totalTyped-game.correctTyped>errorsBefore)damagePlayer(4,'Gõ sai mục tiêu.');
}
const nativeFirstBossInput=handleBossInput;
handleBossInput=function(...args){const hp=game.playerHp,errors=game.totalTyped-game.correctTyped;nativeFirstBossInput(...args);chargeFirstBossMistake(hp,errors);};
const nativeRatingStars=renderStars;
renderStars=function(stars,max=3){return nativeRatingStars(stars,max).replaceAll('class="off">★','class="off">☆');};


// Endless encounters must save their result for both HP loss and proximity defeat.
const nativeEndlessFailStage=failStage;
failStage=function(reason){
 if(game.endlessBossMode&&getStage()?.mechanic==='boss_raid'){
  if(game.mode==='result')return;
  game.mode='transition';playSfx('lose',.78);openResultScreen(true,'endless-defeat');
  if(game.mode==='result')el.resultSub.textContent=`Kết thúc trận · ${reason||'Ma vương đã áp sát'}`;
  return;
 }
 nativeEndlessFailStage(reason);
};

// Shared deck survives wave resets and moving between the five stages.
const vocabularyDecks=new Map();let activeVocabularyDeck=null;
function selectVocabularyDeck(){
 const key=[practice.mode,practice.system,practice.level,practice.cumulative].join('|');
 if(!vocabularyDecks.has(key))vocabularyDecks.set(key,createVocabularyDeck(practice.mode==='zhuyin'?practice.bopomofo:practice.tokens));
 activeVocabularyDeck=vocabularyDecks.get(key);
}
function nextVocabularyToken(excluded=[]){return activeVocabularyDeck?.next(excluded);}
function drawRowTarget(data){
 if(!data.rowTokens)return pick(data.allowed);
 const used=new Set(data.objects.map(obj=>obj.char));
 const keys=data.allowed.filter(key=>!used.has(key));
 const key=pick(keys.length?keys:data.allowed);
 const token=nextVocabularyToken(data.objects.map(obj=>data.rowTokens[obj.char]?.text));
 // No duplicate concurrent target if a very small pool has been exhausted.
 if(!token)return null;
 data.rowTokens[key]=token;return key;
}
function nextFullVocabularyWord(){
 const data=game.stageData;
 const deck=game.practiceMode?(data.reviewDeck??=createVocabularyDeck(data.words)):activeVocabularyDeck;
 const token=deck?.next();if(token)setCurrentWordToken(data,token);
}
stage4NextWord=nextFullVocabularyWord;
stage5NextWord=nextFullVocabularyWord;

// Configure the actual response window in seconds; no speed conversion is needed.
let targetSeconds=5;const combatSpeed=1;
try{const saved=Number(localStorage.getItem('wuxia_target_seconds_v1'));if(Number.isInteger(saved)&&saved>=1&&saved<=60)targetSeconds=saved;}catch{}
function setTargetSeconds(value){
 const seconds=Number(value);if(!Number.isInteger(seconds)||seconds<1||seconds>60)return false;
 reflowHomefallObjects();
 targetSeconds=seconds;try{localStorage.setItem('wuxia_target_seconds_v1',String(seconds));}catch{}
 const input=$('#target-seconds');if(input)input.value=String(seconds);
 document.querySelectorAll('[data-target-seconds]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.targetSeconds)===seconds)));
 const data=game.stageData;
 if(data&&(game.mode==='playing'||game.mode==='paused')){
  data.wordTimeLeft=seconds;
  const now=game.mode==='paused'?game.pauseStartedAt:performance.now();
  if(getStage()?.mechanic==='top_anchor'&&data.expectedType==='top'){data.deadlineDuration=seconds*1000;data.deadline=now+seconds*1000;}
  const rect=el.arena.getBoundingClientRect();
  for(const obj of data.objects||[]){if(getStage()?.mechanic==='homefall')obj.speed=Math.max(.1,(rect.height-38-obj.y)/seconds);else if(getStage()?.mechanic==='bottom_defense')obj.speed=Math.max(.1,(obj.x-126)/seconds);}
 }
 return true;
}
function mountCombatSpeedControls(){
 const controls=document.createElement('div');controls.id='combat-controls';el.btnPause.before(controls);controls.append(el.btnPause);
 const group=document.createElement('div');group.id='combat-speed';group.setAttribute('role','group');group.setAttribute('aria-label','Thời gian nhập mỗi từ');
 const label=document.createElement('label');label.htmlFor='target-seconds';label.textContent='Giây / từ';group.append(label);
 for(const seconds of [3,5,8,10]){const button=document.createElement('button');button.type='button';button.className='wood-btn';button.dataset.targetSeconds=seconds;button.textContent=seconds+'s';button.onpointerdown=event=>event.preventDefault();button.onclick=()=>setTargetSeconds(seconds);group.append(button);}
 const input=document.createElement('input');input.id='target-seconds';input.type='number';input.min='1';input.max='60';input.step='1';input.setAttribute('aria-label','Số giây cho mỗi từ, từ 1 đến 60');input.onchange=()=>{if(!setTargetSeconds(input.value))input.value=String(targetSeconds);};input.onkeydown=event=>{event.stopPropagation();if(event.key==='Enter'){event.preventDefault();input.onchange();input.blur();}};group.append(input);
 const unit=document.createElement('span');unit.className='seconds-unit';unit.textContent='giây (1–60)';group.append(unit);
 group.title='Mỗi từ mặc định 5 giây. Đổi số giây bất cứ lúc nào; mỗi lượt vẫn dài 3 phút.';controls.append(group);setTargetSeconds(targetSeconds);
}
const nativeHiddenHanziPhonetic=getTokenPhonetic;
getTokenPhonetic=function(token){return practice.mode==='zhuyin'?nativeHiddenHanziPhonetic(token):'';};
// Boss attacks on its own schedule, even while the player keeps answering.
getBossGuardCooldown=function(phase=1){return phase>=3?4:phase===2?5:6;};
const nativeActiveBossUpdate=updateBossRaid;
updateBossRaid=function(dt){const data=game.stageData,wasGuard=data?.guardMode;nativeActiveBossUpdate(dt);if(data&&game.stageData===data&&(wasGuard||data.guardMode)){data.wordGuardWasActive=true;}};
const nativeSpeedGameplay=updateGameplay;
updateGameplay=function(dt){
 const data=game.stageData;
 // These two original mechanics use wall-clock deadlines rather than dt timers.
 if(data){const extension=dt*(1-combatSpeed)*1000;
  if(getStage()?.mechanic==='top_anchor'&&data.deadline>0)data.deadline+=extension;
  if(getStage()?.mechanic==='boss_raid'&&data.guardMode&&data.guardDeadline>0)data.guardDeadline+=extension;
 }
 nativeSpeedGameplay(dt*combatSpeed);
};

// Per-run learning detail is separate from scoring and the persistent profile.
const nativeDetailedResetRun=resetRun;
resetRun=function(...args){nativeDetailedResetRun(...args);game.analytics={keyStats:{},wordStats:{},practiceReview:{}};};
function practiceReviewItem(word,token=null){
 if(!word)return null;
 const hanzi=practice.mode==='zhuyin'?token?.hanzi:null;
 const label=hanzi?`${hanzi} · ${word}`:word;
 const items=game.analytics.practiceReview??={};
 return items[label]??={label,correct:0,wrong:0};
}
const nativeDetailedWordStat=recordWordStat;
recordWordStat=function(word,duration,correct){
 nativeDetailedWordStat(word,duration,correct);
 const token=game.stageData?.currentToken;
 const item=practiceReviewItem(word,getTokenText(token)===word?token:null);
 if(item)item[correct?'correct':'wrong']++;
};
const nativeDetailedSetWord=setCurrentWordToken;
setCurrentWordToken=function(data,token){nativeDetailedSetWord(data,token);practiceReviewItem(getTokenText(token),token);};
const nativeDetailedRowTarget=drawRowTarget;
drawRowTarget=function(data){const key=nativeDetailedRowTarget(data);if(key){const token=data.rowTokens?.[key];practiceReviewItem(token?.text||getKeyVisualLabel(key));}return key;};
const nativeDetailedTopPrompt=stage2NextPrompt;
stage2NextPrompt=function(){nativeDetailedTopPrompt();const data=game.stageData;if(data?.expectedType==='top')practiceReviewItem(getKeyVisualLabel(data.expectedKey));};
const nativeDetailedKeyStat=recordKeyStat;
recordKeyStat=function(key,correct){
 nativeDetailedKeyStat(key,correct);
 if(practice.mode!=='zhuyin'||!['homefall','top_anchor','bottom_defense'].includes(getStage()?.mechanic))return;
 const data=game.stageData;
 const target=correct?key:getStage().mechanic==='top_anchor'?data.expectedKey:displayRowEntries(data,getStage().mechanic)[0]?.[0];
 // F/J defense keys are not vocabulary or Zhuyin-symbol practice items.
 if(getStage().mechanic==='top_anchor'&&data.expectedType==='anchor')return;
 const item=target&&practiceReviewItem(getKeyVisualLabel(target));if(item)item[correct?'correct':'wrong']++;
};
function resultText(parent,tag,text){const node=document.createElement(tag);node.textContent=text;parent.append(node);return node;}
function resultDisclosure(id,title){
 document.getElementById(id)?.remove();const node=document.createElement('details');node.id=id;node.className='result-disclosure';
 resultText(node,'summary',title);document.getElementById('learning-report').before(node);return node;
}
function renderPracticeReview(){
 const rows=sortedPracticeReview(game.analytics.practiceReview);
 const node=resultDisclosure('result-practice-detail',`Xem từ / ký hiệu đã luyện (${rows.length})`);
 resultText(node,'p','Xếp từ sai nhiều nhất lên đầu. “Sai / bỏ lỡ” gồm nhập sai và mục tiêu hết giờ; một từ có thể vừa đúng vừa sai.');
 if(!rows.length){resultText(node,'p','Chưa có mục tiêu nào trong lượt này.');return;}
 const table=document.createElement('table');table.className='practice-review-table';node.append(table);
 const head=table.createTHead().insertRow();for(const text of ['Từ / ký hiệu','Đúng','Sai / bỏ lỡ','Kết quả'])resultText(head,'th',text);
 const body=table.createTBody();
 for(const item of rows){const row=body.insertRow();if(item.wrong)row.className='needs-review';
  for(const text of [item.label,item.correct,item.wrong,item.wrong?'Cần luyện lại':item.correct?'Đã nhập đúng':'Chưa trả lời'])resultText(row,'td',String(text));
 }
}
function renderScoreExplanation(){
 const acc=calcAccuracy(),stage=getStage(),base=Math.round(game.stageScore),judge=buildJudgeScore(base,acc,game.maxCombo,game.totalTyped);
 const node=resultDisclosure('result-score-detail','Vì sao có số sao và xếp hạng này?');
 resultText(node,'p',`Điểm chiến đấu ${base.toLocaleString('vi-VN')} + chính xác ${judge.accScore.toLocaleString('vi-VN')} + liên kích ${judge.comboScore.toLocaleString('vi-VN')} + số lượt nhập ${judge.typedScore.toLocaleString('vi-VN')} = ${judge.total.toLocaleString('vi-VN')} điểm.`);
 resultText(node,'p','Điểm chính xác = % chính xác × 26; liên kích = chuỗi dài nhất × 34; số lượt nhập = tối đa 500 lượt × 8. Điểm chiến đấu gồm đòn đánh, thưởng và phạt trong trận.');
 if(game.practiceMode){resultText(node,'p','Luyện bổ sung không chấm sao hoặc xếp hạng thi đấu.');return;}
 const rating=game.endlessBossMode?evaluateSpecialModeResult('endlessBoss',judge.total,acc,game.maxCombo,game.totalTyped,game.stageCycles):evaluateStageResult(stage?.id||1,judge.total,acc,game.maxCombo,game.totalTyped);
 resultText(node,'p',`Ngưỡng điểm: ★ ${rating.tiers[0].toLocaleString('vi-VN')} · ★★ ${rating.tiers[1].toLocaleString('vi-VN')} · ★★★ ${rating.tiers[2].toLocaleString('vi-VN')}. Kết quả: ${rating.stars}/3 sao · hạng ${rating.grade}.`);
 if(game.endlessBossMode){resultText(node,'p','Ma vương vô tận còn nhận 1 / 2 / 3 sao khi vượt 3 / 8 / 15 vòng. Hạng S: 3 sao, chính xác ≥ 93%, chuỗi ≥ 28 và ≥ 220 lượt nhập; hạng A: ít nhất 2 sao và chính xác ≥ 90%. Các trường hợp còn lại: 3 / 2 / 1 / 0 sao tương ứng A / B / C / D.');}
 else{
  resultText(node,'p','Sao dựa trên tổng điểm, không chỉ % chính xác. Hạng S: 3 sao, chính xác ≥ 96%, chuỗi ≥ 26 và ≥ 180 lượt nhập. Nếu chưa đạt S: chính xác ≥ 92% và ít nhất 2 sao → A; nếu chưa đạt A: chính xác ≥ 86% và ít nhất 1 sao → B. Nếu không khớp các điều kiện trên, dùng hạng gốc theo sao: 3 / 2 / 1 / 0 sao → A / B / C / D.');
  if(rating.stars<3)resultText(node,'p',`Cần thêm ${(rating.tiers[rating.stars]-judge.total).toLocaleString('vi-VN')} điểm để đạt ${rating.stars+1} sao.`);
 }
 resultText(node,'p','Chơi chậm giúp có thêm thời gian nhập, nhưng trong 3 phút có thể ghi ít điểm hơn. Ngưỡng sao hiện tại giống nhau ở mọi tốc độ; hạng này phản ánh kết quả trò chơi, không phải trình độ tiếng Trung.');
}
const nativeDetailedResult=openResultScreen;
openResultScreen=function(...args){nativeDetailedResult(...args);if(game.mode==='result'){renderScoreExplanation();renderPracticeReview();}};

(async function bootVietnameseGame(){
 try{const response=await fetch('/data/manifest.json');if(response.ok)practice.manifest=await response.json();}catch{}
 await bootstrap();bindPracticeControls();mountCombatSpeedControls();openPracticeSetup('mode');
})();
