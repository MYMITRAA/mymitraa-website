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

// ── Aurora blob definitions ───────────────────────────────────
// Each blob: { x, y } as 0–1 fractions of viewport, r as fraction
// of min(W,H), rgb color, animation speed and phase offset.
const AURORA_BLOBS = [
  { x: 0.22, y: 0.38, r: 0.52, c: [108,  52, 240], spd: 0.00028, phase: 0.0 },
  { x: 0.72, y: 0.58, r: 0.46, c: [  0, 190, 172], spd: 0.00036, phase: 2.1 },
  { x: 0.50, y: 0.18, r: 0.38, c: [200,  70, 210], spd: 0.00032, phase: 4.3 },
  { x: 0.80, y: 0.22, r: 0.32, c: [ 60, 130, 255], spd: 0.00022, phase: 1.6 },
  { x: 0.15, y: 0.76, r: 0.34, c: [ 80,  40, 200], spd: 0.00040, phase: 3.2 },
];

export default function IntroAnimation({ onFinish }) {
  const screenRef  = useRef();
  const logoRef    = useRef();
  const iconRef    = useRef();
  const taglineRef = useRef();
  const birdRef    = useRef();
  const lettersRef = useRef([]);
  const auroraRef  = useRef(); // ← new canvas ref

  const [isBlue,    setIsBlue]    = useState(false);
  const [birdSrc,   setBirdSrc]   = useState(POSES.SLIDE);
  const [birdPhase, setBirdPhase] = useState("slide-in");

  // ── Aurora + grain canvas animation ──────────────────────────
  useEffect(() => {
    const canvas = auroraRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let rafId;
    let startTs = null;

    const draw = (ts) => {
      if (!startTs) startTs = ts;
      const t = ts - startTs;
      const W = canvas.width;
      const H = canvas.height;

      // Base fill
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#07041a";
      ctx.fillRect(0, 0, W, H);

      // Aurora blobs
      AURORA_BLOBS.forEach((b) => {
        const ox = Math.sin(t * b.spd       + b.phase) * W * 0.10;
        const oy = Math.cos(t * b.spd * 0.8 + b.phase) * H * 0.08;
        const cx = b.x * W + ox;
        const cy = b.y * H + oy;
        const r  = b.r * Math.min(W, H);

        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0,   `rgba(${b.c[0]},${b.c[1]},${b.c[2]},0.28)`);
        g.addColorStop(0.5, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},0.09)`);
        g.addColorStop(1,   `rgba(${b.c[0]},${b.c[1]},${b.c[2]},0.00)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      });

      // Film grain — redrawn every frame for a living texture
      const grain = ctx.createImageData(W, H);
      const d = grain.data;
      for (let i = 0; i < d.length; i += 4) {
        const n = (Math.random() * 20) | 0;
        d[i] = d[i + 1] = d[i + 2] = n;
        d[i + 3] = 14 + ((Math.random() * 14) | 0);
      }
      ctx.putImageData(grain, 0, 0);

      // Radial vignette — softens edges, focuses center
      const vig = ctx.createRadialGradient(
        W / 2, H / 2, H * 0.12,
        W / 2, H / 2, H * 0.82
      );
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(4,2,20,0.75)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // ── Main animation sequence (unchanged) ──────────────────────
  useEffect(() => {
    const timers = [];
    const at = (fn, ms) => timers.push(setTimeout(fn, ms));

    // STAGE 1 — SOLO BIRD
    setBirdSrc(POSES.SLIDE);
    setBirdPhase("slide-in");

    at(() => {
      setBirdSrc(POSES.WOBBLE);
      setBirdPhase("wobble");
    }, 500);

    // STAGE 2 — THE SHIFT
    at(() => {
      const logo   = logoRef.current;
      const bird   = birdRef.current;
      const screen = screenRef.current;
      if (!logo || !bird || !screen) return;

      const logoRect = logo.getBoundingClientRect();
      const birdRect = bird.getBoundingClientRect();

      const halfLogo = logoRect.width  / 2;
      const birdHalf = birdRect.width  / 2;
      const gap      = 20;

      const offset = -(halfLogo + birdHalf + gap);
      screen.style.setProperty("--bird-x", `${offset}px`);

      setBirdSrc(POSES.IDLE);
      setBirdPhase("shift-left");
    }, 1000);

    // STAGE 3 — THE REVEAL
    at(() => {
      setBirdSrc(POSES.CURIOUS);
      setBirdPhase("curious");
    }, 1500);

    at(() => iconRef.current?.classList.add("show"), 1550);

    lettersRef.current.forEach((el, i) =>
      at(() => {
        if (!el) return;
        el.style.opacity   = "1";
        el.style.transform = "translateY(0) translateX(0)";
      }, 1620 + i * 90)
    );

    at(() => taglineRef.current?.classList.add("show"), 2200);

    // STAGE 4 — THE STAND
    at(() => {
      setBirdSrc(POSES.IDLE);
      setBirdPhase("idle");
    }, 2300);

    at(() => setIsBlue(true), 2600);

    at(() => {
      setBirdSrc(POSES.FLAP);
      setBirdPhase("flap");
    }, 3000);

    at(() => {
      setBirdSrc(POSES.IDLE);
      setBirdPhase("idle");
    }, 3400);

    // STAGE 5 — EXIT
    at(() => {
      if (taglineRef.current) {
        taglineRef.current.style.transition = "opacity 0.4s ease";
        taglineRef.current.style.opacity    = "0";
      }
    }, 3700);

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

    at(() => {
      const logo = logoRef.current;
      if (!logo) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const isMobile   = vw <= 480;
      const isTablet   = vw <= 768;
      const finalScale = isMobile ? 0.55 : isTablet ? 0.48 : FINAL_SCALE;

      const logoRect = logo.getBoundingClientRect();
      const naturalW = logoRect.width / LOGO_VISUAL_SCALE;
      const finalW   = naturalW * finalScale;

      const cx      = vw / 2;
      const cy      = vh / 2;
      const targetX = LOGO_LEFT + finalW / 2;
      const targetY = NAVBAR_H  / 2;

      logo.style.transition = "transform 1s cubic-bezier(.65,0,.2,1)";
      logo.style.transform  = `translateX(${targetX - cx}px) translateY(${targetY - cy}px) scale(${finalScale})`;

      if (screenRef.current) {
        screenRef.current.style.background    = "transparent";
        screenRef.current.style.pointerEvents = "none";
      }
    }, 4600);

    at(() => {
      if (logoRef.current) {
        logoRef.current.style.transition += ", opacity 0.4s ease";
        logoRef.current.style.opacity     = "0";
      }
    }, 5400);

    at(() => onFinish?.(), 6000);

    return () => timers.forEach(clearTimeout);
  }, []);

  const LETTERS = isBlue ? LETTERS_BLUE : LETTERS_WHITE;

  return (
    <div className="intro-screen" ref={screenRef}>

      {/* Aurora + grain canvas — sits below everything */}
      <canvas
        ref={auroraRef}
        className="aurora-canvas"
        aria-hidden="true"
      />

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

      {/* Bird */}
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
