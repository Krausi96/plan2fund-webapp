import { mountDynamicForm } from "./qbank.render.js";

(function(){
  try{
    var flags = {};
    var flagsEl = document.querySelector('script[type="application/json"][data-flags]');
    if (flagsEl) { flags = JSON.parse(flagsEl.textContent || "{}") || {}; }
    if (!flags || !flags.FORM_DYNAMIC_ENABLED) return; // gated

    var nodes = document.querySelectorAll("[data-qb-root]");
    for (var i=0;i<nodes.length;i++){ mountDynamicForm(nodes[i], {}); }
  }catch(e){}
})();