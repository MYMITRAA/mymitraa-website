import "./Careerend.css";
import { useNavigate } from "react-router-dom";
import internImg from "../../assets/images/imgintern.webp";
import earlyImg from "../../assets/images/imgmid.webp";
import expImg from "../../assets/images/imgend.webp";

function CareerEnd() {
  const navigate = useNavigate();
  return (
    <section className="career-end">

      <div className="career-end-container">

     
        <h2 className="career-end-title">
          Are you ready to shape your future with confidence?
        </h2>

        <p className="career-end-desc">
          Our people are at the core of everything we do. Bringing a wealth of
          experience and Perspective to the table, it is these people who help
          solve some of our clients’ and communities’ greatest challenges—who
          make the real impact that matters.
        </p>

    
        <div className="career-end-grid">

       
          <div className="career-end-card">
            <div className="career-image-wrapper">
              <img src={internImg} alt="Internship" />
            </div>
            <h3>Internship</h3>
            <button className="career-btn" onClick={() => navigate("/jobs")}>
              Find Jobs <span>↗</span>
            </button>
          </div>

          
          <div className="career-end-card">
            <div className="career-image-wrapper">
              <img src={earlyImg} alt="Early Careers" />
            </div>
            <h3>Early careers</h3>
            <button className="career-btn" onClick={() => navigate("/jobs")}>
              Find Jobs <span>↗</span>
            </button>
          </div>

          
          <div className="career-end-card">
            <div className="career-image-wrapper">
              <img src={expImg} alt="Experienced" />
            </div>
            <h3>Experienced professionals</h3>
            <button className="career-btn"  onClick={() => navigate("/jobs")}>
              Find Jobs <span>↗</span>
            </button>
          </div>

        </div>

      </div>

    </section>
  );
}

export default CareerEnd;