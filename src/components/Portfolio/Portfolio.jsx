import "./Portfolio.global.css";

import Hero          from "../../components/Portfolio/Hero/Hero";
import WhatWeDo      from "../../components/Portfolio/WhatWeDo/WhatWeDo";
import WhyItMatters  from "../../components/Portfolio/WhyItMatters/WhyItMatters";
import OurAdvantage  from "../../components/Portfolio/OurAdvantage/OurAdvantage";
import Highlights    from "../../components/Portfolio/Highlights/Highlights";
import Products      from "../../components/Portfolio/Products/Products";
import Footer        from "../../components/Portfolio/Footer/Footer";

function Portfolio() {
  return (
    <div className="portfolio__page">
      <Hero />
      <WhatWeDo />
      <WhyItMatters />
      <OurAdvantage />
      <Highlights />
      <Products />
      <Footer />
    </div>
  );
}

export default Portfolio;
