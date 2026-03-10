import { useState } from "react";
import "./Megamenu.css";
import MidMenu from "./MidMenu";

import ServicesContent from "../MegaContent/ServicesContent";
import PortfolioContent from "../MegaContent/PortfolioContent";
import CaseStudiesContent from "../MegaContent/CaseStudiesContent";
import ResourcesContent from "../MegaContent/ResourcesContent";
import { Import } from "lucide-react";

export default function MegaMenu({ closeMenu }) {

  const [active, setActive] = useState("services");
  const [service, setService] = useState("genai");

  const renderContent = () => {

    if (active === "portfolio") return <PortfolioContent closeMenu={closeMenu} />;
    if (active === "casestudies") return <CaseStudiesContent closeMenu={closeMenu} />;
    if (active === "resources") return <ResourcesContent closeMenu={closeMenu} />;

    return <ServicesContent service={service} closeMenu={closeMenu} />;

  };

  return (
    <div className="mega-menu">

      {/* LEFT MENU */}
      <div className="mega-left">

        <div
          className={`mega-left-item ${active === "services" ? "active" : ""}`}
          onMouseEnter={() => setActive("services")}
        >
          Our Services
        </div>

        <div
          className={`mega-left-item ${active === "portfolio" ? "active" : ""}`}
          onMouseEnter={() => setActive("portfolio")}
        >
          Our Portfolio
        </div>

        <div
          className={`mega-left-item ${active === "casestudies" ? "active" : ""}`}
          onMouseEnter={() => setActive("casestudies")}
        >
          Case Studies
        </div>

        <div
          className={`mega-left-item ${active === "resources" ? "active" : ""}`}
          onMouseEnter={() => setActive("resources")}
        >
          Resource Argumentation
        </div>

      </div>

      {/* MID MENU (ONLY FOR SERVICES) */}
      {active === "services" && (
        <MidMenu setService={setService} />
      )}

      {/* RIGHT CONTENT */}
      <div className="mega-right">
        {renderContent()}
      </div>

    </div>
  );
}