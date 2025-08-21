import { useState } from "react";
export default function FundingForm({ onDone }) {
  const [sector, setSector] = useState("AI");
  const [idea, setIdea] = useState("");
  const [cofund_ratio, setCofund] = useState(0.3);

  function submit(e) {
    e.preventDefault();
    onDone({ sector, idea, cofund_ratio: Number(cofund_ratio) });
  }

  return (
    <form onSubmit={submit} style={{display:"grid", gap:"12px"}}>
      <label>Sector
        <select value={sector} onChange={e=>setSector(e.target.value)}>
          <option>AI</option><option>SaaS</option><option>DeepTech</option><option>Climate</option><option>Health</option>
        </select>
      </label>
      <label>Idea summary
        <textarea value={idea} onChange={e=>setIdea(e.target.value)} rows={4} placeholder="Describe your idea (keywords help ranking)" />
      </label>
      <label>Cofunding ratio you can provide (0..1)
        <input type="number" step="0.05" min="0" max="1" value={cofund_ratio} onChange={e=>setCofund(e.target.value)} />
      </label>
      <button type="submit">See Matches</button>
    </form>
  );
}
