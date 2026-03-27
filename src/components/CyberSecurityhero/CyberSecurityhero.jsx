import "./CyberSecurityhero.css";
import cyberBg from "../../assets/images/cybersecurityhero.jpg";

function CyberSecurityhero() {
  return (
    <section
      className="cyberhero__section"
      style={{ backgroundImage: `url(${cyberBg})` }}
    >
      <div className="cyberhero__overlay"></div>

      <div className="cyberhero__content">
        <div className="cyberhero__line"></div>

        <div className="cyberhero__text">
          <span className="cyberhero__tag">Security &amp; Compliance</span>
          <h1 className="cyberhero__title">Cyber Security</h1>
          <p className="cyberhero__subtitle">
            Protect your digital assets, ensure compliance, and build
            resilience against an evolving threat landscape.
          </p>
        </div>
      </div>
    </section>
  );
}

export default CyberSecurityhero;
