import "./WhatWeDo.css";
import CardSlider from "./CardSlider";

function WhatWeDo() {
  return (
    <section className="pf-wwd">
      <div className="pf-wwd__container">

        <div className="pf-wwd__text">
          <span className="pf-wwd__eyebrow">What We Do</span>
          <h2 className="pf-wwd__title">
            Expert Teams,<br /><em>On Demand</em>
          </h2>
          <p className="pf-wwd__desc">
            We extend your teams with pre-vetted, industry-ready experts across
            engineering, product, data, cloud, AI, and operations without
            the hiring overhead.
          </p>
          <div className="pf-wwd__stats">
            <div className="pf-wwd__stat">
              <span className="pf-wwd__stat-num">200+</span>
              <span className="pf-wwd__stat-label">Experts Deployed</span>
            </div>
            <div className="pf-wwd__stat">
              <span className="pf-wwd__stat-num">48h</span>
              <span className="pf-wwd__stat-label">Avg. Onboarding</span>
            </div>
            <div className="pf-wwd__stat">
              <span className="pf-wwd__stat-num">98%</span>
              <span className="pf-wwd__stat-label">Client Retention</span>
            </div>
          </div>
        </div>

        <CardSlider />

      </div>
    </section>
  );
}

export default WhatWeDo;