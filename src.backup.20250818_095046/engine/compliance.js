export function jurisdictionScore(model, program){
  const j = (program.jurisdictions||[])
  if(!model?.country) return 0.5
  const inEU = model.jurisdiction === 'EU' || model.country === 'EU'
  if(j.includes(model.country)) return 1
  if(inEU && j.includes('EU')) return 0.9
  return j.length ? 0.2 : 0.5
}
export function budgetGate(model, program){
  const req = Number(model.request_eur||0)
  if(!req || req<=0) return {ok:false, reason:'invalid request'}
  const min = Number(program.budget_min_eur||0), max = Number(program.budget_max_eur||Infinity)
  if(req < min) return {ok:false, reason:'below min'}
  if(req > max) return {ok:false, reason:'above max'}
  return {ok:true}
}
export function budgetScore(model, program){
  const req = Number(model.request_eur||0)
  const min = Number(program.budget_min_eur||0), max = Number(program.budget_max_eur||req)
  if(max===min) return 1
  const mid = (min+max)/2
  const dist = Math.abs(req - mid)
  return Math.max(0, 1 - dist/((max-min)/2))
}
export function trlFromStage(stage){
  const map = { idea:2, prototype:4, early:5, growth:7 }
  return map[stage] ?? 3
}
export function stageTrlScore(model, program){
  const trl = trlFromStage(model.stage)
  const min = Number(program.trl_min||1), max = Number(program.trl_max||9)
  if(trl < min || trl > max) return 0.1
  return 0.9
}
export function sectorScore(model, program){
  const hit = (program.sectors||[]).includes(model.sector)
  return { ok: hit, score: hit ? 1 : 0 }
}
export function extrasScore(model){
  const co = Number(model.cofin_percent||0)
  if(co >= 0.5) return 1
  if(co >= 0.3) return 0.6
  if(co > 0) return 0.3
  return 0.1
}