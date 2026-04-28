import "./AboutusMid.css";
import Aboutmidimg from "../../assets/images/aboutusimg.png";
import rightImage from "../../assets/images/aboutusimg2.png";

function AboutusMid() {
  return (
    <section className="about-mid-section">

      {/* TOP */}
      <div className="about-top">
        <h1>ABOUT US</h1>
        <p>
          We are a technology driven company delivering innovative IT solutions across AI &amp; automation, cloud and hybrid
          infrastructure, cybersecurity, and data analytics. Our focus is on helping businesses improve efficiency, enhance security,
          and make smarter, data driven decisions. With a customer first approach, we build scalable and reliable solutions tailored to
          modern business needs.
        </p>
      </div>

      {/* CREATIVE IMAGE — full bleed, no horizontal padding */}
      <div className="about-creative-image">
        <img src={Aboutmidimg} alt="Creative Section" />
      </div>

      {/* BOTTOM */}
      <div className="about-bottom">
        <div className="about-quote">
          <span className="quote-mark open">&ldquo;</span>
          <p className="quote-text">
            Driven by purpose, powered by AI, and committed to creating technology that truly makes a difference.
          </p>
          <span className="quote-mark close">&rdquo;</span>
        </div>

        <div className="about-image">
          <img src={rightImage} alt="About Visual" />
        </div>
      </div>

    </section>
  );
}

export default AboutusMid;
