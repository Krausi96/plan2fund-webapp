export default function SuccessCancel({ success }) {
  return (
    <div style={{padding:"2rem"}}>
      <h2>{success ? "Payment successful" : "Payment cancelled"}</h2>
      <a href="/">Back to app</a>
    </div>
  );
}
