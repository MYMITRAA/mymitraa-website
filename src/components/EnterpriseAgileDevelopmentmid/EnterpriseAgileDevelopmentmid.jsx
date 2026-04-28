import "./EnterpriseAgileDevelopmentmid.css";
import customImg from "../../assets/images/agile1.webp";
import webAppImg from "../../assets/images/laptopimg.webp";

const offerings = [
  "Agile transformation consulting",
  "Scrum, SAFe, and DevOps integration",
  "Continuous Integration & Continuous Deployment (CI/CD)",
  "Product lifecycle management",
  "Agile coaching & team enablement",
];

const businessValues = [
  { stat: "⚡", label: "Faster time-to-market with streamlined delivery" },
  { stat: "📊", label: "Increased project visibility and control" },
  { stat: "✅", label: "Higher product quality at every release" },
  { stat: "🔄", label: "Continuous improvement across all teams" },
];

function EnterpriseAgileDevelopmentmid() {
  return (
    <section className="eagilemid__section">
      <div className="eagilemid__container">

        {/* ── Header ── */}
        <div className="eagilemid__header">
          <h2 className="eagilemid__header-title">
            Enterprise Agile Development at MiTRA Technology
          </h2>
          <p className="eagilemid__header-desc">
            We enable organizations to adopt and scale Agile methodologies to
            improve collaboration, accelerate delivery, and respond effectively
            to market changes.
          </p>
        </div>

        {/* ── Row 1: large image left, offerings list right ── */}
        <div className="eagilemid__row">

          <div className="eagilemid__card eagilemid__card--large eagilemid__card--image">
            <img
              src={customImg}
              alt="Agile Transformation Consulting"
              className="eagilemid__card-img"
            />
            <div className="eagilemid__card-overlay">
              <h3 className="eagilemid__overlay-title">
                Agile Transformation Consulting
              </h3>
              <p className="eagilemid__overlay-desc">
                Guide your organization through Agile adoption with proven
                frameworks that enhance collaboration, accelerate delivery, and
                build a culture of continuous improvement.
              </p>
            </div>
          </div>

          <div className="eagilemid__card eagilemid__card--small eagilemid__card--purple">
            <h3 className="eagilemid__purple-title">What We Offer</h3>
            <ul className="eagilemid__offer-list">
              {offerings.map((item, i) => (
                <li key={i} className="eagilemid__offer-item">
                  <span className="eagilemid__offer-dot"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── Row 2: value card left, large image right ── */}
        <div className="eagilemid__row">

          <div className="eagilemid__card eagilemid__card--small eagilemid__card--dark">
            <h3 className="eagilemid__dark-title">Business Value</h3>
            <div className="eagilemid__value-list">
              {businessValues.map((v, i) => (
                <div className="eagilemid__value-item" key={i}>
                  <span className="eagilemid__value-stat">{v.stat}</span>
                  <p className="eagilemid__value-label">{v.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="eagilemid__card eagilemid__card--large eagilemid__card--image">
            <img
              src={webAppImg}
              alt="DevOps and Continuous Delivery"
              className="eagilemid__card-img"
            />
            <div className="eagilemid__card-overlay">
              <h3 className="eagilemid__overlay-title">
                DevOps &amp; Continuous Delivery
              </h3>
              <p className="eagilemid__overlay-desc">
                Implement CI/CD pipelines and DevOps practices to enable faster,
                more reliable software releases with full team visibility and
                automated quality gates.
              </p>
            </div>
          </div>

        </div>

        {/* ── Overview Banner ── */}
        <div className="eagilemid__banner">
          <div className="eagilemid__banner-left">
            <span className="eagilemid__banner-tag">Our Approach</span>
            <h3 className="eagilemid__banner-heading">
              Scalable Agile systems with DevOps, CI/CD &amp; continuous
              delivery built for enterprise
            </h3>
          </div>
          <div className="eagilemid__banner-right">
            <p className="eagilemid__banner-desc">
              We empower teams to collaborate efficiently, automate workflows,
              and continuously deliver value to customers combining modern
              Agile frameworks with DevOps culture to accelerate your digital
              transformation.
            </p>
            <div className="eagilemid__banner-stats">
              <div className="eagilemid__stat">
                <strong className="eagilemid__stat-num eagilemid__stat-num--accent">3x</strong>
                <span className="eagilemid__stat-label">Faster Delivery</span>
              </div>
              <div className="eagilemid__stat">
                <strong className="eagilemid__stat-num">100%</strong>
                <span className="eagilemid__stat-label">Better Visibility</span>
              </div>
              <div className="eagilemid__stat">
                <strong className="eagilemid__stat-num">∞</strong>
                <span className="eagilemid__stat-label">Scalability</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default EnterpriseAgileDevelopmentmid;
