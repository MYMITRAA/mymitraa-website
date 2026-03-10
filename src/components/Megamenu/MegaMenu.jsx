import "./MegaMenu.css";
import { useState } from "react";

import ServicesContent from "../MegaContent/ServicesContent";
import PortfolioContent from "../MegaContent/PortfolioContent";
import CaseStudiesContent from "../MegaContent/CaseStudiesContent";
import ResourcesContent from "../MegaContent/ResourcesContent";

export default function MegaMenu() {

  const [active, setActive] = useState("services");

  const renderContent = () => {
    switch (active) {
      case "portfolio":
        return <PortfolioContent />;
      case "casestudies":
        return <CaseStudiesContent />;
      case "resources":
        return <ResourcesContent />;
      default:
        return <ServicesContent />;
    }
  };

  return (
    <div className="mega-menu">

      {/* LEFT MENU */}
      <div className="mega-left">

        <div
          className={`mega-left-item ${active==="services"?"active":""}`}
          onMouseEnter={()=>setActive("services")}
        >
          Our Services
        </div>

        <div
          className={`mega-left-item ${active==="portfolio"?"active":""}`}
          onMouseEnter={()=>setActive("portfolio")}
        >
          Our Portfolio
        </div>

        <div
          className={`mega-left-item ${active==="casestudies"?"active":""}`}
          onMouseEnter={()=>setActive("casestudies")}
        >
          Case Studies
        </div>

        <div
          className={`mega-left-item ${active==="resources"?"active":""}`}
          onMouseEnter={()=>setActive("resources")}
        >
          Resource Argumentation
        </div>

      </div>

      {/* RIGHT CONTENT */}
      <div className="mega-right">
        {renderContent()}
      </div>

    </div>
  );
}