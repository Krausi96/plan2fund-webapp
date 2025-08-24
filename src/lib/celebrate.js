// simple toast on purchase/download/export
export function celebrate(action = "done") {
  if (typeof window === "undefined") return;
  const el = document.createElement("div");
  el.textContent = "🎉 " + action + " 🎉";
  Object.assign(el.style, {
    position:"fixed", top:"20px", right:"20px", background:"#4338ca",
    color:"#fff", padding:"8px 12px", borderRadius:"8px", zIndex:9999,
    fontFamily:"system-ui, sans-serif"
  });
  document.body.appendChild(el);
  setTimeout(()=>el.remove(), 2500);
}
if (typeof window !== "undefined") {
  window.addEventListener("click", e => {
    const t = e.target.closest("[data-celebrate],[data-action]");
    if (t) celebrate(t.getAttribute("data-action") || "done");
  });
}
