import { useState } from "react";
import "./Signinmodel.css";
import Bussinesssignin from "../Bussinesssignin/Bussinesssignin";
import Careersignin from "../Careersignin/Careersignin";

function Signinmodel({ onClose }) {
  const [activeTab, setActiveTab] = useState("careers");
  const [showAuth, setShowAuth] = useState(false);

  return (
    <>
      {!showAuth && (
        <div className="modal-overlay">
          <div className="modal-card">

            <button className="modal-close" onClick={onClose}>×</button>

            <div className="modal-tabs">
              <button
                className={activeTab === "careers" ? "active" : ""}
                onClick={() => setActiveTab("careers")}
              >
                Careers
              </button>

              <button
                className={activeTab === "business" ? "active" : ""}
                onClick={() => setActiveTab("business")}
              >
                Business
              </button>
            </div>

            {activeTab === "careers" ? (
              <>
                <h2 className="modal-title">Build Your Future With Us</h2>
                <p className="modal-desc">
                  Sign in to continue your career journey with us.
                </p>
              </>
            ) : (
              <>
                <h2 className="modal-title">Let's Build Strong Partnerships</h2>
                <p className="modal-desc">
                  Sign in to connect, collaborate, and unlock new business potential.
                </p>
              </>
            )}

            <button
              className="modal-signin-btn"
              onClick={() => setShowAuth(true)}
            >
              Sign in
            </button>

          </div>
        </div>
      )}

      {/* Render based on active tab */}
      {showAuth && activeTab === "careers" && (
        <Careersignin onClose={() => setShowAuth(false)} />
      )}

      {showAuth && activeTab === "business" && (
        <Bussinesssignin onClose={() => setShowAuth(false)} />
      )}
    </>
  );
}

export default Signinmodel;