import "./Products.css";
import { useLang } from "../../Context/LanguageContext";

import feelzyImg     from "../../assets/images/feelzyimage.webp";
import jarviisImg    from "../../assets/images/jarviisimage.webp";
import seekmitraImg  from "../../assets/images/seekmitraimage3.webp";
import seekmitralogo from "../../assets/logo/transparent_logo_seekmitra.png";
import jarviislogo   from "../../assets/logo/jarviis_logo_transparent_hd.png";
import feelzylogo    from "../../assets/logo/feezly_logo_hd.png";

/* ── Social Icons — unchanged ── */
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
const CheckIcon = ({ color }) => (
  <svg viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="9" stroke={color} strokeWidth="1.5" opacity="0.4"/>
    <path d="M6.5 10l2.5 2.5 4.5-5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ── Static product meta (images, colors, ids) — language-independent ── */
const PRODUCT_META = [
  {
    id: "feelzy", theme: "feelzy", accentColor: "#ff2d78",
    badgeKey: "badge", num: "01",
    logoSrc: feelzylogo, productImage: feelzyImg,
    contact: {
      website:   "https://www.feelzy.in",
      email:     "support@feelzy.in",
      instagram: "https://www.instagram.com/feelzyapp",
      linkedin:  "https://www.linkedin.com/company/feelzyapp/",
    },
  },
  {
    id: "jarviis", theme: "jarviis", accentColor: "#e8b84b",
    badgeKey: "badge", num: "02",
    logoSrc: jarviislogo, productImage: jarviisImg,
    contact: null,
  },
  {
    id: "seekmitra", theme: "seekmitra", accentColor: "#a78bfa",
    badgeKey: "badge", num: "03",
    logoSrc: seekmitralogo, productImage: seekmitraImg,
    contact: null,
  },
];

/* ── Translations ───────────────────────────────────────────────── */
const TEXT = {
  en: {
    sectionLabel: "Featured Work",
    title1:       "Products We've",
    title2:       "Built",
    headerSub:    "Real solutions, real impact — a selection of products we have designed, developed, and launched for our partners.",
    visionLabel:  "Our Vision",
    connectLabel: "Connect with",
    visitLabel:   "Visit feelzy.in",
    instagram:    "Instagram",
    linkedin:     "LinkedIn",
    products: [
      {
        tagline: "Emotional Wellness Platform",
        name: "feelzy",
        badge: "Wellness",
        headline: "Together we rise, together we heal",
        description: "Feelzy is a digital platform that helps people handle emotions like stress, loneliness, and heartbreak — providing a safe, supportive space where users share their feelings and find community.",
        features: [
          { label: "Anonymous Support",    desc: "Share feelings privately, without judgement" },
          { label: "Empathetic Listeners", desc: "Get support from caring, trained people" },
          { label: "Safe Space",           desc: "Secure and fully confidential environment" },
        ],
        vision: "We use technology to bring people closer, support emotional well being, and create meaningful human connections.",
      },
      {
        tagline: "AI Powered Testing Platform",
        name: "JARViiS AI",
        badge: "AI Testing",
        headline: "The Future of Intelligent Testing",
        description: "JARViiS AI automates testing for websites and applications helping teams test faster, reduce manual work, and ship with confidence.",
        features: [
          { label: "App Testing",      desc: "Tests web, mobile, and APIs end-to-end" },
          { label: "Smart Detection",  desc: "Identifies errors and regressions automatically" },
          { label: "Test Automation",  desc: "Creates and manages test cases using AI" },
          { label: "Quality Insights", desc: "Actionable reports to improve performance" },
        ],
        vision: "JARViiS AI helps teams release software faster with better quality reducing testing time, improving accuracy, and ensuring smooth, reliable deployments.",
      },
      {
        tagline: "Mobility & Storytelling Platform",
        name: "SeekMITra",
        badge: "Storytelling",
        headline: "Every Journey Tells a Story",
        description: "SeekMITra captures real life stories from everyday travel experiences turning simple journeys into meaningful narratives by connecting people and their moments.",
        features: [
          { label: "Backseat Stories",     desc: "Capture real conversations and experiences during rides" },
          { label: "Community Connection", desc: "Connect people, cities, and cultures" },
          { label: "Real Experiences",     desc: "Share authentic, human-centered stories" },
        ],
        vision: "We believe travel is not just about reaching a destination, but about human connection. SeekMITra uses technology to capture and share these moments.",
      },
    ],
  },
  ar: {
    sectionLabel: "أبرز أعمالنا",
    title1:       "منتجات",
    title2:       "بنيناها",
    headerSub:    "حلول حقيقية، تأثير حقيقي — مجموعة مختارة من المنتجات التي صممناها وطورناها وأطلقناها لشركائنا.",
    visionLabel:  "رؤيتنا",
    connectLabel: "تواصل مع",
    visitLabel:   "زيارة feelzy.in",
    instagram:    "إنستغرام",
    linkedin:     "لينكد إن",
    products: [
      {
        tagline: "منصة العافية العاطفية",
        name: "feelzy",
        badge: "العافية",
        headline: "معاً ننهض، معاً نتعافى",
        description: "فيلزي منصة رقمية تساعد الناس على التعامل مع المشاعر كالتوتر والوحدة وآلام القلب — توفر مساحة آمنة وداعمة يشارك فيها المستخدمون مشاعرهم ويجدون مجتمعاً.",
        features: [
          { label: "دعم مجهول الهوية",   desc: "شارك مشاعرك بخصوصية ودون حكم" },
          { label: "مستمعون متعاطفون",   desc: "احصل على دعم من أشخاص مدربين ومهتمين" },
          { label: "مساحة آمنة",          desc: "بيئة آمنة وسرية تماماً" },
        ],
        vision: "نستخدم التكنولوجيا لتقريب الناس من بعضهم، ودعم الصحة العاطفية، وخلق روابط إنسانية حقيقية.",
      },
      {
        tagline: "منصة الاختبار المدعومة بالذكاء الاصطناعي",
        name: "JARViiS AI",
        badge: "اختبار ذكي",
        headline: "مستقبل الاختبار الذكي",
        description: "جارفيس AI يؤتمت اختبار المواقع والتطبيقات — يساعد الفرق على الاختبار بسرعة أكبر وتقليل العمل اليدوي والإطلاق بثقة.",
        features: [
          { label: "اختبار التطبيقات",   desc: "يختبر الويب والموبايل وواجهات API بشكل شامل" },
          { label: "كشف ذكي",            desc: "يحدد الأخطاء والانحدارات تلقائياً" },
          { label: "أتمتة الاختبارات",   desc: "ينشئ حالات الاختبار ويديرها باستخدام الذكاء الاصطناعي" },
          { label: "رؤى الجودة",         desc: "تقارير قابلة للتنفيذ لتحسين الأداء" },
        ],
        vision: "يساعد جارفيس AI الفرق على إطلاق البرامج بشكل أسرع وبجودة أفضل — تقليل وقت الاختبار وتحسين الدقة وضمان نشر سلس وموثوق.",
      },
      {
        tagline: "منصة التنقل ورواية القصص",
        name: "SeekMITra",
        badge: "رواية القصص",
        headline: "كل رحلة تحكي قصة",
        description: "سيك ميترا يلتقط قصصاً حقيقية من تجارب السفر اليومية — يحوّل الرحلات البسيطة إلى روايات ذات معنى بربط الناس بلحظاتهم.",
        features: [
          { label: "قصص المقعد الخلفي",  desc: "التقط محادثات وتجارب حقيقية أثناء الرحلات" },
          { label: "ربط المجتمع",         desc: "اربط الناس والمدن والثقافات" },
          { label: "تجارب حقيقية",        desc: "شارك قصصاً أصيلة تتمحور حول الإنسان" },
        ],
        vision: "نؤمن بأن السفر ليس مجرد الوصول إلى وجهة، بل هو تواصل إنساني. سيك ميترا يستخدم التكنولوجيا لالتقاط هذه اللحظات ومشاركتها.",
      },
    ],
  },
};

const getText = (lang) => TEXT[lang] ?? TEXT["en"];

/* ── Component ──────────────────────────────────────────────────── */
function Products() {
  const { lang } = useLang();
  const t        = getText(lang);

  const products = PRODUCT_META.map((meta, i) => ({
    ...meta,
    ...t.products[i],
  }));

  return (
    <section className="prd-section" id="products">

      {/* Section Header */}
      <div className="prd-header">
        <div className="prd-header__left">
          <span className="prd-header__label">{t.sectionLabel}</span>
          <h2 className="prd-header__title">{t.title1} <em>{t.title2}</em></h2>
        </div>
        <p className="prd-header__sub">{t.headerSub}</p>
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
                <span className="prd-card__badge">{p.badge}</span>
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
                  <span className="prd-card__vision-label">{t.visionLabel}</span>
                  <p className="prd-card__vision-text">{p.vision}</p>
                </div>

                {/* Contact — Feelzy only */}
                {p.contact && (
                  <div className="prd-card__contact">
                    <span className="prd-card__contact-label">{t.connectLabel} {p.name}</span>
                    <div className="prd-card__contact-grid">
                      <a href={p.contact.website} target="_blank" rel="noreferrer"
                         className="prd-card__social prd-card__social--website">
                        <GlobeIcon />
                        <span>{t.visitLabel}</span>
                      </a>
                      <a href={`mailto:${p.contact.email}`} className="prd-card__social">
                        <EmailIcon />
                        <span>{p.contact.email}</span>
                      </a>
                      <a href={p.contact.instagram} target="_blank" rel="noreferrer" className="prd-card__social">
                        <IGIcon />
                        <span>{t.instagram}</span>
                      </a>
                      <a href={p.contact.linkedin} target="_blank" rel="noreferrer" className="prd-card__social">
                        <LIIcon />
                        <span>{t.linkedin}</span>
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
