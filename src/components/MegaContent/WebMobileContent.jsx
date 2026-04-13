import mobile from "../../assets/images/webandappimage1.webp";
import "./ServicesContent.css";
import { useNavigate } from "react-router-dom";

export default function Web() {
    const navigate = useNavigate();

  return (
    <div className="service-container">

      <img src={mobile} alt="Web Development" />

      <div className="service-text">

        <h2>Web & Application Development</h2>

        <p>
          We design and develop modern web and application platforms powered by AI.
        </p>

        <p>
          Our applications are built to be intuitive, scalable, and intelligent —
          using AI to personalize experiences, automate processes, and
          continuously improve performance based on real usage patterns.
        </p>

        <button onClick={() => navigate("/web")}>View More</button>

      </div>

    </div>
  );
}