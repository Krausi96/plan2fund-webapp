import React, {useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Meter from "../components/Meter";
import PreviewModal from "../components/PreviewModal";
import Breadcrumbs from "../components/Breadcrumbs";

export default function Plan(){
  const [form,setForm] = useState({idea:"",sector:"",team:"",financials:""});
  const [preview,setPreview] = useState(false);
  const completeness = Math.round((["idea","sector","team","financials"].filter(k=>form[k]?.length>2).length/4)*100);
  const complexity = Math.min(100, Math.round((form.idea.length + form.financials.length)/20));
  const onChange = (k)=>(e)=>setForm(f=>({...f,[k]:e.target.value}));

  return (
    <div>
      <Header/>
      <section className="pf-section">
        <div className="pf-wrap">
          <Breadcrumbs trail={[{label:"Home",href:"/"},{label:"Generate Plan"}]}/>
          <h2 style={{marginTop:8}}>Business Plan Generator</h2>
          <div className="pf-grid">
            <Card title="Inputs">
              <label>Idea<br/><textarea rows="3" value={form.idea} onChange={onChange("idea")} style={{width:"100%"}}/></label>
              <div style={{height:8}}/>
              <label>Sector<br/><input value={form.sector} onChange={onChange("sector")} style={{width:"100%"}}/></label>
              <div style={{height:8}}/>
              <label>Team<br/><textarea rows="2" value={form.team} onChange={onChange("team")} style={{width:"100%"}}/></label>
              <div style={{height:8}}/>
              <label>Financials<br/><textarea rows="3" value={form.financials} onChange={onChange("financials")} style={{width:"100%"}}/></label>
              <div style={{marginTop:12,display:"flex",gap:10}}>
                <button className="pf-btn" onClick={()=>setPreview(true)}>Preview</button>
                <a className="pf-btn" href="/preview">Preview + Pricing</a>
              </div>
            </Card>
            <Card title="Quality">
              <div>Completeness</div>
              <Meter value={completeness}/>
              <div style={{height:10}}/>
              <div>Complexity</div>
              <Meter value={complexity}/>
              <div style={{height:14}}/>
              <div style={{fontSize:12,opacity:.85}}>Program requirement overlays (stub)</div>
              <ul style={{fontSize:13}}>
                <li>TRL level: TBD</li>
                <li>Cofunding ratio: TBD</li>
                <li>Team CVs: placeholder</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>
      <PreviewModal open={preview} onClose={()=>setPreview(false)}>
        <div style={{padding:12}}>
          <h3>Executive Summary</h3>
          <p>{form.idea || "?"}</p>
          <h3>Market & Sector</h3>
          <p>{form.sector || "?"}</p>
          <h3>Team</h3>
          <p>{form.team || "?"}</p>
          <h3>Financials</h3>
          <p>{form.financials || "?"}</p>
        </div>
      </PreviewModal>
      <Footer/>
    </div>
  );
}
