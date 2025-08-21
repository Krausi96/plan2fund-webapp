/**
 * Step 13 & 15 â€” Checkout + After-sales stubs (flag-gated).
 */
(function(){
  try {
    var flags = {};
    var el = document.querySelector('script[type="application/json"][data-flags]');
    if (el) { try { flags = JSON.parse(el.textContent || "{}") || {}; } catch(_){} }
    if (!flags || !flags.CHECKOUT_ENABLED) return;

    function modal(html){
      var m = document.createElement("div");
      m.id="pf-checkout";
      m.setAttribute("style", "position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.35);display:flex;align-items:center;justify-content:center;");
      m.innerHTML = '<div style="width:560px;max-width:calc(100% - 40px);background:#fff;border-radius:16px;border:1px solid #e5e7eb;box-shadow:0 10px 30px rgba(0,0,0,.25);padding:20px;">' + html + '</div>';
      document.body.appendChild(m);
      return m;
    }

    function showSuccess(){
      var s = modal(
        '<div style="font-weight:800;font-size:22px;margin-bottom:8px;color:#065f46;">Payment successful (stub)</div>'+
        '<div style="color:#374151;margin-bottom:16px;">Your plan export is unlocked. An email confirmation will follow (stub).</div>'+
        '<div style="display:flex;justify-content:flex-end;gap:8px;">'+
          '<button id="pf-close" style="padding:10px 14px;border-radius:10px;border:1px solid #d1d5db;background:#111827;color:#fff;font-weight:700;cursor:pointer;">Close</button>'+
        '</div>'
      );
      s.querySelector("#pf-close").addEventListener("click", function(){ s.remove(); });
    }

    function showCheckout(){
      var m = modal(
        '<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">'+
          '<div style="width:36px;height:36px;border-radius:8px;background:#ecfeff;display:flex;align-items:center;justify-content:center;font-weight:800;color:#0e7490;">â‚¬</div>'+
          '<div style="font-weight:800;font-size:20px;">Checkout (stub)</div>'+
        '</div>'+
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;">'+
          '<div style="border:1px solid #e5e7eb;border-radius:12px;padding:12px;"><div style="font-weight:700;margin-bottom:4px;">Lite</div><div>â‚¬19 â€” single export</div><button id="pf-buy-lite" style="margin-top:8px;padding:8px 12px;border-radius:10px;border:1px solid #d1d5db;background:#fff;cursor:pointer;font-weight:700;">Buy</button></div>'+
          '<div style="border:1px solid #e5e7eb;border-radius:12px;padding:12px;"><div style="font-weight:700;margin-bottom:4px;">Pro</div><div>â‚¬49 â€” multi export + extras</div><button id="pf-buy-pro" style="margin-top:8px;padding:8px 12px;border-radius:10px;border:1px solid #d1d5db;background:#fff;cursor:pointer;font-weight:700;">Buy</button></div>'+
        '</div>'+
        '<div style="font-size:12px;color:#64748b;">Real Stripe integration to follow. This is a local stub.</div>'
      );
      m.querySelector("#pf-buy-lite").addEventListener("click", function(){ m.remove(); showSuccess(); });
      m.querySelector("#pf-buy-pro").addEventListener("click", function(){ m.remove(); showSuccess(); });
    }

    function addFab(){
      if (document.getElementById("pf-checkout-fab")) return;
      var btn = document.createElement("button");
      btn.id = "pf-checkout-fab";
      btn.textContent = "Checkout";
      btn.setAttribute("style",
        "position:fixed;right:16px;bottom:64px;z-index:9999;padding:10px 14px;border-radius:10px;border:1px solid #d1d5db;background:#ffffff;cursor:pointer;font-weight:700;"
      );
      btn.addEventListener("click", showCheckout);
      document.body.appendChild(btn);
    }

    document.addEventListener("DOMContentLoaded", addFab);
  } catch(e) {}
})();
