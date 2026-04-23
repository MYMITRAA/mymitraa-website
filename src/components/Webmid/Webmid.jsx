import "./Webmid.css";
import customImg from "../../assets/images/webface.svg.jpg";
import webAppImg from "../../assets/images/weblapimg.svg.jpg";

const services = [
  "Custom web application development",
  "Mobile app development (iOS, Android, cross-platform)",
  "UI/UX design & prototyping",
  "API development & system integrations",
  "SaaS product engineering",
];

const businessValues = [
  { stat: "🚀", label: "Accelerate digital transformation" },
  { stat: "🎯", label: "Deliver seamless user experiences" },
  { stat: "📈", label: "Ensure scalability and performance" },
  { stat: "🔗", label: "Robust API integrations and system connectivity" },
];

function Webmid() {
  return (
    <section className="webmid__section">
      <div className="webmid__container">

        {/* ── Header ── */}
        <div className="webmid__header">
          <h2 className="webmid__header-title">
            Web &amp; Application Development at MiTRA Technology
          </h2>
          <p className="webmid__header-desc">
            We build scalable, secure, and high-performance digital platforms
            tailored to modern business needs — from intuitive user interfaces
            to robust backend systems, end-to-end.
          </p>
        </div>

        {/* ── Row 1: large image left, services list right ── */}
        <div className="webmid__row">

          <div className="webmid__card webmid__card--large webmid__card--image">
            <img
              src={customImg}
              alt="Custom Web Development"
              className="webmid__card-img"
            />
            <div className="webmid__card-overlay">
              <h3 className="webmid__overlay-title">
                Custom Website Development
              </h3>
              <p className="webmid__overlay-desc">
                Build pixel-perfect, high-performance websites tailored to your
                brand — combining beautiful UI design with powerful functionality
                to drive engagement and conversions.
              </p>
            </div>
          </div>

          <div className="webmid__card webmid__card--small webmid__card--purple">
            <h3 className="webmid__purple-title">Our Services</h3>
            <ul className="webmid__offer-list">
              {services.map((item, i) => (
                <li key={i} className="webmid__offer-item">
                  <span className="webmid__offer-dot"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── Row 2: value card left, large image right ── */}
        <div className="webmid__row">

          <div className="webmid__card webmid__card--small webmid__card--dark">
            <h3 className="webmid__dark-title">Business Value</h3>
            <div className="webmid__value-list">
              {businessValues.map((v, i) => (
                <div className="webmid__value-item" key={i}>
                  <span className="webmid__value-stat">{v.stat}</span>
                  <p className="webmid__value-label">{v.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="webmid__card webmid__card--large webmid__card--image">
            <img
              src={webAppImg}
              alt="Web Application Development"
              className="webmid__card-img"
            />
            <div className="webmid__card-overlay">
              <h3 className="webmid__overlay-title">
                Web Application Development
              </h3>
              <p className="webmid__overlay-desc">
                Develop powerful, scalable web applications with modern
                frameworks — delivering fast, reliable, and secure digital
                experiences that grow with your business.
              </p>
            </div>
          </div>

        </div>

        {/* ── Overview Banner ── */}
        <div className="webmid__banner">
          <div className="webmid__banner-left">
            <span className="webmid__banner-tag">Our Approach</span>
            <h3 className="webmid__banner-heading">
              End-to-end digital platforms built for performance, scalability
              &amp; seamless user experience
            </h3>
          </div>
          <div className="webmid__banner-right">
            <p className="webmid__banner-desc">
              We deliver modern web and mobile solutions — from UI/UX design to
              backend architecture — ensuring every platform we build is fast,
              secure, scalable, and aligned with your business goals.
            </p>
            <div className="webmid__banner-stats">
              <div className="webmid__stat">
                <strong className="webmid__stat-num webmid__stat-num--accent">100%</strong>
                <span className="webmid__stat-label">Custom Built</span>
              </div>
              <div className="webmid__stat">
                <strong className="webmid__stat-num">5x</strong>
                <span className="webmid__stat-label">Faster Delivery</span>
              </div>
              <div className="webmid__stat">
                <strong className="webmid__stat-num">24/7</strong>
                <span className="webmid__stat-label">Support Ready</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Webmid;
