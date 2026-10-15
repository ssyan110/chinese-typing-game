async(page)=>{
 const checks=[],errors=[];page.on('pageerror',e=>errors.push(e.message));const check=(ok,label)=>{if(!ok)throw Error(label);checks.push(label);};
 await page.goto('http://127.0.0.1:4186');await page.bringToFront();await page.setViewportSize({width:1440,height:1000});await page.locator('#practice-setup.show').waitFor({timeout:40000});
 await page.locator('[data-practice-mode=simplified]').click();await page.locator('#enter-original-game').click();await page.locator('#btn-start').click();await page.locator('[data-stage-play="0"]').click();
 for(let i=0;i<8;i++){if(await page.evaluate(()=>game.mode)==='dialogue')await page.locator('#dialogue-next').click();else break;}
 await page.waitForFunction(()=>game.mode==='playing'&&game.stageData.objects.length>0);
 const first=await page.locator('#prompt-main').innerText();
 await page.locator('#ime-input').fill('錯錯錯');await page.locator('#ime-input').fill('');await page.locator('#ime-input').fill('錯錯錯');await page.locator('#ime-input').fill(first);await page.locator('#ime-confirm').click();
 await page.waitForFunction(()=>game.stageData.objects.length>0);const second=await page.locator('#prompt-main').innerText();await page.locator('#ime-input').fill(second);await page.locator('#ime-confirm').click();
 await page.waitForFunction(()=>game.stageData.objects.length>0);const unfinished=await page.locator('#prompt-main').innerText();
 const ledger=await page.evaluate(()=>game.analytics.practiceReview);
 check(ledger[first].correct===1&&ledger[first].wrong===2,'Actual wrong and correct input counted for the same target');
 check(ledger[second].correct===1&&ledger[second].wrong===0,'Correct-only word retained');check(ledger[unfinished].correct===0&&ledger[unfinished].wrong===0,'Shown but unfinished word retained');
 // End only the fixture round early; this is a result regression, not a natural 3-minute playthrough.
 await page.evaluate(()=>{PROFILE_STORAGE_KEY='wuxia_result_detail_qa';game.stageTimerEndAt=performance.now()-1;finishTimedStage();});
 check(await page.locator('#result-practice-detail').evaluate(n=>!n.open),'Practice detail is collapsed by default');
 await page.locator('#result-practice-detail summary').click();const rows=await page.locator('.practice-review-table tbody tr').allTextContents();
 check(rows[0].includes(first)&&rows[0].includes('2'),'Most mistaken word appears first');check(rows.some(row=>row.includes('Chưa trả lời')),'Unanswered word has a distinct status');
 await page.locator('#result-practice-detail summary').click();await page.locator('#result-score-detail summary').click();
 check((await page.locator('#result-score-detail').innerText()).includes('11.000'),'Score explanation shows actual stage-one two-star threshold');
 await page.screenshot({path:'output/playwright/result-score-detail.png'});
 const originalScore=await page.evaluate(()=>({stageScore:game.stageScore,totalTyped:game.totalTyped,correctTyped:game.correctTyped,maxCombo:game.maxCombo}));
 // Reproduce the supplied result using the real scoring functions and UI renderer.
 await page.evaluate(()=>{game.stageScore=5596;game.totalTyped=95;game.correctTyped=90;game.maxCombo=50;renderScoreExplanation();});
 await page.locator('#result-score-detail summary').click();const scoreText=await page.locator('#result-score-detail').innerText();
 check(scoreText.includes('10.526')&&scoreText.includes('hạng B')&&scoreText.includes('474'),'Screenshot result explained: 10526 points, one star/B, 474 to two stars');
 await page.evaluate(original=>{Object.assign(game,original);renderScoreExplanation();},originalScore);
 await page.locator('#result-practice-detail summary').click();await page.screenshot({path:'output/playwright/result-practice-detail.png'});
 await page.setViewportSize({width:390,height:844});await page.locator('#result-practice-detail').scrollIntoViewIfNeeded();
 check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Mobile result detail has no page overflow');
 check(await page.locator('.practice-review-table').evaluate(n=>n.scrollWidth<=n.clientWidth+1),'Mobile table fits without sideways scrolling');await page.screenshot({path:'output/playwright/result-practice-mobile.png'});
 // A fresh run resets practice counts; each review/result starts collapsed again.
 await page.evaluate(()=>{closeOverlays();resetRun(false);game.independentStageMode=true;loadStage(0,true);});
 check(await page.evaluate(()=>Object.keys(game.analytics.practiceReview||{}).length<=1),'Practice detail does not leak previous-run words');
 for(const mode of ['traditional','zhuyin']){
  await page.evaluate(()=>openPracticeSetup('mode'));await page.locator(`[data-practice-mode=${mode}]`).click();await page.locator('#enter-original-game').click();await page.waitForFunction(()=>practice.loaded&&!document.querySelector('#practice-setup').classList.contains('show'));
  await page.evaluate(()=>{closeOverlays();resetRun(false);game.independentStageMode=true;loadStage(3,true);});
  const target=await page.evaluate(()=>({text:game.stageData.currentWord,hanzi:game.stageData.currentToken.hanzi,input:game.stageData.currentInputWord}));
  if(mode==='traditional'){await page.locator('#ime-input').fill(target.text);await page.locator('#ime-confirm').click();}
  else{await page.locator('#arena').click({position:{x:15,y:200},force:true});for(const key of target.input)await page.keyboard.press(key===' '?'Space':key);}
  check(await page.evaluate(t=>{const item=game.analytics.practiceReview[t.hanzi?`${t.hanzi} · ${t.text}`:t.text];return item?.correct===1;},target),`${mode}: completed whole word recorded with correct Chinese identity`);
 }
 check(errors.length===0,'No browser runtime errors');await page.evaluate(r=>window.__resultDetailVerification=r,{passed:checks.length,checks,first,second,unfinished,errors});
}
