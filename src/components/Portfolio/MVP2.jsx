import { useState, useEffect, useRef, useCallback } from "react";
import "./MVP.css";

/* ── Image Imports ── */
import imgCICD        from "../../assets/MVP/mvp-cicd-optimizer.png";
import imgFailure     from "../../assets/MVP/mvp-failure-prediction.png";
import imgGitOps      from "../../assets/MVP/mvp-gitops-drift.png";
import imgCostEngine  from "../../assets/MVP/mvp-cost-intelligence.png";
import imgPostmortem  from "../../assets/MVP/mvp-postmortem-narrator.png";
import imgSelfHeal    from "../../assets/MVP/mvp-self-healing.png";
import imgMaturity    from "../../assets/MVP/mvp-maturity-scoring.png";
import imgRiskRadar   from "../../assets/MVP/mvp-release-risk-radar.png";
import imgKnowledge   from "../../assets/MVP/mvp-knowledge-graph.png";
import imgCommandCtrl from "../../assets/MVP/mvp-command-center.png";
import imgCDOptimize  from "../../assets/MVP/mvp-cd-optimization.png";
import imgDevSecOps   from "../../assets/MVP/mvp-devsecops-agent.png";
import imgReleasePlan from "../../assets/MVP/mvp-release-planner.png";
import imgGenAIBot    from "../../assets/MVP/mvp-genai-bot.png";
import imgChaos       from "../../assets/MVP/mvp-chaos-engineering.png";
import imgKPIDash     from "../../assets/MVP/mvp-kpi-dashboard.png";
import imgAIOps       from "../../assets/MVP/mvp-aiops-cloud.png";
import imgMultiCloud  from "../../assets/MVP/mvp-multicloud-optimizer.png";

/* ── Category config ── */
const CATEGORIES = [
  { id: "all",            label: "All Solutions" },
  { id: "delivery",       label: "Delivery"      },
  { id: "risk",           label: "Risk"          },
  { id: "incident",       label: "Incident"      },
  { id: "infrastructure", label: "Infrastructure"},
  { id: "security",       label: "Security"      },
  { id: "cost",           label: "Cost"          },
  { id: "executive",      label: "Executive"     },
];

const CAT_STYLE = {
  delivery:       { bg: "#eef0ff", text: "#4338ca", dot: "#6366f1" },
  risk:           { bg: "#fffbeb", text: "#92400e", dot: "#f59e0b" },
  incident:       { bg: "#fff1f2", text: "#9f1239", dot: "#f43f5e" },
  infrastructure: { bg: "#f0fdfa", text: "#115e59", dot: "#14b8a6" },
  security:       { bg: "#f5f3ff", text: "#5b21b6", dot: "#8b5cf6" },
  cost:           { bg: "#f0fdf4", text: "#14532d", dot: "#22c55e" },
  executive:      { bg: "#f8fafc", text: "#334155", dot: "#64748b" },
};

/* ── MVP Data ── */
const MVPS = [
  {
    id: 1, img: imgCICD, category: "delivery",
    name: "Zero-Touch Pipelines",
    tagline: "Autonomous CI/CD Pipeline Optimizer",
    problem: "Slow, flaky pipelines eating your team's weekends",
    solution: "AI auto-optimizes every pipeline stage — parallelizes slow tests, removes redundant steps, and learns from every successful build.",
    before: { label: "Build Time", value: "47 min avg" },
    after:  { label: "Build Time", value: "27 min avg" },
    metric: "42% faster builds",
    integrations: ["GitHub Actions", "GitLab CI", "Jenkins"],
  },
  {
    id: 2, img: imgFailure, category: "risk",
    name: "Before It Breaks",
    tagline: "DevOps Failure Prediction Engine",
    problem: "Incidents discovered only after production is already on fire",
    solution: "Generates 'Do Not Deploy' warnings with confidence scores before deployment — based on velocity metrics, commit patterns and infra signals.",
    before: { label: "Discovery", value: "After impact" },
    after:  { label: "Discovery", value: "Before deploy" },
    metric: "30% fewer rollbacks",
    integrations: ["Git", "Datadog", "Prometheus"],
  },
  {
    id: 3, img: imgGitOps, category: "infrastructure",
    name: "Config Drift Catcher",
    tagline: "GitOps Drift & Configuration Intelligence",
    problem: "IaC drift silently causing compliance violations and outages",
    solution: "Tracks every infrastructure change, explains why it matters, and auto-generates a 1-click fix PR before it becomes an incident.",
    before: { label: "Drift Found", value: "In production" },
    after:  { label: "Drift Found", value: "In code review" },
    metric: "Zero config outages",
    integrations: ["Terraform", "Helm", "Kubernetes"],
  },
  {
    id: 4, img: imgCostEngine, category: "cost",
    name: "DevOps Cost X-Ray",
    tagline: "DevOps Cost Intelligence Engine",
    problem: "Your cloud bill spikes but nobody knows which deployment caused it",
    solution: "Maps every pipeline and rollback to cloud spend spikes. Shows cost per deployment, highlights waste from failed releases.",
    before: { label: "Visibility", value: "Monthly shock" },
    after:  { label: "Visibility", value: "Per-deploy" },
    metric: "20% less cloud waste",
    integrations: ["AWS Billing", "Azure Cost", "CI/CD"],
  },
  {
    id: 5, img: imgPostmortem, category: "incident",
    name: "Postmortems in Minutes",
    tagline: "AI-Driven Incident Root Cause Narrator",
    problem: "Postmortems take 5 days, are blame-heavy, and lessons get ignored",
    solution: "Auto-generates blameless incident timelines and root cause hypotheses by synthesizing deploy logs, infra changes, and config diffs.",
    before: { label: "Postmortem", value: "3–5 days" },
    after:  { label: "Postmortem", value: "< 5 minutes" },
    metric: "85% root cause accuracy",
    integrations: ["PagerDuty", "Jira", "Datadog"],
  },
  {
    id: 6, img: imgSelfHeal, category: "incident",
    name: "Self-Healing Infra",
    tagline: "Self-Healing Infrastructure Playbook Engine",
    problem: "Auto-healing is hardcoded, fragile, and always one step behind",
    solution: "AI learns past successful fixes and matches them to current anomaly patterns — recommends and executes restarts, scaling, rollbacks.",
    before: { label: "On-Call", value: "Manual" },
    after:  { label: "On-Call", value: "Auto-healed" },
    metric: "50% lower MTTR",
    integrations: ["Kubernetes", "PagerDuty", "Prometheus"],
  },
  {
    id: 7, img: imgMaturity, category: "executive",
    name: "DevOps Report Card",
    tagline: "DevOps Readiness & Maturity Scoring Platform",
    problem: "Leadership has no quantitative measure of DevOps maturity",
    solution: "Scores pipeline maturity, SRE readiness, and release frequency against industry benchmarks — outputs an executive-ready report.",
    before: { label: "View", value: "Gut feeling" },
    after:  { label: "View", value: "Benchmarked" },
    metric: "Instant budget justification",
    integrations: ["DORA metrics", "Git metadata"],
  },
  {
    id: 8, img: imgRiskRadar, category: "risk",
    name: "Release Risk Radar",
    tagline: "Release Risk Radar — Change Impact Intelligence",
    problem: "Every change gets the same manual review regardless of actual risk",
    solution: "Assigns dynamic risk scores per release based on code complexity, blast radius, and team history with smart gates.",
    before: { label: "Reviews", value: "Same for all" },
    after:  { label: "Reviews", value: "Risk-scored" },
    metric: "2× faster safe delivery",
    integrations: ["Git diff", "Dependency maps"],
  },
  {
    id: 9, img: imgKnowledge, category: "executive",
    name: "Institutional Memory",
    tagline: "DevOps Knowledge Graph",
    problem: "Senior engineer leaves — half your infrastructure knowledge walks out",
    solution: "Builds a living knowledge graph of pipelines, infra, dependencies. Query in plain English: 'What breaks if I change this service?'",
    before: { label: "Knowledge", value: "In heads" },
    after:  { label: "Knowledge", value: "Queryable graph" },
    metric: "Zero knowledge loss",
    integrations: ["Repos", "IaC", "Org directories"],
  },
  {
    id: 10, img: imgCommandCtrl, category: "executive",
    name: "Exec Command Center",
    tagline: "DevOps Command Center — Exec-Friendly",
    problem: "CTOs see 200 metrics but can't tell which ones mean revenue at risk",
    solution: "Translates DevOps data into revenue protection metrics with business risk scores and boardroom-ready insights.",
    before: { label: "Exec View", value: "Overload" },
    after:  { label: "Exec View", value: "Risk score" },
    metric: "Boardroom-ready insights",
    integrations: ["DORA metrics", "Revenue APIs"],
  },
  {
    id: 11, img: imgCDOptimize, category: "delivery",
    name: "CD Velocity Engine",
    tagline: "AI-Driven Continuous Delivery Optimization",
    problem: "Unpredictable release timelines and manual bottlenecks killing velocity",
    solution: "AI auto-tunes CD workflows for optimal throughput — fixes flaky tests, triggers smart rollbacks, and smooths delivery everywhere.",
    before: { label: "Releases", value: "Unpredictable" },
    after:  { label: "Releases", value: "Consistent" },
    metric: "Regulated sector ready",
    integrations: ["Spinnaker", "ArgoCD", "GitLab"],
  },
  {
    id: 12, img: imgDevSecOps, category: "security",
    name: "DevSecOps Shield",
    tagline: "AI-Powered DevSecOps Agent",
    problem: "Security is bolted on at the end — breaches from misconfig are costly",
    solution: "Automated threat detection built into CI/CD with LLM-powered auto-remediation PRs and compliance enforcement on every commit.",
    before: { label: "Security", value: "End-of-pipe" },
    after:  { label: "Security", value: "Every commit" },
    metric: "SOC2 / HIPAA maintained",
    integrations: ["SonarQube", "Snyk", "GH Security"],
  },
  {
    id: 13, img: imgReleasePlan, category: "cost",
    name: "Release Cost Forecaster",
    tagline: "Intelligent Release Planner with Cost Forecasting",
    problem: "Manual release estimation causes budget surprises every quarter",
    solution: "Forecasts cloud and deployment costs with what-if modeling for CFO-level budget predictability and quarterly planning.",
    before: { label: "Planning", value: "Guesswork" },
    after:  { label: "Planning", value: "AI forecast" },
    metric: "CFO-level buy-in",
    integrations: ["Jira", "AWS/GCP Cost Explorer"],
  },
  {
    id: 14, img: imgGenAIBot, category: "delivery",
    name: "Your AI SRE Buddy",
    tagline: "Conversational AI for DevOps Support",
    problem: "Platform teams buried in repetitive support questions all day",
    solution: "A smart Slack/Teams chatbot that acts like a senior SRE — natural language troubleshooting, deployment automation, instant answers.",
    before: { label: "Support", value: "Queue wait" },
    after:  { label: "Support", value: "Instant answer" },
    metric: "Scales IDPs without headcount",
    integrations: ["Slack", "MS Teams", "Vector DB"],
  },
  {
    id: 15, img: imgChaos, category: "infrastructure",
    name: "Smart Chaos Lab",
    tagline: "AI-Driven Chaos Engineering Automation",
    problem: "Resilience testing is manual, risky, and always gets deprioritized",
    solution: "Automates intelligent chaos tests based on AI-learned risk profiles with dynamic failure scenarios in safe sandboxes.",
    before: { label: "Tests", value: "Skipped" },
    after:  { label: "Tests", value: "Continuous" },
    metric: "Proactive resilience coverage",
    integrations: ["Gremlin", "Chaos Mesh", "Datadog"],
  },
  {
    id: 16, img: imgKPIDash, category: "executive",
    name: "KPI Intelligence Hub",
    tagline: "DevOps KPI & AI Insights Dashboard",
    problem: "DevOps metrics are siloed, contextless, and never drive decisions",
    solution: "Applies predictive analytics and anomaly detection to standard KPIs with automated hourly contextual suggestions.",
    before: { label: "Metrics", value: "Siloed" },
    after:  { label: "Metrics", value: "Actionable" },
    metric: "Better eng decisions daily",
    integrations: ["Jira", "GitHub", "CI/CD metadata"],
  },
  {
    id: 17, img: imgAIOps, category: "infrastructure",
    name: "AIOps Autopilot",
    tagline: "Automated AIOps for Cloud Infrastructure",
    problem: "Cloud anomalies go unnoticed until they become full-blown outages",
    solution: "AI-based detection for cloud performance anomalies with auto-remediation, real-time auto-scaling, and healing triggers 24/7.",
    before: { label: "Issues", value: "Found in outages" },
    after:  { label: "Issues", value: "Caught proactively" },
    metric: "Self-healing infrastructure",
    integrations: ["CloudWatch", "Azure Monitor", "GCP Ops"],
  },
  {
    id: 18, img: imgMultiCloud, category: "cost",
    name: "Multi-Cloud Maestro",
    tagline: "Multi-Cloud Intelligent Load Optimizer",
    problem: "Multi-cloud complexity inflates costs and kills global performance",
    solution: "Smart resource placement and SLA-aware load balancing across all providers — forecasts traffic, pauses idle nodes globally.",
    before: { label: "Multi-Cloud", value: "Fragmented" },
    after:  { label: "Multi-Cloud", value: "Unified" },
    metric: "Stronger SLAs, lower cost",
    integrations: ["Cloud LBs", "K8s Ingress"],
  },
];

/* ── Intersection observer hook ── */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

/* ── MVP Card Component ── */
function MVPCard({ mvp, index }) {
  const [ref, inView] = useInView(0.06);
  const col = CAT_STYLE[mvp.category] || CAT_STYLE.executive;
  const catLabel = CATEGORIES.find(c => c.id === mvp.category)?.label || mvp.category;

  return (
    <article
      ref={ref}
      className={`mvpc ${inView ? "mvpc--visible" : ""}`}
      style={{ "--dot": col.dot, "--bg": col.bg, "--txt": col.text, animationDelay: `${(index % 4) * 65}ms` }}
    >
      <div className="mvpc__img-zone">
        <img src={mvp.img} alt={mvp.name} className="mvpc__img" loading="lazy" />
        <div className="mvpc__img-overlay">
          <p className="mvpc__solution-peek">{mvp.solution}</p>
        </div>
        <span className="mvpc__cat-pill">
          <span className="mvpc__cat-dot" />
          {catLabel}
        </span>
        <span className="mvpc__id-badge">{String(mvp.id).padStart(2, "0")}</span>
      </div>

      <div className="mvpc__body">
        <div className="mvpc__title-block">
          <h3 className="mvpc__name">{mvp.name}</h3>
          <p className="mvpc__tagline">{mvp.tagline}</p>
        </div>

        <div className="mvpc__problem">
          <span className="mvpc__problem-eyebrow">The Problem</span>
          <span className="mvpc__problem-text">{mvp.problem}</span>
        </div>

        <div className="mvpc__compare">
          <div className="mvpc__compare-side">
            <span className="mvpc__compare-tag mvpc__compare-tag--before">Before</span>
            <span className="mvpc__compare-val mvpc__compare-val--before">{mvp.before.value}</span>
            <span className="mvpc__compare-sub">{mvp.before.label}</span>
          </div>
          <div className="mvpc__compare-arrow">→</div>
          <div className="mvpc__compare-side">
            <span className="mvpc__compare-tag mvpc__compare-tag--after">After</span>
            <span className="mvpc__compare-val mvpc__compare-val--after">{mvp.after.value}</span>
            <span className="mvpc__compare-sub">{mvp.after.label}</span>
          </div>
        </div>

        <div className="mvpc__footer">
          <span className="mvpc__metric">✦ {mvp.metric}</span>
          <div className="mvpc__tags">
            {mvp.integrations.map((t, i) => (
              <span key={i} className="mvpc__tag">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

/* ── Slider Component ── */
function MVPSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("next");
  const [headerRef, headerIn] = useInView(0.1);

  const mvp = MVPS[currentIndex];
  const col = CAT_STYLE[mvp.category] || CAT_STYLE.executive;
  const catLabel = CATEGORIES.find(c => c.id === mvp.category)?.label || mvp.category;

  const goTo = useCallback((nextIndex, dir = "next") => {
    if (animating) return;
    setAnimating(true);
    setDirection(dir);
    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setAnimating(false);
    }, 420);
  }, [animating]);

  const goPrev = () => {
    const prev = (currentIndex - 1 + MVPS.length) % MVPS.length;
    goTo(prev, "prev");
  };

  const goNext = () => {
    const next = (currentIndex + 1) % MVPS.length;
    goTo(next, "next");
  };

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [currentIndex, animating]);

  return (
    <div className="fp-section">
      {/* Ambient glow that follows category color */}
      <div
        className="fp-glow"
        style={{ "--glow-color": col.dot }}
      />

      {/* Header */}
      <div
        ref={headerRef}
        className={`fp-header ${headerIn ? "fp-header--in" : ""}`}
      >
        <p className="fp-eyebrow">
          <span className="fp-eyebrow-line" />
          Future Platforms
        </p>
        <h2 className="fp-title">
          Beyond what<br />
          <em>we've built</em>
        </h2>
        <p className="fp-subtitle">
          Each platform solves a distinct DevOps crisis — explore them one by one.
        </p>
      </div>

      {/* Slider */}
      <div className="fp-slider-wrap">
        <div className="fp-slider">

          {/* ── Left: Text ── */}
          <div
            className={`fp-slide-left ${animating ? `fp-slide-left--exit-${direction}` : "fp-slide-left--enter"}`}
            key={`left-${currentIndex}`}
          >
            {/* Category + index */}
            <div className="fp-slide-meta">
              <span
                className="fp-slide-cat"
                style={{ background: `${col.dot}18`, color: col.dot, borderColor: `${col.dot}40` }}
              >
                <span className="fp-slide-cat-dot" style={{ background: col.dot }} />
                {catLabel}
              </span>
              <span className="fp-slide-index">
                {String(currentIndex + 1).padStart(2, "0")} / {String(MVPS.length).padStart(2, "0")}
              </span>
            </div>

            {/* Name */}
            <h3 className="fp-slide-name">{mvp.name}</h3>

            {/* Tagline */}
            <p className="fp-slide-tagline">{mvp.tagline}</p>

            {/* Divider */}
            <div className="fp-slide-divider" style={{ background: col.dot }} />

            {/* Description */}
            <p className="fp-slide-desc">{mvp.solution}</p>

            {/* Big metric */}
            <div className="fp-slide-metric" style={{ borderColor: `${col.dot}30`, background: `${col.dot}0c` }}>
              <span className="fp-slide-metric-value" style={{ color: col.dot }}>
                ✦ {mvp.metric}
              </span>
            </div>

            {/* Before / After */}
            <div className="fp-slide-compare">
              <div className="fp-slide-compare-item fp-slide-compare-item--before">
                <span className="fp-slide-compare-label">Before</span>
                <span className="fp-slide-compare-val">{mvp.before.value}</span>
              </div>
              <div className="fp-slide-compare-arrow" style={{ color: col.dot }}>→</div>
              <div className="fp-slide-compare-item fp-slide-compare-item--after">
                <span className="fp-slide-compare-label" style={{ color: col.dot }}>After</span>
                <span className="fp-slide-compare-val fp-slide-compare-val--after" style={{ color: col.dot }}>
                  {mvp.after.value}
                </span>
              </div>
            </div>

            {/* Integrations */}
            <div className="fp-slide-integrations">
              {mvp.integrations.map((t, i) => (
                <span key={i} className="fp-slide-tag">{t}</span>
              ))}
            </div>
          </div>

          {/* ── Right: Image ── */}
          <div
            className={`fp-slide-right ${animating ? `fp-slide-right--exit-${direction}` : "fp-slide-right--enter"}`}
            key={`right-${currentIndex}`}
          >
            <div className="fp-slide-img-frame" style={{ "--accent": col.dot }}>
              <img
                src={mvp.img}
                alt={mvp.name}
                className="fp-slide-img"
              />
              <div className="fp-slide-img-shine" />
            </div>
          </div>
        </div>

        {/* ── Nav buttons ── */}
        <button
          className="fp-nav fp-nav--prev"
          onClick={goPrev}
          aria-label="Previous"
          style={{ "--accent": col.dot }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          className="fp-nav fp-nav--next"
          onClick={goNext}
          aria-label="Next"
          style={{ "--accent": col.dot }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* ── Dot indicators ── */}
      <div className="fp-dots">
        {MVPS.map((m, i) => {
          const dotCol = CAT_STYLE[m.category]?.dot || "#737aff";
          return (
            <button
              key={i}
              className={`fp-dot ${i === currentIndex ? "fp-dot--active" : ""}`}
              onClick={() => goTo(i, i > currentIndex ? "next" : "prev")}
              aria-label={`Go to slide ${i + 1}`}
              style={i === currentIndex ? { background: dotCol, transform: "scale(1.4)" } : {}}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ── Main Component ── */
export default function MVP() {
  const [active, setActive] = useState("all");
  const [headerRef, headerIn] = useInView(0.15);

  const filtered = active === "all"
    ? MVPS
    : MVPS.filter(m => m.category === active);

  return (
    <>
    
      <MVPSlider />

      
      <section className="mvp-sec" id="mvp-solutions">

        {/* ── Header ── */}
        <div ref={headerRef} className={`mvp-sec__header ${headerIn ? "mvp-sec__header--in" : ""}`}>
          <div className="mvp-sec__header-inner">
            <p className="mvp-sec__eyebrow">
              <span className="mvp-sec__eyebrow-line" />
              What We Build
            </p>
            <h2 className="mvp-sec__title">
              18 AI-Powered Solutions<br />
              <span className="mvp-sec__title-em">for Modern DevOps Teams</span>
            </h2>
            <p className="mvp-sec__subtitle">
              Each product targets a specific DevOps pain point costing enterprises
              real money, real time, and real sleep. Filter by focus area or explore all 18.
            </p>
          </div>

          {/* Stat chips */}
          <div className="mvp-sec__stats">
            {[
              { v: "42%",    l: "Faster Builds"      },
              { v: "50%",    l: "Lower MTTR"          },
              { v: "30%",    l: "Fewer Rollbacks"     },
              { v: "5 min",  l: "vs 5-day Postmortem" },
            ].map((s, i) => (
              <div key={i} className="mvp-sec__stat">
                <strong>{s.v}</strong>
                <span>{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Filter bar ── */}
        <div className="mvp-sec__filters">
          <div className="mvp-sec__filters-inner">
            {CATEGORIES.map(c => {
              const cnt = c.id === "all"
                ? MVPS.length
                : MVPS.filter(m => m.category === c.id).length;
              const col = CAT_STYLE[c.id] || {};
              const isActive = active === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setActive(c.id)}
                  className={`mvp-sec__filter ${isActive ? "mvp-sec__filter--on" : ""}`}
                  style={isActive
                    ? { background: col.bg, color: col.text, borderColor: col.dot }
                    : {}
                  }
                >
                  {isActive && (
                    <span className="mvp-sec__filter-pip" style={{ background: col.dot }} />
                  )}
                  {c.label}
                  <span className="mvp-sec__filter-n">{cnt}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Grid ── */}
        <div className="mvp-sec__grid-wrap">
          <p className="mvp-sec__grid-eyebrow">Explore all concepts</p>
          <div className="mvp-sec__grid">
            {filtered.map((m, i) => (
              <MVPCard key={m.id} mvp={m} index={i} />
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="mvp-sec__cta-wrap">
          <div className="mvp-sec__cta">
            <div className="mvp-sec__cta-left">
              <p className="mvp-sec__cta-eyebrow">Recommended starting point</p>
              <h3 className="mvp-sec__cta-title">
                Start with the <em>Zero-Touch Delivery Wedge</em>
              </h3>
              <p className="mvp-sec__cta-body">
                MVPs 1, 2 &amp; 8 combined — fastest time-to-value, minimal systemic
                intrusion, highest enterprise ROI.
              </p>
            </div>
            <div className="mvp-sec__cta-chips">
              {[
                { l: "Zero-Touch Pipelines", cat: "delivery"  },
                { l: "Failure Prediction",   cat: "risk"      },
                { l: "Release Risk Radar",   cat: "risk"      },
              ].map((c, i) => {
                const col = CAT_STYLE[c.cat];
                return (
                  <div key={i} className="mvp-sec__chip" style={{ borderColor: col.dot, background: col.bg }}>
                    <span className="mvp-sec__chip-dot" style={{ background: col.dot }} />
                    <span style={{ color: col.text }}>{c.l}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </section>
    </>
  );
}
