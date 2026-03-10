import brain from "../../assets/images/brain.svg";
import "./ServicesContent.css";

export default function ServicesContent() {
  return (
    <>
      <img src={brain} alt="" />

      <div className="mega-text">
        <h2>Generative AI Solutions</h2>

        <p>
          From intelligent assistants to business-specific AI workflows,
          we use generative AI to reduce manual work, improve decision-making
          and create smarter interactions.
        </p>

        <button>View More</button>
      </div>
    </>
  );
}