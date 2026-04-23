import brain from "../../assets/images/megamenubrain.jpg";
import "./ServicesContent.css";
import { useNavigate } from "react-router-dom";

export default function GenAI({ closeMenu }) {

  const navigate = useNavigate();

  const handleViewMore = () => {
    // if (closeMenu) closeMenu();   // close the megamenu
    navigate("/genai");           // navigate to page
  };

  return (
    <div className="service-container">

      <img src={brain} alt="Generative AI" />

      <div className="service-text">

        <h2>Generative AI Solutions</h2>

        <p>
          We build AI systems that understand, assist, and adapt.
        </p>

        <p>
          From intelligent assistants to business-specific AI workflows, we use
          generative AI to reduce manual work, improve decision-making,
          and create smarter interactions across your organization.
          Our focus is always on usefulness, not complexity.
        </p>

        <button onClick={handleViewMore}>
          View More
        </button>

      </div>

    </div>
  );
}