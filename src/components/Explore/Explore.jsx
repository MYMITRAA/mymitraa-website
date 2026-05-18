import "./Explore.css";
import treeBg from "../../assets/images/treebg.jpg";
import { useNavigate } from "react-router-dom";
import { useLang } from "../../context/LanguageContext";

/* ─── Translations ───────────────────────────────────────────────── */
const EXPLORE_TEXT = {
  en: {
    title:  "Engineering the Moral Foundation of the Intelligent World",
    desc:   "We are building ethical, explainable, and accountable frameworks to guide physical AI as it moves into the real world placing humanity, trust, and responsibility at the core of intelligence.",
    btn:    "Explore",
    quote:  '"Smart enough to lead, responsible enough to trust we built for growth, guided by values."',
  },
  ar: {
    title:  "هندسة الأساس الأخلاقي للعالم الذكي",
    desc:   "نحن نبني أطراً أخلاقية وقابلة للتفسير والمساءلة لتوجيه الذكاء الاصطناعي المادي وهو يتحرك إلى العالم الحقيقي، واضعين الإنسانية والثقة والمسؤولية في صميم الذكاء.",
    btn:    "استكشف",
    quote:  '"ذكي بما يكفي للقيادة، ومسؤول بما يكفي للثقة — بنيناه للنمو، موجهاً بالقيم."',
  },
};

const getText = (lang) => EXPLORE_TEXT[lang] ?? EXPLORE_TEXT["en"];

/* ─── Component ──────────────────────────────────────────────────── */
function Explore() {
  const navigate  = useNavigate();
  const { lang }  = useLang();
  const t         = getText(lang);

  return (
    <section className="explore-section">

      <img src={treeBg} alt="" className="explore-bg-img" />

      <div className="explore-container">

        <div className="explore-content">

          <h2 className="explore-title">
            {t.title}
          </h2>

          <p className="explore-description">
            {t.desc}
          </p>

          <button className="explore-btn" onClick={() => navigate("/agi")}>{t.btn}</button>

        </div>

        <p className="explore-quote">
          {t.quote}
        </p>

      </div>
    </section>
  );
}

export default Explore;