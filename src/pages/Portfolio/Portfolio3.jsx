import "./Portfolio.css";
import Footer from "../../components/Footer/Footer";
import PORTFOLIO1 from "../../assets/images/portfoliohero.webp";

import TalentIcon from "../../assets/images/portfolio1.webp";
import HiringIcon from "../../assets/images/portfolio2.webp";
import MarketIcon from "../../assets/images/portfolio4.webp";
import TeamsIcon  from "../../assets/images/portfolio4.webp";

import WhatWeDoImg  from "../../assets/images/portfoliomid.webp";
import AdvantageImg from "../../assets/images/portfoliodown.webp";

import FeelzyLogo    from "../../assets/images/feezlylogo2.png";
import JarviisLogo   from "../../assets/images/portfolio1.webp";
import SeekmitraLogo from "../../assets/images/portfolio1.webp";

import FeelzyImg    from "../../assets/images/feezlyimage.png";
import JarviisImg   from "../../assets/images/portfolio1.webp";
import SeekmitraImg from "../../assets/images/seekmitraimage.png";


const whyItMatters = [
  { label: "Talent shortages",                   icon: TalentIcon },
  { label: "Rising hiring costs",                icon: HiringIcon },
  { label: "Faster go-to-market pressure",       icon: MarketIcon },
  { label: "Need for flexible, scalable teams",  icon: TeamsIcon  },
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

/* ── PRODUCTS DATA ── */
const products = [
  {
    id: "feelzy",
    logo: FeelzyLogo,
    image: FeelzyImg,
    accentColor: "#b44fbe",
    accentLight: "#f9eeff",
    tagline: "Emotional Wellness Platform",
    name: "feelzy",
    headline: "Together we rise, together we heal",
    description:
      "Feelzy is a digital platform that helps people handle emotions like stress, loneliness, and heartbreak — providing a safe, supportive space where users share their feelings and find community.",
    features: [
      { label: "Anonymous Support",    desc: "Share feelings privately, without judgement" },
      { label: "Empathetic Listeners", desc: "Get support from caring, trained people" },
      { label: "Safe Space",           desc: "Secure and fully confidential environment" },
    ],
    vision:
      "We use technology to bring people closer, support emotional well-being, and create meaningful human connections.",
    contact: {
      email:     "support@feelzy.in",
      facebook:  "https://www.facebook.com",
      instagram: "https://www.instagram.com/feelzyapp",
      linkedin:  "https://www.linkedin.com/company/feelzyapp/",
    },
  },
  {
    id: "jarviis",
    logo: JarviisLogo,
    image: JarviisImg,
    accentColor: "#4a5af8",
    accentLight: "#eef0ff",
    tagline: "AI-Powered Testing Platform",
    name: "JARVIIS AI",
    headline: "The Future of Intelligent Testing",
    description:
      "JARVIIS AI is an AI-based platform that automates testing for websites and applications — helping teams test faster, reduce manual work, and ship with confidence.",
    features: [
      { label: "App Testing",      desc: "Tests web, mobile, and APIs end-to-end" },
      { label: "Smart Detection",  desc: "Identifies errors and regressions automatically" },
      { label: "Test Automation",  desc: "Creates and manages test cases using AI" },
      { label: "Quality Insights", desc: "Actionable reports to improve performance" },
    ],
    vision:
      "JARVIIS AI helps teams release software faster with better quality — reducing testing time, improving accuracy, and ensuring smooth, reliable deployments.",
    contact: null,
  },
  {
    id: "seekmitra",
    logo: SeekmitraLogo,
    image: SeekmitraImg,
    accentColor: "#1a1a2e",
    accentLight: "#f0f0f8",
    tagline: "Mobility & Storytelling Platform",
    name: "SeeKMiTra",
    headline: "Every Journey Tells a Story",
    description:
      "SeeKMiTra is a digital platform that captures real-life stories from everyday travel experiences — turning simple journeys into meaningful narratives by connecting people and their moments.",
    features: [
      { label: "Backseat Stories",     desc: "Capture real conversations and experiences during rides" },
      { label: "Community Connection", desc: "Connect people, cities, and cultures" },
      { label: "Real Experiences",     desc: "Share authentic, human-centered stories" },
    ],
    vision:
      "We believe travel is not just about reaching a destination, but about human connection. SeeKMiTra uses technology to capture and share these moments, creating a unique digital storytelling experience.",
    contact: null,
  },
];

/* ── SOCIAL ICONS ── */
const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="M2 7l10 7 10-7"/>
  </svg>
);
const FBIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const IGIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5"/>
    <circle cx="12" cy="12" r="5"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
);
const LIIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

function Portfolio() {
  return (
    <div className="portfolio__page">

      {/* ── HERO ── */}
      <section className="portfolio__hero">
        <div className="portfolio__hero-rule" />

        <div className="portfolio__hero-content">
          <span className="portfolio__hero-eyebrow">
            Scale Faster. Operate Smarter.
          </span>
          <h1 className="portfolio__hero-title">
            Our<br /><em>Portfolio</em>
          </h1>
          <p className="portfolio__hero-desc">
            We deliver the right talent on demand — helping you scale teams fast
            without hiring delays, overhead, or risk. Not just resources, but
            capability, accountability, and measurable outcomes.
          </p>
          <a href="#products" className="portfolio__hero-cta">
            Explore Our Work
            <span className="portfolio__hero-cta-arrow">→</span>
          </a>
        </div>

        <div className="portfolio__hero-img-wrap">
          <div className="portfolio__hero-img-frame">
            <img src={PORTFOLIO1} alt="Portfolio Hero" />
            <div className="portfolio__hero-stat">
              <span className="portfolio__hero-stat-num">100+</span>
              <span className="portfolio__hero-stat-label">Projects Delivered</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ── */}
      <section className="portfolio__whatwedo">
        <div className="portfolio__whatwedo-container">
          <div>
            <span className="section-label">What We Do</span>
            <h2 className="portfolio__whatwedo-title">
              Expert Teams,<br />On Demand
            </h2>
            <p className="portfolio__whatwedo-desc">
              We extend your teams with pre-vetted, industry-ready experts across
              engineering, product, data, cloud, AI, and operations — without
              the hiring overhead.
            </p>
          </div>
          <div className="portfolio__whatwedo-img">
            <img src={WhatWeDoImg} alt="What We Do" />
          </div>
        </div>
      </section>

      {/* ── WHY IT MATTERS ── */}
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

      {/* ── OUR ADVANTAGE ── */}
      <section className="portfolio__advantage">
        <div className="portfolio__advantage-container">
          <div>
            <span className="section-label">Our Advantage</span>
            <h2 className="portfolio__advantage-title">
              Why teams<br />choose <span>us</span>
            </h2>
            <div className="portfolio__adv-list">
              {advantages.map((item, i) => (
                <div key={i} className="portfolio__adv-item">
                  <div className="portfolio__adv-icon">{item.svg}</div>
                  <div className="portfolio__adv-text">
                    <p className="portfolio__adv-title">{item.title}</p>
                    <p className="portfolio__adv-desc">{item.desc}</p>
                  </div>
                  <span className="portfolio__adv-arrow">→</span>
                </div>
              ))}
            </div>
          </div>
          <div className="portfolio__advantage-img">
            <img src={AdvantageImg} alt="Our Advantage" />
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO HIGHLIGHTS ── */}
      <section className="portfolio__highlights">
        <div className="portfolio__highlights-container">
          <div className="portfolio__highlights-header">
            <div>
              <span className="section-label">Portfolio Highlights</span>
              <h2 className="portfolio__highlights-title">
                Industries<br />We've Shaped
              </h2>
            </div>
            <p className="portfolio__highlights-desc">
              A snapshot of the domains and industries where we've delivered
              measurable, lasting impact for our partners.
            </p>
          </div>
          <div className="portfolio__highlights-grid">
            {highlights.map((item, i) => (
              <div key={i} className="portfolio__highlight-card">
                <div className="portfolio__highlight-emoji-wrap">
                  <span className="portfolio__highlight-emoji">{item.emoji}</span>
                </div>
                <p className="portfolio__highlight-label">{item.label}</p>
              </div>
            ))}
          </div>
          <p className="portfolio__positioning">
            "Positioned as a strategic partner, not just a vendor —
            we become an extension of your team."
          </p>
        </div>
      </section>

      {/* ── PRODUCTS WE'VE BUILT ── */}
      <section className="portfolio__products" id="products">
        <div className="portfolio__products-container">
          <div className="portfolio__products-header">
            <div>
              <span className="section-label">Featured Work</span>
              <h2 className="portfolio__products-title">
                Products<br />We've <span>Built</span>
              </h2>
            </div>
            <p className="portfolio__products-subtitle">
              Real solutions, real impact — a selection of products we have
              designed, developed, and launched for our partners.
            </p>
          </div>

          <div className="portfolio__products-list">
            {products.map((product, idx) => (
              <article
                key={product.id}
                className={`portfolio__product-card ${idx % 2 === 1 ? "portfolio__product-card--reverse" : ""}`}
                style={{ "--accent": product.accentColor, "--accent-light": product.accentLight }}
              >
                {/* Content */}
                <div className="portfolio__product-content">
                  <div className="portfolio__product-top">
                    <div className="portfolio__product-logo-wrap">
                      <img
                        src={product.logo}
                        alt={`${product.name} logo`}
                        className="portfolio__product-logo"
                        onError={e => { e.target.style.display = "none"; }}
                      />
                      <span className="portfolio__product-logo-fallback">{product.name[0]}</span>
                    </div>
                    <div>
                      <p className="portfolio__product-tagline">{product.tagline}</p>
                      <h3 className="portfolio__product-name">{product.name}</h3>
                    </div>
                  </div>

                  <p className="portfolio__product-headline">"{product.headline}"</p>
                  <p className="portfolio__product-desc">{product.description}</p>

                  <ul className="portfolio__product-features">
                    {product.features.map((f, fi) => (
                      <li key={fi} className="portfolio__product-feature">
                        <span className="portfolio__product-feature-dot" />
                        <span className="portfolio__product-feature-label">{f.label}</span>
                        <span className="portfolio__product-feature-sep">—</span>
                        <span className="portfolio__product-feature-desc">{f.desc}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="portfolio__product-vision">
                    <p className="portfolio__product-vision-heading">Our Vision</p>
                    <p className="portfolio__product-vision-text">{product.vision}</p>
                  </div>

                  {product.contact && (
                    <div className="portfolio__product-contact">
                      <p className="portfolio__product-contact-heading">Connect with {product.name}</p>
                      <div className="portfolio__product-contact-links">
                        <a href={`mailto:${product.contact.email}`} className="portfolio__product-social">
                          <EmailIcon /> {product.contact.email}
                        </a>
                        <a href={product.contact.facebook} target="_blank" rel="noreferrer" className="portfolio__product-social">
                          <FBIcon /> Facebook
                        </a>
                        <a href={product.contact.instagram} target="_blank" rel="noreferrer" className="portfolio__product-social">
                          <IGIcon /> Instagram
                        </a>
                        <a href={product.contact.linkedin} target="_blank" rel="noreferrer" className="portfolio__product-social">
                          <LIIcon /> LinkedIn
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Visual */}
                <div className="portfolio__product-visual">
                  <div className="portfolio__product-img-frame">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="portfolio__product-img"
                      onError={e => { e.target.style.display = "none"; }}
                    />
                    <div className="portfolio__product-img-placeholder">
                      <span>{product.name}</span>
                      <small>Product Image</small>
                    </div>
                  </div>
                  <div className="portfolio__product-badge">
                    <span>{product.tagline.split(" ")[0]}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Portfolio;
