import "./LandingSlide2.css";
import { useNavigate } from "react-router-dom";
import ButterflyAnimation from "../../components/Butterflyanimation/ButterflyAnimation";

export default function LandingSlide2({ currentSlide = 1, totalSlides = 3, onDotClick }) {
  const navigate = useNavigate();

  return (
    <section className="mitraa-landing2">

      <div className="mitraa-landing2-container">

        {/* LEFT VISUAL */}
        <div className="mitraa-landing2-visual">
          <div className="mitraa-landing2-circle-bg"></div>
          <div className="mitraa-landing2-vertical-bar"></div>
          <ButterflyAnimation />
        </div>

        {/* RIGHT TEXT */}
        <div className="mitraa-landing2-text">
          <h1>Company Overview</h1>
          <h3>Built for the AI-First Enterprise</h3>
          <p>
            Accelerating Business with Intelligent Automation.
            How our AI-driven solutions helped enterprises streamline operations,
            improve decision-making, and reduce time-to-market through smart
            automation and data intelligence.
          </p>
          <div className="mitraa-landing2-btn-wrap">
            <button
              className="mitraa-landing2-btn"
              onClick={() => navigate("/home")}
            >
              EXPLORE
            </button>
          </div>
        </div>

      </div>

      {/* SLIDER DOTS */}
      <div className="mitraa-landing2-dots">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <div
            key={i}
            className={`mitraa-landing2-dot${i === currentSlide ? " active" : ""}`}
            onClick={() => i !== currentSlide && onDotClick?.(i)}
            title={`Slide ${i + 1}`}
          />
        ))}
        <div className="mitraa-landing2-pill">Who We Are</div>
      </div>

    </section>
  );
}