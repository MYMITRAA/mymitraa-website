import React, { useEffect, useRef, useState } from "react";
import "./AllServiceMid.css";

import bird from "../../assets/images/Mascot3.png";
import team1 from "../../assets/images/team1image.svg";
import team2 from "../../assets/images/team1image.svg";
import team3 from "../../assets/images/team1image.svg";
import team4 from "../../assets/images/team1image.svg";

function useCountUp(target, suffix, duration, started) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!started) return;
    let current = 0;
    const step = Math.ceil(target / (duration / 16));
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      setValue(current);
      if (current >= target) clearInterval(interval);
    }, 16);
    return () => clearInterval(interval);
  }, [started, target, duration]);

  return value + suffix;
}

const AllServiceMid = () => {
  const [started, setStarted] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const projects = useCountUp(10, "+", 1000, started);
  const clients  = useCountUp(8,  "+", 1200, started);
  const repeat   = useCountUp(70, "%", 1400, started);
  const delivery = useCountUp(100, "%", 1600, started);

  return (
    <section className="allservicemid">

      {/* Header */}
      <div className="why-header">
        <h2>Why Choose Us</h2>
        <p>
          Design and manage data pipelines and analytics systems to turn raw
          data into actionable business insights.
        </p>
      </div>

      <div className="why-grid">

        {/* LEFT CARD */}
        <div className="zenix-card" ref={cardRef}>

          <div className="bird-circle">
            <img src={bird} alt="bot" />
          </div>

          <h3>Zenix</h3>

          <div className="bot-tag">
            MY MITRAA CHAT BOT
          </div>

          <div className="stats">

            <div className="stat">
              <h2>{projects}</h2>
              <p>Projects Delivered</p>
            </div>

            <div className="divider"></div>

            <div className="stat">
              <h2>{clients}</h2>
              <p>Active Clients</p>
            </div>

            <div className="stat">
              <h2>{repeat}</h2>
              <p>Repeat Engagements</p>
            </div>

            <div className="divider"></div>

            <div className="stat">
              <h2>{delivery}</h2>
              <p>Commitment to On-Time Delivery</p>
            </div>

          </div>

        </div>


        {/* RIGHT SIDE */}
        <div className="why-right">

          {/* Card 1 */}
          <div className="right-card-1">
            <h4>Scalability Issues</h4>
            <p>
              Scalability issues arise when systems fail to handle growing
              users, data, or workloads efficiently, causing performance
              drops and downtime.
            </p>
          </div>

          {/* Card 2 */}
          <div className="right-card-2">
            <h4>Scalability Issues</h4>
            <p>
              Scalability issues arise when systems fail to handle growing
              users, data, or workloads efficiently, causing performance
              drops and downtime.
            </p>
          </div>

          {/* Card 3 */}
          <div className="right-card-3">
            <h4>Professional & Creative Team</h4>
            <p>
              A professional and creative team delivering innovative ideas,
              strategic solutions, collaboration, expertise, dedication,
              and measurable results.
            </p>

            <div className="team-row">
              <img src={team1} alt="team" />
              <img src={team2} alt="team" />
              <img src={team3} alt="team" />
              <img src={team4} alt="team" />
              <div className="team-count">15+</div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default AllServiceMid;