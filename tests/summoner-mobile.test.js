import test from 'node:test';import assert from 'node:assert/strict';
import {mobileViewport} from '../src/summoner/mobile.js';
const phone={width:390,height:844,layoutHeight:844,baselineHeight:844};
test('Hanzi keyboard shrink uses the visible viewport rather than a full-height layout viewport',()=>{assert.deepEqual(mobileViewport({...phone,height:370,focused:true}),{mobile:true,keyboard:true,height:370});assert.equal(mobileViewport({...phone,height:370,focused:false}).keyboard,false);});
test('ordinary phone focus and browser chrome movement do not activate keyboard layout',()=>{assert.equal(mobileViewport({...phone,focused:true}).keyboard,false);assert.equal(mobileViewport({...phone,height:800,focused:true}).keyboard,false);});
test('pinch zoom is preserved without treating magnification as a keyboard',()=>{assert.deepEqual(mobileViewport({...phone,height:400,focused:true,scale:2}),{mobile:true,keyboard:false,height:844});});
test('short landscape input is compact while desktop typing keeps the desktop layout',()=>{assert.equal(mobileViewport({width:844,height:270,layoutHeight:390,baselineHeight:390,focused:true}).keyboard,true);assert.equal(mobileViewport({width:1440,height:400,layoutHeight:900,baselineHeight:900,focused:true}).keyboard,false);});
test('a large touch tablet also adapts to its software keyboard',()=>{assert.equal(mobileViewport({width:1366,height:500,layoutHeight:1024,baselineHeight:1024,focused:true,coarse:true}).keyboard,true);});
