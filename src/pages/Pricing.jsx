export default function Pricing({ onBuy }) {
  return (
    <div style={{padding:"2rem"}}>
      <h2>Pro Plan — €29 (test)</h2>
      <p>Includes export to Markdown/PDF and AI tips.</p>
      <button onClick={onBuy}>Buy with Stripe (Test)</button>
    </div>
  );
}
