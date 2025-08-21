import programs from './programs.json'
import { rank } from './rank.js'
export default function match(model){ try { return rank(model, programs) } catch(e){ console.error(e); return [] } }