import "./AIforSmallBusinessmid.css";
import customImg from "../../assets/images/facelapimg.jpg";
import webAppImg from "../../assets/images/laptopimg.webp";

const solutions = [
  "AI-driven CRM automation",
  "Sales & marketing intelligence tools",
  "Customer support automation",
  "Predictive analytics for business insights",
  "AI-powered workflow optimization",
];

const whyItMatters = [
  { stat: "💰", label: "Affordable AI adoption for any budget" },
  { stat: "⚡", label: "Faster ROI with minimal infrastructure" },
  { stat: "📈", label: "Improved operational efficiency at scale" },
  { stat: "🚀", label: "Scalable solutions that grow with your business" },
];

function AIforSmallBusinessmid() {
  return (
    <section className="aism__section">
      <div className="aism__container">

        {/* ── Header ── */}
        <div className="aism__header">
          <h2 className="aism__header-title">
            AI for Small Business at MiTRA Technology
          </h2>
          <p className="aism__header-desc">
            We democratize AI for small and medium businesses by delivering
            cost-effective, scalable, and easy-to-deploy AI solutions that
            drive growth without complexity.
          </p>
        </div>

        {/* ── Row 1: large image left, solutions list right ── */}
        <div className="aism__row">

          <div className="aism__card aism__card--large aism__card--image">
            <img
              src={customImg}
              alt="AI for Small Business Solutions"
              className="aism__card-img"
            />
            <div className="aism__card-overlay">
              <h3 className="aism__overlay-title">
                AI-Driven CRM Automation
              </h3>
              <p className="aism__overlay-desc">
                Automate your customer relationships with intelligent CRM
                tools that track leads, personalize outreach, and close deals
                faster — without the enterprise price tag.
              </p>
            </div>
          </div>

          <div className="aism__card aism__card--small aism__card--purple">
            <h3 className="aism__purple-title">Our Solutions</h3>
            <ul className="aism__offer-list">
              {solutions.map((item, i) => (
                <li key={i} className="aism__offer-item">
                  <span className="aism__offer-dot"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── Row 2: value card left, large image right ── */}
        <div className="aism__row">

          <div className="aism__card aism__card--small aism__card--dark">
            <h3 className="aism__dark-title">Why It Matters</h3>
            <div className="aism__value-list">
              {whyItMatters.map((v, i) => (
                <div className="aism__value-item" key={i}>
                  <span className="aism__value-stat">{v.stat}</span>
                  <p className="aism__value-label">{v.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="aism__card aism__card--large aism__card--image">
            <img
              src={webAppImg}
              alt="Predictive Analytics for Small Business"
              className="aism__card-img"
            />
            <div className="aism__card-overlay">
              <h3 className="aism__overlay-title">
                Predictive Analytics for Business Insights
              </h3>
              <p className="aism__overlay-desc">
                Leverage AI-powered analytics to forecast trends, understand
                customer behavior, and make data-driven decisions that give
                your business a competitive edge.
              </p>
            </div>
          </div>

        </div>

        {/* ── Overview Banner ── */}
        <div className="aism__banner">
          <div className="aism__banner-left">
            <span className="aism__banner-tag">Our Approach</span>
            <h3 className="aism__banner-heading">
              Democratizing AI across CRM, sales, support &amp; analytics for
              every business size
            </h3>
          </div>
          <div className="aism__banner-right">
            <p className="aism__banner-desc">
              We deliver practical, affordable AI solutions tailored for small
              and medium businesses — from automating customer interactions to
              generating real-time business insights — so you compete at scale
              without enterprise complexity.
            </p>
            <div className="aism__banner-stats">
              <div className="aism__stat">
                <strong className="aism__stat-num aism__stat-num--accent">40%</strong>
                <span className="aism__stat-label">Cost Reduction</span>
              </div>
              <div className="aism__stat">
                <strong className="aism__stat-num">3x</strong>
                <span className="aism__stat-label">Faster ROI</span>
              </div>
              <div className="aism__stat">
                <strong className="aism__stat-num">100%</strong>
                <span className="aism__stat-label">Scalable Ready</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default AIforSmallBusinessmid;
