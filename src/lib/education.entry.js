import "./education.ui.js";
(function(){
  try{
    var flags = {};
    var flagsEl = document.querySelector('script[type=""application/json""][data-flags]');
    if (flagsEl) { 
  try {
    flags = JSON.parse(flagsEl.textContent || "{}") || {};
  } catch {
    flags = {};
  }
}

    if (!flags || !flags.EDUCATION_UI_ENABLED) return;

    var cards = document.querySelectorAll("[data-program-id]");
    for (var i=0;i<cards.length;i++){
      var pid = cards[i].getAttribute("data-program-id");
      if (!pid) continue;
      if (!cards[i].querySelector("why-chip")){
        var chip = document.createElement("why-chip");
        chip.setAttribute("program-id", pid);
        var header = cards[i].querySelector("[data-card-header]") || cards[i];
        header.appendChild(chip);
      }
      var anchor = cards[i].querySelector("[data-decision-details-anchor]") || cards[i];
      if (!cards[i].querySelector("decision-details")){
        var det = document.createElement("decision-details");
        det.setAttribute("program-id", pid);
        anchor.appendChild(det);
      }
    }
  }catch(e){}
})();