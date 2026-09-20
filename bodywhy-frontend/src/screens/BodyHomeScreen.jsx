import { useState } from "react";
import "./BodyHomeScreen.css";
import BodyExplorer from "../components/body/BodyExplorer";
import organs from "../data/organs";



export default function BodyHomeScreen() {
  const [selected, setSelected] = useState(null);

  const selectedOrgan = selected ? { ...organs[selected], number: Object.keys(organs).indexOf(selected) + 1 } : null;

  function selectOrgan(id) {
    setSelected(id);
  }

  function closeOrgan() {
    setSelected(null);
  }

  return (
    <main className={`body-explorer ${selected ? "organ-selected" : ""}`}>
      {/* =====================================================
          HEADER
          ===================================================== */}

      <header className="body-header">
        <div className="body-brand">
          <div className="body-brand-mark">B</div>

          <div>
            <div className="body-brand-name">BodyWhy</div>
            <div className="body-brand-tagline">
              Understand your body.
            </div>
          </div>
        </div>

        <button className="body-search-button" type="button">
          <span className="search-symbol">⌕</span>
          <span>Ask about something</span>
        </button>

        <button className="body-profile-button" type="button">
          You
        </button>
      </header>

      {/* =====================================================
          MAIN EXPERIENCE
          ===================================================== */}

      <section className="body-experience">
        {/* INTRO */}

        <div className="body-intro">
          <div className="body-eyebrow">EXPLORE YOUR BODY</div>

          <h1>
            Your body is
            <br />
            a living system.
          </h1>

          <p>
            Everything inside you is connected.
            <br />
            Start somewhere.
          </p>

          {!selected && (
            <div className="body-instruction">
              <span className="instruction-pulse" />
              Select something you're curious about
            </div>
          )}
        </div>

        {/* =================================================
            INTERACTIVE BODY
            ================================================= */}

        <BodyExplorer
          selectedOrgan={selectedOrgan}
          onSelectOrgan={selectOrgan}
          onClose={closeOrgan}
        />
      </section>

      {/* =====================================================
          FOOTER HINT
          ===================================================== */}

      <div className="body-footer">
        <span>BODYWHY</span>
        <span className="footer-dot" />
        <span>FOLLOW THE CONNECTIONS</span>
      </div>
    </main>
  );
}