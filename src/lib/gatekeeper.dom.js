import { PROGRAM_RULES } from "./eligibility.programs.js";
import { getAnswers, evaluate } from "./eligibility.core.js";
import "./eligibility.webc.js";

(function(){
  try {
    var flagsEl = document.querySelector('script[type="application/json"][data-flags]');
    var flags = {};
    if (flagsEl) { flags = JSON.parse(flagsEl.textContent||"{}"); }
    if (!flags || !flags.ELIGIBILITY_ENABLED) return;

    function decide(pid) {
      var rule = PROGRAM_RULES[pid];
      if (!rule) return null;
      return evaluate(rule, getAnswers());
    }

    // Results cards: attach <eligibility-badge> into any element carrying data-program-id
    var cards = document.querySelectorAll("[data-program-id]");
    for (var i=0;i<cards.length;i++){
      var pid = cards[i].getAttribute("data-program-id");
      if (!pid || !PROGRAM_RULES[pid]) continue;
      if (cards[i].querySelector("eligibility-badge")) continue;
      var badge = document.createElement("eligibility-badge");
      badge.setAttribute("program-id", pid);
      var header = cards[i].querySelector("[data-card-header]") || cards[i].firstElementChild || cards[i];
      header.appendChild(badge);
    }

    // Debug panel if flag
    if (flags.ELIGIBILITY_DEBUG) {
      var ctx = document.querySelector("[data-current-program-id]") || document.querySelector("[data-program-id]");
      if (ctx) {
        var pid = ctx.getAttribute("data-current-program-id") || ctx.getAttribute("data-program-id");
        if (pid) {
          var dbg = document.createElement("eligibility-debug");
          dbg.setAttribute("program-id", pid);
          ctx.appendChild(dbg);
        }
      }
    }

    // Export footer: show decision stamp if export footer exists
    var exportFooter = document.querySelector("[data-export-footer]") || document.getElementById("export-footer");
    if (exportFooter) {
      var pid = exportFooter.getAttribute("data-program-id");
      if (pid && PROGRAM_RULES[pid]) {
        var res = decide(pid);
        var stamp = document.createElement("div");
        stamp.setAttribute("data-eligibility-stamp","1");
        stamp.style.fontSize = "12px";
        stamp.style.opacity = "0.85";
        stamp.style.marginTop = "6px";
        if (res) {
          var msg = res.eligible ? "Eligibility: Eligible ("+res.scorePct+"%)" :
                    (res.status==="discuss" ? "Eligibility: Borderline ("+res.scorePct+"%)" :
                    "Eligibility: Needs changes ("+res.scorePct+"%)");
          stamp.textContent = msg;
        } else {
          stamp.textContent = "Eligibility: n/a";
        }
        exportFooter.appendChild(stamp);
      }
    }

    // Strict mode gating
    if (flags.GATEKEEPER_STRICT) {
      var pidSource = document.querySelector("[data-current-program-id]") || document.querySelector("[data-program-id]");
      var pid = pidSource ? (pidSource.getAttribute("data-current-program-id") || pidSource.getAttribute("data-program-id")) : null;
      if (pid && PROGRAM_RULES[pid]) {
        var res = decide(pid);
        if (res && (!res.eligible)) {
          var controls = document.querySelectorAll("[data-continue], [data-next], button.continue, button.next");
          for (var j=0;j<controls.length;j++) {
            controls[j].setAttribute("disabled","disabled");
            controls[j].setAttribute("aria-disabled","true");
          }
          var reasons = document.createElement("div");
          reasons.setAttribute("data-eligibility-reasons","1");
          reasons.style.border = "1px solid #ffd5d5";
          reasons.style.background = "#fff3f3";
          reasons.style.padding = "8px";
          reasons.style.margin = "8px 0";
          reasons.style.fontSize = "13px";
          var unmet = (res.unmetRequired||[]).slice(0);
          var failed = (res.failedCriteria||[]).map(function(r){ return r.key; });
          var list = unmet.concat(failed);
          reasons.innerHTML = "<strong>Not ready to continue:</strong> " + (list.length? list.join(", "): "Adjust answers") + ". ";
          var btn = document.createElement("button");
          btn.type = "button";
          btn.textContent = "Adjust answers";
          btn.onclick = function(){
            try {
              var anchor = document.querySelector("[data-wizard-root]") || document.querySelector("#wizard") || document.querySelector("a[href*='#answers']");
              if (anchor && anchor.scrollIntoView) anchor.scrollIntoView({behavior:"smooth"});
              window.dispatchEvent(new CustomEvent("p2f:adjust-answers"));
            } catch(e){}
          };
          reasons.appendChild(btn);
          var host = controls.length ? controls[0].parentElement : document.body;
          host.appendChild(reasons);
        }
      }
    }
  } catch(e) {
    // never break flows
  }
})();