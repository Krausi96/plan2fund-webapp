// src/lib/celebrate.js
export function celebrate(action = "done") {
  if (typeof window === "undefined") return;
  const el = document.createElement("div");
  el.textContent = "🎉 " + action + " 🎉";
  el.style.position = "fixed";
  el.style.top = "20px";
  el.style.right = "20px";
  el.style.background = "#4338ca";
  el.style.color = "white";
  el.style.padding = "8px 12px";
  el.style.borderRadius = "8px";
  el.style.zIndex = 9999;
  el.style.fontFamily = "system-ui, sans-serif";
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2500);
}
if (typeof window !== "undefined") {
  window.addEventListener("click", e => {
    const t = e.target.closest("[data-celebrate],[data-action]");
    if (t) celebrate(t.getAttribute("data-action") || "done");
  });
}
