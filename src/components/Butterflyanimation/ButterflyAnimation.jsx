import React from "react";
import "./ButterflyAnimation.css";
import butterflyImg from "../../assets/images/Butterfly.png";
import treeBranch from "../../assets/images/landingtreebranch.svg";

const ButterflyAnimation = () => {
  return (
    <div className="butterfly-container">

      {/* TREE BRANCH */}
      <img src={treeBranch} alt="" className="butterfly-branch" />

      {/* BUTTERFLY WRAPPER — floats as one unit */}
      <div className="butterfly-wrapper">

        {/* LEFT WING — clip left half, rotates from right edge (body) */}
        <div className="butterfly-wing butterfly-wing--left">
          <img src={butterflyImg} alt="" className="butterfly-img" />
        </div>

        {/* RIGHT WING — clip right half, rotates from left edge (body) */}
        <div className="butterfly-wing butterfly-wing--right">
          <img src={butterflyImg} alt="" className="butterfly-img" />
        </div>

        {/* BODY OVERLAY — center strip always visible, anchors the two wings */}
        <div className="butterfly-body-strip">
          <img src={butterflyImg} alt="" className="butterfly-img" />
        </div>

      </div>

    </div>
  );
};

export default ButterflyAnimation;
