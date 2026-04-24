/**
 * OurAdvantage.jsx  —  Cinematic Crink-style scroll storytelling
 *
 * Visual target (from screenshot):
 *  - Giant fixed background typography behind everything
 *  - Glassmorphism cards pulled upward like objects on a thread
 *  - Cards rotate like hanging/swinging physical objects
 *  - One card in focus at a time (others invisible)
 *  - Curved arrow PNG connects card transitions
 *  - Fully scroll-synced — reverses on scroll up
 *
 * Requires: framer-motion
 */

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l7 4v6c0 5-3.5 9-7 10C8.5 21 5 17 5 12V6l7-4z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
];

/* ─────────────────────────────────────────────────────────
   AdvCard
   Each card owns 20% of scroll (4 cards × 20% + 20% tail = 100%).
   Simulates a hanging/swinging object pulled upward on a thread.
───────────────────────────────────────────────────────── */
function AdvCard({ card, index, scrollYProgress }) {
  const start = index * 0.2;
  const mid   = start + 0.10;   // peak visible moment
  const end   = start + 0.20;

  /* Upward thread pull: enters from 320px below, exits 220px above */
  const rawY = useTransform(scrollYProgress, [start, end], [320, -220]);
  const y    = useSpring(rawY, { stiffness: 100, damping: 22, mass: 0.8 });

  /* Single-focus opacity: invisible → solid → invisible */
  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.07, end - 0.07, end],
    [0, 1, 1, 0]
  );

  /* Hanging-object rotation physics:
     Left card swings in from +90° (clockwise), settles to 0°
     Right card swings in from -90° (anticlockwise), settles to 0° */
  const rawRotate = useTransform(
    scrollYProgress,
    [start, mid, end],
    [card.align === "left" ? 90 : -90, card.align === "left" ? 3 : -3, 0]
  );
  const rotate = useSpring(rawRotate, { stiffness: 120, damping: 18, mass: 1 });

  /* Horizontal entry from the card's side */
  const rawX = useTransform(
    scrollYProgress,
    [start, mid],
    [card.align === "left" ? -70 : 70, 0]
  );
  const x = useSpring(rawX, { stiffness: 110, damping: 20 });

  /* Subtle scale breathe — slightly smaller at entry and exit */
  const scale = useTransform(
    scrollYProgress,
    [start, mid, end],
    [0.88, 1, 0.90]
  );

  return (
    <div className={`adv__card-wrap adv__card-wrap--${card.align}`}>
      <motion.div
        className="adv__card"
        style={{ y, opacity, x, rotate, scale }}
        whileHover={{
          y: -6,
          transition: { duration: 0.22, ease: "easeOut" },
        }}
      >
        {/* Header row */}
        <div className="adv__card-header">
          <span className="adv__card-num">{card.num}</span>
          <span className="adv__card-tag">{card.tag}</span>
        </div>

        {/* Icon badge */}
        <div className="adv__card-icon">{card.icon}</div>

        {/* Text body */}
        <h3 className="adv__card-title">{card.title}</h3>
        <p  className="adv__card-desc">{card.desc}</p>

        {/* Metric strip */}
        <div className="adv__card-foot">
          <span className="adv__card-metric">{card.metric}</span>
          <span className="adv__card-metric-lbl">{card.metricLabel}</span>
        </div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   AdvArrow
   Appears briefly in the transition window between two cards.
   Flips horizontally so it always curves toward the next card.
───────────────────────────────────────────────────────── */
function AdvArrow({ fromCard, index, scrollYProgress }) {
  const start = index * 0.2 + 0.13;
  const peak  = start + 0.04;
  const end   = start + 0.10;

  const opacity = useTransform(
    scrollYProgress,
    [start, peak, end],
    [0, 0.65, 0]
  );
  const rawY = useTransform(scrollYProgress, [start, peak], [28, 0]);
  const y    = useSpring(rawY, { stiffness: 110, damping: 20 });

  const rawRot   = useTransform(scrollYProgress, [start, peak], [10, 0]);
  const arrowRot = useSpring(rawRot, { stiffness: 100, damping: 18 });

  /* Flip PNG so arrow points toward next card's side */
  const scaleX = fromCard.align === "left" ? 1 : -1;

  return (
    <motion.div
      className={`adv__arrow-wrap adv__arrow-wrap--${fromCard.align}`}
      style={{ opacity, y, rotate: arrowRot, scaleX }}
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

/* ─────────────────────────────────────────────────────────
   OurAdvantage — root component
───────────────────────────────────────────────────────── */
export default function OurAdvantage() {
  const containerRef = useRef(null);

  /*
   * useScroll tracks progress from the moment the section's
   * top hits the viewport top, until its bottom hits the bottom.
   * This makes animations fully bidirectional on scroll up/down.
   */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    /*
     * Section height: 500vh
     *   4 cards × 100vh each  +  100vh entry/exit buffer
     * This gives each card its own dedicated scroll window.
     */
    <section className="adv" ref={containerRef}>

      {/* ══════════════════════════════════════
          LAYER 1 — FIXED BACKGROUND TYPOGRAPHY
          position:fixed keeps it pinned to the
          viewport the entire time.  z-index: 1.
          ══════════════════════════════════════ */}
      <div className="adv__sticky-bg">
        <div className="adv__bg-inner">
          <p className="adv__bg-eyebrow">Our Advantage</p>
          <p className="adv__bg-line1">Why teams</p>
          <p className="adv__bg-line2">choose <em>us</em></p>
          <p className="adv__bg-sub">
            through Elite Talent, Rapid Onboarding<br />
            &amp; Full Ownership
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════
          LAYER 2 — STICKY CARDS VIEWPORT
          Sticky so the animated cards live
          inside the locked viewport window.
          z-index: 3 — above bg text.
          ══════════════════════════════════════ */}
      <div className="adv__cards-viewport">

        {CARDS.map((card, i) => (
          <AdvCard
            key={i}
            card={card}
            index={i}
            scrollYProgress={scrollYProgress}
          />
        ))}

        {CARDS.slice(0, -1).map((card, i) => (
          <AdvArrow
            key={`arrow-${i}`}
            fromCard={card}
            index={i}
            scrollYProgress={scrollYProgress}
          />
        ))}

      </div>

    </section>
  );
}
