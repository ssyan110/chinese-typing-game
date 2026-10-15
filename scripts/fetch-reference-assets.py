from pathlib import Path
import json,hashlib
from concurrent.futures import ThreadPoolExecutor
from urllib.request import urlopen,Request
root=Path('/Users/ssyan110/Development/chinese_typing_game').resolve()
dest=(root/'public/game').resolve()
assert dest.is_relative_to(root)
paths=sorted(set(json.loads((root/'data/upstream/game-assets.json').read_text())))
def fetch(rel):
 target=(dest/rel).resolve()
 assert target.is_relative_to(dest)
 url='https://html-classic.itch.zone/html/16593187/'+rel
 try:
  if not target.exists():
   with urlopen(Request(url,headers={'User-Agent':'Mozilla/5.0'}),timeout=45) as res:data=res.read()
   target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(data)
  data=target.read_bytes()
  return {'path':rel,'url':url,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest()}
 except Exception as e:return {'path':rel,'error':str(e)}
with ThreadPoolExecutor(max_workers=6) as pool:results=list(pool.map(fetch,paths))
(root/'data/upstream/game-asset-manifest.json').write_text(json.dumps(results,indent=2))
print(json.dumps({'downloaded':len([r for r in results if 'bytes' in r]),'bytes':sum(r.get('bytes',0) for r in results),'failed':[r for r in results if 'error' in r]},indent=2))
