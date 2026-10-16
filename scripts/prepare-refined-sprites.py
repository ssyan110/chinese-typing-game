"""Slice the AI-authored transparent sheet into game-ready lossless-alpha WebP assets."""
from pathlib import Path
from PIL import Image
import json
root=Path(__file__).resolve().parents[1]
sheet=Image.open(root/'output/refined-sprite-sheet.png').convert('RGBA')
names=['hero-stand','hero-attack','hero-defense','hero-jump','jade-guardian','moon-moth','jade-dragon','lantern-sentinel']
for i,name in enumerate(names):
 row,col=divmod(i,4);top,bottom=(0,482) if row==0 else (484,1024)
 cell=sheet.crop((col*384,top,(col+1)*384,bottom))
 cell.save(root/f'public/original/art/refined/{name}.webp',format='WEBP',quality=94,method=6)
# The second sheet provides full, separated wing and tail silhouettes.
monsters=Image.open(root/'output/refined-monster-sheet.png').convert('RGBA')
w,h=monsters.size
for i,name in enumerate(names[4:]):
 row,col=divmod(i,2)
 cell=monsters.crop((col*w//2,row*h//2,(col+1)*w//2,(row+1)*h//2))
 cell.thumbnail((384,512),Image.Resampling.LANCZOS)
 cell.save(root/f'public/original/art/refined/{name}.webp',format='WEBP',quality=94,method=4)
map_path=root/'public/original/art-map.json';mapping=json.loads(map_path.read_text());overrides={};families=names[4:];idx=0;labels={}
for old in mapping:
 if '/character/' in old:
  state=old.rsplit('/',1)[1].split('-')[0];pose={'run':'jump','Injuried':'defense'}.get(state,state);overrides[old]=f'original/art/refined/hero-{pose}.webp'
 elif 'portrait' in old:overrides[old]='original/art/refined/hero-stand.webp'
 elif '/monsters/' in old or '/pets/' in old:
  family=idx%4;overrides[old]=f'original/art/refined/{families[family]}.webp';idx+=1
  key=old.rsplit('/',1)[1].split('.')[0];labels[key]=['Ngọc vệ','Linh điệp','Thanh long','Đèn vệ'][family]+(' · Tinh anh' if 'elite' in key else ' · Thủ lĩnh' if 'boss' in key else '')
(root/'public/original/refined-map.json').write_text(json.dumps(overrides,indent=2)+'\n');mapping.update(overrides);map_path.write_text(json.dumps(mapping,indent=2)+'\n')
(root/'src/reference/refined-creature-names.json').write_text(json.dumps(labels,ensure_ascii=False,indent=2)+'\n')
print('Prepared 8 transparent illustrations, 4 hero poses and all creature mappings.')
