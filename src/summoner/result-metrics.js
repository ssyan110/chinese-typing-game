// Timeouts affect battle ratings; they are not mistyped submissions.
export function typingAccuracy({correct,errors}){
 if(!Number.isFinite(correct)||!Number.isFinite(errors)||correct+errors===0)return null;
 return Math.round(correct/(correct+errors)*100);
}
export function typingAccuracyLabel(result){const value=typingAccuracy(result);return value===null?'—':value+'%';}
