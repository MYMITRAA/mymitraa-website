import "./LandingSlide1.css";
import robot from "../../assets/images/landing1robot.svg";
import { useNavigate } from "react-router-dom";

export default function LandingSlide1() {

  const navigate = useNavigate();

  return (
    <section className="mitraa-landing1">

      {/* BIG BACKGROUND CIRCLE */}
      <div className="mitraa-landing1-bigcircle"></div>

      {/* SMALL GLOW CIRCLE */}
      <div className="mitraa-landing1-circle"></div>

      <div className="mitraa-landing1-container">

        {/* LEFT CONTENT */}
        <div className="mitraa-landing1-text">

          <h2>Powering Businesses with</h2>

          <h1>ARTIFICIAL INTELLIGENCE</h1>

          <p>IDEA → INNOVATION → IMPLEMENTATION → IMPACT</p>

          <button
            className="mitraa-landing1-btn"
            onClick={() => navigate("/home")}
          >
            EXPLORE
          </button>

        </div>

        {/* RIGHT IMAGE */}
        <div className="mitraa-landing1-image">
          <img src={robot} alt="AI Robot" />
        </div>

      </div>

      {/* SLIDER INDICATOR */}
      <div className="mitraa-landing1-dots">
        <div className="mitraa-landing1-dot active"></div>
        <div className="mitraa-landing1-dot"></div>
        <div className="mitraa-landing1-dot"></div>
        <div className="mitraa-landing1-dot"></div>
        <div className="mitraa-landing1-dot"></div>

        <div className="mitraa-landing1-pill">Home</div>
      </div>

    </section>
  );
}