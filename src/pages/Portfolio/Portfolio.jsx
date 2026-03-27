import "./Portfolio.css";
import Footer from "../../components/Footer/Footer";
import PORTFOLIO1 from "../../assets/images/portfoliohero.png";

import TalentIcon from "../../assets/images/portfolio1.png";
import HiringIcon from "../../assets/images/portfolio2.png";
import MarketIcon from "../../assets/images/portfolio4.png"; // fixed
import TeamsIcon from "../../assets/images/portfolio4.png";

import WhatWeDoImg from "../../assets/images/portfoliomid.png";
import AdvantageImg from "../../assets/images/portfoliodown.png";

const whyItMatters = [
  { label: "Talent shortages",                   icon: TalentIcon  },
  { label: "Rising hiring costs",                icon: HiringIcon  },
  { label: "Faster go-to-market pressure",       icon: MarketIcon  },
  { label: "Need for flexible, scalable teams",  icon: TeamsIcon   },
];

const advantages = [
  {
    title: "Elite Talent",
    desc: "Proven experts, not resumes",
    svg: <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
  },
  {
    title: "Rapid Onboarding",
    desc: "Days, not months",
    svg: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>,
  },
  {
    title: "Flexible Scale",
    desc: "Scale up or down anytime",
    svg: <svg viewBox="0 0 24 24"><rect x="3" y="14" width="4" height="7" rx="1"/><rect x="10" y="9" width="4" height="12" rx="1"/><rect x="17" y="4" width="4" height="17" rx="1"/></svg>,
  },
  {
    title: "Full Ownership",
    desc: "You control delivery, we ensure continuity",
    svg: <svg viewBox="0 0 24 24"><path d="M12 2l7 4v6c0 5-3.5 9-7 10C8.5 21 5 17 5 12V6l7-4z"/><path d="M9 12l2 2 4-4"/></svg>,
  },
];

const highlights = [
  { emoji: "🏢", label: "Enterprise SaaS platforms" },
  { emoji: "🤖", label: "AI-powered automation tools" },
  { emoji: "🔗", label: "Fintech applications" },
  { emoji: "🛒", label: "E-commerce projects" },
];

function Portfolio() {
  return (
    <div className="portfolio__page">

      {/* ── HERO ── */}
      <section className="portfolio__hero">
        <div className="portfolio__hero-img-wrap">
          <img src={PORTFOLIO1} alt="Portfolio Hero" />
        </div>
        <div className="portfolio__hero-content">
          <p className="portfolio__hero-tag">
            Scale Faster. Operate Smarter. Deliver Without Limits.
          </p>
          <h1 className="portfolio__hero-title">PORTFOLIO</h1>
          <p className="portfolio__hero-desc">
            Our Resource Augmentation Services deliver the right talent on demand,
            helping you scale teams fast without hiring delays, overhead, or risk.
            <br />
            We don't just provide resources,&nbsp;we deliver capability, accountability,
            and measurable outcomes.
          </p>
        </div>
      </section>

      {/* ── WHAT WE DO ── */}
      <section className="portfolio__whatwedo">
        <div className="portfolio__whatwedo-container">
          <div className="portfolio__whatwedo-left">
            <h2 className="portfolio__whatwedo-title">What We Do</h2>
            <p className="portfolio__whatwedo-desc">
              We extend your teams with pre-vetted, industry-ready experts across
              engineering, product, data, cloud, AI, and operations without hiring overhead.
            </p>
          </div>
          <div className="portfolio__whatwedo-right">
            <div className="portfolio__whatwedo-img">
              <img src={WhatWeDoImg} alt="What We Do" />
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY IT MATTERS ── */}
      <section className="portfolio__why">
        <div className="portfolio__why-container">
          <h2 className="portfolio__why-title">Why It Matters</h2>
          <p className="portfolio__why-subtitle">We solve all four, at enterprise scale.</p>
          <div className="portfolio__why-grid">
            {whyItMatters.map((item, i) => (
              <div key={i} className="portfolio__why-card">
                <div className="portfolio__why-icon">
                  <img src={item.icon} alt={item.label} />
                </div>
                <p className="portfolio__why-label">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR ADVANTAGE ── */}
      <section className="portfolio__advantage">
        <div className="portfolio__advantage-container">
          <div className="portfolio__advantage-left">
            <h2 className="portfolio__advantage-title">
              Our <span>Advantage</span>
            </h2>
            <div className="portfolio__adv-list">
              {advantages.map((item, i) => (
                <div key={i} className="portfolio__adv-item">
                  <div className="portfolio__adv-icon">
                    {item.svg}
                  </div>
                  <div className="portfolio__adv-text">
                    <p className="portfolio__adv-title">{item.title}</p>
                    <p className="portfolio__adv-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="portfolio__advantage-right">
            <div className="portfolio__advantage-img">
              <img src={AdvantageImg} alt="Our Advantage" />
            </div>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO HIGHLIGHTS ── */}
      <section className="portfolio__highlights">
        <div className="portfolio__highlights-container">
          <h2 className="portfolio__highlights-title">Portfolio Highlights</h2>
          <p className="portfolio__highlights-desc">
            A snapshot of the industries and domains we've delivered in.
          </p>
          <div className="portfolio__highlights-grid">
            {highlights.map((item, i) => (
              <div key={i} className="portfolio__highlight-card">
                <span className="portfolio__highlight-emoji">{item.emoji}</span>
                <p className="portfolio__highlight-label">{item.label}</p>
              </div>
            ))}
          </div>
          <p className="portfolio__positioning">
            Positioned as a strategic partner, not just a vendor — we become
            an extension of your team.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Portfolio;