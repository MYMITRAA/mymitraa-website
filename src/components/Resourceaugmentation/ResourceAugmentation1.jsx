import React from "react";
import Footer from "./Footer";
import "./ResourceAugmentation.css";

// ─────────────────────────────────────────────
// SVG ICONS — "Why It Matters" 3D-style cards
// ─────────────────────────────────────────────
const TalentIcon = () => (
  <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
    {/* Bar chart */}
    <rect x="8"  y="42" width="10" height="22" rx="3" fill="#c5c8ff" />
    <rect x="22" y="30" width="10" height="34" rx="3" fill="#9196ff" />
    <rect x="36" y="38" width="10" height="26" rx="3" fill="#737aff" />
    {/* Magnifier */}
    <circle cx="56" cy="26" r="12" stroke="#737aff" strokeWidth="3" fill="rgba(115,122,255,0.15)" />
    <line x1="65" y1="35" x2="71" y2="44" stroke="#737aff" strokeWidth="3.5" strokeLinecap="round" />
    {/* Green up arrow */}
    <path d="M12 28 L19 16 L26 28" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <line x1="19" y1="16" x2="19" y2="30" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const HiringCostIcon = () => (
  <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
    {/* Big coin */}
    <circle cx="32" cy="44" r="22" fill="#e8e9ff" />
    <circle cx="32" cy="44" r="16" fill="#d0d3ff" />
    <text x="25" y="51" fontSize="17" fontWeight="bold" fill="#737aff" fontFamily="serif">$</text>
    {/* Arrow up-right */}
    <path d="M50 18 L66 8" stroke="#737aff" strokeWidth="3" strokeLinecap="round" />
    <path d="M56 8 L66 8 L66 18" stroke="#737aff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    {/* Small triangle on coin */}
    <path d="M26 44 L32 34 L38 44 Z" fill="#737aff" />
  </svg>
);

const GoToMarketIcon = () => (
  <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
    {/* Speedometer arc background */}
    <path d="M12 50 A24 24 0 0 1 60 50" stroke="#e0e2ff" strokeWidth="8" strokeLinecap="round" fill="none" />
    {/* Active arc */}
    <path d="M12 50 A24 24 0 0 1 50 25" stroke="#737aff" strokeWidth="8" strokeLinecap="round" fill="none" />
    {/* Needle */}
    <line x1="36" y1="50" x2="52" y2="30" stroke="#4a4fff" strokeWidth="3" strokeLinecap="round" />
    <circle cx="36" cy="50" r="5" fill="#737aff" />
    {/* Tick dots */}
    <circle cx="12" cy="50" r="3" fill="#b0b5f8" />
    <circle cx="36" cy="26" r="3" fill="#b0b5f8" />
    <circle cx="60" cy="50" r="3" fill="#b0b5f8" />
  </svg>
);

const FlexibleTeamIcon = () => (
  <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
    {/* Clipboard */}
    <rect x="14" y="16" width="44" height="52" rx="7" fill="#dde0ff" />
    <rect x="14" y="16" width="44" height="52" rx="7" stroke="#b0b5f8" strokeWidth="1.5" fill="none" />
    {/* Clip top */}
    <rect x="24" y="10" width="24" height="13" rx="5" fill="#9196ff" />
    {/* Lines */}
    <rect x="22" y="38" width="28" height="5" rx="2.5" fill="#a5a9ff" />
    <rect x="22" y="49" width="20" height="5" rx="2.5" fill="#c5c8ff" />
    <rect x="22" y="60" width="24" height="5" rx="2.5" fill="#c5c8ff" />
    {/* Person badge top-right */}
    <circle cx="52" cy="30" r="8" fill="#737aff" />
    <path d="M40 56 Q40 46 52 46 Q64 46 64 56" fill="#737aff" />
  </svg>
);

// ─────────────────────────────────────
// DATA
// ─────────────────────────────────────
const whyCards = [
  { icon: <TalentIcon />,       label: "Talent shortages" },
  { icon: <HiringCostIcon />,   label: "Rising hiring costs" },
  { icon: <GoToMarketIcon />,   label: "Faster go-to-market pressure" },
  { icon: <FlexibleTeamIcon />, label: "Need for flexible, scalable teams" },
];

const advantages = [
  { title: "Rapid Scalability",      desc: "Scale your team up or down instantly based on project demands without long term commitments." },
  { title: "Access to Top Talent",   desc: "Pre vetted, domain expert professionals with proven track records, ready from day one." },
  { title: "Cost Efficiency",        desc: "Eliminate recruitment, training, and overhead costs while maintaining high quality output." },
  { title: "Seamless Integration",   desc: "Our experts slot effortlessly into your tools, processes, and team culture." },
  { title: "Faster Time to Market",  desc: "Experienced professionals accelerate delivery and shorten your release cycles." },
  { title: "Long term Partnership",  desc: "Committed to your success beyond the first engagement startups to enterprises." },
];

const domains = [
  "Full Stack, Frontend & Backend Development",
  "Cloud, DevOps & Infrastructure",
  "Cybersecurity & Compliance",
  "Data Engineering, AI & Machine Learning",
  "QA & Automation Testing",
  "UI/UX Design & Product Engineering",
  "ERP, CRM & Enterprise Applications",
];

const steps = [
  { num: "01", title: "Requirement Analysis",   desc: "Understand your technical and domain-specific needs in depth." },
  { num: "02", title: "Talent Matching",         desc: "Identify and deploy the best-fit resources from our vetted pool." },
  { num: "03", title: "Onboarding & Integration",desc: "Ensure smooth alignment with your existing team and workflows." },
  { num: "04", title: "Performance Management",  desc: "Continuous monitoring, optimization, and delivery tracking." },
  { num: "05", title: "Scalable Support",        desc: "Flexible engagement that adapts to your evolving requirements." },
];

// ─────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────
export default function ResourceAugmentation() {
  return (
    <div className="ra-page">

      {/* ═══ SECTION 1 ─ Hero illustration (lavender gradient bg) ═══ */}
      <section className="ra-sec ra-sec--illus">
        {/* Try to load your actual 3D asset; the SVG below is the fallback */}
        {/* <img
          src="/assets/illustrations/resource-hero.png"
          alt="Resource Augmentation Hero"
          className="ra-illus-img"
          onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "block"; }}
        /> */}
        {/* ── Fallback illustrated SVG ── */}
        <svg
          className="ra-illus-img ra-illus-svg"
          style={{ display: "none" }}
          viewBox="0 0 320 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shadow */}
          <ellipse cx="160" cy="248" rx="110" ry="10" fill="rgba(115,122,255,0.18)" />
          {/* Folder back layer */}
          <rect x="60" y="90" width="190" height="128" rx="16" fill="#c7caff" />
          <rect x="60" y="76" width="80" height="30" rx="12" fill="#b0b5f8" />
          {/* Folder body */}
          <rect x="50" y="106" width="200" height="114" rx="16" fill="#dde0ff" />
          {/* Document lines */}
          <rect x="82" y="136" width="100" height="9" rx="4.5" fill="rgba(115,122,255,0.4)" />
          <rect x="82" y="153" width="80"  height="8" rx="4"   fill="rgba(115,122,255,0.25)" />
          <rect x="82" y="168" width="90"  height="8" rx="4"   fill="rgba(115,122,255,0.25)" />
          {/* Shield */}
          <path d="M210 46 L248 60 L248 98 Q248 132 210 152 Q172 132 172 98 L172 60 Z" fill="#7c82ff" />
          <path d="M210 56 L240 68 L240 100 Q240 128 210 146 Q180 128 180 100 L180 68 Z" fill="#a5a9ff" />
          <path d="M196 100 L207 114 L228 84" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {/* Cloud */}
          <ellipse cx="90"  cy="98"  rx="32" ry="22" fill="white" opacity="0.92" />
          <ellipse cx="72"  cy="108" rx="22" ry="16" fill="white" opacity="0.92" />
          <ellipse cx="108" cy="108" rx="22" ry="16" fill="white" opacity="0.92" />
        </svg>
      </section>

      {/* ═══ SECTION 2 ─ Title block (white bg, centered) ═══ */}
      <section className="ra-sec ra-sec--title">
        <p className="ra-title-tagline">Scale Faster. Operate Smarter. Deliver Without Limits.</p>
        <h1 className="ra-title-h1">RESOURCE ARGUMENTATION</h1>
        <p className="ra-title-desc">
          Our Resource Augmentation Services deliver the right talent on demand, helping you scale teams fast without
          hiring delays, overhead, or risk.
        </p>
        <p className="ra-title-desc ra-title-desc--italic">
          We don't just provide resources, we deliver capability, accountability, and measurable outcomes.
        </p>
      </section>

      {/* ═══ SECTION 3 ─ What We Do (white bg, two-col) ═══ */}
      <section className="ra-sec ra-sec--whatdo">
        <div className="ra-whatdo__text">
          <h2 className="ra-whatdo__heading">What We Do</h2>
          <p className="ra-whatdo__body">
            We extend your teams with pre-vetted, industry-ready experts across engineering, product, data, cloud, AI,
            and operations without hiring overhead.
          </p>
        </div>
        <div className="ra-whatdo__visual">
          {/* <img
            src="/assets/illustrations/resource-dashboard.png"
            alt="AI Dashboard"
            className="ra-whatdo__img"
            onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
          /> */}
          {/* Fallback card */}
          <div className="ra-whatdo__img-fallback" style={{ display: "none" }}>
            <svg viewBox="0 0 420 240" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <rect width="420" height="240" rx="18" fill="url(#dashGrad)" />
              <defs>
                <linearGradient id="dashGrad" x1="0" y1="0" x2="420" y2="240" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#dce1ff" />
                  <stop offset="1" stopColor="#bcd5fb" />
                </linearGradient>
              </defs>
              {/* Wave layers */}
              <path d="M0 155 Q105 115 210 155 Q315 195 420 155 L420 240 L0 240 Z" fill="rgba(115,122,255,0.2)" />
              <path d="M0 175 Q105 140 210 175 Q315 210 420 175 L420 240 L0 240 Z" fill="rgba(115,122,255,0.13)" />
              {/* Bar chart */}
              <rect x="28"  y="88" width="18" height="62" rx="5" fill="rgba(115,122,255,0.45)" />
              <rect x="52"  y="68" width="18" height="82" rx="5" fill="rgba(115,122,255,0.6)" />
              <rect x="76"  y="98" width="18" height="52" rx="5" fill="rgba(115,122,255,0.38)" />
              <rect x="100" y="58" width="18" height="92" rx="5" fill="#737aff" />
              {/* Robot body */}
              <rect x="270" y="110" width="68" height="56" rx="14" fill="#7c82ff" />
              <rect x="282" y="94"  width="44" height="34" rx="12" fill="#a5a9ff" />
              <circle cx="296" cy="108" r="6" fill="white" />
              <circle cx="314" cy="108" r="6" fill="white" />
              <rect x="294"  cy="120" width="16" height="6" rx="3" fill="white" opacity="0.6" />
              {/* Arms */}
              <rect x="252" y="118" width="18" height="10" rx="5" fill="#9196ff" />
              <rect x="338" y="118" width="18" height="10" rx="5" fill="#9196ff" />
              {/* Text lines beside chart */}
              <rect x="145" y="68" width="90" height="9" rx="4.5" fill="rgba(115,122,255,0.3)" />
              <rect x="145" y="84" width="70" height="7" rx="3.5" fill="rgba(115,122,255,0.2)" />
              <rect x="145" y="98" width="80" height="7" rx="3.5" fill="rgba(115,122,255,0.2)" />
            </svg>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4 ─ Why It Matters (lavender bg) ═══ */}
      <section className="ra-sec ra-sec--why">
        <div className="ra-why__header">
          <h2 className="ra-why__title">Why It Matters</h2>
          <p className="ra-why__sub">We solve all four, at enterprise scale.</p>
        </div>
        <div className="ra-why__grid">
          {whyCards.map((c) => (
            <div className="ra-why__card" key={c.label}>
              <div className="ra-why__card-icon">{c.icon}</div>
              <p className="ra-why__card-label">{c.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SECTION 5 ─ Our Advantage (white bg) ═══ */}
      <section className="ra-sec ra-sec--advantage">
        <div className="ra-adv__header">
          <h2 className="ra-adv__title">
            Our <span className="ra-adv__title-blue">Advantage</span>
          </h2>
          <p className="ra-adv__sub">
            Strong focus on quality, reliability, and domain expertise — built for startups to large enterprises.
          </p>
        </div>
        <div className="ra-adv__grid">
          {advantages.map((a, i) => (
            <div className="ra-adv__card" key={a.title}>
              <span className="ra-adv__card-num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="ra-adv__card-title">{a.title}</h3>
              <p className="ra-adv__card-desc">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SECTION 6 ─ Domains (lavender bg) ═══ */}
      <section className="ra-sec ra-sec--domains">
        <div className="ra-domains__header">
          <h2 className="ra-domains__title">
            Domains &amp; <span className="ra-domains__title-blue">Skills Coverage</span>
          </h2>
          <p className="ra-domains__sub">Full-spectrum IT expertise, ready to deploy.</p>
        </div>
        <ul className="ra-domains__list">
          {domains.map((d) => (
            <li className="ra-domains__item" key={d}>
              <span className="ra-domains__check">&#10003;</span>
              {d}
            </li>
          ))}
        </ul>
      </section>

      {/* ═══ SECTION 7 ─ Engagement Approach (white bg) ═══ */}
      <section className="ra-sec ra-sec--engage">
        <div className="ra-engage__header">
          <h2 className="ra-engage__title">
            Our <span className="ra-engage__title-blue">Engagement Approach</span>
          </h2>
          <p className="ra-engage__sub">From requirement to delivery in 5 clear steps.</p>
        </div>
        <div className="ra-engage__steps">
          {steps.map((s, i) => (
            <div className="ra-engage__step" key={s.num}>
              <div className="ra-engage__step-num">{s.num}</div>
              {i < steps.length - 1 && <div className="ra-engage__step-line" />}
              <div className="ra-engage__step-body">
                <h4 className="ra-engage__step-title">{s.title}</h4>
                <p className="ra-engage__step-desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SECTION 8 ─ CTA (lavender bg) ═══ */}
      <section className="ra-sec ra-sec--cta">
        <h2 className="ra-cta__title">Let's Build Your Team, Together</h2>
        <p className="ra-cta__sub">
          Whether you need a single expert or an entire team, MY MiTRAA Technology delivers the right talent to help
          you innovate, scale, and succeed.
        </p>
        <div className="ra-cta__actions">
          <a href="/contact"   className="ra-btn ra-btn--fill">Get Started</a>
          <a href="/portfolio" className="ra-btn ra-btn--outline">View Portfolio</a>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <Footer />

    </div>
  );
}
