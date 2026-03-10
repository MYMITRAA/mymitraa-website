import portfolioImg from "../../assets/images/casestudy.svg";

import "./PortfolioContent.css"

export default function PortfolioContent() {
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

        <button>View More</button>
      </div>
    </>
  );
}