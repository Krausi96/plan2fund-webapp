import React from "react";
export default function Card({title,children,footer}){
  return (
    <div className="pf-card pf-stagger">
      {title && <h3 style={{marginTop:0,marginBottom:10}}>{title}</h3>}
      <div>{children}</div>
      {footer && <div style={{marginTop:12,borderTop:"1px solid var(--pf-line)",paddingTop:12}}>{footer}</div>}
    </div>
  );
}
