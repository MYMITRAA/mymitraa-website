import "./Products.css";

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

/* ── Feelzy Visual ── */
const FeelzyVisual = () => (
  <div className="visual-inner">
    <div className="fz-orb fz-orb1" />
    <div className="fz-orb fz-orb2" />
    <div className="fz-orb fz-orb3" />
    <div className="fz-conn fz-conn1" />
    <div className="fz-conn fz-conn2" />
    <div className="fz-heart">
      <svg width="160" height="150" viewBox="0 0 160 150" fill="none">
        <path d="M80 128C80 128 12 86 12 44C12 24 28 10 46 10C60 10 72 20 80 33C88 20 100 10 114 10C132 10 148 24 148 44C148 86 80 128 80 128Z"
          fill="none" stroke="rgba(255,45,120,0.9)" strokeWidth="2"/>
        <path d="M80 115C80 115 24 78 24 46C24 30 38 20 52 20C65 20 76 30 80 42C84 30 95 20 108 20C122 20 136 30 136 46C136 78 80 115 80 115Z"
          fill="rgba(255,45,120,0.22)"/>
        <circle cx="60" cy="54" r="4" fill="rgba(255,107,181,0.8)"/>
        <circle cx="100" cy="50" r="3" fill="rgba(255,107,181,0.6)"/>
        <circle cx="80" cy="74" r="5" fill="rgba(233,30,140,0.65)"/>
        <circle cx="50" cy="72" r="2.5" fill="rgba(255,45,120,0.5)"/>
        <circle cx="110" cy="68" r="2" fill="rgba(255,45,120,0.4)"/>
      </svg>
    </div>
  </div>
);

/* ── JARViiS Visual ── */
const JarviisVisual = () => (
  <div className="visual-inner">
    <div className="jv-grid" />
    <div className="jv-scan" />
    <div className="jv-node jv-n1" /><div className="jv-node jv-n2" />
    <div className="jv-node jv-n3" /><div className="jv-node jv-n4" />
    <div className="jv-shield">
      <svg width="180" height="195" viewBox="0 0 180 195" fill="none">
        <path d="M90 10L18 40v65c0 46 32 76 72 80 40-4 72-34 72-80V40L90 10z"
          fill="rgba(232,184,75,0.07)" stroke="rgba(232,184,75,0.7)" strokeWidth="1.5"/>
        <path d="M90 26L36 52v52c0 36 26 60 54 64 28-4 54-28 54-64V52L90 26z"
          fill="rgba(232,184,75,0.04)" stroke="rgba(232,184,75,0.3)" strokeWidth="1"/>
        {/* Brain */}
        <ellipse cx="78" cy="94" rx="19" ry="15" fill="none" stroke="rgba(232,184,75,0.8)" strokeWidth="1.3"/>
        <path d="M64 88 Q70 80 78 86 Q84 78 92 83" stroke="rgba(232,184,75,0.7)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <path d="M64 96 Q70 104 78 100 Q84 108 92 104" stroke="rgba(232,184,75,0.7)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <path d="M78 79 L78 109" stroke="rgba(232,184,75,0.3)" strokeWidth="0.8"/>
        {/* Lightning */}
        <path d="M102 78l-11 19h9l-11 22" stroke="rgba(232,184,75,0.95)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <circle cx="90" cy="94" r="29" fill="none" stroke="rgba(232,184,75,0.1)" strokeWidth="1"/>
      </svg>
    </div>
  </div>
);

/* ── SeekMITra Visual ── */
const SeekmITraVisual = () => (
  <div className="visual-inner">
    {[0,1,2,3,4,5,6,7].map(i => <div key={i} className={`sk-star sk-s${i}`} />)}
    <div className="sk-spd sk-sp1" /><div className="sk-spd sk-sp2" /><div className="sk-spd sk-sp3" />
    <div className="sk-logo">
      <svg width="170" height="170" viewBox="0 0 170 170" fill="none">
        <circle cx="85" cy="85" r="72" fill="rgba(124,58,237,0.1)" stroke="rgba(124,58,237,0.45)" strokeWidth="1.5"/>
        <circle cx="85" cy="85" r="56" fill="rgba(124,58,237,0.05)" stroke="rgba(124,58,237,0.25)" strokeWidth="1"/>
        <circle cx="85" cy="85" r="38" fill="rgba(124,58,237,0.08)" stroke="rgba(167,139,250,0.2)" strokeWidth="0.8"/>
        {/* M-shape */}
        <path d="M50 108 L50 68 L72 90 L85 72 L98 90 L120 68 L120 108"
          fill="none" stroke="rgba(167,139,250,0.95)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="85" cy="85" r="7" fill="rgba(124,58,237,0.35)" stroke="rgba(167,139,250,0.85)" strokeWidth="1.8"/>
        {/* Orbit dots */}
        <circle cx="157" cy="85" r="4" fill="rgba(196,181,253,0.65)"/>
        <circle cx="13" cy="85" r="4" fill="rgba(196,181,253,0.65)"/>
        <circle cx="85" cy="13" r="4" fill="rgba(196,181,253,0.5)"/>
        <circle cx="85" cy="157" r="4" fill="rgba(196,181,253,0.5)"/>
        <circle cx="136" cy="34" r="3" fill="rgba(167,139,250,0.4)"/>
        <circle cx="34" cy="136" r="3" fill="rgba(167,139,250,0.4)"/>
      </svg>
    </div>
  </div>
);

/* ── Products Data ── */
const products = [
  {
    id: "feelzy",
    theme: "feelzy",
    tagline: "Emotional Wellness Platform",
    name: "feelzy",
    logoLetter: "f",
    headline: "Together we rise, together we heal",
    description: "Feelzy is a digital platform that helps people handle emotions like stress, loneliness, and heartbreak — providing a safe, supportive space where users share their feelings and find community.",
    features: [
      { label: "Anonymous Support",    desc: "Share feelings privately, without judgement" },
      { label: "Empathetic Listeners", desc: "Get support from caring, trained people" },
      { label: "Safe Space",           desc: "Secure and fully confidential environment" },
    ],
    vision: "We use technology to bring people closer, support emotional well-being, and create meaningful human connections.",
    accentColor: "#ff2d78",
    badgeLabel: "Wellness",
    num: "01",
    Visual: FeelzyVisual,
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
    tagline: "AI-Powered Testing Platform",
    name: "JARViiS AI",
    logoLetter: "J",
    headline: "The Future of Intelligent Testing",
    description: "JARViiS AI automates testing for websites and applications — helping teams test faster, reduce manual work, and ship with confidence.",
    features: [
      { label: "App Testing",      desc: "Tests web, mobile, and APIs end-to-end" },
      { label: "Smart Detection",  desc: "Identifies errors and regressions automatically" },
      { label: "Test Automation",  desc: "Creates and manages test cases using AI" },
      { label: "Quality Insights", desc: "Actionable reports to improve performance" },
    ],
    vision: "JARViiS AI helps teams release software faster with better quality — reducing testing time, improving accuracy, and ensuring smooth, reliable deployments.",
    accentColor: "#e8b84b",
    badgeLabel: "AI Testing",
    num: "02",
    Visual: JarviisVisual,
    contact: null,
  },
  {
    id: "seekmitra",
    theme: "seekmitra",
    tagline: "Mobility & Storytelling Platform",
    name: "SeekMITra",
    logoLetter: "S",
    headline: "Every Journey Tells a Story",
    description: "SeekMITra captures real-life stories from everyday travel experiences — turning simple journeys into meaningful narratives by connecting people and their moments.",
    features: [
      { label: "Backseat Stories",     desc: "Capture real conversations and experiences during rides" },
      { label: "Community Connection", desc: "Connect people, cities, and cultures" },
      { label: "Real Experiences",     desc: "Share authentic, human-centered stories" },
    ],
    vision: "We believe travel is not just about reaching a destination, but about human connection. SeekMITra uses technology to capture and share these moments.",
    accentColor: "#a78bfa",
    badgeLabel: "Storytelling",
    num: "03",
    Visual: SeekmITraVisual,
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
          Real solutions, real impact — a selection of products we have designed,
          developed, and launched for our partners.
        </p>
      </div>

      {/* Product Cards */}
      <div className="prd-list">
        {products.map((p, idx) => {
          const { Visual } = p;
          const isFlip = idx % 2 === 1;
          return (
            <article
              key={p.id}
              className={`prd-card prd-card--${p.theme}${isFlip ? " prd-card--flip" : ""}`}
            >
              {/* Visual Panel */}
              <div className="prd-card__visual">
                <Visual />
                <span className="prd-card__badge">{p.badgeLabel}</span>
                <span className="prd-card__number">{p.num}</span>
              </div>

              {/* Content Panel */}
              <div className="prd-card__content">
                <div className="prd-card__top-accent" />

                {/* Logo + Name */}
                <div className="prd-card__top">
                  <div className="prd-card__logo-box">
                    <span className="prd-card__logo-letter">{p.logoLetter}</span>
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
