import "./Hero.css";

function PortfolioHero() {
  return (
    <section className="pf-hero">
      <div className="pf-hero__rule" />

      <div className="pf-hero__content">

        {/* ── Left: Text ── */}
        <div className="pf-hero__left">
          <span className="pf-hero__eyebrow">
            Scale Faster. Operate Smarter.
          </span>

          <h1 className="pf-hero__title">
            Our
            <em>Portfolio</em>
          </h1>

          <p className="pf-hero__desc">
            We deliver the right talent on demand — helping you scale teams fast
            without hiring delays, overhead, or risk. Not just resources, but
            capability, accountability, and measurable outcomes.
          </p>

          <div className="pf-hero__cta-group">
            <a href="#products" className="pf-hero__cta">
              Explore Our Work
              <span className="pf-hero__cta-arrow">→</span>
            </a>
            <a href="#contact" className="pf-hero__cta-ghost">
              Get in Touch →
            </a>
          </div>
        </div>

        {/* ── Right: Stat Cards ── */}
        <div className="pf-hero__right">
          <div className="pf-hero__stat-card">
            <div className="pf-hero__stat-num">200<span>+</span></div>
            <div className="pf-hero__stat-label">Experts Deployed</div>
          </div>

          <div className="pf-hero__stat-connector" />

          <div className="pf-hero__stat-card">
            <div className="pf-hero__stat-num">48<span>h</span></div>
            <div className="pf-hero__stat-label">Average Onboarding</div>
          </div>

          <div className="pf-hero__stat-connector" />

          <div className="pf-hero__stat-card">
            <div className="pf-hero__stat-num">98<span>%</span></div>
            <div className="pf-hero__stat-label">Client Retention Rate</div>
          </div>
        </div>

      </div>

      {/* ── Scroll indicator ── */}
      <div className="pf-hero__scroll">
        <span className="pf-hero__scroll-line" />
        Scroll
      </div>

    </section>
  );
}

export default PortfolioHero;