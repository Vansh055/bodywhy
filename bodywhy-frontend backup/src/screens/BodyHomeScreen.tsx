import { useState } from "react";
import "./BodyHomeScreen.css";

type OrganId =
  | "brain"
  | "lungs"
  | "heart"
  | "liver"
  | "kidneys"
  | "blood"
  | "bones";

type OrganInfo = {
  id: OrganId;
  name: string;
  system: string;
  description: string;
  question: string;
};

const organs: Record<OrganId, OrganInfo> = {
  brain: {
    id: "brain",
    name: "Brain",
    system: "Nervous system",
    description:
      "Your body's control and interpretation center. It is constantly receiving information, making predictions and coordinating what happens next.",
    question: "How does your brain actually control the rest of you?",
  },

  lungs: {
    id: "lungs",
    name: "Lungs",
    system: "Respiratory system",
    description:
      "Your lungs constantly exchange gases between the air around you and your bloodstream.",
    question: "How does oxygen actually get from a breath into your body?",
  },

  heart: {
    id: "heart",
    name: "Heart",
    system: "Circulatory system",
    description:
      "Your heart keeps blood moving through your body, delivering oxygen and nutrients and carrying away waste.",
    question: "How does your heart keep every part of you supplied?",
  },

  liver: {
    id: "liver",
    name: "Liver",
    system: "Metabolic system",
    description:
      "A remarkable processing center involved in nutrients, energy storage, metabolism and many chemical processes.",
    question: "What is your liver doing while you go about your day?",
  },

  kidneys: {
    id: "kidneys",
    name: "Kidneys",
    system: "Urinary system",
    description:
      "Your kidneys continuously filter blood and help regulate fluid, electrolytes and other parts of your internal environment.",
    question: "How do your kidneys decide what stays in your body?",
  },

  blood: {
    id: "blood",
    name: "Blood",
    system: "Circulatory system",
    description:
      "More than a red liquid, blood is a transport network carrying oxygen, nutrients, hormones, immune cells and waste.",
    question: "What is moving through your bloodstream right now?",
  },

  bones: {
    id: "bones",
    name: "Bones",
    system: "Skeletal system",
    description:
      "Bones are living tissue that provide structure, protect organs and participate in mineral storage and blood-cell production.",
    question: "Why are your bones much more alive than they look?",
  },
};

export default function BodyHomeScreen() {
  const [selected, setSelected] = useState<OrganId | null>(null);

  const selectedOrgan = selected ? organs[selected] : null;

  function selectOrgan(id: OrganId) {
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
            ANATOMICAL BODY
            ================================================= */}

        <div className="body-visual">
          <div className="body-aura aura-one" />
          <div className="body-aura aura-two" />

          <svg
            className="anatomical-svg"
            viewBox="0 0 420 760"
            role="img"
            aria-label="Interactive anatomical body"
          >
            {/* ---------------------------------------------
                BODY SILHOUETTE
                --------------------------------------------- */}

            <defs>
              <linearGradient
                id="bodyGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#172747" />
                <stop offset="100%" stopColor="#0b1429" />
              </linearGradient>

              <linearGradient
                id="bodyEdge"
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop offset="0%" stopColor="#6c9fe1" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#31527e" stopOpacity="0.05" />
              </linearGradient>

              <radialGradient id="organGlow">
                <stop offset="0%" stopColor="#8bc5ff" stopOpacity="0.9" />
                <stop offset="45%" stopColor="#4e9cff" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#4e9cff" stopOpacity="0" />
              </radialGradient>

              <filter id="softGlow">
                <feGaussianBlur stdDeviation="7" />
              </filter>
            </defs>

            {/* BODY HEAD */}

            <path
              className="body-silhouette"
              d="
                M210 35
                C175 35 158 59 158 91
                C158 119 177 137 194 143
                L194 164
                C174 170 154 182 140 197
                C123 214 116 239 113 268
                L105 345
                C103 366 108 384 119 399
                L133 420
                L144 532
                L159 696
                C160 714 174 726 191 726
                L205 726
                L210 542
                L215 542
                L220 726
                L235 726
                C252 726 266 714 267 696
                L282 532
                L293 420
                L307 399
                C318 384 323 366 321 345
                L313 268
                C310 239 303 214 286 197
                C272 182 252 170 232 164
                L232 143
                C249 137 268 119 268 91
                C268 59 245 35 210 35
                Z
              "
              fill="url(#bodyGradient)"
              stroke="url(#bodyEdge)"
              strokeWidth="1.5"
            />

            {/* SHOULDERS / ARMS */}

            <path
              className="body-limb"
              d="
                M140 199
                C121 202 107 220 102 244
                L77 367
                C73 388 83 403 99 405
                C114 407 123 395 127 376
                L150 279
                Z
              "
            />

            <path
              className="body-limb"
              d="
                M280 199
                C299 202 313 220 318 244
                L343 367
                C347 388 337 403 321 405
                C306 407 297 395 293 376
                L270 279
                Z
              "
            />

            {/* CHEST STRUCTURE */}

            <path
              className="body-line"
              d="M210 176 L210 505"
            />

            <path
              className="body-line"
              d="
                M157 218
                C176 202 192 196 210 196
                C228 196 244 202 263 218
              "
            />

            {/* ---------------------------------------------
                BRAIN
                --------------------------------------------- */}

            <g
              className={`organ-svg organ-brain ${
                selected === "brain" ? "active" : ""
              }`}
              onClick={() => selectOrgan("brain")}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  selectOrgan("brain");
                }
              }}
              aria-label="Explore Brain"
            >
              <ellipse
                className="organ-halo"
                cx="210"
                cy="92"
                rx="64"
                ry="56"
              />

              <path
                className="brain-shape"
                d="
                  M168 93
                  C163 76 175 61 191 62
                  C199 49 218 50 227 62
                  C245 60 257 74 252 89
                  C265 100 255 119 239 119
                  C228 131 208 129 199 118
                  C183 122 166 112 168 93
                  Z
                "
              />

              <path
                className="brain-detail"
                d="
                  M184 76
                  C194 69 201 78 195 86
                  C190 93 198 100 205 94
                  C213 87 218 96 213 103
                  C208 111 218 116 226 110
                  C234 105 238 113 235 117
                "
              />
            </g>

            {/* ---------------------------------------------
                LUNGS
                --------------------------------------------- */}

            <g
              className={`organ-svg organ-lungs ${
                selected === "lungs" ? "active" : ""
              }`}
              onClick={() => selectOrgan("lungs")}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  selectOrgan("lungs");
                }
              }}
              aria-label="Explore Lungs"
            >
              <ellipse
                className="organ-halo"
                cx="178"
                cy="229"
                rx="53"
                ry="67"
              />

              <ellipse
                className="organ-halo"
                cx="242"
                cy="229"
                rx="53"
                ry="67"
              />

              <path
                className="lung-shape"
                d="
                  M204 188
                  C181 187 159 207 158 236
                  C157 268 169 292 191 293
                  C204 294 208 279 208 259
                  L208 202
                  Z
                "
              />

              <path
                className="lung-shape"
                d="
                  M216 188
                  C239 187 261 207 262 236
                  C263 268 251 292 229 293
                  C216 294 212 279 212 259
                  L212 202
                  Z
                "
              />

              <path
                className="lung-detail"
                d="M210 191 L210 263"
              />
            </g>

            {/* ---------------------------------------------
                HEART
                --------------------------------------------- */}

            <g
              className={`organ-svg organ-heart ${
                selected === "heart" ? "active" : ""
              }`}
              onClick={() => selectOrgan("heart")}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  selectOrgan("heart");
                }
              }}
              aria-label="Explore Heart"
            >
              <ellipse
                className="organ-halo"
                cx="210"
                cy="271"
                rx="52"
                ry="52"
              />

              <path
                className="heart-shape"
                d="
                  M210 307
                  C202 296 179 280 179 260
                  C179 245 190 237 201 241
                  C207 243 210 249 210 249
                  C210 249 213 243 219 241
                  C230 237 241 245 241 260
                  C241 280 218 296 210 307
                  Z
                "
              />
            </g>

            {/* ---------------------------------------------
                LIVER
                --------------------------------------------- */}

            <g
              className={`organ-svg organ-liver ${
                selected === "liver" ? "active" : ""
              }`}
              onClick={() => selectOrgan("liver")}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  selectOrgan("liver");
                }
              }}
              aria-label="Explore Liver"
            >
              <ellipse
                className="organ-halo"
                cx="246"
                cy="342"
                rx="74"
                ry="46"
              />

              <path
                className="liver-shape"
                d="
                  M166 332
                  C187 313 226 309 271 319
                  C286 323 294 335 288 346
                  C280 360 257 365 235 365
                  L184 362
                  C165 360 157 348 166 332
                  Z
                "
              />
            </g>

            {/* ---------------------------------------------
                KIDNEYS
                --------------------------------------------- */}

            <g
              className={`organ-svg organ-kidneys ${
                selected === "kidneys" ? "active" : ""
              }`}
              onClick={() => selectOrgan("kidneys")}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  selectOrgan("kidneys");
                }
              }}
              aria-label="Explore Kidneys"
            >
              <ellipse
                className="organ-halo"
                cx="176"
                cy="373"
                rx="34"
                ry="40"
              />

              <ellipse
                className="organ-halo"
                cx="244"
                cy="373"
                rx="34"
                ry="40"
              />

              <path
                className="kidney-shape"
                d="
                  M177 347
                  C158 347 151 363 155 380
                  C158 397 172 404 184 394
                  C192 387 190 374 184 366
                  C181 361 183 353 177 347
                  Z
                "
              />

              <path
                className="kidney-shape"
                d="
                  M243 347
                  C262 347 269 363 265 380
                  C262 397 248 404 236 394
                  C228 387 230 374 236 366
                  C239 361 237 353 243 347
                  Z
                "
              />
            </g>

            {/* ---------------------------------------------
                BLOOD / BODY NETWORK
                --------------------------------------------- */}

            <g className="blood-network">
              <path
                className="blood-line"
                d="
                  M210 309
                  C205 350 206 397 210 454
                  C213 505 208 553 210 615
                "
              />

              <path
                className="blood-line"
                d="
                  M207 338
                  C190 370 183 419 182 463
                "
              />

              <path
                className="blood-line"
                d="
                  M213 338
                  C230 370 237 419 238 463
                "
              />

              <circle className="blood-node" cx="210" cy="454" r="4" />
              <circle className="blood-node" cx="182" cy="463" r="3" />
              <circle className="blood-node" cx="238" cy="463" r="3" />
              <circle className="blood-node" cx="210" cy="615" r="4" />
            </g>

            {/* ---------------------------------------------
                BONES
                --------------------------------------------- */}

            <g
              className={`organ-svg organ-bones ${
                selected === "bones" ? "active" : ""
              }`}
              onClick={() => selectOrgan("bones")}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  selectOrgan("bones");
                }
              }}
              aria-label="Explore Bones"
            >
              <path
                className="bone-highlight"
                d="
                  M190 415
                  L195 535
                  M230 415
                  L225 535
                  M195 535
                  L180 690
                  M225 535
                  L240 690
                "
              />
            </g>

            {/* ---------------------------------------------
                BLOOD INTERACTION AREA
                --------------------------------------------- */}

            <g
              className={`organ-svg blood-interaction ${
                selected === "blood" ? "active" : ""
              }`}
              onClick={() => selectOrgan("blood")}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  selectOrgan("blood");
                }
              }}
              aria-label="Explore Blood"
            >
              <circle
                className="blood-interaction-ring"
                cx="210"
                cy="455"
                r="35"
              />

              <circle
                className="blood-interaction-core"
                cx="210"
                cy="455"
                r="7"
              />
            </g>
          </svg>

          {/* VISUAL LABEL */}

          {!selected && (
            <div className="body-visual-hint">
              <span />
              Tap an organ to look closer
            </div>
          )}
        </div>

        {/* =================================================
            INFORMATION PANEL
            ================================================= */}

        {selectedOrgan && (
          <aside className="organ-panel">
            <button
              className="organ-panel-close"
              type="button"
              onClick={closeOrgan}
              aria-label="Close organ information"
            >
              ×
            </button>

            <div className="organ-panel-number">
              {String(
                Object.keys(organs).findIndex(
                  (key) => key === selectedOrgan.id,
                ) + 1,
              ).padStart(2, "0")}
            </div>

            <div className="organ-panel-system">
              {selectedOrgan.system}
            </div>

            <h2>{selectedOrgan.name}</h2>

            <p className="organ-panel-description">
              {selectedOrgan.description}
            </p>

            <div className="organ-panel-divider" />

            <div className="organ-panel-question">
              <span>WHY</span>

              <p>{selectedOrgan.question}</p>
            </div>

            <button className="organ-explore-button" type="button">
              <span>Explore {selectedOrgan.name}</span>
              <span>→</span>
            </button>

            <button
              className="organ-continue-button"
              type="button"
              onClick={closeOrgan}
            >
              Continue exploring
            </button>
          </aside>
        )}
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