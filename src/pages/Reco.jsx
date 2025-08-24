import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Badge from "../components/Badge";
import Breadcrumbs from "../components/Breadcrumbs";
import data from "../data/programs.local.json";

export default function Reco(){
  const [idea,setIdea] = useState("");
  const [sector,setSector] = useState("");
  const [loc,setLoc] = useState("AT");
  const [list,setList] = useState([]);

  useEffect(()=>{ setList(Array.isArray(data)? data : []); },[]);

  const filtered = list
    .map(p=>({...p, score: p.score - (idea?0:5) - (sector?0:5) - (loc?0:10)}))
    .sort((a,b)=>b.score-a.score)
    .slice(0,5);

  return (
    <div>
      <Header/>
      <section className="pf-section">
        <div className="pf-wrap">
          <Breadcrumbs trail={[{label:"Home",href:"/"},{label:"Find Funding"}]}/>
          <h2 style={{marginTop:8}}>Find Funding</h2>
          <div className="pf-grid">
            <div className="pf-card">
              <label>Idea<br/><textarea rows="3" value={idea} onChange={e=>setIdea(e.target.value)} style={{width:"100%"}}/></label>
              <div style={{height:8}}/>
              <label>Sector<br/><input value={sector} onChange={e=>setSector(e.target.value)} style={{width:"100%"}}/></label>
              <div style={{height:8}}/>
              <label>Location<br/><input value={loc} onChange={e=>setLoc(e.target.value)} style={{width:"100%"}}/></label>
            </div>
            <div className="pf-card">
              <h3 style={{marginTop:0}}>Top Matches</h3>
              <div className="pf-grid">
                {filtered.map(p=>(
                  <div className="pf-card" key={p.id}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <strong>{p.name}</strong>
                      <Badge ok={p.eligible} label={p.score+"%"} detail={p.why}/>
                    </div>
                    <p style={{marginTop:8}}>{p.why}</p>
                    {!p.eligible && p.unmet?.length>0 && (
                      <div style={{fontSize:12,opacity:.9}}>
                        <strong>Unmet:</strong> {p.unmet.join(", ")}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}
