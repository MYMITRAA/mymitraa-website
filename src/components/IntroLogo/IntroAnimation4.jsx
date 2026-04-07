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

const PENGUIN_W   = 80; // matches CSS width
const PENGUIN_GAP = 24; // gap between penguin and logo block

const BIRD_STATES = ["fly-in", "dive", "flap", "loop", "fly-out", "idle"];

function setBirdState(el, ...states) {
  if (!el) return;
  BIRD_STATES.forEach(s => el.classList.remove(s));
  states.forEach(s => { if (s) el.classList.add(s); });
}

/**
 * Calculates where the penguin should stop horizontally.
 * It positions itself just to the LEFT of the centered logo block,
 * so it appears in the same visual row as the logo text.
 *
 * The logo-container is centered on screen via flexbox.
 * We measure its rendered position to find where the left edge is,
 * then place the penguin's right edge there with a small gap.
 */
function getPenguinTargetLeft(logoEl, penguinW, gap) {
  if (!logoEl) return window.innerWidth * 0.12;
  const rect = logoEl.getBoundingClientRect();
  // We want penguin's right edge = logo's left edge - gap
  // penguinLeft = logoLeft - gap - penguinW
  return Math.max(8, rect.left - gap - penguinW);
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

    // ── Phase 1: Logo assembles (200ms – 1300ms) ──────────────

    at(() => iconRef.current?.classList.add("show"), 200);

    lettersRef.current.forEach((el, i) =>
      at(() => {
        if (!el) return;
        el.style.opacity   = "1";
        el.style.transform = "translateY(0) translateX(0)";
      }, 380 + i * 130)
    );

    at(() => taglineRef.current?.classList.add("show"), 1350);

    // ── Phase 2: Penguin slides in from the LEFT (600ms) ──────
    // Position it in the same row as the logo.
    // We set `left` on the element so it ends up right beside logo.
    at(() => {
      const bird   = birdRef.current;
      const logo   = logoRef.current;
      if (!bird || !logo) return;

      // Calculate the horizontal stop position
      const targetLeft = getPenguinTargetLeft(logo, PENGUIN_W, PENGUIN_GAP);

      // Smoothly animate `left` from off-screen (-180px) to targetLeft
      // using a CSS transition just for this movement
      bird.style.transition = "left 1.05s cubic-bezier(0.16, 1, 0.3, 1)";
      bird.style.left       = `${targetLeft}px`;

      // Trigger the slide-in + idle waddle animation
      setBirdState(bird, "fly-in");

      // Remove the left transition after it completes so future
      // keyframe animations aren't affected
      timers.push(setTimeout(() => {
        if (bird) bird.style.transition = "none";
      }, 1100));
    }, 600);

    // ── Phase 3: Curious lean (penguin reads the letters) ─────
    // Fires after letters have staggered in
    at(() => {
      setBirdState(birdRef.current, "dive");
    }, 1300);

    // ── Phase 4: Stand back up ────────────────────────────────
    at(() => {
      const bird = birdRef.current;
      if (!bird) return;
      BIRD_STATES.forEach(s => bird.classList.remove(s));
      bird.style.animation = "penguin-standup 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards, penguin-waddle-idle 1.0s ease-in-out 0.45s infinite";
    }, 1760);

    // ── Phase 5: Color swap + excited wing flap (1850ms) ──────
    at(() => setIsBlue(true), 1850);

    at(() => {
      setBirdState(birdRef.current, "flap");
    }, 2000);

    // Back to idle waddle after flap
    at(() => {
      const bird = birdRef.current;
      if (!bird) return;
      BIRD_STATES.forEach(s => bird.classList.remove(s));
      bird.style.animation = "penguin-waddle-idle 1.0s ease-in-out infinite";
    }, 2680);  // 2000 + 680ms

    // ── Phase 6: Happy hop (2350ms) ───────────────────────────
    at(() => {
      setBirdState(birdRef.current, "loop");
    }, 2350);

    // Back to idle waddle after hop
    at(() => {
      const bird = birdRef.current;
      if (!bird) return;
      BIRD_STATES.forEach(s => bird.classList.remove(s));
      bird.style.animation = "penguin-waddle-idle 1.0s ease-in-out infinite";
    }, 2960);  // 2350 + 600ms

    // ── Phase 7: Tagline fades out (2500ms) ───────────────────
    at(() => {
      if (taglineRef.current) {
        taglineRef.current.style.transition = "opacity 0.4s ease";
        taglineRef.current.style.opacity = "0";
      }
    }, 2500);

    // ── Phase 8: Penguin ROCKETS off to the right (2850ms) ────
    at(() => {
      setBirdState(birdRef.current, "fly-out");
    }, 2850);

    // ── Phase 9: Logo moves to navbar (2950ms) ────────────────
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
    }, 2950);

    // ── Phase 10: Fade logo out (3600ms) ──────────────────────
    at(() => {
      if (logoRef.current) {
        logoRef.current.style.transition += ", opacity 0.4s ease";
        logoRef.current.style.opacity = "0";
      }
    }, 3600);

    // ── Phase 11: Done ────────────────────────────────────────
    at(() => onFinish?.(), 3900);

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

      {/* Penguin — positioned in the same row as the logo.
          Starts off left edge (-180px), JS slides it to just
          left of the logo-container after measuring its position. */}
      <img
        className="bird-wrap"
        ref={birdRef}
        src={birdImage}
        alt=""
        aria-hidden="true"
      />

      {/* Logo — centered by flex, animates to navbar on finish */}
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

      {/* Tagline */}
      <p className="tagline" ref={taglineRef}>
        Changing the behaviour of individuals through technology
      </p>

    </div>
  );
}
