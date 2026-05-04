import "./Products.css";

import feelzyImg    from "../../assets/images/feelzyimage.webp";
import jarviisImg   from "../../assets/images/jarviisimage.webp";
import seekmitraImg from "../../assets/images/seekmitraimage3.webp";
import seekmitralogo from "../../assets/logo/transparent_logo_seekmitra.png";
import jarviislogo from "../../assets/logo/jarviis_logo_transparent_hd.png";
import feelzylogo from "../../assets/logo/feezly_logo_hd.png";

/* ── Social Icons ── */
const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="M2 7l10 7 10-7"/>
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
const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>
  </svg>
);

/* ── Check Icon ── */
const CheckIcon = ({ color }) => (
  <svg viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="9" stroke={color} strokeWidth="1.5" opacity="0.4"/>
    <path d="M6.5 10l2.5 2.5 4.5-5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ── Products Data ── */
const products = [
  {
    id: "feelzy",
    theme: "feelzy",
    tagline: "Emotional Wellness Platform",
    name: "feelzy",
    logoSrc: feelzylogo,
    productImage: feelzyImg,
    headline: "Together we rise, together we heal",
    description: "Feelzy is a digital platform that helps people handle emotions like stress, loneliness, and heartbreak  providing a safe, supportive space where users share their feelings and find community.",
    features: [
      { label: "Anonymous Support",    desc: "Share feelings privately, without judgement" },
      { label: "Empathetic Listeners", desc: "Get support from caring, trained people" },
      { label: "Safe Space",           desc: "Secure and fully confidential environment" },
    ],
    vision: "We use technology to bring people closer, support emotional well being, and create meaningful human connections.",
    accentColor: "#ff2d78",
    badgeLabel: "Wellness",
    num: "01",
    contact: {
      website:   "https://www.feelzy.in",
      email:     "support@feelzy.in",
      instagram: "https://www.instagram.com/feelzyapp",
      linkedin:  "https://www.linkedin.com/company/feelzyapp/",
    },
  },
  {
    id: "jarviis",
    theme: "jarviis",
    tagline: "AI Powered Testing Platform",
    name: "JARViiS AI",
    logoSrc: jarviislogo,
    productImage: jarviisImg,
    headline: "The Future of Intelligent Testing",
    description: "JARViiS AI automates testing for websites and applications helping teams test faster, reduce manual work, and ship with confidence.",
    features: [
      { label: "App Testing",      desc: "Tests web, mobile, and APIs end-to-end" },
      { label: "Smart Detection",  desc: "Identifies errors and regressions automatically" },
      { label: "Test Automation",  desc: "Creates and manages test cases using AI" },
      { label: "Quality Insights", desc: "Actionable reports to improve performance" },
    ],
    vision: "JARViiS AI helps teams release software faster with better quality reducing testing time, improving accuracy, and ensuring smooth, reliable deployments.",
    accentColor: "#e8b84b",
    badgeLabel: "AI Testing",
    num: "02",
    contact: null,
  },
  {
    id: "seekmitra",
    theme: "seekmitra",
    tagline: "Mobility & Storytelling Platform",
    name: "SeekMITra",
    logoSrc: seekmitralogo,
    productImage: seekmitraImg,
    headline: "Every Journey Tells a Story",
    description: "SeekMITra captures real life stories from everyday travel experiences turning simple journeys into meaningful narratives by connecting people and their moments.",
    features: [
      { label: "Backseat Stories",     desc: "Capture real conversations and experiences during rides" },
      { label: "Community Connection", desc: "Connect people, cities, and cultures" },
      { label: "Real Experiences",     desc: "Share authentic, human-centered stories" },
    ],
    vision: "We believe travel is not just about reaching a destination, but about human connection. SeekMITra uses technology to capture and share these moments.",
    accentColor: "#a78bfa",
    badgeLabel: "Storytelling",
    num: "03",
    contact: null,
  },
];

function Products() {
  return (
    <section className="prd-section" id="products">

      {/* Section Header */}
      <div className="prd-header">
        <div className="prd-header__left">
          <span className="prd-header__label">Featured Work</span>
          <h2 className="prd-header__title">Products We've <em>Built</em></h2>
        </div>
        <p className="prd-header__sub">
          Real solutions, real impact  a selection of products we have designed,
          developed, and launched for our partners.
        </p>
      </div>

      {/* Product Cards */}
      <div className="prd-list">
        {products.map((p, idx) => {
          const isFlip = idx % 2 === 1;
          return (
            <article
              key={p.id}
              className={`prd-card prd-card--${p.theme}${isFlip ? " prd-card--flip" : ""}`}
            >
              {/* Visual Panel */}
              <div className="prd-card__visual">
                <img
                  src={p.productImage}
                  alt={`${p.name} product screenshot`}
                  className="prd-card__product-img"
                />
                <div className="prd-card__visual-overlay" />
                <span className="prd-card__badge">{p.badgeLabel}</span>
                <span className="prd-card__number">{p.num}</span>
              </div>

              {/* Content Panel */}
              <div className="prd-card__content">
                <div className="prd-card__top-accent" />

                {/* Logo + Name */}
                <div className="prd-card__top">
                  <div className="prd-card__logo-box">
                    <img
                      src={p.logoSrc}
                      alt={`${p.name} logo`}
                      className="prd-card__logo-img"
                    />
                  </div>
                  <div className="prd-card__identity">
                    <span className="prd-card__tagline">{p.tagline}</span>
                    <h3 className={`prd-card__name${p.theme === "jarviis" ? " jarviis-name" : ""}`}>
                      {p.name}
                    </h3>
                  </div>
                </div>

                {/* Headline */}
                <p className="prd-card__headline">"{p.headline}"</p>

                {/* Description */}
                <p className="prd-card__desc">{p.description}</p>

                {/* Divider */}
                <div className="prd-card__divider" />

                {/* Features */}
                <ul className="prd-card__features">
                  {p.features.map((f, fi) => (
                    <li key={fi} className="prd-card__feature">
                      <span className="prd-card__feature-icon">
                        <CheckIcon color={p.accentColor} />
                      </span>
                      <span className="prd-card__feature-label">{f.label}</span>
                      <span className="prd-card__feature-desc">{f.desc}</span>
                    </li>
                  ))}
                </ul>

                {/* Vision */}
                <div className="prd-card__vision">
                  <span className="prd-card__vision-label">Our Vision</span>
                  <p className="prd-card__vision-text">{p.vision}</p>
                </div>

                {/* Contact — Feelzy only */}
                {p.contact && (
                  <div className="prd-card__contact">
                    <span className="prd-card__contact-label">Connect with {p.name}</span>
                    <div className="prd-card__contact-grid">
                      <a
                        href={p.contact.website}
                        target="_blank"
                        rel="noreferrer"
                        className="prd-card__social prd-card__social--website"
                      >
                        <GlobeIcon />
                        <span>Visit feelzy.in</span>
                      </a>
                      <a href={`mailto:${p.contact.email}`} className="prd-card__social">
                        <EmailIcon />
                        <span>{p.contact.email}</span>
                      </a>
                      <a href={p.contact.instagram} target="_blank" rel="noreferrer" className="prd-card__social">
                        <IGIcon />
                        <span>Instagram</span>
                      </a>
                      <a href={p.contact.linkedin} target="_blank" rel="noreferrer" className="prd-card__social">
                        <LIIcon />
                        <span>LinkedIn</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Products;
