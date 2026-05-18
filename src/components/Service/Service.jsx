import "./Service.css";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from "../../context/LanguageContext";

import robotImage from "../../assets/images/roboman.jpg";
import serviceBg from "../../assets/images/servicebg.svg";

import icon1 from "../../assets/images/icon1.svg";
import icon2 from "../../assets/images/icon2.svg";
import icon3 from "../../assets/images/icon3.svg";
import icon4 from "../../assets/images/icon4.svg";
import icon5 from "../../assets/images/icon5.svg";
import icon6 from "../../assets/images/6icon.svg";

/* ─── Translations ───────────────────────────────────────────────── */
const SERVICE_TEXT = {
  en: {
    title:      "One Service Partner. Complete Delivery",
    learnMore:  "Learn more",
    feature: {
      h3: "AI for small business",
      p:  "Grow your customer base with communications software designed for up to 300 employees.",
    },
    cards: [
      {
        h3: "Generative AI Solutions",
        p:  "We build AI systems that understand needs, assist decisions, adapt intelligently, and scale with your business.",
        route: "/genai",
      },
      {
        h3: "Web & Application Development",
        p:  "We design and develop modern web and application platforms powered by intelligent, scalable AI solutions.",
        route: "/web",
      },
      {
        h3: "Enterprise Agile Development",
        p:  "We help enterprises move faster without losing control, governance, security, compliance, or operational visibility globally.",
        route: "/enterpriseagiledevelopment",
      },
      {
        h3: "Cyber Security",
        p:  "Security isn't an add on; it's embedded into everything we design, build, and deliver.",
        route: "/cybersecurity",
      },
      {
        h3: "Blockchain (Web3)",
        p:  "We create blockchain solutions where trust, transparency, and automation truly matter for secure digital ecosystems.",
        route: "/blockchain",
      },
      {
        h3: "Enterprise Technology & Performance",
        p:  "We optimize enterprise systems to perform better, scale smarter, and run lighter.",
        route: "/enterprisetech",
      },
    ],
  },
  ar: {
    title:      "شريك خدمة واحد. تسليم متكامل",
    learnMore:  "اعرف المزيد",
    feature: {
      h3: "الذكاء الاصطناعي للأعمال الصغيرة",
      p:  "نمِّ قاعدة عملائك ببرامج اتصالات مصممة لما يصل إلى 300 موظف.",
    },
    cards: [
      {
        h3: "حلول الذكاء الاصطناعي التوليدي",
        p:  "نبني أنظمة ذكاء اصطناعي تفهم الاحتياجات، وتساعد في اتخاذ القرارات، وتتكيف بذكاء، وتنمو مع أعمالك.",
        route: "/genai",
      },
      {
        h3: "تطوير الويب والتطبيقات",
        p:  "نصمم ونطور منصات ويب وتطبيقات حديثة مدعومة بحلول ذكاء اصطناعي ذكية وقابلة للتوسع.",
        route: "/web",
      },
      {
        h3: "التطوير المؤسسي الرشيق",
        p:  "نساعد الشركات على التحرك بسرعة دون فقدان السيطرة أو الحوكمة أو الأمان أو الامتثال أو الرؤية التشغيلية عالمياً.",
        route: "/enterpriseagiledevelopment",
      },
      {
        h3: "الأمن السيبراني",
        p:  "الأمان ليس إضافة؛ بل هو مدمج في كل ما نصممه ونبنيه ونسلمه.",
        route: "/cybersecurity",
      },
      {
        h3: "البلوكشين (Web3)",
        p:  "نبتكر حلول بلوكشين حيث تكون الثقة والشفافية والأتمتة مهمة حقاً لأنظمة رقمية آمنة.",
        route: "/blockchain",
      },
      {
        h3: "تكنولوجيا المؤسسات والأداء",
        p:  "نُحسّن أنظمة المؤسسات لتؤدي أداءً أفضل، وتتوسع بذكاء، وتعمل بكفاءة أعلى.",
        route: "/enterprisetech",
      },
    ],
  },
};

const getText = (lang) => SERVICE_TEXT[lang] ?? SERVICE_TEXT["en"];

const icons = [icon1, icon2, icon3, icon4, icon5, icon6];

/* ─── Component ──────────────────────────────────────────────────── */
function Services() {
  const navigate    = useNavigate();
  const sectionRef  = useRef(null);
  const { lang }    = useLang();
  const t           = getText(lang);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const title = entry.target.querySelector(".services-title");
            const cards = entry.target.querySelectorAll(".service-card, .service-feature");

            if (title) title.classList.add("animate-in");

            cards.forEach((card, i) => {
              setTimeout(() => {
                card.classList.add("animate-in");
              }, i * 100);
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="services-section"
      style={{ backgroundImage: `url(${serviceBg})` }}
    >
      <div className="services-container">

        <h2 className="services-title">
          {t.title}
        </h2>

        <div className="services-grid">

          {/* CARD 1 */}
          <div className="service-card">
            <div>
              <div className="service-icon">
                <img src={icons[0]} alt="icon" />
              </div>
              <h3>{t.cards[0].h3}</h3>
              <p>{t.cards[0].p}</p>
            </div>
            <button className="service-btn" onClick={() => navigate(t.cards[0].route)}>
              {t.learnMore}
            </button>
          </div>

          {/* ROBOT FEATURE CARD */}
          <div className="service-feature">
            <img src={robotImage} alt="AI Robot" />
            <div className="feature-overlay">
              <h3>{t.feature.h3}</h3>
              <p>{t.feature.p}</p>
              <button className="feature-btn" onClick={() => navigate("/aiforsmallbusiness")}>
                {t.learnMore}
              </button>
            </div>
          </div>

          {/* CARDS 2–6 */}
          {t.cards.slice(1).map((card, i) => (
            <div className="service-card" key={i}>
              <div>
                <div className="service-icon">
                  <img src={icons[i + 1]} alt="icon" />
                </div>
                <h3>{card.h3}</h3>
                <p>{card.p}</p>
              </div>
              <button className="service-btn" onClick={() => navigate(card.route)}>
                {t.learnMore}
              </button>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Services;