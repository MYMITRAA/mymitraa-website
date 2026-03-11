import React from "react";
import "./EagleAnimation.css";

import leftWing from "../../assets/eagle/eagleleftwing.svg";
import rightWing from "../../assets/eagle/eaglerightwing.svg";
import head from "../../assets/eagle/eaglehead.svg";
import tail from "../../assets/eagle/eagletail.svg";
import body from "../../assets/eagle/eaglebody.svg";
import leftLeg from "../../assets/eagle/eagleleftleg.svg";
import rightLeg from "../../assets/eagle/eaglerightleg.svg";

const EagleAnimation = () => {
  return (
    <div className="eagle-container">
      <div className="eagle">

        <img src={leftWing} className="wing left-wing" alt="" />
        <img src={rightWing} className="wing right-wing" alt="" />

        <img src={body} className="body" alt="" />
        <img src={head} className="head" alt="" />

        <img src={tail} className="tail" alt="" />

        <img src={leftLeg} className="leg left-leg" alt="" />
        <img src={rightLeg} className="leg right-leg" alt="" />

      </div>
    </div>
  );
};

export default EagleAnimation;