import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNode } from "../../api/client";
import MechanismTimeline from "./MechanismTimeline";
import ConnectionArrow from "./ConnectionArrow";
import "./MechanismPlayer.css";

function parseSteps(json) {
  if (!json) return [];

  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function MechanismPlayer({ nodeId }) {
  const navigate = useNavigate();
  const [node, setNode] = useState(null);
  const [beat, setBeat] = useState("hook");
  const [canAdvance, setCanAdvance] = useState(true);
  const liveRegionRef = useRef(null);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!nodeId) return;

    getNode(nodeId).then(setNode).catch(() => setNode(null));
    setBeat("hook");
  }, [nodeId]);

  const steps = parseSteps(node?.mechanismStepsJson);
  const beatOrder = [
    "hook",
    "tension",
    ...steps.map((_, index) => `step${index}`),
    "realization",
    "thread",
    "takeaway",
  ];

  const beatText = () => {
    if (!node) return "";
    if (beat === "hook") return node.hookText ?? "";
    if (beat === "tension") return node.tensionText ?? "";
    if (beat === "realization") return node.realizationText ?? "";
    if (beat === "thread") return node.threadText ?? "";
    if (beat === "takeaway") return node.takeawayText ?? "";
    return steps[Number(beat.replace("step", ""))] ?? "";
  };

  useEffect(() => {
    if (!liveRegionRef.current || !node) return;

    liveRegionRef.current.setAttribute(
      "aria-live",
      beat === "realization" ? "assertive" : "polite"
    );
    liveRegionRef.current.textContent = beatText();
  }, [beat, node]);

  useEffect(() => {
    if (beat !== "realization" || reducedMotion) {
      setCanAdvance(true);
      return;
    }

    setCanAdvance(false);
    const timer = setTimeout(() => setCanAdvance(true), 1750);
    return () => clearTimeout(timer);
  }, [beat, reducedMotion]);

  const advance = () => {
    if (!canAdvance) return;

    const index = beatOrder.indexOf(beat);
    if (index < beatOrder.length - 1) {
      setBeat(beatOrder[index + 1]);
    } else {
      navigate("/");
    }
  };

  const exit = () => navigate(-1);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") {
        exit();
      } else if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        advance();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [beat, canAdvance]);

  if (!node) {
    return (
      <div className="mechanism-loading" aria-busy="true">
        <div className="mechanism-loading-bar" aria-hidden="true" />
      </div>
    );
  }

  const stepIndex = beat.startsWith("step") ? Number(beat.replace("step", "")) : -1;
  const isRealization = beat === "realization";
  const isTakeaway = beat === "takeaway";

  return (
    <main
      className={`mechanism-player ${isTakeaway ? "is-takeaway" : ""}`}
      onClick={advance}
      role="button"
      tabIndex={0}
      aria-label="Tap or press space to continue"
    >
      <div ref={liveRegionRef} className="mechanism-live-region" />

      <MechanismTimeline steps={steps} activeIndex={stepIndex} />

      <p key={beat} className={`mechanism-beat ${isRealization ? "is-realization" : ""}`}>
        {beatText()}
      </p>

      {beat === "thread" && node.threadNodeId && (
        <div className="mechanism-thread-actions">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              navigate(`/mechanism/${node.threadNodeId}`);
            }}
            className="mechanism-thread-link"
          >
            See how that loop works →
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              advance();
            }}
            className="mechanism-skip-link"
          >
            Not now
          </button>
        </div>
      )}

      {beat !== "thread" && (!isRealization || canAdvance) && <ConnectionArrow />}
    </main>
  );
}
