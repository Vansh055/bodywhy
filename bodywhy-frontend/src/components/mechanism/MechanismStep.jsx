export default function MechanismStep({ text, index, active, total }) {
  return (
    <div className="mechanism-step" aria-label={`Step ${index + 1} of ${total}`}>
      <span className={`mechanism-step-dot ${active ? "is-active" : ""}`} />
      <span className="mechanism-step-number">{index + 1}</span>
      <span className="mechanism-step-text">{text}</span>
    </div>
  );
}
