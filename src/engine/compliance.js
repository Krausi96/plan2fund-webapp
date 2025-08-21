export function isCompliant(program, { country = "EU" } = {}) {
  // Lock selection to EU-wide + national (no regional filtering)
  if (program.scope === "EU") return true;
  if (["AT","DE","FR","IT","ES","NL","BE","SE","DK","FI","IE","PT","PL","CZ","SK","HU","SI","RO","BG","HR","GR","LU","LT","LV","EE"].includes(program.scope)) {
    return true;
  }
  return false;
}
