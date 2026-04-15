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
import birdSlide      from "../../assets/introanimation/bird_slide.webp";
import birdStopWobble from "../../assets/introanimation/bird_stop_wobble.webp";
import birdCurious    from "../../assets/introanimation/bird_curious_lean.webp";
import birdIdle       from "../../assets/introanimation/bird_idle_stand.webp";
import birdFlap       from "../../assets/introanimation/bird_happy_flap.webp";
import birdWindup     from "../../assets/introanimation/bird_launch_windup.webp";
import birdThrust     from "../../assets/introanimation/bird_launch_thrust.webp";
import birdBlur       from "../../assets/introanimation/bird_blur_exit.webp";

// ─────────────────────────────────────────────────────────────
const LETTERS_WHITE = [Mwhite, Iwhite, Twhite, Rwhite, Awhite, Awhite];
const LETTERS_BLUE  = [Mblue,  Iblue,  Tblue,  Rblue,  Ablue,  Ablue];

// logo-container has transform: scale(1.7) — account for this when measuring
const LOGO_VISUAL_SCALE = 1.7;

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
  const [birdPhase, setBirdPhase] = useState("slide-in");

  useEffect(() => {
    const timers = [];
    const at = (fn, ms) => timers.push(setTimeout(fn, ms));

    // ─────────────────────────────────────────────────────────
    // STAGE 1 — SOLO BIRD (0 → 1000ms)
    // Bird slides in and wobbles to a halt in dead center.
    // --bird-x starts at 0px so all CSS animations land at center.
    // ─────────────────────────────────────────────────────────

    // Phase 1a: Slide in (bird enters from left, lands at center)
    setBirdSrc(POSES.SLIDE);
    setBirdPhase("slide-in");

    // Phase 1b: Wobble / skid stop (still centered)
    at(() => {
      setBirdSrc(POSES.WOBBLE);
      setBirdPhase("wobble");
    }, 500);

    // ─────────────────────────────────────────────────────────
    // STAGE 2 — THE SHIFT (1000ms → 1500ms)
    // Measure logo width to compute exact --bird-x, then
    // animate the bird gliding left to make room for the logo.
    // ─────────────────────────────────────────────────────────
    at(() => {
      const logo   = logoRef.current;
      const bird   = birdRef.current;
      const screen = screenRef.current;
      if (!logo || !bird || !screen) return;

      // getBoundingClientRect() returns the *rendered* (post-scale) size.
      // We want the natural layout size so we can reason about centering.
      const logoRect = logo.getBoundingClientRect();
      const birdRect = bird.getBoundingClientRect();

      // The logo is centered at 50% of the viewport.
      // Its rendered left edge = viewportCenterX - logoRect.width / 2
      // Bird center (when at 0px) = viewportCenterX
      // We want: bird right edge = logo left edge - gap
      //   birdCenterX + birdHalf = logoCenterX - logoHalf - gap
      //   offset = -(logoHalf + birdHalf + gap)
      const halfLogo = logoRect.width  / 2;
      const birdHalf = birdRect.width  / 2;
      const gap      = 20; // px gap between bird right edge and logo left edge

      const offset = -(halfLogo + birdHalf + gap);
      screen.style.setProperty("--bird-x", `${offset}px`);

      // Animate bird sliding left to the computed position
      setBirdSrc(POSES.IDLE);   // use idle image during the glide
      setBirdPhase("shift-left");
    }, 1000);

    // ─────────────────────────────────────────────────────────
    // STAGE 3 — THE REVEAL (1500ms → 2300ms)
    // Logo icon and letters assemble staggered.
    // Bird goes curious while watching the letters appear.
    // ─────────────────────────────────────────────────────────

    // Bird goes curious just before letters start appearing
    at(() => {
      setBirdSrc(POSES.CURIOUS);
      setBirdPhase("curious");
    }, 1500);

    // Logo icon slides in
    at(() => iconRef.current?.classList.add("show"), 1550);

    // Letters stagger in one by one
    lettersRef.current.forEach((el, i) =>
      at(() => {
        if (!el) return;
        el.style.opacity   = "1";
        el.style.transform = "translateY(0) translateX(0)";
      }, 1620 + i * 90)
    );

    // Tagline fades in after all letters are done
    at(() => taglineRef.current?.classList.add("show"), 2200);

    // ─────────────────────────────────────────────────────────
    // STAGE 4 — THE STAND (2300ms → 3200ms)
    // Bird stands proudly beside the finished logo.
    // Color swap to blue, then flap celebration.
    // ─────────────────────────────────────────────────────────

    // Bird stands up proudly
    at(() => {
      setBirdSrc(POSES.IDLE);
      setBirdPhase("idle");
    }, 2300);

    // Brand color swap — only after logo is fully assembled
    at(() => setIsBlue(true), 2600);

    // Wing flap celebration
    at(() => {
      setBirdSrc(POSES.FLAP);
      setBirdPhase("flap");
    }, 3000);

    // Settle back to idle — extended dwell beside logo
    at(() => {
      setBirdSrc(POSES.IDLE);
      setBirdPhase("idle");
    }, 3400);

    // ─────────────────────────────────────────────────────────
    // STAGE 5 — EXIT (3700ms → 5200ms)
    // Tagline fades, bird launches, logo flies to navbar.
    // ─────────────────────────────────────────────────────────

    // Tagline fade out
    at(() => {
      if (taglineRef.current) {
        taglineRef.current.style.transition = "opacity 0.4s ease";
        taglineRef.current.style.opacity    = "0";
      }
    }, 3700);

    // Launch sequence: windup → thrust → blur
    at(() => {
      setBirdSrc(POSES.WINDUP);
      setBirdPhase("windup");
    }, 3900);

    at(() => {
      setBirdSrc(POSES.THRUST);
      setBirdPhase("thrust");
    }, 4100);

    at(() => {
      setBirdSrc(POSES.BLUR);
      setBirdPhase("blur-exit");
    }, 4300);

    // Logo moves to navbar position
    at(() => {
      const logo = logoRef.current;
      if (!logo) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const isMobile   = vw <= 480;
      const isTablet   = vw <= 768;
      const finalScale = isMobile ? 0.55 : isTablet ? 0.48 : FINAL_SCALE;

      // Natural rendered width of the logo at 1.7x scale
      const logoRect  = logo.getBoundingClientRect();
      // finalScale is relative to the natural (un-scaled) logo dimensions.
      // The logo-container is currently at scale(1.7), so:
      //   naturalWidth = logoRect.width / LOGO_VISUAL_SCALE
      const naturalW  = logoRect.width / LOGO_VISUAL_SCALE;
      const finalW    = naturalW * finalScale;

      const cx      = vw / 2;
      const cy      = vh / 2;
      const targetX = LOGO_LEFT + finalW / 2;
      const targetY = NAVBAR_H  / 2;

      logo.style.transition = "transform 1s cubic-bezier(.65,0,.2,1)";
      logo.style.transform  = `translateX(${targetX - cx}px) translateY(${targetY - cy}px) scale(${finalScale})`;

      // Make screen transparent ONLY now — after everything is done.
      // Use pointer-events:none so clicks pass through.
      // Do NOT add a background transition to .intro-screen to avoid the
      // white-out / flash — set background directly here instead.
      if (screenRef.current) {
        screenRef.current.style.background    = "transparent";
        screenRef.current.style.pointerEvents = "none";
      }
    }, 4600);

    // Fade the logo out once it's near the navbar
    at(() => {
      if (logoRef.current) {
        logoRef.current.style.transition += ", opacity 0.4s ease";
        logoRef.current.style.opacity     = "0";
      }
    }, 5400);

    // Signal parent that intro is finished
    at(() => onFinish?.(), 6000);

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
