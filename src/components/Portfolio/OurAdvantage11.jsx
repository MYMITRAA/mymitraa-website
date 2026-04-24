/**
 * OurAdvantage.jsx  —  Crink-style scroll storytelling
 *
 * - Sticky background text visible throughout entire scroll
 * - ONE card visible at a time (fade in → hold → fade out)
 * - Cards float upward continuously (no stopping/parallax drift)
 * - Zigzag layout: left → right → left → right
 * - Curved arrow image connects each card transition
 * - Clean 400vh height — zero blank gaps
 *
 * Requires: framer-motion
 */

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import "./OurAdvantage.css";

/* ── Card data ─────────────────────────────────────────── */
const CARDS = [
  {
    num: "01",
    title: "Elite Talent",
    desc: "Proven experts embedded into your team — not just resumes passed through a filter.",
    metric: "92%",
    metricLabel: "Retention rate",
    tag: "People-first",
    align: "left",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#5a6af8" strokeWidth="1.8"
           strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    ),
  },
  {
    num: "02",
    title: "Rapid Onboarding",
    desc: "From signed contract to first delivery in under 2 weeks. Days, not months.",
    metric: "<2w",
    metricLabel: "Time to delivery",
    tag: "Fast start",
    align: "right",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#5a6af8" strokeWidth="1.8"
           strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 7v5l3 3"/>
      </svg>
    ),
  },
  {
    num: "03",
    title: "Flexible Scale",
    desc: "Ramp teams up or down instantly based on project demand — zero friction.",
    metric: "+65%",
    metricLabel: "Productivity boost",
    tag: "Zero friction",
    align: "left",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#5a6af8" strokeWidth="1.8"
           strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="14" width="4" height="7" rx="1"/>
        <rect x="10" y="9" width="4" height="12" rx="1"/>
        <rect x="17" y="4" width="4" height="17" rx="1"/>
      </svg>
    ),
  },
  {
    num: "04",
    title: "Full Ownership",
    desc: "You control delivery and direction. We ensure continuity, quality, and accountability.",
    metric: "99.98%",
    metricLabel: "Uptime guaranteed",
    tag: "Accountability",
    align: "right",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#5a6af8" strokeWidth="1.8"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l7 4v6c0 5-3.5 9-7 10C8.5 21 5 17 5 12V6l7-4z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
];

/* ── Individual animated card ───────────────────────────── */
function AdvCard({ card, index, scrollYProgress }) {
  // Each card owns 25% of total scroll progress
  const start = index * 0.25;
  const end   = start + 0.25;

  // Continuous upward travel: enters from below, exits above
  const rawY = useTransform(scrollYProgress, [start, end], [200, -150]);
  const y    = useSpring(rawY, { stiffness: 90, damping: 22 });

  // Fade in → hold → fade out — only one card visible at a time
  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.08, end - 0.08, end],
    [0, 1, 1, 0]
  );

  // Side entry tilt — eases to 0 as card settles
  const rotateRaw = useTransform(
    scrollYProgress,
    [start, start + 0.10],
    [card.align === "left" ? -5 : 5, 0]
  );
  const rotate = useSpring(rotateRaw, { stiffness: 90, damping: 22 });

  // Horizontal entry nudge from the card's side
  const xRaw = useTransform(
    scrollYProgress,
    [start, start + 0.10],
    [card.align === "left" ? -50 : 50, 0]
  );
  const x = useSpring(xRaw, { stiffness: 90, damping: 22 });

  return (
    <div className={`adv__card-wrap adv__card-wrap--${card.align}`}>
      <motion.div
        className="adv__card"
        style={{ y, opacity, x, rotate }}
      >
        {/* Card header */}
        <div className="adv__card-header">
          <span className="adv__card-num">{card.num}</span>
          <span className="adv__card-tag">{card.tag}</span>
        </div>

        {/* Icon */}
        <div className="adv__card-icon">{card.icon}</div>

        {/* Text */}
        <h3 className="adv__card-title">{card.title}</h3>
        <p  className="adv__card-desc">{card.desc}</p>

        {/* Metric */}
        <div className="adv__card-foot">
          <span className="adv__card-metric">{card.metric}</span>
          <span className="adv__card-metric-lbl">{card.metricLabel}</span>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Arrow connector between cards ─────────────────────── */
function AdvArrow({ fromAlign, index, scrollYProgress }) {
  // Arrow appears between the current and next card
  const start = index * 0.25 + 0.15;
  const end   = start + 0.10;

  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const rawY    = useTransform(scrollYProgress, [start, end], [40, 0]);
  const y       = useSpring(rawY, { stiffness: 90, damping: 22 });

  // Flip horizontally so arrow always points toward the next card's side
  const scaleX = fromAlign === "right" ? -1 : 1;

  return (
    <motion.div
      className={`adv__arrow-wrap adv__arrow-wrap--${fromAlign}`}
      style={{ opacity, y, scaleX }}
    >
      <img
        src="/src/assets/images/curvedarrow.png"
        alt=""
        aria-hidden="true"
        className="adv__arrow-img"
      />
    </motion.div>
  );
}

/* ── Main component ─────────────────────────────────────── */
export default function OurAdvantage() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Background text subtly dims as the final card exits
  const bgOpacity = useTransform(scrollYProgress, [0.85, 1], [1, 0.30]);

  return (
    <section className="adv" ref={containerRef}>

      {/* ── LAYER 1: Sticky background headline ── */}
      <motion.div
        className="adv__sticky-bg"
        style={{ opacity: bgOpacity }}
      >
        <p className="adv__bg-line1">Our Advantage</p>
        <p className="adv__bg-line2">
          Why teams choose <em>us</em>
        </p>
        <p className="adv__bg-sub">
          through Elite Talent, Rapid Onboarding<br />
          &amp; Full Ownership
        </p>
      </motion.div>

      {/* ── LAYER 2: Cards viewport (sticky, sits over bg) ── */}
      <div className="adv__cards-viewport">

        {CARDS.map((card, i) => (
          <AdvCard
            key={i}
            card={card}
            index={i}
            scrollYProgress={scrollYProgress}
          />
        ))}

        {/* Arrow between each consecutive pair */}
        {CARDS.slice(0, -1).map((card, i) => (
          <AdvArrow
            key={`arrow-${i}`}
            fromAlign={card.align}
            index={i}
            scrollYProgress={scrollYProgress}
          />
        ))}

      </div>
    </section>
  );
}
