import { useState, useEffect, useRef } from "react";
import "./LandingSlide2.css";
import { useNavigate } from "react-router-dom";

import butterfly1 from "../../assets/butterflyanimation/butterly1.webp";
import butterfly2 from "../../assets/butterflyanimation/butterfly2.webp";
import treeBranch  from "../../assets/images/treebranch.jpg";

/* ── Snowflake config ── */
const SNOW_COUNT = 55;

function useSnowflakes() {
  return useRef(
    Array.from({ length: SNOW_COUNT }, (_, i) => ({
      id:       i,
      x:        Math.random() * 110 - 5,
      size:     1.2 + Math.random() * 2.2,       // tiny: 1.2–3.4px
      opacity:  0.45 + Math.random() * 0.45,     // 0.45–0.90 — visible but not heavy
      fallDur:  18 + Math.random() * 18,          // 18–36s — very slow drift
      swayDur:  4  + Math.random() * 6,
      swayAmp:  18 + Math.random() * 38,
      delay:    -(Math.random() * 20),
      blur:     Math.random() > 0.65 ? 0.6 + Math.random() * 1.2 : 0,
      breezeX:  25 + Math.random() * 40,
    }))
  ).current;
}

export default function LandingSlide2({ currentSlide = 1, totalSlides = 3, onDotClick }) {
  const navigate   = useNavigate();
  const [frame, setFrame] = useState(0);
  const snowflakes = useSnowflakes();

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

      {/* ── Snowfall + breeze layer ── */}
      <div className="ml2__snow" aria-hidden="true">
        {snowflakes.map(s => (
          <span
            key={s.id}
            className="ml2__flake"
            style={{
              left:              `${s.x}%`,
              width:             `${s.size}px`,
              height:            `${s.size}px`,
              opacity:           s.opacity,
              filter:            s.blur > 0 ? `blur(${s.blur}px)` : undefined,
              animationDuration: `${s.fallDur}s, ${s.swayDur}s`,
              animationDelay:    `${s.delay}s, ${s.delay * 0.6}s`,
              "--sway":          `${s.swayAmp}px`,
              "--breeze":        `${s.breezeX}px`,
            }}
          />
        ))}
      </div>

      <div className="ml2__container">

        {/* ══ LEFT VISUAL ══ */}
        <div className="ml2__visual">

          <div className="ml2__circle" />
          <div className="ml2__bar" />
          <div className="ml2__branch-glow" aria-hidden="true" />

          <img
            src={treeBranch}
            alt=""
            className="ml2__branch"
            aria-hidden="true"
            draggable={false}
          />

          <div className="ml2__butterfly-shadow" aria-hidden="true" />

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
