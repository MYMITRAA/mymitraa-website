import { useState } from "react";
import "./Execution.css";
import { useLang } from "../../Context/LanguageContext";

import about1 from "../../assets/images/about1.webp";
import about2 from "../../assets/images/about22.webp";
import about3 from "../../assets/images/about33.webp";
import about4 from "../../assets/images/about44.webp";

/* ─── Translations ───────────────────────────────────────────────── */
const EXECUTION_TEXT = {
  en: {
    title1:  "Execution is our",
    span1:   "Culture",
    title2:  ", Every decision ends in",
    span2:   "Delivery",
    footer:  "MiTRA is where thoughtful engineering meets meaningful impact.",
    items: [
      {
        title:   "Why We Exist",
        content: "We exist to simplify complexity. Businesses are surrounded by tools, data, and systems, yet clarity is often missing. Our purpose is to create intelligent systems that quietly support decisions, reduce pressure on teams, and make growth feel manageable instead of overwhelming.",
      },
      {
        title:   "Our Mindset",
        content: "We believe clarity beats complexity. Our mindset is rooted in precision, responsibility, and building systems that truly serve people.",
      },
      {
        title:   "Our Values in Action",
        content: "We value transparency, accountability, and long-term impact. Every solution we design is built to create measurable results.",
      },
      {
        title:   "Our Role in Your Journey",
        content: "We partner with you to simplify operations, strengthen decisions, and ensure technology works quietly behind your success.",
      },
    ],
  },
  ar: {
    title1:  "التنفيذ هو",
    span1:   "ثقافتنا",
    title2:  "، وكل قرار ينتهي بـ",
    span2:   "التسليم",
    footer:  "ميترا هو المكان الذي يلتقي فيه الهندسة المدروسة بالتأثير الحقيقي.",
    items: [
      {
        title:   "لماذا نحن موجودون",
        content: "نحن موجودون لتبسيط التعقيد. الشركات محاطة بالأدوات والبيانات والأنظمة، لكن الوضوح غالباً ما يكون غائباً. هدفنا هو إنشاء أنظمة ذكية تدعم القرارات بهدوء، وتُخفف الضغط عن الفرق، وتجعل النمو أمراً قابلاً للإدارة بدلاً من أن يكون ساحقاً.",
      },
      {
        title:   "عقليتنا",
        content: "نؤمن بأن الوضوح يتغلب على التعقيد. عقليتنا متجذرة في الدقة والمسؤولية وبناء أنظمة تخدم الناس حقاً.",
      },
      {
        title:   "قيمنا في العمل",
        content: "نقدّر الشفافية والمساءلة والتأثير طويل الأمد. كل حل نصممه مبني لتحقيق نتائج قابلة للقياس.",
      },
      {
        title:   "دورنا في رحلتك",
        content: "نتشارك معك لتبسيط العمليات، وتعزيز القرارات، وضمان أن تعمل التكنولوجيا بهدوء خلف نجاحك.",
      },
    ],
  },
};

const getText = (lang) => EXECUTION_TEXT[lang] ?? EXECUTION_TEXT["en"];

/* ─── Component ──────────────────────────────────────────────────── */
const images = [about1, about2, about3, about4];

function Execution() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex,   setPrevIndex]   = useState(null);
  const [animating,   setAnimating]   = useState(false);

  const { lang } = useLang();
  const t = getText(lang);
  const items = t.items.map((item, i) => ({ ...item, image: images[i] }));

  const toggleItem = (index) => {
    if (index === activeIndex || animating) return;
    setAnimating(true);
    setPrevIndex(activeIndex);
    setActiveIndex(index);
    setTimeout(() => {
      setPrevIndex(null);
      setAnimating(false);
    }, 420);
  };

  return (
    <section className="execution">
      <div className="execution-container">

        <h2 className="execution-title">
          {t.title1} <span>{t.span1}</span>{t.title2} <span>{t.span2}</span>
        </h2>

        {/* ── Mobile Image Panel ── */}
        <div className="execution-image-mobile">
          <div className="execution-image-box">
            <div className="exec-bg-pulse" />
            <div className="exec-particle exec-p1" />
            <div className="exec-particle exec-p2" />
            <div className="exec-particle exec-p3" />
            {items.map((item, index) => (
              <img
                key={index}
                src={item.image}
                alt={item.title}
                className={`exec-img
                  ${activeIndex === index ? "exec-img--active" : ""}
                  ${prevIndex  === index ? "exec-img--exit"   : ""}
                `}
              />
            ))}
          </div>
        </div>

        <div className="execution-content">

          {/* ── Left: Accordion ── */}
          <div className="execution-left">
            {items.map((item, index) => (
              <div
                key={index}
                className={`execution-item ${activeIndex === index ? "active" : ""}`}
              >
                <div className="execution-header">
                  <h3 onClick={() => toggleItem(index)}>{item.title}</h3>
                  <button
                    type="button"
                    className={`chevron ${activeIndex === index ? "rotate" : ""}`}
                    onClick={() => toggleItem(index)}
                    aria-label={activeIndex === index ? "Collapse" : "Expand"}
                    aria-expanded={activeIndex === index}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                <div className={`execution-answer ${activeIndex === index ? "show" : ""}`}>
                  <p>{item.content}</p>
                </div>
              </div>
            ))}

            <p className="execution-footer">{t.footer}</p>
          </div>

          {/* ── Right: Animated Image Panel (desktop only) ── */}
          <div className="execution-right">
            <div className="execution-image-box">
              <div className="exec-bg-pulse" />
              <div className="exec-particle exec-p1" />
              <div className="exec-particle exec-p2" />
              <div className="exec-particle exec-p3" />
              {items.map((item, index) => (
                <img
                  key={index}
                  src={item.image}
                  alt={item.title}
                  className={`exec-img
                    ${activeIndex === index ? "exec-img--active" : ""}
                    ${prevIndex  === index ? "exec-img--exit"   : ""}
                  `}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
      <hr style={{ border: "1px solid #E0E0E0", margin: "0" }} />
    </section>
  );
}

export default Execution;
