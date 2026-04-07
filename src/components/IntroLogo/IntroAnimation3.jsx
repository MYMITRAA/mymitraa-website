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

/**
 * setBirdState — cleanly swaps the bird's animation class.
 * Removes all known state classes first, then adds the new one.
 * This prevents class-collision jank (two animations fighting).
 */
const BIRD_STATES = ["fly-in", "dive", "flap", "loop", "fly-out"];

function setBirdState(el, state) {
  if (!el) return;
  BIRD_STATES.forEach(s => el.classList.remove(s));
  if (state) el.classList.add(state);
}

/**
 * waitForAnimation — returns a Promise that resolves when the
 * current CSS animation on `el` ends. Provides a fallback
 * timeout so the sequence never hangs if an event is missed.
 */
function waitForAnimation(el, fallbackMs = 1000) {
  return new Promise(resolve => {
    if (!el) { setTimeout(resolve, fallbackMs); return; }

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      el.removeEventListener("animationend", finish);
      resolve();
    };

    el.addEventListener("animationend", finish, { once: true });
    // Safety fallback
    setTimeout(finish, fallbackMs);
  });
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

    // Icon appears
    at(() => iconRef.current?.classList.add("show"), 200);

    // Letters stagger in
    lettersRef.current.forEach((el, i) =>
      at(() => {
        if (!el) return;
        el.style.opacity   = "1";
        el.style.transform = "translateY(0) translateX(0)";
      }, 380 + i * 130)
    );

    // Tagline fades in
    at(() => taglineRef.current?.classList.add("show"), 1400);

    // ── Phase 2: Bird enters (750ms) ──────────────────────────
    // fly-in includes the arrive animation (0.95s) + idle loop.
    at(() => {
      setBirdState(birdRef.current, "fly-in");
    }, 750);

    // ── Phase 3: Bird dives toward logo (1150ms) ──────────────
    // We switch to dive mid-idle. The dive keyframe starts from
    // translateY(0) so it picks up naturally from idle's resting
    // position (idle bob is at neutral at ~1150ms into its cycle).
    at(() => {
      setBirdState(birdRef.current, "dive");
    }, 1150);

    // ── Phase 4: Bird recovers up (1480ms) ────────────────────
    // Recover starts from translateY(60px) matching dive's end,
    // and arcs back up — the natural pullout creates a curved path.
    at(() => {
      const bird = birdRef.current;
      if (!bird) return;
      // Override the dive keyframe with recover, preserving position
      BIRD_STATES.forEach(s => bird.classList.remove(s));
      bird.style.animation = "bird-recover 0.42s cubic-bezier(0.16, 1, 0.3, 1) forwards";
    }, 1480);

    // Back to fly-in (idle) after recover finishes
    at(() => {
      const bird = birdRef.current;
      if (!bird) return;
      bird.style.animation = ""; // clear inline override
      setBirdState(bird, "fly-in");
    }, 1920); // 1480 + 420ms recover duration

    // ── Phase 5: Color swap + excited flutter (1700ms) ────────
    at(() => setIsBlue(true), 1700);

    at(() => {
      setBirdState(birdRef.current, "flap");
    }, 1950);

    // Back to idle after flap
    at(() => {
      const bird = birdRef.current;
      if (!bird) return;
      setBirdState(bird, "fly-in");
    }, 2620); // 1950 + 650ms flap duration

    // ── Phase 6: Playful loop maneuver (2050ms) ───────────────
    at(() => {
      setBirdState(birdRef.current, "loop");
    }, 2150);

    // Back to idle after loop
    at(() => {
      setBirdState(birdRef.current, "fly-in");
    }, 2600); // 2150 + 450ms loop duration

    // ── Phase 7: Tagline fades out (2300ms) ───────────────────
    at(() => {
      if (taglineRef.current) {
        taglineRef.current.style.transition = "opacity 0.4s ease";
        taglineRef.current.style.opacity = "0";
      }
    }, 2300);

    // ── Phase 8: Bird flies away (2650ms) ─────────────────────
    at(() => {
      setBirdState(birdRef.current, "fly-out");
    }, 2650);

    // ── Phase 9: Logo moves to navbar (2700ms) ────────────────
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
    }, 2700);

    // ── Phase 10: Fade logo out (3400ms) ──────────────────────
    at(() => {
      if (logoRef.current) {
        logoRef.current.style.transition += ", opacity 0.4s ease";
        logoRef.current.style.opacity = "0";
      }
    }, 3400);

    // ── Phase 11: Done (3800ms) ───────────────────────────────
    at(() => onFinish?.(), 3800);

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
