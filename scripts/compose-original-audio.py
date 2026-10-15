"""Original Lantern Atlas score and effects: authored notes and synthesis, no samples."""
from pathlib import Path
import json,math,wave,subprocess
import numpy as np
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'public/original/audio';SCRATCH=ROOT/'output/composition'
OUT.mkdir(parents=True,exist_ok=True);SCRATCH.mkdir(parents=True,exist_ok=True)
SR=24000
rng=np.random.default_rng(314159)
def hz(note):return 440*2**((note-69)/12)
def voice(note,length,kind='pluck'):
 t=np.arange(max(1,int(SR*length)))/SR;f=hz(note)
 if kind=='pluck':
  y=sum(np.sin(2*np.pi*f*k*t)*np.exp(-t*(1.5+k*.65))/(k**1.8) for k in range(1,7));y*=np.minimum(1,t/.008)
 elif kind=='flute':
  phase=2*np.pi*f*t+.018*np.sin(2*np.pi*4.7*t);y=(np.sin(phase)+.1*np.sin(2*phase))*np.minimum(1,t/.08)*np.minimum(1,(length-t)/.12)*.65
 elif kind=='bell':
  y=(np.sin(2*np.pi*f*t)+.32*np.sin(2*np.pi*f*2.005*t)+.12*np.sin(2*np.pi*f*3.98*t))*np.exp(-t*3)*np.minimum(1,t/.003)
 else:y=np.sin(2*np.pi*f*t)*np.minimum(1,t/.025)*np.minimum(1,(length-t)/.15)*np.exp(-t*.5)
 return y*np.minimum(1,np.maximum(0,(length-t)/.025))
def save(name,a):
 a=np.asarray(a,dtype=float)
 if a.ndim==1:a=np.stack([a,a],axis=1)
 peak=np.max(np.abs(a));a=np.tanh(a/max(1,peak/.8))* .88
 wav=SCRATCH/(name+'.wav')
 with wave.open(str(wav),'wb') as w:w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((a*32767).astype('<i2').tobytes())
 target=OUT/(name+'.mp3')
 subprocess.run(['ffmpeg','-y','-loglevel','error','-i',str(wav),'-codec:a','libmp3lame','-b:a','96k',str(target)],check=True)
 return str(target.relative_to(ROOT/'public'))
def score(name,bpm,transpose,energy):
 beat=60/bpm;duration=64*beat;N=round(SR*duration);audio=np.zeros((N,2))
 def add(sound,time,gain=.2,pan=0):
  idx=(np.arange(len(sound))+round(time*SR))%N
  np.add.at(audio[:,0],idx,sound*gain*math.sqrt((1-pan)/2));np.add.at(audio[:,1],idx,sound*gain*math.sqrt((1+pan)/2))
 # A separately authored 16-bar pentatonic melody, with answering phrases.
 motifs=[[74,77,81,79,77,74],[72,74,79,81,77,74],[69,72,74,77,79,77],[74,81,84,81,79,74]]
 offsets=[0,.75,1.5,2.25,3,3.5]
 roots=[50,53,48,55,50,57,53,48,50,53,55,48,50,57,53,50]
 for bar,root in enumerate(roots):
  base=bar*4*beat;root+=transpose
  for k,degree in enumerate([0,7,12,19]):add(voice(root+degree,beat*2,'pluck'),base+k*beat,.12+energy*.02,(-1)**k*.45)
  add(voice(root-12,beat*3.8,'bass'),base,.17,0)
  motif=motifs[(bar//2+bar%2)%4]
  if bar%4!=3:
   for j,note in enumerate(motif):
    length=beat*(.65 if j<5 else .4);add(voice(note+transpose,length,'flute' if bar%4==2 else 'pluck'),base+offsets[j]*beat,.18, .18 if bar%2 else -.18)
  else:
   for j,note in enumerate([motif[2],motif[1],motif[0]]):add(voice(note+transpose,beat*1.6,'flute'),base+j*beat*1.25,.15,.1)
  if bar%4==0:add(voice(86+transpose,beat*2.8,'bell'),base,.075,-.3)
  for count in range(4):
   t=np.arange(int(SR*.12))/SR
   drum=np.sin(2*np.pi*(75*t-32*t*t))*np.exp(-t*35)+rng.normal(0,.12,len(t))*np.exp(-t*90)
   add(drum,base+count*beat,.08+energy*.035,0)
  if energy>.5:
   for count in [1,3]:
    t=np.arange(int(SR*.09))/SR;tap=rng.normal(0,.4,len(t))*np.exp(-t*55);add(tap,base+count*beat,.045,.2)
 # Circular quiet early reflections make the loop seamless.
 audio+=np.roll(audio,int(beat*.5*SR),axis=0)*.1+np.roll(audio,int(beat*.75*SR),axis=0)*.055
 return save(name,audio)
mapping={
 'audio/bgm_title_screen.mp3':score('lantern-courtyard',88,0,.2),
 'audio/bgm_main_game.mp3':score('jade-postroad',100,0,.45),
 'audio/bgm_battle.mp3':score('inkstorm-duel',120,-2,.85)}
old=json.loads((ROOT/'data/upstream/game-assets.json').read_text())
for i,source in enumerate(p for p in old if p.startswith('audio/sfx_')):
 stem=Path(source).stem.replace('sfx_','');positive=any(x in stem for x in ['correct','heal','buff_positive','buy','level_up','skill'])
 length=1.2 if 'level_up' in stem or 'lose' in stem else .5 if 'attack' in stem or 'shield' in stem else .28
 y=np.zeros(int(SR*length));notes=[74,79,86] if positive else [58,53,46]
 if 'hover' in stem:notes=[81];length=.12;y=np.zeros(int(SR*length))
 for k,note in enumerate(notes):
  start=int(k*.07*SR);part=voice(note+(i%3)*2,max(.05,length-k*.07),'bell' if positive else 'pluck');end=min(len(y),start+len(part))
  if end>start:y[start:end]+=part[:end-start]*(.2 if positive else .25)
 if any(x in stem for x in ['attack','fire','shield','wrong','debuff','lose','poison']):
  t=np.arange(len(y))/SR;y+=rng.normal(0,.15,len(y))*np.exp(-t*15)*np.minimum(1,t/.004)
 mapping[source]=save('cue-'+stem,y)
(ROOT/'public/original/audio-map.json').write_text(json.dumps(mapping,indent=2)+'\n')
print('Authored original audio files:',len(mapping))
