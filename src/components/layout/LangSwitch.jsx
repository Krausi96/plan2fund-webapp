import React from 'react';
const SUPPORTED = ['en','de','es','fr'];
export default function LangSwitch(){
  const [lang,setLang] = React.useState(()=>localStorage.getItem('p2f.lang')||'en');
  const onChange = e => { const v=e.target.value; setLang(v); localStorage.setItem('p2f.lang',v); location.reload(); };
  return (
    <select aria-label='Language' value={lang} onChange={onChange}
      style={{background:'transparent',color:'inherit',border:'1px solid rgba(255,255,255,.2)',borderRadius:10,padding:'6px 8px'}}>
      {SUPPORTED.map(c=><option key={c} value={c} style={{color:'#000'}}>{c.toUpperCase()}</option>)}
    </select>
  );
}