export default function AfterSales() {
  return (
    <div style={{maxWidth:720, margin:"40px auto"}}>
      <h2>Thanks - we will be in touch</h2>
      <p>Your order was successful (stub). Request a revision below:</p>
      <textarea placeholder="Describe needed changes" style={{width:"100%",minHeight:100,padding:10,borderRadius:8}}/>
      <div><button style={{marginTop:8,padding:"10px 14px",border:"1px solid #e5e7eb",borderRadius:10}}>Submit Request</button></div>
    </div>
  );
}
