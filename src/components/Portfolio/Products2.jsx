import "./Products.css";

import FeelzyLogo    from "../../assets/images/feezlylogo2.png";
import JarviisLogo   from "../../assets/images/portfolio1.webp";
import SeekmitraLogo from "../../assets/images/portfolio1.webp";

import FeelzyImg    from "../../assets/images/feezlyimage.png";
import JarviisImg   from "../../assets/images/portfolio1.webp";
import SeekmitraImg from "../../assets/images/seekmitraimage.png";

/* ── Social Icons ── */
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

/* ── Products Data ── */
const products = [
  {
    id:          "feelzy",
    logo:        FeelzyLogo,
    image:       FeelzyImg,
    theme:       "feelzy",
    tagline:     "Emotional Wellness Platform",
    name:        "feelzy",
    headline:    "Together we rise, together we heal",
    description: "Feelzy is a digital platform that helps people handle emotions like stress, loneliness, and heartbreak — providing a safe, supportive space where users share their feelings and find community.",
    features: [
      { label: "Anonymous Support",    desc: "Share feelings privately, without judgement"  },
      { label: "Empathetic Listeners", desc: "Get support from caring, trained people"       },
      { label: "Safe Space",           desc: "Secure and fully confidential environment"     },
    ],
    vision: "We use technology to bring people closer, support emotional well‑being, and create meaningful human connections.",
    contact: {
      email:     "support@feelzy.in",
      facebook:  "https://www.facebook.com",
      instagram: "https://www.instagram.com/feelzyapp",
      linkedin:  "https://www.linkedin.com/company/feelzyapp/",
    },
  },
  {
    id:          "jarviis",
    logo:        JarviisLogo,
    image:       JarviisImg,
    theme:       "jarviis",
    tagline:     "AI-Powered Testing Platform",
    name:        "JARViiS AI",
    headline:    "The Future of Intelligent Testing",
    description: "JARViiS AI automates testing for websites and applications — helping teams test faster, reduce manual work, and ship with confidence.",
    features: [
      { label: "App Testing",      desc: "Tests web, mobile, and APIs end-to-end"          },
      { label: "Smart Detection",  desc: "Identifies errors and regressions automatically"  },
      { label: "Test Automation",  desc: "Creates and manages test cases using AI"          },
      { label: "Quality Insights", desc: "Actionable reports to improve performance"        },
    ],
    vision: "JARViiS AI helps teams release software faster with better quality — reducing testing time, improving accuracy, and ensuring smooth, reliable deployments.",
    contact: null,
  },
  {
    id:          "seekmitra",
    logo:        SeekmitraLogo,
    image:       SeekmitraImg,
    theme:       "seekmitra",
    tagline:     "Mobility & Storytelling Platform",
    name:        "SeekMITra",
    headline:    "Every Journey Tells a Story",
    description: "SeekMITra captures real‑life stories from everyday travel experiences — turning simple journeys into meaningful narratives by connecting people and their moments.",
    features: [
      { label: "Backseat Stories",     desc: "Capture real conversations and experiences during rides" },
      { label: "Community Connection", desc: "Connect people, cities, and cultures"                    },
      { label: "Real Experiences",     desc: "Share authentic, human-centered stories"                 },
    ],
    vision: "We believe travel is not just about reaching a destination, but about human connection. SeekMITra uses technology to capture and share these moments.",
    contact: null,
  },
];

/* ── Feature check icon ── */
const CheckIcon = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="9" strokeWidth="1.5" stroke="currentColor" opacity="0.3"/>
    <path d="M6.5 10l2.5 2.5 4.5-5" strokeWidth="1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function Products() {
  return (
    <section className="prd-section" id="products">

      {/* ── Section header ── */}
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

      {/* ── Product cards ── */}
      <div className="prd-list">
        {products.map((p, idx) => (
          <article key={p.id} className={`prd-card prd-card--${p.theme} ${idx % 2 === 1 ? "prd-card--flip" : ""}`}>

            {/* Visual panel */}
            <div className="prd-card__visual">
              <div className="prd-card__img-wrap">
                <img
                  src={p.image}
                  alt={p.name}
                  className="prd-card__img"
                  onError={e => { e.target.style.display = "none"; }}
                />
                <div className="prd-card__img-overlay" />
              </div>
              <div className="prd-card__badge">{p.tagline.split(" ")[0]}</div>
              <div className="prd-card__number">0{idx + 1}</div>
            </div>

            {/* Content panel */}
            <div className="prd-card__content">

              {/* Top: logo + name */}
              <div className="prd-card__top">
                <div className="prd-card__logo-box">
                  <img
                    src={p.logo}
                    alt={`${p.name} logo`}
                    className="prd-card__logo"
                    onError={e => { e.target.style.display = "none"; }}
                  />
                  <span className="prd-card__logo-fb">{p.name[0]}</span>
                </div>
                <div className="prd-card__identity">
                  <span className="prd-card__tagline">{p.tagline}</span>
                  <h3 className="prd-card__name">{p.name}</h3>
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
                    <span className="prd-card__feature-icon"><CheckIcon /></span>
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

              {/* Contact (Feelzy only) */}
              {p.contact && (
                <div className="prd-card__contact">
                  <p className="prd-card__contact-label">Connect with {p.name}</p>
                  <div className="prd-card__contact-grid">
                    <a href={`mailto:${p.contact.email}`} className="prd-card__social">
                      <EmailIcon /><span>{p.contact.email}</span>
                    </a>
                    <a href={p.contact.facebook}  target="_blank" rel="noreferrer" className="prd-card__social">
                      <FBIcon /><span>Facebook</span>
                    </a>
                    <a href={p.contact.instagram} target="_blank" rel="noreferrer" className="prd-card__social">
                      <IGIcon /><span>Instagram</span>
                    </a>
                    <a href={p.contact.linkedin}  target="_blank" rel="noreferrer" className="prd-card__social">
                      <LIIcon /><span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              )}

            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Products;
