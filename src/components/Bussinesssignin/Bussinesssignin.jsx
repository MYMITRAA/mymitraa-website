import { useState } from "react";
import "./Bussinesssignin.css";
import bird from "../../assets/images/bird1.webp";
import logo from "../../assets/logo/icon-blue.svg";
import mitra from "../../assets/logo/mitraa.svg";

function Bussinesssignin({ onClose }) {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="auth-overlay">

      <div className="auth-container">

        
        <button className="auth-close" onClick={onClose}>×</button>

       
        <img src={bird} alt="Bird" className={`auth-bird ${isSignup ? "auth-bird--signup" : ""}`} />

        <div className="auth-card">

         <div className="auth-line-img">
          <img src={logo} alt="Logo" className="auth-logo" />
          <img src={mitra} alt="Mitraa Logo" className="auth-logo" />
            </div>

          {!isSignup ? (
            <>
              <h2>Sign in</h2>
              <p className="auth-sub">Shape your career with us</p>

              <div className="auth-field">
                <label>Email Id</label>
                <input type="email" placeholder="Enter your email address" />
              </div>

              <div className="auth-field">
                <label>Password</label>
                <input type="password" placeholder="Enter your password" />
                <span className="forgot">Forgot Password?</span>
              </div>

              <button className="auth-btn">Sign in</button>

              <p className="auth-switch">
                Create an account{" "}
                <span onClick={() => setIsSignup(true)}>Sign up</span>
              </p>
            </>
          ) : (
            <>
              <h2>Sign up</h2>
              <p className="auth-sub">
                Sign up to apply for opportunities and grow your career
              </p>

              <div className="auth-field">
                <label>Name</label>
                <input type="text" placeholder="Enter full name" />
              </div>

              <div className="auth-field">
                <label>Email Id</label>
                <input type="email" placeholder="Enter email address" />
              </div>

              <div className="auth-field">
                <label>Mobile</label>
                <input type="text" placeholder="Mobile" />
              </div>

              <div className="auth-field">
                <label>Password</label>
                <input type="password" placeholder="Enter your password" />
              </div>

              <button className="auth-btn">Sign up</button>

              <p className="auth-switch">
                Already have an account?{" "}
                <span onClick={() => setIsSignup(false)}>Sign in</span>
              </p>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default Bussinesssignin;