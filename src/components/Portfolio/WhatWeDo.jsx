import "./WhatWeDo.css";
import CardSlider from "./CardSlider";
import { useLang } from "../../Context/LanguageContext";

/* ─── Translations ───────────────────────────────────────────────── */
const TEXT = {
  en: {
    eyebrow:      "What We Do",
    title1:       "Expert Teams,",
    title2:       "On Demand",
    desc:         "We extend your teams with pre-vetted, industry ready experts across engineering, product, data, cloud, AI, and operations without the hiring overhead.",
    stat1_num:    "200+",
    stat1_label:  "Experts Deployed",
    stat2_num:    "48h",
    stat2_label:  "Avg. Onboarding",
    stat3_num:    "98%",
    stat3_label:  "Client Retention",
  },
  ar: {
    eyebrow:      "ما نقدمه",
    title1:       "فرق من الخبراء،",
    title2:       "عند الطلب",
    desc:         "نوسّع فرقك بخبراء مدققين ومستعدين للصناعة في الهندسة والمنتج والبيانات والسحابة والذكاء الاصطناعي والعمليات — دون أعباء التوظيف.",
    stat1_num:    "+200",
    stat1_label:  "خبير تم نشره",
    stat2_num:    "48س",
    stat2_label:  "متوسط الإعداد",
    stat3_num:    "98%",
    stat3_label:  "الاحتفاظ بالعملاء",
  },
};

const getText = (lang) => TEXT[lang] ?? TEXT["en"];

/* ─── Component ──────────────────────────────────────────────────── */
function WhatWeDo() {
  const { lang } = useLang();
  const t        = getText(lang);

  return (
    <section className="pf-wwd">
      <div className="pf-wwd__container">

        <div className="pf-wwd__text">
          <span className="pf-wwd__eyebrow">{t.eyebrow}</span>
          <h2 className="pf-wwd__title">
            {t.title1}<br /><em>{t.title2}</em>
          </h2>
          <p className="pf-wwd__desc">
            {t.desc}
          </p>
          <div className="pf-wwd__stats">
            <div className="pf-wwd__stat">
              <span className="pf-wwd__stat-num">{t.stat1_num}</span>
              <span className="pf-wwd__stat-label">{t.stat1_label}</span>
            </div>
            <div className="pf-wwd__stat">
              <span className="pf-wwd__stat-num">{t.stat2_num}</span>
              <span className="pf-wwd__stat-label">{t.stat2_label}</span>
            </div>
            <div className="pf-wwd__stat">
              <span className="pf-wwd__stat-num">{t.stat3_num}</span>
              <span className="pf-wwd__stat-label">{t.stat3_label}</span>
            </div>
          </div>
        </div>

        <CardSlider />

      </div>
    </section>
  );
}

export default WhatWeDo;
