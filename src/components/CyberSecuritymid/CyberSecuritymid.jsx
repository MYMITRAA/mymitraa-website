import "./CyberSecuritymid.css";
import customImg from "../../assets/images/cybersecurityimage1.webp";
import webAppImg from "../../assets/images/cybersecurityimage2.webp";

const capabilities = [
  "Identity & Access Management (IAM)",
  "Zero Trust Architecture implementation",
  "Security Operations Center (SOC) setup",
  "Vulnerability assessment & penetration testing",
  "Cloud security & compliance (ISO, SOC2, GDPR)",
];

const businessValues = [
  { stat: "🔒", label: "Minimize risk exposure and data breaches" },
  { stat: "✅", label: "Ensure regulatory compliance" },
  { stat: "🤝", label: "Strengthen trust with customers and stakeholders" },
  { stat: "🛡️", label: "Build resilience against evolving cyber threats" },
];

function CyberSecuritymid() {
  return (
    <section className="cybermid__section">
      <div className="cybermid__container">

        {/* ── Header ── */}
        <div className="cybermid__header">
          <h2 className="cybermid__header-title">
            Enterprise-Grade Cyber Security at MiTRA Technology
          </h2>
          <p className="cybermid__header-desc">
            In a rapidly evolving threat landscape, we provide comprehensive
            cybersecurity solutions designed to protect your digital assets,
            ensure compliance, and build resilience against cyber threats.
          </p>
        </div>

        {/* ── Row 1: large image left, capabilities list right ── */}
        <div className="cybermid__row">

          <div className="cybermid__card cybermid__card--large cybermid__card--image">
            <img
              src={customImg}
              alt="Cyber Security Solutions"
              className="cybermid__card-img"
            />
            <div className="cybermid__card-overlay">
              <h3 className="cybermid__overlay-title">
                Zero Trust Architecture
              </h3>
              <p className="cybermid__overlay-desc">
                Implement a robust Zero Trust framework that verifies every
                user, device, and connection eliminating implicit trust across
                your entire network.
              </p>
            </div>
          </div>

          <div className="cybermid__card cybermid__card--small cybermid__card--purple">
            <h3 className="cybermid__purple-title">Core Capabilities</h3>
            <ul className="cybermid__offer-list">
              {capabilities.map((item, i) => (
                <li key={i} className="cybermid__offer-item">
                  <span className="cybermid__offer-dot"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── Row 2: value card left, large image right ── */}
        <div className="cybermid__row">

          <div className="cybermid__card cybermid__card--small cybermid__card--dark">
            <h3 className="cybermid__dark-title">Business Value</h3>
            <div className="cybermid__value-list">
              {businessValues.map((v, i) => (
                <div className="cybermid__value-item" key={i}>
                  <span className="cybermid__value-stat">{v.stat}</span>
                  <p className="cybermid__value-label">{v.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="cybermid__card cybermid__card--large cybermid__card--image">
            <img
              src={webAppImg}
              alt="Security Operations Center"
              className="cybermid__card-img"
            />
            <div className="cybermid__card-overlay">
              <h3 className="cybermid__overlay-title">
                Security Operations Center (SOC)
              </h3>
              <p className="cybermid__overlay-desc">
                Set up and manage a 24/7 Security Operations Center that
                monitors, detects, and responds to threats in real time 
                keeping your business always protected.
              </p>
            </div>
          </div>

        </div>

        {/* ── Overview Banner ── */}
        <div className="cybermid__banner">
          <div className="cybermid__banner-left">
            <span className="cybermid__banner-tag">Our Approach</span>
            <h3 className="cybermid__banner-heading">
              Comprehensive protection across identity, cloud, compliance
              &amp; threat response
            </h3>
          </div>
          <div className="cybermid__banner-right">
            <p className="cybermid__banner-desc">
              We deliver enterprise-grade cybersecurity solutions that protect
              your digital assets end to end  from identity management to cloud
              compliance  so your business stays secure, trusted, and resilient.
            </p>
            <div className="cybermid__banner-stats">
              <div className="cybermid__stat">
                <strong className="cybermid__stat-num cybermid__stat-num--accent">0</strong>
                <span className="cybermid__stat-label">Breach Tolerance</span>
              </div>
              <div className="cybermid__stat">
                <strong className="cybermid__stat-num">24/7</strong>
                <span className="cybermid__stat-label">SOC Monitoring</span>
              </div>
              <div className="cybermid__stat">
                <strong className="cybermid__stat-num">100%</strong>
                <span className="cybermid__stat-label">Compliance Ready</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default CyberSecuritymid;
