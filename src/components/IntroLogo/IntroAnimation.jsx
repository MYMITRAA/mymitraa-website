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