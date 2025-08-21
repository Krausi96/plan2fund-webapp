import de from "./de.json"
import en from "./en.json"
const lang = (typeof navigator !== "undefined" && navigator.language?.startsWith("de")) ? "de" : "en"
const dict = lang==="de" ? de : en
export function t(key){ return key.split(".").reduce((o,k)=> (o && o[k]!=null ? o[k] : null), dict) || key }
