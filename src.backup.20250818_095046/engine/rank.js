import {jurisdictionScore, budgetGate, budgetScore, stageTrlScore, sectorScore, extrasScore} from './compliance.js'

export const WEIGHTS = { jurisdiction:0.25, budget:0.25, stageTrl:0.30, sector:0.15, extras:0.05 }

const AFFINITY = {
  'ai': ['Digital/AI/Data/Space'],
  'machine learning': ['Digital/AI/Data/Space'],
  'film': ['Creative/Media'],
  'video': ['Creative/Media'],
  'media': ['Creative/Media'],
  'manufacturing': ['Manufacturing/Industry 4.0'],
  'robot': ['Manufacturing/Industry 4.0'],
  'biotech': ['Health/BioTech'],
  'health': ['Health/BioTech'],
  'climate': ['Climate/Energy'],
  'energy': ['Climate/Energy'],
  'fintech': ['Fintech/Industry 4.0']
}

function affinityBoost(model, program){
  const txt = (model.idea_summary||'').toLowerCase()
  if(!txt) return 0
  let boost = 0
  for(const [k,sectors] of Object.entries(AFFINITY)){
    if(txt.includes(k) && sectors.some(s => (program.sectors||[]).includes(s))){
      boost += 0.05
    }
  }
  return Math.min(boost, 0.15)
}

function deadlineHint(program){
  if(!program.deadline_iso) return {text: 'Rolling deadline', severity:'info'}
  const d = new Date(program.deadline_iso + 'T00:00:00Z')
  const days = Math.ceil((d - new Date())/86400000)
  if(days <= 0) return {text: "Deadline passed", severity:'bad'}
  if(days <= 30) return {text:Deadline in  days, severity:'warn'}
  return {text:Deadline , severity:'info'}
}

export function scoreProgram(model, program){
  const gate = budgetGate(model, program)
  if(!gate.ok) return { rejected:true, reason:gate.reason, score:0 }
  const j = jurisdictionScore(model, program)
  const b = budgetScore(model, program)
  const s = stageTrlScore(model, program)
  const sec = sectorScore(model, program)
  if(!sec.ok) return { rejected:true, reason:'sector excluded', score:0 }
  let score = j*WEIGHTS.jurisdiction + b*WEIGHTS.budget + s*WEIGHTS.stageTrl + sec.score*WEIGHTS.sector + extrasScore(model)*WEIGHTS.extras
  score += affinityBoost(model, program)
  return { rejected:false, score:Number(score.toFixed(4)), parts:{j,b,s,sector:sec.score} }
}

export function explain(model, program, parts){
  const out = []
  if(parts.j>=0.9) out.push('Jurisdiction: strong match')
  if(parts.b>=0.8) out.push('Budget aligns well')
  if(parts.s>=0.8) out.push('Stage/TRL fit')
  if(parts.sector>=0.9) out.push('Sector priority match')
  if(model.cofin_percent>=0.35) out.push('Co-funding sufficient for many calls')
  const dl = deadlineHint(program); out.push(dl.text)
  return out
}

export function rank(model, programs){
  const scored = (programs||[]).map(p => {
    const r = scoreProgram(model, p)
    return { program:p, ...r }
  }).filter(x => !x.rejected).sort((a,b) => b.score - a.score)
  return scored.map(x => ({
    id: x.program.id,
    name: x.program.name,
    score: x.score,
    parts: x.parts,
    deadline_iso: x.program.deadline_iso || null,
    cofund_min_percent: x.program.cofund_min_percent ?? null,
    explain: explain(model, x.program, x.parts),
    program: x.program
  }))
}