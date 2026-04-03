import "./LandingSlide1.css";
import RobotAnimation from "../Robotanimation/RobotAnimation.jsx";
import { useNavigate } from "react-router-dom";

/* ─── Floating particle config ─── */
const PARTICLES = [
  { size: 3,  top: "18%", left: "12%", dur: "7s",  delay: "0s",   dx: "30px",  dy: "-60px"  },
  { size: 2,  top: "35%", left: "6%",  dur: "9s",  delay: "1.2s", dx: "-20px", dy: "-80px"  },
  { size: 4,  top: "60%", left: "20%", dur: "8s",  delay: "0.6s", dx: "50px",  dy: "-40px"  },
  { size: 2,  top: "75%", left: "38%", dur: "11s", delay: "2s",   dx: "20px",  dy: "-90px"  },
  { size: 3,  top: "22%", left: "52%", dur: "10s", delay: "0.3s", dx: "-40px", dy: "-70px"  },
  { size: 2,  top: "50%", left: "70%", dur: "8s",  delay: "1.5s", dx: "30px",  dy: "-50px"  },
  { size: 5,  top: "80%", left: "75%", dur: "12s", delay: "0.8s", dx: "-30px", dy: "-100px" },
  { size: 2,  top: "10%", left: "80%", dur: "9s",  delay: "3s",   dx: "20px",  dy: "-60px"  },
];

/* ─── Perspective grid SVG ─── */
function PerspectiveGrid() {
  const lines = [];

  /* Horizontal lines vanishing to center-right */
  for (let i = 0; i <= 10; i++) {
    const y = 60 + i * 44;
    lines.push(
      <line key={`h${i}`} x1="0" y1={y} x2="1400" y2={y} stroke="white" strokeWidth="0.5" />
    );
  }

  /* Vertical perspective lines converging to vanishing point */
  const vp = { x: 1100, y: 0 };
  const starts = [0, 100, 200, 320, 450, 600, 750, 900, 1100, 1300, 1400];
  starts.forEach((sx, i) => {
    lines.push(
      <line key={`v${i}`} x1={sx} y1={580} x2={vp.x} y2={vp.y} stroke="white" strokeWidth="0.5" />
    );
  });

  return (
    <div className="mitraa-landing1-grid">
      <svg viewBox="0 0 1400 580" preserveAspectRatio="xMidYMax slice" fill="none">
        {lines}
      </svg>
    </div>
  );
}

export default function LandingSlide1() {
  const navigate = useNavigate();

  return (
    <section className="mitraa-landing1">

      {/* ── Perspective grid ── */}
      <PerspectiveGrid />

      {/* ── Background orbs ── */}
      <div className="mitraa-landing1-orb mitraa-landing1-orb--1" />
      <div className="mitraa-landing1-orb mitraa-landing1-orb--2" />
      <div className="mitraa-landing1-orb mitraa-landing1-orb--3" />

      {/* ── Particles ── */}
      <div className="mitraa-landing1-particles" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="mitraa-particle"
            style={{
              width:  p.size,
              height: p.size,
              top:    p.top,
              left:   p.left,
              "--dur":   p.dur,
              "--delay": p.delay,
              "--dx":    p.dx,
              "--dy":    p.dy,
            }}
          />
        ))}
      </div>

      {/* ── Corner brackets ── */}
      <div className="mitraa-landing1-corner mitraa-landing1-corner--tl" aria-hidden="true" />
      <div className="mitraa-landing1-corner mitraa-landing1-corner--br" aria-hidden="true" />

      {/* ══════════ MAIN CONTENT ══════════ */}
      <div className="mitraa-landing1-container">

        {/* ── LEFT — Text ── */}
        <div className="mitraa-landing1-text">

          {/* Eyebrow tag */}
          <div className="mitraa-landing1-eyebrow">
            <span className="mitraa-landing1-eyebrow-dot" />
            Next-Gen AI Platform
          </div>

          <h2>Powering Businesses with</h2>

          <h1>ARTIFICIAL<br />INTELLIGENCE</h1>

          {/* Tagline row */}
          <div className="mitraa-landing1-tagline">
            {["IDEA", "INNOVATION", "IMPLEMENTATION", "IMPACT"].map((word, i, arr) => (
              <span key={word} style={{ display: "contents" }}>
                <span className="mitraa-landing1-tagline-item">{word}</span>
                {i < arr.length - 1 && (
                  <span className="mitraa-landing1-tagline-sep">→</span>
                )}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mitraa-landing1-btn-wrap">
            <button
              className="mitraa-landing1-btn"
              onClick={() => navigate("/home")}
            >
              <span>EXPLORE</span>
              <svg
                className="mitraa-landing1-btn-arrow"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </button>
          </div>

        </div>

        {/* ── RIGHT — Robot ── */}
        <div className="mitraa-landing1-image">

          {/* Floating stat cards */}
          <div className="mitraa-landing1-stat mitraa-landing1-stat--1">
            <div className="mitraa-landing1-stat-value">98%</div>
            <div className="mitraa-landing1-stat-label">Accuracy</div>
          </div>

          <div className="mitraa-landing1-stat mitraa-landing1-stat--2">
            <div className="mitraa-landing1-stat-value">10x</div>
            <div className="mitraa-landing1-stat-label">Faster</div>
          </div>

          {/* Glow halo */}
          <div className="mitraa-landing1-robot-halo" />

          <RobotAnimation />
        </div>

      </div>

      {/* ── Slider dots ── */}
      <div className="mitraa-landing1-dots">
        <div className="mitraa-landing1-dot active" />
        <div className="mitraa-landing1-dot" />
        <div className="mitraa-landing1-dot" />
        <div className="mitraa-landing1-dot" />
        <div className="mitraa-landing1-dot" />
        <div className="mitraa-landing1-pill">Home</div>
      </div>

      {/* ── Scroll hint ── */}
      <div className="mitraa-landing1-scroll" aria-hidden="true">
        <span className="mitraa-landing1-scroll-label">Scroll</span>
        <div className="mitraa-landing1-scroll-line" />
      </div>

    </section>
  );
}
