export default function OrganPanel({ organ, onClose }) {
  if (!organ) return null;

  return (
    <aside className="organ-panel">
      <button className="organ-panel-close" type="button" onClick={onClose} aria-label="Close organ information">
        ×
      </button>

      <div className="organ-panel-number">{String(organ.number).padStart(2, "0")}</div>
      <div className="organ-panel-system">{organ.system}</div>
      <h2>{organ.name}</h2>

      <p className="organ-panel-description">{organ.description}</p>
      <div className="organ-panel-divider" />

      <div className="organ-panel-question">
        <span>WHY</span>
        <p>{organ.question}</p>
      </div>

      <button className="organ-explore-button" type="button">
        <span>Explore {organ.name}</span>
        <span>→</span>
      </button>

      <button className="organ-continue-button" type="button" onClick={onClose}>
        Continue exploring
      </button>
    </aside>
  );
}
