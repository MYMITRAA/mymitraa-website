import { useState } from "react";
import "./Discover.css";
import birdimage from "../../assets/images/bird1.webp";
import birdEyeClosed from "../../assets/images/birdeyeclosed.webp";
import brainImage from "../../assets/images/aihandai.webp";
import robotHand from "../../assets/images/aibussinessimpact1.png";
import robot from "../../assets/images/aiinaction.webp";
import problem1 from "../../assets/images/problem1.svg";
import problem2 from "../../assets/images/problem2.svg";

function Discover() {
  const [isBirdHovered, setIsBirdHovered] = useState(false);

  return (
    <section className="discover">
      <div className="discover-content">
        <h2 className="discover-title">
          Discover what's happening
        </h2>

        <div className="discover-grid">

          {/* LEFT TOP */}
          <div className="discover-card small-card top-card">
            <div className="top-card-image">
              <img src={problem1} alt="Problem Base" className="problem-base" />
              <img src={problem2} alt="Problem Overlay" className="problem-overlay" />
            </div>
            <div className="top-card-text">
              <h3>Problem We Solve</h3>
              <p>
                Growing workloads, manual processes, disconnected systems,
                and high operational costs slowing decisions and limiting visibility.
              </p>
            </div>
          </div>

          {/* LEFT BOTTOM */}
          <div className="discover-card small-card bottom-card">
            <div className="bottom-card-image">
              <img src={robot} alt="AI Robot" />
            </div>
            <div className="bottom-card-content">
              <h3>AI in Action</h3>
              <p>
                AI automates tasks, understands data, integrates with your tools,
                and works in real time seamlessly within your workflow.
              </p>
            </div>
          </div>

      {/* CENTER */}
<div
  className="center-space"
  onMouseEnter={() => setIsBirdHovered(true)}
  onMouseLeave={() => setIsBirdHovered(false)}
>
  <img
    src={isBirdHovered ? birdEyeClosed : birdimage}
    alt="Bird"
    className={isBirdHovered ? "bird-closed" : "bird-open"}
  />
</div>

          {/* RIGHT TOP */}
          <div className="discover-card wide-card top-right">
            <div className="top-right-content">
              <div className="top-right-text">
                <h3>How We Think About AI</h3>
                <p>
                  We design AI as a support layer for your business, not a replacement
                  for people.
                </p>
                <p>
                  Our systems understand context, assist decisions,
                  and work quietly in the background to improve everyday operations.
                </p>
              </div>
              <div className="top-right-image">
                <img src={brainImage} alt="AI Brain" />
              </div>
            </div>
          </div>

          {/* RIGHT BOTTOM */}
          <div className="discover-card wide-card bottom-right">
            <div className="bottom-right-content">
              <div className="bottom-right-text">
                <h3>Business Impact</h3>
                <p>
                  Reduced operational load, faster and smarter decisions,
                  lower long-term costs, and better customer experiences —
                  so your teams focus on growth.
                </p>
              </div>
              <div className="bottom-right-image">
                <img src={robotHand} alt="Robot Hand" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Discover;