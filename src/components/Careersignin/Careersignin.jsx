import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Careersignin.css";
import bird  from "../../assets/images/birdimage.jpg";
import logo  from "../../assets/logo/icon-blue.svg";
import mitra from "../../assets/logo/mitraa.svg";
import { API } from "../../config/api";

// ─── Modes ───────────────────────────────────────────────────────────────────
// "login" | "signup" | "verify"

function Careersignin({ onClose, onSuccess = null }) {
  const [mode,          setMode]          = useState("login");   // "login" | "signup" | "verify"
  const [loading,       setLoading]       = useState(false);
  const [error,         setError]         = useState("");
  const [success,       setSuccess]       = useState("");
  const [touched,       setTouched]       = useState({});
  const [showPassword,  setShowPassword]  = useState(false);
  const [otpDigits,     setOtpDigits]     = useState(["", "", "", "", "", ""]);
  const [resendCooldown,setResendCooldown]= useState(0);
  const [pendingEmail,  setPendingEmail]  = useState(""); // email saved after registration

  const otpRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "", email: "", mobile: "", password: "",
  });

  // ─── Validation ────────────────────────────────────────────────────────────
  const validate = (fields, m) => {
    const errs = {};

    if (m === "signup") {
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

    if (m === "signup") {
      if (!fields.mobile.trim())
        errs.mobile = "Mobile number is required.";
      else if (!/^\+?[0-9]{7,15}$/.test(fields.mobile.replace(/\s/g, "")))
        errs.mobile = "Enter a valid mobile number (7–15 digits).";
    }

    if (!fields.password)
      errs.password = "Password is required.";
    else if (m === "signup") {
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
    fields.forEach(f => (all[f] = true));
    setTouched(all);
  };

  // ─── OTP digit handlers ────────────────────────────────────────────────────
  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;           // digits only
    const next = [...otpDigits];
    next[index] = value;
    setOtpDigits(next);
    setError("");
    if (value && index < 5) otpRefs[index + 1].current?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0)
      otpRefs[index - 1].current?.focus();
    if (e.key === "ArrowLeft"  && index > 0) otpRefs[index - 1].current?.focus();
    if (e.key === "ArrowRight" && index < 5) otpRefs[index + 1].current?.focus();
  };

  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setOtpDigits(pasted.split(""));
      otpRefs[5].current?.focus();
      e.preventDefault();
    }
  };

  // ─── Resend cooldown timer ─────────────────────────────────────────────────
  const startCooldown = () => {
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown(prev => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  // ─── Eye icon ──────────────────────────────────────────────────────────────
  const EyeIcon = () =>
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
    );

  // ─── Handlers ──────────────────────────────────────────────────────────────
  const handleLogin = async () => {
    touchAll(["email", "password"]);
    const errs = validate(formData, "login");
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    setError("");
    try {
      const res  = await fetch(API.login, {
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

  const handleRegister = async () => {
    touchAll(["name", "email", "mobile", "password"]);
    const errs = validate(formData, "signup");
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res  = await fetch(API.register, {
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

      // Save email for verification, switch to OTP screen
      setPendingEmail(formData.email);
      setOtpDigits(["", "", "", "", "", ""]);
      setMode("verify");
      startCooldown();
      setSuccess("");
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    const otp = otpDigits.join("");
    if (otp.length < 6) {
      setError("Please enter the 6-digit code sent to your email.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res  = await fetch(API.verifyEmail, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: pendingEmail, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Verification failed");

      switchMode("login");
      setSuccess("Email verified! You can now sign in.");
    } catch (err) {
      setError(err.message);
      // Shake OTP boxes on error
      setOtpDigits(["", "", "", "", "", ""]);
      setTimeout(() => otpRefs[0].current?.focus(), 50);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    setLoading(true);
    setError("");
    try {
      const res  = await fetch(API.resendOtp, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: pendingEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Could not resend code");
      setSuccess("A new code has been sent to your email.");
      startCooldown();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (toMode) => {
    setMode(toMode);
    setError("");
    setSuccess("");
    setTouched({});
    setShowPassword(false);
    setFormData({ name: "", email: "", mobile: "", password: "" });
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="auth-overlay">
      <div className="auth-container">

        <button className="auth-close" onClick={onClose}>×</button>

        <img
          src={bird}
          alt="Bird"
          className={`auth-bird ${mode === "signup" ? "auth-bird--signup" : ""}`}
        />

        <div className="auth-card">
          <div className="auth-line-img">
            <img src={logo}  alt="Logo"        className="auth-logo" />
            <img src={mitra} alt="Mitraa Logo" className="auth-logo" />
          </div>

          {error   && <p className="auth-error">{error}</p>}
          {success && <p className="auth-success">{success}</p>}

          {/* ── LOGIN ── */}
          {mode === "login" && (
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
                <span onClick={() => switchMode("signup")}>Sign up</span>
              </p>
            </>
          )}

          {/* ── SIGNUP ── */}
          {mode === "signup" && (
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
                <span onClick={() => switchMode("login")}>Sign in</span>
              </p>
            </>
          )}

          {/* ── VERIFY OTP ── */}
          {mode === "verify" && (
            <>
              <h2>Verify Email</h2>
              <p className="auth-sub">
                We sent a 6-digit code to{" "}
                <strong>{pendingEmail}</strong>. Enter it below.
              </p>

              <div className="auth-field">
                <label>Verification Code</label>
                <div className="otp-wrap" onPaste={handleOtpPaste}>
                  {otpDigits.map((digit, i) => (
                    <input
                      key={i}
                      ref={otpRefs[i]}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      className={`otp-box${error ? " otp-box--error" : ""}`}
                      onChange={e => handleOtpChange(i, e.target.value)}
                      onKeyDown={e => handleOtpKeyDown(i, e)}
                      autoFocus={i === 0}
                    />
                  ))}
                </div>
              </div>

              <button
                className="auth-btn"
                onClick={handleVerify}
                disabled={loading || otpDigits.join("").length < 6}
              >
                {loading ? "Verifying..." : "Verify & Continue"}
              </button>

              <p className="auth-switch">
                Didn't receive a code?{" "}
                {resendCooldown > 0 ? (
                  <span className="resend-cooldown">
                    Resend in {resendCooldown}s
                  </span>
                ) : (
                  <span onClick={handleResendOtp}>Resend code</span>
                )}
              </p>

              <p className="auth-switch" style={{ marginTop: "4px" }}>
                Wrong email?{" "}
                <span onClick={() => switchMode("signup")}>Go back</span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Careersignin;
