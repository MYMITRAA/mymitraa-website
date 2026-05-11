import "./Service.css";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import robotImage from "../../assets/images/roboman.jpg";
import serviceBg from "../../assets/images/servicebg.svg";

import icon1 from "../../assets/images/icon1.svg";
import icon2 from "../../assets/images/icon2.svg";
import icon3 from "../../assets/images/icon3.svg";
import icon4 from "../../assets/images/icon4.svg";
import icon5 from "../../assets/images/icon5.svg";
import icon6 from "../../assets/images/6icon.svg";

function Services() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const title = entry.target.querySelector(".services-title");
            const cards = entry.target.querySelectorAll(".service-card, .service-feature");

            if (title) title.classList.add("animate-in");

            cards.forEach((card, i) => {
              setTimeout(() => {
                card.classList.add("animate-in");
              }, i * 100);
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="services-section"
      style={{ backgroundImage: `url(${serviceBg})` }}
    >
      <div className="services-container">

        <h2 className="services-title">
          One Service Partner. Complete Delivery
        </h2>

        <div className="services-grid">

          {/* CARD 1 */}
          <div className="service-card">
            <div>
              <div className="service-icon">
                <img src={icon1} alt="icon" />
              </div>
              <h3>Generative AI Solutions</h3>
              <p>
                We build AI systems that understand needs, assist decisions,
                adapt intelligently, and scale with your business.
              </p>
            </div>
            <button className="service-btn" onClick={() => navigate("/genai")}>
              Learn more
            </button>
          </div>

          {/* ROBOT FEATURE CARD */}
          <div className="service-feature">
            <img src={robotImage} alt="AI Robot" />
            <div className="feature-overlay">
              <h3>AI for small business</h3>
              <p>
                Grow your customer base with communications software designed
                for up to 300 employees.
              </p>
              <button className="feature-btn" onClick={() => navigate("/aiforsmallbusiness")}>
                Learn more
              </button>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="service-card">
            <div>
              <div className="service-icon">
                <img src={icon2} alt="icon" />
              </div>
              <h3>Web & Application Development</h3>
              <p>
                We design and develop modern web and application platforms
                powered by intelligent, scalable AI solutions.
              </p>
            </div>
            <button className="service-btn" onClick={() => navigate("/web")}>
              Learn more
            </button>
          </div>

          {/* CARD 3 */}
          <div className="service-card">
            <div>
              <div className="service-icon">
                <img src={icon3} alt="icon" />
              </div>
              <h3>Enterprise Agile Development</h3>
              <p>
                We help enterprises move faster without losing control,
                governance, security, compliance, or operational visibility globally.
              </p>
            </div>
            <button className="service-btn" onClick={() => navigate("/enterpriseagiledevelopment")}>
              Learn more
            </button>
          </div>

          {/* CARD 4 */}
          <div className="service-card">
            <div>
              <div className="service-icon">
                <img src={icon4} alt="icon" />
              </div>
              <h3>Cyber Security</h3>
              <p>
                Security isn't an add on; it's embedded into everything we design,
                build, and deliver.
              </p>
            </div>
            <button className="service-btn" onClick={() => navigate("/cybersecurity")}>
              Learn more
            </button>
          </div>

          {/* CARD 5 */}
          <div className="service-card">
            <div>
              <div className="service-icon">
                <img src={icon5} alt="icon" />
              </div>
              <h3>Blockchain (Web3)</h3>
              <p>
                We create blockchain solutions where trust, transparency,
                and automation truly matter for secure digital ecosystems.
              </p>
            </div>
            <button className="service-btn" onClick={() => navigate("/blockchain")}>
              Learn more
            </button>
          </div>

          {/* CARD 6 */}
          <div className="service-card">
            <div>
              <div className="service-icon">
                <img src={icon6} alt="icon" />
              </div>
              <h3>Enterprise Technology & Performance</h3>
              <p>
                We optimize enterprise systems to perform better,
                scale smarter, and run lighter.
              </p>
            </div>
            <button className="service-btn" onClick={() => navigate("/enterprisetech")}>
              Learn more
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Services;