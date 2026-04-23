
import "./Aboutushero.css";
import aboutBg from "../../assets/images/aboutusbg.jpg";

function Aboutushero() {
  return (
    <section
      className="about-hero"
      style={{ backgroundImage: `url(${aboutBg})` }}
    >
      <div className="about-overlay"></div>

      <div className="about-hero-content">
        <div className="about-line"></div>

        <div className="about-text">
          <h1>Who We Are</h1>
          <p>Shape your future with confidence</p>
        </div>
      </div>
    </section>
    
  );
}

export default Aboutushero;