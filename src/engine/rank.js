import programs from "./programs.json";
import { rank as rankCore } from "./rankCore.js";
export function rank(inputs){ return rankCore(programs, inputs); }