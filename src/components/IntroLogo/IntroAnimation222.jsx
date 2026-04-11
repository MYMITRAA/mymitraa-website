import { useEffect, useRef, useState } from "react";
import "./IntroAnimation.css";

// ── Logo assets ───────────────────────────────────────────────
import iconWhite from "../../assets/logo/icon-white.svg";
import iconBlue  from "../../assets/logo/icon-blue.svg";

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

// ── Bird keyframe images (8 poses) ────────────────────────────
import birdSlide      from "../../assets/introanimation/bird_slide.png";
import birdStopWobble from "../../assets/introanimation/bird_stop_wobble.png";
import birdCurious    from "../../assets/introanimation/bird_curious_lean.png";
import birdIdle       from "../../assets/introanimation/bird_idle_stand.png";
import birdFlap       from "../../assets/introanimation/bird_happy_flap.png";
import birdWindup     from "../../assets/introanimation/bird_launch_windup.png";
import birdThrust     from "../../assets/introanimation/bird_launch_thrust.png";
import birdBlur       from "../../assets/introanimation/bird_blur_exit.png";

// ─────────────────────────────────────────────────────────────
const LETTERS_WHITE = [Mwhite, Iwhite, Twhite, Rwhite, Awhite, Awhite];
const LETTERS_BLUE  = [Mblue,  Iblue,  Tblue,  Rblue,  Ablue,  Ablue];

const FINAL_SCALE = 0.42;
const NAVBAR_H    = 56;
const LOGO_LEFT   = 24;

const POSES = {
  SLIDE:   birdSlide,
  WOBBLE:  birdStopWobble,
  CURIOUS: birdCurious,
  IDLE:    birdIdle,
  FLAP:    birdFlap,
  WINDUP:  birdWindup,
  THRUST:  birdThrust,
  BLUR:    birdBlur,
};

export default function IntroAnimation({ onFinish }) {
  const screenRef  = useRef();
  const logoRef    = useRef();
  const iconRef    = useRef();
  const taglineRef = useRef();
  const birdRef    = useRef();
  const lettersRef = useRef([]);

  const [isBlue,    setIsBlue]    = useState(false);
  const [birdSrc,   setBirdSrc]   = useState(POSES.SLIDE);
  const [birdPhase, setBirdPhase] = useState("enter");

  useEffect(() => {
    const timers = [];
    const at = (fn, ms) => timers.push(setTimeout(fn, ms));

    // ── PHASE 1 : Bird slides in (0 → 500ms) ─────────────────
    setBirdSrc(POSES.SLIDE);
    setBirdPhase("slide-in");

    // Wobble / stop
    at(() => {
      setBirdSrc(POSES.WOBBLE);
      setBirdPhase("wobble");
    }, 500);

    // ── PHASE 2 : Logo + text appear (600ms → 1100ms) ─────────
    at(() => iconRef.current?.classList.add("show"), 600);

    lettersRef.current.forEach((el, i) =>
      at(() => {
        if (!el) return;
        el.style.opacity   = "1";
        el.style.transform = "translateY(0) translateX(0)";
      }, 650 + i * 90)
    );

    at(() => taglineRef.current?.classList.add("show"), 1000);

    // Bird goes curious while logo assembles
    at(() => {
      setBirdSrc(POSES.CURIOUS);
      setBirdPhase("curious");
    }, 750);

    // ── Measure logo width and set --bird-x CSS variable ──────
    // Done after logo has rendered so getBoundingClientRect is accurate
    at(() => {
      const logo   = logoRef.current;
      const bird   = birdRef.current;
      const screen = screenRef.current;
      if (!logo || !bird || !screen) return;

      const logoRect = logo.getBoundingClientRect();
      const birdRect = bird.getBoundingClientRect();

      // Position bird so its right edge sits ~20px left of the logo's left edge
      // Logo is centered on screen; logoRect.width / 2 = half-logo from center
      // Bird center offset = -(halfLogo + birdWidth * 0.5 + 20px gap)
      const halfLogo  = logoRect.width / 2;
      const birdHalf  = birdRect.width  * 0.5;
      const gap       = 20;
      const offset    = -(halfLogo + birdHalf + gap);

      screen.style.setProperty("--bird-x", `${offset}px`);
    }, 1100);

    // ── PHASE 3 : Bird stands proud beside logo (1200ms) ──────
    at(() => {
      setBirdSrc(POSES.IDLE);
      setBirdPhase("idle");
    }, 1200);

    // Color swap to blue
    at(() => setIsBlue(true), 1400);

    // ── PHASE 4 : Wing flap celebration (1900ms) ──────────────
    // Extended idle dwell before flap so bird is visibly settled
    at(() => {
      setBirdSrc(POSES.FLAP);
      setBirdPhase("flap");
    }, 1900);

    // Back to idle — extended dwell beside logo
    at(() => {
      setBirdSrc(POSES.IDLE);
      setBirdPhase("idle");
    }, 2300);

    // ── PHASE 5 : Tagline fades (2700ms) ──────────────────────
    at(() => {
      if (taglineRef.current) {
        taglineRef.current.style.transition = "opacity 0.4s ease";
        taglineRef.current.style.opacity    = "0";
      }
    }, 2700);

    // ── PHASE 6 : Launch sequence (2900ms → 3500ms) ───────────
    at(() => {
      setBirdSrc(POSES.WINDUP);
      setBirdPhase("windup");
    }, 2900);

    at(() => {
      setBirdSrc(POSES.THRUST);
      setBirdPhase("thrust");
    }, 3100);

    at(() => {
      setBirdSrc(POSES.BLUR);
      setBirdPhase("blur-exit");
    }, 3300);

    // ── PHASE 7 : Logo moves to navbar (3600ms) ───────────────
    at(() => {
      const logo = logoRef.current;
      if (!logo) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const isMobile   = vw <= 480;
      const isTablet   = vw <= 768;
      const finalScale = isMobile ? 0.55 : isTablet ? 0.48 : FINAL_SCALE;

      const logoNaturalW = isMobile ? 160 : isTablet ? 185 : 220;
      const finalW       = logoNaturalW * finalScale;
      const cx           = vw / 2;
      const cy           = vh / 2;
      const targetX      = LOGO_LEFT + finalW / 2;
      const targetY      = NAVBAR_H  / 2;

      logo.style.transition = "transform 1s cubic-bezier(.65,0,.2,1)";
      logo.style.transform  = `translateX(${targetX - cx}px) translateY(${targetY - cy}px) scale(${finalScale})`;

      if (screenRef.current) {
        screenRef.current.style.background    = "transparent";
        screenRef.current.style.pointerEvents = "none";
      }
    }, 3600);

    // Fade logo out
    at(() => {
      if (logoRef.current) {
        logoRef.current.style.transition += ", opacity 0.4s ease";
        logoRef.current.style.opacity     = "0";
      }
    }, 4400);

    // Done
    at(() => onFinish?.(), 5000);

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

      <div className="glow" />

      {/* Bird — image swaps drive the pose, CSS class drives position/motion */}
      <img
        className={`bird-wrap ${birdPhase}`}
        ref={birdRef}
        src={birdSrc}
        alt=""
        aria-hidden="true"
      />

      {/* Logo */}
      <div className="logo-container" ref={logoRef}>
        <div className="logo-row">
          <img
            src={isBlue ? iconBlue : iconWhite}
            className="logo-icon"
            ref={iconRef}
            alt="MiTRAA"
          />
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

      <p className="tagline" ref={taglineRef}>
        Changing the behaviour of individuals through technology
      </p>

    </div>
  );
}
