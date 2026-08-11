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
import whatsapp from "../../assets/images/whatsapp.png";

const PinIcon = () => (
  <svg className="footer-pin" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 0C4.13 0 1 3.13 1 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 8 4.5a2.5 2.5 0 0 1 0 5z" fill="#6c63ff"/>
  </svg>
);

const SocialIcons = () => (
  <div className="social-icons">
    <a href="https://www.instagram.com/mymitraa/" target="_blank" rel="noopener noreferrer">
      <img src={instagram} alt="Instagram" />
    </a>
    <a href="https://www.linkedin.com/company/mitra-technology-pvt-ltd/" target="_blank" rel="noopener noreferrer">
      <img src={linkedin} alt="LinkedIn" />
    </a>
    <a href="https://www.facebook.com/people/Mitra-Technology-Pvt-Ltd/61583635949784/" target="_blank" rel="noopener noreferrer">
      <img src={facebook} alt="Facebook" />
    </a>
    <a href="https://x.com/MitraTechPvtLtd" target="_blank" rel="noopener noreferrer">
      <img src={twitter} alt="Twitter / X" />
    </a>
    <a href="https://whatsapp.com/channel/0029VbCDjPB9mrGj7VqUaZ3H" target="_blank" rel="noopener noreferrer">
      <img src={whatsapp} alt="WhatsApp" />
    </a>
  </div>
);

function Footer() {
  return (
    <footer className="footer-section">

      <img src={bigLogo} alt="Big Logo" className="footer-bg-logo" />
      <img src={footerRectangle} alt="Footer Smoke" className="footer-smoke-overlay" />

      <div className="footer-container">
        <div className="footer-card">

          {/* ── TOP ROW: Brand | Services | Quick Links | Social ── */}
          <div className="footer-top-grid">

            {/* Brand */}
            <div className="footer-left">
              <div className="footer-brand">
                <img src={logologo} alt="Logo Icon" className="footer-logo" />
                <img src={mitra} alt="MITRAA Text" className="footer-mitraa" />
              </div>
              <p className="footer-desc">
                Your big dreams deserve the right strategy. Fill out the form,
                pick a time that works for you, and let's connect!
              </p>
              {/* <div className="footer-contact-inline">
                <a href="tel:+919938330784">+91 9938330784</a>
                <a
                  href="https://mail.google.com/mail/?view=cm&to=info@mitratechgroup.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  info@mitratechgroup.com
                </a>
                <a
                  href="https://mail.google.com/mail/?view=cm&to=support@mitratechgroup.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  support@mitratechgroup.com
                </a>
                <a
                  href="https://mail.google.com/mail/?view=cm&to=mitraaceo@mitratechgroup.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  mitraaceo@mitratechgroup.com
                </a>
                <a
                  href="https://mail.google.com/mail/?view=cm&to=contact@mitratechgroup.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  contact@mitratechgroup.com
                </a>
              </div>*/}
            </div> 

            {/* Services */}
            <div className="footer-column">
              <h4>Services</h4>
              <ul>
                <li><Link to="/genai">Generative AI Solutions</Link></li>
                <li><Link to="/web">Web &amp; Application Development</Link></li>
                <li><Link to="/blockchain">Blockchain (Web3)</Link></li>
                <li><Link to="/enterpriseagiledevelopment">Enterprise Agile Development</Link></li>
                <li><Link to="/cybersecurity">Cyber Security</Link></li>
                <li><Link to="/enterprisetech">Enterprise Technology &amp; Performance</Link></li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="footer-column">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/portfolio">Portfolio</Link></li>
                <li><Link to="/casestudy">Case Study</Link></li>
                <li><Link to="/resourceaugmentation">Resource Augmentation</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/news">News &amp; Events</Link></li>
              </ul>
            </div>

            {/* Follow Us — desktop */}
            <div className="footer-column footer-social-desktop">
              <h4>Follow Us</h4>
              <SocialIcons />
            </div>

          </div>

          {/* ── DIVIDER ── */}
          <div className="footer-divider" />

          {/* ── BOTTOM ROW: 4 Office Addresses ── */}
          <div className="footer-offices">

            <div className="footer-office-card footer-office-card--hq">
              <div className="footer-office-badge">Headquarters</div>
              <div className="footer-office-header">
                <PinIcon />
                <span className="footer-office-city">Bhubaneswar, Odisha</span>
              </div>
              <p className="footer-office-addr">
                B-93, B.D.A. Duplex, Baramunda,<br />
                Bhubaneswar, Khurda – 751003
              </p>
            </div>

            <div className="footer-office-card">
              <div className="footer-office-badge footer-office-badge--zone">North Zone</div>
              <div className="footer-office-header">
                <PinIcon />
                <span className="footer-office-city">Ambala, Haryana</span>
              </div>
              <p className="footer-office-addr">
                Plot No. 446 (HN3), HSIIDC Industrial<br />
                Growth Centre, Sector 2, Saha,<br />
                Ambala – 133104
              </p>
            </div>

            <div className="footer-office-card">
              <div className="footer-office-badge footer-office-badge--zone">South A Zone</div>
              <div className="footer-office-header">
                <PinIcon />
                <span className="footer-office-city">Hyderabad, Telangana</span>
              </div>
              <p className="footer-office-addr">
                Third Floor, 303, Vedas Vintage,<br />
                Madhapur, Chanda Naik Nagar,<br />
                Survey of India Colony, Hyderabad
              </p>
            </div>

            <div className="footer-office-card">
              <div className="footer-office-badge footer-office-badge--zone">South B Zone</div>
              <div className="footer-office-header">
                <PinIcon />
                <span className="footer-office-city">Malappuram, Kerala</span>
              </div>
              <p className="footer-office-addr">
                Thirumangalath, Kavungappara,<br />
                Palakkad P.O., Kuzhimanna (Via),<br />
                Malappuram – 673641
              </p>
            </div>

          </div>

          {/* ── Follow Us — mobile only ── */}
          <div className="footer-social-mobile">
            <h4>Follow Us</h4>
            <SocialIcons />
          </div>

          {/* ── Copyright ── */}
          <div className="footer-bottom">
            © 2026 MY MiTRAA. All Rights Reserved.
          </div>

        </div>
      </div>

    </footer>
  );
}

export default Footer;
