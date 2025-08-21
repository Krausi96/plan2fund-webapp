// src/components/ProgramCard.jsx
import DecisionDetails from "./DecisionDetails";
import { computeConfidence } from "../lib/confidence.score";

export default function ProgramCard({ program, evaluation }) {
  const conf = computeConfidence(program, evaluation || {});
  return (
    <div className="ProgramCard" style={{ padding: 16, marginBottom: 12 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <div data-program-name style={{ fontWeight: 800, fontSize: 16 }}>
            {program?.name || "Program"}
          </div>
          {program?.agency && <div style={{ fontSize: 12, opacity: 0.7 }}>{program.agency}</div>}
        </div>
        <span
          title={"Confidence " + conf.band}
          style={{ fontSize: 12, padding: "2px 8px", border: "1px solid #e5e7eb", borderRadius: 999 }}
        >
          {conf.band}
        </span>
      </div>

      <div style={{ marginTop: 10 }}>
        <DecisionDetails program={program} evaluation={evaluation} />
      </div>
    </div>
  );
}
