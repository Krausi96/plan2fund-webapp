export default function Footer(){
  return (
    <footer style={{marginTop:48, paddingTop:16, borderTop:"1px solid #e5e7eb"}}>
      <div style={{display:"flex", flexWrap:"wrap", gap:12, alignItems:"center", justifyContent:"space-between"}}>
        <div style={{display:"flex", alignItems:"center", gap:10}}>
          <div style={{width:24, height:24, borderRadius:8, background:"#eef2ff", border:"1px solid #e5e7eb", display:"grid", placeItems:"center", fontWeight:800, color:"#4338ca"}}>PF</div>
          <strong>Plan2Fund</strong>
        </div>
        <nav style={{display:"flex", gap:14, fontSize:13}}>
          <a id="pricing" href="#pricing" style={{textDecoration:"none", color:"#111827", opacity:0.85}}>Pricing</a>
          <a id="examples" href="#examples" style={{textDecoration:"none", color:"#111827", opacity:0.85}}>Real examples</a>
          <a id="gdpr" href="#gdpr" style={{textDecoration:"none", color:"#111827", opacity:0.85}}>GDPR</a>
          <a id="terms" href="#terms" style={{textDecoration:"none", color:"#111827", opacity:0.85}}>Terms</a>
          <a id="impressum" href="#impressum" style={{textDecoration:"none", color:"#111827", opacity:0.85}}>Impressum</a>
          <a id="contact" href="#contact" style={{textDecoration:"none", color:"#111827", opacity:0.85}}>Contact</a>
        </nav>
      </div>
      <div style={{marginTop:8, fontSize:12, opacity:0.6}}>Â© {new Date().getFullYear()} Plan2Fund. All rights reserved.</div>
    </footer>
  );
}