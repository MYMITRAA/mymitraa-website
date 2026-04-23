import { useState } from "react";
import "./Execution.css";
import lensImage from "../../assets/images/lens.webp";

function Execution() {

  const [activeIndex, setActiveIndex] = useState(0);

  const toggleItem = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const items = [
    {
      title: "Why We Exist",
      content:
        "We exist to simplify complexity. Businesses are surrounded by tools, data, and systems, yet clarity is often missing. Our purpose is to create intelligent systems that quietly support decisions, reduce pressure on teams, and make growth feel manageable instead of overwhelming."
    },
    {
      title: "Our Mindset",
      content:
        "We believe clarity beats complexity. Our mindset is rooted in precision, responsibility, and building systems that truly serve people."
    },
    {
      title: "Our Values in Action",
      content:
        "We value transparency, accountability, and long-term impact. Every solution we design is built to create measurable results."
    },
    {
      title: "Our Role in Your Journey",
      content:
        "We partner with you to simplify operations, strengthen decisions, and ensure technology works quietly behind your success."
    }
  ];

  return (
    <section className="execution">
      <div className="execution-container">

        <h2 className="execution-title">
          Execution is our <span>Culture</span>, Every decision ends in <span>Delivery</span>
        </h2>

        <div className="execution-content">

          
          <div className="execution-left">

            {items.map((item, index) => (
              <div
                key={index}
                className={`execution-item ${activeIndex === index ? "active" : ""}`}
              >

                <div
                  className="execution-header"
                  onClick={() => toggleItem(index)}
                >
                  <h3>{item.title}</h3>

                  <span className={`chevron ${activeIndex === index ? "rotate" : ""}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M6 9L12 15L18 9" stroke="#060821" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>

                </div>

                <div className={`execution-answer ${activeIndex === index ? "show" : ""}`}>
                  <p>{item.content}</p>
                </div>

              </div>
            ))}

            <p className="execution-footer">
              MiTRA is where thoughtful engineering meets meaningful impact.
            </p>

          </div>

         
          <div className="execution-right">
            <div className="execution-image-box">
              <img src={lensImage} alt="Lens Illustration" />
            </div>
          </div>

        </div>
      </div>
      <hr style={{border: "1px solid #E0E0E0", margin: "0"}} />
    </section>
  );
}

export default Execution;