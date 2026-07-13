import "./AboutusMid.css";
import Aboutmidimg from "../../assets/images/aboutusmidimage22.png";
import rightImage from "../../assets/images/aboutusimg2.png";
import { useLang } from "../../Context/LanguageContext";

/* ─── Translations ───────────────────────────────────────────────── */
const TEXT = {
  en: {
    h1:    "ABOUT US",
    p:     "We are a technology driven company delivering innovative IT solutions across AI & automation, cloud and hybrid infrastructure, cybersecurity, and data analytics. Our focus is on helping businesses improve efficiency, enhance security, and make smarter, data driven decisions. With a customer first approach, we build scalable and reliable solutions tailored to modern business needs.",
    quote: "Driven by purpose, powered by AI, and committed to creating technology that truly makes a difference.",
  },
  ar: {
    h1:    "من نحن",
    p:     "نحن شركة تقنية تقدم حلول تكنولوجيا المعلومات المبتكرة عبر الذكاء الاصطناعي والأتمتة، والبنية التحتية السحابية والهجينة، والأمن السيبراني، وتحليل البيانات. نركز على مساعدة الشركات في تحسين الكفاءة وتعزيز الأمان واتخاذ قرارات أذكى مستندة إلى البيانات. بنهج يضع العميل أولاً، نبني حلولاً قابلة للتوسع وموثوقة مصممة لاحتياجات الأعمال الحديثة.",
    quote: "مدفوعون بالهدف، مدعومون بالذكاء الاصطناعي، وملتزمون بإنشاء تكنولوجيا تُحدث فرقاً حقيقياً.",
  },
};

const getText = (lang) => TEXT[lang] ?? TEXT["en"];

/* ─── Component ──────────────────────────────────────────────────── */
function AboutusMid() {
  const { lang } = useLang();
  const t = getText(lang);

  return (
    <section className="about-mid-section">

      {/* TOP */}
      <div className="about-top">
        <h1>{t.h1}</h1>
        <p>{t.p}</p>
      </div>

      {/* CREATIVE IMAGE — full bleed, no horizontal padding */}
      <div className="about-creative-image">
        <img src={Aboutmidimg} alt="Creative Section" />
      </div>

      {/* BOTTOM */}
      <div className="about-bottom">
        <div className="about-quote">
          <span className="quote-mark open">&ldquo;</span>
          <p className="quote-text">{t.quote}</p>
          <span className="quote-mark close">&rdquo;</span>
        </div>

        <div className="about-image">
          <img src={rightImage} alt="About Visual" />
        </div>
      </div>

    </section>
  );
}

export default AboutusMid;
