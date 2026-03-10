import enterprise from "../../assets/images/brain.svg";
import "./ServicesContent.css";

export default function EnterpriseTechnology() {
  return (
    <div className="service-container">

      <img src={enterprise} alt="Enterprise Technology & Performance" />

      <div className="service-text">

        <h2>Enterprise Technology & Performance</h2>

        <p>
          We optimize enterprise systems to perform better, scale smarter,
          and run lighter.
        </p>

        <p>
          Through AI-based analysis and automation, we identify bottlenecks,
          improve system efficiency, and ensure your technology stack
          supports growth instead of slowing it down.
        </p>

        <button>View More</button>

      </div>

    </div>
  );
}