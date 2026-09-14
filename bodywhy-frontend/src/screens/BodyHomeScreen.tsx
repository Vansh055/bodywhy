import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BodyHomeScreen.css";

type BodyPart = {
  id: string;
  name: string;
  description: string;
  symbol: string;
};

const bodyParts: BodyPart[] = [
  {
    id: "brain",
    name: "Brain",
    description: "Your body's control and communication center.",
    symbol: "🧠",
  },
  {
    id: "heart",
    name: "Heart",
    description: "The pump that keeps blood moving through you.",
    symbol: "❤️",
  },
  {
    id: "lungs",
    name: "Lungs",
    description: "Where your body exchanges oxygen and carbon dioxide.",
    symbol: "🫁",
  },
  {
    id: "blood",
    name: "Blood",
    description: "Your body's transport network.",
    symbol: "🩸",
  },
  {
    id: "liver",
    name: "Liver",
    description: "A major organ involved in processing and metabolism.",
    symbol: "🫃",
  },
  {
    id: "kidneys",
    name: "Kidneys",
    description: "Help filter your blood and maintain body balance.",
    symbol: "🫘",
  },
  {
    id: "bones",
    name: "Bones",
    description: "Your body's support and protection system.",
    symbol: "🦴",
  },
];

export default function BodyHomeScreen() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<BodyPart | null>(null);

  function selectPart(part: BodyPart) {
    setSelected(part);
  }

 function enterPart() {
  if (!selected) return;

  // Temporary until organ pages are built
  navigate("/mechanism/demo");
}

  return (
    <main className="body-home">
      {/* HEADER */}
      <header className="body-home-header">
        <div className="bodywhy-logo">
          <span className="bodywhy-logo-mark">B</span>

          <div>
            <div className="bodywhy-name">BodyWhy</div>
            <div className="bodywhy-tagline">
              Understand your body.
            </div>
          </div>
        </div>

        <button
          className="body-search-button"
          onClick={() => navigate("/signals")}
        >
          <span>⌕</span>
          <span>Ask about something</span>
        </button>

        <button
          className="body-profile-button"
          onClick={() => navigate("/you")}
        >
          You
        </button>
      </header>

      {/* INTRO */}
      <section className="body-home-intro">
        <p className="body-home-eyebrow">WELCOME TO BODYWHY</p>

        <h1>
          You live in your body
          <br />
          every day.
        </h1>

        <p className="body-home-description">
          But how well do you actually understand what's happening inside it?
        </p>

        <p className="body-home-instruction">
          Choose a place to begin.
        </p>
      </section>

      {/* MAIN EXPLORER */}
      <section className="body-explorer">
        <div className="body-visual-area">
          <div className="body-ambient-glow" />

          <div className="body-silhouette">
            <div className="body-head" />
            <div className="body-neck" />
            <div className="body-torso" />
            <div className="body-arm body-arm-left" />
            <div className="body-arm body-arm-right" />
            <div className="body-leg body-leg-left" />
            <div className="body-leg body-leg-right" />

            {/* BRAIN */}
            <button
              className="body-hotspot hotspot-brain"
              onClick={() => selectPart(bodyParts[0])}
              aria-label="Explore Brain"
            >
              🧠
            </button>

            {/* HEART */}
            <button
              className="body-hotspot hotspot-heart"
              onClick={() => selectPart(bodyParts[1])}
              aria-label="Explore Heart"
            >
              ❤️
            </button>

            {/* LUNGS */}
            <button
              className="body-hotspot hotspot-lungs"
              onClick={() => selectPart(bodyParts[2])}
              aria-label="Explore Lungs"
            >
              🫁
            </button>

            {/* LIVER */}
            <button
              className="body-hotspot hotspot-liver"
              onClick={() => selectPart(bodyParts[4])}
              aria-label="Explore Liver"
            >
              🫃
            </button>

            {/* KIDNEYS */}
            <button
              className="body-hotspot hotspot-kidneys"
              onClick={() => selectPart(bodyParts[5])}
              aria-label="Explore Kidneys"
            >
              🫘
            </button>

            {/* BONES */}
            <button
              className="body-hotspot hotspot-bones"
              onClick={() => selectPart(bodyParts[6])}
              aria-label="Explore Bones"
            >
              🦴
            </button>
          </div>

          <div className="body-visual-hint">
            <span className="hint-dot" />
            Tap any point to explore
          </div>
        </div>

        {/* INFORMATION PANEL */}
        <aside className="body-info-panel">
          {!selected ? (
            <>
              <div className="panel-question">?</div>

              <p className="panel-eyebrow">START SOMEWHERE</p>

              <h2>
                What do you want
                <br />
                to understand?
              </h2>

              <p className="panel-description">
                Pick any part of the body. We'll explain what it does,
                how it works, what can change, and why it matters.
              </p>

              <div className="learning-path">
                <div>
                  <span>01</span>
                  <strong>Understand</strong>
                  <small>What is it and what does it do?</small>
                </div>

                <div>
                  <span>02</span>
                  <strong>Notice</strong>
                  <small>What signs might you experience?</small>
                </div>

                <div>
                  <span>03</span>
                  <strong>Follow the WHY</strong>
                  <small>Understand the mechanism.</small>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="selected-symbol">
                {selected.symbol}
              </div>

              <p className="panel-eyebrow">YOU CHOSE</p>

              <h2>{selected.name}</h2>

              <p className="panel-description">
                {selected.description}
              </p>

              <div className="selected-journey">
                <div>
                  <span>01</span>
                  <strong>Meet it</strong>
                  <small>What is it?</small>
                </div>

                <div>
                  <span>02</span>
                  <strong>See how it works</strong>
                  <small>Understand its job.</small>
                </div>

                <div>
                  <span>03</span>
                  <strong>What can change?</strong>
                  <small>Signs and overlooked problems.</small>
                </div>

                <div>
                  <span>04</span>
                  <strong>Follow the WHY</strong>
                  <small>Go inside the mechanism.</small>
                </div>
              </div>

              <button
                className="enter-body-button"
                onClick={enterPart}
              >
                Enter {selected.name}
                <span>→</span>
              </button>

              <button
                className="choose-again-button"
                onClick={() => setSelected(null)}
              >
                Choose another part
              </button>
            </>
          )}
        </aside>
      </section>

      {/* DISCOVERY */}
      <section className="body-discovery">
        <article className="discovery-card">
          <p>THINGS YOU MAY NOT KNOW</p>

          <h2>
            Some important changes
            <br />
            don't announce themselves.
          </h2>

          <span>
            Explore the health problems people can overlook
            without realizing anything is wrong.
          </span>

          <button onClick={() => navigate("/overlooked")}>
            Explore the overlooked →
          </button>
        </article>

        <article className="discovery-card discovery-card-dark">
          <p>TODAY'S WHY</p>

          <h2>
            Why can poor sleep
            <br />
            change what you crave?
          </h2>

          <span>
            Follow the chain from sleep to cortisol to craving.
          </span>

          <button onClick={() => navigate("/mechanism/demo")}>
            Follow the mechanism →
          </button>
        </article>
      </section>

      <footer className="body-home-footer">
        <span>BodyWhy</span>
        <span>Understand. Explore. Ask WHY.</span>
      </footer>
    </main>
  );
}