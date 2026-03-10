import { useState } from "react";

import arrowWhite from "../../assets/images/arrow-white.svg";
import arrowBlue from "../../assets/images/arrow-blue.svg";

export default function MidMenu({ setService }) {

  const [activeService, setActiveService] = useState("genai");

  const handleHover = (service) => {
    setActiveService(service);
    setService(service);
  };

  const getArrow = (service) =>
    activeService === service ? arrowBlue : arrowWhite;

  return (
    <div className="mega-middle">

      <div
        className={`mega-link ${activeService==="genai"?"active":""}`}
        onMouseEnter={() => handleHover("genai")}
      >
        <span>Generative AI Solutions</span>
        <img src={getArrow("genai")} alt="" className="menu-arrow" />
      </div>

      <div
        className={`mega-link ${activeService==="web"?"active":""}`}
        onMouseEnter={() => handleHover("web")}
      >
        <span>Web & Mobile App Development</span>
        <img src={getArrow("web")} alt="" className="menu-arrow" />
      </div>

      <div
        className={`mega-link ${activeService==="blockchain"?"active":""}`}
        onMouseEnter={() => handleHover("blockchain")}
      >
        <span>Blockchain (Web3)</span>
        <img src={getArrow("blockchain")} alt="" className="menu-arrow" />
      </div>

      <div
        className={`mega-link ${activeService==="agile"?"active":""}`}
        onMouseEnter={() => handleHover("agile")}
      >
        <span>Enterprise Agile Development</span>
        <img src={getArrow("agile")} alt="" className="menu-arrow" />
      </div>

      <div
        className={`mega-link ${activeService==="security"?"active":""}`}
        onMouseEnter={() => handleHover("security")}
      >
        <span>Cyber Security</span>
        <img src={getArrow("security")} alt="" className="menu-arrow" />
      </div>

      <div
        className={`mega-link ${activeService==="enterprise"?"active":""}`}
        onMouseEnter={() => handleHover("enterprise")}
      >
        <span>Enterprise Technology & Performance</span>
        <img src={getArrow("enterprise")} alt="" className="menu-arrow" />
      </div>

      <div className="mega-link">
        <span>Others</span>
        <img src={arrowWhite} alt="" className="menu-arrow" />
      </div>

    </div>
  );
}