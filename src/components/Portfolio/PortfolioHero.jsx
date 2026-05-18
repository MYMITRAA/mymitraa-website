import "./Hero.css";
import { useLang } from "../../context/LanguageContext";

/* ─── Translations ───────────────────────────────────────────────── */
const TEXT = {
  en: {
    eyebrow:      "Scale Faster. Operate Smarter.",
    title1:       "Our",
    title2:       "Portfolio",
    desc:         "We deliver the right talent on demand helping you scale teams fast without hiring delays, overhead, or risk. Not just resources, but capability, accountability, and measurable outcomes.",
    cta:          "Explore Our Work",
    cta_ghost:    "Get in Touch →",
    stat1_num:    "200",
    stat1_suffix: "+",
    stat1_label:  "Experts Deployed",
    stat2_num:    "48",
    stat2_suffix: "h",
    stat2_label:  "Average Onboarding",
    stat3_num:    "98",
    stat3_suffix: "%",
    stat3_label:  "Client Retention Rate",
    scroll:       "Scroll",
  },
  ar: {
    eyebrow:      "توسّع أسرع. أدر بذكاء.",
    title1:       "محفظة",
    title2:       "أعمالنا",
    desc:         "نوفر الكفاءات المناسبة عند الطلب، مما يساعدك على توسيع الفرق بسرعة دون تأخير في التوظيف أو تكاليف إضافية أو مخاطر. ليس مجرد موارد، بل قدرات ومساءلة ونتائج قابلة للقياس.",
    cta:          "استكشف أعمالنا",
    cta_ghost:    "تواصل معنا →",
    stat1_num:    "200",
    stat1_suffix: "+",
    stat1_label:  "خبير تم نشره",
    stat2_num:    "48",
    stat2_suffix: "س",
    stat2_label:  "متوسط وقت الإعداد",
    stat3_num:    "98",
    stat3_suffix: "%",
    stat3_label:  "معدل الاحتفاظ بالعملاء",
    scroll:       "مرر",
  },
};

const getText = (lang) => TEXT[lang] ?? TEXT["en"];

/* ─── Component ──────────────────────────────────────────────────── */
function PortfolioHero() {
  const { lang } = useLang();
  const t        = getText(lang);

  return (
    <section className="pf-hero">
      <div className="pf-hero__rule" />

      <div className="pf-hero__content">

        {/* ── Left: Text ── */}
        <div className="pf-hero__left">
          <span className="pf-hero__eyebrow">
            {t.eyebrow}
          </span>

          <h1 className="pf-hero__title">
            {t.title1}
            <em>{t.title2}</em>
          </h1>

          <p className="pf-hero__desc">
            {t.desc}
          </p>

          <div className="pf-hero__cta-group">
            <a href="#products" className="pf-hero__cta">
              {t.cta}
              <span className="pf-hero__cta-arrow">→</span>
            </a>
            <a href="/contact" className="pf-hero__cta-ghost">
              {t.cta_ghost}
            </a>
          </div>
        </div>

        {/* ── Right: Stat Cards ── */}
        <div className="pf-hero__right">
          <div className="pf-hero__stat-card">
            <div className="pf-hero__stat-num">{t.stat1_num}<span>{t.stat1_suffix}</span></div>
            <div className="pf-hero__stat-label">{t.stat1_label}</div>
          </div>

          <div className="pf-hero__stat-connector" />

          <div className="pf-hero__stat-card">
            <div className="pf-hero__stat-num">{t.stat2_num}<span>{t.stat2_suffix}</span></div>
            <div className="pf-hero__stat-label">{t.stat2_label}</div>
          </div>

          <div className="pf-hero__stat-connector" />

          <div className="pf-hero__stat-card">
            <div className="pf-hero__stat-num">{t.stat3_num}<span>{t.stat3_suffix}</span></div>
            <div className="pf-hero__stat-label">{t.stat3_label}</div>
          </div>
        </div>

      </div>

      {/* ── Scroll indicator ── */}
      <div className="pf-hero__scroll">
        <span className="pf-hero__scroll-line" />
        {t.scroll}
      </div>

    </section>
  );
}

export default PortfolioHero;