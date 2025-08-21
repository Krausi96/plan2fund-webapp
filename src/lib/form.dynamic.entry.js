/**
 * Step 12 â€” Dynamic Form stub (flag-gated).
 * If FORM_DYNAMIC_ENABLED=true, hide/show blocks marked with data-show-when='{"field":"x","eq":"y"}'
 */
(function(){
  try {
    var flags = {};
    var el = document.querySelector('script[type="application/json"][data-flags]');
    if (el) { try { flags = JSON.parse(el.textContent || "{}") || {}; } catch(_){} }
    if (!flags || !flags.FORM_DYNAMIC_ENABLED) return;

    function evalCond(cond){
      if (!cond || typeof cond!=="object") return true;
      var field = cond.field, eq = cond.eq;
      if (!field) return true;
      var input = document.querySelector('[name="'+field+'"]');
      var val = input ? (input.type==="checkbox" ? (input.checked? "true":"false") : input.value) : "";
      return (eq===undefined) ? true : (String(val).toLowerCase() === String(eq).toLowerCase());
    }

    function apply(){
      var nodes = document.querySelectorAll("[data-show-when]");
      for (var i=0;i<nodes.length;i++){
        var n = nodes[i], cond=null;
        try { cond = JSON.parse(n.getAttribute("data-show-when")||"{}"); } catch(_){}
        var ok = evalCond(cond);
        n.style.display = ok ? "" : "none";
      }
    }

    document.addEventListener("input", function(){ apply(); }, true);
    document.addEventListener("change", function(){ apply(); }, true);
    document.addEventListener("DOMContentLoaded", function(){ apply(); });
  } catch(e) {}
})();
