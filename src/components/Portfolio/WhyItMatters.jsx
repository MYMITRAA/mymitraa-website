import "./WhyItMatters.css";
import { useLang } from "../../context/LanguageContext";

import TalentIcon from "../../assets/images/portfolio1.webp";
import HiringIcon from "../../assets/images/portfolio2.webp";
import MarketIcon from "../../assets/images/portfolio4.webp";
import TeamsIcon  from "../../assets/images/portfolio4.webp";

const ICONS = [TalentIcon, HiringIcon, MarketIcon, TeamsIcon];

/* ─── Translations ───────────────────────────────────────────────── */
const TEXT = {
  en: {
    sectionLabel: "Why It Matters",
    title1:       "We solve all four,",
    title2:       "at enterprise scale.",
    subtitle:     "The four forces reshaping how modern businesses build teams today.",
    items: [
      "Talent shortages",
      "Rising hiring costs",
      "Faster go-to-market pressure",
      "Need for flexible, scalable teams",
    ],
  },
  ar: {
    sectionLabel: "لماذا يهم هذا",
    title1:       "نحل الأربعة،",
    title2:       "على نطاق مؤسسي.",
    subtitle:     "القوى الأربع التي تعيد تشكيل طريقة بناء الفرق في الشركات الحديثة اليوم.",
    items: [
      "نقص الكفاءات",
      "ارتفاع تكاليف التوظيف",
      "ضغوط الوصول السريع للسوق",
      "الحاجة إلى فرق مرنة وقابلة للتوسع",
    ],
  },
};

const getText = (lang) => TEXT[lang] ?? TEXT["en"];

/* ─── Component ──────────────────────────────────────────────────── */
function WhyItMatters() {
  const { lang } = useLang();
  const t        = getText(lang);

  const items = t.items.map((label, i) => ({ label, icon: ICONS[i] }));

  return (
    <section className="portfolio__why">
      <div className="portfolio__why-container">
        <div className="portfolio__why-header">
          <div>
            <span className="section-label">{t.sectionLabel}</span>
            <h2 className="portfolio__why-title">
              {t.title1}<br />{t.title2}
            </h2>
          </div>
          <p className="portfolio__why-subtitle">
            {t.subtitle}
          </p>
        </div>
        <div className="portfolio__why-grid">
          {items.map((item, i) => (
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
  );
}

export default WhyItMatters;