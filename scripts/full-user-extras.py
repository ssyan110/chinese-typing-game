"""Run review practice, replay and endless combat through existing UI controls."""
from pathlib import Path
import subprocess,json,argparse
ROOT=Path(__file__).resolve().parents[1]
CLI='/Users/ssyan110/.codex/skills/playwright/scripts/playwright_cli.sh'
parser=argparse.ArgumentParser();parser.add_argument('--session',required=True);parser.add_argument('--mode',required=True);parser.add_argument('--practice-only',action='store_true');parser.add_argument('--direct-review',action='store_true');parser.add_argument('--endless-only',action='store_true');args=parser.parse_args()
OUT=ROOT/'output/full-user-play';SOURCE=(ROOT/'scripts/browser-user-play.js').read_text()
def run(code,label):
 r=subprocess.run([CLI,'-s='+args.session,'run-code',code],cwd=ROOT,capture_output=True,text=True);(OUT/f'{args.mode}-{label}.log').write_text(r.stdout+r.stderr)
 if r.returncode or '### Error' in r.stdout:raise RuntimeError((r.stdout+r.stderr)[-2000:])
def value(expr):
 r=subprocess.run([CLI,'-s='+args.session,'eval',expr],cwd=ROOT,capture_output=True,text=True)
 return json.loads(r.stdout.split('### Result\n',1)[1].split('\n### ',1)[0])
def steps(tag,command,max_steps):
 for i in range(max_steps):
  run(SOURCE.replace('__COMMAND__',json.dumps({'action':command,'seconds':25})),f'{tag}-step{i+1}')
  result=value('() => window.__userPlay');(OUT/f'{args.mode}-{tag}.json').write_text(json.dumps(result,ensure_ascii=False,indent=2));print(json.dumps({'mode':args.mode,'case':tag,'step':i+1,'sample':result['samples'][-1],'finished':result['finished']},ensure_ascii=False),flush=True)
  if result['finished']:return result
 return result
if not args.endless_only:
 if args.direct_review:
  run('''async(page)=>{
   await page.goto('http://127.0.0.1:4186/');await page.bringToFront();await page.locator('#practice-setup.show').waitFor({timeout:40000});
   await page.evaluate(()=>{PROFILE_STORAGE_KEY='wuxia_full_user_qa_v1';game.profile=JSON.parse(JSON.stringify(originalProfileDefaults));readProfile();});
   await page.locator('[data-practice-mode=MODE]').click();await page.locator('#enter-original-game').click();await page.locator('#title-screen.show').waitFor();
   // Controlled entry only: the real result-to-review path was already played.
   await page.evaluate(()=>{el.btnPractice.click();window.__startReviewDirect=true;});
  }'''.replace('MODE',args.mode),'review-fixture-entry')
 run('''async(page)=>{
  const direct=await page.evaluate(()=>!!window.__startReviewDirect);
  if(!direct&&!await page.locator('#result-screen.show').isVisible())throw Error('Expected completed timed-game result');
  const mode=await page.evaluate(()=>practice.mode);
  if(!direct)await page.locator('#btn-practice').click();
  for(let i=0;i<8;i++){if(await page.evaluate(()=>game.mode)==='dialogue')await page.locator('#dialogue-next').click();else break;}
  await page.waitForFunction(()=>game.mode==='playing');
  await page.evaluate(mode=>{if(!game.practiceMode||game.independentStageMode)throw Error('Practice flags wrong');window.__userPlay={config:{mode,index:3,practice:true},started:Date.now(),actions:0,guards:0,ultimates:0,wrongInputs:0,autoPauses:0,errors:[],samples:[],finished:false};},mode);
 }''','practice-begin')
 p=steps('practice','step',4)
 if not p['finished'] or p['outcome']['mode']!='result':raise RuntimeError('Review practice did not finish naturally')
 run('''async(page)=>{
  const plan=await page.evaluate(()=>JSON.stringify(game.practicePlan));await page.locator('#btn-replay').click();
  for(let i=0;i<8;i++){if(await page.evaluate(()=>game.mode)==='dialogue')await page.locator('#dialogue-next').click();else break;}
  await page.waitForFunction(()=>game.mode==='playing');
  await page.evaluate(plan=>{window.__practiceReplayCheck={practice:game.practiceMode,independent:game.independentStageMode,samePlan:JSON.stringify(game.practicePlan)===plan};},plan);
  await page.keyboard.press('Escape');await page.locator('#btn-pause-to-title').click();await page.locator('#btn-select-back').click();
 }''','practice-replay')
 replay=value('() => window.__practiceReplayCheck');(OUT/f'{args.mode}-practice-replay.json').write_text(json.dumps(replay,indent=2));print('Practice replay '+json.dumps(replay),flush=True)
 if not replay['practice'] or replay['independent'] or not replay['samePlan']:raise RuntimeError('Practice replay did not preserve review mode and words')
 if args.practice_only:raise SystemExit(0)
else:
 run('''async(page)=>{
  await page.goto('http://127.0.0.1:4186/');await page.bringToFront();await page.locator('#practice-setup.show').waitFor({timeout:40000});
  await page.evaluate(()=>{PROFILE_STORAGE_KEY='wuxia_full_user_qa_v1';game.profile=JSON.parse(JSON.stringify(originalProfileDefaults));readProfile();});
  await page.locator('[data-practice-mode=MODE]').click();await page.locator('#enter-original-game').click();await page.locator('#title-screen.show').waitFor();
 }'''.replace('MODE',args.mode),'endless-cold-entry')
run('''async(page)=>{
 await page.locator('#btn-stage5').click();await page.waitForFunction(()=>game.mode==='playing');
 await page.evaluate(()=>{window.__userPlay={config:{mode:practice.mode,index:4,endless:true},started:Date.now(),actions:0,guards:0,ultimates:0,wrongInputs:0,autoPauses:0,errors:[],samples:[],finished:false};if(!game.endlessBossMode||game.independentStageMode)throw Error('Not in endless mode');});
}''','endless-begin')
e=steps('endless-active','step',2)
if not e['finished']:e=steps('endless-idle','idle',8)
if not e['finished'] or e['outcome']['mode']!='result':raise RuntimeError('Endless defeat did not reach results')
run('''async(page)=>{
 await page.evaluate(()=>{window.__endlessRecordCheck={record:getSpecialRecord('endlessBoss'),text:document.querySelector('#result-card').innerText};});
 await page.locator('#btn-replay').click();await page.waitForFunction(()=>game.mode==='playing');
 if(!await page.evaluate(()=>game.endlessBossMode&&!game.independentStageMode))throw Error('Endless replay changed mode');
 await page.keyboard.press('Escape');await page.locator('#btn-pause-to-title').click();await page.locator('#btn-select-back').click();
}''','endless-record-replay')
r=value('() => window.__endlessRecordCheck');(OUT/f'{args.mode}-endless-record.json').write_text(json.dumps(r,ensure_ascii=False,indent=2));print('Endless record '+json.dumps(r['record']),flush=True)
