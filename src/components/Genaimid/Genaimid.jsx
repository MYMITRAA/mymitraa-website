import "./Genaimid.css";
import customImg from "../../assets/images/facelapimg.jpg";
import webAppImg from "../../assets/images/laptopimg.webp";

const offerings = [
  "Custom AI model development & fine-tuning",
  "AI-powered chatbots & virtual assistants",
  "Document intelligence & knowledge automation",
  "Code generation & developer productivity tools",
  "AI copilots for enterprise workflows",
];

const businessValues = [
  { stat: "40%", label: "Reduction in operational costs" },
  { stat: "⚡", label: "Accelerate decision-making with real-time insights" },
  { stat: "🎯", label: "Enhance customer engagement through personalization" },
  { stat: "📈", label: "Improve workforce productivity" },
];

function Genaimid() {
  return (
    <section className="genaimid__section">
      <div className="genaimid__container">

        {/* ── Header ── */}
        <div className="genaimid__header">
          <h2 className="genaimid__header-title">
            What We Deliver at MiTRA Technology
          </h2>
          <p className="genaimid__header-desc">
            We build AI systems that understand, assist, and adapt. From
            intelligent assistants to custom workflows, generative AI cuts
            manual work and sharpens decisions unlocking the next generation
            of intelligent automation.
          </p>
        </div>

        {/* ── Row 1: large image left, offer list right ── */}
        <div className="genaimid__row">

          <div className="genaimid__card genaimid__card--large genaimid__card--image">
            <img
              src={customImg}
              alt="Generative AI Solutions"
              className="genaimid__card-img"
            />
            <div className="genaimid__card-overlay">
              <h3 className="genaimid__overlay-title">
                Custom AI Model Development
              </h3>
              <p className="genaimid__overlay-desc">
                Build and fine-tune large language models tailored to your
                domain  delivering intelligent automation at the core of your
                operations.
              </p>
            </div>
          </div>

          <div className="genaimid__card genaimid__card--small genaimid__card--purple">
            <h3 className="genaimid__purple-title">What We Offer</h3>
            <ul className="genaimid__offer-list">
              {offerings.map((item, i) => (
                <li key={i} className="genaimid__offer-item">
                  <span className="genaimid__offer-dot"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── Row 2: value card left, large image right ── */}
        <div className="genaimid__row genaimid__row--reverse">

          <div className="genaimid__card genaimid__card--small genaimid__card--dark">
            <h3 className="genaimid__dark-title">Business Value</h3>
            <div className="genaimid__value-list">
              {businessValues.map((v, i) => (
                <div className="genaimid__value-item" key={i}>
                  <span className="genaimid__value-stat">{v.stat}</span>
                  <p className="genaimid__value-label">{v.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="genaimid__card genaimid__card--large genaimid__card--image">
            <img
              src={webAppImg}
              alt="AI Copilots and Enterprise Workflows"
              className="genaimid__card-img"
            />
            <div className="genaimid__card-overlay">
              <h3 className="genaimid__overlay-title">
                AI Copilots for Enterprise Workflows
              </h3>
              <p className="genaimid__overlay-desc">
                Design intelligent copilots and autonomous agents that integrate
                seamlessly into your enterprise stack transforming how teams
                work, decide, and grow.
              </p>
            </div>
          </div>

        </div>

        {/* ── Overview Banner ── */}
        <div className="genaimid__banner">
          <div className="genaimid__banner-left">
            <span className="genaimid__banner-tag">Our Approach</span>
            <h3 className="genaimid__banner-heading">
              Harness the power of large language models, multimodal AI &amp;
              autonomous agents
            </h3>
          </div>
          <div className="genaimid__banner-right">
            <p className="genaimid__banner-desc">
              We help organizations transform operations, enhance customer
              experiences, and drive innovation at scale through AI solutions
              that are built for your business, not borrowed from a template.
            </p>
<div className="genaimid__banner-stats">
  <div className="genaimid__stat">
    <strong className="genaimid__stat-num genaimid__stat-num--accent">40%</strong>
    <span className="genaimid__stat-label">Cost Reduction</span>
  </div>
  <div className="genaimid__stat">
    <strong className="genaimid__stat-num">3×</strong>
    <span className="genaimid__stat-label">Faster Decisions</span>
  </div>
  <div className="genaimid__stat">
    <strong className="genaimid__stat-num">∞</strong>
    <span className="genaimid__stat-label">Scalability</span>
  </div>
</div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Genaimid;
