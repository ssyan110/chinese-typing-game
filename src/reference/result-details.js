// Keep the full session list; failed attempts and expired targets come first.
function sortedPracticeReview(items){
 return Object.values(items||{}).sort((a,b)=>b.wrong-a.wrong||b.correct-a.correct||a.label.localeCompare(b.label,'zh-Hant'));
}
