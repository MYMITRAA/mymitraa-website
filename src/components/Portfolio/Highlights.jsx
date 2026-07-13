import "./Highlights.css";
import { useLang } from "../../Context/LanguageContext";

import highlight1 from "../../assets/images/phighlight1.webp";
import highlight2 from "../../assets/images/phighlight2.webp";
import highlight3 from "../../assets/images/phighlight3.webp";
import highlight4 from "../../assets/images/phighlight4.webp";

const IMAGES = [highlight1, highlight2, highlight3, highlight4];

/* ─── Translations ───────────────────────────────────────────────── */
const TEXT = {
  en: {
    sectionLabel: "Portfolio Highlights",
    title1:       "Industries",
    title2:       "We've Shaped",
    desc:         "A snapshot of the domains and industries where we've delivered measurable, lasting impact for our partners.",
    quote:        '"Positioned as a strategic partner, not just a vendor — we become an extension of your team."',
    highlights: [
      "Enterprise SaaS platforms",
      "AI-powered automation tools",
      "Fintech applications",
      "E-commerce projects",
    ],
  },
  ar: {
    sectionLabel: "أبرز أعمالنا",
    title1:       "القطاعات",
    title2:       "التي شكّلناها",
    desc:         "لمحة عن المجالات والصناعات التي حققنا فيها تأثيراً ملموساً ودائماً لشركائنا.",
    quote:        '"نضع أنفسنا كشريك استراتيجي، لا مجرد مورد — نحن امتداد حقيقي لفريقك."',
    highlights: [
      "منصات SaaS المؤسسية",
      "أدوات الأتمتة المدعومة بالذكاء الاصطناعي",
      "تطبيقات التكنولوجيا المالية",
      "مشاريع التجارة الإلكترونية",
    ],
  },
};

const getText = (lang) => TEXT[lang] ?? TEXT["en"];

/* ─── Component ──────────────────────────────────────────────────── */
function Highlights() {
  const { lang } = useLang();
  const t        = getText(lang);

  const highlights = t.highlights.map((label, i) => ({
    img: IMAGES[i],
    label,
  }));

  return (
    <section className="portfolio__highlights">
      <div className="portfolio__highlights-container">
        <div className="portfolio__highlights-header">
          <div>
            <span className="section-label">{t.sectionLabel}</span>
            <h2 className="portfolio__highlights-title">
              {t.title1}<br />{t.title2}
            </h2>
          </div>
          <p className="portfolio__highlights-desc">
            {t.desc}
          </p>
        </div>
        <div className="portfolio__highlights-grid">
          {highlights.map((item, i) => (
            <div key={i} className="portfolio__highlight-card">
              <div className="portfolio__highlight-img-wrap">
                <img
                  src={item.img}
                  alt={item.label}
                  className="portfolio__highlight-img"
                />
              </div>
              <p className="portfolio__highlight-label">{item.label}</p>
            </div>
          ))}
        </div>
        <p className="portfolio__positioning">
          {t.quote}
        </p>
      </div>
    </section>
  );
}

export default Highlights;
