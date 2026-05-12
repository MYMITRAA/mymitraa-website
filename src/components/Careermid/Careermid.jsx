import "./Careermid.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../config/api";

import img1 from "../../assets/images/career1.svg";
import img2 from "../../assets/images/career2.svg";
import img3 from "../../assets/images/career3.jpg";

function Careermid() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(API.me, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.is_admin) setIsAdmin(true);
      })
      .catch(() => setIsAdmin(false));
  }, []);

  return (
    <section className="careers-mid">

      {/* Top-right admin button */}
      {isAdmin && (
        <div className="admin-top-right">
          <button
            className="view-applications-btn"
            onClick={() => navigate("/admin-application")}
          >
            View Applications
          </button>
        </div>
      )}

      <h2 className="careers-mid-title">Why join MiTRA ?</h2>

      <div className="careers-mid-grid">

        <div className="career-card">
          <img src={img1} alt="Growth" />
          <h3>Empower Your Potential</h3>
          <p>
           Unlock a workplace where your growth is not just encouraged it’s engineered. We invest in continuous learning, leadership development, and real world problem solving so you can evolve faster than the industry. From mentorship programs to cutting edge projects, every step you take here builds a stronger, smarter version of you.
          </p>
          <div className="career-line"></div>
        </div>

        <div className="career-card">
          <img src={img2} alt="Opportunities" />
          <h3>Accelerate Your Growth</h3>
          <p>
            Be part of an environment designed for momentum. We provide the tools, exposure, and opportunities you need to scale your career at speed. Whether it’s mastering new technologies, leading impactful initiatives, or collaborating with top talent, your journey forward is always in motion.

          </p>
          <div className="career-line"></div>
        </div>

        <div className="career-card">
          <img src={img3} alt="Culture" />
          <h3>Build a Meaningful Future</h3>
          <p>
           Your work should matter. Here, every contribution drives innovation, sustainability, and real impact. We believe in creating value not just for businesses, but for communities and the future. Grow with purpose, contribute with passion, and leave a legacy that goes beyond the workplace.
          </p>
          <div className="career-line"></div>
        </div>

      </div>

    </section>
  );
}

export default Careermid;