// src/lib/i18n.js
// Lightweight i18n with synchronous EN fallback + async swap; triggers re-render safely.

const enFallback = {
  brand: { name: "Plan2Fund", tagline: "Freedom starts with a clear plan — let’s build yours." },
  nav: { pricing: "Pricing", contact: "Contact", gdpr: "GDPR", terms: "Terms", impressum: "Impressum", examples: "Examples" },
  landing: {
    block2: "Whether you're shaping an idea, applying for funding or preparing a visa — we turn your thoughts, drafts or existing business into a submission & funding-ready Business Plan.",
    block2b: "Built to meet standards of institutions, banks & public funding programs nationally & internationally.",
    offers: {
      customPlanTitle: "Custom Business Plan (15–35 pages)",
      customPlanBody:
        "You defined your business model—vision, offer, market, target group, marketing, financials. We turn your input into a full, submission-ready plan aligned with institutional & funding requirements.",
      upgradeTitle: "Upgrade & Review",
      upgradeBody:
        "Already have a plan or draft? We revise and upgrade it to pass — formatting, rewriting, and expert edits for AWS, FFG, banks or visa programs.",
      strategyTitle: "Strategy & Modelling Plan (4–8 pages)",
      strategyBody:
        "Have an idea but not the details (target group, pricing, positioning)? We shape your model and strategy so you can move confidently.",
      ideal: {
        custom: "Ideal for: Visa, grant or loan/leasing applications when your model is clear.",
        upgrade: "Ideal for: Drafts needing add-ons (e.g. financials), structure and formatting.",
        strategy: "Ideal for: Early-stage ideas, pivots, or consulting clients."
      }
    },
    includedTitle: "What’s Included",
    included: [
      "Structured, submission-ready business plan/document",
      "Delivered as Google Doc or Word (PDF optional, editable for reuse)",
      "1-Page Executive Summary included",
      "Optional Trust Agreement (NDA)",
      "1 free revision if needed",
      "Async-first: no calls required (support available)"
    ],
    ctaPrimary: "Find Funding",
    ctaSecondary: "Generate Plan"
  },
  personas: {
    individual: "Individual / Micro-SME",
    institution: "Institutions (AMS/WKO/FFG/AWS/Banks/Visa)"
  }
};

// dynamic loaders
const dictionaries = {
  en: () => import("../i18n/en.json", { assert: { type: "json" } }),
  de: () => import("../i18n/de.json", { assert: { type: "json" } })
};

function getSavedLang() {
  try {
    return localStorage.getItem("lang") || navigator.language?.slice(0, 2) || "en";
  } catch {
    return "en";
  }
}

export function useI18n() {
  const listeners = new Set();
  // synchronous defaults so first paint is filled
  let lang = getSavedLang();
  let dict = enFallback;

  async function load(l) {
    lang = l || "en";
    try {
      const mod = await (dictionaries[lang]?.() || dictionaries.en());
      dict = mod?.default || enFallback;
    } catch {
      dict = enFallback;
    }
    try {
      localStorage.setItem("lang", lang);
    } catch {}
    // inform subscribers to re-render
    listeners.forEach((fn) => fn());
  }

  // kick off async load to replace fallback with real file
  load(lang);

  function t(key, fallback = "") {
    const parts = key.split(".");
    let n = dict;
    for (const p of parts) n = n?.[p];
    return n ?? fallback ?? key;
  }

  function subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }

  return { t, lang, setLang: (l) => load(l), subscribe };
}