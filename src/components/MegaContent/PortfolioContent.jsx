import portfolioImg from "../../assets/images/portfoliomegabar.png";
import { useNavigate } from "react-router-dom";
import "./PortfolioContent.css"

export default function PortfolioContent() {
  const navigate = useNavigate();
  return (
    <>
      <img src={portfolioImg} alt="" />

      <div className="mega-text">
        <h2>Our Portfolio</h2>

        <p>
          Explore our portfolio showcasing innovative AI solutions,
          digital products, and enterprise systems delivered
          across industries.
        </p>

        <button onClick={() => navigate("/portfolio")}>View More</button>
      </div>
    </>
  );
}