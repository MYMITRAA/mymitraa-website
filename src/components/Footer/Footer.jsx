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
        <img
    src={footerRectangle}
    alt="Footer Smoke"
    className="footer-smoke-overlay"
  />


      <div className="footer-container">

        <div className="footer-card">

        
          <div className="footer-left">
            <div className="footer-brand">
  <img src={logologo} alt="Logo Icon" className="footer-logo" />
  <img src={mitra} alt="MITRAA Text" className="footer-mitraa" />
</div>

            <p className="footer-desc">
              Your big dreams deserve the right strategy. Fill out the form,
              pick a time that works for you, and let’s connect!
            </p>

            <div className="footer-social">
              <h4>Follow Us</h4>
              <div className="social-icons">
                <img src={instagram} alt="Instagram" />
                <img src={linkedin} alt="LinkedIn" />
                <img src={facebook} alt="Facebook" />
                <img src={twitter} alt="Twitter" />
              </div>
            </div>
          </div>

          
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

         
          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
                <li><Link to="/portfolio">Portfolio</Link></li>
               <li><Link to="/casestudy">Case Study</Link></li>
               <li><Link to="/careers">Resource Argumentation</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/news">News & Events</Link></li>
            </ul>
          </div>

          
          <div className="footer-bottom">
            © 2026 MY MiTRAA. All Rights Reserved.
          </div>

        </div>
      </div>

    </footer>
  );
}

export default Footer;