import BodySvg from "./BodySvg";
import OrganPanel from "./OrganPanel";

export default function BodyExplorer({ selectedOrgan, onSelectOrgan, onClose }) {
  return (
    <>
      <div className="body-visual">
        <div className="body-aura aura-one" />
        <div className="body-aura aura-two" />

        <BodySvg selected={selectedOrgan?.id ?? null} onSelect={onSelectOrgan} />

        {!selectedOrgan && (
          <div className="body-visual-hint">
            <span />
            Tap an organ to look closer
          </div>
        )}
      </div>

      <OrganPanel organ={selectedOrgan} onClose={onClose} />
    </>
  );
}
