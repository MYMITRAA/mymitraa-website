import "./LandingSlide1.css";
import RobotAnimation from "../Robotanimation/RobotAnimation.jsx";
import { useNavigate } from "react-router-dom";
import ellipse from "../../assets/images/Ellipse_4.svg";

export default function LandingSlide1({ currentSlide = 0, totalSlides = 3, onDotClick }) {
  const navigate = useNavigate();

  return (
    <section className="ls1">

      {/* ══ MAIN CONTENT ══ */}
      <div className="ls1__container">

        {/* ── LEFT — Text ── */}
        <div className="ls1__text">
          <h2 className="ls1__subtitle">Powering Businesses with</h2>
          <h1 className="ls1__title">ARTIFICIAL INTELLIGENCE</h1>

          <div className="ls1__tagline">
            {["IDEA", "INNOVATION", "IMPLEMENTATION", "IMPACT"].map((word, i, arr) => (
              <span key={word}>
                <span className="ls1__tagline-word">{word}</span>
                {i < arr.length - 1 && (
                  <span className="ls1__tagline-arrow"> → </span>
                )}
              </span>
            ))}
          </div>

          <button className="ls1__btn" onClick={() => navigate("/home")}>
            EXPLORE
          </button>
        </div>

        {/* ── RIGHT — Robot + Ellipse ── */}
        <div className="ls1__robot-wrap">
          <img src={ellipse} alt="" className="ls1__ellipse" aria-hidden="true" />
          <div className="ls1__robot-inner">
            <RobotAnimation />
          </div>
        </div>

      </div>

      {/* ── BOTTOM DOTS ── */}
      <div className="ls1__dots">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <span
            key={i}
            className={`ls1__dot${i === currentSlide ? " ls1__dot--active" : ""}`}
            onClick={() => i !== currentSlide && onDotClick?.(i)}
            title={`Slide ${i + 1}`}
          />
        ))}
        <span className="ls1__pill">Home</span>
      </div>

    </section>
  );
}