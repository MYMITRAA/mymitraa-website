import React, { useEffect, useRef, useState } from "react";
import "./AllServiceMid.css";
import { useLang } from "../../context/LanguageContext";

import bird  from "../../assets/images/Mascot3.webp";
import team1 from "../../assets/images/team1image.svg";
import team2 from "../../assets/images/team1image.svg";
import team3 from "../../assets/images/team1image.svg";
import team4 from "../../assets/images/team1image.svg";

/* ─── Translations ───────────────────────────────────────────────── */
const TEXT = {
  en: {
    why_h2:       "Why Choose Us",
    why_p:        "Design and manage data pipelines and analytics systems to turn raw data into actionable business insights.",
    bot_name:     "MAHIBOT",
    bot_tag:      "MY MITRAA CHAT BOT",
    stat1_label:  "Projects Delivered",
    stat2_label:  "Active Clients",
    stat3_label:  "Repeat Engagements",
    stat4_label:  "Commitment to On-Time Delivery",
    card1_h4:     "Scalability Issues",
    card1_p:      "Scalability issues arise when systems fail to handle growing users, data, or workloads efficiently, causing performance drops and downtime.",
    card2_h4:     "Scalability Issues",
    card2_p:      "Scalability issues arise when systems fail to handle growing users, data, or workloads efficiently, causing performance drops and downtime.",
    card3_h4:     "Professional & Creative Team",
    card3_p:      "A professional and creative team delivering innovative ideas, strategic solutions, collaboration, expertise, dedication, and measurable results.",
  },
  ar: {
    why_h2:       "لماذا تختارنا",
    why_p:        "نصمم وندير خطوط بيانات وأنظمة تحليلات لتحويل البيانات الخام إلى رؤى أعمال قابلة للتنفيذ.",
    bot_name:     "ماهي بوت",
    bot_tag:      "روبوت دردشة MY MITRAA",
    stat1_label:  "مشروع تم تسليمه",
    stat2_label:  "عملاء نشطون",
    stat3_label:  "تعاملات متكررة",
    stat4_label:  "التزام بالتسليم في الوقت المحدد",
    card1_h4:     "مشكلات التوسع",
    card1_p:      "تنشأ مشكلات التوسع عندما تفشل الأنظمة في التعامل مع المستخدمين والبيانات وأعباء العمل المتزايدة بكفاءة، مما يسبب انخفاض الأداء والتوقف.",
    card2_h4:     "مشكلات التوسع",
    card2_p:      "تنشأ مشكلات التوسع عندما تفشل الأنظمة في التعامل مع المستخدمين والبيانات وأعباء العمل المتزايدة بكفاءة، مما يسبب انخفاض الأداء والتوقف.",
    card3_h4:     "فريق محترف وإبداعي",
    card3_p:      "فريق محترف ومبدع يقدم أفكاراً مبتكرة وحلولاً استراتيجية وتعاوناً وخبرة وتفانياً ونتائج قابلة للقياس.",
  },
};

const getText = (lang) => TEXT[lang] ?? TEXT["en"];

/* ─── useCountUp — unchanged ────────────────────────────────────── */
function useCountUp(target, suffix, duration, started) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!started) return;
    let current = 0;
    const step = Math.ceil(target / (duration / 16));
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      setValue(current);
      if (current >= target) clearInterval(interval);
    }, 16);
    return () => clearInterval(interval);
  }, [started, target, duration]);

  return value + suffix;
}

/* ─── Component ──────────────────────────────────────────────────── */
const AllServiceMid = () => {
  const [started, setStarted] = useState(false);
  const cardRef = useRef(null);

  const { lang } = useLang();
  const t        = getText(lang);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const projects = useCountUp(10,  "+", 1000, started);
  const clients  = useCountUp(8,   "+", 1200, started);
  const repeat   = useCountUp(70,  "%", 1400, started);
  const delivery = useCountUp(100, "%", 1600, started);

  return (
    <section className="allservicemid">

      {/* Header */}
      <div className="why-header">
        <h2>{t.why_h2}</h2>
        <p>{t.why_p}</p>
      </div>

      <div className="why-grid">

        {/* LEFT CARD */}
        <div className="zenix-card" ref={cardRef}>

          <div className="bird-circle">
            <img src={bird} alt="bot" />
          </div>

          <h3>{t.bot_name}</h3>

          <div className="bot-tag">
            {t.bot_tag}
          </div>

          <div className="stats">

            <div className="stat">
              <h2>{projects}</h2>
              <p>{t.stat1_label}</p>
            </div>

            <div className="divider"></div>

            <div className="stat">
              <h2>{clients}</h2>
              <p>{t.stat2_label}</p>
            </div>

            <div className="stat">
              <h2>{repeat}</h2>
              <p>{t.stat3_label}</p>
            </div>

            <div className="divider"></div>

            <div className="stat">
              <h2>{delivery}</h2>
              <p>{t.stat4_label}</p>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="why-right">

          <div className="right-card-1">
            <h4>{t.card1_h4}</h4>
            <p>{t.card1_p}</p>
          </div>

          <div className="right-card-2">
            <h4>{t.card2_h4}</h4>
            <p>{t.card2_p}</p>
          </div>

          <div className="right-card-3">
            <h4>{t.card3_h4}</h4>
            <p>{t.card3_p}</p>

            <div className="team-row">
              <img src={team1} alt="team" />
              <img src={team2} alt="team" />
              <img src={team3} alt="team" />
              <img src={team4} alt="team" />
              <div className="team-count">15+</div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default AllServiceMid;