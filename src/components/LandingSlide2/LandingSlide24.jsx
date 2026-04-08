import { useState, useEffect, useRef } from "react";
import "./LandingSlide2.css";
import { useNavigate } from "react-router-dom";

import butterfly1 from "../../assets/butterflyanimation/butterly1.png";
import butterfly2 from "../../assets/butterflyanimation/butterfly2.png";
import treeBranch  from "../../assets/images/treebranch.svg";

/* ── Particles ── */
const PARTICLE_COUNT = 28;

function useParticles() {
  return useRef(
    Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      x: 5 + Math.random() * 55,
      y: 5 + Math.random() * 90,
      size: 2 + Math.random() * 3.5,
      opacity: 0.10 + Math.random() * 0.25,
      duration: 4 + Math.random() * 6,
      delay: Math.random() * 8,
      drift: (Math.random() - 0.5) * 24,
      color: Math.random() > 0.5 ? "rgba(255,255,255,0.9)" : "rgba(180,160,255,0.85)",
    }))
  ).current;
}

export default function LandingSlide2({ currentSlide = 1, totalSlides = 3, onDotClick }) {
  const navigate   = useNavigate();
  const [frame, setFrame] = useState(0);
  const particles  = useParticles();

  /* ── Butterfly frame flip ── */
  useEffect(() => {
    const id = setInterval(() => setFrame(f => (f + 1) % 2), 380);
    return () => clearInterval(id);
  }, []);

  const butterflySrc = frame === 0 ? butterfly1 : butterfly2;

  return (
    <section className="ml2">

      {/* ── Animated background ── */}
      <div className="ml2__bg" aria-hidden="true" />

      {/* ── Particles ── */}
      <div className="ml2__particles" aria-hidden="true">
        {particles.map(p => (
          <span
            key={p.id}
            className="ml2__particle"
            style={{
              left: `${p.x}%`,
              top:  `${p.y}%`,
              width:  `${p.size}px`,
              height: `${p.size}px`,
              background: p.color,
              opacity: p.opacity,
              animationDuration: `${p.duration}s`,
              animationDelay:    `${p.delay}s`,
              "--drift": `${p.drift}px`,
            }}
          />
        ))}
      </div>

      <div className="ml2__container">

        {/* ══ LEFT VISUAL ══ */}
        <div className="ml2__visual">

          {/* circle backdrop */}
          <div className="ml2__circle" />

          {/* vertical bar */}
          <div className="ml2__bar" />

          {/* branch glow halo */}
          <div className="ml2__branch-glow" aria-hidden="true" />

          {/* branch */}
          <img
            src={treeBranch}
            alt=""
            className="ml2__branch"
            aria-hidden="true"
            draggable={false}
          />

          {/* butterfly shadow */}
          <div className="ml2__butterfly-shadow" aria-hidden="true" />

          {/* butterfly */}
          <img
            src={butterflySrc}
            alt="Butterfly"
            className="ml2__butterfly"
            draggable={false}
          />

        </div>

        {/* ══ RIGHT TEXT ══ */}
        <div className="ml2__text">
          <h1 className="ml2__h1 ml2__anim ml2__anim--1">Company Overview</h1>
          <h3 className="ml2__h3 ml2__anim ml2__anim--2">Built for the AI-First Enterprise</h3>
          <p  className="ml2__p  ml2__anim ml2__anim--3">
            Accelerating Business with Intelligent Automation.
            How our AI-driven solutions helped enterprises streamline operations,
            improve decision-making, and reduce time-to-market through smart
            automation and data intelligence.
          </p>
          <div className="ml2__btn-wrap ml2__anim ml2__anim--4">
            <button
              className="ml2__btn"
              onClick={() => navigate("/home")}
            >
              EXPLORE
            </button>
          </div>
        </div>

      </div>

      {/* ── DOTS ── */}
      <div className="ml2__dots">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <div
            key={i}
            className={`ml2__dot${i === currentSlide ? " ml2__dot--active" : ""}`}
            onClick={() => i !== currentSlide && onDotClick?.(i)}
            title={`Slide ${i + 1}`}
          />
        ))}
        <div className="ml2__pill">Who We Are</div>
      </div>

    </section>
  );
}
