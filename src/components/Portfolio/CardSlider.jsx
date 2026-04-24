import { useState, useEffect, useRef, useCallback } from "react";
import "./CardSlider.css";

import WhatWeDo1 from "../../assets/images/whatwedo1.webp";
import WhatWeDo2 from "../../assets/images/whatwedo2.webp";
import WhatWeDo3 from "../../assets/images/whatwedo3.webp";
import WhatWeDo4 from "../../assets/images/whatwedo4.webp";
import WhatWeDo5 from "../../assets/images/whatwedo5.webp";

const sliderCards = [
  {
    img: WhatWeDo1,
    tag: "Intelligent Automation",
    title: "AI Automation",
    desc: "Eliminate bottlenecks and free your team from repetitive tasks with intelligent AI workflows built for scale.",
    detail: "Custom pipelines · NLP · Process mining",
    stat: "3× faster",
    statLabel: "operational speed",
  },
  {
    img: WhatWeDo2,
    tag: "Talent On Demand",
    title: "Expert Teams",
    desc: "Pre-vetted, industry-ready professionals deployed within 48 hours — no hiring delays, no overhead.",
    detail: "Engineering · Product · Data · Cloud",
    stat: "200+",
    statLabel: "experts deployed",
  },
  {
    img: WhatWeDo3,
    tag: "Data Intelligence",
    title: "Smart Decisions",
    desc: "Turn raw data into actionable insights with real-time dashboards, predictive models, and AI-driven analytics.",
    detail: "BI dashboards · ML models · KPI tracking",
    stat: "40%",
    statLabel: "faster decisions",
  },
  {
    img: WhatWeDo4,
    tag: "Infrastructure",
    title: "Scalable Systems",
    desc: "Architecture built to grow with you — from MVP to enterprise grade without rearchitecting from scratch.",
    detail: "Cloud · DevOps · Microservices · APIs",
    stat: "99.9%",
    statLabel: "uptime guaranteed",
  },
  {
    img: WhatWeDo5,
    tag: "Resource Optimization",
    title: "Cost Efficiency",
    desc: "Reduce operational costs while improving output quality through smart resource allocation and automation.",
    detail: "Cost audits · ROI tracking · Lean ops",
    stat: "60%",
    statLabel: "avg. cost reduction",
  },
];

function CardSlider() {
  const [current, setCurrent]       = useState(0);
  const [textVisible, setTextVisible] = useState(true);
  const timerRef  = useRef(null);
  const pausedRef = useRef(false);
  const total     = sliderCards.length;

  const goTo = useCallback((nextIdx) => {
    const next = ((nextIdx % total) + total) % total;
    if (next === current) return;
    setTextVisible(false);
    setTimeout(() => {
      setCurrent(next);
      setTextVisible(true);
    }, 340);
  }, [current, total]);

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) {
        setCurrent(prev => {
          const next = (prev + 1) % total;
          setTextVisible(false);
          setTimeout(() => { setCurrent(next); setTextVisible(true); }, 340);
          return prev;
        });
      }
    }, 5000);
  }, [total]);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [resetTimer]);

  const handleNext = () => { goTo(current + 1); resetTimer(); };
  const handlePrev = () => { goTo(current - 1); resetTimer(); };
  const handleDot  = (i) => { goTo(i);           resetTimer(); };

  const card = sliderCards[current];
  const pad  = (n) => String(n).padStart(2, "0");

  return (
    <div
      className="wwd-slider"
      onMouseEnter={() => { pausedRef.current = true;  }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      {/* Ghost depth cards */}
      <div className="wwd-ghost wwd-ghost--back" aria-hidden="true" />
      <div className="wwd-ghost wwd-ghost--mid"  aria-hidden="true" />

      {/* THE CARD */}
      <div className="wwd-card">

        {/* All images stacked — full card background */}
        {sliderCards.map((c, i) => (
          <img
            key={i}
            src={c.img}
            alt={c.title}
            className={`wwd-card__bg-img ${i === current ? "wwd-card__bg-img--active" : ""}`}
          />
        ))}

        {/* Dark gradient overlay for readability */}
        <div className="wwd-card__overlay" />

        {/* Glass text panel — fades with text */}
        <div className={`wwd-card__glass-panel ${textVisible ? "wwd-card__glass-panel--visible" : "wwd-card__glass-panel--hidden"}`}>

          <div className="wwd-card__top">
            <div className="wwd-card__tag-row">
              <span className="wwd-card__tag">{card.tag}</span>
              <span className="wwd-card__index">{pad(current + 1)} / {pad(total)}</span>
            </div>
            <h3 className="wwd-card__title">{card.title}</h3>
            <p  className="wwd-card__desc">{card.desc}</p>
            <p  className="wwd-card__detail">{card.detail}</p>
          </div>

          <div className="wwd-card__divider" />

          <div className="wwd-card__bottom">
            <div className="wwd-card__stat-block">
              <span className="wwd-card__stat-num">{card.stat}</span>
              <span className="wwd-card__stat-label">{card.statLabel}</span>
            </div>
            <div className="wwd-card__nav">
              <button className="wwd-nav-btn" onClick={handlePrev} aria-label="Previous">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="11 18 5 12 11 6" />
                </svg>
              </button>
              <button className="wwd-nav-btn" onClick={handleNext} aria-label="Next">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="13 6 19 12 13 18" />
                </svg>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Dots */}
      <div className="wwd-dots">
        {sliderCards.map((_, i) => (
          <button
            key={i}
            className={`wwd-dot${i === current ? " wwd-dot--active" : ""}`}
            onClick={() => handleDot(i)}
            aria-label={`Go to card ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default CardSlider;