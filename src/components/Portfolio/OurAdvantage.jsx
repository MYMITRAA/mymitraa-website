import { motion } from "framer-motion";
import "./OurAdvantage.css";
import { useLang } from "../../Context/LanguageContext";

/* ── Translations ───────────────────────────────────────────────── */
const TEXT = {
  en: {
    cards: [
      {
        num: "01", title: "Elite Talent",
        desc: "Proven experts embedded into your team — not just resumes passed through a filter.",
        metric: "92%", metricLabel: "Retention rate", tag: "People-first", align: "left",
      },
      {
        num: "02", title: "Rapid Onboarding",
        desc: "From signed contract to first delivery in under 2 weeks. Days, not months.",
        metric: "<2w", metricLabel: "Time to delivery", tag: "Fast start", align: "right",
      },
      {
        num: "03", title: "Flexible Scale",
        desc: "Ramp teams up or down instantly based on project demand — zero friction.",
        metric: "+65%", metricLabel: "Productivity boost", tag: "Zero friction", align: "left",
      },
      {
        num: "04", title: "Full Ownership",
        desc: "You control delivery and direction. We ensure continuity, quality, and accountability.",
        metric: "99.98%", metricLabel: "Uptime guaranteed", tag: "Accountability", align: "right",
      },
    ],
  },
  ar: {
    cards: [
      {
        num: "01", title: "كفاءات متميزة",
        desc: "خبراء مثبتون مندمجون في فريقك — وليس مجرد سير ذاتية تمر عبر مرشح.",
        metric: "92%", metricLabel: "معدل الاحتفاظ", tag: "الناس أولاً", align: "left",
      },
      {
        num: "02", title: "إعداد سريع",
        desc: "من توقيع العقد إلى أول تسليم في أقل من أسبوعين. أيام لا أشهر.",
        metric: "<2أ", metricLabel: "وقت التسليم", tag: "بداية سريعة", align: "right",
      },
      {
        num: "03", title: "توسع مرن",
        desc: "زد أو قلل الفرق فوراً بناءً على متطلبات المشروع — بدون أي عوائق.",
        metric: "+65%", metricLabel: "تحسن الإنتاجية", tag: "بلا عوائق", align: "left",
      },
      {
        num: "04", title: "ملكية كاملة",
        desc: "أنت تتحكم في التسليم والتوجه. نحن نضمن الاستمرارية والجودة والمساءلة.",
        metric: "99.98%", metricLabel: "وقت تشغيل مضمون", tag: "المساءلة", align: "right",
      },
    ],
  },
};

const getText = (lang) => TEXT[lang] ?? TEXT["en"];

/* ── Icons — static, language-independent ───────────────────────── */
const ICONS = [
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="#5a6af8" strokeWidth="1.8"
         strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="#5a6af8" strokeWidth="1.8"
         strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 7v5l3 3"/>
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="#5a6af8" strokeWidth="1.8"
         strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="14" width="4" height="7" rx="1"/>
      <rect x="10" y="9" width="4" height="12" rx="1"/>
      <rect x="17" y="4" width="4" height="17" rx="1"/>
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="#5a6af8" strokeWidth="1.8"
         strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l7 4v6c0 5-3.5 9-7 10C8.5 21 5 17 5 12V6l7-4z"/>
      <path d="M9 12l2 2 4-4"/>
    </svg>
  ),
];

/* ── Individual animated card ───────────────────────────── */
function AdvCard({ card, icon }) {
  return (
    <div className={`adv__card-wrap adv__card-wrap--${card.align}`}>
      <motion.div
        className="adv__card"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -80 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: false, margin: "-30% 0px -30% 0px" }}
      >
        <div className="adv__card-header">
          <span className="adv__card-num">{card.num}</span>
          <span className="adv__card-tag">{card.tag}</span>
        </div>

        <div className="adv__card-icon">{icon}</div>

        <h3 className="adv__card-title">{card.title}</h3>
        <p  className="adv__card-desc">{card.desc}</p>

        <div className="adv__card-foot">
          <span className="adv__card-metric">{card.metric}</span>
          <span className="adv__card-metric-lbl">{card.metricLabel}</span>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Main component ─────────────────────────────────────── */
export default function OurAdvantage() {
  const { lang } = useLang();
  const t        = getText(lang);

  return (
    <section className="adv">
      <div className="adv__cards-viewport">
        {t.cards.map((card, i) => (
          <AdvCard key={i} card={card} icon={ICONS[i]} />
        ))}
      </div>
    </section>
  );
}
