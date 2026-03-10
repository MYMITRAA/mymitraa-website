import "./LandingSlide3.css";
import eagle from "../../assets/images/landingeagle.png";
import { useNavigate } from "react-router-dom";

export default function LandingSlide3() {
  const navigate = useNavigate();

  return (
    <section className="mitraa-landing3">

      <div className="mitraa-landing3-container">

        {/* LEFT TEXT */}
        <div className="mitraa-landing3-text">

          <h2>Powering Businesses with</h2>

          <h1>
            ARTIFICIAL <br />
            INTELLIGENCE
          </h1>

          <p>
            IDEA → INNOVATION → IMPLEMENTATION → IMPACT
          </p>

          <button
            className="mitraa-landing3-btn"
            onClick={() => navigate("/home")}
          >
            EXPLORE
          </button>

        </div>


        {/* RIGHT DESIGN */}
        <div className="mitraa-landing3-design">

          <div className="mitraa-landing3-circle"></div>

          <div className="mitraa-landing3-bar"></div>

          <img
            src={eagle}
            alt="Eagle"
            className="mitraa-landing3-eagle"
          />

        </div>

      </div>


      {/* SLIDER INDICATOR */}
      <div className="mitraa-landing3-dots">

        <div className="mitraa-landing3-dot"></div>
        <div className="mitraa-landing3-dot"></div>
        <div className="mitraa-landing3-dot active"></div>
        <div className="mitraa-landing3-dot"></div>
        <div className="mitraa-landing3-dot"></div>

        <div className="mitraa-landing3-pill">
          What We Do
        </div>

      </div>

    </section>
  );
}