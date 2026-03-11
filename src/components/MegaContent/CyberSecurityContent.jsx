import security from "../../assets/images/cybersecurity.png";
import "./ServicesContent.css";

export default function CyberSecurity() {
  return (
    <div className="service-container">

      <img src={security} alt="Cyber Security" />

      <div className="service-text">

        <h2>Cyber Security</h2>

        <p>
          Security is not an add-on — it’s built into everything we deliver.
        </p>

        <p>
          We use AI-driven monitoring and analysis to detect risks early,
          protect systems continuously, and strengthen digital resilience
          while keeping user experience smooth and uninterrupted.
        </p>

        <button>View More</button>

      </div>

    </div>
  );
}