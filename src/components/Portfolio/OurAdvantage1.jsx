/**
 * OurAdvantage.jsx
 *
 * Scrollytelling section:
 *  - Sticky headline stays locked in viewport center the ENTIRE scroll
 *  - 4 cards float upward in zigzag (L → R → L → R) via Framer Motion
 *  - Curved arrow image connects each card to the next
 *  - Background text fades slightly as last card passes
 *
 * Requires: framer-motion (npm install framer-motion)
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
    align: "left",   // horizontal position on screen
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
  // Each card occupies a 25% window of scroll progress
  // Card 0 → [0.05, 0.30], Card 1 → [0.25, 0.50], etc.
  const enter  = index * 0.22;
  const settle = enter + 0.20;

  // translateY: comes from 180px below → rests at 0
  const rawY = useTransform(scrollYProgress, [enter, settle], [180, 0]);
  const y    = useSpring(rawY, { stiffness: 80, damping: 20 });

  // opacity: invisible → fully visible
  const opacity = useTransform(scrollYProgress, [enter, settle], [0, 1]);

  // subtle parallax after card settles — keeps drifting slightly as you continue scrolling
  const parallax = useTransform(scrollYProgress, [settle, 1], [0, -60]);
  const parallaxSpring = useSpring(parallax, { stiffness: 40, damping: 15 });

  // entry rotation: slight tilt from the entry side
  const rotateRaw = useTransform(
    scrollYProgress,
    [enter, settle],
    [card.align === "left" ? -6 : 6, 0]
  );
  const rotate = useSpring(rotateRaw, { stiffness: 80, damping: 20 });

  // X entry offset from side
  const xRaw = useTransform(
    scrollYProgress,
    [enter, settle],
    [card.align === "left" ? -60 : 60, 0]
  );
  const x = useSpring(xRaw, { stiffness: 80, damping: 20 });

  return (
    <motion.div
      className={`adv__card-wrap adv__card-wrap--${card.align}`}
      style={{ y: parallaxSpring }}
    >
      <motion.div
        className="adv__card"
        style={{ opacity, y, x, rotate }}
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
    </motion.div>
  );
}

/* ── Arrow connector between cards ─────────────────────── */
function AdvArrow({ fromAlign, index, scrollYProgress }) {
  // Arrow appears shortly after its card settles
  const start = index * 0.22 + 0.18;
  const end   = start + 0.08;

  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y       = useTransform(scrollYProgress, [start, end], [20, 0]);

  // Arrow points from current card side to the opposite (next) side
  // Flip horizontally when current card is on the right
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

  /**
   * useScroll tracks scroll progress relative to the container.
   * offset: ["start start", "end end"] means:
   *   0 = top of section hits top of viewport
   *   1 = bottom of section hits bottom of viewport
   */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Background text fades slightly as final card passes through
  const bgOpacity = useTransform(scrollYProgress, [0.75, 1], [1, 0.25]);

  return (
    /**
     * OUTER container: very tall so each card has its own scroll moment.
     * min-height: 600vh → 100vh baseline + 4 cards × ~125vh each
     */
    <section className="adv" ref={containerRef}>

      {/* ════════════════════════════════════════════════════
          LAYER 1 — STICKY BACKGROUND HEADLINE
          position:sticky keeps this locked while outer
          section scrolls. z-index:1 sits behind cards (z:2)
          ════════════════════════════════════════════════════ */}
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

      {/* ════════════════════════════════════════════════════
          LAYER 2 — CARDS VIEWPORT
          position:sticky too, but z-index:2.
          Cards are absolutely placed inside and animated.
          This div stays in viewport while section scrolls.
          ════════════════════════════════════════════════════ */}
      <div className="adv__cards-viewport">
        {CARDS.map((card, i) => (
          <AdvCard
            key={i}
            card={card}
            index={i}
            scrollYProgress={scrollYProgress}
          />
        ))}

        {/* Arrow between each consecutive pair of cards */}
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
