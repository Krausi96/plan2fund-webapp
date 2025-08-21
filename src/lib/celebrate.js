
export function celebrate(action = "done") {
  if (typeof window === "undefined") return;
  let host = document.querySelector(".celebrate");
  if (!host) {
    host = document.createElement("div");
    host.className = "celebrate";
    document.body.appendChild(host);
  } else { host.innerHTML = ""; }
  const cm = document.createElement("div");
  cm.className = "checkmark";
  host.appendChild(cm);
  for (let i=0;i<60;i++){
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = (50 + (Math.random()*40-20)) + "vw";
    c.style.top = "10vh";
    c.style.background = ["#635bff","#00d4ff","#10b981","#f59e0b","#ef4444"][i%5];
    c.style.setProperty("--x", (Math.random()*100-50)+"vw");
    c.style.animationDelay = (Math.random()*200)+"ms";
    document.body.appendChild(c);
  }
  setTimeout(()=>{ if(host && host.parentNode) host.parentNode.removeChild(host); }, 1800);
}
(function attach(){
  if (typeof window === "undefined") return;
  document.addEventListener("click",(e)=>{
    const el = e.target.closest("[data-celebrate],[data-action='purchase'],[data-action='download'],[data-action='export']");
    if (el) celebrate(el.getAttribute("data-action") || "done");
  });
})();
