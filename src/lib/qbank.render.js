import { getQBank } from "./qbank.loader.js";

export function mountDynamicForm(root, opts){
  try{
    if(!root) return;
    var qb = getQBank();
    // non-breaking placeholder UI
    var el = document.createElement("div");
    el.setAttribute("data-qb-mounted","1");
    el.style.border = "1px dashed #d0d7de";
    el.style.padding = "8px";
    el.style.margin = "8px 0";
    el.style.fontSize = "13px";
    el.innerHTML = "<strong>Dynamic Form (Preview):</strong> Q-Bank loaded with " + (qb.fields ? qb.fields.length : 0) + " fields. Toggle FORM_DYNAMIC_ENABLED to enable full UI.";
    root.appendChild(el);
  }catch(e){}
}