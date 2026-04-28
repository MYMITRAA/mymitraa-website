import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Careersignin.css";
import bird from "../../assets/images/bird1.webp";
import logo  from "../../assets/logo/icon-blue.svg";
import mitra from "../../assets/logo/mitraa.svg";
import { API } from "../../config/api";

// ─── Country codes ────────────────────────────────────────────────────────────
const COUNTRY_CODES = [
  { code: "+1",   flag: "🇺🇸", name: "US" },
  { code: "+1",   flag: "🇨🇦", name: "CA" },
  { code: "+7",   flag: "🇷🇺", name: "RU" },
  { code: "+20",  flag: "🇪🇬", name: "EG" },
  { code: "+27",  flag: "🇿🇦", name: "ZA" },
  { code: "+30",  flag: "🇬🇷", name: "GR" },
  { code: "+31",  flag: "🇳🇱", name: "NL" },
  { code: "+32",  flag: "🇧🇪", name: "BE" },
  { code: "+33",  flag: "🇫🇷", name: "FR" },
  { code: "+34",  flag: "🇪🇸", name: "ES" },
  { code: "+36",  flag: "🇭🇺", name: "HU" },
  { code: "+39",  flag: "🇮🇹", name: "IT" },
  { code: "+40",  flag: "🇷🇴", name: "RO" },
  { code: "+41",  flag: "🇨🇭", name: "CH" },
  { code: "+43",  flag: "🇦🇹", name: "AT" },
  { code: "+44",  flag: "🇬🇧", name: "GB" },
  { code: "+45",  flag: "🇩🇰", name: "DK" },
  { code: "+46",  flag: "🇸🇪", name: "SE" },
  { code: "+47",  flag: "🇳🇴", name: "NO" },
  { code: "+48",  flag: "🇵🇱", name: "PL" },
  { code: "+49",  flag: "🇩🇪", name: "DE" },
  { code: "+51",  flag: "🇵🇪", name: "PE" },
  { code: "+52",  flag: "🇲🇽", name: "MX" },
  { code: "+53",  flag: "🇨🇺", name: "CU" },
  { code: "+54",  flag: "🇦🇷", name: "AR" },
  { code: "+55",  flag: "🇧🇷", name: "BR" },
  { code: "+56",  flag: "🇨🇱", name: "CL" },
  { code: "+57",  flag: "🇨🇴", name: "CO" },
  { code: "+58",  flag: "🇻🇪", name: "VE" },
  { code: "+60",  flag: "🇲🇾", name: "MY" },
  { code: "+61",  flag: "🇦🇺", name: "AU" },
  { code: "+62",  flag: "🇮🇩", name: "ID" },
  { code: "+63",  flag: "🇵🇭", name: "PH" },
  { code: "+64",  flag: "🇳🇿", name: "NZ" },
  { code: "+65",  flag: "🇸🇬", name: "SG" },
  { code: "+66",  flag: "🇹🇭", name: "TH" },
  { code: "+81",  flag: "🇯🇵", name: "JP" },
  { code: "+82",  flag: "🇰🇷", name: "KR" },
  { code: "+84",  flag: "🇻🇳", name: "VN" },
  { code: "+86",  flag: "🇨🇳", name: "CN" },
  { code: "+90",  flag: "🇹🇷", name: "TR" },
  { code: "+91",  flag: "🇮🇳", name: "IN" },
  { code: "+92",  flag: "🇵🇰", name: "PK" },
  { code: "+93",  flag: "🇦🇫", name: "AF" },
  { code: "+94",  flag: "🇱🇰", name: "LK" },
  { code: "+95",  flag: "🇲🇲", name: "MM" },
  { code: "+98",  flag: "🇮🇷", name: "IR" },
  { code: "+212", flag: "🇲🇦", name: "MA" },
  { code: "+213", flag: "🇩🇿", name: "DZ" },
  { code: "+216", flag: "🇹🇳", name: "TN" },
  { code: "+218", flag: "🇱🇾", name: "LY" },
  { code: "+220", flag: "🇬🇲", name: "GM" },
  { code: "+221", flag: "🇸🇳", name: "SN" },
  { code: "+234", flag: "🇳🇬", name: "NG" },
  { code: "+254", flag: "🇰🇪", name: "KE" },
  { code: "+255", flag: "🇹🇿", name: "TZ" },
  { code: "+256", flag: "🇺🇬", name: "UG" },
  { code: "+260", flag: "🇿🇲", name: "ZM" },
  { code: "+263", flag: "🇿🇼", name: "ZW" },
  { code: "+351", flag: "🇵🇹", name: "PT" },
  { code: "+352", flag: "🇱🇺", name: "LU" },
  { code: "+353", flag: "🇮🇪", name: "IE" },
  { code: "+354", flag: "🇮🇸", name: "IS" },
  { code: "+358", flag: "🇫🇮", name: "FI" },
  { code: "+359", flag: "🇧🇬", name: "BG" },
  { code: "+370", flag: "🇱🇹", name: "LT" },
  { code: "+371", flag: "🇱🇻", name: "LV" },
  { code: "+372", flag: "🇪🇪", name: "EE" },
  { code: "+380", flag: "🇺🇦", name: "UA" },
  { code: "+381", flag: "🇷🇸", name: "RS" },
  { code: "+385", flag: "🇭🇷", name: "HR" },
  { code: "+386", flag: "🇸🇮", name: "SI" },
  { code: "+420", flag: "🇨🇿", name: "CZ" },
  { code: "+421", flag: "🇸🇰", name: "SK" },
  { code: "+852", flag: "🇭🇰", name: "HK" },
  { code: "+853", flag: "🇲🇴", name: "MO" },
  { code: "+855", flag: "🇰🇭", name: "KH" },
  { code: "+856", flag: "🇱🇦", name: "LA" },
  { code: "+880", flag: "🇧🇩", name: "BD" },
  { code: "+886", flag: "🇹🇼", name: "TW" },
  { code: "+960", flag: "🇲🇻", name: "MV" },
  { code: "+961", flag: "🇱🇧", name: "LB" },
  { code: "+962", flag: "🇯🇴", name: "JO" },
  { code: "+963", flag: "🇸🇾", name: "SY" },
  { code: "+964", flag: "🇮🇶", name: "IQ" },
  { code: "+965", flag: "🇰🇼", name: "KW" },
  { code: "+966", flag: "🇸🇦", name: "SA" },
  { code: "+967", flag: "🇾🇪", name: "YE" },
  { code: "+968", flag: "🇴🇲", name: "OM" },
  { code: "+971", flag: "🇦🇪", name: "AE" },
  { code: "+972", flag: "🇮🇱", name: "IL" },
  { code: "+973", flag: "🇧🇭", name: "BH" },
  { code: "+974", flag: "🇶🇦", name: "QA" },
  { code: "+975", flag: "🇧🇹", name: "BT" },
  { code: "+976", flag: "🇲🇳", name: "MN" },
  { code: "+977", flag: "🇳🇵", name: "NP" },
];

// ─── Modes ────────────────────────────────────────────────────────────────────
// "login" | "signup" | "verify"

function Careersignin({ onClose, onSuccess = null }) {
  const [mode,           setMode]           = useState("login");
  const [loading,        setLoading]        = useState(false);
  const [error,          setError]          = useState("");
  const [success,        setSuccess]        = useState("");
  const [touched,        setTouched]        = useState({});
  const [showPassword,   setShowPassword]   = useState(false);
  const [otpDigits,      setOtpDigits]      = useState(["", "", "", "", "", ""]);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [pendingEmail,   setPendingEmail]   = useState("");
  const [countryCode,    setCountryCode]    = useState("+91");
  const [ccSearch,       setCcSearch]       = useState("");
  const [ccOpen,         setCcOpen]         = useState(false);

  const otpRefs   = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
  const ccRef     = useRef();
  const navigate  = useNavigate();

  const [formData, setFormData] = useState({
    name: "", email: "", mobile: "", password: "",
  });

  // ─── Validation ──────────────────────────────────────────────────────────────
  const validate = (fields, m) => {
    const errs = {};

    if (m === "signup") {
      if (!fields.name.trim())
        errs.name = "Full name is required.";
      else if (fields.name.trim().length < 2)
        errs.name = "Name must be at least 2 characters.";
      else if (!/^[a-zA-Z\s'-]+$/.test(fields.name))
        errs.name = "Name can only contain letters, spaces, hyphens, or apostrophes.";
      else if (fields.name.trim().length > 60)
        errs.name = "Name must be 60 characters or fewer.";
    }

    if (!fields.email.trim())
      errs.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.trim()))
      errs.email = "Enter a valid email address (e.g. you@example.com).";
    else if (fields.email.trim().length > 254)
      errs.email = "Email address is too long.";

    if (m === "signup") {
      const rawMobile = fields.mobile.replace(/[\s\-()]/g, "");
      if (!rawMobile)
        errs.mobile = "Mobile number is required.";
      else if (!/^\d+$/.test(rawMobile))
        errs.mobile = "Mobile number must contain digits only.";
      else if (rawMobile.length < 6)
        errs.mobile = "Mobile number is too short (min 6 digits).";
      else if (rawMobile.length > 15)
        errs.mobile = "Mobile number is too long (max 15 digits).";
    }

    if (!fields.password)
      errs.password = "Password is required.";
    else if (m === "signup") {
      if (fields.password.length < 8)
        errs.password = "Password must be at least 8 characters.";
      else if (fields.password.length > 128)
        errs.password = "Password must be 128 characters or fewer.";
      else if (!/[A-Z]/.test(fields.password))
        errs.password = "Password must contain at least one uppercase letter.";
      else if (!/[a-z]/.test(fields.password))
        errs.password = "Password must contain at least one lowercase letter.";
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
    const { name, value } = e.target;
    // Restrict mobile to digits, spaces, dashes, and parentheses only
    if (name === "mobile" && value && !/^[\d\s\-()\d]*$/.test(value)) return;
    setFormData({ ...formData, [name]: value });
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

  // ─── Country code dropdown ────────────────────────────────────────────────
  const filteredCodes = COUNTRY_CODES.filter(c =>
    c.name.toLowerCase().includes(ccSearch.toLowerCase()) ||
    c.code.includes(ccSearch)
  );

  const selectedCC = COUNTRY_CODES.find(c => c.code === countryCode) || COUNTRY_CODES[0];

  const handleCCSelect = (code) => {
    setCountryCode(code);
    setCcOpen(false);
    setCcSearch("");
  };

  // Close dropdown on outside click
  const handleCCBlur = (e) => {
    if (ccRef.current && !ccRef.current.contains(e.relatedTarget)) {
      setCcOpen(false);
      setCcSearch("");
    }
  };

  // Build full mobile number for API
  const fullMobile = () => `${countryCode}${formData.mobile.replace(/[\s\-()]/g, "")}`;

  // ─── OTP digit handlers ───────────────────────────────────────────────────
  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
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

  // ─── Resend cooldown ──────────────────────────────────────────────────────
  const startCooldown = () => {
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown(prev => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  // ─── Password strength ────────────────────────────────────────────────────
  const getPasswordStrength = (pwd) => {
    if (!pwd) return null;
    const checks = [
      pwd.length >= 8,
      /[A-Z]/.test(pwd),
      /[a-z]/.test(pwd),
      /[0-9]/.test(pwd),
      /[^a-zA-Z0-9]/.test(pwd),
    ];
    const score = checks.filter(Boolean).length;
    if (score <= 2) return { level: "weak",   label: "Weak" };
    if (score <= 3) return { level: "medium",  label: "Medium" };
    if (score <= 4) return { level: "strong",  label: "Strong" };
    return { level: "very-strong", label: "Very strong" };
  };

  const pwdStrength = getPasswordStrength(formData.password);

  // ─── Eye icon ─────────────────────────────────────────────────────────────
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

  // ─── Handlers ─────────────────────────────────────────────────────────────
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
        body: JSON.stringify({ email: formData.email.trim(), password: formData.password }),
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
        onClose();
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
          name:     formData.name.trim(),
          email:    formData.email.trim(),
          mobile:   fullMobile(),
          password: formData.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Registration failed");

      setPendingEmail(formData.email.trim());
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
    setCountryCode("+91");
    setCcSearch("");
    setCcOpen(false);
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="auth-overlay">
      <div className="auth-container">

        <button className="auth-close" onClick={onClose} aria-label="Close">×</button>

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

          {error   && <p className="auth-error"  role="alert">{error}</p>}
          {success && <p className="auth-success" role="status">{success}</p>}

          {/* ── LOGIN ── */}
          {mode === "login" && (
            <>
              <h2>Sign in</h2>
              <p className="auth-sub">Shape your career with us</p>

              <div className="auth-field">
                <label htmlFor="login-email">Email Id</label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="email"
                  className={fieldError("email") ? "input-error" : ""}
                />
                {fieldError("email") && (
                  <span className="field-error" role="alert">{fieldError("email")}</span>
                )}
              </div>

              <div className="auth-field">
                <label htmlFor="login-password">Password</label>
                <div className="auth-password-wrap">
                  <input
                    id="login-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="current-password"
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
                  <span className="field-error" role="alert">{fieldError("password")}</span>
                )}
                <span className="forgot" role="button" tabIndex={0}>Forgot Password?</span>
              </div>

              <button className="auth-btn" onClick={handleLogin} disabled={loading}>
                {loading ? "Signing in…" : "Sign in"}
              </button>

              <p className="auth-switch">
                Create an account{" "}
                <span onClick={() => switchMode("signup")} role="button" tabIndex={0}>Sign up</span>
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

              {/* Name */}
              <div className="auth-field">
                <label htmlFor="signup-name">Name</label>
                <input
                  id="signup-name"
                  name="name"
                  type="text"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="name"
                  maxLength={60}
                  className={fieldError("name") ? "input-error" : ""}
                />
                {fieldError("name") && (
                  <span className="field-error" role="alert">{fieldError("name")}</span>
                )}
              </div>

              {/* Email */}
              <div className="auth-field">
                <label htmlFor="signup-email">Email Id</label>
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="email"
                  className={fieldError("email") ? "input-error" : ""}
                />
                {fieldError("email") && (
                  <span className="field-error" role="alert">{fieldError("email")}</span>
                )}
              </div>

              {/* Mobile with country code */}
              <div className="auth-field">
                <label>Mobile</label>
                <div className="mobile-input-wrap">

                  {/* Country code selector */}
                  <div
                    className={`cc-selector${ccOpen ? " cc-selector--open" : ""}${fieldError("mobile") ? " cc-selector--error" : ""}`}
                    ref={ccRef}
                    onBlur={handleCCBlur}
                  >
                    <button
                      type="button"
                      className="cc-trigger"
                      onClick={() => { setCcOpen(o => !o); setCcSearch(""); }}
                      aria-haspopup="listbox"
                      aria-expanded={ccOpen}
                    >
                      <span className="cc-flag">{selectedCC.flag}</span>
                      <span className="cc-code">{selectedCC.code}</span>
                      <span className="cc-caret">▾</span>
                    </button>

                    {ccOpen && (
                      <div className="cc-dropdown" role="listbox">
                        <div className="cc-search-wrap">
                          <input
                            className="cc-search"
                            type="text"
                            placeholder="Search country or code…"
                            value={ccSearch}
                            onChange={e => setCcSearch(e.target.value)}
                            autoFocus
                          />
                        </div>
                        <div className="cc-list">
                          {filteredCodes.length === 0 ? (
                            <div className="cc-empty">No results</div>
                          ) : (
                            filteredCodes.map((c, i) => (
                              <button
                                key={i}
                                type="button"
                                role="option"
                                className={`cc-option${c.code === countryCode && c.name === selectedCC.name ? " cc-option--selected" : ""}`}
                                onClick={() => handleCCSelect(c.code)}
                                tabIndex={0}
                              >
                                <span className="cc-flag">{c.flag}</span>
                                <span className="cc-option-name">{c.name}</span>
                                <span className="cc-option-code">{c.code}</span>
                              </button>
                            ))
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Number input */}
                  <input
                    id="signup-mobile"
                    name="mobile"
                    type="tel"
                    placeholder="e.g. 9876543210"
                    value={formData.mobile}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="tel-national"
                    maxLength={15}
                    className={`mobile-number-input${fieldError("mobile") ? " input-error" : ""}`}
                  />
                </div>
                {fieldError("mobile") && (
                  <span className="field-error" role="alert">{fieldError("mobile")}</span>
                )}
              </div>

              {/* Password */}
              <div className="auth-field">
                <label htmlFor="signup-password">Password</label>
                <div className="auth-password-wrap">
                  <input
                    id="signup-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min 8 chars, uppercase, number, symbol"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="new-password"
                    maxLength={128}
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
                  <span className="field-error" role="alert">{fieldError("password")}</span>
                )}

                {formData.password && pwdStrength && (
                  <div className="password-strength">
                    <div className="strength-bars">
                      {["weak", "medium", "strong", "very-strong"].map((lvl, i) => {
                        const levels = ["weak", "medium", "strong", "very-strong"];
                        const currentIdx = levels.indexOf(pwdStrength.level);
                        return (
                          <div
                            key={lvl}
                            className={`strength-segment${i <= currentIdx ? ` strength-segment--${pwdStrength.level}` : ""}`}
                          />
                        );
                      })}
                    </div>
                    <span className={`strength-label strength-label--${pwdStrength.level}`}>
                      {pwdStrength.label}
                    </span>
                  </div>
                )}

                {/* Password requirements checklist */}
                {formData.password && (
                  <ul className="pwd-rules">
                    <li className={formData.password.length >= 8 ? "pwd-rule--ok" : ""}>At least 8 characters</li>
                    <li className={/[A-Z]/.test(formData.password) ? "pwd-rule--ok" : ""}>One uppercase letter</li>
                    <li className={/[a-z]/.test(formData.password) ? "pwd-rule--ok" : ""}>One lowercase letter</li>
                    <li className={/[0-9]/.test(formData.password) ? "pwd-rule--ok" : ""}>One number</li>
                    <li className={/[^a-zA-Z0-9]/.test(formData.password) ? "pwd-rule--ok" : ""}>One special character</li>
                  </ul>
                )}
              </div>

              <button className="auth-btn" onClick={handleRegister} disabled={loading}>
                {loading ? "Signing up…" : "Sign up"}
              </button>

              <p className="auth-switch">
                Already have an account?{" "}
                <span onClick={() => switchMode("login")} role="button" tabIndex={0}>Sign in</span>
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
                      aria-label={`Digit ${i + 1} of 6`}
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
                {loading ? "Verifying…" : "Verify & Continue"}
              </button>

              <p className="auth-switch">
                Didn't receive a code?{" "}
                {resendCooldown > 0 ? (
                  <span className="resend-cooldown">Resend in {resendCooldown}s</span>
                ) : (
                  <span onClick={handleResendOtp} role="button" tabIndex={0}>Resend code</span>
                )}
              </p>

              <p className="auth-switch" style={{ marginTop: "4px" }}>
                Wrong email?{" "}
                <span onClick={() => switchMode("signup")} role="button" tabIndex={0}>Go back</span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Careersignin;
