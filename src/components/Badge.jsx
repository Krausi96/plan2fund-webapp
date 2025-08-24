import React from "react";
export default function Badge({ok,label,detail}) {
  return <span title={detail||""} className={"pf-badge " + (ok? "ok":"no")}>{ok? "Eligible":"Not Eligible"} {label? "? "+label:""}</span>;
}
