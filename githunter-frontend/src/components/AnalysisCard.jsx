export default function AnalysisCard({ analysis }) {
  return (
    <div>
      <h3>AI Analysis</h3>

      <h4>Strengths</h4>
      <ul>{analysis.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>

      <h4>Weaknesses</h4>
      <ul>{analysis.weaknesses.map((w, i) => <li key={i}>{w}</li>)}</ul>

      <h4>Skill Summary</h4>
      <ul>{analysis.skill_summary.map((s, i) => <li key={i}>{s}</li>)}</ul>

      <h4>Recommended Roles</h4>
      <ul>{analysis.recommended_roles.map((r, i) => <li key={i}>{r}</li>)}</ul>
    </div>
  );
}
