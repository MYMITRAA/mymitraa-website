import "./Explore.css";
import treeBg from "../../assets/images/treebg.svg";
import { useNavigate } from "react-router-dom";

function Explore() {
  const navigate = useNavigate();
  return (
    <section className="explore-section">

      <img src={treeBg} alt="" className="explore-bg-img" />

      <div className="explore-container">

        <div className="explore-content">

          <h2 className="explore-title">
            Engineering the Moral Foundation of <br />
            the Intelligent World
          </h2>

          <p className="explore-description">
            We are building ethical, explainable, and accountable frameworks to <br />
            guide physical AI as it moves into the real world placing <br />
            humanity, trust, and responsibility at the core of <br />
            intelligence.
          </p>

          <button className="explore-btn" onClick={() => navigate("/agi")}>Explore</button>

        </div>

        <p className="explore-quote">
          "Smart enough to lead, responsible enough to trust we built for growth, guided by values."
        </p>

      </div>
    </section>
  );
}

export default Explore;