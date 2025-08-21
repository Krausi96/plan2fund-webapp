import { getAnswers, evaluate } from "./eligibility.core.js";
import { PROGRAM_RULES } from "./eligibility.programs.js";

function decide(programId) {
  var rule = PROGRAM_RULES[programId];
  if (!rule) return null;
  var answers = getAnswers();
  return evaluate(rule, answers);
}

class EligibilityBadge extends HTMLElement {
  connectedCallback() {
    var pid = this.getAttribute("program-id");
    var res = decide(pid);
    this.setAttribute("data-ready","1");
    this.style.display = "inline-block";
    this.style.padding = "2px 6px";
    this.style.borderRadius = "6px";
    this.style.fontSize = "12px";
    this.style.lineHeight = "16px";
    this.style.border = "1px solid #d0d7de";
    if (!res) { this.innerText = "n/a"; return; }
    var txt = (res.eligible ? "Eligible " : (res.status==="discuss" ? "Borderline " : "Check ")) + res.scorePct + "%";
    this.innerText = txt;
    this.style.background = res.eligible ? "#e6ffed" : (res.status==="discuss" ? "#fff5e6" : "#ffeef0");
  }
}
customElements.define("eligibility-badge", EligibilityBadge);

class EligibilityDebugPanel extends HTMLElement {
  connectedCallback() {
    this.style.display = "block";
    this.style.border = "1px dashed #c0c0c0";
    this.style.padding = "8px";
    this.style.margin = "8px 0";
    this.style.fontSize = "12px";
    var pid = this.getAttribute("program-id") || "";
    var res = pid ? decide(pid) : null;
    var html = "";
    html += "<details open><summary><strong>Eligibility Debug</strong></summary>";
    if (res) {
      html += "<div>Status: " + res.status + " (" + res.scorePct + "%)</div>";
      if (res.unmetRequired && res.unmetRequired.length) {
        html += "<div>Unmet required: " + res.unmetRequired.join(", ") + "</div>";
      }
      if (res.failedCriteria && res.failedCriteria.length) {
        var rs = res.failedCriteria.map(function(r){ return r.key; }).join(", ");
        html += "<div>Failed criteria: " + rs + "</div>";
      }
    } else {
      html += "<div>No program context.</div>";
    }
    this.innerHTML = html + "</details>";
  }
}
customElements.define("eligibility-debug", EligibilityDebugPanel);