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
          <h3>Benefits and beyond</h3>
          <p>
            Around the globe, Deloitte member firms offer comprehensive
            rewards and benefits to support the whole you.
          </p>
          <div className="career-line"></div>
        </div>

        <div className="career-card">
          <img src={img2} alt="Opportunities" />
          <h3>Benefits and beyond</h3>
          <p>
            Around the globe, Deloitte member firms offer comprehensive
            rewards and benefits to support the whole you.
          </p>
          <div className="career-line"></div>
        </div>

        <div className="career-card">
          <img src={img3} alt="Culture" />
          <h3>Benefits and beyond</h3>
          <p>
            Around the globe, Deloitte member firms offer comprehensive
            rewards and benefits to support the whole you.
          </p>
          <div className="career-line"></div>
        </div>

      </div>

    </section>
  );
}

export default Careermid;