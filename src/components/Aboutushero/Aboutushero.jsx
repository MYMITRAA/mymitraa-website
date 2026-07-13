import "./Aboutushero.css";
import aboutBg from "../../assets/images/aboutusbg.jpg";
import { useLang } from "../../Context/LanguageContext";

/* ─── Translations ───────────────────────────────────────────────── */
const TEXT = {
  en: {
    h1: "Who Are we",
    p:  "Shape your future with confidence",
  },
  ar: {
    h1: "من نحن",
    p:  "شكّل مستقبلك بثقة",
  },
};

const getText = (lang) => TEXT[lang] ?? TEXT["en"];

/* ─── Component ──────────────────────────────────────────────────── */
function Aboutushero() {
  const { lang } = useLang();
  const t = getText(lang);

  return (
    <section
      className="about-hero"
      style={{ backgroundImage: `url(${aboutBg})` }}
    >
      <div className="about-overlay"></div>

      <div className="about-hero-content">
        <div className="about-line"></div>

        <div className="about-text">
          <h1>{t.h1}</h1>
          <p>{t.p}</p>
        </div>
      </div>
    </section>
  );
}

export default Aboutushero;
