import { useState, useEffect, useRef, useCallback } from "react";
import "./MVP.css";

/* ── Image Imports ── */
import imgCICD        from "../../assets/Mvp/mvp-cicd-optimizer.webp";
import imgFailure     from "../../assets/Mvp/mvp-failure-prediction.webp";
import imgGitOps      from "../../assets/Mvp/mvp-gitops-drift.webp";
import imgCostEngine  from "../../assets/Mvp/mvp-cost-intelligence.webp";
import imgPostmortem  from "../../assets/Mvp/mvp-postmortem-narrator.webp";
import imgSelfHeal    from "../../assets/Mvp/mvp-self-healing.webp";
import imgMaturity    from "../../assets/Mvp/mvp-maturity-scoring.webp";
import imgRiskRadar   from "../../assets/Mvp/mvp-release-risk-radar.webp";
import imgKnowledge   from "../../assets/Mvp/mvp-knowledge-graph.webp";
import imgCommandCtrl from "../../assets/Mvp/mvp-command-center.webp";
import imgCDOptimize  from "../../assets/Mvp/mvp-cd-optimization.webp";
import imgDevSecOps   from "../../assets/Mvp/mvp-devsecops-agent.webp";
import imgReleasePlan from "../../assets/Mvp/mvp-release-planner.webp";
import imgGenAIBot    from "../../assets/Mvp/mvp-genai-bot.webp";
import imgChaos       from "../../assets/Mvp/mvp-chaos-engineering.webp";
import imgKPIDash     from "../../assetMvp/mvp-kpi-dashboard.webp";
import imgAIOps       from "../../assets/Mvp/mvp-aiops-cloud.webp";
import imgMultiCloud  from "../../assets/Mvp/mvp-multicloud-optimizer.webp";

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
    name: "Autonomous CI/CD Pipeline Optimizer",
    tagline: "Zero-Touch Pipelines",
    problem: "Pipelines are slow, flaky, and maintained by tribal knowledge.",
    solution: "AI-assisted engine that auto-optimizes stages without human intervention — removes redundant steps, parallelizes slow tests, and learns from every successful build.",
    before: { label: "Build Time", value: "47 min avg" },
    after:  { label: "Build Time", value: "27 min avg" },
    metric: "42% reduction in build time",
    integrations: ["GitHub Actions", "GitLab CI", "Jenkins"],
  },
  {
    id: 2, img: imgFailure, category: "risk",
    name: "DevOps Failure Prediction Engine",
    tagline: "Before It Breaks",
    problem: "Incidents are only discovered after production impact.",
    solution: "AI predicts deployment failures and upcoming outages before they occur — generates 'Do Not Deploy' warnings with confidence scores based on velocity and infra metrics.",
    before: { label: "Discovery", value: "After impact" },
    after:  { label: "Discovery", value: "Before deploy" },
    metric: "Massive reduction in CFR & SEV-1s",
    integrations: ["Git commits", "Datadog", "Prometheus"],
  },
  {
    id: 3, img: imgGitOps, category: "infrastructure",
    name: "GitOps Drift & Configuration Intelligence Platform",
    tagline: "Config Drift Catcher",
    problem: "IaC drift causes security issues and compliance violations.",
    solution: "Tracks and explains drift with impact-based insights — explains what changed, why it matters, and provides a 1-click fix PR instead of noisy alerts.",
    before: { label: "Drift Found", value: "In production" },
    after:  { label: "Drift Found", value: "In code review" },
    metric: "Prevents config-based outages",
    integrations: ["Terraform", "Helm", "Kubernetes"],
  },
  {
    id: 4, img: imgCostEngine, category: "cost",
    name: "DevOps Cost Intelligence Engine",
    tagline: "Not FinOps — DevOps Cost X-Ray",
    problem: "Traditional cloud cost tools don't map to specific DevOps deployment behaviors.",
    solution: "Maps specific pipelines and rollbacks directly to cloud spend spikes — shows cost per deployment and highlights wasted infrastructure from failed releases.",
    before: { label: "Visibility", value: "Monthly shock" },
    after:  { label: "Visibility", value: "Per-deploy" },
    metric: "Actionable cost control in engineering workflow",
    integrations: ["AWS Billing", "Azure Billing", "CI/CD markers"],
  },
  {
    id: 5, img: imgPostmortem, category: "incident",
    name: "AI-Driven Incident Root Cause Narrator",
    tagline: "Postmortems in Minutes",
    problem: "Postmortems are late, incomplete, and blame-heavy.",
    solution: "Auto-generates blameless incident timelines and root cause hypotheses by synthesizing deploy logs, infra changes, and config diffs into a complete document.",
    before: { label: "Postmortem", value: "5 days" },
    after:  { label: "Postmortem", value: "5 minutes" },
    metric: "Cuts postmortem time by 99%",
    integrations: ["PagerDuty", "Jira", "Datadog", "Git logs"],
  },
  {
    id: 6, img: imgSelfHeal, category: "incident",
    name: "Self-Healing Infrastructure Playbook Engine",
    tagline: "Heal Before On-Call Wakes Up",
    problem: "Auto-healing is traditionally hard-coded, fragile, and reactive.",
    solution: "AI recommends and executes learned healing actions (restart, scale, rollback) — learns past successful fixes and matches them to current anomaly patterns.",
    before: { label: "On-Call", value: "Manual wake-up" },
    after:  { label: "On-Call", value: "Auto-healed" },
    metric: "Lower MTTR, drastically reduced on-call fatigue",
    integrations: ["Kubernetes APIs", "Observability metrics", "PagerDuty"],
  },
  {
    id: 7, img: imgMaturity, category: "executive",
    name: "DevOps Readiness & Maturity Scoring Platform",
    tagline: "Your DevOps Report Card",
    problem: "Leadership lacks a quantitative measure of their DevOps maturity.",
    solution: "Scores pipeline maturity, SRE readiness, and release frequency against industry benchmarks — outputs an automated executive readiness report.",
    before: { label: "Maturity View", value: "Gut feeling" },
    after:  { label: "Maturity View", value: "Benchmarked score" },
    metric: "Opens enterprise budget conversations",
    integrations: ["DORA metrics", "Git metadata", "Questionnaire"],
  },
  {
    id: 8, img: imgRiskRadar, category: "risk",
    name: "Release Risk Radar",
    tagline: "Change Impact Intelligence",
    problem: "All changes are treated with the same manual review rigor, slowing down safe changes.",
    solution: "Assigns dynamic risk scores per release based on code complexity and blast radius — automated 'Deploy now / Delay / Canary recommended' gating.",
    before: { label: "Reviews", value: "Same for all" },
    after:  { label: "Reviews", value: "Risk-gated" },
    metric: "Safely accelerates delivery velocity",
    integrations: ["Git diff", "Team success rates", "Dependency maps"],
  },
  {
    id: 9, img: imgKnowledge, category: "executive",
    name: "DevOps Knowledge Graph",
    tagline: "Institutional Memory",
    problem: "Senior engineer turnover causes institutional DevOps collapse.",
    solution: "Builds a living knowledge graph of pipelines, infra, dependencies, and owners — supports natural language querying like 'What breaks if I change this service?'",
    before: { label: "Knowledge", value: "In people's heads" },
    after:  { label: "Knowledge", value: "Queryable graph" },
    metric: "Eliminates single points of failure in personnel",
    integrations: ["Source repos", "IaC", "Org directories"],
  },
  {
    id: 10, img: imgCommandCtrl, category: "executive",
    name: "DevOps Command Center",
    tagline: "Exec-Friendly Risk Dashboard",
    problem: "Executives see dashboards but cannot translate them into business risk.",
    solution: "Translates DevOps data into revenue protection and risk exposure metrics — high-level widgets like 'Deploying now increases outage risk by 28% during peak'.",
    before: { label: "Exec View", value: "Metric overload" },
    after:  { label: "Exec View", value: "Revenue risk score" },
    metric: "Bridges engineering metrics to boardroom decisions",
    integrations: ["DORA metrics", "Revenue APIs"],
  },
  {
    id: 11, img: imgCDOptimize, category: "delivery",
    name: "AI-Driven Continuous Delivery Optimization Platform",
    tagline: "CD Velocity Engine",
    problem: "Unpredictable release timelines and manual release bottlenecks.",
    solution: "AI auto-tunes CD workflows for optimal throughput across environments — smart recommendations to fix flaky tests and automated rollback triggers.",
    before: { label: "Releases", value: "Unpredictable" },
    after:  { label: "Releases", value: "Consistent velocity" },
    metric: "Consistent delivery in highly regulated sectors",
    integrations: ["Spinnaker", "ArgoCD", "GitLab"],
  },
  {
    id: 12, img: imgDevSecOps, category: "security",
    name: "AI-Powered DevSecOps Agent",
    tagline: "Security at Every Commit",
    problem: "Security is an afterthought, and breaches from misconfigurations are costly.",
    solution: "Automated threat detection and fix suggestions built directly into CI/CD — LLM-powered auto-remediation PRs and compliance policy enforcement on every commit.",
    before: { label: "Security", value: "End-of-pipe" },
    after:  { label: "Security", value: "Every commit" },
    metric: "Closes gaps, maintains HIPAA/SOC2 compliance",
    integrations: ["SonarQube", "Snyk", "GitHub Advanced Security"],
  },
  {
    id: 13, img: imgReleasePlan, category: "cost",
    name: "Intelligent Release Planner with Cost Forecasting",
    tagline: "Predict Before You Spend",
    problem: "Manual release estimation leads to over/under-utilized resources.",
    solution: "Forecasts cloud and deployment costs and optimizes schedules via AI — what-if modeling for resource optimization and predictive cost charting.",
    before: { label: "Budget Planning", value: "Guesswork" },
    after:  { label: "Budget Planning", value: "AI forecast" },
    metric: "Predictable budgets that secure CFO-level buy-in",
    integrations: ["Jira", "Linear", "AWS/GCP Cost Explorer"],
  },
  {
    id: 14, img: imgGenAIBot, category: "delivery",
    name: "Conversational AI for DevOps Support",
    tagline: "GenAI Bot — Your AI SRE",
    problem: "Platform teams are bogged down answering repetitive support queries.",
    solution: "A smart Slack/Teams chatbot that acts like a human SRE — natural language troubleshooting and deployment automation via chat.",
    before: { label: "Support", value: "Ticket queue" },
    after:  { label: "Support", value: "Instant answer" },
    metric: "Reduces human dependency, scales IDPs",
    integrations: ["Slack", "MS Teams", "Vector DB"],
  },
  {
    id: 15, img: imgChaos, category: "infrastructure",
    name: "AI-Driven Chaos Engineering Automation",
    tagline: "Smart Chaos Lab",
    problem: "Resilience testing is manual, risky, and hard to schedule.",
    solution: "Automates intelligent chaos tests based on AI-learned risk profiles — generates failure scenarios and infrastructure stress tests dynamically.",
    before: { label: "Resilience Tests", value: "Skipped / manual" },
    after:  { label: "Resilience Tests", value: "Continuous & safe" },
    metric: "Proactive resilience with minimal manual effort",
    integrations: ["Gremlin", "Chaos Mesh", "Datadog"],
  },
  {
    id: 16, img: imgKPIDash, category: "executive",
    name: "DevOps KPI & AI Insights Dashboard",
    tagline: "Metrics That Actually Mean Something",
    problem: "DevOps metrics are siloed and meaningless without context.",
    solution: "Applies predictive analytics and anomaly detection to standard KPIs — hourly delivery velocity trends and automated contextual suggestions.",
    before: { label: "Metrics", value: "Siloed & ignored" },
    after:  { label: "Metrics", value: "Actionable insights" },
    metric: "Real insights driving better engineering decisions",
    integrations: ["Jira", "GitHub", "CI/CD metadata"],
  },
  {
    id: 17, img: imgAIOps, category: "infrastructure",
    name: "Automated AIOps for Cloud Infrastructure",
    tagline: "Cloud Autopilot",
    problem: "Cloud anomalies go unnoticed until they become full-blown outages.",
    solution: "AI-based detection for cloud performance anomalies with auto-remediation — real-time anomaly detection, auto-scaling, and healing triggers 24/7.",
    before: { label: "Cloud Issues", value: "Found in outages" },
    after:  { label: "Cloud Issues", value: "Caught proactively" },
    metric: "Premium self-healing cloud management",
    integrations: ["AWS CloudWatch", "Azure Monitor", "GCP Operations"],
  },
  {
    id: 18, img: imgMultiCloud, category: "cost",
    name: "Multi-Cloud Intelligent Load Optimizer",
    tagline: "Multi-Cloud Maestro",
    problem: "Multi-cloud complexity kills performance and inflates costs.",
    solution: "Smart resource placement and load balancing across providers — SLA-aware load distribution, forecasted traffic predictions, and idle node pausing.",
    before: { label: "Multi-Cloud", value: "Fragmented & costly" },
    after:  { label: "Multi-Cloud", value: "Unified & optimized" },
    metric: "Lower multi-cloud costs, stronger global SLAs",
    integrations: ["Cloud load balancers", "K8s Ingress"],
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
    }, 700);
  }, [animating]);

  const goPrev = useCallback(() => {
    const prev = (currentIndex - 1 + MVPS.length) % MVPS.length;
    goTo(prev, "prev");
  }, [currentIndex, goTo]);

  const goNext = useCallback(() => {
    const next = (currentIndex + 1) % MVPS.length;
    goTo(next, "next");
  }, [currentIndex, goTo]);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => { goNext(); }, 3700);
    return () => clearInterval(timer);
  }, [goNext]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goPrev, goNext]);

  return (
    <div className="fp-section">
      {/* Ambient glow */}
      <div className="fp-glow" style={{ "--glow-color": col.dot }} />

      {/* ── Compact inline header ── */}
      <div
        ref={headerRef}
        className={`fp-header ${headerIn ? "fp-header--in" : ""}`}
      >
        <div className="fp-header-row">
          <p className="fp-eyebrow">
            <span className="fp-eyebrow-line" />
            Future Platforms
          </p>
          <div className="fp-title-inline">
            <h2 className="fp-title">
              Beyond what <em>we've built</em>
            </h2>
            <p className="fp-subtitle">
              Each platform solves a distinct DevOps crisis — explore them one by one.
            </p>
          </div>
        </div>
      </div>

      {/* Slider */}
      <div className="fp-slider-wrap">
        <div className="fp-slider">

          {/* ── Left: Text ── */}
          <div
            className={`fp-slide-left ${animating ? `fp-slide-left--exit-${direction}` : "fp-slide-left--enter"}`}
            key={`left-${currentIndex}`}
          >
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

            <h3 className="fp-slide-name">{mvp.name}</h3>
            <p className="fp-slide-tagline">{mvp.tagline}</p>
            <div className="fp-slide-divider" style={{ background: col.dot }} />
            <p className="fp-slide-desc">{mvp.solution}</p>

            <div className="fp-slide-metric" style={{ borderColor: `${col.dot}30`, background: `${col.dot}0c` }}>
              <span className="fp-slide-metric-value" style={{ color: col.dot }}>
                ✦ {mvp.metric}
              </span>
            </div>

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
              <img src={mvp.img} alt={mvp.name} className="fp-slide-img" />
              <div className="fp-slide-img-shine" />
            </div>
          </div>
        </div>

        {/* Nav buttons */}
        <button className="fp-nav fp-nav--prev" onClick={goPrev} aria-label="Previous" style={{ "--accent": col.dot }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className="fp-nav fp-nav--next" onClick={goNext} aria-label="Next" style={{ "--accent": col.dot }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Dot indicators */}
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
  return <MVPSlider />;
}
