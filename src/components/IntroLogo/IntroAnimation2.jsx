import { useEffect, useRef } from "react";
import "./IntroAnimation.css";

import iconSrc from "../../assets/logo/icon-blue.svg";

const LETTERS   = ["M", "i", "T", "R", "A", "A"];
const FINAL_SCALE = 0.42;
const NAVBAR_H    = 56;
const LOGO_LEFT   = 24;

export default function IntroAnimation({ onFinish }) {
  const screenRef  = useRef();
  const logoRef    = useRef();
  const iconRef    = useRef();
  const taglineRef = useRef();
  const birdRef    = useRef();
  const lettersRef = useRef([]);

  useEffect(() => {
    const timers = [];
    const at = (fn, ms) => timers.push(setTimeout(fn, ms));

    // 1. Icon appears
    at(() => iconRef.current?.classList.add("show"), 200);

    // 2. Letters stagger in
    lettersRef.current.forEach((el, i) =>
      at(() => {
        if (!el) return;
        el.style.opacity   = "1";
        el.style.transform = "translateY(0) translateX(0)";
      }, 380 + i * 130)
    );

    // 3. Tagline
    at(() => taglineRef.current?.classList.add("show"), 1400);

    // 4. Bird flies in
    at(() => birdRef.current?.classList.add("fly-in"), 850);

    // 5. Letters go brand colour
    at(() => {
      lettersRef.current.forEach(el => el?.classList.add("brand"));
    }, 1700);

    // 6. Bird flap burst
    at(() => birdRef.current?.classList.add("flap"), 1150);
    at(() => birdRef.current?.classList.remove("flap"), 1650);

    // 7. Bird flies out
    at(() => {
      birdRef.current?.classList.remove("fly-in");
      birdRef.current?.classList.add("fly-out");
    }, 2100);

    // 8. Tagline out
    at(() => {
      if (taglineRef.current) taglineRef.current.style.opacity = "0";
    }, 2300);

    // 9. Logo moves to navbar top-left
    at(() => {
      const logo = logoRef.current;
      if (!logo) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const logoNaturalW = 220;
      const finalW = logoNaturalW * FINAL_SCALE;

      const cx = vw / 2;
      const cy = vh / 2;

      const targetX = LOGO_LEFT + finalW / 2;
      const targetY = NAVBAR_H / 2;

      const dx = targetX - cx;
      const dy = targetY - cy;

      logo.style.transition = "transform 1.1s cubic-bezier(.65,0,.2,1)";
      logo.style.transform  = `translateX(${dx}px) translateY(${dy}px) scale(${FINAL_SCALE})`;

      if (screenRef.current) {
        screenRef.current.style.background    = "transparent";
        screenRef.current.style.pointerEvents = "none";
      }
    }, 2500);

    // 10. Fade logo out (navbar takes over)
    at(() => {
      if (logoRef.current) {
        logoRef.current.style.transition += ", opacity 0.4s ease";
        logoRef.current.style.opacity = "0";
      }
    }, 3200);

    // 11. Done
    at(() => onFinish?.(), 3600);

    return () => timers.forEach(clearTimeout);
  }, []);

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

      {/* Bird — inline SVG */}
      <div className="bird-wrap" ref={birdRef}>
        <svg viewBox="0 0 140 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Body */}
          <ellipse cx="70" cy="40" rx="24" ry="10" fill="white" opacity="0.95"/>
          {/* Tail */}
          <path d="M46 40 Q34 46 26 54 Q36 42 47 44Z" fill="white" opacity="0.8"/>
          {/* Head */}
          <ellipse cx="91" cy="34" rx="10" ry="8" fill="white" opacity="0.95"/>
          {/* Beak */}
          <path d="M100 33 L112 35 L100 37Z" fill="rgba(200,170,255,0.95)"/>
          {/* Eye */}
          <circle cx="93" cy="32" r="2" fill="#0e0728"/>
          <circle cx="93.7" cy="31.4" r="0.7" fill="white"/>
          {/* Wing left */}
          <path
            className="wing wing-left"
            d="M70 36 Q50 12 24 22 Q46 28 68 40Z"
            fill="white" opacity="0.92"
          />
          {/* Wing right */}
          <path
            className="wing wing-right"
            d="M72 36 Q92 12 118 20 Q96 28 73 40Z"
            fill="white" opacity="0.92"
          />
          {/* Feather lines */}
          <path d="M52 26 Q61 33 68 39" stroke="rgba(180,150,255,0.4)" strokeWidth="0.9"/>
          <path d="M57 21 Q65 30 69 37" stroke="rgba(180,150,255,0.3)" strokeWidth="0.7"/>
          <path d="M88 24 Q80 31 73 38" stroke="rgba(180,150,255,0.4)" strokeWidth="0.9"/>
          {/* Trail lines */}
          <line x1="22" y1="24" x2="6"  y2="24" stroke="rgba(160,110,255,0.5)" strokeWidth="1.2" strokeLinecap="round" className="trail"/>
          <line x1="26" y1="33" x2="8"  y2="35" stroke="rgba(160,110,255,0.35)" strokeWidth="0.9" strokeLinecap="round" className="trail"/>
          <line x1="28" y1="41" x2="12" y2="44" stroke="rgba(160,110,255,0.2)" strokeWidth="0.7" strokeLinecap="round" className="trail"/>
        </svg>
      </div>

      {/* Logo — animates to navbar */}
      <div className="logo-container" ref={logoRef}>
        <div className="logo-row">

          {/* Icon box */}
          <div className="logo-icon" ref={iconRef}>
            <img src={iconSrc} alt="MiTRAA" />
          </div>

          {/* Text letters */}
          <div className="logo-wordmark">
            {LETTERS.map((char, i) => (
              <span
                key={i}
                className={`logo-letter${char === "i" ? " letter-i" : ""}`}
                ref={el => { lettersRef.current[i] = el; }}
              >
                {char}
              </span>
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
