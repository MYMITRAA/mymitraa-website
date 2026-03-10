import agile from "../../assets/images/brain.svg";
import "./ServicesContent.css";

export default function Agile() {
  return (
    <div className="service-container">

      <img src={agile} alt="Agile Development" />

      <div className="service-text">

        <h2>Enterprise Agile Development</h2>

        <p>
          We help enterprises move faster without losing control.
        </p>

        <p>
          By combining agile practices with AI-assisted planning,
          testing, and delivery, we reduce development cycles,
          improve quality, and help teams focus on building value
          rather than managing overhead.
        </p>

        <button>View More</button>

      </div>

    </div>
  );
}