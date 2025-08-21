
import { useEffect, useMemo, useState } from "react";
import en from "../../i18n/en.json";
import de from "../../i18n/de.json";
import es from "../../i18n/es.json";
import fr from "../../i18n/fr.json";
const DICTS = { en, de, es, fr };
const DEFAULT_LANG = (typeof navigator!=="undefined" && /^(de|de-)/i.test(navigator.language)) ? "de" : "en";
const STORAGE_KEY = "plan2fund.lang";
export function useI18n(){
  const [lang, setLang] = useState(()=>{ try{ return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG; } catch{ return DEFAULT_LANG; } });
  const dict = useMemo(()=> DICTS[lang] || en, [lang]);
  useEffect(()=>{ try{ localStorage.setItem(STORAGE_KEY, lang); }catch{} }, [lang]);
  return {
    t: (path, fallback="") => path.split(".").reduce((a,k)=> (a && a[k]!=null ? a[k] : null), dict) ?? fallback,
    lang, setLang, available: Object.keys(DICTS)
  };
}
