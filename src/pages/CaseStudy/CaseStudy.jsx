import "./CaseStudy.css";
import Footer from "../../components/Footer/Footer.jsx";
import AIVideConference from "../../assets/images/AIVideoConferencingPlatform.png";

import AutonomousAIWebQuality from "../../assets/images/AutonomousAIWebQualityEngine.png";
import PricingApprovalWorkflow from "../../assets/images/PricingApprovalWorkflowSystem.png";
import AgenticRAGKnowledge from "../../assets/images/AgenticRAGKnowledgeSystem1.png";

const caseStudies = [
  {
    id: 1,
    title: "Autonomous AI Web Quality Engine",
    pdf: "/ai-crawl.pdf",
    image: AutonomousAIWebQuality
  },
  {
    id: 2,
    title: "AI Video Conferencing Platform",
    pdf: "ai-video.pdf",
    image: AIVideConference
  },
  {
    id: 3,
    title: "Pricing Approval Workflow System",
    pdf: "/pricing.pdf",
    image: PricingApprovalWorkflow
  },
  {
    id: 4,
    title: "Agentic RAG Knowledge System",
    pdf: "/rag.pdf",
    image: AgenticRAGKnowledge
  }
];

export default function CaseStudy() {

  const handleDownload = (file) => {
    const link = document.createElement("a");
    link.href = file;
    link.download = file;
    link.click();
  };

  return (
    <>
      <div className="cs-page">

        {/* HERO SECTION */}
        <div className="cs-hero">
          <p className="cs-subtitle">Real Challenges. Real Solutions.</p>
          <h1 className="cs-title">CASE STUDY</h1>
          <p className="cs-desc">
            Discover how our AI solutions solved complex challenges, optimized operations,
            and delivered measurable business impact across industries.
          </p>
        </div>

        {/* GRID */}
        <div className="cs-grid">
          {caseStudies.map((item) => (
            <div key={item.id} className="cs-item">

              {/* IMAGE CARD */}
              <div className="cs-card">
                <div className="cs-image-box">
                  <img src={item.image} alt="case" />
                </div>
              </div>

              {/* TEXT OUTSIDE */}
              <h3 className="cs-title-text">{item.title}</h3>

              <button
                className="cs-download-btn"
                onClick={() => handleDownload(item.pdf)}
              >
                Download
              </button>

            </div>
          ))}
        </div>

      </div>

      {/* FOOTER */}
      <Footer />
    </>
  );
}