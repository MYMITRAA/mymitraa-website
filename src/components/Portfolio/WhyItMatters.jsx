import "./WhyItMatters.css";

import TalentIcon from "../../assets/images/portfolio1.webp";
import HiringIcon from "../../assets/images/portfolio2.webp";
import MarketIcon from "../../assets/images/portfolio4.webp";
import TeamsIcon  from "../../assets/images/portfolio4.webp";

const whyItMatters = [
  { label: "Talent shortages",                  icon: TalentIcon },
  { label: "Rising hiring costs",               icon: HiringIcon },
  { label: "Faster go-to-market pressure",      icon: MarketIcon },
  { label: "Need for flexible, scalable teams", icon: TeamsIcon  },
];

function WhyItMatters() {
  return (
    <section className="portfolio__why">
      <div className="portfolio__why-container">
        <div className="portfolio__why-header">
          <div>
            <span className="section-label">Why It Matters</span>
            <h2 className="portfolio__why-title">
              We solve all four,<br />at enterprise scale.
            </h2>
          </div>
          <p className="portfolio__why-subtitle">
            The four forces reshaping how modern businesses build teams today.
          </p>
        </div>
        <div className="portfolio__why-grid">
          {whyItMatters.map((item, i) => (
            <div key={i} className="portfolio__why-card">
              <div className="portfolio__why-icon">
                <img src={item.icon} alt={item.label} />
              </div>
              <div className="portfolio__why-number">0{i + 1}</div>
              <p className="portfolio__why-label">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyItMatters;
