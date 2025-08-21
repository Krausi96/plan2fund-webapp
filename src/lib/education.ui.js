import { PROGRAM_RULES } from "./eligibility.programs.js";
import { getAnswers, evaluate } from "./eligibility.core.js";
import corpus_aws from "../data/corpus/aws_preseed.corpus.json";
import corpus_ffg from "../data/corpus/ffg_basisprogramm.corpus.json";
import corpus_eu  from "../data/corpus/eu_startup_call.corpus.json";
import corpus_rwr from "../data/corpus/visa_rwr.corpus.json";
import corpus_ams from "../data/corpus/ams_wko_basic.corpus.json";
import corpus_bank from "../data/corpus/bank_loan_leasing.corpus.json";

const CORPUS = {
  "aws_preseed": corpus_aws,
  "ffg_basisprogramm": corpus_ffg,
  "eu_startup_call": corpus_eu,
  "visa_rwr": corpus_rwr,
  "ams_wko_basic": corpus_ams,
  "bank_loan_leasing": corpus_bank
};

function getCorpus(pid){ return CORPUS[pid] || null; }

class WhyChip extends HTMLElement{
  connectedCallback(){
    var pid = this.getAttribute("program-id");
    var c = getCorpus(pid);
    this.style.display = "inline-block";
    this.style.fontSize = "12px";
    this.style.padding = "2px 6px";
    this.style.borderRadius = "999px";
    this.style.border = "1px solid #d0d7de";
    this.style.marginLeft = "6px";
    this.style.background = "#f6f8fa";
    this.textContent = "Why this appears";
    this.title = c && c.key_rules && c.key_rules.length ? c.key_rules.join("; ") : "Based on your answers and official criteria.";
  }
}
customElements.define("why-chip", WhyChip);

class DecisionDetails extends HTMLElement{
  connectedCallback(){
    var pid = this.getAttribute("program-id");
    var rule = PROGRAM_RULES[pid];
    var ans = getAnswers();
    var res = rule ? evaluate(rule, ans) : null;
    var c = getCorpus(pid);
    this.style.display = "block";
    this.style.border = "1px solid #d0d7de";
    this.style.padding = "8px";
    this.style.margin = "8px 0";
    this.style.fontSize = "12px";
    var html = "<strong>Decision details</strong>";
    if (res) {
      html += "<div>Status: " + res.status + " (" + res.scorePct + "%)</div>";
      if (res.unmetRequired && res.unmetRequired.length) {
        html += "<div>Unmet required: " + res.unmetRequired.join(", ") + "</div>";
      }
      if (res.failedCriteria && res.failedCriteria.length) {
        html += "<div>Failed criteria: " + res.failedCriteria.map(function(x){ return x.key; }).join(", ") + "</div>";
      }
    }
    if (c && c.source_urls && c.source_urls.length){
      var links = c.source_urls.map(function(u){ return '<a href="'+u+'" target="_blank" rel="noopener">Official</a>'; }).join(" ");
      html += "<div>Sources: " + links + "</div>";
    }
    this.innerHTML = html;
  }
}
customElements.define("decision-details", DecisionDetails);