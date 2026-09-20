import Organ from "./Organ";

export default function BodySvg({ selected, onSelect }) {
  return (
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

  <Organ id="brain" selected={selected === "brain"} onSelect={onSelect} className="organ-svg organ-brain">
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
  </Organ>

  {/* ---------------------------------------------
      LUNGS
      --------------------------------------------- */}

  <Organ id="lungs" selected={selected === "lungs"} onSelect={onSelect} className="organ-svg organ-lungs">
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
  </Organ>

  {/* ---------------------------------------------
      HEART
      --------------------------------------------- */}

  <Organ id="heart" selected={selected === "heart"} onSelect={onSelect} className="organ-svg organ-heart">
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
  </Organ>

  {/* ---------------------------------------------
      LIVER
      --------------------------------------------- */}

  <Organ id="liver" selected={selected === "liver"} onSelect={onSelect} className="organ-svg organ-liver">
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
  </Organ>

  {/* ---------------------------------------------
      KIDNEYS
      --------------------------------------------- */}

  <Organ id="kidneys" selected={selected === "kidneys"} onSelect={onSelect} className="organ-svg organ-kidneys">
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
  </Organ>

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

  <Organ id="bones" selected={selected === "bones"} onSelect={onSelect} className="organ-svg organ-bones">
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
  </Organ>

  {/* ---------------------------------------------
      BLOOD INTERACTION AREA
      --------------------------------------------- */}

  <Organ id="blood" selected={selected === "blood"} onSelect={onSelect} className="organ-svg blood-interaction">
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
  </Organ>
</svg>
  );
}
