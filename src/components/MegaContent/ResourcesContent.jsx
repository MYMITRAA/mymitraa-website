import resourceImg from "../../assets/images/resource.svg";
import "./ResourcesContent.css";

export default function ResourcesContent() {
  return (
    <div className="resources-content">

      <div className="resources-image">
        <img src={resourceImg} alt="Resources" />
      </div>

      <div className="resources-text">

        <h2>
          Resources & Insights
          <span className="heading-underline"></span>
        </h2>

        <p>
          Our Resources & Insights section brings together expert articles,
          explainers, and thought leadership content to help you understand AI
          technologies, evaluate use cases, and make informed decisions for
          successful business adoption.
        </p>

        <p>
          Explore curated resources, in-depth insights, and expert perspectives
          designed to simplify complex AI concepts, highlight real-world
          applications, and support confident, data-driven decision-making
          across your organization.
        </p>

        <button className="view-more-btn">
          View More
        </button>

      </div>

    </div>
  );
}