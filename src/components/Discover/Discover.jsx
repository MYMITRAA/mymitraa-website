import { useState } from "react";
import "./Discover.css";
import { useLang } from "../../Context/LanguageContext";
import birdimage from "../../assets/images/bird1.webp";
import birdEyeClosed from "../../assets/images/birdeyeclosed.webp";
import brainImage from "../../assets/images/aihandai.webp";
import robotHand from "../../assets/images/aibussinessimpact1.png";
import robot from "../../assets/images/aiinaction.webp";
import problem1 from "../../assets/images/problem1.svg";
import problem2 from "../../assets/images/problem2.svg";

/* ─── Translations ───────────────────────────────────────────────── */
const DISCOVER_TEXT = {
  en: {
    title:        "Discover what's happening",
    prob_h:       "Problem We Solve",
    prob_p:       "Growing workloads, manual processes, disconnected systems, and high operational costs slowing decisions and limiting visibility.",
    action_h:     "AI in Action",
    action_p:     "AI automates tasks, understands data, integrates with your tools, and works in real time seamlessly within your workflow.",
    think_h:      "How We Think About AI",
    think_p1:     "We design AI as a support layer for your business, not a replacement for people.",
    think_p2:     "Our systems understand context, assist decisions, and work quietly in the background to improve everyday operations.",
    impact_h:     "Business Impact",
    impact_p:     "Reduced operational load, faster and smarter decisions, lower longterm costs, and better customer experiences so your teams focus on growth.",
  },
  ar: {
    title:        "اكتشف ما يحدث",
    prob_h:       "المشكلة التي نحلها",
    prob_p:       "أعباء العمل المتزايدة، والعمليات اليدوية، والأنظمة المنفصلة، والتكاليف التشغيلية العالية التي تُبطئ القرارات وتُحدّ من الرؤية.",
    action_h:     "الذكاء الاصطناعي في العمل",
    action_p:     "يُؤتمت الذكاء الاصطناعي المهام، ويفهم البيانات، ويتكامل مع أدواتك، ويعمل في الوقت الفعلي بسلاسة ضمن سير عملك.",
    think_h:      "كيف نفكر في الذكاء الاصطناعي",
    think_p1:     "نصمم الذكاء الاصطناعي كطبقة دعم لأعمالك، وليس بديلاً عن الأشخاص.",
    think_p2:     "تفهم أنظمتنا السياق، وتساعد في اتخاذ القرارات، وتعمل بهدوء في الخلفية لتحسين العمليات اليومية.",
    impact_h:     "الأثر على الأعمال",
    impact_p:     "تقليل العبء التشغيلي، وقرارات أسرع وأذكى، وتكاليف طويلة الأمد أقل، وتجارب عملاء أفضل حتى تركز فرقك على النمو.",
  },
};

const getText = (lang) => DISCOVER_TEXT[lang] ?? DISCOVER_TEXT["en"];

/* ─── Component ──────────────────────────────────────────────────── */
function Discover() {
  const [isBirdHovered, setIsBirdHovered] = useState(false);
  const { lang } = useLang();
  const t = getText(lang);

  return (
    <section className="discover">
      <div className="discover-content">
        <h2 className="discover-title">
          {t.title}
        </h2>

        <div className="discover-grid">

          {/* LEFT TOP */}
          <div className="discover-card small-card top-card">
            <div className="top-card-image">
              <img src={problem1} alt="Problem Base" className="problem-base" />
              <img src={problem2} alt="Problem Overlay" className="problem-overlay" />
            </div>
            <div className="top-card-text">
              <h3>{t.prob_h}</h3>
              <p>{t.prob_p}</p>
            </div>
          </div>

          {/* LEFT BOTTOM */}
          <div className="discover-card small-card bottom-card">
            <div className="bottom-card-image">
              <img src={robot} alt="AI Robot" />
            </div>
            <div className="bottom-card-content">
              <h3>{t.action_h}</h3>
              <p>{t.action_p}</p>
            </div>
          </div>

          {/* CENTER */}
          <div
            className="center-space"
            onMouseEnter={() => setIsBirdHovered(true)}
            onMouseLeave={() => setIsBirdHovered(false)}
          >
            <img
              src={isBirdHovered ? birdEyeClosed : birdimage}
              alt="Bird"
              className={isBirdHovered ? "bird-closed" : "bird-open"}
            />
          </div>

          {/* RIGHT TOP */}
          <div className="discover-card wide-card top-right">
            <div className="top-right-content">
              <div className="top-right-text">
                <h3>{t.think_h}</h3>
                <p>{t.think_p1}</p>
                <p>{t.think_p2}</p>
              </div>
              <div className="top-right-image">
                <img src={brainImage} alt="AI Brain" />
              </div>
            </div>
          </div>

          {/* RIGHT BOTTOM */}
          <div className="discover-card wide-card bottom-right">
            <div className="bottom-right-content">
              <div className="bottom-right-text">
                <h3>{t.impact_h}</h3>
                <p>{t.impact_p}</p>
              </div>
              <div className="bottom-right-image">
                <img src={robotHand} alt="Robot Hand" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Discover;
