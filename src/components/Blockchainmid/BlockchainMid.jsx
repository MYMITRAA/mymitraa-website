import "./BlockchainMid.css";
import customImg from "../../assets/images/blockchain1.jpg";
import webAppImg from "../../assets/images/blockchain2.jpg";

const capabilities = [
  "Smart contract development",
  "Decentralized applications (dApps)",
  "Tokenization & digital assets",
  "Blockchain consulting & architecture",
  "DeFi and NFT solutions",
];

const businessValues = [
  { stat: "🔗", label: "Enhanced data integrity and trust" },
  { stat: "⚡", label: "Reduced dependency on intermediaries" },
  { stat: "💰", label: "New revenue streams through token economies" },
  { stat: "🌐", label: "Transparent and tamper-proof transaction records" },
];

function BlockchainMid() {
  return (
    <section className="blockmid__section">
      <div className="blockmid__container">

        {/* ── Header ── */}
        <div className="blockmid__header">
          <h2 className="blockmid__header-title">
            What We Deliver at MiTRA Technology
          </h2>
          <p className="blockmid__header-desc">
            We empower businesses with decentralized technologies that enhance
            transparency, security, and trust through blockchain and Web3
            ecosystems.
          </p>
        </div>

        {/* ── Row 1: large image left, capabilities right ── */}
        <div className="blockmid__row">

          <div className="blockmid__card blockmid__card--large blockmid__card--image">
            <img
              src={customImg}
              alt="Smart Contract Development"
              className="blockmid__card-img"
            />
            <div className="blockmid__card-overlay">
              <h3 className="blockmid__overlay-title">
                Smart Contract Development
              </h3>
              <p className="blockmid__overlay-desc">
                Build secure, self-executing smart contracts that automate
                agreements and eliminate the need for intermediaries  bringing
                trust directly into your operations.
              </p>
            </div>
          </div>

          <div className="blockmid__card blockmid__card--small blockmid__card--purple">
            <h3 className="blockmid__purple-title">Our Capabilities</h3>
            <ul className="blockmid__offer-list">
              {capabilities.map((item, i) => (
                <li key={i} className="blockmid__offer-item">
                  <span className="blockmid__offer-dot"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── Row 2: value card left, large image right ── */}
        <div className="blockmid__row">

          <div className="blockmid__card blockmid__card--small blockmid__card--dark">
            <h3 className="blockmid__dark-title">Business Value</h3>
            <div className="blockmid__value-list">
              {businessValues.map((v, i) => (
                <div className="blockmid__value-item" key={i}>
                  <span className="blockmid__value-stat">{v.stat}</span>
                  <p className="blockmid__value-label">{v.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="blockmid__card blockmid__card--large blockmid__card--image">
            <img
              src={webAppImg}
              alt="Decentralized Applications"
              className="blockmid__card-img"
            />
            <div className="blockmid__card-overlay">
              <h3 className="blockmid__overlay-title">
                Decentralized Applications (dApps)
              </h3>
              <p className="blockmid__overlay-desc">
                Design and deploy dApps on leading blockchain networks 
                enabling transparent, censorship-resistant, and user owned
                digital experiences.
              </p>
            </div>
          </div>

        </div>

        {/* ── Overview Banner ── */}
        <div className="blockmid__banner">
          <div className="blockmid__banner-left">
            <span className="blockmid__banner-tag">Our Approach</span>
            <h3 className="blockmid__banner-heading">
              Decentralized ecosystems built on transparency, security
              &amp; token-powered economies
            </h3>
          </div>
          <div className="blockmid__banner-right">
            <p className="blockmid__banner-desc">
              We help businesses navigate the Web3 landscape from smart
              contract architecture to full DeFi and NFT solutions  reducing
              dependency on intermediaries and unlocking new revenue streams
              through token economies.
            </p>
            <div className="blockmid__banner-stats">
              <div className="blockmid__stat">
                <strong className="blockmid__stat-num blockmid__stat-num--accent">100%</strong>
                <span className="blockmid__stat-label">Tamper proof Records</span>
              </div>
              <div className="blockmid__stat">
                <strong className="blockmid__stat-num">0</strong>
                <span className="blockmid__stat-label">Intermediaries</span>
              </div>
              <div className="blockmid__stat">
                <strong className="blockmid__stat-num">Web3</strong>
                <span className="blockmid__stat-label">Native Solutions</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default BlockchainMid;
