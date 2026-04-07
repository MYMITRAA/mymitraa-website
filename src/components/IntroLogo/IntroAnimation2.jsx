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

    // 4. Bird flies in from right
    at(() => birdRef.current?.classList.add("fly-in"), 750);

    // 5. Bird does a dive-dip
    at(() => {
      birdRef.current?.classList.remove("fly-in");
      birdRef.current?.classList.add("dive");
    }, 1100);

    // 6. Bird recovers back up
    at(() => {
      birdRef.current?.classList.remove("dive");
      birdRef.current?.classList.add("fly-in");
    }, 1350);

    // 7. Swap white SVGs → blue SVGs
    at(() => setIsBlue(true), 1700);

    // 8. Bird flap burst (excited shake)
    at(() => birdRef.current?.classList.add("flap"),    1150);
    at(() => birdRef.current?.classList.remove("flap"), 1700);

    // 9. Bird spins/loops
    at(() => {
      birdRef.current?.classList.remove("fly-in");
      birdRef.current?.classList.add("loop");
    }, 1900);

    // 10. Back to hover after loop
    at(() => {
      birdRef.current?.classList.remove("loop");
      birdRef.current?.classList.add("fly-in");
    }, 2200);

    // 11. Tagline out
    at(() => {
      if (taglineRef.current) taglineRef.current.style.opacity = "0";
    }, 2300);

    // 12. Bird zooms out top-right
    at(() => {
      birdRef.current?.classList.remove("fly-in");
      birdRef.current?.classList.add("fly-out");
    }, 2500);

    // 13. Logo moves to navbar top-left
    at(() => {
      const logo = logoRef.current;
      if (!logo) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const isMobile  = vw <= 480;
      const isTablet  = vw <= 768;
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
    }, 2600);

    // 14. Fade logo out
    at(() => {
      if (logoRef.current) {
        logoRef.current.style.transition += ", opacity 0.4s ease";
        logoRef.current.style.opacity = "0";
      }
    }, 3300);

    // 15. Done
    at(() => onFinish?.(), 3700);

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
