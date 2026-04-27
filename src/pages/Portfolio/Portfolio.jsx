import "./Portfolio.global.css";
import Hero          from "../../components/Portfolio/PortfolioHero";
import WhatWeDo      from "../../components/Portfolio/WhatWeDo";
import WhyItMatters  from "../../components/Portfolio/WhyItMatters";
import OurAdvantage  from "../../components/Portfolio/OurAdvantage";
import Highlights    from "../../components/Portfolio/Highlights";
import Products      from "../../components/Portfolio/Products";
import Footer        from "../../components/Footer/Footer";
import MVP           from "../../components/Portfolio/MVP";

function Portfolio() {
  return (
    <div className="portfolio__page">
      <Hero />
      <WhatWeDo />
      <WhyItMatters />
      <OurAdvantage />
      <Highlights />
      <Products />
      <MVP />
      <Footer />
    </div>
  );
}

export default Portfolio;
