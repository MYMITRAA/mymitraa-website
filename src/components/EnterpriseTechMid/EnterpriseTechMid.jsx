import "./EnterpriseTechMid.css";
import customImg from "../../assets/images/PerformanceEngineering.webp";
import webAppImg from "../../assets/images/cloud-storage.webp";

const solutions = [
  "Performance engineering & optimization",
  "Cloud infrastructure management",
  "System monitoring & observability",
  "Database optimization & scaling",
  "Enterprise architecture consulting",
];

const businessValues = [
  { stat: "⚙️", label: "Improved system reliability and uptime" },
  { stat: "📉", label: "Reduced downtime and latency" },
  { stat: "💡", label: "Optimized infrastructure costs" },
  { stat: "📊", label: "End-to-end observability across your stack" },
];

function EnterpriseTechMid() {
  return (
    <section className="entechmid__section">
      <div className="entechmid__container">

        {/* ── Header ── */}
        <div className="entechmid__header">
          <h2 className="entechmid__header-title">
            What We Deliver at MiTRA Technology
          </h2>
          <p className="entechmid__header-desc">
            We optimize enterprise IT ecosystems to ensure peak performance,
            scalability, and reliability — enabling businesses to operate
            efficiently at scale.
          </p>
        </div>

        {/* ── Row 1: large image left, solutions list right ── */}
        <div className="entechmid__row">

          <div className="entechmid__card entechmid__card--large entechmid__card--image">
            <img
              src={customImg}
              alt="Performance Engineering"
              className="entechmid__card-img"
            />
            <div className="entechmid__card-overlay">
              <h3 className="entechmid__overlay-title">
                Performance Engineering &amp; Optimization
              </h3>
              <p className="entechmid__overlay-desc">
                Identify bottlenecks, tune systems, and architect for speed —
                delivering consistent, high-performance experiences across your
                entire enterprise stack.
              </p>
            </div>
          </div>

          <div className="entechmid__card entechmid__card--small entechmid__card--purple">
            <h3 className="entechmid__purple-title">Our Solutions</h3>
            <ul className="entechmid__offer-list">
              {solutions.map((item, i) => (
                <li key={i} className="entechmid__offer-item">
                  <span className="entechmid__offer-dot"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── Row 2: value card left, large image right ── */}
        <div className="entechmid__row">

          <div className="entechmid__card entechmid__card--small entechmid__card--dark">
            <h3 className="entechmid__dark-title">Business Value</h3>
            <div className="entechmid__value-list">
              {businessValues.map((v, i) => (
                <div className="entechmid__value-item" key={i}>
                  <span className="entechmid__value-stat">{v.stat}</span>
                  <p className="entechmid__value-label">{v.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="entechmid__card entechmid__card--large entechmid__card--image">
            <img
              src={webAppImg}
              alt="Cloud Infrastructure Management"
              className="entechmid__card-img"
            />
            <div className="entechmid__card-overlay">
              <h3 className="entechmid__overlay-title">
                Cloud Infrastructure Management
              </h3>
              <p className="entechmid__overlay-desc">
                Manage, scale, and secure your cloud infrastructure with
                precision — ensuring maximum uptime, cost efficiency, and
                seamless performance at every layer.
              </p>
            </div>
          </div>

        </div>

        {/* ── Overview Banner ── */}
        <div className="entechmid__banner">
          <div className="entechmid__banner-left">
            <span className="entechmid__banner-tag">Our Approach</span>
            <h3 className="entechmid__banner-heading">
              Peak performance, scalability &amp; reliability for enterprise
              IT ecosystems
            </h3>
          </div>
          <div className="entechmid__banner-right">
            <p className="entechmid__banner-desc">
              We help enterprises operate at their best — optimizing
              infrastructure, eliminating bottlenecks, and building observable,
              resilient systems that scale with your business and reduce
              operational overhead.
            </p>
            <div className="entechmid__banner-stats">
              <div className="entechmid__stat">
                <strong className="entechmid__stat-num entechmid__stat-num--accent">99.9%</strong>
                <span className="entechmid__stat-label">Uptime Target</span>
              </div>
              <div className="entechmid__stat">
                <strong className="entechmid__stat-num">↓</strong>
                <span className="entechmid__stat-label">Reduced Latency</span>
              </div>
              <div className="entechmid__stat">
                <strong className="entechmid__stat-num">24/7</strong>
                <span className="entechmid__stat-label">Monitoring</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default EnterpriseTechMid;
