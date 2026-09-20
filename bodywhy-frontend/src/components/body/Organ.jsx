export default function Organ({ id, selected, onSelect, className, children }) {
  return (
    <g
      className={`${className} ${selected ? "active" : ""}`}
      onClick={() => onSelect(id)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(id);
        }
      }}
      aria-label={`Explore ${id}`}
    >
      {children}
    </g>
  );
}
