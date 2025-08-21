export default function NavBar({ onNav, step }) {
  const Crumb = ({ id, label }) => (
    <button
      onClick={() => onNav && onNav(id)}
      style={{ padding:"8px 12px", border:"1px solid #e5e7eb", background:"#fff", borderRadius:10, cursor:"pointer", fontWeight:700, fontSize:13, opacity:step===id?1:0.75 }}
      aria-current={step === id ? "page" : undefined}
    >{label}</button>
  );
  return (
    <header style={{display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, margin:"10px 0 14px"}}>
      <div style={{display:"flex", alignItems:"center", gap:10}}>
        <div style={{width:28, height:28, borderRadius:8, background:"#eef2ff", border:"1px solid #e5e7eb", display:"grid", placeItems:"center", fontWeight:800, color:"#4338ca"}}>PF</div>
        <div style={{fontWeight:800}}>Plan2Fund</div>
      </div>
      <nav aria-label="breadcrumbs" style={{display:"flex", alignItems:"center", gap:8}}>
        <Crumb id="reco" label="Find funding" />
        <span style={{opacity:0.4}}>/</span>
        <Crumb id="plan" label="Business plan" />
        <span style={{opacity:0.4}}>/</span>
        <Crumb id="results" label="Results" />
      </nav>
    </header>
  );
}