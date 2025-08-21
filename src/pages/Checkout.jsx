export default function CheckoutPage({ onSuccess, onCancel }) {
  return (
    <div style={{maxWidth:720, margin:"40px auto"}}>
      <h2>Checkout (stub)</h2>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,margin:"12px 0"}}>
        <div style={{border:"1px solid #e5e7eb",borderRadius:12,padding:12}}><b>Standard</b><div>EUR 19 - single export</div><button onClick={onSuccess} style={{marginTop:6}}>Buy</button></div>
        <div style={{border:"1px solid #e5e7eb",borderRadius:12,padding:12}}><b>Priority</b><div>EUR 49 - multi export + extras</div><button onClick={onSuccess} style={{marginTop:6}}>Buy</button></div>
      </div>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}
