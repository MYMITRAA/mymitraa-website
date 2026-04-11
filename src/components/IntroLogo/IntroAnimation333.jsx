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

    // ── Phase 1: Bird + Logo appear together immediately ──────
    // Bird slides in at 100ms — same time as logo starts building
    at(() => setBirdState(birdRef.current, "fly-in"), 100);

    // Icon appears
    at(() => iconRef.current?.classList.add("show"), 200);

    // Letters stagger in
    lettersRef.current.forEach((el, i) =>
      at(() => {
        if (!el) return;
        el.style.opacity   = "1";
        el.style.transform = "translateY(0) translateX(0)";
      }, 350 + i * 120)
    );

    // Tagline fades in
    at(() => taglineRef.current?.classList.add("show"), 1300);

    // ── Phase 2: Bird leans curiously at letters (900ms) ──────
    at(() => setBirdState(birdRef.current, "dive"), 900);

    // ── Phase 3: Bird stands back up (1350ms) ─────────────────
    at(() => {
      const bird = birdRef.current;
      if (!bird) return;
      BIRD_STATES.forEach(s => bird.classList.remove(s));
      bird.style.animation = "bird-recover 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards";
    }, 1350);

    at(() => {
      const bird = birdRef.current;
      if (!bird) return;
      bird.style.animation = "";
      setBirdState(bird, "fly-in");
    }, 1870);

    // ── Phase 4: Color swap (1600ms) ──────────────────────────
    at(() => setIsBlue(true), 1600);

    // ── Phase 5: Excited wing flap (1900ms) ───────────────────
    at(() => setBirdState(birdRef.current, "flap"), 1900);
    at(() => setBirdState(birdRef.current, "fly-in"), 2650);

    // ── Phase 6: Happy hop (2100ms) ───────────────────────────
    at(() => setBirdState(birdRef.current, "loop"), 2150);
    at(() => setBirdState(birdRef.current, "fly-in"), 2820);

    // ── Phase 7: Second lean — still reading the tagline ──────
    at(() => setBirdState(birdRef.current, "dive"), 2950);

    at(() => {
      const bird = birdRef.current;
      if (!bird) return;
      BIRD_STATES.forEach(s => bird.classList.remove(s));
      bird.style.animation = "bird-recover 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards";
    }, 3350);

    at(() => {
      const bird = birdRef.current;
      if (!bird) return;
      bird.style.animation = "";
      setBirdState(bird, "fly-in");
    }, 3870);

    // ── Phase 8: Tagline fades out (3500ms) ───────────────────
    at(() => {
      if (taglineRef.current) {
        taglineRef.current.style.transition = "opacity 0.55s ease";
        taglineRef.current.style.opacity = "0";
      }
    }, 3500);

    // ── Phase 9: Bird launches away after tagline gone ────────
    at(() => setBirdState(birdRef.current, "fly-out"), 4050);

    // ── Phase 10: Logo moves to navbar ────────────────────────
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

      logo.style.transition = "transform 1.1s cubic-bezier(.65,0,.2,1)";
      logo.style.transform  = `translateX(${targetX - cx}px) translateY(${targetY - cy}px) scale(${finalScale})`;

      if (screenRef.current) {
        screenRef.current.style.background    = "transparent";
        screenRef.current.style.pointerEvents = "none";
      }
    }, 4100);

    // ── Phase 11: Fade logo out ────────────────────────────────
    at(() => {
      if (logoRef.current) {
        logoRef.current.style.transition += ", opacity 0.4s ease";
        logoRef.current.style.opacity = "0";
      }
    }, 4850);

    // ── Phase 12: Done ────────────────────────────────────────
    at(() => onFinish?.(), 5250);

    return () => timers.forEach(clearTimeout);
  }, []);

  const LETTERS = isBlue ? LETTERS_BLUE : LETTERS_WHITE;

  return (
    <div className="intro-screen" ref={screenRef}>

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

      <img
        className="bird-wrap"
        ref={birdRef}
        src={birdImage}
        alt=""
        aria-hidden="true"
      />

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
