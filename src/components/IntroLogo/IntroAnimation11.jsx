import { useEffect, useState } from "react";
import "./IntroAnimation.css";

import iconWhite from "../../assets/logo/icon-white.svg";
import iconBlue from "../../assets/logo/icon-blue.svg";

import Mwhite from "../../assets/logo/M-white.svg";
import Mblue from "../../assets/logo/M-blue.svg";

import Iwhite from "../../assets/logo/I-white.svg";
import Iblue from "../../assets/logo/I-blue.svg";

import Twhite from "../../assets/logo/T-white.svg";
import Tblue from "../../assets/logo/T-blue.svg";

import Rwhite from "../../assets/logo/R-white.svg";
import Rblue from "../../assets/logo/R-blue.svg";

import Awhite from "../../assets/logo/A-white.svg";
import Ablue from "../../assets/logo/A-blue.svg";

export default function IntroAnimation({ onFinish }) {

  const [showIndex, setShowIndex] = useState(0);
  const [move, setMove] = useState(false);
  const [blue, setBlue] = useState(false);
  const [fade, setFade] = useState(false);

  const lettersWhite = [Mwhite, Iwhite, Twhite, Rwhite, Awhite, Awhite];
  const lettersBlue = [Mblue, Iblue, Tblue, Rblue, Ablue, Ablue];

  useEffect(() => {

    const interval = setInterval(() => {
      setShowIndex(prev => prev + 1);
    }, 200);

    setTimeout(() => clearInterval(interval), 1800);

    // start movement + turn blue
    setTimeout(() => {
      setMove(true);
      setBlue(true);
    }, 1800);

    // fade animation logo
    setTimeout(() => {
      setFade(true);
    }, 2500);

    // finish intro
    setTimeout(() => {
      onFinish();
    }, 3000);

  }, []);

  return (

    <div className={`intro-screen ${move ? "move" : ""} ${fade ? "fade" : ""}`}>

      <div className="logo-row">

        {/* ICON */}
        <img
          src={blue ? iconBlue : iconWhite}
          className={`logo-icon ${showIndex >= 0 ? "show" : ""}`}
          alt="logo icon"
        />

        {/* LETTERS */}
        {(blue ? lettersBlue : lettersWhite).map((letter, i) => (
          <img
            key={i}
            src={letter}
            className={`logo-letter ${showIndex > i ? "show" : ""}`}
            alt="logo letter"
          />
        ))}

      </div>

    </div>
  );
}

import { useEffect, useRef } from "react";
import "./IntroAnimation.css";

import iconSrc from "../../assets/logo/icon-white.svg";
import birdImage from "../../assets/images/birdimage.svg";
import Mwhite from "../../assets/logo/M-white.svg";
import Iwhite from "../../assets/logo/I-white.svg";
import Twhite from "../../assets/logo/T-white.svg";
import Rwhite from "../../assets/logo/R-white.svg";
import Awhite from "../../assets/logo/A-white.svg";

const LETTERS = [Mwhite, Iwhite, Twhite, Rwhite, Awhite, Awhite];
const FINAL_SCALE = 0.4;     // logo size in navbar
const NAVBAR_H    = 56;      // your actual navbar height in px
const LOGO_LEFT   = 20;      // px from left edge of viewport

export default function IntroAnimation({ onFinish }) {
  const screenRef    = useRef();
  const logoRef      = useRef();
  const iconRef      = useRef();
  const taglineRef   = useRef();
  const birdRef      = useRef();
  const lettersRef   = useRef([]);

  useEffect(() => {
    const timers = [];
    const at = (fn, ms) => timers.push(setTimeout(fn, ms));

    const show  = (ref) => ref.current?.classList.add("show");
    const gone  = (ref) => ref.current?.classList.add("gone");

    // 1. Icon
    at(() => show(iconRef), 250);

    // 2. Letters stagger
    lettersRef.current.forEach((el, i) =>
      at(() => { if (el) { el.style.opacity = "1"; el.style.transform = "none"; } }, 420 + i * 150)
    );

    // 3. Tagline
    at(() => show(taglineRef), 1500);

    // 4. Bird flies in
    at(() => birdRef.current?.classList.add("fly-in"), 950);

    // 5. Letters go brand colour
    at(() => {
      lettersRef.current.forEach(el => el?.classList.add("blue"));
    }, 1750);

    // 6. Bird flies out
    at(() => {
      birdRef.current?.classList.remove("fly-in");
      birdRef.current?.classList.add("fly-out");
    }, 2250);

    // 7. Tagline out
    at(() => gone(taglineRef), 2500);

    // 8. ── MOVE TO TOP-LEFT ──
    // Calculate the exact translate needed to land the logo
    // at top-left of the viewport, aligned with the navbar.
    at(() => {
      const logo = logoRef.current;
      if (!logo) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Current center of logo (it's centered on screen)
      const cx = vw / 2;
      const cy = vh / 2;

      // Where we want the logo's top-left corner to land
      // Navbar centre-Y = NAVBAR_H / 2
      // Logo natural width at scale(1.7) ≈ 200px → at FINAL_SCALE ≈ 47px
      const logoNaturalW = 200; // approximate — adjust to your actual logo width
      const logoNaturalH = 44;
      const finalW = logoNaturalW * FINAL_SCALE;
      const finalH = logoNaturalH * FINAL_SCALE;

      // Target: logo center-x = LOGO_LEFT + finalW/2, center-y = NAVBAR_H/2
      const targetX = LOGO_LEFT + finalW / 2;
      const targetY = NAVBAR_H / 2;

      const dx = targetX - cx;
      const dy = targetY - cy;

      logo.style.transition = "transform 1.1s cubic-bezier(.65,0,.2,1), opacity 0.4s ease";
      logo.style.transform  = `translateX(${dx}px) translateY(${dy}px) scale(${FINAL_SCALE})`;

      // Background clears
      if (screenRef.current) screenRef.current.style.background = "transparent";
    }, 2650);

    // 9. Fade the logo out (the real navbar logo takes over)
    at(() => {
      if (logoRef.current) logoRef.current.style.opacity = "0";
    }, 3300);

    // 10. Done
    at(() => onFinish?.(), 3700);

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="intro-screen" ref={screenRef}>
      <div className="particles">
        {Array.from({ length: 16 }).map((_, i) => (
          <span key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${4 + Math.random() * 5}s`,
            animationDelay:    `${Math.random() * 4}s`,
          }} />
        ))}
      </div>

      <div className="glow" />

      <img className="bird-wrap" ref={birdRef} src={birdImage} alt="" aria-hidden="true" />

      {/* This div is what animates to top-left */}
      <div className="logo-container" ref={logoRef}>
        <div className="logo-row">
          <div className="logo-icon" ref={iconRef}>
            <img src={iconSrc} alt="logo" />
          </div>
          {LETTERS.map((src, i) => (
            <img
              key={i}
              src={src}
              className="logo-letter"
              ref={el => (lettersRef.current[i] = el)}
              alt=""
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      <p className="tagline" ref={taglineRef}>Where ideas take flight</p>
    </div>
  );
}


