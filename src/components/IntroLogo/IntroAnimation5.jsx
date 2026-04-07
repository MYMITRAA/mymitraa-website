import { useEffect, useRef, useState } from "react";
import "./IntroAnimation.css";

import iconWhite from "../../assets/logo/icon-white.svg";
import iconBlue  from "../../assets/logo/icon-blue.svg";
import birdImage from "../../assets/images/birdimage.svg";

import Mwhite from "../../assets/logo/M-white.svg";
import Mblue  from "../../assets/logo/M-blue.svg";
import Iwhite from "../../assets/logo/I-white.svg";
import Iblue  from "../../assets/logo/I-blue.svg";
import Twhite from "../../assets/logo/T-white.svg";
import Tblue  from "../../assets/logo/T-blue.svg";
import Rwhite from "../../assets/logo/R-white.svg";
import Rblue  from "../../assets/logo/R-blue.svg";
import Awhite from "../../assets/logo/A-white.svg";
import Ablue  from "../../assets/logo/A-blue.svg";

const LETTERS_WHITE = [Mwhite, Iwhite, Twhite, Rwhite, Awhite, Awhite];
const LETTERS_BLUE  = [Mblue,  Iblue,  Tblue,  Rblue,  Ablue,  Ablue];

const FINAL_SCALE = 0.42;
const NAVBAR_H    = 56;
const LOGO_LEFT   = 24;

const BIRD_STATES = ["fly-in", "dive", "flap", "loop", "fly-out"];

function setBirdState(el, state) {
  if (!el) return;
  BIRD_STATES.forEach(s => el.classList.remove(s));
  if (state) el.classList.add(state);
}

export default function IntroAnimation({ onFinish }) {
  const screenRef  = useRef();
  const logoRef    = useRef();
  const iconRef    = useRef();
  const taglineRef = useRef();
  const birdRef    = useRef();
  const lettersRef = useRef([]);

  const [isBlue, setIsBlue] = useState(false);

  useEffect(() => {
    const timers = [];
    const at = (fn, ms) => timers.push(setTimeout(fn, ms));

    // ── Phase 1: Logo assembles (200ms – 1400ms) ──────────────

    at(() => iconRef.current?.classList.add("show"), 200);

    lettersRef.current.forEach((el, i) =>
      at(() => {
        if (!el) return;
        el.style.opacity   = "1";
        el.style.transform = "translateY(0) translateX(0)";
      }, 380 + i * 130)
    );

    at(() => taglineRef.current?.classList.add("show"), 1500);

    // ── Phase 2: Bird slides in (700ms) ───────────────────────
    at(() => {
      setBirdState(birdRef.current, "fly-in");
    }, 700);

    // ── Phase 3: Bird leans curiously toward logo (1200ms) ────
    at(() => {
      setBirdState(birdRef.current, "dive");
    }, 1200);

    // ── Phase 4: Bird stands back up (1550ms) ─────────────────
    at(() => {
      const bird = birdRef.current;
      if (!bird) return;
      BIRD_STATES.forEach(s => bird.classList.remove(s));
      bird.style.animation = "bird-recover 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards";
    }, 1550);

    // Resume idle after standup
    at(() => {
      const bird = birdRef.current;
      if (!bird) return;
      bird.style.animation = "";
      setBirdState(bird, "fly-in");
    }, 2060);

    // ── Phase 5: Color swap (1750ms) ──────────────────────────
    at(() => setIsBlue(true), 1750);

    // ── Phase 6: Excited wing flap (2100ms) ───────────────────
    at(() => {
      setBirdState(birdRef.current, "flap");
    }, 2100);

    at(() => {
      setBirdState(birdRef.current, "fly-in");
    }, 2800);

    // ── Phase 7: Happy hop (2250ms) ───────────────────────────
    at(() => {
      setBirdState(birdRef.current, "loop");
    }, 2300);

    at(() => {
      setBirdState(birdRef.current, "fly-in");
    }, 2950);

    // ── Phase 8: Second curious lean (2900ms) — stays near logo
    at(() => {
      setBirdState(birdRef.current, "dive");
    }, 3100);

    // Stand back up gently
    at(() => {
      const bird = birdRef.current;
      if (!bird) return;
      BIRD_STATES.forEach(s => bird.classList.remove(s));
      bird.style.animation = "bird-recover 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards";
    }, 3500);

    at(() => {
      const bird = birdRef.current;
      if (!bird) return;
      bird.style.animation = "";
      setBirdState(bird, "fly-in");
    }, 4010);

    // ── Phase 9: Tagline fades out (3700ms) ───────────────────
    at(() => {
      if (taglineRef.current) {
        taglineRef.current.style.transition = "opacity 0.55s ease";
        taglineRef.current.style.opacity = "0";
      }
    }, 3700);

    // ── Phase 10: Bird launches away (4100ms) ─────────────────
    // Bird departs AFTER tagline has faded
    at(() => {
      setBirdState(birdRef.current, "fly-out");
    }, 4100);

    // ── Phase 11: Logo moves to navbar (4150ms) ───────────────
    at(() => {
      const logo = logoRef.current;
      if (!logo) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const isMobile   = vw <= 480;
      const isTablet   = vw <= 768;
      const finalScale = isMobile ? 0.55 : isTablet ? 0.48 : FINAL_SCALE;

      const logoNaturalW = isMobile ? 160 : isTablet ? 185 : 220;
      const finalW = logoNaturalW * finalScale;

      const cx = vw / 2;
      const cy = vh / 2;

      const targetX = LOGO_LEFT + finalW / 2;
      const targetY = NAVBAR_H / 2;

      const dx = targetX - cx;
      const dy = targetY - cy;

      logo.style.transition = "transform 1.1s cubic-bezier(.65,0,.2,1)";
      logo.style.transform  = `translateX(${dx}px) translateY(${dy}px) scale(${finalScale})`;

      if (screenRef.current) {
        screenRef.current.style.background    = "transparent";
        screenRef.current.style.pointerEvents = "none";
      }
    }, 4150);

    // ── Phase 12: Fade logo out (4900ms) ──────────────────────
    at(() => {
      if (logoRef.current) {
        logoRef.current.style.transition += ", opacity 0.4s ease";
        logoRef.current.style.opacity = "0";
      }
    }, 4900);

    // ── Phase 13: Done (5300ms) ───────────────────────────────
    at(() => onFinish?.(), 5300);

    return () => timers.forEach(clearTimeout);
  }, []);

  const LETTERS = isBlue ? LETTERS_BLUE : LETTERS_WHITE;

  return (
    <div className="intro-screen" ref={screenRef}>

      {/* Particles */}
      <div className="particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left:              `${Math.random() * 100}%`,
              animationDuration: `${4 + Math.random() * 5}s`,
              animationDelay:    `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Glow */}
      <div className="glow" />

      {/* Bird */}
      <img
        className="bird-wrap"
        ref={birdRef}
        src={birdImage}
        alt=""
        aria-hidden="true"
      />

      {/* Logo — animates to navbar */}
      <div className="logo-container" ref={logoRef}>
        <div className="logo-row">

          {/* Icon box */}
          <img
            src={isBlue ? iconBlue : iconWhite}
            className="logo-icon"
            ref={iconRef}
            alt="MiTRAA"
          />

          {/* SVG letter images */}
          <div className="logo-wordmark">
            {LETTERS.map((src, i) => (
              <img
                key={i}
                src={src}
                className="logo-letter"
                ref={el => { lettersRef.current[i] = el; }}
                alt=""
                aria-hidden="true"
              />
            ))}
          </div>

        </div>
      </div>

      {/* Tagline */}
      <p className="tagline" ref={taglineRef}>
        Changing the behaviour of individuals through technology
      </p>

    </div>
  );
}
