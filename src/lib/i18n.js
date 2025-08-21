
import { useEffect, useMemo, useState } from "react";
import en from "../i18n/en.json";
import de from "../i18n/de.json";

const DICTS = { en, de };
const DEFAULT_LANG = (typeof navigator !== "undefined" && navigator.language?.startsWith("de")) ? "de" : "en";
const STORAGE_KEY = "plan2fund.lang";

export function useI18n() {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG; } catch { return DEFAULT_LANG; }
  });
  const dict = useMemo(() => DICTS[lang] || en, [lang]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch {}
  }, [lang]);

  return {
    t: (path, fallback = "") => {
      const parts = path.split(".");
      let cur = dict;
      for (const p of parts) {
        cur = cur?.[p];
        if (cur == null) return fallback;
      }
      return cur;
    },
    lang,
    setLang,
    available: Object.keys(DICTS)
  };
}
