/**
 * Step 14 â€” Export entry (flag-gated). Adds a floating "Export DOC" button.
 */
import { buildRTFDoc, downloadRTFBlob } from "./export.rtf";

(function(){
  try {
    var flags = {};
    var el = document.querySelector('script[type="application/json"][data-flags]');
    if (el) { try { flags = JSON.parse(el.textContent || "{}") || {}; } catch(_){} }
    if (!flags || !flags.EXPORT_DOCX_ENABLED) return;

    function addButton(){
      if (document.getElementById("pf-export-doc")) return;
      var btn = document.createElement("button");
      btn.id = "pf-export-doc";
      btn.textContent = "Export DOC";
      btn.setAttribute("style",
        "position:fixed;right:16px;bottom:16px;z-index:9999;padding:10px 14px;border-radius:10px;border:1px solid #d1d5db;background:#ffffff;cursor:pointer;font-weight:700;"
      );
      btn.addEventListener("click", function(){
        try {
          var rtf = buildRTFDoc({});
          downloadRTFBlob(rtf, "plan2fund_plan.doc");
        } catch(e) { console.warn("Export failed", e); }
      });
      document.body.appendChild(btn);
    }

    document.addEventListener("DOMContentLoaded", addButton);
  } catch(e) {}
})();
