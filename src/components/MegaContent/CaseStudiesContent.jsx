import caseImg from "../../assets/images/casestudy.svg";
import "./CasestudiesContent.css";

export default function CaseStudiesContent() {
  return (
    <div className="casestudies-content">

      <div className="casestudies-image">
        <img src={caseImg} alt="Case Studies" />
      </div>

      <div className="casestudies-text">

        <h2>
          Proven Success Stories
          <span className="heading-underline"></span>
        </h2>

        <p>
          Discover real-world case studies showcasing how our AI-driven
          solutions helped organizations streamline operations,
          enhance decision-making, and achieve impactful business results.
        </p>

        <p>
          See how businesses transformed their processes using our AI
          solutions—solving complex challenges, reducing manual effort,
          and driving smarter, faster outcomes.
        </p>

        <p>
          Explore how our AI solutions solved real business challenges,
          improved efficiency, and delivered measurable outcomes
          through practical implementation and smart automation
          across industries.
        </p>

        <button className="view-more-btn">
          View More
        </button>

      </div>

    </div>
  );
}