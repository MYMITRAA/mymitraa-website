import { useState } from "react";
import "./Execution.css";

import about1 from "../../assets/images/about1.png";
import about2 from "../../assets/images/about22.png";
import about3 from "../../assets/images/about33.png";
import about4 from "../../assets/images/about44.png";

const items = [
  {
    title: "Why We Exist",
    image: about1,
    content:
      "We exist to simplify complexity. Businesses are surrounded by tools, data, and systems, yet clarity is often missing. Our purpose is to create intelligent systems that quietly support decisions, reduce pressure on teams, and make growth feel manageable instead of overwhelming.",
  },
  {
    title: "Our Mindset",
    image: about2,
    content:
      "We believe clarity beats complexity. Our mindset is rooted in precision, responsibility, and building systems that truly serve people.",
  },
  {
    title: "Our Values in Action",
    image: about3,
    content:
      "We value transparency, accountability, and long-term impact. Every solution we design is built to create measurable results.",
  },
  {
    title: "Our Role in Your Journey",
    image: about4,
    content:
      "We partner with you to simplify operations, strengthen decisions, and ensure technology works quietly behind your success.",
  },
];

function Execution() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [animating, setAnimating] = useState(false);

  const toggleItem = (index) => {
    if (index === activeIndex || animating) return;
    setAnimating(true);
    setPrevIndex(activeIndex);
    setActiveIndex(index);
    setTimeout(() => {
      setPrevIndex(null);
      setAnimating(false);
    }, 420);
  };

  return (
    <section className="execution">
      <div className="execution-container">

        <h2 className="execution-title">
          Execution is our <span>Culture</span>, Every decision ends in <span>Delivery</span>
        </h2>

        <div className="execution-content">

          {/* ── Left: Accordion ── */}
          <div className="execution-left">
            {items.map((item, index) => (
              <div
                key={index}
                className={`execution-item ${activeIndex === index ? "active" : ""}`}
              >
                <div className="execution-header" onClick={() => toggleItem(index)}>
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

          {/* ── Right: Animated Image Panel ── */}
          <div className="execution-right">
            <div className="execution-image-box">

              {/* Ambient background pulse */}
              <div className="exec-bg-pulse" />

              {/* Floating particles */}
              <div className="exec-particle exec-p1" />
              <div className="exec-particle exec-p2" />
              <div className="exec-particle exec-p3" />

              {/* Images — one per accordion item */}
              {items.map((item, index) => (
                <img
                  key={index}
                  src={item.image}
                  alt={item.title}
                  className={`exec-img
                    ${activeIndex === index ? "exec-img--active" : ""}
                    ${prevIndex === index ? "exec-img--exit" : ""}
                  `}
                />
              ))}

            </div>
          </div>

        </div>
      </div>
      <hr style={{ border: "1px solid #E0E0E0", margin: "0" }} />
    </section>
  );
}

export default Execution;
