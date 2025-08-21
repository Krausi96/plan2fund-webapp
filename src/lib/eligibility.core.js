export function getAnswers() {
  try {
    var raw = window.localStorage.getItem("p2f_user_answers");
    if (!raw) return {};
    var obj = JSON.parse(raw);
    return obj || {};
  } catch(e) { return {}; }
}

function getByPath(obj, path) {
  if (!obj || !path) return undefined;
  var segs = String(path).split(".");
  var cur = obj;
  for (var i=0;i<segs.length;i++) {
    if (cur==null) return undefined;
    cur = cur[segs[i]];
  }
  return cur;
}

function passOp(val, op, ref) {
  if (op === "equals") return String(val) === String(ref);
  if (op === "not_equals") return String(val) !== String(ref);
  if (op === "gte") return Number(val) >= Number(ref);
  if (op === "lte") return Number(val) <= Number(ref);
  if (op === "between") {
    if (!ref || !ref.length) return false;
    var a = Number(ref[0]), b = Number(ref[1]);
    var x = Number(val);
    return x >= Math.min(a,b) && x <= Math.max(a,b);
  }
  if (op === "includes") {
    if (Array.isArray(val)) return val.indexOf(ref) >= 0;
    if (typeof val === "string") return val.indexOf(String(ref)) >= 0;
    return false;
  }
  if (op === "one_of") {
    if (!Array.isArray(ref)) return false;
    for (var i=0;i<ref.length;i++) { if (String(val) === String(ref[i])) return true; }
    return false;
  }
  return false;
}

export function evaluate(programRule, answers) {
  var required = programRule.requiredKeys || [];
  var unmet = [];
  for (var i=0;i<required.length;i++) {
    var k = required[i];
    var v = getByPath(answers, k);
    if (v === undefined || v === null || v === "") unmet.push(k);
  }
  var crit = programRule.criteria || [];
  var totalW = 0, sum = 0, failed = [];
  for (var j=0;j<crit.length;j++) {
    var c = crit[j];
    var v = getByPath(answers, c.key);
    var ok = passOp(v, c.op, c.value);
    var w = Number(c.weight || 0);
    totalW += w;
    if (ok) sum += w; else failed.push({ key: c.key, reason: c.reason || "", op: c.op, value: c.value });
  }
  var score = totalW > 0 ? (sum / totalW) : 0;
  var th  = programRule.thresholds || { eligible: 0.7, discuss: 0.5 };
  var eligible = (unmet.length === 0) && (score >= Number(th.eligible || 0.7));
  var status = eligible ? "eligible" : (score >= Number(th.discuss || 0.5) ? "discuss" : "ineligible");
  return {
    eligible: eligible,
    status: status,
    score: score,
    scorePct: Math.round(score * 100),
    unmetRequired: unmet,
    failedCriteria: failed
  };
}