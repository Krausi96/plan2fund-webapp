export function computeReadiness(planDraft, overlay){
  // Simple placeholder calculation (non-breaking)
  try{
    var total = 0, done = 0;
    if(!planDraft || !planDraft.sections) return { score:0, total:0, done:0 };
    var keys = Object.keys(planDraft.sections);
    for (var i=0;i<keys.length;i++){ total++; if (planDraft.sections[keys[i]] && planDraft.sections[keys[i]].complete) done++; }
    var score = total>0 ? Math.round((done/total)*100) : 0;
    return { score:score, total:total, done:done };
  }catch(e){ return { score:0, total:0, done:0 }; }
}