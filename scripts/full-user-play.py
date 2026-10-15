"""Play using visible UI and keyboard; never change gameplay clocks, HP or targets."""
from pathlib import Path
import subprocess, json, sys, time, argparse
ROOT=Path(__file__).resolve().parents[1]
CLI='/Users/ssyan110/.codex/skills/playwright/scripts/playwright_cli.sh'
SOURCE=(ROOT/'scripts/browser-user-play.js').read_text()
OUT=ROOT/'output/full-user-play'
OUT.mkdir(exist_ok=True)
configs=[{'mode':m,'system':'hsk' if m=='simplified' else 'tocfl','level':'1' if m=='simplified' else 'N1','index':i} for m in ['simplified','traditional','zhuyin'] for i in range(5)]
parser=argparse.ArgumentParser()
parser.add_argument('--mode',choices=['simplified','traditional','zhuyin'])
parser.add_argument('--session',default='fullqa')
parser.add_argument('--case',type=int)
parser.add_argument('--stage',type=int)
parser.add_argument('--suite',default='20261015-v2')
parser.add_argument('--suffix',default='')
args=parser.parse_args()
if args.case is not None: configs=[configs[args.case]]
if args.mode: configs=[c for c in configs if c['mode']==args.mode]
if args.stage: configs=[c for c in configs if c['index']==args.stage-1]
for config in configs: config['suite']=args.suite;config['suffix']=args.suffix
summary=OUT/f'completed-{args.mode or "all"}-{args.suite}.json'
results=json.loads(summary.read_text()) if summary.exists() else []
for config in configs:
    tag=f"{config['mode']}-stage{config['index']+1}"+('-'+args.suffix if args.suffix else '')
    existing=OUT/f'{tag}.json'
    if existing.exists():
        prior=json.loads(existing.read_text())
        if prior.get('finished') and prior.get('outcome',{}).get('mode')=='result' and prior.get('config',{}).get('suite')==config['suite']:
            print(f'Skipping completed {tag}',flush=True);continue
    for step in range(12):
        cmd={'action':'begin' if step==0 else 'step','config':config,'seconds':28}
        r=subprocess.run([CLI,'-s='+args.session,'run-code',SOURCE.replace('__COMMAND__',json.dumps(cmd))],cwd=ROOT,text=True,capture_output=True)
        (OUT/f'{tag}-step{step+1}.log').write_text(r.stdout+r.stderr)
        if r.returncode or '### Error' in r.stdout:
            print(json.dumps({'case':tag,'error':(r.stdout+r.stderr)[-1800:]}),flush=True);sys.exit(1)
        r=subprocess.run([CLI,'-s='+args.session,'eval','() => window.__userPlay'],cwd=ROOT,text=True,capture_output=True)
        raw=r.stdout
        try: result=json.loads(raw.split('### Result\n',1)[1].split('\n### ',1)[0])
        except Exception: print(raw,flush=True);sys.exit(2)
        (OUT/f'{tag}.json').write_text(json.dumps(result,ensure_ascii=False,indent=2))
        print(json.dumps({'case':tag,'step':step+1,'sample':result['samples'][-1],'actions':result['actions'],'guards':result['guards'],'ultimates':result['ultimates'],'finished':result['finished']},ensure_ascii=False),flush=True)
        if result['finished']:break
    else: print('Case exceeded step budget',flush=True);sys.exit(3)
    results.append(result)
    summary.write_text(json.dumps(results,ensure_ascii=False,indent=2))
    if result['outcome']['mode']!='result':print('Player reached failure screen; inspect before continuing.',flush=True);sys.exit(4)
