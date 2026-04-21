import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Careersignin.css";
import bird  from "../../assets/images/birdimage.svg";
import logo  from "../../assets/logo/icon-blue.svg";
import mitra from "../../assets/logo/mitraa.svg";
import { API } from "../../config/api";

function Careersignin({ onClose, onSuccess = null }) {
  const [isSignup,      setIsSignup]      = useState(false);
  const [loading,       setLoading]       = useState(false);
  const [error,         setError]         = useState("");
  const [success,       setSuccess]       = useState("");
  const [touched,       setTouched]       = useState({});
  const [showPassword,  setShowPassword]  = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "", email: "", mobile: "", password: "",
  });

  const validate = (fields, mode) => {
    const errs = {};

    if (mode === "signup") {
      if (!fields.name.trim())
        errs.name = "Full name is required.";
      else if (fields.name.trim().length < 2)
        errs.name = "Name must be at least 2 characters.";
      else if (!/^[a-zA-Z\s]+$/.test(fields.name))
        errs.name = "Name can only contain letters and spaces.";
    }

    if (!fields.email.trim())
      errs.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      errs.email = "Enter a valid email address (e.g. you@example.com).";

    if (mode === "signup") {
      if (!fields.mobile.trim())
        errs.mobile = "Mobile number is required.";
      else if (!/^\+?[0-9]{7,15}$/.test(fields.mobile.replace(/\s/g, "")))
        errs.mobile = "Enter a valid mobile number (7–15 digits).";
    }

    if (!fields.password)
      errs.password = "Password is required.";
    else if (mode === "signup") {
      if (fields.password.length < 8)
        errs.password = "Password must be at least 8 characters.";
      else if (!/[A-Z]/.test(fields.password))
        errs.password = "Password must contain at least one uppercase letter.";
      else if (!/[0-9]/.test(fields.password))
        errs.password = "Password must contain at least one number.";
      else if (!/[^a-zA-Z0-9]/.test(fields.password))
        errs.password = "Password must contain at least one special character.";
    }

    return errs;
  };

  const mode       = isSignup ? "signup" : "login";
  const allErrors  = validate(formData, mode);
  const fieldError = (field) => touched[field] ? allErrors[field] : undefined;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const touchAll = (fields) => {
    const all = {};
    fields.forEach(f => all[f] = true);
    setTouched(all);
  };

  const EyeIcon = () => (
    showPassword ? (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    )
  );

  // ─── Login ──────────────────────────────────────────────────────
  const handleLogin = async () => {
    touchAll(["email", "password"]);
    const errs = validate(formData, "login");
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    setError("");
    try {
      const res = await fetch(API.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Login failed");

      localStorage.setItem("token",     data.access_token);
      localStorage.setItem("userName",  data.name);
      localStorage.setItem("userEmail", data.email);
      localStorage.setItem("isAdmin",   data.is_admin);

      window.dispatchEvent(new Event("userLoggedIn"));

      if (typeof onSuccess === "function") {
        onSuccess();
      } else {
        navigate("/home");
        onClose();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ─── Register ───────────────────────────────────────────────────
  const handleRegister = async () => {
    touchAll(["name", "email", "mobile", "password"]);
    const errs = validate(formData, "signup");
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(API.register, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:     formData.name,
          email:    formData.email,
          mobile:   formData.mobile,
          password: formData.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Registration failed");

      setSuccess("Account created! Please sign in.");
      setIsSignup(false);
      setFormData({ name: "", email: "", mobile: "", password: "" });
      setTouched({});
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (toSignup) => {
    setIsSignup(toSignup);
    setError("");
    setSuccess("");
    setTouched({});
    setShowPassword(false);
    setFormData({ name: "", email: "", mobile: "", password: "" });
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
            <img src={logo}  alt="Logo"        className="auth-logo" />
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
                  onBlur={handleBlur}
                  className={fieldError("email") ? "input-error" : ""}
                />
                {fieldError("email") && (
                  <span className="field-error">{fieldError("email")}</span>
                )}
              </div>

              <div className="auth-field">
                <label>Password</label>
                <div className="auth-password-wrap">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={fieldError("password") ? "input-error" : ""}
                  />
                  <button
                    type="button"
                    className="auth-eye-btn"
                    onClick={() => setShowPassword(v => !v)}
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    <EyeIcon />
                  </button>
                </div>
                {fieldError("password") && (
                  <span className="field-error">{fieldError("password")}</span>
                )}
                <span className="forgot">Forgot Password?</span>
              </div>

              <button className="auth-btn" onClick={handleLogin} disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </button>

              <p className="auth-switch">
                Create an account{" "}
                <span onClick={() => switchMode(true)}>Sign up</span>
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
                  onBlur={handleBlur}
                  className={fieldError("name") ? "input-error" : ""}
                />
                {fieldError("name") && (
                  <span className="field-error">{fieldError("name")}</span>
                )}
              </div>

              <div className="auth-field">
                <label>Email Id</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={fieldError("email") ? "input-error" : ""}
                />
                {fieldError("email") && (
                  <span className="field-error">{fieldError("email")}</span>
                )}
              </div>

              <div className="auth-field">
                <label>Mobile</label>
                <input
                  name="mobile"
                  type="text"
                  placeholder="e.g. +919876543210"
                  value={formData.mobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={fieldError("mobile") ? "input-error" : ""}
                />
                {fieldError("mobile") && (
                  <span className="field-error">{fieldError("mobile")}</span>
                )}
              </div>

              <div className="auth-field">
                <label>Password</label>
                <div className="auth-password-wrap">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min 8 chars, 1 uppercase, 1 number, 1 symbol"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={fieldError("password") ? "input-error" : ""}
                  />
                  <button
                    type="button"
                    className="auth-eye-btn"
                    onClick={() => setShowPassword(v => !v)}
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    <EyeIcon />
                  </button>
                </div>
                {fieldError("password") && (
                  <span className="field-error">{fieldError("password")}</span>
                )}

                {formData.password && (
                  <div className="password-strength">
                    <div className={`strength-bar ${
                      formData.password.length >= 8 &&
                      /[A-Z]/.test(formData.password) &&
                      /[0-9]/.test(formData.password) &&
                      /[^a-zA-Z0-9]/.test(formData.password)
                        ? "strong"
                        : formData.password.length >= 6
                        ? "medium"
                        : "weak"
                    }`} />
                    <span className="strength-label">
                      {formData.password.length >= 8 &&
                       /[A-Z]/.test(formData.password) &&
                       /[0-9]/.test(formData.password) &&
                       /[^a-zA-Z0-9]/.test(formData.password)
                        ? "Strong"
                        : formData.password.length >= 6
                        ? "Medium"
                        : "Weak"}
                    </span>
                  </div>
                )}
              </div>

              <button className="auth-btn" onClick={handleRegister} disabled={loading}>
                {loading ? "Signing up..." : "Sign up"}
              </button>

              <p className="auth-switch">
                Already have an account?{" "}
                <span onClick={() => switchMode(false)}>Sign in</span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Careersignin;