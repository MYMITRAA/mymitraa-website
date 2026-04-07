import "./Footer.css";
import { Link } from "react-router-dom";
import logologo from "../../assets/logo/icon-blue.svg";
import mitra from "../../assets/logo/mitraa.svg";
import bigLogo from "../../assets/images/footerlogo.svg";
import instagram from "../../assets/images/instagram.svg";
import linkedin from "../../assets/images/linkedin.svg";
import facebook from "../../assets/images/facebook.svg";
import twitter from "../../assets/images/x.svg";
import footerRectangle from "../../assets/images/footerrectangle.svg";

function Footer() {
  return (
    <footer className="footer-section">

      <img src={bigLogo} alt="Big Logo" className="footer-bg-logo" />
      <img src={footerRectangle} alt="Footer Smoke" className="footer-smoke-overlay" />

      <div className="footer-container">
        <div className="footer-card">

          {/* ROW 1 — Logo + Description */}
          <div className="footer-left">
            <div className="footer-brand">
              <img src={logologo} alt="Logo Icon" className="footer-logo" />
              <img src={mitra} alt="MITRAA Text" className="footer-mitraa" />
            </div>
            <p className="footer-desc">
              Your big dreams deserve the right strategy. Fill out the form,
              pick a time that works for you, and let's connect!
            </p>
          </div>

          {/* ROW 2 col 1 — Services */}
          <div className="footer-column">
            <h4>Services</h4>
            <ul>
              <li><Link to="/genai">Generative AI Solutions</Link></li>
              <li><Link to="/web">Web & Application Development</Link></li>
              <li><Link to="/blockchain">Blockchain (Web3)</Link></li>
              <li><Link to="/enterpriseagiledevelopment">Enterprise Agile Development</Link></li>
              <li><Link to="/cybersecurity">Cyber Security</Link></li>
              <li><Link to="/enterprisetech">Enterprise Technology & Performance</Link></li>
            </ul>
          </div>

          {/* ROW 2 col 2 — Quick Links */}
          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/casestudy">Case Study</Link></li>
              <li><Link to="/resourceaugmentation">Resource Augmentation</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/news">News & Events</Link></li>
            </ul>
          </div>

          {/* ROW 3 — Follow Us */}
          <div className="footer-social-mobile">
            <h4>Follow Us</h4>
            <div className="social-icons">

              <a href="https://www.instagram.com/mitra.technologypvtltd?igsh=ZGRuNjJhempzbnRv" target="_blank" rel="noopener noreferrer">
                <img src={instagram} alt="Instagram" />
              </a>

              <a href="https://www.linkedin.com/company/mitra-technology-pvt-ltd/" target="_blank" rel="noopener noreferrer">
                <img src={linkedin} alt="LinkedIn" />
              </a>

              <a href="https://www.facebook.com/people/Mitra-Technology-Pvt-Ltd/61583635949784/" target="_blank" rel="noopener noreferrer">
                <img src={facebook} alt="Facebook" />
              </a>

              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src={twitter} alt="Twitter" />
              </a>

            </div>
          </div>

          {/* ROW 4 — Copyright */}
          <div className="footer-bottom">
            © 2026 MY MiTRAA. All Rights Reserved.
          </div>

        </div>
      </div>

    </footer>
  );
}

export default Footer;