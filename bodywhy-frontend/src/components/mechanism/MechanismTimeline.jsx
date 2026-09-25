import MechanismStep from "./MechanismStep";

export default function MechanismTimeline({ steps, activeIndex }) {
  if (!steps.length || activeIndex < 0) return null;

  return (
    <div className="mechanism-timeline" aria-label={`Step ${activeIndex + 1} of ${steps.length}`}>
      {steps.map((step, index) => (
        <MechanismStep
          key={`${index}-${step}`}
          text={step}
          index={index}
          total={steps.length}
          active={index === activeIndex}
        />
      ))}
    </div>
  );
}
