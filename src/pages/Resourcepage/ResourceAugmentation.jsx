import React from "react";
import Footer from "../../components/Footer/Footer";
import "./ResourceAugmentation.css";

/* ─────────────────────────────────────────────────────────────
   ICONS
───────────────────────────────────────────────────────────── */
const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="9" fill="rgba(115,122,255,0.15)" />
    <path d="M5 9.5L7.5 12L13 6.5" stroke="#737aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M3 9H15M10 4L15 9L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* domain / industry icons */
const icons = {
  fullstack:    <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="2" y="6" width="24" height="16" rx="3" stroke="#737aff" strokeWidth="1.8" fill="rgba(115,122,255,0.1)"/><path d="M9 14L6 11L9 8" stroke="#737aff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 14L22 11L19 8" stroke="#737aff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 7L12 15" stroke="#9196ff" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  cloud:        <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M8 20a5 5 0 0 1 0-10 7 7 0 0 1 13.4 2 4 4 0 0 1-1.4 7.8H8z" stroke="#737aff" strokeWidth="1.8" fill="rgba(115,122,255,0.1)"/><path d="M11 17l3-3 3 3M14 14v5" stroke="#9196ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  security:     <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M14 3L5 7v7c0 5 4 9.5 9 11 5-1.5 9-6 9-11V7L14 3z" stroke="#737aff" strokeWidth="1.8" fill="rgba(115,122,255,0.1)"/><path d="M10 14l3 3 5-5" stroke="#9196ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  data:         <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><ellipse cx="14" cy="8" rx="8" ry="3.5" stroke="#737aff" strokeWidth="1.8" fill="rgba(115,122,255,0.1)"/><path d="M6 8v6c0 2 3.6 3.5 8 3.5s8-1.5 8-3.5V8" stroke="#737aff" strokeWidth="1.8"/><path d="M6 14v6c0 2 3.6 3.5 8 3.5s8-1.5 8-3.5v-6" stroke="#737aff" strokeWidth="1.8"/></svg>,
  qa:           <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="5" y="5" width="18" height="18" rx="3" stroke="#737aff" strokeWidth="1.8" fill="rgba(115,122,255,0.1)"/><path d="M10 10h8M10 14h5M10 18h6" stroke="#9196ff" strokeWidth="1.8" strokeLinecap="round"/><circle cx="20" cy="20" r="4" fill="#737aff"/><path d="M18.5 20l1.2 1.2 2-2" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  design:       <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="10" stroke="#737aff" strokeWidth="1.8" fill="rgba(115,122,255,0.1)"/><circle cx="14" cy="14" r="4" fill="#737aff"/><path d="M14 4v4M14 20v4M4 14h4M20 14h4" stroke="#9196ff" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  erp:          <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="4" y="4" width="9" height="9" rx="2" stroke="#737aff" strokeWidth="1.8" fill="rgba(115,122,255,0.1)"/><rect x="15" y="4" width="9" height="9" rx="2" stroke="#737aff" strokeWidth="1.8" fill="rgba(115,122,255,0.1)"/><rect x="4" y="15" width="9" height="9" rx="2" stroke="#737aff" strokeWidth="1.8" fill="rgba(115,122,255,0.1)"/><rect x="15" y="15" width="9" height="9" rx="2" stroke="#9196ff" strokeWidth="1.8" fill="rgba(115,122,255,0.18)"/></svg>,
  banking:      <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M4 11L14 4l10 7H4z" fill="rgba(115,122,255,0.15)" stroke="#737aff" strokeWidth="1.8" strokeLinejoin="round"/><rect x="7" y="11" width="3" height="9" fill="rgba(115,122,255,0.2)" stroke="#737aff" strokeWidth="1.4"/><rect x="12.5" y="11" width="3" height="9" fill="rgba(115,122,255,0.2)" stroke="#737aff" strokeWidth="1.4"/><rect x="18" y="11" width="3" height="9" fill="rgba(115,122,255,0.2)" stroke="#737aff" strokeWidth="1.4"/><path d="M4 20h20" stroke="#737aff" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  health:       <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="4" y="4" width="20" height="20" rx="4" fill="rgba(115,122,255,0.1)" stroke="#737aff" strokeWidth="1.8"/><path d="M14 9v10M9 14h10" stroke="#737aff" strokeWidth="2.2" strokeLinecap="round"/></svg>,
  retail:       <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M4 4h3l2.4 10.8A2 2 0 0 0 11 16h12" stroke="#737aff" strokeWidth="1.8" strokeLinecap="round"/><circle cx="12" cy="21" r="2" fill="#737aff"/><circle cx="20" cy="21" r="2" fill="#737aff"/><path d="M7 8h17l-2 8H9" stroke="#9196ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  manufacturing:<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M4 20V12l6-4v4l6-4v4l6-4v12H4z" fill="rgba(115,122,255,0.1)" stroke="#737aff" strokeWidth="1.8" strokeLinejoin="round"/><rect x="10" y="14" width="4" height="6" rx="1" fill="#737aff"/></svg>,
  telecom:      <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M6 22c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#737aff" strokeWidth="1.8" strokeLinecap="round"/><path d="M2 22c0-6.6 5.4-12 12-12s12 5.4 12 12" stroke="#9196ff" strokeWidth="1.8" strokeLinecap="round"/><circle cx="14" cy="22" r="2" fill="#737aff"/></svg>,
  startup:      <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M14 4C9 4 6 9 6 14c0 2 .8 4 2 5.5L6 24l4.5-2c1.5 1 3.1 1.5 4.5 1.5 5 0 9-4 9-9s-4-10.5-10-10.5z" fill="rgba(115,122,255,0.1)" stroke="#737aff" strokeWidth="1.8"/><path d="M11 14l2 2 4-4" stroke="#737aff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  enterprise:   <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="3" y="10" width="22" height="14" rx="2" fill="rgba(115,122,255,0.1)" stroke="#737aff" strokeWidth="1.8"/><path d="M9 10V7a5 5 0 0 1 10 0v3" stroke="#737aff" strokeWidth="1.8" strokeLinecap="round"/><circle cx="14" cy="17" r="2.5" fill="#737aff"/></svg>,
};

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const highlights = [
  "Dedicated IT resources aligned to your domain needs",
  "Expertise across all IT sectors and technologies",
  "Flexible engagement models (short-term & long-term)",
  "Rapid onboarding with minimal turnaround time",
  "Pre-vetted, highly skilled professionals",
  "Seamless integration with your internal teams",
  "Scalable resources based on project demand",
  "Cost-effective alternative to full-time hiring",
  "End-to-end support from deployment to delivery",
  "Strong focus on quality, performance, and accountability",
  "Support for startups, SMBs, and enterprise clients",
  "Continuous monitoring and performance optimization",
];

const domains = [
  { icon: icons.fullstack,     label: "Full Stack, Frontend & Backend Development" },
  { icon: icons.cloud,         label: "Cloud, DevOps & Infrastructure" },
  { icon: icons.security,      label: "Cybersecurity & Compliance" },
  { icon: icons.data,          label: "Data Engineering, AI & Machine Learning" },
  { icon: icons.qa,            label: "QA & Automation Testing" },
  { icon: icons.design,        label: "UI/UX Design & Product Engineering" },
  { icon: icons.erp,           label: "ERP, CRM & Enterprise Applications" },
];

const industries = [
  { icon: icons.banking,       label: "Banking & Financial Services" },
  { icon: icons.health,        label: "Healthcare & Life Sciences" },
  { icon: icons.retail,        label: "Retail & E-commerce" },
  { icon: icons.manufacturing, label: "Manufacturing & Supply Chain" },
  { icon: icons.telecom,       label: "Telecommunications" },
  { icon: icons.startup,       label: "Startups & SMBs" },
  { icon: icons.enterprise,    label: "Enterprise & Government Projects" },
];

const benefits = [
  { num: "01", title: "Rapid Scalability",      desc: "Quickly scale your team up or down based on project demands without long-term commitments." },
  { num: "02", title: "Access to Top Talent",   desc: "Gain access to pre-vetted, highly skilled professionals with proven expertise in specific domains." },
  { num: "03", title: "Cost Efficiency",         desc: "Reduce recruitment, training, and operational overhead while maintaining high-quality output." },
  { num: "04", title: "Seamless Integration",   desc: "Our resources integrate effortlessly into your processes, tools, and culture." },
  { num: "05", title: "Faster Time-to-Market",  desc: "Accelerate project delivery with experienced professionals who can start contributing from day one." },
];

const businessValue = [
  { label: "Faster time-to-market",                       stat: "2×" },
  { label: "Reduced hiring & operational overhead",       stat: "60%" },
  { label: "Improved project efficiency & delivery speed",stat: "40%" },
  { label: "Access to niche and specialized skill sets",  stat: "200+" },
  { label: "Enhanced flexibility and scalability",        stat: "∞" },
];

const steps = [
  { num: "01", title: "Requirement Analysis",    desc: "Understand your technical and domain-specific needs in depth before we begin." },
  { num: "02", title: "Talent Matching",          desc: "Identify and deploy the best-fit resources from our curated, vetted talent pool." },
  { num: "03", title: "Onboarding & Integration", desc: "Ensure smooth alignment with your existing team, tools, and workflows." },
  { num: "04", title: "Performance Management",   desc: "Continuous monitoring and optimization to maintain delivery standards." },
  { num: "05", title: "Scalable Support",         desc: "Flexible engagement that adapts as your project requirements evolve." },
];

const whyMitraa = [
  "Strong focus on quality, reliability, and domain expertise",
  "Flexible engagement models tailored to your business",
  "Proven capability to support startups to large enterprises",
  "Commitment to long-term partnership and success",
];

/* ─────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────── */
export default function ResourceAugmentation() {
  return (
    <div className="ra-page">

      {/* ══════════════════════════════════════════
          HERO — lavender gradient bg + 3D visual
      ══════════════════════════════════════════ */}
      <section className="ra-hero">
        <div className="ra-hero__content">
          <span className="ra-pill">Premium IT Staffing Solutions</span>
          <h1 className="ra-hero__h1">
            Resource<br />
            <span className="ra-blue-text">Augmentation</span>
          </h1>
          <p className="ra-hero__tagline">
            Scale Faster. Operate Smarter. Deliver Without Limits.
          </p>
          <p className="ra-hero__body">
            At <strong>MY MiTRAA Technology Private Limited</strong>, we empower organizations to scale efficiently,
            accelerate delivery, and bridge skill gaps through our premium Resource Augmentation services.
          </p>
          <p className="ra-hero__body">
            In today's dynamic digital landscape, businesses require <strong>agile, skilled, and domain-specific
            talent</strong> without the overhead of long-term hiring cycles. We provide <strong>dedicated IT
            professionals</strong> tailored to your project needs, ensuring seamless integration with your existing
            teams and workflows.
          </p>
          <div className="ra-hero__actions">
            <a href="/contact"   className="ra-btn ra-btn--fill">Build Your Team <ArrowRight /></a>
            <a href="/portfolio" className="ra-btn ra-btn--ghost">View Portfolio</a>
          </div>
        </div>

        {/* 3D illustration right side */}
        <div className="ra-hero__visual">
          <div className="ra-hero__visual-card">
            <svg viewBox="0 0 380 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="ra-hero__svg">
              {/* bg */}
              <rect width="380" height="300" rx="20" fill="url(#heroCardBg)" />
              <defs>
                <linearGradient id="heroCardBg" x1="0" y1="0" x2="380" y2="300" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#dde0ff" />
                  <stop offset="1" stopColor="#c8d8fb" />
                </linearGradient>
              </defs>
              {/* wave */}
              <path d="M0 200 Q95 165 190 200 Q285 235 380 200 L380 300 L0 300Z" fill="rgba(115,122,255,0.18)"/>
              <path d="M0 225 Q95 195 190 225 Q285 255 380 225 L380 300 L0 300Z" fill="rgba(115,122,255,0.1)"/>
              {/* folder */}
              <rect x="60" y="110" width="170" height="120" rx="14" fill="#c7caff"/>
              <rect x="60" y="98"  width="72"  height="28"  rx="10" fill="#b0b5f8"/>
              <rect x="50" y="124" width="180" height="108" rx="14" fill="#dde0ff"/>
              {/* doc lines */}
              <rect x="80" y="150" width="96" height="9" rx="4" fill="rgba(115,122,255,0.4)"/>
              <rect x="80" y="167" width="76" height="7" rx="3" fill="rgba(115,122,255,0.25)"/>
              <rect x="80" y="181" width="86" height="7" rx="3" fill="rgba(115,122,255,0.25)"/>
              {/* shield */}
              <path d="M236 54 L274 68 L274 106 Q274 140 236 160 Q198 140 198 106 L198 68Z" fill="#7c82ff"/>
              <path d="M236 64 L266 76 L266 108 Q266 136 236 154 Q206 136 206 108 L206 76Z" fill="#a5a9ff"/>
              <path d="M222 108 L233 122 L254 90" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              {/* cloud */}
              <ellipse cx="98"  cy="112" rx="30" ry="20" fill="white" opacity="0.9"/>
              <ellipse cx="78"  cy="122" rx="20" ry="15" fill="white" opacity="0.9"/>
              <ellipse cx="116" cy="122" rx="20" ry="15" fill="white" opacity="0.9"/>
              {/* stats pill */}
              <rect x="26" y="178" width="110" height="32" rx="16" fill="white" opacity="0.85"/>
              <circle cx="46" cy="194" r="8" fill="#737aff"/>
              <rect x="60" y="188" width="60" height="6"  rx="3" fill="#c5c8ff"/>
              <rect x="60" y="198" width="42" height="5"  rx="2.5" fill="#dde0ff"/>
              {/* mini badge */}
              <rect x="246" y="172" width="100" height="30" rx="15" fill="white" opacity="0.85"/>
              <rect x="262" y="180" width="68" height="6" rx="3" fill="#737aff"/>
              <rect x="262" y="190" width="48" height="5" rx="2.5" fill="#c5c8ff"/>
            </svg>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          KEY HIGHLIGHTS — white bg, 2-col checklist
      ══════════════════════════════════════════ */}
      <section className="ra-sec ra-sec--white">
        <div className="ra-inner">
          <div className="ra-section-label">Key Highlights</div>
          <h2 className="ra-section-h2">
            Everything you need,<br />
            <span className="ra-blue-text">nothing you don't</span>
          </h2>
          <div className="ra-highlights-grid">
            {highlights.map((h) => (
              <div className="ra-highlight-item" key={h}>
                <CheckIcon />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DEDICATED RESOURCE MODEL — lavender bg, two-col
      ══════════════════════════════════════════ */}
      <section className="ra-sec ra-sec--lavender">
        <div className="ra-inner ra-two-col">
          <div className="ra-two-col__text">
            <div className="ra-section-label">Dedicated Resource Model</div>
            <h2 className="ra-section-h2">
              Your team,<br />
              <span className="ra-blue-text">extended</span>
            </h2>
            <p className="ra-body-text">
              We assign <strong>fully dedicated professionals</strong> who work as an extension of your internal
              team — ensuring ownership, accountability, and continuity on every project.
            </p>
            <p className="ra-body-text">
              We specialize in delivering <strong>highly skilled, domain-focused IT resources</strong> across
              industries and technologies. Our augmentation model enables you to <strong>onboard the right talent
              at the right time</strong>, aligned with your business goals.
            </p>
            <div className="ra-model-badges">
              <span className="ra-badge">Short-term Engagements</span>
              <span className="ra-badge">Long-term Engagements</span>
              <span className="ra-badge">Project-based</span>
              <span className="ra-badge">Full-time Dedicated</span>
            </div>
          </div>
          {/* visual dashboard mockup */}
          <div className="ra-two-col__visual">
            <div className="ra-dashboard">
              <div className="ra-dashboard__bar">
                <span className="ra-dot ra-dot--r"/><span className="ra-dot ra-dot--y"/><span className="ra-dot ra-dot--g"/>
                <span className="ra-dashboard__bar-label">Team Dashboard</span>
              </div>
              <div className="ra-dashboard__body">
                {[
                  { role: "React Engineer",    color: "#737aff", status: "Active" },
                  { role: "DevOps Lead",        color: "#5ee7d0", status: "Active" },
                  { role: "ML Specialist",      color: "#a78bfa", status: "Active" },
                  { role: "QA Automation",      color: "#60a5fa", status: "Active" },
                  { role: "UI/UX Designer",     color: "#f472b6", status: "Active" },
                ].map((r, i) => (
                  <div className="ra-team-row" key={r.role} style={{ animationDelay: `${i * 0.12}s` }}>
                    <div className="ra-team-row__av" style={{ background: r.color }}>{r.role[0]}</div>
                    <div className="ra-team-row__info">
                      <span className="ra-team-row__name">{r.role}</span>
                      <span className="ra-team-row__loc">Remote · MiTRAA</span>
                    </div>
                    <span className="ra-team-row__badge">Deployed</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DOMAINS & SKILLS — white bg, icon grid
      ══════════════════════════════════════════ */}
      <section className="ra-sec ra-sec--white">
        <div className="ra-inner">
          <div className="ra-section-label">Domains & Skills Coverage</div>
          <h2 className="ra-section-h2 ra-center">
            Multi-domain <span className="ra-blue-text">expertise</span>
          </h2>
          <p className="ra-body-text ra-center ra-max560">
            Our talent pool spans across all major IT domains — from software engineering to AI/ML,
            cloud infrastructure to enterprise applications.
          </p>
          <div className="ra-domains-grid">
            {domains.map((d) => (
              <div className="ra-domain-card" key={d.label}>
                <div className="ra-domain-card__icon">{d.icon}</div>
                <span className="ra-domain-card__label">{d.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          INDUSTRY COVERAGE — lavender bg, icon grid
      ══════════════════════════════════════════ */}
      <section className="ra-sec ra-sec--lavender">
        <div className="ra-inner">
          <div className="ra-section-label">Industry Coverage</div>
          <h2 className="ra-section-h2 ra-center">
            Resources tailored to <span className="ra-blue-text">every sector</span>
          </h2>
          <p className="ra-body-text ra-center ra-max560">
            We provide resources tailored to all sectors and business domains, ensuring deep industry alignment
            from day one.
          </p>
          <div className="ra-industry-grid">
            {industries.map((ind) => (
              <div className="ra-industry-card" key={ind.label}>
                <div className="ra-industry-card__icon">{ind.icon}</div>
                <span className="ra-industry-card__label">{ind.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          KEY BENEFITS — white bg, numbered cards
      ══════════════════════════════════════════ */}
      <section className="ra-sec ra-sec--white">
        <div className="ra-inner">
          <div className="ra-section-label">Key Benefits</div>
          <h2 className="ra-section-h2 ra-center">
            Built to <span className="ra-blue-text">deliver results</span>
          </h2>
          <div className="ra-benefits-grid">
            {benefits.map((b) => (
              <div className="ra-benefit-card" key={b.num}>
                <span className="ra-benefit-card__num">{b.num}</span>
                <h3 className="ra-benefit-card__title">{b.title}</h3>
                <p className="ra-benefit-card__desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          BUSINESS VALUE — lavender bg, stat strip
      ══════════════════════════════════════════ */}
      <section className="ra-sec ra-sec--lavender">
        <div className="ra-inner">
          <div className="ra-section-label">Business Value</div>
          <h2 className="ra-section-h2 ra-center">
            Measurable <span className="ra-blue-text">impact</span>
          </h2>
          <div className="ra-value-grid">
            {businessValue.map((v) => (
              <div className="ra-value-card" key={v.label}>
                <span className="ra-value-card__stat">{v.stat}</span>
                <p className="ra-value-card__label">{v.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ENGAGEMENT APPROACH — white bg, timeline
      ══════════════════════════════════════════ */}
      <section className="ra-sec ra-sec--white">
        <div className="ra-inner ra-two-col ra-two-col--flip">
          {/* left: heading + text */}
          <div className="ra-two-col__text">
            <div className="ra-section-label">Engagement Approach</div>
            <h2 className="ra-section-h2">
              From requirement<br />
              <span className="ra-blue-text">to delivery</span>
            </h2>
            <p className="ra-body-text">
              A structured, transparent process that gets the right professional working with your team as fast
              as possible — with continuous support throughout.
            </p>
            <a href="/contact" className="ra-btn ra-btn--fill" style={{ marginTop: "24px", display: "inline-flex" }}>
              Start the Process <ArrowRight />
            </a>
          </div>
          {/* right: steps */}
          <div className="ra-steps">
            {steps.map((s, i) => (
              <div className="ra-step" key={s.num}>
                <div className="ra-step__num">{s.num}</div>
                {i < steps.length - 1 && <div className="ra-step__line" />}
                <div className="ra-step__body">
                  <h4 className="ra-step__title">{s.title}</h4>
                  <p className="ra-step__desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHY MITRAA — lavender bg, checklist + pill grid
      ══════════════════════════════════════════ */}
      <section className="ra-sec ra-sec--lavender">
        <div className="ra-inner">
          <div className="ra-section-label">Why Choose MiTRAA</div>
          <h2 className="ra-section-h2 ra-center">
            The <span className="ra-blue-text">MiTRAA difference</span>
          </h2>
          <div className="ra-why-list">
            {whyMitraa.map((w) => (
              <div className="ra-why-item" key={w}>
                <CheckIcon />
                <span>{w}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA — white bg
      ══════════════════════════════════════════ */}
      <section className="ra-sec ra-sec--white ra-sec--cta">
        <div className="ra-inner ra-cta-inner">
          <h2 className="ra-cta__h2">
            Let's Build Your Team,<br />
            <span className="ra-blue-text">Together</span>
          </h2>
          <p className="ra-cta__sub">
            Whether you need a single expert or an entire team, MY MiTRAA Technology Private Limited delivers
            the right talent to help you innovate, scale, and succeed.
          </p>
          <p className="ra-cta__sub ra-cta__sub--em">
            Partner with us to transform your workforce into a competitive advantage.
          </p>
          <div className="ra-cta__actions">
            <a href="/contact"   className="ra-btn ra-btn--fill">Get Started <ArrowRight /></a>
            <a href="/portfolio" className="ra-btn ra-btn--ghost">View Portfolio</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
