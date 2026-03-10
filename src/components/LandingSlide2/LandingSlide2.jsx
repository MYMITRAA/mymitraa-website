import "./LandingSlide2.css";
import butterfly from "../../assets/images/landingpage2butterfly.svg";
import { useNavigate } from "react-router-dom";

export default function LandingSlide2() {

  const navigate = useNavigate();

  return (

    <section className="mitraa-landing2">

      <div className="mitraa-landing2-container">

        {/* LEFT VISUAL */}
        <div className="mitraa-landing2-visual">

          <div className="mitraa-landing2-circle-bg"></div>

          <div className="mitraa-landing2-vertical-bar"></div>

          <img
            src={butterfly}
            alt="Butterfly"
            className="mitraa-landing2-butterfly"
          />

        </div>


        {/* RIGHT TEXT */}
        <div className="mitraa-landing2-text">

          <h1>Company Overview</h1>

          <h3>Built for the AI-First Enterprise</h3>

          <p>
            Accelerating Business with Intelligent Automation. How our
            AI-driven solutions helped enterprises streamline operations,
            improve decision-making, and reduce time-to-market through
            smart automation and data intelligence.
          </p>

          <button
            className="mitraa-landing2-btn"
            onClick={() => navigate("/home")}
          >
            EXPLORE
          </button>

        </div>

      </div>


      {/* SLIDER DOTS */}
      <div className="mitraa-landing2-dots">

        <div className="mitraa-landing2-dot"></div>
        <div className="mitraa-landing2-dot active"></div>
        <div className="mitraa-landing2-dot"></div>
        <div className="mitraa-landing2-dot"></div>
        <div className="mitraa-landing2-dot"></div>

        <div className="mitraa-landing2-pill">
          Who We Are
        </div>

      </div>

    </section>
  );
}