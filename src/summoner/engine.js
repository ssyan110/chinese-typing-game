// Tự Linh: independent turn-based vocabulary combat. No reference-game imports.
export const ENCOUNTERS={
 guardian:{name:'Ngọc vệ',place:'Vườn kính',description:'Ba lần giao phong sẽ có một lượt phòng thủ.',hp:108,counter:7,defendEvery:3,art:'jade-guardian'},
 moth:{name:'Linh điệp',place:'Vòm nguyệt',description:'Hoàn thành trong nửa thời gian để nhận thêm 5 sát thương.',hp:132,counter:8,defendEvery:3,art:'moon-moth'},
 sentinel:{name:'Đèn vệ',place:'Cổng bình minh',description:'Phòng thủ sau mỗi lần tấn công. Chọn pháp thuật để giữ HP.',hp:156,counter:10,defendEvery:2,art:'lantern-sentinel'}
};
export const LEARNING_RULES=Object.freeze({wrong:2,promptPenaltyCap:6,cleanRecovery:1,counter:{guardian:2,moth:3,sentinel:4}});
const clean=value=>String(value??'').normalize('NFC').replace(/[\s\u3000]/g,'');
export function selectVocabulary(rows,system,level,cumulative,mode){
 const levels=system==='hsk'?['1','2','3','4','5','6','7-9']:['N1','N2','A1','A2','B1','B2','C1'];
 const allowed=new Set(cumulative?levels.slice(0,levels.indexOf(level)+1):[level]),seen=new Set();
  return rows.filter(w=>{const label=clean(mode==='zhuyin'?w.z:mode==='traditional'?w.t:w.s),identity=mode==='zhuyin'?clean(w.t)+'|'+label:label;if(!allowed.has(w.level)||!label||mode==='zhuyin'&&!w.keys||seen.has(identity))return false;seen.add(identity);return true;});
}
export function makeDeck(words,rng=Math.random,previousFirst){
 if(!words.length)throw new Error('Vocabulary pool is empty');let deck=[],last=previousFirst;
 return ()=>{if(!deck.length){deck=[...words];for(let i=deck.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[deck[i],deck[j]]=[deck[j],deck[i]];}if(deck.length>1&&deck.at(-1).id===last)[deck[0],deck[deck.length-1]]=[deck.at(-1),deck[0]];}const word=deck.pop();last=word.id;return word;};
}
export class Duel{
 constructor({words,mode='simplified',encounter='guardian',seconds=5,kind='duel',rng=Math.random,previousFirst,initialPractice={}}={}){
  this.words=words;this.mode=mode;this.encounter=ENCOUNTERS[encounter]?encounter:'guardian';this.seconds=Math.max(1,Math.min(60,Number(seconds)||5));this.kind=kind;const draw=makeDeck(words,rng,previousFirst);this.battleWords=kind==='duel'?Array.from({length:Math.min(20,words.length)},()=>draw()):words;this.deck=kind==='duel'?makeDeck(this.battleWords,rng,previousFirst):draw;this.campaignQueue=['campaign','duel'].includes(kind)?this.battleWords.map(()=>this.deck()):[];this.practiceGoal=['campaign','duel'].includes(kind)?3:1;this.practiceCounts=new Map(this.battleWords.map(w=>[w.id,Math.max(0,Math.min(2,Number(initialPractice[w.id])||0))]));this.completedIds=new Set();this.practiceDone=[...this.practiceCounts.values()].reduce((a,b)=>a+b,0);this.practiceTotal=this.battleWords.length*this.practiceGoal;
  Object.assign(this,{status:'playing',hp:100,shield:0,energy:2,power:0,round:1,turn:0,correct:0,errors:0,misses:0,blocks:0,combo:0,maxCombo:0,score:0,elapsed:0,spell:'strike',progress:0,revision:0,notice:'',outcome:'',lastWrong:null});this.stats=new Map();this.beginRound();
 }
 get learning(){return ['campaign','duel'].includes(this.kind);}
 get counterDamage(){return this.learning?LEARNING_RULES.counter[this.encounter]:this.enemy.counter+(this.kind==='endless'?this.round-1:0);}
 get timeoutDamage(){return this.learning?LEARNING_RULES.promptPenaltyCap:22;}
 get enemy(){return ENCOUNTERS[this.encounter];}
 beginRound(){this.enemyMax=this.kind==='campaign'?this.words.length*36:this.kind==='duel'?Math.max(this.battleWords.length*36,this.enemy.hp*3+96):this.enemy.hp+(this.round-1)*16;this.enemyHp=this.enemyMax;this.turn=0;this.next();}
 next(){
  if(this.status!=='playing')return;if(['campaign','duel'].includes(this.kind)&&!this.campaignQueue.length){const pending=this.battleWords.filter(w=>(this.practiceCounts.get(w.id)||0)<this.practiceGoal),draw=makeDeck(pending.length?pending:this.battleWords,Math.random,this.target?.id);this.campaignQueue=(pending.length?pending:this.battleWords).map(()=>draw());}const w=['campaign','duel'].includes(this.kind)?this.campaignQueue.shift():this.deck();this.target={id:w.id,label:clean(this.mode==='zhuyin'?w.z:this.mode==='traditional'?w.t:w.s),input:clean(w.keys),word:w};
  if(!this.stats.has(w.id))this.stats.set(w.id,{id:w.id,label:this.target.label,correct:0,wrong:0,missed:0,shown:0});this.stats.get(w.id).shown++;
  this.turn++;this.defending=this.kind!=='review'&&this.turn%this.enemy.defendEvery===0;this.remaining=this.seconds;this.progress=0;this.lastWrong=null;this.targetHadError=false;this.promptPenalty=0;this.revision++;
 }
 choose(spell){if(this.status!=='playing'||!['strike','ward','mend'].includes(spell))return false;const cost={strike:0,ward:1,mend:2}[spell];if(this.energy<cost)return false;this.spell=spell;return true;}
 edit(text){if(clean(text)!==this.lastWrong)this.lastWrong=null;}
 submit(raw){
  if(this.status!=='playing'||this.mode==='zhuyin')return 'ignored';const text=clean(raw);this.edit(text);if(!text)return 'empty';
  if(text===this.target.label){this.succeed();return 'correct';}if(this.target.label.startsWith(text))return 'partial';if(!/\p{Script=Han}/u.test(text))return 'preedit';
  if(this.lastWrong===text)return 'unchanged';this.lastWrong=text;this.wrong(4);return 'wrong';
 }
 key(key){
  if(this.mode!=='zhuyin'||this.status!=='playing')return 'ignored';if(key===this.target.input[this.progress]){this.progress++;this.revision++;if(this.progress===this.target.input.length){this.succeed();return 'correct';}return 'partial';}this.wrong(3);return 'wrong';
 }
 wrong(damage){this.targetHadError=true;this.errors++;this.combo=0;this.stats.get(this.target.id).wrong++;this.score=Math.max(0,this.score-20);const before=this.hp;if(this.kind!=='review'){const charge=this.learning?Math.min(LEARNING_RULES.wrong,Math.max(0,LEARNING_RULES.wrong-this.promptPenalty)):damage;if(this.learning)this.promptPenalty+=charge;this.hurt(charge);}this.notice=this.kind==='review'?'Chưa đúng. Thử lại nhé.':this.hp<before?`Chưa đúng · −${before-this.hp} HP`:this.learning&&this.promptPenalty>=LEARNING_RULES.wrong?'Chưa đúng · thử lại, không trừ thêm HP ở mục tiêu này.':'Chưa đúng · khiên đã hấp thụ sát thương';this.revision++;}
 hurt(damage){if(this.status!=='playing')return;const blocked=Math.min(this.shield,damage);this.shield-=blocked;this.hp=Math.max(0,this.hp-(damage-blocked));if(this.hp===0){this.status='lost';this.outcome='Đã hết HP';this.revision++;}}
 succeed(){
  if(this.status!=='playing')return;this.correct++;this.combo++;this.maxCombo=Math.max(this.maxCombo,this.combo);this.stats.get(this.target.id).correct++;this.lastPracticeCredited=!this.targetHadError;const count=Math.min(this.practiceGoal,(this.practiceCounts.get(this.target.id)||0)+(this.lastPracticeCredited?1:0));this.practiceCounts.set(this.target.id,count);this.practiceDone=[...this.practiceCounts.values()].reduce((a,b)=>a+b,0);if(count>=this.practiceGoal)this.completedIds.add(this.target.id);this.score+=100+Math.min(this.combo,20)*5;
  if(this.kind==='review'){this.notice='Đúng rồi!';if(this.correct>=Math.min(10,this.words.length)){this.status='won';this.outcome='Đã hoàn thành lượt ôn';}else this.next();this.revision++;return;}
  const spell=this.energy>=({strike:0,ward:1,mend:2}[this.spell])?this.spell:'strike';this.spell=spell;const hpBeforeSpell=this.hp;if(this.learning&&this.lastPracticeCredited)this.hp=Math.min(100,this.hp+LEARNING_RULES.cleanRecovery);
  if(spell==='strike')this.energy=Math.min(3,this.energy+1);else if(spell==='ward'){this.energy--;this.shield=Math.min(30,this.shield+14);}else{this.energy-=2;this.hp=Math.min(100,this.hp+12);}
  let damage=(this.defending?10:{strike:18,ward:10,mend:9}[spell])+this.power;if(this.encounter==='moth'&&this.remaining>=this.seconds/2)damage+=5;
  const sealed=['campaign','duel'].includes(this.kind),finalSeal=sealed&&this.completedIds.size===this.battleWords.length;
  // A chapter is a sealed boss: damage matters, but all vocabulary seals must break.
  damage=Math.min(damage,Math.max(0,this.enemyHp-(sealed?Math.max(finalSeal?0:1,(this.practiceTotal-this.practiceDone)*9):0)));
  this.lastAction={spell,defending:this.defending,finisher:finalSeal&&damage>=this.enemyHp,enemyDamage:damage,heroDamage:0,blocked:0,heal:Math.max(0,this.hp-hpBeforeSpell),counter:false};this.enemyHp=Math.max(0,this.enemyHp-damage);this.notice=`${this.defending?'Đỡ đòn thành công':'Triệu hồi thành công'} · đối thủ −${damage} HP`;if(!this.lastPracticeCredited)this.notice+=' · Đã sửa đúng; từ sẽ quay lại, lượt này chưa cộng vào 3 lần.';
  if(this.defending){this.blocks++;this.score+=30;}
  if(this.enemyHp===0){
   if(this.kind==='endless'){this.status='reward';this.outcome='Đã hạ đối thủ · chuẩn bị đợt tiếp theo';}
   else{this.status='won';this.outcome=finalSeal?'Đã luyện đủ từ và hạ thủ lĩnh':'Đã hạ thủ lĩnh';}
   this.revision++;return;
  }
  const supply=sealed&&this.correct>0&&this.correct%5===0;
  if(supply){this.status='reward';this.outcome='Chọn tiếp sức · đối thủ không hồi HP';this.revision++;return;}
  if(!this.defending){const before=this.hp,shieldBefore=this.shield;this.hurt(this.counterDamage);this.lastAction.counter=true;this.lastAction.heroDamage=before-this.hp;this.lastAction.blocked=shieldBefore-this.shield;this.notice+=this.hp<before?` · bạn −${before-this.hp} HP`:' · khiên đã đỡ đòn';}
  if(this.status==='playing')this.next();this.revision++;
 }
 tick(dt){if(this.status!=='playing'||!Number.isFinite(dt)||dt<=0)return;this.elapsed+=dt;if(this.kind==='review')return;this.remaining=Math.max(0,this.remaining-dt);if(this.remaining===0){this.misses++;this.combo=0;const stat=this.stats.get(this.target.id);stat.wrong++;stat.missed++;const damage=this.learning?Math.max(0,this.timeoutDamage-this.promptPenalty):this.timeoutDamage;this.notice=`Hết giờ · đối thủ gây ${damage} sát thương`;this.hurt(damage);if(this.status==='playing'){if(['campaign','duel'].includes(this.kind))this.campaignQueue.push(this.target.word);this.next();}this.revision++;}}
 reward(kind){if(this.status!=='reward'||!['heal','power','shield'].includes(kind))return false;if(kind==='heal')this.hp=Math.min(100,this.hp+25);if(kind==='power')this.power+=3;if(kind==='shield')this.shield=Math.min(30,this.shield+20);this.round++;this.status='playing';if(this.kind==='endless')this.beginRound();else this.next();return true;}
 setSeconds(value){const n=Number(value);if(!Number.isInteger(n)||n<1||n>60)return false;this.seconds=n;if(this.status==='playing'||this.status==='paused')this.remaining=n;this.revision++;return true;}
 pause(){if(this.status==='playing'){this.status='paused';this.revision++;}}
 resume(){if(this.status==='paused'){this.status='playing';this.revision++;}}
 finish(){if(['playing','paused','reward'].includes(this.status)){this.status='ended';this.outcome='Đã dừng và lưu lượt luyện';this.revision++;}}
 result(){
  const total=this.correct+this.errors+this.misses,accuracy=total?Math.round(this.correct/total*100):0,won=this.status==='won';
  const stars=['duel','campaign'].includes(this.kind)?(won?(accuracy>=90?3:accuracy>=75?2:1):0):null;
  const grade=this.kind==='review'?'Ôn tập':!won&&['duel','campaign'].includes(this.kind)?'D':accuracy>=95&&this.maxCombo>=8?'S':accuracy>=90?'A':accuracy>=75?'B':'C';
  return {status:this.status,kind:this.kind,correct:this.correct,errors:this.errors,misses:this.misses,accuracy,stars,grade,score:this.score,round:this.round,combo:this.maxCombo,elapsed:Math.round(this.elapsed),practiceDone:this.practiceDone,practiceTotal:this.practiceTotal,practicedWords:this.completedIds.size,rows:[...this.stats.values()].sort((a,b)=>b.wrong-a.wrong||b.correct-a.correct||a.label.localeCompare(b.label,'zh-Hant'))};
 }
}
