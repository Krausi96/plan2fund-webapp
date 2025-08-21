/**
 * Step 11 â€” Minimal Landing overlay (no deps, no router changes).
 * Shows once until dismissed; two CTAs: Find Programs (Reco) / Create Business Plan (Plan).
 */
(function(){
  try {
    if (localStorage.getItem("pf_seenLanding")==="1") return;

    var overlay = document.createElement("div");
    overlay.id = "pf-landing";
    overlay.setAttribute("style",
      "position:fixed;inset:0;z-index:9999;background:linear-gradient(180deg,#f8fafc,#ffffff);" +
      "display:flex;align-items:center;justify-content:center;font-family:ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial;"
    );
    overlay.innerHTML =
      '<div style="max-width:760px;width:100%;padding:32px;margin:16px;background:#fff;border:1px solid #e5e7eb;border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,.08)">'+
        '<div style="display:flex;gap:16px;align-items:center;margin-bottom:12px;">'+
          '<div style="width:40px;height:40px;border-radius:8px;background:#eef2ff;display:flex;align-items:center;justify-content:center;font-weight:700;color:#4338ca;">PF</div>'+
          '<div style="font-size:18px;font-weight:700;color:#111827;">Plan2Fund</div>'+
        '</div>'+
        '<div style="font-size:28px;line-height:1.2;font-weight:800;color:#0f172a;margin-bottom:8px;">AI-powered funding & business plan builder</div>'+
        '<div style="color:#334155;margin-bottom:24px;">Find Austrian/EU programs fast, check eligibility, and export a bank/visa-ready plan.</div>'+
        '<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:8px;">'+
          '<button id="pf-btn-reco" style="flex:1;min-width:220px;padding:14px 18px;border-radius:12px;border:1px solid #d1d5db;background:#111827;color:#fff;font-weight:700;cursor:pointer;">Find Programs</button>'+
          '<button id="pf-btn-plan" style="flex:1;min-width:220px;padding:14px 18px;border-radius:12px;border:1px solid #d1d5db;background:#ffffff;color:#111827;font-weight:700;cursor:pointer;">Create Business Plan</button>'+
        '</div>'+
        '<div style="font-size:12px;color:#64748b;">You can switch any time. This intro will not show again.</div>'+
      '</div>';

    function dismiss(mode){
      try { localStorage.setItem("pf_seenLanding","1"); } catch(e){}
      try { sessionStorage.setItem("pf_startMode", mode || "reco"); } catch(e){}
      try { if (mode==="plan") { location.hash = "#plan"; } else { location.hash = "#reco"; } } catch(e){}
      overlay.remove();
    }

    overlay.addEventListener("click", function(e){
      if (e.target && e.target.id==="pf-btn-reco") dismiss("reco");
      if (e.target && e.target.id==="pf-btn-plan") dismiss("plan");
    });

    document.addEventListener("DOMContentLoaded", function(){ document.body.appendChild(overlay); });
  } catch(e) { /* fail-safe: never block app */ }
})();
