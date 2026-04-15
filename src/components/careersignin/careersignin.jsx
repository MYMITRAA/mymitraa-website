import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Careersignin.css";
import bird from "../../assets/images/birdimage.svg";
import logo from "../../assets/logo/icon-blue.svg";
import mitra from "../../assets/logo/mitraa.svg";

const BASE_URL = "http://127.0.0.1:8000/auth";

function Careersignin({ onClose }) {
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Login failed");

      localStorage.setItem("token", data.access_token);
      onClose();
      navigate("/home"); // redirect after login

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          password: formData.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Registration failed");

      setSuccess("Account created! Please sign in.");
      setIsSignup(false);
      setFormData({ name: "", email: "", mobile: "", password: "" });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-container">

        <button className="auth-close" onClick={onClose}>×</button>

        <img
          src={bird}
          alt="Bird"
          className={`auth-bird ${isSignup ? "auth-bird--signup" : ""}`}
        />

        <div className="auth-card">
          <div className="auth-line-img">
            <img src={logo} alt="Logo" className="auth-logo" />
            <img src={mitra} alt="Mitraa Logo" className="auth-logo" />
          </div>

          {error   && <p className="auth-error">{error}</p>}
          {success && <p className="auth-success">{success}</p>}

          {!isSignup ? (
            <>
              <h2>Sign in</h2>
              <p className="auth-sub">Shape your career with us</p>

              <div className="auth-field">
                <label>Email Id</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="auth-field">
                <label>Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <span className="forgot">Forgot Password?</span>
              </div>

              <button className="auth-btn" onClick={handleLogin} disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </button>

              <p className="auth-switch">
                Create an account{" "}
                <span onClick={() => { setIsSignup(true); setError(""); }}>
                  Sign up
                </span>
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
                <input
                  name="name"
                  type="text"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="auth-field">
                <label>Email Id</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="auth-field">
                <label>Mobile</label>
                <input
                  name="mobile"
                  type="text"
                  placeholder="Mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </div>

              <div className="auth-field">
                <label>Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <button className="auth-btn" onClick={handleRegister} disabled={loading}>
                {loading ? "Signing up..." : "Sign up"}
              </button>

              <p className="auth-switch">
                Already have an account?{" "}
                <span onClick={() => { setIsSignup(false); setError(""); }}>
                  Sign in
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Careersignin;